import { sound } from '../audio/soundEngine';
import {
  securityLedger,
  SAFE_BASELINE_COINS,
  type TamperIncident,
} from './securityLedger';

export const STARTING_COINS = SAFE_BASELINE_COINS;
export const ROLL_COST = 10;
export const POINT_CONVERSION_RATE = 100; // 100 points = 10 coins
export const COINS_PER_100_POINTS = 10;
export const TIME_REWARD_COINS = 100;
export const TIME_REWARD_INTERVAL_SECONDS = 600; // 10 minutes = 600 seconds
export const BOSS_CLEAR_REWARD_COINS = 20; // 20 coins rewarded for clearing Trivia Boss Rush

// Security velocity constraints
const MAX_SINGLE_COIN_GRANT = 500;
const MAX_CONVERT_POINTS_SINGLE = 5000;

export interface CurrencyState {
  coins: number;
  accumulatedPoints: number;
  playtimeSeconds: number;
}

export type CurrencyListener = (state: CurrencyState) => void;
export type TimeRewardListener = (coinsAwarded: number) => void;
export type TamperIncidentListener = (incident: TamperIncident) => void;

class CurrencyManager {
  private coins: number = STARTING_COINS;
  private accumulatedPoints: number = 0;
  private playtimeSeconds: number = 0;
  private listeners: CurrencyListener[] = [];
  private timeRewardListeners: TimeRewardListener[] = [];
  private tamperListeners: TamperIncidentListener[] = [];
  private trackerIntervalId: number | null = null;
  private lastSavedSeconds: number = 0;
  private lastWallClockMs: number = Date.now();

  constructor() {
    this.init();
  }

  private init() {
    // 1. Cryptographically load and verify vault state
    const state = securityLedger.loadSecureVault();
    this.coins = state.coins;
    this.accumulatedPoints = state.accumulatedPoints;
    this.playtimeSeconds = state.playtimeSeconds;
    this.lastSavedSeconds = this.playtimeSeconds;
    this.lastWallClockMs = Date.now();

    // 2. Listen for security tampering incidents
    securityLedger.onTamperDetected((incident) => {
      this.coins = incident.revertedToCoins;
      this.notify();
      for (const listener of this.tamperListeners) {
        try {
          listener(incident);
        } catch (err) {
          console.error('Error in tamper listener:', err);
        }
      }
    });

    // 3. Cross-tab & storage anti-tamper listener
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e: StorageEvent) => {
        if (e.key === 'erago_vault_secure_ledger') {
          // Re-verify against cryptographic ledger
          const updated = securityLedger.loadSecureVault();
          this.coins = updated.coins;
          this.accumulatedPoints = updated.accumulatedPoints;
          this.playtimeSeconds = updated.playtimeSeconds;
          this.notify();
        } else if (
          e.key === 'erago_arcade_coins' ||
          e.key === 'erago_arcade_points_acc' ||
          e.key === 'erago_arcade_playtime_sec'
        ) {
          // Someone tried writing to legacy plaintext keys! Purge them immediately.
          try {
            localStorage.removeItem(e.key);
          } catch {
            // Ignore
          }
        }
      });
    }

    this.startPlaytimeTracker();
  }

  private persist() {
    securityLedger.saveSecureVault({
      coins: this.coins,
      accumulatedPoints: this.accumulatedPoints,
      playtimeSeconds: this.playtimeSeconds,
    });
  }

  private notify() {
    const state: CurrencyState = {
      coins: this.coins,
      accumulatedPoints: this.accumulatedPoints,
      playtimeSeconds: this.playtimeSeconds,
    };
    for (const listener of this.listeners) {
      try {
        listener(state);
      } catch (err) {
        console.error('Currency listener error:', err);
      }
    }
  }

  /** Subscribe to currency state updates */
  public subscribe(listener: CurrencyListener): () => void {
    this.listeners.push(listener);
    // Immediately emit current state
    listener({
      coins: this.coins,
      accumulatedPoints: this.accumulatedPoints,
      playtimeSeconds: this.playtimeSeconds,
    });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /** Subscribe to 10-minute passive playtime rewards */
  public onTimeReward(listener: TimeRewardListener): () => void {
    this.timeRewardListeners.push(listener);
    return () => {
      this.timeRewardListeners = this.timeRewardListeners.filter((l) => l !== listener);
    };
  }

  /** Subscribe to security tamper alerts */
  public onTamperDetected(listener: TamperIncidentListener): () => void {
    this.tamperListeners.push(listener);
    return () => {
      this.tamperListeners = this.tamperListeners.filter((l) => l !== listener);
    };
  }

  /** Current coin balance */
  public getCoins(): number {
    return this.coins;
  }

  /** Current points accumulator (< 100) */
  public getAccumulatedPoints(): number {
    return this.accumulatedPoints;
  }

  /** Current cryptographic telemetry */
  public getSecurityStatus() {
    return securityLedger.getVaultSecurityStatus();
  }

  /** Manually trigger cryptographic verification */
  public verifyIntegrity(): boolean {
    const state = securityLedger.loadSecureVault();
    const matches = state.coins === this.coins;
    if (!matches) {
      this.coins = state.coins;
      this.notify();
    }
    return matches;
  }

  /**
   * Add coins with transaction sanity & velocity enforcement
   * Prevents unauthorized bulk-injection from console or scripts
   */
  public addCoins(amount: number, playAudio: boolean = true): number {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return this.coins;
    }

    const roundedAmount = Math.floor(amount);

    // Sanity enforcement: reject abnormal coin injections
    if (roundedAmount > MAX_SINGLE_COIN_GRANT) {
      console.warn(
        `[SECURITY AUDIT] Transaction of ${amount} coins blocked: exceeds single-reward limit of ${MAX_SINGLE_COIN_GRANT}.`
      );
      return this.coins;
    }

    this.coins += roundedAmount;
    this.persist();
    if (playAudio) {
      sound.playCoin();
    }
    this.notify();
    return this.coins;
  }

  /**
   * Spend coins (e.g. 10 coins for trivia roll).
   * Returns true if successful, false if insufficient coins.
   */
  public spendCoins(amount: number): boolean {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return true;
    }

    const roundedAmount = Math.floor(amount);
    if (this.coins < roundedAmount) {
      return false;
    }

    this.coins -= roundedAmount;
    this.persist();
    this.notify();
    return true;
  }

  /**
   * Convert points earned in mini games or boss battles:
   * Every 100 points = 10 coins.
   * Remaining points (< 100) are stored in the accumulator buffer for the next game.
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
      return { coinsAwarded: 0, newTotalPoints: this.accumulatedPoints };
    }

    // Sanity check: cap single-game conversions
    const safeEarned = Math.min(MAX_CONVERT_POINTS_SINGLE, Math.floor(earnedPoints));

    const totalPoints = this.accumulatedPoints + safeEarned;
    const hundreds = Math.floor(totalPoints / POINT_CONVERSION_RATE);
    const coinsAwarded = hundreds * COINS_PER_100_POINTS;
    this.accumulatedPoints = totalPoints % POINT_CONVERSION_RATE;

    if (coinsAwarded > 0) {
      this.coins += coinsAwarded;
      sound.playCoin();
    }

    this.persist();
    this.notify();
    return { coinsAwarded, newTotalPoints: this.accumulatedPoints };
  }

  /** Get remaining time until next +100 coins reward */
  public getPlaytimeRemaining(): { secondsRemaining: number; formatted: string; progressPercent: number } {
    const elapsed = this.playtimeSeconds % TIME_REWARD_INTERVAL_SECONDS;
    const remaining = TIME_REWARD_INTERVAL_SECONDS - elapsed;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    const progressPercent = Math.min(100, Math.round((elapsed / TIME_REWARD_INTERVAL_SECONDS) * 100));

    return { secondsRemaining: remaining, formatted, progressPercent };
  }

  /** Background tracker counting seconds active on website with anti-clock-warp */
  private startPlaytimeTracker() {
    if (this.trackerIntervalId !== null) return;

    this.lastWallClockMs = Date.now();

    this.trackerIntervalId = window.setInterval(() => {
      // Only count active playtime if page is visible
      if (document.hidden) {
        this.lastWallClockMs = Date.now();
        return;
      }

      const now = Date.now();
      const wallElapsedMs = now - this.lastWallClockMs;
      this.lastWallClockMs = now;

      // Anti-clock-warp detection: if system clock jumped backwards or skipped forward wildly
      if (wallElapsedMs < 0 || wallElapsedMs > 15000) {
        // System resumed from sleep or clock was adjusted, increment safely by 1
        this.playtimeSeconds += 1;
      } else {
        this.playtimeSeconds += 1;
      }

      // Periodically persist every 15 seconds to ledger
      if (Math.abs(this.playtimeSeconds - this.lastSavedSeconds) >= 15) {
        this.persist();
        this.lastSavedSeconds = this.playtimeSeconds;
      }

      // Check if 10-minute interval (600 seconds) reached
      if (this.playtimeSeconds >= TIME_REWARD_INTERVAL_SECONDS) {
        this.playtimeSeconds = 0;
        this.lastSavedSeconds = 0;

        // Award 100 coins (passes sanity limits)
        this.coins += TIME_REWARD_COINS;
        this.persist();
        sound.playCoin();

        // Fire time reward listeners (for banner notification)
        for (const listener of this.timeRewardListeners) {
          try {
            listener(TIME_REWARD_COINS);
          } catch (err) {
            console.error('Time reward listener error:', err);
          }
        }
      }

      // Notify listeners periodically
      this.notify();
    }, 1000);
  }

  /** Reset currency balance back to safe baseline (helpful for testing/debug) */
  public resetToStartingBalance() {
    this.coins = STARTING_COINS;
    this.accumulatedPoints = 0;
    this.playtimeSeconds = 0;
    this.persist();
    this.notify();
  }
}

// Freeze prototype to prevent runtime method monkeypatching
Object.freeze(CurrencyManager.prototype);

export const currencyManager = new CurrencyManager();
