import React, { useEffect, useState, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  Search, 
  Copy, 
  Check, 
  ArrowLeft, 
  Clock, 
  Flame, 
  Sparkles, 
  User 
} from 'lucide-react';
import type { NewsArticle } from '../types/newsFeed';
import { sound } from '../audio/soundEngine';
import { useLanguage, type Language } from '../utils/i18n';
import { GAMING_NEWS_ARTICLES } from '../data/gamingNewsFeed';
import { useTranslatedArticle } from '../utils/newsTranslator';

interface ArticleDetailModalProps {
  isOpen: boolean;
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  isOpen,
  article,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [viewLang, setViewLang] = useState<Language>(language);

  // Automatically synchronize view language when website language changes
  useEffect(() => {
    setViewLang(language);
  }, [language]);

  // Resolve canonical article (grounded in original English source for bidirectional translation)
  const baseArticle = useMemo(() => {
    if (!article) return null;
    const original = article._original || article;
    const bundled = GAMING_NEWS_ARTICLES.find(
      (a) => a.id === original.id || a.url === original.url
    );
    if (bundled && bundled.fullContent && bundled.fullContent.length > 0) {
      return {
        ...bundled,
        _original: bundled,
      };
    }
    return original;
  }, [article]);

  const { translatedArticle, isTranslating } = useTranslatedArticle(baseArticle, viewLang);
  const cur = translatedArticle || baseArticle || article;

  const cleanParagraphs = useMemo(() => {
    if (!cur) return [];
    const raw =
      cur.fullContent && cur.fullContent.length > 0
        ? cur.fullContent
        : [cur.summary];

    const filtered = raw.filter(
      (p) =>
        Boolean(p) &&
        !p.toLowerCase().includes('artikel ini dipublikasikan oleh redaksi resmi') &&
        !p.toLowerCase().includes('klik tombol tautan di bawah')
    );

    const base = filtered.length > 0 ? filtered : [cur.summary];

    // If only 1 paragraph with lots of text, split into multiple paragraphs for comfortable reading
    if (base.length === 1 && base[0].length > 280) {
      const sentences = base[0].split(/(?<=[.!?])\s+(?=[A-Z0-9"“'‘])/);
      if (sentences.length >= 3) {
        const mid = Math.ceil(sentences.length / 2);
        return [sentences.slice(0, mid).join(' '), sentences.slice(mid).join(' ')];
      }
    }

    return base;
  }, [cur]);

  const cleanHighlights = useMemo(() => {
    if (!cur) return [];
    let list = (cur.keyHighlights || []).filter(
      (h) =>
        Boolean(h) &&
        !h.toLowerCase().includes('artikel ini dipublikasikan oleh redaksi resmi') &&
        !cleanParagraphs.some((p) => p.trim().toLowerCase() === h.trim().toLowerCase())
    );

    // Fallback: If highlights are empty or filtered out, generate 3 clear takeaways from paragraphs/summary
    if (list.length === 0 && cleanParagraphs.length > 0) {
      const allText = cleanParagraphs.join(' ');
      const sentences = allText
        .split(/(?<=[.!?])\s+(?=[A-Z0-9"“'‘])/)
        .map((s) => s.trim())
        .filter((s) => s.length > 25 && s.toLowerCase() !== (cur.title || '').toLowerCase());

      const unique = Array.from(new Set(sentences));
      if (unique.length >= 3) {
        list = [unique[0], unique[Math.floor(unique.length / 2)], unique[unique.length - 1]];
      } else if (unique.length > 0) {
        list = unique.slice(0, 3);
      } else if (cur.summary) {
        list = [cur.summary];
      }
    }

    return list;
  }, [cur, cleanParagraphs]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !cur) return null;

  const handleOpenSource = () => {
    sound.playClick();
    window.open(cur.url, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleSearch = () => {
    sound.playClick();
    const query = encodeURIComponent(`${cur.title} ${cur.outletName}`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    sound.playPowerUp();
    try {
      await navigator.clipboard.writeText(cur.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = cur.url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#00F5D4] text-white overflow-hidden animate-scale-up my-auto">
        
        {/* HEADER */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0B0C10] border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('news_reader_back')}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <span 
                className="flex items-center gap-1 px-2.5 py-1 rounded border border-black font-['Press_Start_2P'] text-[7px] font-bold text-white shadow"
                style={{ backgroundColor: cur.outletThemeColor || '#FF2A85' }}
              >
                <span>{cur.outletIcon}</span>
                <span>{cur.outletName}</span>
              </span>
              <span className="font-mono text-xs text-zinc-400">
                {cur.outletDomain}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Translation Toggle Button */}
            <button
              onClick={() => {
                sound.playClick();
                setViewLang((prev) => (prev === 'id' ? 'en' : 'id'));
              }}
              title={
                viewLang === 'id'
                  ? 'Klik untuk melihat teks asli bahasa Inggris'
                  : 'Klik untuk menerjemahkan ke Bahasa Indonesia'
              }
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black font-mono text-[10px] sm:text-xs font-bold transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <span>🌐</span>
              <span>{viewLang === 'id' ? '🇮🇩 ID (Terjemahan)' : '🇬🇧 EN (Asli)'}</span>
              {isTranslating && (
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
              )}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white font-bold hover:bg-white hover:text-black transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE ARTICLE BODY */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-7 space-y-6 text-left">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-b border-white/10 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[#00F5D4] font-bold">
                #{cur.tag}
              </span>
              <span className="text-zinc-500">•</span>
              <span>{cur.category}</span>
              {cur.isHot && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFE600] text-black border border-black font-['Press_Start_2P'] text-[6px] font-bold shadow animate-pulse">
                  <Flame className="w-2.5 h-2.5 fill-black" /> HOT
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-zinc-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
                {cur.publishedAt}
              </span>
              <span className="text-zinc-500">•</span>
              <span>{cur.readTime}</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-['Syne'] font-black text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              {cur.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE600] text-black text-xs font-bold border border-black">
                <User className="w-3.5 h-3.5" />
              </span>
              <span>
                {t('news_reader_author_by')}{' '}
                <strong className="text-white">
                  {cur.author || (language === 'id' ? `Tim Redaksi ${cur.outletName}` : `Editorial Staff ${cur.outletName}`)}
                </strong>
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">{cur.outletName}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full rounded-xl overflow-hidden border-3 border-black bg-black/60 shadow-[4px_4px_0px_#000]">
            <img
              src={cur.imageUrl}
              alt={cur.title}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/images/news/quake2-rtx.jpg';
              }}
              className="w-full max-h-[380px] object-cover"
            />
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/80 border border-white/20 font-mono text-[9px] text-zinc-300 backdrop-blur-xs">
              {language === 'id' ? 'Sumber Visual' : 'Photo Credit'}: {cur.outletName}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: RANGKUMAN ISI ARTIKEL (PUBLISHED SUMMARY)     */}
          {/* ======================================================== */}
          <div className="rounded-2xl border-3 border-black bg-gradient-to-br from-[#121420] via-[#1A1E2E] to-[#121420] p-5 sm:p-7 shadow-[5px_5px_0px_#00F5D4] space-y-5">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#00F5D4] font-['Press_Start_2P'] text-[9px] sm:text-[10px] font-bold">
                <Sparkles className="w-4 h-4 text-[#FFE600]" />
                <span>{t('news_reader_summary_title')}</span>
              </div>
              <div className="flex items-center gap-2">
                {viewLang === 'id' && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFE600]/15 border border-[#FFE600]/40 font-mono text-[9px] text-[#FFE600] font-bold">
                    <span>🌐</span>
                    <span>{language === 'id' ? 'Terjemahan Bahasa Indonesia' : 'Translated to Indonesian'}</span>
                  </span>
                )}
                <span className="px-2.5 py-1 rounded bg-[#00F5D4]/10 border border-[#00F5D4]/30 font-mono text-[9px] text-[#00F5D4] uppercase tracking-wider font-bold">
                  {t('news_reader_briefing_badge')}
                </span>
              </div>
            </div>

            {/* Published Article Content Paragraphs */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-zinc-200 leading-relaxed">
              {cleanParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-200 leading-relaxed text-justify sm:text-left">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Takeaways from the published report */}
            {cleanHighlights.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 mt-4">
                <div className="text-[10px] font-mono font-bold text-[#00F5D4] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
                  <span>{t('news_reader_takeaways_title')}</span>
                </div>
                <ul className="space-y-2 font-mono text-xs sm:text-[13px] text-zinc-100">
                  {cleanHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-[#FFE600] font-bold text-sm shrink-0">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: BACA FULL ARTIKEL CTA (HIGH IMPACT)           */}
          {/* ======================================================== */}
          <div className="rounded-2xl border-3 border-black bg-gradient-to-br from-[#1C1F2E] via-[#2A3047] to-[#181A26] p-5 sm:p-7 shadow-[6px_6px_0px_#FFE600] space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[#FFE600] leading-snug">
                    {t('news_reader_full_article_cta', { outlet: cur.outletName.toUpperCase() })}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl pt-1">
                  {t('news_reader_full_article_desc', { outlet: cur.outletName })}
                </p>
              </div>

              <div 
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7px] text-white shrink-0 shadow"
                style={{ backgroundColor: cur.outletThemeColor || '#FF2A85' }}
              >
                <span>{cur.outletIcon}</span>
                <span>{cur.outletDomain}</span>
              </div>
            </div>

            {/* BIG CALL TO ACTION BUTTON */}
            <div>
              <button
                onClick={handleOpenSource}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-3 border-black bg-[#FFE600] hover:bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[9px] sm:text-xs font-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer group active:scale-[0.99]"
              >
                <span>{t('news_reader_full_btn', { outlet: cur.outletName.toUpperCase() })}</span>
                <ExternalLink className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
              </button>
              <p className="text-[10px] font-mono text-zinc-400 text-center mt-2 flex items-center justify-center gap-1">
                <span>✦</span>
                <span>{t('news_reader_external_hint', { outlet: cur.outletDomain })}</span>
                <span>✦</span>
              </p>
            </div>

            {/* Quick Actions & URL preview */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleGoogleSearch}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{t('news_reader_search_google')}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_#000] cursor-pointer ${
                    copied
                      ? 'bg-[#00F5D4] text-black'
                      : 'bg-[#1E2230] hover:bg-[#00F5D4] hover:text-black text-white'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('news_reader_link_copied') : t('news_reader_copy_link')}</span>
                </button>
              </div>

              <div className="font-mono text-[11px] text-zinc-400 truncate max-w-[280px] sm:max-w-xs md:max-w-sm hidden sm:block">
                {cur.url}
              </div>
            </div>

            {/* Legal / Source Attribution Notice */}
            <div className="text-[10px] font-mono text-zinc-400/90 pt-1 border-t border-white/5">
              {t('news_reader_original_source_note', { outlet: cur.outletName })}
            </div>
          </div>

        </div>

        {/* STICKY FOOTER (Clean Back Button Only, No Duplicate Open Article Button) */}
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-[#0B0C10] border-t-2 border-black flex items-center justify-between font-mono text-xs text-zinc-400">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-white hover:text-black font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('news_reader_back')}</span>
          </button>

          <div className="text-[11px] font-mono text-zinc-500 hidden sm:flex items-center gap-2">
            <span>{cur.outletName}</span>
            <span>•</span>
            <span>{cur.outletDomain}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArticleDetailModal;
