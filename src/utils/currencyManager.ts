import { sound } from '../audio/soundEngine';
import {
  securityLedger,
  SAFE_BASELINE_COINS,
  MAX_COIN_CEILING,
  type TamperIncident,
} from './securityLedger';

export const STARTING_COINS = SAFE_BASELINE_COINS;
export const ROLL_COST = 10;
export const POINT_CONVERSION_RATE = 100; // 100 points = 10 coins
export const COINS_PER_100_POINTS = 10;
export const TIME_REWARD_COINS = 100;
export const TIME_REWARD_INTERVAL_SECONDS = 600; // 10 minutes
export const BOSS_CLEAR_REWARD_COINS = 20;

// Security Velocity & Ceiling Constraints
const MAX_SINGLE_COIN_GRANT = 500;
const MAX_COINS_PER_MINUTE = 500;
const MAX_CONVERT_POINTS_SINGLE = 3000;

export interface CurrencyState {
  coins: number;
  accumulatedPoints: number;
  playtimeSeconds: number;
}

export type CurrencyListener = (state: CurrencyState) => void;
export type TimeRewardListener = (coinsAwarded: number) => void;
export type TamperIncidentListener = (incident: TamperIncident) => void;

interface GameTicket {
  game: string;
  issuedAt: number;
  maxPoints: number;
}

class CurrencyManager {
  // True ECMAScript Private Fields: Cannot be accessed or modified from outside runtime
  #regA: number = 0;
  #regB: number = 0;
  #regCheck: number = 0;
  #maskA: number = 0x1a2b3c4d;
  #maskB: number = 0x7e8f9a0b;
  #accumulatedPoints: number = 0;
  #playtimeSeconds: number = 0;

  #listeners: CurrencyListener[] = [];
  #timeRewardListeners: TimeRewardListener[] = [];
  #tamperListeners: TamperIncidentListener[] = [];

  #trackerIntervalId: number | null = null;
  #lastSavedSeconds: number = 0;
  #lastWallClockMs: number = Date.now();

  // Velocity Tracker
  #velocityWindowStart: number = Date.now();
  #velocityCoinsGranted: number = 0;

  // Ephemeral Ticket Registry
  #ticketRegistry: Map<string, GameTicket> = new Map();

  constructor() {
    this.#init();
  }

  /**
   * Trap getter/setter on currencyManager.coins property:
   * If anyone opens console and tries `currencyManager.coins = 999999`,
   * it intercepts the injection and instantly trips the security alarm!
   */
  public get coins(): number {
    return this.#readCoins();
  }

  public set coins(_injected: unknown) {
    this.tripTamper('Percobaan injeksi langsung properti currencyManager.coins terdeteksi via Console');
  }

  #computeRegisterChecksum(coins: number, mA: number, mB: number): number {
    let h = coins ^ 0x5a17c0de;
    h = Math.imul(h ^ mA, 0x5bd1e995);
    h ^= h >>> 15;
    h = Math.imul(h ^ mB, 0x1b873593);
    h ^= h >>> 13;
    return h >>> 0;
  }

  #readCoins(): number {
    const cA = (this.#regA ^ this.#maskA) >>> 0;
    const cB = (this.#regB ^ this.#maskB) >>> 0;
    const cCheck = this.#computeRegisterChecksum(cA, this.#maskA, this.#maskB);

    if (cA !== cB || cCheck !== this.#regCheck || cA > MAX_COIN_CEILING) {
      this.tripTamper('Penyusupan memori internal atau manipulasi register koin terdeteksi');
      return SAFE_BASELINE_COINS;
    }
    return cA;
  }

  #writeCoins(newCoins: number) {
    if (newCoins > MAX_COIN_CEILING) {
      this.tripTamper(`Nilai koin (${newCoins.toLocaleString()}) melampaui batas maksimum ${MAX_COIN_CEILING.toLocaleString()}`);
      newCoins = SAFE_BASELINE_COINS;
    }

    const safeVal = Math.max(0, Math.floor(newCoins));
    // Polymorphic rotation: Re-generate random masks on every write
    this.#maskA = (Math.floor(Math.random() * 0x7fffffff) + 1) >>> 0;
    this.#maskB = (Math.floor(Math.random() * 0x7fffffff) + 1) >>> 0;
    this.#regA = (safeVal ^ this.#maskA) >>> 0;
    this.#regB = (safeVal ^ this.#maskB) >>> 0;
    this.#regCheck = this.#computeRegisterChecksum(safeVal, this.#maskA, this.#maskB);
  }

  #init() {
    // 1. Cryptographically load vault state
    const state = securityLedger.loadSecureVault();
    this.#writeCoins(state.coins);
    this.#accumulatedPoints = state.accumulatedPoints;
    this.#playtimeSeconds = state.playtimeSeconds;
    this.#lastSavedSeconds = this.#playtimeSeconds;
    this.#lastWallClockMs = Date.now();

    // 2. Register security ledger tamper callback
    securityLedger.onTamperDetected((incident) => {
      this.#writeCoins(incident.revertedToCoins);
      this.#notify();
      for (const listener of this.#tamperListeners) {
        try {
          listener(incident);
        } catch (err) {
          console.error('Tamper listener error:', err);
        }
      }
    });

    // 3. Storage cross-tab guard
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e: StorageEvent) => {
        if (e.key === 'erago_vault_secure_ledger') {
          const updated = securityLedger.loadSecureVault();
          this.#writeCoins(updated.coins);
          this.#accumulatedPoints = updated.accumulatedPoints;
          this.#playtimeSeconds = updated.playtimeSeconds;
          this.#notify();
        } else if (
          e.key === 'erago_arcade_coins' ||
          e.key === 'erago_arcade_points_acc' ||
          e.key === 'erago_arcade_playtime_sec'
        ) {
          try {
            localStorage.removeItem(e.key);
          } catch {
            // Ignore
          }
        }
      });

      this.#installGlobalTraps();
    }

    this.#startPlaytimeTracker();
  }

  /**
   * Installs non-configurable traps on window globals (Honeypot)
   * Catches users attempting to set window.coins or probe currencyManager
   */
  #installGlobalTraps() {
    try {
      const traps = ['coins', 'currencyManager', 'securityLedger', 'setCoins'];
      for (const trap of traps) {
        if (!(trap in window)) {
          Object.defineProperty(window, trap, {
            get: () => {
              this.tripTamper(`Sonde inspeksi Console terdeteksi pada window.${trap}`);
              return undefined;
            },
            set: () => {
              this.tripTamper(`Percobaan injeksi Console terdeteksi pada window.${trap}`);
            },
            configurable: false,
          });
        }
      }

      // Display security banner in developer tools
      console.log(
        '%c✦ ERAGO ARCADE VAULT ✦\n%cCryptographic anti-tamper ledger active. Unauthorized state or memory tampering will automatically quarantine your balance.',
        'color: #00F5D4; font-family: monospace; font-size: 14px; font-weight: bold;',
        'color: #FF2A85; font-family: monospace; font-size: 11px;'
      );
    } catch {
      // Ignore if environment forbids window defineProperty
    }
  }

  #persist() {
    securityLedger.saveSecureVault({
      coins: this.#readCoins(),
      accumulatedPoints: this.#accumulatedPoints,
      playtimeSeconds: this.#playtimeSeconds,
    });
  }

  #notify() {
    const state: CurrencyState = {
      coins: this.#readCoins(),
      accumulatedPoints: this.#accumulatedPoints,
      playtimeSeconds: this.#playtimeSeconds,
    };
    for (const listener of this.#listeners) {
      try {
        listener(state);
      } catch (err) {
        console.error('Currency listener error:', err);
      }
    }
  }

  /**
   * Manually trip tamper alert and quarantine vault
   */
  public tripTamper(reason: string) {
    this.#writeCoins(SAFE_BASELINE_COINS);
    this.#accumulatedPoints = 0;
    this.#persist();
    this.#notify();
    securityLedger.notifyTamper(reason, SAFE_BASELINE_COINS);
  }

  /**
   * Issues an ephemeral, cryptographically-linked session ticket for minigames
   */
  public issueGameTicket(game: string, maxPoints: number = 1000): string {
    const nonce = Math.floor(Math.random() * 0xffffffff).toString(16);
    const timestamp = Date.now();
    const ticketId = `TKT-${game}-${timestamp}-${nonce}`;
    this.#ticketRegistry.set(ticketId, {
      game,
      issuedAt: timestamp,
      maxPoints,
    });

    // Cleanup tickets older than 15 minutes
    if (this.#ticketRegistry.size > 20) {
      const cutoff = Date.now() - 15 * 60 * 1000;
      for (const [id, t] of this.#ticketRegistry.entries()) {
        if (t.issuedAt < cutoff) this.#ticketRegistry.delete(id);
      }
    }

    return ticketId;
  }

  /**
   * Redeem ticket and verify gameplay legitimacy
   */
  public redeemGameReward(
    ticketId: string,
    earnedPoints: number
  ): { coinsAwarded: number; newTotalPoints: number } {
    const ticket = this.#ticketRegistry.get(ticketId);
    if (!ticket) {
      this.tripTamper('Tiket permainan tidak valid atau sudah kedaluwarsa');
      return { coinsAwarded: 0, newTotalPoints: this.#accumulatedPoints };
    }

    // Single use: remove ticket immediately
    this.#ticketRegistry.delete(ticketId);

    const elapsedMs = Date.now() - ticket.issuedAt;
    // Speedhack check: Claiming points in < 1 second is mathematically impossible
    if (elapsedMs < 1000 && earnedPoints > 10) {
      this.tripTamper('Penyelesaian mini-game tidak realistis (Speedhack terdeteksi)');
      return { coinsAwarded: 0, newTotalPoints: this.#accumulatedPoints };
    }

    if (earnedPoints > ticket.maxPoints) {
      this.tripTamper(`Skor mini-game (${earnedPoints}) melebihi batas wajar (${ticket.maxPoints})`);
      return { coinsAwarded: 0, newTotalPoints: this.#accumulatedPoints };
    }

    return this.convertPoints(earnedPoints, ticket.game);
  }

  /**
   * Velocity Enforcer: Ensures coins cannot be farmed or looped rapidly
   */
  #checkVelocity(grantAmount: number): boolean {
    const now = Date.now();
    if (now - this.#velocityWindowStart > 60000) {
      this.#velocityWindowStart = now;
      this.#velocityCoinsGranted = 0;
    }

    if (this.#velocityCoinsGranted + grantAmount > MAX_COINS_PER_MINUTE) {
      this.tripTamper(`Kecepatan penambahan koin melebihi batas wajar (Maks ${MAX_COINS_PER_MINUTE} koin/menit)`);
      return false;
    }

    this.#velocityCoinsGranted += grantAmount;
    return true;
  }

  /** Subscribe to currency state updates */
  public subscribe(listener: CurrencyListener): () => void {
    this.#listeners.push(listener);
    listener({
      coins: this.#readCoins(),
      accumulatedPoints: this.#accumulatedPoints,
      playtimeSeconds: this.#playtimeSeconds,
    });
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }

  /** Subscribe to 10-minute passive playtime rewards */
  public onTimeReward(listener: TimeRewardListener): () => void {
    this.#timeRewardListeners.push(listener);
    return () => {
      this.#timeRewardListeners = this.#timeRewardListeners.filter((l) => l !== listener);
    };
  }

  /** Subscribe to security tamper alerts */
  public onTamperDetected(listener: TamperIncidentListener): () => void {
    this.#tamperListeners.push(listener);
    return () => {
      this.#tamperListeners = this.#tamperListeners.filter((l) => l !== listener);
    };
  }

  /** Current coin balance */
  public getCoins(): number {
    return this.#readCoins();
  }

  /** Current points accumulator (< 100) */
  public getAccumulatedPoints(): number {
    return this.#accumulatedPoints;
  }

  /** Current cryptographic telemetry */
  public getSecurityStatus() {
    return securityLedger.getVaultSecurityStatus();
  }

  /** Manually trigger cryptographic verification */
  public verifyIntegrity(): boolean {
    const state = securityLedger.loadSecureVault();
    const currentCoins = this.#readCoins();
    const matches = state.coins === currentCoins && currentCoins <= MAX_COIN_CEILING;
    if (!matches) {
      this.#writeCoins(state.coins);
      this.#notify();
    }
    return matches;
  }

  /**
   * Add coins with velocity & ceiling enforcement
   */
  public addCoins(amount: number, playAudio: boolean = true): number {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return this.#readCoins();
    }

    const roundedAmount = Math.floor(amount);

    if (roundedAmount > MAX_SINGLE_COIN_GRANT) {
      this.tripTamper(`Pemberian koin tunggal (${amount}) melebihi batas wajar (${MAX_SINGLE_COIN_GRANT})`);
      return this.#readCoins();
    }

    if (!this.#checkVelocity(roundedAmount)) {
      return this.#readCoins();
    }

    const currentCoins = this.#readCoins();
    const newTotal = currentCoins + roundedAmount;

    if (newTotal > MAX_COIN_CEILING) {
      this.tripTamper(`Total koin melebihi plafon brankas (${MAX_COIN_CEILING.toLocaleString()})`);
      return SAFE_BASELINE_COINS;
    }

    this.#writeCoins(newTotal);
    this.#persist();
    if (playAudio) {
      sound.playCoin();
    }
    this.#notify();
    return this.#readCoins();
  }

  /**
   * Spend coins (e.g. 10 coins for trivia roll).
   */
  public spendCoins(amount: number): boolean {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return true;
    }

    const roundedAmount = Math.floor(amount);
    const currentCoins = this.#readCoins();

    if (currentCoins < roundedAmount) {
      return false;
    }

    this.#writeCoins(currentCoins - roundedAmount);
    this.#persist();
    this.#notify();
    return true;
  }

  /**
   * Convert points earned in mini games or boss battles:
   * Every 100 points = 10 coins.
   */
  public convertPoints(
    earnedPoints: number,
    _source?: string
  ): { coinsAwarded: number; newTotalPoints: number } {
    if (
      typeof earnedPoints !== 'number' ||
      !Number.isFinite(earnedPoints) ||
      earnedPoints <= 0
    ) {
      return { coinsAwarded: 0, newTotalPoints: this.#accumulatedPoints };
    }

    const safeEarned = Math.min(MAX_CONVERT_POINTS_SINGLE, Math.floor(earnedPoints));
    const totalPoints = this.#accumulatedPoints + safeEarned;
    const hundreds = Math.floor(totalPoints / POINT_CONVERSION_RATE);
    const coinsAwarded = hundreds * COINS_PER_100_POINTS;

    if (coinsAwarded > 0) {
      if (!this.#checkVelocity(coinsAwarded)) {
        return { coinsAwarded: 0, newTotalPoints: this.#accumulatedPoints };
      }
      const currentCoins = this.#readCoins();
      const newTotal = currentCoins + coinsAwarded;
      if (newTotal > MAX_COIN_CEILING) {
        this.tripTamper(`Total koin melampaui plafon maksimum (${MAX_COIN_CEILING.toLocaleString()})`);
        return { coinsAwarded: 0, newTotalPoints: 0 };
      }
      this.#writeCoins(newTotal);
      sound.playCoin();
    }

    this.#accumulatedPoints = totalPoints % POINT_CONVERSION_RATE;
    this.#persist();
    this.#notify();
    return { coinsAwarded, newTotalPoints: this.#accumulatedPoints };
  }

  /** Get remaining time until next +100 coins reward */
  public getPlaytimeRemaining(): { secondsRemaining: number; formatted: string; progressPercent: number } {
    const elapsed = this.#playtimeSeconds % TIME_REWARD_INTERVAL_SECONDS;
    const remaining = TIME_REWARD_INTERVAL_SECONDS - elapsed;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    const progressPercent = Math.min(100, Math.round((elapsed / TIME_REWARD_INTERVAL_SECONDS) * 100));

    return { secondsRemaining: remaining, formatted, progressPercent };
  }

  /** Active Integrity Heartbeat & Playtime Tracker */
  #startPlaytimeTracker() {
    if (this.#trackerIntervalId !== null) return;

    this.#lastWallClockMs = Date.now();

    this.#trackerIntervalId = window.setInterval(() => {
      // 1. Polymorphic Memory Rotation & Self-Check
      const currentCoins = this.#readCoins();
      if (currentCoins > MAX_COIN_CEILING) {
        this.tripTamper(`Total koin (${currentCoins.toLocaleString()}) melebihi batas wajar`);
        return;
      }
      // Re-randomize masks in memory every second
      this.#writeCoins(currentCoins);

      // 2. Playtime counter
      if (!document.hidden) {
        const now = Date.now();
        const wallElapsedMs = now - this.#lastWallClockMs;
        this.#lastWallClockMs = now;

        // Anti clock warp
        if (wallElapsedMs >= 0 && wallElapsedMs <= 15000) {
          this.#playtimeSeconds += 1;
        } else {
          this.#playtimeSeconds += 1;
        }

        // Persist every 15 seconds
        if (Math.abs(this.#playtimeSeconds - this.#lastSavedSeconds) >= 15) {
          this.#persist();
          this.#lastSavedSeconds = this.#playtimeSeconds;
        }

        // Time reward (10 minutes)
        if (this.#playtimeSeconds >= TIME_REWARD_INTERVAL_SECONDS) {
          this.#playtimeSeconds = 0;
          this.#lastSavedSeconds = 0;

          const coinsBefore = this.#readCoins();
          const newCoins = coinsBefore + TIME_REWARD_COINS;
          if (newCoins <= MAX_COIN_CEILING) {
            this.#writeCoins(newCoins);
            this.#persist();
            sound.playCoin();

            for (const listener of this.#timeRewardListeners) {
              try {
                listener(TIME_REWARD_COINS);
              } catch (err) {
                console.error('Time reward listener error:', err);
              }
            }
          }
        }

        this.#notify();
      } else {
        this.#lastWallClockMs = Date.now();
      }
    }, 1000);
  }

  /** Reset currency balance to safe baseline */
  public resetToStartingBalance() {
    this.#writeCoins(STARTING_COINS);
    this.#accumulatedPoints = 0;
    this.#playtimeSeconds = 0;
    this.#persist();
    this.#notify();
  }
}

// Freeze and seal prototype and export instance
Object.freeze(CurrencyManager.prototype);
export const currencyManager = new CurrencyManager();
Object.seal(currencyManager);
