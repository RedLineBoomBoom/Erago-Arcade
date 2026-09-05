const fs = require('fs');
const path = require('path');

async function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  const clean = text.trim();
  if (!clean) return clean;

  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=' + encodeURIComponent(clean);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error('Status ' + res.status);
    const json = await res.json();
    if (Array.isArray(json[0])) {
      return json[0].map(part => part[0]).join('').trim();
    }
    return clean;
  } catch (err) {
    console.error('Translation error for:', clean.slice(0, 30), err.message);
    return clean;
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const jsonPath = path.resolve(__dirname, '../public/data/liveNews.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('liveNews.json not found, run sync_gaming_news.cjs first.');
    return;
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const articles = JSON.parse(raw);
  console.log(`Starting translation generation for ${articles.length} articles...`);

  const translations = {};
  const translatedArticles = [];

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    console.log(`[${i + 1}/${articles.length}] Translating ${a.outletName}: ${a.title.slice(0, 40)}...`);

    const titleId = await translateText(a.title);
    await sleep(80);
    const summaryId = await translateText(a.summary);
    await sleep(80);

    const fullContentId = [];
    for (const p of a.fullContent || []) {
      fullContentId.push(await translateText(p));
      await sleep(80);
    }

    const keyHighlightsId = [];
    for (const h of a.keyHighlights || []) {
      keyHighlightsId.push(await translateText(h));
      await sleep(80);
    }

    const item = {
      title: titleId,
      summary: summaryId,
      fullContent: fullContentId,
      keyHighlights: keyHighlightsId,
    };

    translations[a.id] = item;
    translations[a.url] = item;

    translatedArticles.push({
      ...a,
      title: titleId,
      summary: summaryId,
      fullContent: fullContentId,
      keyHighlights: keyHighlightsId,
    });
  }

  // Write TypeScript file
  const tsContent = `// AUTO-GENERATED INDONESIAN TRANSLATIONS FOR GAMING NEWS FEED
// Generated on ${new Date().toISOString()}

export interface NewsTranslationItem {
  title: string;
  summary: string;
  fullContent: string[];
  keyHighlights: string[];
}

export const NEWS_ID_TRANSLATIONS: Record<string, NewsTranslationItem> = ${JSON.stringify(translations, null, 2)};
`;

  const targetTs = path.resolve(__dirname, '../src/data/translations/newsTranslations.id.ts');
  const targetJson = path.resolve(__dirname, '../public/data/liveNews.id.json');
  fs.writeFileSync(targetTs, tsContent, 'utf8');
  fs.writeFileSync(targetJson, JSON.stringify(translatedArticles, null, 2), 'utf8');

  console.log(`Successfully generated ${targetTs} and ${targetJson}!`);
}

run().catch(console.error);
