/**
 * Cryptographic Anti-Tamper Security Ledger for Erago Arcade Vault
 * 
 * Provides:
 * - Dynamic Device & Origin Bound Entropy (No Static Pepper)
 * - Strict Hard Ceiling (25,000 Coins Maximum) to Prevent Infinite Injections
 * - Dual-Tier Verification: Fast Keyed Murmur/FNV Mix + Async Web Crypto HMAC-SHA256
 * - Merkle Chained Previous-Hash Storage Envelope
 * - Zero-Trust Legacy Purge (No Unverified Plaintext Key Imports)
 * - Automatic Quarantine & Instant Baseline Reversion on Tamper
 */

export const LEDGER_STORAGE_KEY = 'erago_vault_secure_ledger';
const DEVICE_ID_KEY = 'erago_vault_device_id';
const DEVICE_SALT_KEY = 'erago_vault_device_salt';
const LEGACY_STORAGE_KEY_COINS = 'erago_arcade_coins';
const LEGACY_STORAGE_KEY_POINTS = 'erago_arcade_points_acc';
const LEGACY_STORAGE_KEY_PLAYTIME = 'erago_arcade_playtime_sec';

export const SAFE_BASELINE_COINS = 2000;
export const MAX_COIN_CEILING = 25000; // Absolute maximum legitimate coin capacity

export interface VaultStatePayload {
  coins: number;
  accumulatedPoints: number;
  playtimeSeconds: number;
  timestamp: number;
  nonce: number;
  chainHash?: string;
}

export interface SecureVaultEnvelope {
  version: number;
  vaultId: string;
  timestamp: number;
  nonce: number;
  payloadCipher: string;
  syncSignature: string;
  previousSignature?: string;
  signature?: string; // Async Web Crypto HMAC-SHA256
}

export interface TamperIncident {
  reason: string;
  timestamp: number;
  vaultId: string;
  revertedToCoins: number;
}

type TamperListener = (incident: TamperIncident) => void;

class SecurityLedgerManager {
  private vaultId: string = '';
  private deviceSalt: string = '';
  private lastKnownNonce: number = 0;
  private lastKnownSignature: string = 'GENESIS_SIG_0';
  private tamperListeners: Set<TamperListener> = new Set();
  private tamperViolationCount: number = 0;
  private lastVerifiedTimestamp: number = Date.now();
  private isSecured: boolean = true;

  constructor() {
    this.initDeviceSecurity();
  }

  /**
   * Initializes device-unique entropy and purges dangerous legacy keys
   */
  private initDeviceSecurity() {
    try {
      // Purge any legacy plaintext keys immediately
      localStorage.removeItem(LEGACY_STORAGE_KEY_COINS);
      localStorage.removeItem(LEGACY_STORAGE_KEY_POINTS);
      localStorage.removeItem(LEGACY_STORAGE_KEY_PLAYTIME);

      let vId = localStorage.getItem(DEVICE_ID_KEY);
      if (!vId || !vId.startsWith('VAULT-')) {
        vId = this.generateRandomVaultId();
        localStorage.setItem(DEVICE_ID_KEY, vId);
      }
      this.vaultId = vId;

      let salt = localStorage.getItem(DEVICE_SALT_KEY);
      if (!salt || salt.length < 32) {
        salt = this.generateRandomHex(32);
        localStorage.setItem(DEVICE_SALT_KEY, salt);
      }
      this.deviceSalt = salt;
    } catch {
      this.vaultId = 'VAULT-FALLBACK-SESSION';
      this.deviceSalt = '7f8c12e9b04d5a6390145efc1938ab42';
    }
  }

  private generateRandomVaultId(): string {
    const bytes = new Uint8Array(8);
    if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < 8; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0').toUpperCase()).join('');
    return `VAULT-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}`;
  }

  private generateRandomHex(length: number): string {
    const bytes = new Uint8Array(length);
    if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Derives composite dynamic key combining origin, device salt, and runtime seeds
   */
  private getCompositeKey(nonce: number): string {
    const origin = typeof window !== 'undefined' ? window.location.origin || 'erago.local' : 'erago.local';
    const dynamicSeed = 0x5a17c0de ^ (nonce * 0x1f3d5b79);
    return `${this.vaultId}:${this.deviceSalt}:${origin}:${dynamicSeed.toString(16)}:${nonce}`;
  }

  /**
   * Fast multi-pass 64-bit keyed hash for synchronous validation
   */
  private computeSyncSignature(payloadCipher: string, nonce: number, timestamp: number, previousSig: string = ''): string {
    const key = this.getCompositeKey(nonce);
    const input = `${this.vaultId}#${timestamp}#${nonce}#${payloadCipher}#${previousSig}#${key}`;

    let h1 = 0x811c9dc5;
    let h2 = 0x9e3779b9;

    for (let i = 0; i < input.length; i++) {
      const c = input.charCodeAt(i);
      h1 ^= c;
      h1 = Math.imul(h1, 0x01000193);

      h2 ^= (c << 5) | (c >>> 27);
      h2 = Math.imul(h2, 0x85ebca6b);
      h2 ^= h1 >>> 13;
    }

    h1 ^= h2;
    h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b);
    h1 ^= h1 >>> 13;
    h2 = Math.imul(h2 ^ (h2 >>> 16), 0xc2b2ae35);
    h2 ^= h2 >>> 16;

    const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
    return `${hex1}${hex2}`;
  }

  /**
   * Asynchronous Web Crypto HMAC-SHA256 signature
   */
  public async computeHmacSha256(dataString: string): Promise<string> {
    if (typeof window === 'undefined' || !window.crypto?.subtle) {
      return this.computeSyncSignature(dataString, 0, 0);
    }
    try {
      const enc = new TextEncoder();
      const origin = window.location.origin || 'erago.local';
      const secret = `${this.deviceSalt}:${origin}:VAULT_HMAC_GUARD_V2`;
      const keyData = enc.encode(secret);
      const key = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        false,
        ['sign']
      );
      const signature = await window.crypto.subtle.sign('HMAC', key, enc.encode(dataString));
      const hashArray = Array.from(new Uint8Array(signature));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return '';
    }
  }

  /**
   * Dynamic keystream XOR cipher with base64 envelope
   */
  private encryptPayload(payload: VaultStatePayload): string {
    const jsonStr = JSON.stringify(payload);
    const key = this.getCompositeKey(payload.nonce);
    const output: number[] = [];

    for (let i = 0; i < jsonStr.length; i++) {
      const charCode = jsonStr.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const xor = charCode ^ keyChar ^ ((payload.nonce * (i + 1) + 0x37) & 0xff);
      output.push(xor);
    }

    const binStr = String.fromCharCode(...output);
    return btoa(binStr);
  }

  /**
   * Decrypts and validates payload structure
   */
  private decryptPayload(cipherText: string, nonce: number): VaultStatePayload | null {
    try {
      const binStr = atob(cipherText);
      const key = this.getCompositeKey(nonce);
      const decodedChars: string[] = [];

      for (let i = 0; i < binStr.length; i++) {
        const charCode = binStr.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const orig = charCode ^ keyChar ^ ((nonce * (i + 1) + 0x37) & 0xff);
        decodedChars.push(String.fromCharCode(orig));
      }

      const rawJson = decodedChars.join('');
      const parsed = JSON.parse(rawJson);

      if (
        typeof parsed.coins !== 'number' ||
        typeof parsed.accumulatedPoints !== 'number' ||
        typeof parsed.playtimeSeconds !== 'number' ||
        typeof parsed.nonce !== 'number' ||
        typeof parsed.timestamp !== 'number'
      ) {
        return null;
      }

      return parsed as VaultStatePayload;
    } catch {
      return null;
    }
  }

  /**
   * Registers a callback when tampering is detected
   */
  public onTamperDetected(listener: TamperListener): () => void {
    this.tamperListeners.add(listener);
    return () => {
      this.tamperListeners.delete(listener);
    };
  }

  public notifyTamper(reason: string, revertedToCoins: number = SAFE_BASELINE_COINS) {
    this.tamperViolationCount++;
    this.isSecured = false;
    const incident: TamperIncident = {
      reason,
      timestamp: Date.now(),
      vaultId: this.vaultId,
      revertedToCoins,
    };
    console.warn(`%c[ERAGO SECURITY ALERT] ${reason}`, 'background: #FF2A85; color: white; font-weight: bold; padding: 4px;');
    this.tamperListeners.forEach((l) => {
      try {
        l(incident);
      } catch (err) {
        console.error('Tamper listener error:', err);
      }
    });
  }

  /**
   * Strict Sanity Verification: Enforces Hard Ceiling and Integer Bounds
   */
  private validateSanity(payload: VaultStatePayload): boolean {
    if (!Number.isInteger(payload.coins) || payload.coins < 0 || payload.coins > MAX_COIN_CEILING) {
      return false;
    }
    if (!Number.isInteger(payload.accumulatedPoints) || payload.accumulatedPoints < 0 || payload.accumulatedPoints >= 100) {
      return false;
    }
    if (!Number.isInteger(payload.playtimeSeconds) || payload.playtimeSeconds < 0 || payload.playtimeSeconds >= 600) {
      return false;
    }
    if (!Number.isInteger(payload.nonce) || payload.nonce < 0) {
      return false;
    }
    return true;
  }

  /**
   * Persists vault state into encrypted and signed envelope
   */
  public saveSecureVault(state: { coins: number; accumulatedPoints: number; playtimeSeconds: number }): boolean {
    try {
      // Hard ceiling clamp before encryption
      if (state.coins > MAX_COIN_CEILING) {
        this.notifyTamper(
          `Percobaan manipulasi koin ke ${state.coins.toLocaleString()} melampaui batas wajar (Plafon ${MAX_COIN_CEILING.toLocaleString()})`,
          SAFE_BASELINE_COINS
        );
        state.coins = SAFE_BASELINE_COINS;
      }

      this.lastKnownNonce += 1;
      const nonce = this.lastKnownNonce;
      const timestamp = Date.now();

      const payload: VaultStatePayload = {
        coins: Math.max(0, Math.min(MAX_COIN_CEILING, Math.floor(state.coins))),
        accumulatedPoints: Math.max(0, Math.floor(state.accumulatedPoints % 100)),
        playtimeSeconds: Math.max(0, Math.floor(state.playtimeSeconds % 600)),
        timestamp,
        nonce,
        chainHash: this.lastKnownSignature,
      };

      if (!this.validateSanity(payload)) {
        this.notifyTamper('Validasi integritas parameter gagal saat menyimpan brankas', SAFE_BASELINE_COINS);
        return false;
      }

      const payloadCipher = this.encryptPayload(payload);
      const syncSignature = this.computeSyncSignature(payloadCipher, nonce, timestamp, this.lastKnownSignature);

      const envelope: SecureVaultEnvelope = {
        version: 2,
        vaultId: this.vaultId,
        timestamp,
        nonce,
        payloadCipher,
        syncSignature,
        previousSignature: this.lastKnownSignature,
      };

      this.lastKnownSignature = syncSignature;

      localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(envelope));
      this.lastVerifiedTimestamp = timestamp;

      // Clean up legacy keys
      localStorage.removeItem(LEGACY_STORAGE_KEY_COINS);
      localStorage.removeItem(LEGACY_STORAGE_KEY_POINTS);
      localStorage.removeItem(LEGACY_STORAGE_KEY_PLAYTIME);

      // Async HMAC-SHA256 seal
      this.computeHmacSha256(`${envelope.vaultId}:${envelope.timestamp}:${envelope.nonce}:${envelope.payloadCipher}:${syncSignature}`).then(
        (sig) => {
          try {
            const raw = localStorage.getItem(LEDGER_STORAGE_KEY);
            if (raw) {
              const currentEnv = JSON.parse(raw);
              if (currentEnv.nonce === nonce) {
                currentEnv.signature = sig;
                localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(currentEnv));
              }
            }
          } catch {
            // Ignore
          }
        }
      );

      return true;
    } catch (err) {
      console.error('[ERAGO VAULT] Failed to persist secure ledger:', err);
      return false;
    }
  }

  /**
   * Loads and cryptographically validates vault state
   */
  public loadSecureVault(): { coins: number; accumulatedPoints: number; playtimeSeconds: number } {
    try {
      const raw = localStorage.getItem(LEDGER_STORAGE_KEY);
      if (!raw) {
        // First initialization
        const freshState = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(freshState);
        return freshState;
      }

      let envelope: SecureVaultEnvelope;
      try {
        envelope = JSON.parse(raw);
      } catch {
        this.notifyTamper('Penyimpanan ledger rusak atau diedit secara manual di DevTools', SAFE_BASELINE_COINS);
        const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(restored);
        return restored;
      }

      // Check structural envelope integrity
      if (
        !envelope.vaultId ||
        !envelope.payloadCipher ||
        !envelope.syncSignature ||
        typeof envelope.nonce !== 'number' ||
        typeof envelope.timestamp !== 'number'
      ) {
        this.notifyTamper('Format header envelope kriptografis tidak valid', SAFE_BASELINE_COINS);
        const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(restored);
        return restored;
      }

      // Check vault ID binding (prevents importing forged ledger from other device)
      if (envelope.vaultId !== this.vaultId) {
        this.notifyTamper('ID Brankas tidak cocok dengan perangkat ini (Kloning terdeteksi)', SAFE_BASELINE_COINS);
        const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(restored);
        return restored;
      }

      // Verify sync signature
      const prevSig = envelope.previousSignature || 'GENESIS_SIG_0';
      const expectedSyncSig = this.computeSyncSignature(envelope.payloadCipher, envelope.nonce, envelope.timestamp, prevSig);
      if (envelope.syncSignature !== expectedSyncSig) {
        this.notifyTamper('Tanda tangan digital brankas tidak cocok (Manipulasi koin terdeteksi)', SAFE_BASELINE_COINS);
        const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(restored);
        return restored;
      }

      // Decrypt payload
      const payload = this.decryptPayload(envelope.payloadCipher, envelope.nonce);
      if (!payload) {
        this.notifyTamper('Gagal mendekripsi payload brankas (Kunci stream XOR corrupt)', SAFE_BASELINE_COINS);
        const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(restored);
        return restored;
      }

      // Check strict ceiling & sanity
      if (!this.validateSanity(payload)) {
        this.notifyTamper(
          `Nilai koin (${payload.coins.toLocaleString()}) melampaui batas wajar permainan (Plafon ${MAX_COIN_CEILING.toLocaleString()})`,
          SAFE_BASELINE_COINS
        );
        const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
        this.saveSecureVault(restored);
        return restored;
      }

      this.lastKnownNonce = envelope.nonce;
      this.lastKnownSignature = envelope.syncSignature;
      this.lastVerifiedTimestamp = envelope.timestamp;
      this.isSecured = true;

      // Async HMAC check if signature exists
      if (envelope.signature) {
        this.computeHmacSha256(`${envelope.vaultId}:${envelope.timestamp}:${envelope.nonce}:${envelope.payloadCipher}:${envelope.syncSignature}`).then(
          (expectedHmac) => {
            if (envelope.signature && envelope.signature !== expectedHmac) {
              this.notifyTamper('Verifikasi HMAC-SHA256 gagal (Modifikasi tanda tangan)', SAFE_BASELINE_COINS);
              const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
              this.saveSecureVault(restored);
            }
          }
        );
      }

      return {
        coins: payload.coins,
        accumulatedPoints: payload.accumulatedPoints,
        playtimeSeconds: payload.playtimeSeconds,
      };
    } catch {
      this.notifyTamper('Pengecualian tak terduga saat memvalidasi brankas', SAFE_BASELINE_COINS);
      const restored = { coins: SAFE_BASELINE_COINS, accumulatedPoints: 0, playtimeSeconds: 0 };
      this.saveSecureVault(restored);
      return restored;
    }
  }

  /**
   * Current Vault Security Telemetry
   */
  public getVaultSecurityStatus() {
    return {
      isSecured: this.isSecured,
      vaultId: this.vaultId,
      shortVaultId: this.vaultId.slice(0, 15) + '...',
      algorithm: 'HMAC-SHA256 & XOR-CIPHER V2',
      tamperCount: this.tamperViolationCount,
      lastVerifiedTime: this.lastVerifiedTimestamp,
    };
  }
}

export const securityLedger = new SecurityLedgerManager();
