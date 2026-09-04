import { sound } from '../audio/soundEngine';

export const STARTING_COINS = 2000;
export const ROLL_COST = 10;
export const POINT_CONVERSION_RATE = 100; // 100 points = 10 coins
export const COINS_PER_100_POINTS = 10;
export const TIME_REWARD_COINS = 100;
export const TIME_REWARD_INTERVAL_SECONDS = 600; // 10 minutes = 600 seconds

const STORAGE_KEY_COINS = 'erago_arcade_coins';
const STORAGE_KEY_POINTS_ACC = 'erago_arcade_points_acc';
const STORAGE_KEY_PLAYTIME = 'erago_arcade_playtime_sec';

export interface CurrencyState {
  coins: number;
  accumulatedPoints: number;
  playtimeSeconds: number;
}

export type CurrencyListener = (state: CurrencyState) => void;
export type TimeRewardListener = (coinsAwarded: number) => void;

class CurrencyManager {
  private coins: number = STARTING_COINS;
  private accumulatedPoints: number = 0;
  private playtimeSeconds: number = 0;
  private listeners: CurrencyListener[] = [];
  private timeRewardListeners: TimeRewardListener[] = [];
  private trackerIntervalId: number | null = null;
  private lastSavedSeconds: number = 0;

  constructor() {
    this.init();
  }

  private init() {
    // Load coins
    try {
      const storedCoins = localStorage.getItem(STORAGE_KEY_COINS);
      if (storedCoins === null) {
        this.coins = STARTING_COINS;
        localStorage.setItem(STORAGE_KEY_COINS, this.coins.toString());
      } else {
        const parsed = parseInt(storedCoins, 10);
        this.coins = Number.isNaN(parsed) ? STARTING_COINS : Math.max(0, parsed);
      }
    } catch {
      this.coins = STARTING_COINS;
    }

    // Load accumulated points buffer (< 100 points waiting to convert)
    try {
      const storedPoints = localStorage.getItem(STORAGE_KEY_POINTS_ACC);
      if (storedPoints !== null) {
        const parsed = parseInt(storedPoints, 10);
        this.accumulatedPoints = Number.isNaN(parsed) ? 0 : Math.max(0, parsed % POINT_CONVERSION_RATE);
      }
    } catch {
      this.accumulatedPoints = 0;
    }

    // Load playtime progress (0 .. 599 seconds)
    try {
      const storedPlaytime = localStorage.getItem(STORAGE_KEY_PLAYTIME);
      if (storedPlaytime !== null) {
        const parsed = parseInt(storedPlaytime, 10);
        this.playtimeSeconds = Number.isNaN(parsed) ? 0 : Math.max(0, parsed % TIME_REWARD_INTERVAL_SECONDS);
        this.lastSavedSeconds = this.playtimeSeconds;
      }
    } catch {
      this.playtimeSeconds = 0;
    }

    this.startPlaytimeTracker();
  }

  private persistCoins() {
    try {
      localStorage.setItem(STORAGE_KEY_COINS, this.coins.toString());
    } catch {
      // Ignore storage errors
    }
  }

  private persistPoints() {
    try {
      localStorage.setItem(STORAGE_KEY_POINTS_ACC, this.accumulatedPoints.toString());
    } catch {
      // Ignore
    }
  }

  private persistPlaytime() {
    try {
      localStorage.setItem(STORAGE_KEY_PLAYTIME, this.playtimeSeconds.toString());
    } catch {
      // Ignore
    }
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

  /** Current coin balance */
  public getCoins(): number {
    return this.coins;
  }

  /** Current points accumulator (< 100) */
  public getAccumulatedPoints(): number {
    return this.accumulatedPoints;
  }

  /** Add coins directly (with optional audio chime) */
  public addCoins(amount: number, playAudio: boolean = true): number {
    if (amount <= 0) return this.coins;
    this.coins += amount;
    this.persistCoins();
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
    if (amount <= 0) return true;
    if (this.coins < amount) {
      return false;
    }
    this.coins -= amount;
    this.persistCoins();
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
    if (earnedPoints <= 0) {
      return { coinsAwarded: 0, newTotalPoints: this.accumulatedPoints };
    }

    const totalPoints = this.accumulatedPoints + earnedPoints;
    const hundreds = Math.floor(totalPoints / POINT_CONVERSION_RATE);
    const coinsAwarded = hundreds * COINS_PER_100_POINTS;
    this.accumulatedPoints = totalPoints % POINT_CONVERSION_RATE;

    this.persistPoints();

    if (coinsAwarded > 0) {
      this.coins += coinsAwarded;
      this.persistCoins();
      sound.playCoin();
    }

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

  /** Background tracker counting seconds active on website */
  private startPlaytimeTracker() {
    if (this.trackerIntervalId !== null) return;

    this.trackerIntervalId = window.setInterval(() => {
      // Only count active playtime if page is visible
      if (document.hidden) return;

      this.playtimeSeconds += 1;

      // Periodically persist every 15 seconds to avoid excessive storage writes
      if (Math.abs(this.playtimeSeconds - this.lastSavedSeconds) >= 15) {
        this.persistPlaytime();
        this.lastSavedSeconds = this.playtimeSeconds;
      }

      // Check if 10-minute interval (600 seconds) reached
      if (this.playtimeSeconds >= TIME_REWARD_INTERVAL_SECONDS) {
        this.playtimeSeconds = 0;
        this.persistPlaytime();
        this.lastSavedSeconds = 0;

        // Award 100 coins
        this.addCoins(TIME_REWARD_COINS, true);

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

  /** Reset currency balance back to 2,000 (helpful for testing/debug) */
  public resetToStartingBalance() {
    this.coins = STARTING_COINS;
    this.accumulatedPoints = 0;
    this.playtimeSeconds = 0;
    this.persistCoins();
    this.persistPoints();
    this.persistPlaytime();
    this.notify();
  }
}

export const currencyManager = new CurrencyManager();
