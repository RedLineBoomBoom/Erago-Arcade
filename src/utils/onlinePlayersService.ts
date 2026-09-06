import { useState, useEffect, useCallback, useRef } from 'react';

// Channel name for synchronizing active browser tabs locally (same browser profile fallback)
const BROADCAST_CHANNEL_NAME = 'erago_arcade_presence_v2';
const STORAGE_KEY_TABS = 'erago_active_tabs_registry_v2';
const DEVICE_STORAGE_KEY = 'erago_arcade_device_id_v2';
const TAB_STORAGE_KEY = 'erago_arcade_tab_id_v2';

// Public global MQTT brokers for instant cross-device synchronization (0 config, 0 keys, works on Vercel)
const MQTT_BROKERS = [
  'wss://broker.emqx.io:8084/mqtt',
  'wss://broker.hivemq.com:8884/mqtt',
];
const MQTT_TOPIC = 'erago-arcade/presence/global-v2';

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
  deviceId: string;
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

export interface DeviceInfo {
  deviceId: string;
  tabId: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

// Generate or retrieve persistent physical device ID (persists across reloads & multiple tabs)
export const getOrCreateDeviceId = (): string => {
  if (typeof window === 'undefined') return 'srv-device';
  try {
    let id = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (!id) {
      const type = getDeviceType();
      const prefix = type === 'mobile' ? 'mob' : type === 'tablet' ? 'tab' : 'pc';
      id = `${prefix}-${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36).substring(4)}`;
      localStorage.setItem(DEVICE_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `dev-${Math.random().toString(36).substring(2, 9)}`;
  }
};

// Generate or retrieve per-tab session ID (unique per browser tab)
export const getOrCreateTabId = (): string => {
  if (typeof window === 'undefined') return 'srv-tab';
  try {
    let id = sessionStorage.getItem(TAB_STORAGE_KEY);
    if (!id) {
      id = `tab-${Math.random().toString(36).substring(2, 8)}-${Date.now().toString(36).substring(4)}`;
      sessionStorage.setItem(TAB_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `tab-${Math.random().toString(36).substring(2, 9)}`;
  }
};

export const getDeviceType = (): 'desktop' | 'mobile' | 'tablet' => {
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

// ============================================================================
// Zero-Dependency MQTT 3.1.1 Over WebSocket Helper Functions
// ============================================================================
function encodeVariableLength(len: number): number[] {
  const bytes: number[] = [];
  do {
    let digit = len % 128;
    len = Math.floor(len / 128);
    if (len > 0) digit |= 0x80;
    bytes.push(digit);
  } while (len > 0);
  return bytes;
}

function buildConnectPacket(clientId: string): ArrayBuffer {
  const enc = new TextEncoder();
  const idBytes = enc.encode(clientId);
  const protoName = enc.encode('MQTT');
  const variableHeader = [
    0x00, protoName.length, ...protoName,
    0x04, // MQTT 3.1.1
    0x02, // Clean Session = 1
    0x00, 0x3C, // Keep Alive = 60s
  ];
  const payload = [(idBytes.length >> 8) & 0xff, idBytes.length & 0xff, ...idBytes];
  const remLen = variableHeader.length + payload.length;
  const u8 = new Uint8Array([0x10, ...encodeVariableLength(remLen), ...variableHeader, ...payload]);
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
}

function buildSubscribePacket(packetId: number, topic: string): ArrayBuffer {
  const enc = new TextEncoder();
  const topicBytes = enc.encode(topic);
  const variableHeader = [(packetId >> 8) & 0xff, packetId & 0xff];
  const payload = [(topicBytes.length >> 8) & 0xff, topicBytes.length & 0xff, ...topicBytes, 0x00];
  const remLen = variableHeader.length + payload.length;
  const u8 = new Uint8Array([0x82, ...encodeVariableLength(remLen), ...variableHeader, ...payload]);
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
}

function buildPublishPacket(topic: string, message: string): ArrayBuffer {
  const enc = new TextEncoder();
  const topicBytes = enc.encode(topic);
  const msgBytes = enc.encode(message);
  const variableHeader = [(topicBytes.length >> 8) & 0xff, topicBytes.length & 0xff, ...topicBytes];
  const remLen = variableHeader.length + msgBytes.length;
  const u8 = new Uint8Array([0x30, ...encodeVariableLength(remLen), ...variableHeader, ...msgBytes]);
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
}

function parsePublishPacket(data: ArrayBuffer | Uint8Array): { topic: string; payload: string } | null {
  try {
    const u8 = data instanceof Uint8Array ? data : new Uint8Array(data);
    if ((u8[0] >> 4) !== 3) return null; // Only handle PUBLISH
    let offset = 1;
    let multiplier = 1;
    let byte = 0;
    do {
      byte = u8[offset++];
      multiplier *= 128;
    } while ((byte & 128) !== 0 && offset < u8.length);

    const topicLen = (u8[offset] << 8) | u8[offset + 1];
    offset += 2;
    const dec = new TextDecoder();
    const topic = dec.decode(u8.subarray(offset, offset + topicLen));
    offset += topicLen;
    const payload = dec.decode(u8.subarray(offset));
    return { topic, payload };
  } catch {
    return null;
  }
}

// Presence message payload format
interface PresenceMessage {
  type: 'HEARTBEAT' | 'SECTION_CHANGE' | 'LEAVE';
  deviceId: string;
  tabId: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  sectionId: ArcadeSectionId;
  timestamp: number;
}

interface ActiveDeviceRecord {
  deviceId: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  lastSeen: number;
  tabs: Map<string, { sectionId: ArcadeSectionId; timestamp: number }>;
}

export interface OnlinePlayersSnapshot {
  totalActivePlayers: number;
  totalInGamePlayers: number;
  localTabsCount: number;
  sectionPlayerCounts: Record<ArcadeSectionId, number>;
}

// ============================================================================
// Global Singleton Presence Mesh Client
// ============================================================================
class GlobalPresenceMesh {
  private static instance: GlobalPresenceMesh | null = null;

  public deviceId: string;
  public tabId: string;
  public deviceType: 'desktop' | 'mobile' | 'tablet';
  private currentSection: ArcadeSectionId = 'main-menu';

  private ws: WebSocket | null = null;
  private brokerIndex = 0;
  private isConnecting = false;
  private reconnectTimer: number | null = null;
  private pingTimer: number | null = null;

  private activeDevices = new Map<string, ActiveDeviceRecord>();
  private listeners = new Set<(snapshot: OnlinePlayersSnapshot) => void>();
  private localChannel: BroadcastChannel | null = null;

  private constructor() {
    this.deviceId = getOrCreateDeviceId();
    this.tabId = getOrCreateTabId();
    this.deviceType = getDeviceType();

    // Setup local self entry
    this.recordTab(this.deviceId, this.tabId, this.deviceType, this.currentSection, Date.now());

    // Setup BroadcastChannel for instant local cross-tab sync
    if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
      try {
        this.localChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        this.localChannel.onmessage = (event) => {
          if (event.data && typeof event.data === 'object') {
            this.handleIncomingMessage(event.data as PresenceMessage);
          }
        };
      } catch {}
    }

    // Connect to global MQTT WebSocket broker
    if (typeof window !== 'undefined') {
      this.connectWebSocket();

      // Periodic heartbeat (every 2.5s)
      window.setInterval(() => {
        this.broadcastHeartbeat('HEARTBEAT');
        this.syncLocalStorageTabs();
      }, 2500);

      // Periodic inactive device pruning (every 1.5s)
      window.setInterval(() => {
        this.pruneInactiveDevices();
      }, 1500);

      // Handle page unload / navigation
      const handleUnload = () => {
        this.broadcastLeave();
      };
      window.addEventListener('beforeunload', handleUnload);
      window.addEventListener('pagehide', handleUnload);
    }
  }

  public static getInstance(): GlobalPresenceMesh {
    if (!GlobalPresenceMesh.instance) {
      GlobalPresenceMesh.instance = new GlobalPresenceMesh();
    }
    return GlobalPresenceMesh.instance;
  }

  public setSection(section: ArcadeSectionId) {
    if (this.currentSection === section) return;
    this.currentSection = section;
    this.recordTab(this.deviceId, this.tabId, this.deviceType, section, Date.now());
    this.broadcastHeartbeat('SECTION_CHANGE');
    this.syncLocalStorageTabs();
    this.notifyListeners();
  }

  public subscribe(callback: (snapshot: OnlinePlayersSnapshot) => void): () => void {
    this.listeners.add(callback);
    callback(this.getSnapshot());
    return () => {
      this.listeners.delete(callback);
    };
  }

  private connectWebSocket() {
    if (typeof window === 'undefined' || typeof WebSocket === 'undefined') return;
    if (this.isConnecting || (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING))) {
      return;
    }

    this.isConnecting = true;
    const brokerUrl = MQTT_BROKERS[this.brokerIndex % MQTT_BROKERS.length];

    try {
      const socket = new WebSocket(brokerUrl, ['mqtt']);
      socket.binaryType = 'arraybuffer';
      this.ws = socket;

      socket.onopen = () => {
        this.isConnecting = false;
        // 1. Send CONNECT packet with unique client identifier
        const clientId = `erago-${this.deviceId.substring(0, 8)}-${this.tabId.substring(0, 8)}`;
        try {
          socket.send(buildConnectPacket(clientId));
        } catch {}
      };

      socket.onmessage = (event) => {
        const u8 = new Uint8Array(event.data);
        const packetType = u8[0] >> 4;

        if (packetType === 2) {
          // CONNACK (0x20) -> Subscribe to global presence topic
          try {
            socket.send(buildSubscribePacket(1, MQTT_TOPIC));
          } catch {}

          // Start ping timer every 25s (0xC0, 0x00)
          if (this.pingTimer) clearInterval(this.pingTimer);
          this.pingTimer = window.setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
              try {
                const ping = new Uint8Array([0xc0, 0x00]);
                this.ws.send(ping.buffer.slice(ping.byteOffset, ping.byteOffset + ping.byteLength) as ArrayBuffer);
              } catch {}
            }
          }, 25000);

          // Send immediate heartbeat on subscribe
          this.broadcastHeartbeat('HEARTBEAT');
        } else if (packetType === 3) {
          // PUBLISH packet
          const parsed = parsePublishPacket(event.data);
          if (parsed && parsed.payload) {
            try {
              const msg: PresenceMessage = JSON.parse(parsed.payload);
              this.handleIncomingMessage(msg);
            } catch {}
          }
        }
      };

      socket.onerror = () => {
        // Socket encountered error, will close and trigger onclose
      };

      socket.onclose = () => {
        this.isConnecting = false;
        if (this.pingTimer) {
          clearInterval(this.pingTimer);
          this.pingTimer = null;
        }
        // Rotate to next broker on disconnect
        this.brokerIndex++;
        // Reconnect after backoff delay
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        this.reconnectTimer = window.setTimeout(() => {
          this.connectWebSocket();
        }, 3000);
      };
    } catch {
      this.isConnecting = false;
      this.brokerIndex++;
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
      this.reconnectTimer = window.setTimeout(() => {
        this.connectWebSocket();
      }, 3500);
    }
  }

  private handleIncomingMessage(msg: PresenceMessage) {
    if (!msg || !msg.deviceId) return;
    const now = Date.now();

    if (msg.type === 'HEARTBEAT' || msg.type === 'SECTION_CHANGE') {
      this.recordTab(msg.deviceId, msg.tabId, msg.deviceType, msg.sectionId, now);
      this.notifyListeners();
    } else if (msg.type === 'LEAVE') {
      const dev = this.activeDevices.get(msg.deviceId);
      if (dev) {
        dev.tabs.delete(msg.tabId);
        if (dev.tabs.size === 0) {
          this.activeDevices.delete(msg.deviceId);
        }
        this.notifyListeners();
      }
    }
  }

  private recordTab(
    deviceId: string,
    tabId: string,
    deviceType: 'desktop' | 'mobile' | 'tablet',
    sectionId: ArcadeSectionId,
    timestamp: number
  ) {
    let dev = this.activeDevices.get(deviceId);
    if (!dev) {
      dev = {
        deviceId,
        deviceType: deviceType || 'desktop',
        lastSeen: timestamp,
        tabs: new Map(),
      };
      this.activeDevices.set(deviceId, dev);
    }
    dev.lastSeen = Math.max(dev.lastSeen, timestamp);
    dev.tabs.set(tabId, { sectionId, timestamp });
  }

  private pruneInactiveDevices() {
    const now = Date.now();
    let hasChanged = false;

    // Prune tabs older than 4500ms and devices without tabs or lastSeen > 4500ms
    for (const [devId, dev] of this.activeDevices.entries()) {
      if (devId === this.deviceId) {
        // Ensure our own current tab is always marked active
        dev.lastSeen = now;
        dev.tabs.set(this.tabId, { sectionId: this.currentSection, timestamp: now });
        continue;
      }

      for (const [tId, tab] of dev.tabs.entries()) {
        if (now - tab.timestamp > 4500) {
          dev.tabs.delete(tId);
          hasChanged = true;
        }
      }

      if (dev.tabs.size === 0 || now - dev.lastSeen > 4500) {
        this.activeDevices.delete(devId);
        hasChanged = true;
      }
    }

    if (hasChanged) {
      this.notifyListeners();
    }
  }

  private broadcastHeartbeat(type: 'HEARTBEAT' | 'SECTION_CHANGE') {
    const payload: PresenceMessage = {
      type,
      deviceId: this.deviceId,
      tabId: this.tabId,
      deviceType: this.deviceType,
      sectionId: this.currentSection,
      timestamp: Date.now(),
    };

    // 1. Post to local tabs via BroadcastChannel
    if (this.localChannel) {
      try {
        this.localChannel.postMessage(payload);
      } catch {}
    }

    // 2. Publish to global MQTT WebSocket
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(buildPublishPacket(MQTT_TOPIC, JSON.stringify(payload)));
      } catch {}
    }

    // 3. Fallback heartbeat to local dev server /api/presence if available
    if (typeof fetch !== 'undefined' && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: this.deviceId,
          tabId: this.tabId,
          deviceType: this.deviceType,
          sectionId: this.currentSection,
        }),
      }).catch(() => {});
    }
  }

  private broadcastLeave() {
    const payload: PresenceMessage = {
      type: 'LEAVE',
      deviceId: this.deviceId,
      tabId: this.tabId,
      deviceType: this.deviceType,
      sectionId: this.currentSection,
      timestamp: Date.now(),
    };

    if (this.localChannel) {
      try {
        this.localChannel.postMessage(payload);
      } catch {}
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(buildPublishPacket(MQTT_TOPIC, JSON.stringify(payload)));
      } catch {}
    }

    // Local storage tab registry cleanup
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TABS);
      if (raw) {
        const registry: TabPresence[] = JSON.parse(raw);
        const filtered = registry.filter((item) => item.id !== this.tabId);
        localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(filtered));
      }
    } catch {}
  }

  private syncLocalStorageTabs() {
    try {
      const now = Date.now();
      const raw = localStorage.getItem(STORAGE_KEY_TABS);
      let registry: TabPresence[] = raw ? JSON.parse(raw) : [];

      // Filter out stale tabs (> 5s) and current tab
      registry = registry.filter((item) => now - item.timestamp < 5000 && item.id !== this.tabId);
      registry.push({
        id: this.tabId,
        deviceId: this.deviceId,
        timestamp: now,
        sectionId: this.currentSection,
      });

      localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(registry));

      // Record any local tabs found in localStorage into our activeDevices map
      registry.forEach((item) => {
        if (item.deviceId) {
          this.recordTab(item.deviceId, item.id, this.deviceType, item.sectionId, item.timestamp);
        }
      });
    } catch {}
  }

  public getSnapshot(): OnlinePlayersSnapshot {
    // Current device is always guaranteed to be active
    let thisDeviceTabsCount = 1;

    const selfDev = this.activeDevices.get(this.deviceId);
    if (selfDev) {
      thisDeviceTabsCount = Math.max(1, selfDev.tabs.size);
    }

    // Compute unique physical devices and section distributions
    const counts = createEmptySectionCounts();
    let inGameCount = 0;

    for (const dev of this.activeDevices.values()) {
      // Find the primary section of this device:
      // If any tab is in-game, the device counts as in-game
      let devInGame = false;
      let primarySection: ArcadeSectionId = 'main-menu';

      for (const tab of dev.tabs.values()) {
        if (tab.sectionId && tab.sectionId !== 'main-menu') {
          devInGame = true;
          primarySection = tab.sectionId;
          break;
        } else if (tab.sectionId) {
          primarySection = tab.sectionId;
        }
      }

      if (devInGame) {
        inGameCount++;
      }
      if (counts[primarySection] !== undefined) {
        counts[primarySection]++;
      }
    }

    const totalActiveDevices = Math.max(1, this.activeDevices.size);

    return {
      totalActivePlayers: totalActiveDevices,
      totalInGamePlayers: inGameCount,
      localTabsCount: thisDeviceTabsCount,
      sectionPlayerCounts: counts,
    };
  }

  private notifyListeners() {
    const snapshot = this.getSnapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}

// ============================================================================
// React Hook for Online Players Presence
// ============================================================================
export const useOnlinePlayersCount = (currentSection: ArcadeSectionId = 'main-menu'): OnlinePlayersData => {
  const mesh = GlobalPresenceMesh.getInstance();
  const [snapshot, setSnapshot] = useState<OnlinePlayersSnapshot>(() => mesh.getSnapshot());

  const currentSectionRef = useRef<ArcadeSectionId>(currentSection);
  currentSectionRef.current = currentSection;

  useEffect(() => {
    mesh.setSection(currentSection);
  }, [currentSection, mesh]);

  useEffect(() => {
    const unsubscribe = mesh.subscribe((newSnapshot) => {
      setSnapshot(newSnapshot);
    });
    return () => {
      unsubscribe();
    };
  }, [mesh]);

  const reportActiveSection = useCallback((sectionId: ArcadeSectionId) => {
    mesh.setSection(sectionId);
  }, [mesh]);

  return {
    totalActivePlayers: snapshot.totalActivePlayers,
    totalInGamePlayers: snapshot.totalInGamePlayers,
    localTabsCount: snapshot.localTabsCount,
    sectionPlayerCounts: snapshot.sectionPlayerCounts,
    reportActiveSection,
  };
};

export default useOnlinePlayersCount;
