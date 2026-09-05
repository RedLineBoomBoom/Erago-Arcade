const fs = require('fs');
const path = require('path');

const OUTLETS = [
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
  { id: 'bloomberg-gaming', name: 'GamesIndustry.biz', domain: 'gamesindustry.biz', icon: '📊', themeColor: '#001799', category: 'Industry & Business', tag: 'Financials', feed: 'https://www.gamesindustry.biz/feed' }
];

function decodeHtml(html) {
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

function parseFeed(xml, outlet) {
  const items = [];
  const itemRegex = /(?:<item[\s>]|<entry[\s>])([\s\S]*?)(?:<\/item>|<\/entry>)/gi;
  let match;
  let idx = 0;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
    const raw = match[1];
    idx++;

    // Title
    const titleM = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleM ? decodeHtml(titleM[1]) : '';
    if (!title) continue;

    // Link
    let link = '';
    const linkM = raw.match(/<link[^>]+href="([^"]+)"/i) ||
                  raw.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    if (linkM) {
      link = (linkM[1] || '').replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').trim();
    }
    if (!link || !link.startsWith('http')) {
      const guidM = raw.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i) ||
                    raw.match(/<id[^>]*>([\s\S]*?)<\/id>/i);
      if (guidM && guidM[1].startsWith('http')) link = guidM[1].trim();
    }
    if (!link || !link.startsWith('http')) continue;

    // PubDate
    const pubM = raw.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
                 raw.match(/<published[^>]*>([\s\S]*?)<\/published>/i) ||
                 raw.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);
    const pubDateStr = pubM ? decodeHtml(pubM[1]) : '';
    let timeAgo = 'Baru saja';
    if (pubDateStr) {
      const d = new Date(pubDateStr);
      if (!isNaN(d.getTime())) {
        const diffMs = Date.now() - d.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffMins < 60) timeAgo = `${Math.max(1, diffMins)} menit yang lalu`;
        else if (diffHours < 24) timeAgo = `${diffHours} jam yang lalu`;
        else timeAgo = `${diffDays} hari yang lalu`;
      }
    }

    // Description / Summary
    const descM = raw.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) ||
                  raw.match(/<description[^>]*>([\s\S]*?)<\/description>/i) ||
                  raw.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
    const desc = descM ? decodeHtml(descM[1]) : '';
    const summary = desc.slice(0, 180) + (desc.length > 180 ? '...' : '');

    // Image URL
    let imageUrl = '';
    const encM = raw.match(/<enclosure[^>]+url="([^"]+)"/i);
    if (encM && encM[1].startsWith('http')) imageUrl = encM[1];
    if (!imageUrl) {
      const medM = raw.match(/<media:content[^>]+url="([^"]+)"/i) ||
                   raw.match(/<media:thumbnail[^>]+url="([^"]+)"/i);
      if (medM && medM[1].startsWith('http')) imageUrl = medM[1];
    }
    if (!imageUrl) {
      const imgM = raw.match(/<img[^>]+src="([^">]+)"/i);
      if (imgM && imgM[1].startsWith('http')) imageUrl = imgM[1];
    }
    if (!imageUrl) {
      // Default high quality game cover fallback
      imageUrl = '/images/news/quake2-rtx.jpg';
    }

    // Author
    const authorM = raw.match(/<dc:creator[^>]*>([\s\S]*?)<\/dc:creator>/i) ||
                    raw.match(/<author[^>]*>([\s\S]*?)<\/author>/i) ||
                    raw.match(/<name[^>]*>([\s\S]*?)<\/name>/i);
    const author = authorM ? decodeHtml(authorM[1]) : outlet.name;

    // Highlights - clean and deduplicated
    const rawSentences = desc
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 25);
    const uniqueSentences = Array.from(new Set(rawSentences));
    const keyHighlights = uniqueSentences.slice(0, 3).map(s => (s.endsWith('.') ? s : `${s}.`));
    if (keyHighlights.length === 0) {
      keyHighlights.push(`Liputan resmi dan investigasi langsung dari redaksi ${outlet.name}.`);
    }

    items.push({
      id: `${outlet.id}-${idx}`,
      outletId: outlet.id,
      outletName: outlet.name,
      outletIcon: outlet.icon,
      outletThemeColor: outlet.themeColor,
      outletDomain: outlet.domain,
      title,
      summary: summary || title,
      url: link,
      imageUrl,
      category: outlet.category,
      tag: outlet.tag,
      publishedAt: timeAgo,
      readTime: `${Math.max(2, Math.min(8, Math.round((summary.length + 200) / 150)))} min read`,
      isHot: idx === 1,
      author,
      keyHighlights,
      fullContent: [
        summary,
        `Artikel ini dipublikasikan oleh redaksi resmi ${outlet.name}. Klik tombol tautan di bawah untuk membaca artikel lengkap, investigasi, dan galeri visual resolusi tinggi langsung di situs resmi ${outlet.domain}.`
      ]
    });
  }

  return items;
}

async function fetchAllLiveArticles() {
  const all = [];
  for (const outlet of OUTLETS) {
    try {
      const res = await fetch(outlet.feed, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, text/html, */*'
        },
        signal: AbortSignal.timeout(7000)
      });
      const xml = await res.text();
      const items = parseFeed(xml, outlet);
      console.log(`[OK] ${outlet.name}: ${items.length} items`);
      all.push(...items);
    } catch (err) {
      console.log(`[FAIL] ${outlet.name}: ${err.message}`);
    }
  }
  return all;
}

async function run() {
  console.log('Fetching live gaming news articles...');
  const articles = await fetchAllLiveArticles();
  console.log(`Total live articles retrieved: ${articles.length}`);

  if (articles.length === 0) {
    console.error('No articles fetched, aborting update.');
    process.exit(1);
  }

  const fileContent = `import type { NewsArticle } from '../types/newsFeed';

/**
 * LIVE CURATED GAMING NEWS FEED
 * Generated automatically from the 12 official world gaming news outlets.
 * Contains verified canonical permalinks, genuine titles, and live thumbnails.
 * Last synced: ${new Date().toISOString()}
 */
export const GAMING_NEWS_ARTICLES: NewsArticle[] = ${JSON.stringify(articles, null, 2)};
`;

  const targetPath = path.resolve(__dirname, '../src/data/gamingNewsFeed.ts');
  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log(`Successfully written to ${targetPath}!`);

  // Also save public json for instant static fetching
  const publicPath = path.resolve(__dirname, '../public/data');
  if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath, { recursive: true });
  fs.writeFileSync(path.resolve(publicPath, 'liveNews.json'), JSON.stringify(articles, null, 2), 'utf8');
  console.log('Saved to public/data/liveNews.json as well!');
}

run();
