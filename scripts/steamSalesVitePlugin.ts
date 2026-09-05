import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export interface RawSaleItem {
  id: string;
  appId: string;
  title: string;
  normalPrice: number;
  salePrice: number;
  discountPercent: number;
  savings: number;
  steamRatingPercent?: number;
  steamRatingText?: string;
  steamRatingCount?: number;
  dealRating?: number;
  bannerUrl: string;
  steamUrl: string;
  steamDbUrl: string;
  releaseDate?: number | string;
  endsAt?: number;
  category?: 'AAA' | 'Indie' | 'Retro' | 'Classic' | 'Multiplayer' | 'Top Rated';
}

let memoryCache: RawSaleItem[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function steamSalesPlugin(): Plugin {
  return {
    name: 'vite-plugin-steam-sales',
    configureServer(server) {
      server.middlewares.use('/api/steam-sales', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const force = url.searchParams.get('force') === 'true';
        const now = Date.now();

        // Serve cached memory if valid and not forced
        if (!force && memoryCache && (now - lastFetchTime < CACHE_TTL)) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(memoryCache));
          return;
        }

        try {
          const itemsMap = new Map<string, RawSaleItem>();

          // 1. Fetch Official Steam Store Specials
          try {
            const steamRes = await fetch('https://store.steampowered.com/api/featuredcategories/', {
              headers: {
                'User-Agent': 'EragoArcade/1.0 (steam-sales-tracker; contact@erago.local)',
                'Accept': 'application/json'
              },
              signal: AbortSignal.timeout(6000)
            });

            if (steamRes.ok) {
              const steamData = (await steamRes.json()) as { specials?: { items?: Array<Record<string, any>> } };
              const specials = steamData?.specials?.items || [];
              for (const s of specials) {
                const appId = String(s.id);
                if (!appId || !s.discounted) continue;
                const normal = (s.original_price || 0) / 100;
                const sale = (s.final_price || 0) / 100;
                const discount = s.discount_percent || Math.round(((normal - sale) / (normal || 1)) * 100);

                const banner = s.header_image || 
                  s.large_capsule_image || 
                  `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;

                itemsMap.set(appId, {
                  id: `steam-${appId}`,
                  appId,
                  title: s.name,
                  normalPrice: Number(normal.toFixed(2)),
                  salePrice: Number(sale.toFixed(2)),
                  discountPercent: discount,
                  savings: discount,
                  bannerUrl: banner,
                  steamUrl: `https://store.steampowered.com/app/${appId}/`,
                  steamDbUrl: `https://steamdb.info/app/${appId}/`,
                  endsAt: s.discount_expiration ? s.discount_expiration * 1000 : undefined,
                  category: 'AAA'
                });
              }
            }
          } catch {
            // Steam specials fetch failed, proceed to CheapShark
          }

          // 2. Fetch CheapShark Top Steam Deals (Deepest Savings)
          try {
            const csRes = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=60&sortBy=Savings', {
              headers: {
                'User-Agent': 'EragoArcade/1.0 (steam-sales-tracker; contact@erago.local)',
                'Accept': 'application/json'
              },
              signal: AbortSignal.timeout(8000)
            });

            if (csRes.ok) {
              const deals = await csRes.json();
              if (Array.isArray(deals)) {
                for (const d of deals) {
                  const appId = String(d.steamAppID || '');
                  if (!appId || appId === '0') continue;

                  const normal = parseFloat(d.normalPrice) || 0;
                  const sale = parseFloat(d.salePrice) || 0;
                  const savings = parseFloat(d.savings) || 0;
                  const discountPercent = Math.round(savings);
                  const ratingPct = parseInt(d.steamRatingPercent, 10);
                  const ratingCount = parseInt(d.steamRatingCount, 10);
                  const dealRating = parseFloat(d.dealRating) || 0;

                  const banner = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;

                  // If already present from Steam specials, enrich with rating
                  if (itemsMap.has(appId)) {
                    const existing = itemsMap.get(appId)!;
                    existing.steamRatingPercent = isNaN(ratingPct) ? existing.steamRatingPercent : ratingPct;
                    existing.steamRatingText = d.steamRatingText || existing.steamRatingText;
                    existing.steamRatingCount = isNaN(ratingCount) ? existing.steamRatingCount : ratingCount;
                    existing.dealRating = dealRating || existing.dealRating;
                  } else {
                    itemsMap.set(appId, {
                      id: d.dealID || `cs-${appId}`,
                      appId,
                      title: d.title,
                      normalPrice: Number(normal.toFixed(2)),
                      salePrice: Number(sale.toFixed(2)),
                      discountPercent,
                      savings,
                      steamRatingPercent: isNaN(ratingPct) ? undefined : ratingPct,
                      steamRatingText: d.steamRatingText || undefined,
                      steamRatingCount: isNaN(ratingCount) ? undefined : ratingCount,
                      dealRating,
                      bannerUrl: banner,
                      steamUrl: `https://store.steampowered.com/app/${appId}/`,
                      steamDbUrl: `https://steamdb.info/app/${appId}/`,
                      releaseDate: d.releaseDate ? d.releaseDate * 1000 : undefined,
                      category: ratingPct >= 90 ? 'Top Rated' : savings >= 80 ? 'Indie' : 'Classic'
                    });
                  }
                }
              }
            }
          } catch {
            // CheapShark fetch failed
          }

          // 3. Fetch CheapShark Top Rated Deals (Quality Deals)
          try {
            const csRatingRes = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=30&sortBy=Deal%20Rating', {
              headers: {
                'User-Agent': 'EragoArcade/1.0 (steam-sales-tracker; contact@erago.local)',
                'Accept': 'application/json'
              },
              signal: AbortSignal.timeout(8000)
            });

            if (csRatingRes.ok) {
              const ratedDeals = await csRatingRes.json();
              if (Array.isArray(ratedDeals)) {
                for (const d of ratedDeals) {
                  const appId = String(d.steamAppID || '');
                  if (!appId || appId === '0' || itemsMap.has(appId)) continue;

                  const normal = parseFloat(d.normalPrice) || 0;
                  const sale = parseFloat(d.salePrice) || 0;
                  const savings = parseFloat(d.savings) || 0;
                  const discountPercent = Math.round(savings);
                  const ratingPct = parseInt(d.steamRatingPercent, 10);
                  const ratingCount = parseInt(d.steamRatingCount, 10);
                  const dealRating = parseFloat(d.dealRating) || 0;

                  itemsMap.set(appId, {
                    id: d.dealID || `cs-${appId}`,
                    appId,
                    title: d.title,
                    normalPrice: Number(normal.toFixed(2)),
                    salePrice: Number(sale.toFixed(2)),
                    discountPercent,
                    savings,
                    steamRatingPercent: isNaN(ratingPct) ? undefined : ratingPct,
                    steamRatingText: d.steamRatingText || undefined,
                    steamRatingCount: isNaN(ratingCount) ? undefined : ratingCount,
                    dealRating,
                    bannerUrl: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
                    steamUrl: `https://store.steampowered.com/app/${appId}/`,
                    steamDbUrl: `https://steamdb.info/app/${appId}/`,
                    releaseDate: d.releaseDate ? d.releaseDate * 1000 : undefined,
                    category: 'Top Rated'
                  });
                }
              }
            }
          } catch {
            // Rating fetch failed
          }

          const combinedList = Array.from(itemsMap.values());
          // Sort by discount percentage descending by default
          combinedList.sort((a, b) => b.discountPercent - a.discountPercent);

          if (combinedList.length > 0) {
            memoryCache = combinedList;
            lastFetchTime = now;

            // Persist to public/data/steamSales.json
            try {
              const pubPath = path.resolve(process.cwd(), 'public/data/steamSales.json');
              fs.writeFileSync(pubPath, JSON.stringify(combinedList, null, 2), 'utf8');
            } catch {
              // File write error ignored
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(combinedList));
            return;
          }
        } catch {
          // Fall through to disk fallback
        }

        // Fallback to static public/data/steamSales.json
        try {
          const pubPath = path.resolve(process.cwd(), 'public/data/steamSales.json');
          if (fs.existsSync(pubPath)) {
            const content = fs.readFileSync(pubPath, 'utf8');
            res.setHeader('Content-Type', 'application/json');
            res.end(content);
            return;
          }
        } catch {
          // Fall through
        }

        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Failed to fetch Steam sales feed' }));
      });
    }
  };
}
