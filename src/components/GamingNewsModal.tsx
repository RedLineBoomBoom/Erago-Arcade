import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  Search, 
  RefreshCw, 
  Clock, 
  Radio, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { liveNewsService, sortArticlesNewestFirst } from '../utils/liveNewsService';
import { NEWS_OUTLETS_DATABASE, NEWS_CATEGORIES } from '../data/newsOutletsData';
import type { NewsCategory } from '../types/news';
import type { NewsArticle } from '../types/newsFeed';
import { ArticleDetailModal } from './ArticleDetailModal';
import { useLanguage } from '../utils/i18n';
import { getTranslatedArticleSync } from '../utils/newsTranslator';

interface GamingNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOutletId?: string;
}

export const GamingNewsModal: React.FC<GamingNewsModalProps> = ({
  isOpen,
  onClose,
  initialOutletId = 'all',
}) => {
  const { t, language } = useLanguage();
  const [selectedOutlet, setSelectedOutlet] = useState<string>(initialOutletId);
  const [prevInitialId, setPrevInitialId] = useState(initialOutletId);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>(() => liveNewsService.getArticles());
  const [lastUpdated, setLastUpdated] = useState<number>(() => liveNewsService.getLastUpdated());

  // Sync initialOutletId if changed from prop
  if (initialOutletId !== prevInitialId) {
    setPrevInitialId(initialOutletId);
    setSelectedOutlet(initialOutletId || 'all');
  }

  // Handle ESC key
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

  // Subscribe to live news updates and auto-refresh when opening modal
  useEffect(() => {
    const unsub = liveNewsService.subscribe((freshArticles, updatedTime) => {
      setArticles(freshArticles);
      setLastUpdated(updatedTime);
    });

    if (isOpen) {
      liveNewsService.refreshNews(false);
    }

    return unsub;
  }, [isOpen]);

  // Real live refresh from 12 official outlets
  const handleRefresh = async () => {
    sound.playPowerUp();
    setIsRefreshing(true);
    setRefreshNotice(null);
    try {
      const result = await liveNewsService.refreshNews(true);
      setArticles(result.articles);
      setLastUpdated(Date.now());
      sound.playJackpot();
      setRefreshNotice(t('news_refresh_success'));
      setTimeout(() => setRefreshNotice(null), 4500);
    } catch (err) {
      console.error('Failed to refresh news feed:', err);
      sound.playCrtBuzz();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filtered and translated articles (always sorted by newest first)
  const filteredArticles = useMemo(() => {
    const list = articles
      .map((article) => getTranslatedArticleSync(article, language))
      .filter((article) => {
        // Outlet filter
        const matchesOutlet = selectedOutlet === 'all' || article.outletId === selectedOutlet;
        // Category filter
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        // Search query
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          article.title.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q) ||
          article.outletName.toLowerCase().includes(q) ||
          article.tag.toLowerCase().includes(q);

        return matchesOutlet && matchesCategory && matchesSearch;
      });

    return sortArticlesNewestFirst(list);
  }, [articles, selectedOutlet, selectedCategory, searchQuery, language]);

  // Selected outlet metadata if any
  const currentOutletMeta = useMemo(() => {
    if (selectedOutlet === 'all') return null;
    return NEWS_OUTLETS_DATABASE.find((o) => o.id === selectedOutlet) || null;
  }, [selectedOutlet]);

  if (!isOpen) return null;

  const handleOpenLink = (url: string) => {
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#00F5D4] text-white overflow-hidden animate-scale-up my-auto">
        
        {/* ======================================================== */}
        {/* 1. FIXED HEADER: CYBER PRESS ROOM                       */}
        {/* ======================================================== */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0B0C10] border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] text-xl">
              📰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-sm sm:text-lg text-white tracking-wide">
                  {t('news_header_title')}
                </h2>
                <span className="px-1.5 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold">
                  {t('news_12_outlets')}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold animate-pulse">
                  <Radio className="w-2.5 h-2.5" /> {t('news_live_feed')}
                </span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400">
                {t('news_modal_subtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Sync Button */}
            <button
              id="news-modal-refresh-btn"
              onClick={handleRefresh}
              title={t('news_refresh')}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black font-mono text-xs transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#FFE600]' : ''}`} />
              <span className="hidden sm:inline font-bold">{t('news_refresh')}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              title="Close (Esc)"
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black font-bold transition-all shadow-[2px_2px_0px_#000]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. FILTER & OUTLETS TOOLBAR                              */}
        {/* ======================================================== */}
        <div className="shrink-0 bg-[#0E1017] border-b-2 border-white/10 p-3 sm:px-6 space-y-2.5">
          
          {/* Top Row: Search Input & Category Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('news_search_placeholder')}
                className="w-full pl-9 pr-8 py-1.5 bg-[#14161F] border-2 border-black rounded-lg text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F5D4] shadow-[2px_2px_0px_#000]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-2.5 py-1 rounded-md border text-[10px] font-mono whitespace-nowrap transition-all shadow-[1px_1px_0px_#000] ${
                    selectedCategory === cat.id
                      ? 'bg-[#FFE600] text-black border-black font-bold'
                      : 'bg-[#1E2230] text-zinc-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  <span>{cat.id === 'All' ? t('news_all_categories') : cat.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: 12 Outlets Horizontal Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 pt-0.5">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedOutlet('all');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-[11px] font-mono whitespace-nowrap transition-all shrink-0 ${
                selectedOutlet === 'all'
                  ? 'bg-[#00F5D4] text-black border-black font-black shadow-[2px_2px_0px_#000]'
                  : 'bg-[#1A1C26] text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <span>🌐</span>
              <span>{t('news_all_outlets_btn')}</span>
            </button>

            {NEWS_OUTLETS_DATABASE.map((outlet) => {
              const isSelected = selectedOutlet === outlet.id;
              const count = articles.filter((a) => a.outletId === outlet.id).length;
              return (
                <button
                  key={outlet.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedOutlet(outlet.id);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 text-[11px] font-mono whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? 'bg-white text-black border-black font-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#1A1C26] text-zinc-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="text-xs">{outlet.icon}</span>
                  <span>{outlet.name}</span>
                  <span
                    className={`px-1 py-0.2 rounded text-[8px] font-bold ${
                      isSelected ? 'bg-black text-white' : 'bg-black/50 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SCROLLABLE CONTENT BODY                               */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-5">
          
          {/* Outlet Banner when an outlet is actively selected */}
          {currentOutletMeta && (
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] text-white"
              style={{ backgroundColor: '#181B26', borderLeftColor: currentOutletMeta.themeColor, borderLeftWidth: '8px' }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentOutletMeta.icon}</span>
                  <h3 className="font-['Syne'] font-black text-lg text-white">
                    {currentOutletMeta.name}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 font-mono text-[9px] text-[#00F5D4]">
                    {currentOutletMeta.domain}
                  </span>
                </div>
                <p className="font-mono text-xs text-zinc-300">
                  {currentOutletMeta.tagline} — {currentOutletMeta.description}
                </p>
              </div>

              <button
                onClick={() => handleOpenLink(currentOutletMeta.url)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors shrink-0"
              >
                <span>{t('news_open_site')}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Refresh Notification Banner */}
          {refreshNotice && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] animate-bounce-subtle">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
              <span>{refreshNotice}</span>
            </div>
          )}

          {/* Results Counter & Live RSS Telemetry */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-zinc-400 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {t('news_showing_count', { count: filteredArticles.length })}
              </span>
              {selectedOutlet !== 'all' && (
                <span className="text-zinc-500">
                  {t('news_from')} <span className="text-[#FFE600] font-bold">{currentOutletMeta?.name}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-[#00F5D4]/40 text-[#00F5D4] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
                <span>{t('news_live_status')}</span>
              </span>
              <span className="text-zinc-400">
                {t('news_last_updated', {
                  time: new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                })}
              </span>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => {
                    sound.playClick();
                    setReadingArticle(article);
                  }}
                  className="group relative flex flex-col justify-between rounded-xl border-3 border-black bg-[#1A1C26] overflow-hidden shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all duration-200 cursor-pointer text-left"
                >
                  {/* Article Thumbnail Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/40 border-b-2 border-black">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = '/images/news/quake2-rtx.jpg';
                      }}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Top Badges Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                      {/* Outlet Pill */}
                      <span 
                        className="flex items-center gap-1 px-2 py-0.5 rounded border border-black font-['Press_Start_2P'] text-[7px] font-bold text-white shadow"
                        style={{ backgroundColor: article.outletThemeColor || '#FF2A85' }}
                      >
                        <span>{article.outletIcon}</span>
                        <span>{article.outletName}</span>
                      </span>

                      {/* Hot Badge */}
                      {article.isHot && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FFE600] text-black border border-black font-['Press_Start_2P'] text-[6px] font-bold shadow animate-pulse">
                          <Flame className="w-2.5 h-2.5 fill-black" /> HOT
                        </span>
                      )}
                    </div>

                    {/* Bottom Category Tag */}
                    <div className="absolute bottom-2 left-2.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 border border-white/20 font-mono text-[9px] text-[#00F5D4] backdrop-blur-xs font-bold">
                        #{article.tag}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#FFE600]" />
                          {article.publishedAt}
                        </span>
                        <span className="text-zinc-500">{article.readTime}</span>
                      </div>

                      <h4 className="font-['Syne'] font-bold text-sm text-white group-hover:text-[#FFE600] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>

                      <p className="font-mono text-[11px] text-zinc-400 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 text-[10px]">
                        {article.outletDomain}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenLink(article.url);
                          }}
                          title={`Buka situs resmi ${article.outletDomain}`}
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <span className="flex items-center gap-1 text-[#00F5D4] group-hover:text-white font-bold transition-colors">
                          <span>{t('news_read_btn')}</span>
                          <span className="text-[10px]">▸</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-xl border-2 border-dashed border-white/20 bg-[#1A1C26]/50 p-8 text-center space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="font-['Syne'] font-black text-lg text-white">
                {t('news_not_found')}
              </h3>
              <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
                {t('news_not_found_desc', { query: searchQuery })}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedOutlet('all');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-lg border-2 border-black bg-[#FFE600] text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
              >
                {t('news_reset_filters')}
              </button>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 4. FIXED FOOTER: SOURCE CITATIONS & DISMISS              */}
        {/* ======================================================== */}
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-[#0B0C10] border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-2.5 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-base">✦</span>
            <span>
              {t('news_footer_notice')}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-1.5 rounded-lg border-2 border-black bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
          >
            {t('news_back_arcade')}
          </button>
        </div>

      </div>

      {/* In-App Article Reader Modal */}
      <ArticleDetailModal
        isOpen={!!readingArticle}
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
      />
    </div>
  );
};

export default GamingNewsModal;
