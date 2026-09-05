import fs from 'node:fs';
import path from 'node:path';

async function buildInitialSales() {
  const itemsMap = new Map();

  // 1. Steam specials
  try {
    const steamRes = await fetch('https://store.steampowered.com/api/featuredcategories/', {
      headers: { 'User-Agent': 'EragoArcade/1.0 (steam-sales-tracker)' }
    });
    if (steamRes.ok) {
      const data = await steamRes.json();
      for (const s of (data?.specials?.items || [])) {
        const appId = String(s.id);
        if (!appId || !s.discounted) continue;
        const normal = (s.original_price || 0) / 100;
        const sale = (s.final_price || 0) / 100;
        const discount = s.discount_percent || Math.round(((normal - sale) / (normal || 1)) * 100);
        itemsMap.set(appId, {
          id: 'steam-' + appId,
          appId,
          title: s.name,
          normalPrice: Number(normal.toFixed(2)),
          salePrice: Number(sale.toFixed(2)),
          discountPercent: discount,
          savings: discount,
          bannerUrl: s.header_image || 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/' + appId + '/header.jpg',
          steamUrl: 'https://store.steampowered.com/app/' + appId + '/',
          steamDbUrl: 'https://steamdb.info/app/' + appId + '/',
          endsAt: s.discount_expiration ? s.discount_expiration * 1000 : undefined,
          category: 'AAA'
        });
      }
    }
  } catch (e) {
    console.warn('Steam specials warning:', e.message);
  }

  // 2. CheapShark savings
  try {
    const csRes = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=60&sortBy=Savings', {
      headers: { 'User-Agent': 'EragoArcade/1.0 (steam-sales-tracker)' }
    });
    if (csRes.ok) {
      const deals = await csRes.json();
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

        if (itemsMap.has(appId)) {
          const ex = itemsMap.get(appId);
          ex.steamRatingPercent = isNaN(ratingPct) ? ex.steamRatingPercent : ratingPct;
          ex.steamRatingText = d.steamRatingText || ex.steamRatingText;
          ex.steamRatingCount = isNaN(ratingCount) ? ex.steamRatingCount : ratingCount;
          ex.dealRating = dealRating || ex.dealRating;
        } else {
          itemsMap.set(appId, {
            id: d.dealID || 'cs-' + appId,
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
            bannerUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/' + appId + '/header.jpg',
            steamUrl: 'https://store.steampowered.com/app/' + appId + '/',
            steamDbUrl: 'https://steamdb.info/app/' + appId + '/',
            releaseDate: d.releaseDate ? d.releaseDate * 1000 : undefined,
            category: ratingPct >= 90 ? 'Top Rated' : savings >= 80 ? 'Indie' : 'Classic'
          });
        }
      }
    }
  } catch (e) {
    console.warn('CheapShark savings warning:', e.message);
  }

  // 3. CheapShark top rated deals
  try {
    const csRated = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=30&sortBy=Deal%20Rating', {
      headers: { 'User-Agent': 'EragoArcade/1.0 (steam-sales-tracker)' }
    });
    if (csRated.ok) {
      const deals = await csRated.json();
      for (const d of deals) {
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
          id: d.dealID || 'cs-' + appId,
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
          bannerUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/' + appId + '/header.jpg',
          steamUrl: 'https://store.steampowered.com/app/' + appId + '/',
          steamDbUrl: 'https://steamdb.info/app/' + appId + '/',
          releaseDate: d.releaseDate ? d.releaseDate * 1000 : undefined,
          category: 'Top Rated'
        });
      }
    }
  } catch (e) {
    console.warn('CheapShark rated warning:', e.message);
  }

  const list = Array.from(itemsMap.values());
  list.sort((a, b) => b.discountPercent - a.discountPercent);
  console.log('Total sales items gathered:', list.length);

  // Write public/data/steamSales.json
  const pubDir = path.resolve('public/data');
  if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
  fs.writeFileSync(path.join(pubDir, 'steamSales.json'), JSON.stringify(list, null, 2), 'utf8');
  console.log('Wrote public/data/steamSales.json successfully');

  // Write src/data/steamSalesFeed.ts
  const tsContent = `import type { SteamSaleItem } from '../types/steamSales';\n\nexport const STEAM_SALES_FEED: SteamSaleItem[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(path.resolve('src/data/steamSalesFeed.ts'), tsContent, 'utf8');
  console.log('Wrote src/data/steamSalesFeed.ts successfully');
}

buildInitialSales();
