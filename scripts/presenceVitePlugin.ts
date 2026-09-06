import type { Plugin } from 'vite';
import type http from 'node:http';

export type ArcadeSectionId =
  | 'trivia-roulette'
  | 'quiz-speedrun'
  | 'cartridge-lookbook'
  | 'steam-radar'
  | 'gaming-news'
  | 'cheat-vault'
  | 'bonus-minigames'
  | 'boss-rush'
  | 'card-binder'
  | 'chiptune-jukebox'
  | 'main-menu';

export const ARCADE_SECTIONS_LIST: ArcadeSectionId[] = [
  'trivia-roulette',
  'quiz-speedrun',
  'cartridge-lookbook',
  'steam-radar',
  'gaming-news',
  'cheat-vault',
  'bonus-minigames',
  'boss-rush',
  'card-binder',
  'chiptune-jukebox',
];

interface SessionRecord {
  sessionId: string;
  sectionId: ArcadeSectionId;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  lastSeen: number;
}

// In-memory central presence registry on the Vite server
const activeSessions = new Map<string, SessionRecord>();
const sseClients = new Set<http.ServerResponse>();

// Sessions without heartbeat for > 4 seconds are considered disconnected
const PRUNE_TIMEOUT_MS = 4000;

function pruneInactiveSessions(): boolean {
  const now = Date.now();
  let changed = false;
  for (const [id, session] of activeSessions.entries()) {
    if (now - session.lastSeen > PRUNE_TIMEOUT_MS) {
      activeSessions.delete(id);
      changed = true;
    }
  }
  return changed;
}

function getPresenceSnapshot() {
  pruneInactiveSessions();

  const sectionPlayerCounts: Record<ArcadeSectionId, number> = {
    'trivia-roulette': 0,
    'quiz-speedrun': 0,
    'cartridge-lookbook': 0,
    'steam-radar': 0,
    'gaming-news': 0,
    'cheat-vault': 0,
    'bonus-minigames': 0,
    'boss-rush': 0,
    'card-binder': 0,
    'chiptune-jukebox': 0,
    'main-menu': 0,
  };

  let totalInGamePlayers = 0;
  for (const session of activeSessions.values()) {
    if (sectionPlayerCounts[session.sectionId] !== undefined) {
      sectionPlayerCounts[session.sectionId]++;
    }
    if (session.sectionId !== 'main-menu') {
      totalInGamePlayers++;
    }
  }

  const totalActivePlayers = Math.max(1, activeSessions.size);

  return {
    totalActivePlayers,
    totalInGamePlayers,
    activeSessionsCount: activeSessions.size,
    sectionPlayerCounts,
    timestamp: Date.now(),
  };
}

function broadcastToClients() {
  if (sseClients.size === 0) return;
  const snapshot = getPresenceSnapshot();
  const payload = `data: ${JSON.stringify(snapshot)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
      (client as unknown as { flush?: () => void }).flush?.();
    } catch {
      sseClients.delete(client);
    }
  }
}

function parseJsonBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

export function presencePlugin(): Plugin {
  let pruneInterval: NodeJS.Timeout | null = null;

  const startPruning = () => {
    if (pruneInterval) return;
    pruneInterval = setInterval(() => {
      const changed = pruneInactiveSessions();
      if (changed) {
        broadcastToClients();
      }
    }, 1200);
    pruneInterval.unref?.();
  };

  const setupMiddleware = (server: { middlewares: { use: (path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => void) => void } }) => {
    startPruning();

    // 1. SSE Real-time Stream
    server.middlewares.use('/api/presence/stream', (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });

      // Send immediate state
      const initialSnapshot = getPresenceSnapshot();
      res.write(`data: ${JSON.stringify(initialSnapshot)}\n\n`);

      sseClients.add(res);

      // Keep connection alive with heartbeat comment every 15s
      const pingTimer = setInterval(() => {
        try {
          res.write(': ping\n\n');
        } catch {
          clearInterval(pingTimer);
          sseClients.delete(res);
        }
      }, 15000);
      pingTimer.unref?.();

      req.on('close', () => {
        clearInterval(pingTimer);
        sseClients.delete(res);
      });
    });

    // 2. Session Heartbeat and Leave Endpoints
    server.middlewares.use('/api/presence', async (req, res, next) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const pathname = url.pathname;

      // Handle CORS preflight
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
      }

      // POST /api/presence/leave
      if (pathname === '/leave' || pathname === '/api/presence/leave') {
        const body = await parseJsonBody(req);
        const sessionId = (body.sessionId as string) || url.searchParams.get('sessionId');
        if (sessionId && activeSessions.has(sessionId)) {
          activeSessions.delete(sessionId);
          broadcastToClients();
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, ...getPresenceSnapshot() }));
        return;
      }

      // POST /api/presence (or /heartbeat)
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const sessionId = (body.sessionId as string) || url.searchParams.get('sessionId');
        const sectionId = (body.sectionId as ArcadeSectionId) || 'main-menu';
        const deviceType = (body.deviceType as 'desktop' | 'mobile' | 'tablet') || 'desktop';

        if (sessionId) {
          activeSessions.set(sessionId, {
            sessionId,
            sectionId,
            deviceType,
            lastSeen: Date.now(),
          });
          broadcastToClients();
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getPresenceSnapshot()));
        return;
      }

      // GET /api/presence
      if (req.method === 'GET' && (pathname === '' || pathname === '/')) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getPresenceSnapshot()));
        return;
      }

      next();
    });
  };

  return {
    name: 'vite-plugin-presence',
    configureServer(server) {
      setupMiddleware(server);
    },
    configurePreviewServer(server) {
      setupMiddleware(server);
    },
  };
}
