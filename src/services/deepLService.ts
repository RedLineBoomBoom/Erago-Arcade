/**
 * DeepL Translation Service (https://www.deepl.com/)
 * Official DeepL API integration for high-fidelity neural machine translation.
 * Supports DeepL API Free and Pro, persistent localStorage caching, batching,
 * quota usage metrics, and graceful offline/curated fallbacks.
 */

import type { TriviaItem } from '../types/trivia';
import { TRIVIA_ID_OVERLAYS } from '../utils/i18n';

const STORAGE_KEY_DEEPL_KEY = 'erago_deepl_api_key';
const STORAGE_KEY_DEEPL_CACHE = 'erago_deepl_cache_v2';
const STORAGE_KEY_DEEPL_LIVE_ENABLED = 'erago_deepl_live_enabled';

export interface DeepLUsage {
  characterCount: number;
  characterLimit: number;
}

export interface DeepLStatus {
  hasKey: boolean;
  isLiveEnabled: boolean;
  keyType: 'free' | 'pro' | 'none';
  cachedItemsCount: number;
  usage: DeepLUsage | null;
  lastError: string | null;
}

// In-memory cache loaded from localStorage
let translationCache: Record<string, string> = {};

try {
  const stored = localStorage.getItem(STORAGE_KEY_DEEPL_CACHE);
  if (stored) {
    translationCache = JSON.parse(stored);
  }
} catch {
  translationCache = {};
}

// Simple deterministic hash for cache keys
const hashKey = (text: string, targetLang: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return `${targetLang}_${hash}`;
};

const saveCache = () => {
  try {
    localStorage.setItem(STORAGE_KEY_DEEPL_CACHE, JSON.stringify(translationCache));
  } catch {
    // LocalStorage quota might be full; prune oldest half if needed
    const keys = Object.keys(translationCache);
    if (keys.length > 500) {
      const pruned: Record<string, string> = {};
      keys.slice(Math.floor(keys.length / 2)).forEach((k) => {
        pruned[k] = translationCache[k];
      });
      translationCache = pruned;
      try {
        localStorage.setItem(STORAGE_KEY_DEEPL_CACHE, JSON.stringify(translationCache));
      } catch {
        // Ignore
      }
    }
  }
};

class DeepLTranslationService {
  private listeners = new Set<(status: DeepLStatus) => void>();
  private lastUsage: DeepLUsage | null = null;
  private lastError: string | null = null;

  /**
   * Retrieves the configured DeepL API key.
   */
  public getApiKey(): string {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEEPL_KEY);
      if (saved && saved.trim()) return saved.trim();
    } catch {
      // Ignore
    }
    // Fall back to environment variable if configured
    const envKey = (import.meta.env.VITE_DEEPL_API_KEY as string | undefined)?.trim();
    return envKey || '';
  }

  /**
   * Sets or updates the DeepL API key.
   */
  public setApiKey(key: string): void {
    const cleanKey = key.trim();
    try {
      if (cleanKey) {
        localStorage.setItem(STORAGE_KEY_DEEPL_KEY, cleanKey);
      } else {
        localStorage.removeItem(STORAGE_KEY_DEEPL_KEY);
      }
    } catch {
      // Ignore
    }
    this.lastError = null;
    this.notifyStatus();
    if (cleanKey) {
      this.fetchUsage();
    }
  }

  /**
   * Whether DeepL live translation is toggled on.
   */
  public isLiveEnabled(): boolean {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEEPL_LIVE_ENABLED);
      if (saved === null) return true; // Default to enabled
      return saved === 'true';
    } catch {
      return true;
    }
  }

  public setLiveEnabled(enabled: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY_DEEPL_LIVE_ENABLED, String(enabled));
    } catch {
      // Ignore
    }
    this.notifyStatus();
  }

  /**
   * Returns whether the key is Free (:fx suffix) or Pro.
   */
  public getKeyType(): 'free' | 'pro' | 'none' {
    const key = this.getApiKey();
    if (!key) return 'none';
    return key.endsWith(':fx') ? 'free' : 'pro';
  }

  /**
   * Determines the base URL for DeepL requests.
   * Uses local Vite proxy in development to avoid CORS issues,
   * or direct DeepL endpoints in production.
   */
  private getBaseUrl(): string {
    const isFree = this.getKeyType() === 'free';
    const isDev = import.meta.env.DEV;

    if (isDev) {
      return isFree ? '/api/deepl-free' : '/api/deepl-pro';
    }
    return isFree ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  }

  /**
   * Fetches DeepL API character usage metrics.
   */
  public async fetchUsage(): Promise<DeepLUsage | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) return null;

    try {
      const baseUrl = this.getBaseUrl();
      const res = await fetch(`${baseUrl}/v2/usage`, {
        method: 'GET',
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey}`,
        },
      });

      if (!res.ok) {
        throw new Error(`DeepL Usage HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      this.lastUsage = {
        characterCount: data.character_count ?? 0,
        characterLimit: data.character_limit ?? 500000,
      };
      this.lastError = null;
      this.notifyStatus();
      return this.lastUsage;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.lastError = msg;
      this.notifyStatus();
      return null;
    }
  }

  /**
   * Translates a single text string using DeepL API with caching.
   */
  public async translateText(
    text: string,
    targetLang: 'id' | 'en' = 'id',
    sourceLang?: 'id' | 'en'
  ): Promise<string> {
    if (!text || !text.trim()) return text;

    const trimmed = text.trim();
    const cacheKey = hashKey(trimmed, targetLang);

    // 1. Check persistent cache
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    const apiKey = this.getApiKey();
    const liveEnabled = this.isLiveEnabled();

    // If live translation disabled or no API key, check fallback dictionary
    if (!apiKey || !liveEnabled) {
      return this.getStaticFallback(trimmed, targetLang);
    }

    // 2. Call DeepL API
    try {
      const baseUrl = this.getBaseUrl();
      const targetParam = targetLang === 'en' ? 'EN-US' : 'ID';
      const bodyPayload: Record<string, unknown> = {
        text: [trimmed],
        target_lang: targetParam,
      };
      if (sourceLang) {
        bodyPayload.source_lang = sourceLang.toUpperCase();
      }

      const res = await fetch(`${baseUrl}/v2/translate`, {
        method: 'POST',
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        throw new Error(`DeepL API Error ${res.status}: ${errorText || res.statusText}`);
      }

      const data = await res.json();
      const translated = data?.translations?.[0]?.text;

      if (translated) {
        translationCache[cacheKey] = translated;
        saveCache();
        this.lastError = null;
        return translated;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.lastError = msg;
      console.warn('[DeepL] Translation call failed, using fallback:', msg);
    }

    // 3. Fallback to static dictionary or original
    return this.getStaticFallback(trimmed, targetLang);
  }

  /**
   * Translates an array of strings in a single batch request to DeepL.
   */
  public async translateBatch(
    texts: string[],
    targetLang: 'id' | 'en' = 'id',
    sourceLang?: 'id' | 'en'
  ): Promise<string[]> {
    if (!texts.length) return [];

    const apiKey = this.getApiKey();
    const liveEnabled = this.isLiveEnabled();

    // Identify which items need fetching vs already cached
    const results: string[] = new Array(texts.length);
    const uncachedIndices: number[] = [];
    const uncachedTexts: string[] = [];

    texts.forEach((txt, idx) => {
      if (!txt || !txt.trim()) {
        results[idx] = txt;
        return;
      }
      const k = hashKey(txt.trim(), targetLang);
      if (translationCache[k]) {
        results[idx] = translationCache[k];
      } else {
        uncachedIndices.push(idx);
        uncachedTexts.push(txt.trim());
      }
    });

    if (uncachedTexts.length === 0) {
      return results;
    }

    if (!apiKey || !liveEnabled) {
      uncachedIndices.forEach((origIdx, i) => {
        results[origIdx] = this.getStaticFallback(uncachedTexts[i], targetLang);
      });
      return results;
    }

    // Fetch batch from DeepL API
    try {
      const baseUrl = this.getBaseUrl();
      const targetParam = targetLang === 'en' ? 'EN-US' : 'ID';
      const bodyPayload: Record<string, unknown> = {
        text: uncachedTexts,
        target_lang: targetParam,
      };
      if (sourceLang) {
        bodyPayload.source_lang = sourceLang.toUpperCase();
      }

      const res = await fetch(`${baseUrl}/v2/translate`, {
        method: 'POST',
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) {
        throw new Error(`DeepL Batch Error ${res.status}`);
      }

      const data = await res.json();
      const translations: Array<{ text: string }> = data?.translations || [];

      uncachedIndices.forEach((origIdx, i) => {
        const translated = translations[i]?.text || this.getStaticFallback(uncachedTexts[i], targetLang);
        results[origIdx] = translated;
        const k = hashKey(uncachedTexts[i], targetLang);
        translationCache[k] = translated;
      });

      saveCache();
      this.lastError = null;
      return results;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.lastError = msg;
      console.warn('[DeepL] Batch translation failed, using fallback:', msg);

      uncachedIndices.forEach((origIdx, i) => {
        results[origIdx] = this.getStaticFallback(uncachedTexts[i], targetLang);
      });
      return results;
    }
  }

  /**
   * Translates a complete TriviaItem using DeepL.
   */
  public async translateTrivia(item: TriviaItem, targetLang: 'id' | 'en'): Promise<TriviaItem> {
    if (targetLang === 'en') {
      return item;
    }

    // Check pre-curated DeepL overlay first
    const curated = TRIVIA_ID_OVERLAYS[item.id];
    if (curated) {
      return {
        ...item,
        headline: curated.headline ?? item.headline,
        story: curated.story ?? item.story,
        verifiedFact: curated.verifiedFact ?? item.verifiedFact,
        quoteOrLore: curated.quoteOrLore ?? item.quoteOrLore,
        easterEggNote: curated.easterEggNote ?? item.easterEggNote,
        quizQuestion: curated.quizQuestion ?? item.quizQuestion,
        quizOptions: curated.quizOptions ?? item.quizOptions,
        quizExplanation: curated.quizExplanation ?? item.quizExplanation,
      };
    }

    // If not curated, translate dynamically via DeepL
    const fieldsToTranslate: string[] = [
      item.headline,
      item.story,
      item.verifiedFact,
      item.quoteOrLore ?? '',
      item.easterEggNote ?? '',
      item.quizQuestion ?? '',
      item.quizExplanation ?? '',
    ];

    const translatedFields = await this.translateBatch(fieldsToTranslate, 'id', 'en');

    // Translate quiz options if present
    let translatedOptions = item.quizOptions;
    if (item.quizOptions && item.quizOptions.length > 0) {
      translatedOptions = await this.translateBatch(item.quizOptions, 'id', 'en');
    }

    return {
      ...item,
      headline: translatedFields[0] || item.headline,
      story: translatedFields[1] || item.story,
      verifiedFact: translatedFields[2] || item.verifiedFact,
      quoteOrLore: item.quoteOrLore ? (translatedFields[3] || item.quoteOrLore) : undefined,
      easterEggNote: item.easterEggNote ? (translatedFields[4] || item.easterEggNote) : undefined,
      quizQuestion: translatedFields[5] || item.quizQuestion,
      quizExplanation: translatedFields[6] || item.quizExplanation,
      quizOptions: translatedOptions,
    };
  }

  /**
   * Static fallback when offline or no API key.
   */
  private getStaticFallback(text: string, _targetLang: string): string {
    // Return original text as safe fallback
    return text;
  }

  /**
   * Clears the translation cache.
   */
  public clearCache(): void {
    translationCache = {};
    try {
      localStorage.removeItem(STORAGE_KEY_DEEPL_CACHE);
    } catch {
      // Ignore
    }
    this.notifyStatus();
  }

  /**
   * Get current DeepL status snapshot.
   */
  public getStatus(): DeepLStatus {
    const key = this.getApiKey();
    return {
      hasKey: Boolean(key),
      isLiveEnabled: this.isLiveEnabled(),
      keyType: this.getKeyType(),
      cachedItemsCount: Object.keys(translationCache).length,
      usage: this.lastUsage,
      lastError: this.lastError,
    };
  }

  /**
   * Subscribe to status changes.
   */
  public subscribe(listener: (status: DeepLStatus) => void): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyStatus() {
    const status = this.getStatus();
    this.listeners.forEach((l) => {
      try {
        l(status);
      } catch (err) {
        console.error('Error in DeepL listener:', err);
      }
    });
  }
}

export const deepLService = new DeepLTranslationService();
export default deepLService;
