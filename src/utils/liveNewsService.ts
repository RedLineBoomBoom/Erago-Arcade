import type { NewsArticle } from '../types/newsFeed';
import { GAMING_NEWS_ARTICLES } from '../data/gamingNewsFeed';

const CACHE_KEY = 'erago_live_news_cache_v7';
const TIMESTAMP_KEY = 'erago_live_news_timestamp_v7';
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes fresh cache

export type NewsUpdateListener = (articles: NewsArticle[], lastUpdated: number) => void;

export interface NewsOutletConfig {
  id: string;
  name: string;
  domain: string;
  icon: string;
  themeColor: string;
  category: 'Multiplatform' | 'PC & Tech' | 'Industry & Business' | 'Culture & Reviews';
  tag: string;
  feed: string;
}

export const LIVE_OUTLETS: NewsOutletConfig[] = [
  { id: 'pc-gamer', name: 'PC Gamer', domain: 'pcgamer.com', icon: '🖥️', themeColor: '#E61A24', category: 'PC & Tech', tag: 'PC Gaming', feed: 'https://www.pcgamer.com/rss/' },
  { id: 'gamespot', name: 'GameSpot', domain: 'gamespot.com', icon: '🎯', themeColor: '#FF1E27', category: 'Multiplatform', tag: 'Reviews', feed: 'https://www.gamespot.com/feeds/mashup/' },
  { id: 'ign-sea', name: 'IGN Southeast Asia', domain: 'sea.ign.com', icon: '🔥', themeColor: '#BF1313', category: 'Multiplatform', tag: 'Trailers', feed: 'https://feeds.feedburner.com/ign/all' },
  { id: 'vgc', name: 'Video Games Chronicle (VGC)', domain: 'videogameschronicle.com', icon: '⚡', themeColor: '#0055FF', category: 'Industry & Business', tag: 'Industry', feed: 'https://www.videogameschronicle.com/feed/' },
  { id: 'game-informer', name: 'Eurogamer', domain: 'eurogamer.net', icon: '📖', themeColor: '#0066CC', category: 'Industry & Business', tag: 'Features', feed: 'https://www.eurogamer.net/feed' },
  { id: 'thegamer', name: 'TheGamer', domain: 'thegamer.com', icon: '🕹️', themeColor: '#107C41', category: 'Culture & Reviews', tag: 'Guides', feed: 'https://www.thegamer.com/feed/' },
  { id: 'polygon', name: 'Polygon', domain: 'polygon.com', icon: '🔷', themeColor: '#DF1995', category: 'Culture & Reviews', tag: 'Culture', feed: 'https://www.polygon.com/rss/index.xml/' },
  { id: 'game-rant', name: 'Game Rant', domain: 'gamerant.com', icon: '📢', themeColor: '#FF6B00', category: 'Culture & Reviews', tag: 'Theories', feed: 'https://gamerant.com/feed/' },
  { id: 'kotaku', name: 'Rock Paper Shotgun', domain: 'rockpapershotgun.com', icon: '💬', themeColor: '#FFE600', category: 'Multiplatform', tag: 'PC Indie', feed: 'https://www.rockpapershotgun.com/feed' },
  { id: 'gamesradar', name: 'GamesRadar+', domain: 'gamesradar.com', icon: '📡', themeColor: '#0090FF', category: 'Multiplatform', tag: 'PlayStation', feed: 'https://www.gamesradar.com/feeds.xml/' },
  { id: 'the-verge', name: 'The Verge (Gaming)', domain: 'theverge.com', icon: '⚡', themeColor: '#E00051', category: 'PC & Tech', tag: 'Handhelds', feed: 'https://www.theverge.com/rss/index.xml' },
  { id: 'bloomberg-gaming', name: 'GamesIndustry.biz', domain: 'gamesindustry.biz', icon: '📊', themeColor: '#001799', category: 'Industry & Business', tag: 'Financials', feed: 'https://www.gamesindustry.biz/feed' },
];

function decodeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '--')
    .replace(/&#8230;/g, '...')
    .replace(/&hellip;/g, '...')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseXmlBrowser(xmlText: string, outlet: NewsOutletConfig): NewsArticle[] {
  if (typeof window === 'undefined' || !window.DOMParser) return [];
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    if (xmlDoc.querySelector('parsererror')) {
      return [];
    }

    const items = xmlDoc.querySelectorAll('item, entry');
    const parsed: NewsArticle[] = [];

    for (let i = 0; i < Math.min(items.length, 3); i++) {
      const el = items[i];
      const title = el.querySelector('title')?.textContent?.trim() || '';
      if (!title) continue;

      let link = el.querySelector('link[href]')?.getAttribute('href') ||
                 el.querySelector('link')?.textContent?.trim() ||
                 el.querySelector('guid')?.textContent?.trim() ||
                 el.querySelector('id')?.textContent?.trim() || '';
      if (!link || !link.startsWith('http')) continue;

      const pubDateStr = el.querySelector('pubDate, published, updated')?.textContent?.trim() || '';
      let publishedTimestamp = Date.now();
      let timeAgo = 'Baru saja';
      if (pubDateStr) {
        const d = new Date(pubDateStr);
        if (!isNaN(d.getTime())) {
          publishedTimestamp = d.getTime();
          const diffMins = Math.floor((Date.now() - d.getTime()) / 60000);
          const diffHours = Math.floor(diffMins / 60);
          const diffDays = Math.floor(diffHours / 24);
          if (diffMins < 60) timeAgo = `${Math.max(1, diffMins)} menit yang lalu`;
          else if (diffHours < 24) timeAgo = `${diffHours} jam yang lalu`;
          else timeAgo = `${diffDays} hari yang lalu`;
        }
      }

      // Extract description / content
      const desc = el.querySelector('description, summary')?.textContent?.trim() || '';
      const encoded = el.getElementsByTagNameNS('*', 'encoded')[0]?.textContent?.trim() || '';
      const rawContent = encoded || desc;

      // Extract image
      let imageUrl = '';
      const enclosure = el.querySelector('enclosure[url]');
      if (enclosure) imageUrl = enclosure.getAttribute('url') || '';
      if (!imageUrl) {
        const media = el.getElementsByTagNameNS('*', 'content')[0] || el.getElementsByTagNameNS('*', 'thumbnail')[0];
        if (media) imageUrl = media.getAttribute('url') || '';
      }
      if (!imageUrl && rawContent) {
        const imgMatch = rawContent.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch) imageUrl = imgMatch[1];
      }
      if (!imageUrl) {
        imageUrl = '/images/news/quake2-rtx.jpg';
      }

      const cleanSummary = decodeHtml(desc).slice(0, 240) || decodeHtml(title);

      // Paragraphs extraction
      let fullContent: string[] = [];
      if (rawContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawContent;
        const paragraphs = Array.from(tempDiv.querySelectorAll('p'))
          .map(p => decodeHtml(p.textContent || ''))
          .filter(p => p.length > 40 && !p.toLowerCase().includes('the post appeared first on'));
        if (paragraphs.length > 0) {
          fullContent = paragraphs.slice(0, 5);
        }
      }
      if (fullContent.length === 0) {
        fullContent = [cleanSummary];
      }

      const author = el.getElementsByTagNameNS('*', 'creator')[0]?.textContent?.trim() ||
                     el.querySelector('author name, author')?.textContent?.trim() ||
                     outlet.name;

      parsed.push({
        id: `${outlet.id}-${i + 1}`,
        outletId: outlet.id,
        outletName: outlet.name,
        outletIcon: outlet.icon,
        outletThemeColor: outlet.themeColor,
        outletDomain: outlet.domain,
        title: decodeHtml(title),
        summary: cleanSummary,
        url: link,
        imageUrl,
        category: outlet.category,
        tag: outlet.tag,
        publishedAt: timeAgo,
        publishedTimestamp,
        readTime: `${Math.max(2, Math.min(8, Math.round((cleanSummary.length + 200) / 150)))} min read`,
        isHot: i === 0,
        author: decodeHtml(author),
        keyHighlights: fullContent.length > 1 ? [fullContent[0], fullContent[fullContent.length - 1]] : [cleanSummary],
        fullContent,
      });
    }

    return parsed;
  } catch {
    return [];
  }
}

async function fetchOutletFromProxy(outlet: NewsOutletConfig): Promise<NewsArticle[]> {
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(outlet.feed)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(outlet.feed)}`,
  ];

  for (const proxyUrl of proxies) {
    try {
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const text = await res.text();
        if (text && (text.includes('<rss') || text.includes('<feed') || text.includes('<channel'))) {
          const parsed = parseXmlBrowser(text, outlet);
          if (parsed.length > 0) return parsed;
        }
      }
    } catch {
      // try next proxy
    }
  }
  return [];
}

export function getArticleAgeInMinutes(article: NewsArticle): number {
  if (article.publishedTimestamp && typeof article.publishedTimestamp === 'number') {
    return Math.max(0, (Date.now() - article.publishedTimestamp) / (60 * 1000));
  }
  const str = (article.publishedAt || '').toLowerCase().trim();
  if (str === 'baru saja' || str === 'just now') return 0;

  // Minutes
  const minM = str.match(/(\d+)\s*(?:menit|min|minute)/i);
  if (minM) return parseInt(minM[1], 10);

  // Hours
  const hrM = str.match(/(\d+)\s*(?:jam|hour|hr)/i);
  if (hrM) return parseInt(hrM[1], 10) * 60;

  // Days
  const dayM = str.match(/(\d+)\s*(?:hari|day)/i);
  if (dayM) return parseInt(dayM[1], 10) * 60 * 24;

  // Weeks
  const weekM = str.match(/(\d+)\s*(?:minggu|week)/i);
  if (weekM) return parseInt(weekM[1], 10) * 60 * 24 * 7;

  // Months
  const monthM = str.match(/(\d+)\s*(?:bulan|month)/i);
  if (monthM) return parseInt(monthM[1], 10) * 60 * 24 * 30;

  const parsed = Date.parse(str);
  if (!isNaN(parsed)) {
    return Math.max(0, (Date.now() - parsed) / (60 * 1000));
  }

  return 999999;
}

export function sortArticlesNewestFirst(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort((a, b) => {
    if (a.publishedTimestamp && b.publishedTimestamp) {
      return b.publishedTimestamp - a.publishedTimestamp;
    }
    return getArticleAgeInMinutes(a) - getArticleAgeInMinutes(b);
  });
}

function mergeAndDeduplicateArticles(newArticles: NewsArticle[], existingArticles: NewsArticle[]): NewsArticle[] {
  const normalizeUrl = (url?: string) => (url || '').replace(/[?#].*$/, '').toLowerCase().trim();
  const normalizeTitle = (title?: string) => (title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const map = new Map<string, NewsArticle>();

  // Add new articles first (they take precedence)
  for (const a of newArticles) {
    const key = normalizeUrl(a.url) || normalizeTitle(a.title);
    if (key) {
      map.set(key, a);
    }
  }

  // Preserve existing articles that are not duplicates
  for (const a of existingArticles) {
    const key = normalizeUrl(a.url) || normalizeTitle(a.title);
    if (key && !map.has(key)) {
      map.set(key, a);
    }
  }

  return sortArticlesNewestFirst(Array.from(map.values()));
}

class LiveNewsService {
  private articles: NewsArticle[] = sortArticlesNewestFirst(GAMING_NEWS_ARTICLES);
  private lastUpdated: number = Date.now();
  private listeners: Set<NewsUpdateListener> = new Set();
  private isFetching: boolean = false;

  constructor() {
    this.loadFromCache();
    this.startAutoPolling();
    // Auto refresh on startup if stale
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const elapsed = Date.now() - this.lastUpdated;
        if (elapsed > CACHE_TTL_MS || this.articles.length === 0) {
          this.refreshNews(false).catch(() => {});
        }
      }, 1500);
    }
  }

  private loadFromCache() {
    try {
      if (typeof window === 'undefined') return;

      // Purge old versions
      [
        'erago_live_news_cache',
        'erago_live_news_cache_v1',
        'erago_live_news_cache_v2',
        'erago_live_news_cache_v3',
        'erago_live_news_cache_v4',
        'erago_live_news_cache_v5',
        'erago_live_news_cache_v6'
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
          this.articles = sortArticlesNewestFirst(parsed);
        } else {
          this.articles = sortArticlesNewestFirst(GAMING_NEWS_ARTICLES);
        }
      } else {
        this.articles = sortArticlesNewestFirst(GAMING_NEWS_ARTICLES);
      }

      if (time) {
        this.lastUpdated = Number(time) || Date.now();
      }
    } catch {
      this.articles = sortArticlesNewestFirst(GAMING_NEWS_ARTICLES);
    }
  }

  private startAutoPolling() {
    if (typeof window === 'undefined') return;

    // Background auto-poll every 2.5 minutes (150,000ms)
    window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.refreshNews(false).catch(() => {});
      }
    }, 150000);

    // Refresh when user returns to tab if > 2 minutes old
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        const elapsed = Date.now() - this.lastUpdated;
        if (elapsed > 120000) {
          this.refreshNews(false).catch(() => {});
        }
      }
    });

    // Refresh when back online
    window.addEventListener('online', () => {
      this.refreshNews(true).catch(() => {});
    });
  }

  public getArticles(): NewsArticle[] {
    return this.articles;
  }

  public getLastUpdated(): number {
    return this.lastUpdated;
  }

  public getIsFetching(): boolean {
    return this.isFetching;
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
   * 1. Dev server endpoint (/api/live-news?force=true) - directly fetches from 12 official feeds
   * 2. Public CORS proxies (fallback for static hosting / GitHub Pages)
   * 3. /data/liveNews.json static bundle
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
      // 1. Try dev server endpoint with force bypass param
      try {
        const endpoint = `/api/live-news?force=${force ? 'true' : 'false'}&t=${now}`;
        const res = await fetch(endpoint, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(7000),
        });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            const merged = mergeAndDeduplicateArticles(liveData, this.articles);
            this.setArticles(merged);
            return { articles: this.articles, updated: true };
          }
        }
      } catch {
        // Fallback to proxy or static
      }

      // 2. Direct client-side CORS proxy fetching for the 12 outlets
      if (typeof window !== 'undefined') {
        try {
          const proxyPromises = LIVE_OUTLETS.map(outlet => fetchOutletFromProxy(outlet));
          const settled = await Promise.allSettled(proxyPromises);
          const liveProxyArticles: NewsArticle[] = [];
          for (const s of settled) {
            if (s.status === 'fulfilled' && s.value.length > 0) {
              liveProxyArticles.push(...s.value);
            }
          }

          if (liveProxyArticles.length > 0) {
            const merged = mergeAndDeduplicateArticles(liveProxyArticles, this.articles);
            this.setArticles(merged);
            return { articles: this.articles, updated: true };
          }
        } catch {
          // Fallback to static file
        }
      }

      // 3. Try static liveNews.json
      try {
        const res = await fetch(`/data/liveNews.json?t=${now}`, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            const merged = mergeAndDeduplicateArticles(liveData, this.articles);
            this.setArticles(merged);
            return { articles: this.articles, updated: true };
          }
        }
      } catch {
        // Continue to fallback
      }

      // If network failed but we have bundled articles, keep them
      if (this.articles.length === 0) {
        this.setArticles(GAMING_NEWS_ARTICLES);
      }
      return { articles: this.articles, updated: false };
    } finally {
      this.isFetching = false;
    }
  }

  private setArticles(newArticles: NewsArticle[]) {
    const sorted = sortArticlesNewestFirst(newArticles);
    this.articles = sorted;
    this.lastUpdated = Date.now();
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(sorted));
        localStorage.setItem(TIMESTAMP_KEY, String(this.lastUpdated));
      }
    } catch {
      // Storage full or private mode
    }
    this.notify();
  }
}

export const liveNewsService = new LiveNewsService();
