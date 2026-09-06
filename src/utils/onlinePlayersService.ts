import { useState, useEffect, useCallback, useRef } from 'react';

// Channel name for synchronizing active browser tabs locally
const BROADCAST_CHANNEL_NAME = 'erago_arcade_presence_v1';
const STORAGE_KEY_TABS = 'erago_active_tabs_registry';

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

// Generates a unique tab session identifier
const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36).substring(4);
};

// Natural distribution weights across the 10 game modes
const SECTION_WEIGHTS: Record<ArcadeSectionId, number> = {
  'trivia-roulette': 0.22,
  'quiz-speedrun': 0.18,
  'boss-rush': 0.14,
  'bonus-minigames': 0.12,
  'cartridge-lookbook': 0.09,
  'steam-radar': 0.08,
  'gaming-news': 0.06,
  'card-binder': 0.04,
  'chiptune-jukebox': 0.04,
  'cheat-vault': 0.03,
  'main-menu': 0, // Lobby
};

/**
 * Calculates a realistic time-based arcade visitor baseline (16 to 34 players)
 * with gentle organic fluctuations, combined with actual local active tabs.
 */
const getBaselinePlayers = (): number => {
  const now = new Date();
  const hour = now.getHours(); // 0 - 23
  const minute = now.getMinutes();

  // Peak gaming hours (18:00 - 02:00) have higher activity
  const isPrimeTime = hour >= 18 || hour <= 2;
  const base = isPrimeTime ? 24 : 18;

  // Deterministic seed based on 5-minute time window + slight sine wave
  const cycleIndex = Math.floor((hour * 60 + minute) / 4);
  const seedWave = Math.sin(cycleIndex * 0.7) * 5 + Math.cos(cycleIndex * 1.3) * 3;

  return Math.max(14, Math.round(base + seedWave));
};

export interface OnlinePlayersData {
  totalActivePlayers: number;
  totalInGamePlayers: number;
  localTabsCount: number;
  sectionPlayerCounts: Record<ArcadeSectionId, number>;
  reportActiveSection: (sectionId: ArcadeSectionId) => void;
}

export const useOnlinePlayersCount = (currentSection: ArcadeSectionId = 'main-menu'): OnlinePlayersData => {
  const [localTabsCount, setLocalTabsCount] = useState<number>(1);
  const [globalBaseline, setGlobalBaseline] = useState<number>(getBaselinePlayers);
  const [jitter, setJitter] = useState<number>(0);
  const [peerSectionCounts, setPeerSectionCounts] = useState<Record<ArcadeSectionId, number>>(() => ({
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
  }));

  const tabIdRef = useRef<string>(generateSessionId());
  const currentSectionRef = useRef<ArcadeSectionId>(currentSection);
  currentSectionRef.current = currentSection;

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Heartbeat function to register this tab and count sections in localStorage
  const reportPresence = useCallback((explicitSection?: ArcadeSectionId) => {
    try {
      const activeSection = explicitSection || currentSectionRef.current;
      const tabId = tabIdRef.current;
      const now = Date.now();
      const raw = localStorage.getItem(STORAGE_KEY_TABS);
      let registry: TabPresence[] = raw ? JSON.parse(raw) : [];

      // Filter out dead tabs older than 7 seconds
      registry = registry.filter((item) => now - item.timestamp < 7000 && item.id !== tabId);

      // Add current tab with its current section
      registry.push({ id: tabId, timestamp: now, sectionId: activeSection });

      localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(registry));
      setLocalTabsCount(registry.length);

      // Count peers in each section
      const counts: Record<ArcadeSectionId, number> = {
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

      registry.forEach((item) => {
        if (item.sectionId && counts[item.sectionId] !== undefined) {
          counts[item.sectionId]++;
        }
      });

      setPeerSectionCounts(counts);
    } catch {
      // Fallback for private browsing storage errors
    }
  }, []);

  // Safe message emitter
  const safePostMessage = useCallback((message: unknown) => {
    try {
      if (channelRef.current) {
        channelRef.current.postMessage(message);
      }
    } catch {
      // Channel closed or not ready
    }
  }, []);

  // Update when currentSection prop changes
  useEffect(() => {
    reportPresence(currentSection);
    safePostMessage({
      type: 'SECTION_CHANGE',
      tabId: tabIdRef.current,
      sectionId: currentSection,
    });
  }, [currentSection, reportPresence, safePostMessage]);

  useEffect(() => {
    const tabId = tabIdRef.current;

    // Initialize BroadcastChannel if supported
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channelRef.current = channel;

        channel.onmessage = (event) => {
          if (event.data?.type === 'PING') {
            try {
              channel.postMessage({
                type: 'PONG',
                tabId,
                sectionId: currentSectionRef.current,
              });
            } catch {}
            reportPresence();
          } else if (
            event.data?.type === 'PONG' ||
            event.data?.type === 'JOIN' ||
            event.data?.type === 'LEAVE' ||
            event.data?.type === 'SECTION_CHANGE'
          ) {
            reportPresence();
          }
        };

        // Notify other tabs that this tab joined
        try {
          channel.postMessage({
            type: 'JOIN',
            tabId,
            sectionId: currentSectionRef.current,
          });
        } catch {}
      } catch {
        // BroadcastChannel unavailable
      }
    }

    reportPresence();

    // Heartbeat interval every 3 seconds
    const heartbeatTimer = setInterval(() => {
      reportPresence();
      safePostMessage({
        type: 'PING',
        tabId,
        sectionId: currentSectionRef.current,
      });
    }, 3000);

    // Subtle natural organic fluctuation every 14 seconds (+/- 1-2 players)
    const jitterTimer = setInterval(() => {
      setJitter((prev) => {
        const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.6 ? 2 : 1);
        const next = prev + delta;
        return Math.max(-4, Math.min(4, next));
      });
      setGlobalBaseline(getBaselinePlayers());
    }, 14000);

    // Cleanup on tab close/unload
    const handleUnload = () => {
      try {
        safePostMessage({ type: 'LEAVE', tabId });
        const now = Date.now();
        const raw = localStorage.getItem(STORAGE_KEY_TABS);
        if (raw) {
          const registry: TabPresence[] = JSON.parse(raw);
          const filtered = registry.filter((item) => item.id !== tabId && now - item.timestamp < 7000);
          localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(filtered));
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(heartbeatTimer);
      clearInterval(jitterTimer);
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
      if (channelRef.current) {
        try {
          channelRef.current.close();
        } catch {}
        channelRef.current = null;
      }
    };
  }, [reportPresence, safePostMessage]);

  // Total active players = baseline arcade concurrents + local peer tabs
  const totalActivePlayers = Math.max(1, globalBaseline + jitter + (localTabsCount - 1));

  // Compute realistic in-game distribution across the 10 modes
  // ~82% of online players are actively in a game mode, remaining are in lobby
  const inGamePool = Math.max(10, Math.round(totalActivePlayers * 0.82));

  const nowMinutes = new Date().getMinutes();
  const nowSeconds = new Date().getSeconds();

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
    'main-menu': Math.max(1, totalActivePlayers - inGamePool + (peerSectionCounts['main-menu'] || 0)),
  };

  ARCADE_SECTIONS_LIST.forEach((secId, idx) => {
    const weight = SECTION_WEIGHTS[secId];
    // Gentle dynamic sine wave fluctuation per mode every 30s
    const wave = Math.sin((nowMinutes * 60 + nowSeconds) / 25 + idx * 0.9) * 0.7;
    const baseShare = Math.max(1, Math.round(inGamePool * weight + wave));
    const peerTabBonus = peerSectionCounts[secId] || 0;
    sectionPlayerCounts[secId] = baseShare + peerTabBonus;
  });

  const totalInGamePlayers = ARCADE_SECTIONS_LIST.reduce(
    (sum, secId) => sum + (sectionPlayerCounts[secId] || 0),
    0
  );

  return {
    totalActivePlayers,
    totalInGamePlayers,
    localTabsCount,
    sectionPlayerCounts,
    reportActiveSection: reportPresence,
  };
};
