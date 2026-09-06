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

interface DeviceRecord {
  deviceId: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  lastSeen: number;
  tabs: Map<string, { sectionId: ArcadeSectionId; lastSeen: number }>;
}

// In-memory central presence registry on the Vite server (grouped by physical deviceId)
const activeDevices = new Map<string, DeviceRecord>();
const sseClients = new Set<http.ServerResponse>();

// Sessions without heartbeat for > 4.5 seconds are considered disconnected
const PRUNE_TIMEOUT_MS = 4500;

function pruneInactiveDevices(): boolean {
  const now = Date.now();
  let changed = false;

  for (const [devId, dev] of activeDevices.entries()) {
    for (const [tabId, tab] of dev.tabs.entries()) {
      if (now - tab.lastSeen > PRUNE_TIMEOUT_MS) {
        dev.tabs.delete(tabId);
        changed = true;
      }
    }

    if (dev.tabs.size === 0 || now - dev.lastSeen > PRUNE_TIMEOUT_MS) {
      activeDevices.delete(devId);
      changed = true;
    }
  }

  return changed;
}

function getPresenceSnapshot() {
  pruneInactiveDevices();

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

  for (const dev of activeDevices.values()) {
    let devInGame = false;
    let devSection: ArcadeSectionId = 'main-menu';

    for (const tab of dev.tabs.values()) {
      if (tab.sectionId && tab.sectionId !== 'main-menu') {
        devInGame = true;
        devSection = tab.sectionId;
        break;
      } else if (tab.sectionId) {
        devSection = tab.sectionId;
      }
    }

    if (devInGame) {
      totalInGamePlayers++;
    }
    if (sectionPlayerCounts[devSection] !== undefined) {
      sectionPlayerCounts[devSection]++;
    }
  }

  const totalActivePlayers = Math.max(1, activeDevices.size);

  return {
    totalActivePlayers,
    totalInGamePlayers,
    activeDevicesCount: activeDevices.size,
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
      const changed = pruneInactiveDevices();
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

    // 2. Device Heartbeat and Leave Endpoints
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
        const deviceId = (body.deviceId as string) || (body.sessionId as string) || url.searchParams.get('deviceId') || url.searchParams.get('sessionId');
        const tabId = (body.tabId as string) || (body.sessionId as string) || url.searchParams.get('tabId') || url.searchParams.get('sessionId');

        if (deviceId && activeDevices.has(deviceId)) {
          const dev = activeDevices.get(deviceId)!;
          if (tabId) {
            dev.tabs.delete(tabId);
          }
          if (dev.tabs.size === 0 || !tabId) {
            activeDevices.delete(deviceId);
          }
          broadcastToClients();
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, ...getPresenceSnapshot() }));
        return;
      }

      // POST /api/presence (or /heartbeat)
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const deviceId = (body.deviceId as string) || (body.sessionId as string) || url.searchParams.get('deviceId') || url.searchParams.get('sessionId');
        const tabId = (body.tabId as string) || (body.sessionId as string) || url.searchParams.get('tabId') || deviceId;
        const sectionId = (body.sectionId as ArcadeSectionId) || 'main-menu';
        const deviceType = (body.deviceType as 'desktop' | 'mobile' | 'tablet') || 'desktop';

        if (deviceId && tabId) {
          let dev = activeDevices.get(deviceId);
          const now = Date.now();
          if (!dev) {
            dev = {
              deviceId,
              deviceType,
              lastSeen: now,
              tabs: new Map(),
            };
            activeDevices.set(deviceId, dev);
          }
          dev.lastSeen = now;
          dev.tabs.set(tabId, { sectionId, lastSeen: now });
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
