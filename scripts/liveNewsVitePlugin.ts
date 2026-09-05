import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

interface OutletConfig {
  id: string;
  name: string;
  domain: string;
  icon: string;
  themeColor: string;
  category: 'Multiplatform' | 'PC & Tech' | 'Industry & Business' | 'Culture & Reviews';
  tag: string;
  feed: string;
}

const OUTLETS: OutletConfig[] = [
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

function parseFeed(xml: string, outlet: OutletConfig) {
  const items: unknown[] = [];
  const itemRegex = /(?:<item[\s>]|<entry[\s>])([\s\S]*?)(?:<\/item>|<\/entry>)/gi;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
    const raw = match[1];
    idx++;

    const titleM = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleM ? decodeHtml(titleM[1]) : '';
    if (!title) continue;

    let link = '';
    const linkM = raw.match(/<link[^>]+href="([^"]+)"/i) ||
                  raw.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    if (linkM) link = (linkM[1] || '').replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').trim();
    if (!link || !link.startsWith('http')) {
      const guidM = raw.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i) ||
                    raw.match(/<id[^>]*>([\s\S]*?)<\/id>/i);
      if (guidM && guidM[1].startsWith('http')) link = guidM[1].trim();
    }
    if (!link || !link.startsWith('http')) continue;

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

    // Real Article Content & Paragraphs Extraction
    const contentEncM = raw.match(/<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i);
    const dcContentM = raw.match(/<dc:content[^>]*>([\s\S]*?)<\/dc:content>/i);
    const contentM = raw.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
    const descM = raw.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
    const summaryM = raw.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);

    const sources: string[] = [
      contentEncM?.[1],
      dcContentM?.[1],
      contentM?.[1],
      descM?.[1],
      summaryM?.[1]
    ].filter((s): s is string => typeof s === 'string' && s.length > 0);

    let paragraphs: string[] = [];

    for (const src of sources) {
      const pMatches = [...src.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
        .map(m => decodeHtml(m[1]))
        .filter(p => {
          if (p.length < 40) return false;
          const low = p.toLowerCase();
          if (low.startsWith('source')) return false;
          if (low.includes('the post appeared first on')) return false;
          if (low.includes('read more at')) return false;
          if (low.includes('read full story')) return false;
          if (low.includes('subscribe to')) return false;
          if (low.includes('sign up for')) return false;
          if (low.includes('copyright')) return false;
          if (p.toLowerCase() === title.toLowerCase()) return false;
          return true;
        });

      if (pMatches.length >= 2) {
        paragraphs = pMatches.slice(0, 5);
        break;
      } else if (pMatches.length === 1 && paragraphs.length === 0) {
        paragraphs = [pMatches[0]];
      }
    }

    if (paragraphs.length === 0) {
      for (const src of sources) {
        const text = decodeHtml(src);
        if (text.length > 50) {
          const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
          const chunks: string[] = [];
          let cur = '';
          for (const s of sentences) {
            if ((cur + ' ' + s).length > 250) {
              chunks.push(cur.trim());
              cur = s.trim();
            } else {
              cur += (cur ? ' ' : '') + s.trim();
            }
          }
          if (cur) chunks.push(cur.trim());
          paragraphs = chunks.filter(c => c.length > 35 && c.toLowerCase() !== title.toLowerCase()).slice(0, 4);
          if (paragraphs.length > 0) break;
        }
      }
    }

    // Meaningful excerpt summary from published paragraphs
    let summary = '';
    if (paragraphs.length > 0) {
      const p1 = paragraphs[0];
      const sents = p1.match(/[^.!?]+[.!?]+/g) || [p1];
      summary = sents.slice(0, 2).join(' ').trim();
      if (summary.length < 80 && paragraphs.length > 1) {
        summary += ' ' + paragraphs[1].slice(0, 140).trim();
      }
    }
    if (!summary && descM) {
      summary = decodeHtml(descM[1]).slice(0, 200);
    }

    // Real highlights from published text
    const allText = paragraphs.join(' ');
    const rawSentences = (allText.match(/[^.!?]+[.!?]+/g) || [])
      .map(s => s.trim())
      .filter(s => s.length > 35 && s.toLowerCase() !== title.toLowerCase());
    const uniqueSentences = Array.from(new Set(rawSentences));
    const keyHighlights: string[] = [];
    if (uniqueSentences.length > 0) keyHighlights.push(uniqueSentences[0]);
    if (uniqueSentences.length > 2) keyHighlights.push(uniqueSentences[Math.floor(uniqueSentences.length / 2)]);
    if (uniqueSentences.length > 4) keyHighlights.push(uniqueSentences[uniqueSentences.length - 1]);
    else if (uniqueSentences.length > 1 && keyHighlights.length < 2) keyHighlights.push(uniqueSentences[1]);

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
      imageUrl = '/images/news/quake2-rtx.jpg';
    }

    // Author
    const authorM = raw.match(/<dc:creator[^>]*>([\s\S]*?)<\/dc:creator>/i) ||
                    raw.match(/<author[^>]*>([\s\S]*?)<\/author>/i) ||
                    raw.match(/<name[^>]*>([\s\S]*?)<\/name>/i);
    const author = authorM ? decodeHtml(authorM[1]) : outlet.name;

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
      fullContent: paragraphs.length > 0 ? paragraphs : [summary || title]
    });
  }

  return items;
}

let memoryCache: unknown[] | null = null;
let lastFetchTime = 0;

export function liveNewsPlugin(): Plugin {
  return {
    name: 'live-news-api',
    configureServer(server) {
      server.middlewares.use('/api/live-news', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const force = url.searchParams.get('force') === 'true';
        const now = Date.now();

        // Serve memory cache if < 5 minutes old and not forced
        if (!force && memoryCache && (now - lastFetchTime < 5 * 60 * 1000)) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(memoryCache));
          return;
        }

        try {
          const fetchPromises = OUTLETS.map(async (outlet) => {
            try {
              const r = await fetch(outlet.feed, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Accept': 'application/rss+xml, application/xml, text/xml, text/html, */*'
                },
                signal: AbortSignal.timeout(6000)
              });
              const xml = await r.text();
              return parseFeed(xml, outlet);
            } catch {
              return [];
            }
          });

          const results = await Promise.all(fetchPromises);
          const flat = results.flat();

          if (flat.length > 0) {
            memoryCache = flat;
            lastFetchTime = now;
            // Write to public/data/liveNews.json in background
            try {
              const pubPath = path.resolve(process.cwd(), 'public/data/liveNews.json');
              fs.writeFileSync(pubPath, JSON.stringify(flat, null, 2), 'utf8');
            } catch {
              // Ignore file write error
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(flat));
            return;
          }
        } catch {
          // Fall through to file fallback
        }

        // Fallback to static file
        try {
          const pubPath = path.resolve(process.cwd(), 'public/data/liveNews.json');
          if (fs.existsSync(pubPath)) {
            const fileContent = fs.readFileSync(pubPath, 'utf8');
            res.setHeader('Content-Type', 'application/json');
            res.end(fileContent);
            return;
          }
        } catch {
          // Fall through
        }

        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Failed to fetch live gaming news' }));
      });
    }
  };
}
