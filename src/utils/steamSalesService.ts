import type { SteamSaleItem } from '../types/steamSales';
import { STEAM_SALES_FEED } from '../data/steamSalesFeed';

const CACHE_KEY = 'erago_steam_sales_cache_v2';
const TIMESTAMP_KEY = 'erago_steam_sales_timestamp_v2';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes fresh cache

export type SalesUpdateListener = (sales: SteamSaleItem[], lastUpdated: number) => void;

class SteamSalesService {
  private sales: SteamSaleItem[] = STEAM_SALES_FEED;
  private lastUpdated: number = Date.now();
  private listeners: Set<SalesUpdateListener> = new Set();
  private isFetching: boolean = false;

  constructor() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('erago_steam_sales_cache_v1');
        localStorage.removeItem('erago_steam_sales_timestamp_v1');
      }
    } catch {}
    this.loadFromCache();
  }

  private loadFromCache() {
    try {
      if (typeof window === 'undefined') return;

      const cached = localStorage.getItem(CACHE_KEY);
      const time = localStorage.getItem(TIMESTAMP_KEY);

      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.sales = parsed;
          if (time) {
            this.lastUpdated = parseInt(time, 10) || Date.now();
          }
        }
      }
    } catch {
      // Ignore cache load errors
    }
  }

  private saveToCache(items: SteamSaleItem[], timestamp: number) {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(CACHE_KEY, JSON.stringify(items));
      localStorage.setItem(TIMESTAMP_KEY, String(timestamp));
    } catch {
      // Ignore quota errors
    }
  }

  public getSales(): SteamSaleItem[] {
    return this.sales;
  }

  public getLastUpdated(): number {
    return this.lastUpdated;
  }

  public subscribe(listener: SalesUpdateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.sales, this.lastUpdated);
      } catch (err) {
        console.error('Error in Steam sales listener:', err);
      }
    });
  }

  public async refreshSales(force: boolean = false): Promise<{ sales: SteamSaleItem[]; count: number }> {
    const now = Date.now();

    // Return current sales if cached and not forced
    if (!force && this.sales.length > 0 && now - this.lastUpdated < CACHE_TTL_MS) {
      return { sales: this.sales, count: this.sales.length };
    }

    if (this.isFetching) {
      return { sales: this.sales, count: this.sales.length };
    }

    this.isFetching = true;

    try {
      let freshData: SteamSaleItem[] | null = null;

      // 1. Try Vite dev server API endpoint
      try {
        const url = `/api/steam-sales?force=${force ? 'true' : 'false'}&t=${now}`;
        const res = await fetch(url, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(9000)
        });

        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            freshData = json;
          }
        }
      } catch {
        // Dev server API unavailable or timed out
      }

      // 2. Fallback to static public JSON
      if (!freshData) {
        try {
          const staticRes = await fetch(`/data/steamSales.json?t=${now}`, {
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(6000)
          });
          if (staticRes.ok) {
            const json = await staticRes.json();
            if (Array.isArray(json) && json.length > 0) {
              freshData = json;
            }
          }
        } catch {
          // Static file fetch failed
        }
      }

      // 3. Fallback to direct CheapShark API if allowed in browser
      if (!freshData) {
        try {
          const csRes = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=60&sortBy=Savings', {
            signal: AbortSignal.timeout(6000)
          });
          if (csRes.ok) {
            const deals = await csRes.json();
            if (Array.isArray(deals) && deals.length > 0) {
              freshData = deals
                .filter((d: { steamAppID?: string }) => d.steamAppID && d.steamAppID !== '0')
                .map((d: {
                  dealID?: string;
                  steamAppID: string;
                  title: string;
                  normalPrice: string;
                  salePrice: string;
                  savings: string;
                  steamRatingPercent?: string;
                  steamRatingText?: string;
                  steamRatingCount?: string;
                  dealRating?: string;
                  releaseDate?: number;
                }) => {
                  const appId = d.steamAppID;
                  const normal = parseFloat(d.normalPrice) || 0;
                  const sale = parseFloat(d.salePrice) || 0;
                  const savings = parseFloat(d.savings) || 0;
                  return {
                    id: d.dealID || `cs-${appId}`,
                    appId,
                    title: d.title,
                    normalPrice: Number(normal.toFixed(2)),
                    salePrice: Number(sale.toFixed(2)),
                    discountPercent: Math.round(savings),
                    savings,
                    steamRatingPercent: d.steamRatingPercent ? parseInt(d.steamRatingPercent, 10) : undefined,
                    steamRatingText: d.steamRatingText,
                    steamRatingCount: d.steamRatingCount ? parseInt(d.steamRatingCount, 10) : undefined,
                    dealRating: d.dealRating ? parseFloat(d.dealRating) : undefined,
                    bannerUrl: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
                    steamUrl: `https://store.steampowered.com/app/${appId}/`,
                    steamDbUrl: `https://steamdb.info/app/${appId}/`,
                    releaseDate: d.releaseDate ? d.releaseDate * 1000 : undefined,
                    category: 'Indie' as const
                  };
                });
            }
          }
        } catch {
          // Direct fetch failed
        }
      }

      if (freshData && freshData.length > 0) {
        this.sales = freshData;
        this.lastUpdated = now;
        this.saveToCache(freshData, now);
        this.notify();
      }

      return { sales: this.sales, count: this.sales.length };
    } finally {
      this.isFetching = false;
    }
  }
}

export const steamSalesService = new SteamSalesService();
