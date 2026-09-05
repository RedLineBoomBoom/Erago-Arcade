import type { NewsArticle } from '../types/newsFeed';
import { GAMING_NEWS_ARTICLES } from '../data/gamingNewsFeed';

const CACHE_KEY = 'erago_live_news_cache_v5';
const TIMESTAMP_KEY = 'erago_live_news_timestamp_v5';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes fresh cache

export type NewsUpdateListener = (articles: NewsArticle[], lastUpdated: number) => void;

class LiveNewsService {
  private articles: NewsArticle[] = GAMING_NEWS_ARTICLES;
  private lastUpdated: number = Date.now();
  private listeners: Set<NewsUpdateListener> = new Set();
  private isFetching: boolean = false;

  constructor() {
    this.loadFromCache();
  }

  private loadFromCache() {
    try {
      if (typeof window === 'undefined') return;

      // Purge all legacy caches
      [
        'erago_live_news_cache',
        'erago_live_news_cache_v1',
        'erago_live_news_cache_v2',
        'erago_live_news_cache_v3',
        'erago_live_news_cache_v4'
      ].forEach((key) => {
        try {
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}_timestamp`);
        } catch {}
      });

      const cached = localStorage.getItem(CACHE_KEY);
      const time = localStorage.getItem(TIMESTAMP_KEY);

      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if cache contains legacy boilerplate
          const isContaminated = parsed.some((item: NewsArticle) =>
            Array.isArray(item.fullContent) &&
            item.fullContent.some((p: string) => p.includes('Artikel ini dipublikasikan oleh redaksi resmi'))
          );

          if (!isContaminated) {
            this.articles = parsed;
          } else {
            localStorage.removeItem(CACHE_KEY);
            this.articles = GAMING_NEWS_ARTICLES;
          }
        }
      } else {
        this.articles = GAMING_NEWS_ARTICLES;
      }

      if (time) {
        this.lastUpdated = Number(time) || Date.now();
      }
    } catch {
      this.articles = GAMING_NEWS_ARTICLES;
    }
  }

  public getArticles(): NewsArticle[] {
    return this.articles;
  }

  public getLastUpdated(): number {
    return this.lastUpdated;
  }

  public subscribe(listener: NewsUpdateListener): () => void {
    this.listeners.add(listener);
    listener(this.articles, this.lastUpdated);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.articles, this.lastUpdated);
      } catch (err) {
        console.error('[LIVE NEWS] Listener error:', err);
      }
    });
  }

  /**
   * Refreshes news feed from live network sources:
   * 1. Vite /api/live-news server middleware (fastest & native)
   * 2. /data/liveNews.json static bundle
   * 3. Public CORS proxies (fallback for static hosting)
   */
  public async refreshNews(force: boolean = false): Promise<{ articles: NewsArticle[]; updated: boolean }> {
    const now = Date.now();
    if (!force && (now - this.lastUpdated < CACHE_TTL_MS) && this.articles.length > 0) {
      return { articles: this.articles, updated: false };
    }

    if (this.isFetching) {
      return { articles: this.articles, updated: false };
    }

    this.isFetching = true;
    try {
      // 1. Try local dev server endpoint
      try {
        const res = await fetch('/api/live-news', {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            this.setArticles(liveData);
            return { articles: this.articles, updated: true };
          }
        }
      } catch {
        // Continue to fallback
      }

      // 2. Try static liveNews.json
      try {
        const res = await fetch(`/data/liveNews.json?t=${Date.now()}`, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            this.setArticles(liveData);
            return { articles: this.articles, updated: true };
          }
        }
      } catch {
        // Continue to fallback
      }

      // If network failed but we have bundled articles, touch timestamp
      if (this.articles.length === 0) {
        this.setArticles(GAMING_NEWS_ARTICLES);
      }
      return { articles: this.articles, updated: false };
    } finally {
      this.isFetching = false;
    }
  }

  private setArticles(newArticles: NewsArticle[]) {
    this.articles = newArticles;
    this.lastUpdated = Date.now();
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(newArticles));
        localStorage.setItem(TIMESTAMP_KEY, String(this.lastUpdated));
      }
    } catch {
      // Storage full or private mode
    }
    this.notify();
  }
}

export const liveNewsService = new LiveNewsService();
