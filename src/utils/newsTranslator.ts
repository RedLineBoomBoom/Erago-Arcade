import { useState, useEffect } from 'react';
import type { NewsArticle } from '../types/newsFeed';
import type { Language } from './i18n';
import { NEWS_ID_TRANSLATIONS } from '../data/translations/newsTranslations.id';

// ============================================================================
// METADATA TRANSLATIONS (Categories & Tags)
// ============================================================================

export const NEWS_CATEGORY_TRANSLATIONS: Record<string, { id: string; en: string }> = {
  'Multiplatform': { id: 'Multiplatform', en: 'Multiplatform' },
  'PC & Tech': { id: 'PC & Teknologi', en: 'PC & Tech' },
  'Industry & Business': { id: 'Industri & Bisnis', en: 'Industry & Business' },
  'Culture & Reviews': { id: 'Budaya & Ulasan', en: 'Culture & Reviews' },
};

export const NEWS_TAG_TRANSLATIONS: Record<string, { id: string; en: string }> = {
  'PC Gaming': { id: 'Gaming PC', en: 'PC Gaming' },
  'All Platforms': { id: 'Semua Platform', en: 'All Platforms' },
  'Industry News': { id: 'Berita Industri', en: 'Industry News' },
  'PC Culture': { id: 'Kultur PC', en: 'PC Culture' },
  'Hardware & Guides': { id: 'Hardware & Panduan', en: 'Hardware & Guides' },
  'Guides & Wikis': { id: 'Panduan & Wiki', en: 'Guides & Wikis' },
  'Guides & Reviews': { id: 'Panduan & Ulasan', en: 'Guides & Reviews' },
  'Culture & Reviews': { id: 'Budaya & Ulasan', en: 'Culture & Reviews' },
  'Reviews & Guides': { id: 'Ulasan & Panduan', en: 'Reviews & Guides' },
  'News & Features': { id: 'Berita & Fitur', en: 'News & Features' },
  'Tech & Gaming': { id: 'Teknologi & Game', en: 'Tech & Gaming' },
  'B2B Industry': { id: 'Industri B2B', en: 'B2B Industry' },
};

export function translateNewsCategory(category: string, lang: Language): string {
  return NEWS_CATEGORY_TRANSLATIONS[category]?.[lang] || category;
}

export function translateNewsTag(tag: string, lang: Language): string {
  return NEWS_TAG_TRANSLATIONS[tag]?.[lang] || tag;
}

export function formatNewsPublishedAt(publishedAt: string, lang: Language): string {
  if (!publishedAt) return publishedAt;
  if (lang === 'en') {
    return publishedAt
      .replace(/(\d+)\s*menit yang lalu/i, '$1 min ago')
      .replace(/(\d+)\s*jam yang lalu/i, '$1 hours ago')
      .replace(/(\d+)\s*hari yang lalu/i, '$1 days ago')
      .replace(/Baru saja/i, 'Just now');
  }
  return publishedAt
    .replace(/(\d+)\s*min(?:ute)?s?\s*ago/i, '$1 menit yang lalu')
    .replace(/(\d+)\s*hours?\s*ago/i, '$1 jam yang lalu')
    .replace(/(\d+)\s*days?\s*ago/i, '$1 hari yang lalu')
    .replace(/Just now/i, 'Baru saja');
}

export function formatNewsReadTime(readTime: string, lang: Language): string {
  if (!readTime) return readTime;
  if (lang === 'id') {
    return readTime.replace(/min read/i, 'mnt baca');
  }
  return readTime.replace(/mnt baca/i, 'min read');
}

// ============================================================================
// DYNAMIC TRANSLATION CACHE & ONLINE FALLBACK
// ============================================================================

const DYNAMIC_CACHE_KEY = 'erago_news_dynamic_translations_v2';
const inMemoryCache = new Map<string, string>();

function getDynamicStorage(): Record<string, { title: string; summary: string; fullContent: string[]; keyHighlights: string[] }> {
  try {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(DYNAMIC_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDynamicStorage(cache: Record<string, { title: string; summary: string; fullContent: string[]; keyHighlights: string[] }>) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DYNAMIC_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

export async function translateTextOnline(text: string, toLang: 'id' | 'en' = 'id'): Promise<string> {
  if (!text || typeof text !== 'string') return text;
  const clean = text.trim();
  if (!clean) return clean;

  const cacheKey = `${toLang}:${clean}`;
  if (inMemoryCache.has(cacheKey)) {
    return inMemoryCache.get(cacheKey)!;
  }

  try {
    const sl = toLang === 'id' ? 'en' : 'id';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${toLang}&dt=t&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json[0])) {
        const translated = json[0].map((part: [string]) => part[0]).join('').trim();
        if (translated) {
          inMemoryCache.set(cacheKey, translated);
          return translated;
        }
      }
    }
  } catch {
    // Network offline or CORS blocked; gracefully fall back
  }

  return clean;
}

// ============================================================================
// SYNCHRONOUS & ASYNCHRONOUS ARTICLE TRANSLATION
// ============================================================================

/**
 * Returns a translated version of a NewsArticle synchronously.
 * Checks static translations first, then localStorage dynamic cache.
 */
export function getTranslatedArticleSync(article: NewsArticle, lang: Language): NewsArticle {
  const original = article._original || article;

  if (lang === 'en') {
    return {
      ...original,
      category: translateNewsCategory(original.category, 'en') as NewsArticle['category'],
      tag: translateNewsTag(original.tag, 'en'),
      publishedAt: formatNewsPublishedAt(original.publishedAt, 'en'),
      readTime: formatNewsReadTime(original.readTime, 'en'),
      _original: original,
    };
  }

  // Check curated static translations
  const staticMatch = NEWS_ID_TRANSLATIONS[original.id] || NEWS_ID_TRANSLATIONS[original.url];
  if (staticMatch) {
    return {
      ...original,
      title: staticMatch.title || original.title,
      summary: staticMatch.summary || original.summary,
      fullContent: staticMatch.fullContent && staticMatch.fullContent.length > 0 ? staticMatch.fullContent : original.fullContent,
      keyHighlights: staticMatch.keyHighlights && staticMatch.keyHighlights.length > 0 ? staticMatch.keyHighlights : original.keyHighlights,
      category: translateNewsCategory(original.category, 'id') as NewsArticle['category'],
      tag: translateNewsTag(original.tag, 'id'),
      publishedAt: formatNewsPublishedAt(original.publishedAt, 'id'),
      readTime: formatNewsReadTime(original.readTime, 'id'),
      _original: original,
    };
  }

  // Check dynamic localStorage cache
  const storage = getDynamicStorage();
  const dynamicMatch = storage[original.id] || storage[original.url];
  if (dynamicMatch) {
    return {
      ...original,
      title: dynamicMatch.title || original.title,
      summary: dynamicMatch.summary || original.summary,
      fullContent: dynamicMatch.fullContent && dynamicMatch.fullContent.length > 0 ? dynamicMatch.fullContent : original.fullContent,
      keyHighlights: dynamicMatch.keyHighlights && dynamicMatch.keyHighlights.length > 0 ? dynamicMatch.keyHighlights : original.keyHighlights,
      category: translateNewsCategory(original.category, 'id') as NewsArticle['category'],
      tag: translateNewsTag(original.tag, 'id'),
      publishedAt: formatNewsPublishedAt(original.publishedAt, 'id'),
      readTime: formatNewsReadTime(original.readTime, 'id'),
      _original: original,
    };
  }

  // Default fallback if not translated yet
  return {
    ...original,
    category: translateNewsCategory(original.category, 'id') as NewsArticle['category'],
    tag: translateNewsTag(original.tag, 'id'),
    publishedAt: formatNewsPublishedAt(original.publishedAt, 'id'),
    readTime: formatNewsReadTime(original.readTime, 'id'),
    _original: original,
  };
}

/**
 * Asynchronously translates an entire article to Indonesian and caches it.
 */
export async function translateArticleAsync(article: NewsArticle, lang: Language): Promise<NewsArticle> {
  if (lang === 'en') {
    return getTranslatedArticleSync(article, 'en');
  }

  const sync = getTranslatedArticleSync(article, 'id');
  // If already translated from static overlay or cache, return immediately
  const hasStatic = Boolean(NEWS_ID_TRANSLATIONS[article.id] || NEWS_ID_TRANSLATIONS[article.url]);
  const storage = getDynamicStorage();
  const hasDynamic = Boolean(storage[article.id] || storage[article.url]);

  if (hasStatic || hasDynamic) {
    return sync;
  }

  // Perform dynamic translation
  try {
    const title = await translateTextOnline(article.title, 'id');
    const summary = await translateTextOnline(article.summary, 'id');

    const fullContent: string[] = [];
    for (const p of article.fullContent || [article.summary]) {
      fullContent.push(await translateTextOnline(p, 'id'));
    }

    const keyHighlights: string[] = [];
    for (const h of article.keyHighlights || []) {
      keyHighlights.push(await translateTextOnline(h, 'id'));
    }

    // Save to dynamic cache
    storage[article.id] = { title, summary, fullContent, keyHighlights };
    storage[article.url] = { title, summary, fullContent, keyHighlights };
    saveDynamicStorage(storage);

    return {
      ...article,
      title,
      summary,
      fullContent,
      keyHighlights,
      category: translateNewsCategory(article.category, 'id') as NewsArticle['category'],
      tag: translateNewsTag(article.tag, 'id'),
      publishedAt: formatNewsPublishedAt(article.publishedAt, 'id'),
      readTime: formatNewsReadTime(article.readTime, 'id'),
    };
  } catch {
    return sync;
  }
}

// ============================================================================
// REACT HOOK FOR AUTO-TRANSLATING NEWS ARTICLES
// ============================================================================

export function useTranslatedArticle(article: NewsArticle | null, lang: Language) {
  const [translatedArticle, setTranslatedArticle] = useState<NewsArticle | null>(() => {
    return article ? getTranslatedArticleSync(article, lang) : null;
  });
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    if (!article) {
      setTranslatedArticle(null);
      return;
    }

    // Instant sync lookup first
    const syncResult = getTranslatedArticleSync(article, lang);
    setTranslatedArticle(syncResult);

    if (lang === 'id') {
      const isAlreadyTranslated = Boolean(
        NEWS_ID_TRANSLATIONS[article.id] ||
        NEWS_ID_TRANSLATIONS[article.url] ||
        getDynamicStorage()[article.id] ||
        getDynamicStorage()[article.url]
      );

      if (!isAlreadyTranslated) {
        let isMounted = true;
        setIsTranslating(true);
        translateArticleAsync(article, 'id')
          .then((res) => {
            if (isMounted) {
              setTranslatedArticle(res);
              setIsTranslating(false);
            }
          })
          .catch(() => {
            if (isMounted) setIsTranslating(false);
          });

        return () => {
          isMounted = false;
        };
      }
    }
  }, [article, lang]);

  return { translatedArticle: translatedArticle || article, isTranslating };
}
