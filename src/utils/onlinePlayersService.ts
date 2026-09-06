import { useState, useEffect, useCallback, useRef } from 'react';

// Channel name for synchronizing active browser tabs locally (same browser profile fallback)
const BROADCAST_CHANNEL_NAME = 'erago_arcade_presence_v2';
const STORAGE_KEY_TABS = 'erago_active_tabs_registry_v2';
const SESSION_STORAGE_KEY = 'erago_arcade_session_id';

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

export interface TabPresence {
  id: string;
  timestamp: number;
  sectionId: ArcadeSectionId;
}

export interface OnlinePlayersData {
  totalActivePlayers: number;
  totalInGamePlayers: number;
  localTabsCount: number;
  sectionPlayerCounts: Record<ArcadeSectionId, number>;
  reportActiveSection: (sectionId: ArcadeSectionId) => void;
}

// Generate or retrieve persistent per-tab session ID
const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return 'server';
  try {
    let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      const devicePrefix = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'mob'
        : 'desk';
      id = `${devicePrefix}-${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36).substring(4)}`;
      sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `tab-${Math.random().toString(36).substring(2, 9)}`;
  }
};

const getDeviceType = (): 'desktop' | 'mobile' | 'tablet' => {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth < 768) {
    return 'mobile';
  }
  return 'desktop';
};

const createEmptySectionCounts = (): Record<ArcadeSectionId, number> => ({
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
});

export const useOnlinePlayersCount = (currentSection: ArcadeSectionId = 'main-menu'): OnlinePlayersData => {
  const [totalActivePlayers, setTotalActivePlayers] = useState<number>(1);
  const [totalInGamePlayers, setTotalInGamePlayers] = useState<number>(0);
  const [localTabsCount, setLocalTabsCount] = useState<number>(1);
  const [sectionPlayerCounts, setSectionPlayerCounts] = useState<Record<ArcadeSectionId, number>>(createEmptySectionCounts);

  const sessionIdRef = useRef<string>(getOrCreateSessionId());
  const currentSectionRef = useRef<ArcadeSectionId>(currentSection);
  currentSectionRef.current = currentSection;

  const channelRef = useRef<BroadcastChannel | null>(null);
  const isServerAvailableRef = useRef<boolean>(true);

  // Safe BroadcastChannel message sender
  const safePostMessage = useCallback((message: unknown) => {
    try {
      if (channelRef.current) {
        channelRef.current.postMessage(message);
      }
    } catch {
      // Channel closed or unmounted
    }
  }, []);

  // Update local fallback storage and peer counts
  const reportLocalTabPresence = useCallback((explicitSection?: ArcadeSectionId) => {
    try {
      const activeSection = explicitSection || currentSectionRef.current;
      const tabId = sessionIdRef.current;
      const now = Date.now();
      const raw = localStorage.getItem(STORAGE_KEY_TABS);
      let registry: TabPresence[] = raw ? JSON.parse(raw) : [];

      // Filter out stale tabs (> 6s) and this tab
      registry = registry.filter((item) => now - item.timestamp < 6000 && item.id !== tabId);

      // Add current tab
      registry.push({ id: tabId, timestamp: now, sectionId: activeSection });

      localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(registry));
      setLocalTabsCount(registry.length);

      // If server is unavailable, use local tab counts as fallback
      if (!isServerAvailableRef.current) {
        const counts = createEmptySectionCounts();
        let inGame = 0;
        registry.forEach((item) => {
          if (item.sectionId && counts[item.sectionId] !== undefined) {
            counts[item.sectionId]++;
          }
          if (item.sectionId && item.sectionId !== 'main-menu') {
            inGame++;
          }
        });

        setTotalActivePlayers(Math.max(1, registry.length));
        setTotalInGamePlayers(inGame);
        setSectionPlayerCounts(counts);
      }
    } catch {
      // Ignore private browsing storage error
    }
  }, []);

  // Send server heartbeat to /api/presence
  const sendServerHeartbeat = useCallback(async (explicitSection?: ArcadeSectionId) => {
    const sessionId = sessionIdRef.current;
    const sectionId = explicitSection || currentSectionRef.current;
    const deviceType = getDeviceType();

    try {
      const res = await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, sectionId, deviceType }),
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const data = await res.json();
        isServerAvailableRef.current = true;
        if (typeof data.totalActivePlayers === 'number') {
          setTotalActivePlayers(Math.max(1, data.totalActivePlayers));
        }
        if (typeof data.totalInGamePlayers === 'number') {
          setTotalInGamePlayers(data.totalInGamePlayers);
        }
        if (data.sectionPlayerCounts) {
          setSectionPlayerCounts(data.sectionPlayerCounts);
        }
      } else {
        isServerAvailableRef.current = false;
        reportLocalTabPresence();
      }
    } catch {
      isServerAvailableRef.current = false;
      reportLocalTabPresence();
    }
  }, [reportLocalTabPresence]);

  // Handle section changes dynamically
  useEffect(() => {
    reportLocalTabPresence(currentSection);
    sendServerHeartbeat(currentSection);
    safePostMessage({
      type: 'SECTION_CHANGE',
      sessionId: sessionIdRef.current,
      sectionId: currentSection,
    });
  }, [currentSection, reportLocalTabPresence, sendServerHeartbeat, safePostMessage]);

  // Main lifecycle: SSE stream + periodic heartbeat + unload handling
  useEffect(() => {
    const sessionId = sessionIdRef.current;

    // 1. Setup BroadcastChannel for instant local cross-tab sync
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channelRef.current = channel;

        channel.onmessage = (event) => {
          if (
            event.data?.type === 'PING' ||
            event.data?.type === 'JOIN' ||
            event.data?.type === 'LEAVE' ||
            event.data?.type === 'SECTION_CHANGE'
          ) {
            reportLocalTabPresence();
          }
        };

        try {
          channel.postMessage({
            type: 'JOIN',
            sessionId,
            sectionId: currentSectionRef.current,
          });
        } catch {}
      } catch {
        // BroadcastChannel unavailable
      }
    }

    reportLocalTabPresence();
    sendServerHeartbeat();

    // 2. Setup Server-Sent Events (SSE) for instant cross-device live updates
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/presence/stream');

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (typeof data.totalActivePlayers === 'number') {
            setTotalActivePlayers(Math.max(1, data.totalActivePlayers));
          }
          if (typeof data.totalInGamePlayers === 'number') {
            setTotalInGamePlayers(data.totalInGamePlayers);
          }
          if (data.sectionPlayerCounts) {
            setSectionPlayerCounts(data.sectionPlayerCounts);
          }
        } catch {
          // Ignore parse errors
        }
      };

      eventSource.onerror = () => {
        // If SSE fails (e.g. static site), fallback gracefully to polling
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      };
    } catch {
      // SSE not supported
    }

    // 3. Heartbeat timer (every 2.5 seconds)
    const heartbeatTimer = setInterval(() => {
      reportLocalTabPresence();
      sendServerHeartbeat();
      safePostMessage({
        type: 'PING',
        sessionId,
        sectionId: currentSectionRef.current,
      });
    }, 2500);

    // 4. Handle window beforeunload / pagehide to leave cleanly
    const handleLeave = () => {
      try {
        // Beacon to server
        const leavePayload = JSON.stringify({ sessionId });
        const leaveUrl = `/api/presence/leave?sessionId=${encodeURIComponent(sessionId)}`;
        if (navigator.sendBeacon) {
          navigator.sendBeacon(leaveUrl, leavePayload);
        } else {
          fetch(leaveUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: leavePayload,
            keepalive: true,
          }).catch(() => {});
        }

        // Local storage cleanup
        const now = Date.now();
        const raw = localStorage.getItem(STORAGE_KEY_TABS);
        if (raw) {
          const registry: TabPresence[] = JSON.parse(raw);
          const filtered = registry.filter((item) => item.id !== sessionId && now - item.timestamp < 6000);
          localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(filtered));
        }

        // Notify local peers
        safePostMessage({ type: 'LEAVE', sessionId });
      } catch {
        // Ignore unload errors
      }
    };

    window.addEventListener('beforeunload', handleLeave);
    window.addEventListener('pagehide', handleLeave);

    return () => {
      clearInterval(heartbeatTimer);
      if (eventSource) {
        eventSource.close();
      }
      handleLeave();
      window.removeEventListener('beforeunload', handleLeave);
      window.removeEventListener('pagehide', handleLeave);

      if (channelRef.current) {
        try {
          channelRef.current.close();
        } catch {}
        channelRef.current = null;
      }
    };
  }, [reportLocalTabPresence, sendServerHeartbeat, safePostMessage]);

  return {
    totalActivePlayers,
    totalInGamePlayers,
    localTabsCount,
    sectionPlayerCounts,
    reportActiveSection: reportLocalTabPresence,
  };
};
