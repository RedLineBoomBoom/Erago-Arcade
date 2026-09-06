import { useState, useEffect } from 'react';

// Channel name for synchronizing active browser tabs locally
const BROADCAST_CHANNEL_NAME = 'erago_arcade_presence_v1';
const STORAGE_KEY_TABS = 'erago_active_tabs_registry';

interface TabPresence {
  id: string;
  timestamp: number;
}

// Generates a unique tab session identifier
const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36).substring(4);
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
  const isPrimeTime = (hour >= 18 || hour <= 2);
  const base = isPrimeTime ? 22 : 16;
  
  // Deterministic seed based on 5-minute time window + slight sine wave
  const cycleIndex = Math.floor((hour * 60 + minute) / 4);
  const seedWave = Math.sin(cycleIndex * 0.7) * 5 + Math.cos(cycleIndex * 1.3) * 3;
  
  return Math.max(12, Math.round(base + seedWave));
};

export const useOnlinePlayersCount = () => {
  const [localTabsCount, setLocalTabsCount] = useState<number>(1);
  const [globalBaseline, setGlobalBaseline] = useState<number>(getBaselinePlayers);
  const [jitter, setJitter] = useState<number>(0);

  useEffect(() => {
    const tabId = generateSessionId();
    let channel: BroadcastChannel | null = null;

    // Heartbeat function to register this tab in localStorage
    const reportPresence = () => {
      try {
        const now = Date.now();
        const raw = localStorage.getItem(STORAGE_KEY_TABS);
        let registry: TabPresence[] = raw ? JSON.parse(raw) : [];
        
        // Filter out dead tabs older than 7 seconds
        registry = registry.filter((item) => now - item.timestamp < 7000 && item.id !== tabId);
        // Add current tab
        registry.push({ id: tabId, timestamp: now });
        
        localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(registry));
        setLocalTabsCount(registry.length);
      } catch {
        // Fallback for private browsing storage errors
      }
    };

    // Initialize BroadcastChannel if supported
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.onmessage = (event) => {
          if (event.data?.type === 'PING') {
            channel?.postMessage({ type: 'PONG', tabId });
            reportPresence();
          } else if (event.data?.type === 'PONG' || event.data?.type === 'JOIN' || event.data?.type === 'LEAVE') {
            reportPresence();
          }
        };

        // Notify other tabs that a new tab joined
        channel.postMessage({ type: 'JOIN', tabId });
      } catch {
        // BroadcastChannel unavailable
      }
    }

    reportPresence();

    // Heartbeat interval every 3 seconds
    const heartbeatTimer = setInterval(() => {
      reportPresence();
      if (channel) {
        channel.postMessage({ type: 'PING', tabId });
      }
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
        if (channel) {
          channel.postMessage({ type: 'LEAVE', tabId });
        }
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
      if (channel) {
        channel.close();
      }
    };
  }, []);

  // Total active players = baseline arcade concurrents + local peer tabs
  const totalActivePlayers = Math.max(1, globalBaseline + jitter + (localTabsCount - 1));

  return {
    totalActivePlayers,
    localTabsCount,
  };
};
