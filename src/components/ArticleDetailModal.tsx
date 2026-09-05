import React, { useEffect, useState } from 'react';
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
import { useLanguage } from '../utils/i18n';

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

  if (!isOpen || !article) return null;

  const handleOpenSource = () => {
    sound.playClick();
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleSearch = () => {
    sound.playClick();
    const query = encodeURIComponent(`${article.title} ${article.outletName}`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    sound.playPowerUp();
    try {
      await navigator.clipboard.writeText(article.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = article.url;
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
                style={{ backgroundColor: article.outletThemeColor || '#FF2A85' }}
              >
                <span>{article.outletIcon}</span>
                <span>{article.outletName}</span>
              </span>
              <span className="font-mono text-xs text-zinc-400">
                {article.outletDomain}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
                #{article.tag}
              </span>
              <span className="text-zinc-500">•</span>
              <span>{article.category}</span>
              {article.isHot && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFE600] text-black border border-black font-['Press_Start_2P'] text-[6px] font-bold shadow animate-pulse">
                  <Flame className="w-2.5 h-2.5 fill-black" /> HOT
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-zinc-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
                {article.publishedAt}
              </span>
              <span className="text-zinc-500">•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-['Syne'] font-black text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE600] text-black text-xs font-bold border border-black">
                <User className="w-3.5 h-3.5" />
              </span>
              <span>
                {t('news_reader_author_by')}{' '}
                <strong className="text-white">
                  {article.author || (language === 'id' ? `Tim Redaksi ${article.outletName}` : `Editorial Staff ${article.outletName}`)}
                </strong>
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">{article.outletName}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full rounded-xl overflow-hidden border-3 border-black bg-black/60 shadow-[4px_4px_0px_#000]">
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/images/news/quake2-rtx.jpg';
              }}
              className="w-full max-h-[380px] object-cover"
            />
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/80 border border-white/20 font-mono text-[9px] text-zinc-300 backdrop-blur-xs">
              {language === 'id' ? 'Sumber Visual' : 'Photo Credit'}: {article.outletName}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: RANGKUMAN BERITA / EXECUTIVE NEWS BRIEFING    */}
          {/* ======================================================== */}
          <div className="rounded-2xl border-3 border-black bg-gradient-to-br from-[#121420] via-[#1A1E2E] to-[#121420] p-5 sm:p-6 shadow-[5px_5px_0px_#00F5D4] space-y-4">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#00F5D4] font-['Press_Start_2P'] text-[9px] sm:text-[10px] font-bold">
                <Sparkles className="w-4 h-4 text-[#FFE600]" />
                <span>{t('news_reader_summary_title')}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#00F5D4]/10 border border-[#00F5D4]/30 font-mono text-[9px] text-[#00F5D4] uppercase tracking-wider font-bold">
                {t('news_reader_briefing_badge')}
              </span>
            </div>

            {/* Editorial Lead / Teaser Quote */}
            {article.summary && (
              <div className="relative rounded-xl border-l-4 border-[#FFE600] bg-black/40 p-3.5 sm:p-4 font-mono text-xs sm:text-sm text-zinc-100 italic leading-relaxed">
                <span className="text-[#FFE600] font-bold text-base mr-1.5">“</span>
                {article.summary}
                <span className="text-[#FFE600] font-bold text-base ml-1.5">”</span>
              </div>
            )}

            {/* Contextual Narrative Summary */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
                {t('news_reader_overview_title')}
              </div>
              <p className="font-sans text-sm text-zinc-200 leading-relaxed text-justify sm:text-left">
                {language === 'id' ? (
                  <>
                    Laporan ini menyajikan sorotan terkini mengenai <strong className="text-white">"{article.title}"</strong> yang dirilis secara resmi oleh redaksi <strong className="text-[#00F5D4]">{article.outletName}</strong>. Topik ini mengulas dinamika industri dalam kategori <span className="text-[#FFE600]">{article.category}</span> ({article.tag}) untuk pembaca gamer global.
                  </>
                ) : (
                  <>
                    This briefing presents verified coverage regarding <strong className="text-white">"{article.title}"</strong>, officially published by the <strong className="text-[#00F5D4]">{article.outletName}</strong> editorial desk. It highlights key industry updates under the <span className="text-[#FFE600]">{article.category}</span> ({article.tag}) beat for the gaming community.
                  </>
                )}
              </p>
            </div>

            {/* Structured Key Takeaways */}
            <div className="pt-2 border-t border-white/10 space-y-2.5">
              <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]" />
                {t('news_reader_takeaways_title')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <span className="text-[#FFE600] font-bold shrink-0">🎯</span>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase">{t('news_reader_topic_label')}</div>
                    <div className="text-zinc-200 font-sans text-xs line-clamp-2">{article.title}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <span className="text-[#00F5D4] font-bold shrink-0">🏷️</span>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase">{t('news_reader_category_label')}</div>
                    <div className="text-zinc-200 text-xs">{article.category} • #{article.tag}</div>
                  </div>
                </div>
              </div>

              {/* Extra unique bullet highlights if any distinct sentence exists */}
              {article.keyHighlights && article.keyHighlights.length > 0 && (() => {
                const uniqueBullets = Array.from(new Set(article.keyHighlights))
                  .filter(h => h.trim() && h.trim().toLowerCase() !== (article.summary || '').trim().toLowerCase());
                if (uniqueBullets.length === 0) return null;
                return (
                  <ul className="space-y-1.5 pt-1 font-mono text-xs text-zinc-200">
                    {uniqueBullets.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00F5D4] font-bold shrink-0">▸</span>
                        <span className="text-zinc-300">{h}</span>
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </div>
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
                    {t('news_reader_full_article_cta', { outlet: article.outletName.toUpperCase() })}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl pt-1">
                  {t('news_reader_full_article_desc', { outlet: article.outletName })}
                </p>
              </div>

              <div 
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7px] text-white shrink-0 shadow"
                style={{ backgroundColor: article.outletThemeColor || '#FF2A85' }}
              >
                <span>{article.outletIcon}</span>
                <span>{article.outletDomain}</span>
              </div>
            </div>

            {/* BIG CALL TO ACTION BUTTON */}
            <div>
              <button
                onClick={handleOpenSource}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-3 border-black bg-[#FFE600] hover:bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[9px] sm:text-xs font-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer group active:scale-[0.99]"
              >
                <span>{t('news_reader_full_btn', { outlet: article.outletName.toUpperCase() })}</span>
                <ExternalLink className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
              </button>
              <p className="text-[10px] font-mono text-zinc-400 text-center mt-2 flex items-center justify-center gap-1">
                <span>✦</span>
                <span>{t('news_reader_external_hint', { outlet: article.outletDomain })}</span>
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
                {article.url}
              </div>
            </div>

            {/* Legal / Source Attribution Notice */}
            <div className="text-[10px] font-mono text-zinc-400/90 pt-1 border-t border-white/5">
              {t('news_reader_original_source_note', { outlet: article.outletName })}
            </div>
          </div>

        </div>

        {/* STICKY FOOTER */}
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-[#0B0C10] border-t-2 border-black flex items-center justify-between font-mono text-xs text-zinc-400 gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-white hover:text-black font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('news_reader_back')}</span>
          </button>

          <button
            onClick={handleOpenSource}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg border-2 border-black bg-[#FFE600] hover:bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
          >
            <span>{t('news_reader_full_btn', { outlet: article.outletName })}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ArticleDetailModal;
