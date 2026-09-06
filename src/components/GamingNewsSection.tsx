import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Radio, 
  Globe, 
  SlidersHorizontal,
  BookmarkCheck,
  ChevronRight,
  RefreshCw,
  Clock,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { NEWS_OUTLETS_DATABASE, NEWS_CATEGORIES, getOutletDescription } from '../data/newsOutletsData';
import { liveNewsService, sortArticlesNewestFirst } from '../utils/liveNewsService';
import type { NewsCategory } from '../types/news';
import type { NewsArticle } from '../types/newsFeed';
import { ArticleDetailModal } from './ArticleDetailModal';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';
import { getTranslatedArticleSync } from '../utils/newsTranslator';

interface GamingNewsSectionProps {
  onBackToArcade: () => void;
}

export const GamingNewsSection: React.FC<GamingNewsSectionProps> = ({ onBackToArcade }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'feed' | 'outlets'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');
  const [selectedOutlet, setSelectedOutlet] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);

  // Live news state subscribed to liveNewsService
  const [articles, setArticles] = useState<NewsArticle[]>(() => liveNewsService.getArticles());
  const [lastUpdated, setLastUpdated] = useState<number>(() => liveNewsService.getLastUpdated());

  // Subscribe to live news updates & trigger fresh check on mount
  useEffect(() => {
    const unsub = liveNewsService.subscribe((freshArticles, updatedTime) => {
      setArticles(freshArticles);
      setLastUpdated(updatedTime);
    });

    const elapsed = Date.now() - liveNewsService.getLastUpdated();
    if (elapsed > 3 * 60 * 1000 || liveNewsService.getArticles().length === 0) {
      liveNewsService.refreshNews(false).catch(() => {});
    }

    return unsub;
  }, []);

  // Real-time refresh from all 12 portals
  const handleRefresh = async () => {
    sound.playPowerUp();
    setIsRefreshing(true);
    setRefreshNotice(null);
    try {
      const result = await liveNewsService.refreshNews(true);
      setArticles(result.articles);
      setLastUpdated(Date.now());
      sound.playJackpot();
      setRefreshNotice(
        language === 'id'
          ? `✅ Berhasil menyinkronkan ${result.articles.length} berita live dari 12 portal resmi!`
          : `✅ Successfully synced ${result.articles.length} live articles from 12 official outlets!`
      );
      setTimeout(() => setRefreshNotice(null), 4500);
    } catch (err) {
      console.error('Failed to refresh live news:', err);
      sound.playCrtBuzz();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filtered and translated articles
  const filteredArticles = useMemo(() => {
    const list = articles
      .map((article) => getTranslatedArticleSync(article, language))
      .filter((article) => {
        const matchesOutlet = selectedOutlet === 'all' || article.outletId === selectedOutlet;
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
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

  // Filtered outlets based on search query and category
  const filteredOutlets = useMemo(() => {
    return NEWS_OUTLETS_DATABASE.filter((outlet) => {
      const matchesCategory = selectedCategory === 'All' || outlet.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        outlet.name.toLowerCase().includes(q) ||
        outlet.domain.toLowerCase().includes(q) ||
        outlet.tagline.toLowerCase().includes(q) ||
        outlet.description.toLowerCase().includes(q) ||
        outlet.focusTags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const currentOutletMeta = useMemo(() => {
    if (selectedOutlet === 'all') return null;
    return NEWS_OUTLETS_DATABASE.find((o) => o.id === selectedOutlet) || null;
  }, [selectedOutlet]);

  const handleOpenExternal = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOutletClick = (outletId: string) => {
    sound.playClick();
    if (selectedOutlet === outletId) {
      setSelectedOutlet('all');
    } else {
      setSelectedOutlet(outletId);
      setActiveTab('feed');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header Banner: Cyber-Press Desk */}
      <div className="relative overflow-hidden rounded-2xl border-4 border-black bg-gradient-to-r from-[#14161F] via-[#1A1C26] to-[#14161F] p-4 sm:p-8 shadow-[6px_6px_0px_#00F5D4] sm:shadow-[8px_8px_0px_#00F5D4] text-white">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00F5D4] via-[#FFE600] to-[#FF2A85]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                <Radio className="w-3 h-3 animate-pulse text-[#FF2A85]" /> LIVE WIRE
              </span>
              <span className="px-2.5 py-1 rounded bg-[#FFE600] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                12 VERIFIED OUTLETS
              </span>
              <span className="px-2.5 py-1 rounded bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                {articles.length}+ ARTICLES
              </span>
              <span className="font-mono text-xs text-[#00F5D4] hidden sm:inline">
                // REAL-TIME RSS SYNDICATION // 12 OFFICIAL FEEDS
              </span>
            </div>

            <h1 className="font-['Syne'] font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight break-words">
              ERAGO GAMING & ENTERTAINMENT NEWS
            </h1>

            <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {language === 'id'
                ? 'Pusat sindikasi berita video game dunia secara live dari 12 portal resmi internasional. Dapatkan pembaruan otomatis setiap saat untuk ulasan game, bocoran industri, trailer, dan investigasi hardware.'
                : 'Global video game news syndication hub streaming live from 12 official international portals. Get continuous real-time updates for trusted reviews, industry scoops, trailers, and hardware benchmarks.'}
            </p>
          </div>

          {/* Quick Stats & Live Refresh Panel */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border-3 border-black bg-[#0B0C10] shadow-[4px_4px_0px_#000] shrink-0">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <div className="font-['Press_Start_2P'] text-lg sm:text-xl text-[#FFE600]">
                  {articles.length}
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase mt-0.5">
                  {language === 'id' ? 'Artikel Live' : 'Live Articles'}
                </div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="font-['Press_Start_2P'] text-lg sm:text-xl text-[#00F5D4]">
                  12
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase mt-0.5">
                  {language === 'id' ? 'Media Resmi' : 'Verified Outlets'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* SYNC LIVE BUTTON */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border-2 border-black bg-[#00F5D4] hover:bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? (language === 'id' ? 'MEMPERBARUI...' : 'SYNCING...') : (language === 'id' ? 'SYNC LIVE // PERBARUI' : 'SYNC LIVE // REFRESH')}</span>
              </button>

              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 px-1">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F566] animate-ping" />
                  <span>{language === 'id' ? 'Otomatis tiap 2.5 mnt' : 'Auto-poll 2.5 mins'}</span>
                </span>
                <span className="text-zinc-500">
                  {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Refresh Feedback Alert */}
      {refreshNotice && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl border-3 border-black bg-[#00F5D4] text-black font-mono text-xs font-bold shadow-[4px_4px_0px_#000] animate-bounce-subtle">
          <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
          <span>{refreshNotice}</span>
        </div>
      )}

      {/* Press Marquee Ticker */}
      <div className="overflow-hidden rounded-lg border-2 border-black bg-[#FFE600] text-black py-2 font-['Press_Start_2P'] text-[8.5px] sm:text-[9px] font-bold shadow-[3px_3px_0px_#000]">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-6 inline-flex items-center gap-2">✦ PC GAMER: HARDWARE & PC GAMING SCOOPS</span>
          <span className="mx-6 inline-flex items-center gap-2">★ GAMESPOT: IN-DEPTH REVIEWS & TRAILERS</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ IGN SOUTHEAST ASIA: REGIONAL GAMING & POP CULTURE</span>
          <span className="mx-6 inline-flex items-center gap-2">★ VGC: BREAKING STUDIO SCOOPS & NEXT-GEN LEAKS</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ EUROGAMER: INDEPTH ESSAYS & REVIEWS</span>
          <span className="mx-6 inline-flex items-center gap-2">★ THEGAMER: GUIDES, RANKINGS & RPG STRATEGIES</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ POLYGON: CULTURE & ENTERTAINMENT</span>
          <span className="mx-6 inline-flex items-center gap-2">★ ROCK PAPER SHOTGUN: INDIE & PC PASSION</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ THE VERGE: CLOUD GAMING & HANDHELDS</span>
          <span className="mx-6 inline-flex items-center gap-2">★ GAMESINDUSTRY.BIZ: B2B FINANCIALS & STUDIO M&A</span>
        </div>
      </div>

      {/* View Switcher Tabs: LIVE FEED vs 12 OUTLETS DIRECTORY */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B0C10] p-2 sm:p-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('feed');
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-['Press_Start_2P'] text-[8px] sm:text-[9px] font-bold transition-all cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-[#00F5D4] text-black border-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                : 'bg-[#14161F] text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${activeTab === 'feed' ? 'animate-pulse text-[#FF2A85]' : ''}`} />
            <span>{language === 'id' ? '⚡ FEED BERITA LIVE' : '⚡ LIVE NEWS FEED'}</span>
            <span className="px-1.5 py-0.5 rounded bg-black text-white text-[7px]">
              {filteredArticles.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('outlets');
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-['Press_Start_2P'] text-[8px] sm:text-[9px] font-bold transition-all cursor-pointer ${
              activeTab === 'outlets'
                ? 'bg-[#FFE600] text-black border-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                : 'bg-[#14161F] text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'id' ? '🏢 12 DIREKTORI MEDIA' : '🏢 12 OUTLET PROFILES'}</span>
            <span className="px-1.5 py-0.5 rounded bg-black text-white text-[7px]">
              12
            </span>
          </button>
        </div>

        {/* Live sync quick trigger for desktop */}
        <div className="hidden md:flex items-center gap-3 font-mono text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-[#00F5D4]">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
            <span>12 Feeds Real-Time</span>
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-white hover:text-black font-mono text-[10px] font-bold shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#FFE600]' : ''}`} />
            <span>SYNC</span>
          </button>
        </div>
      </div>

      {/* 12 Outlets Horizontal Selector Strip (Always visible for quick filtering) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1">
          <span className="flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#FFE600]" />
            <span>{language === 'id' ? 'PILIH MEDIA SPESIFIK:' : 'FILTER BY OUTLET:'}</span>
          </span>
          {selectedOutlet !== 'all' && (
            <button
              onClick={() => setSelectedOutlet('all')}
              className="text-[#00F5D4] hover:underline cursor-pointer"
            >
              {language === 'id' ? 'Tampilkan Semua Media' : 'Show All Outlets'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedOutlet('all');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-[11px] font-mono whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              selectedOutlet === 'all'
                ? 'bg-[#00F5D4] text-black border-black font-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                : 'bg-[#14161F] text-zinc-400 border-black hover:text-white hover:bg-[#1E2230] shadow-[2px_2px_0px_#000]'
            }`}
          >
            <span>🌐</span>
            <span>{language === 'id' ? 'SEMUA MEDIA' : 'ALL OUTLETS'}</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-black text-white font-bold ml-1">
              {articles.length}
            </span>
          </button>

          {NEWS_OUTLETS_DATABASE.map((outlet) => {
            const isSelected = selectedOutlet === outlet.id;
            const count = articles.filter((a) => a.outletId === outlet.id).length;
            return (
              <button
                key={outlet.id}
                onClick={() => handleOutletClick(outlet.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-[11px] font-mono whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-black font-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-[#14161F] text-zinc-300 border-black hover:text-white hover:bg-[#1E2230] shadow-[2px_2px_0px_#000]'
                }`}
              >
                <span className="text-sm">{outlet.icon}</span>
                <span>{outlet.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold ml-1 ${
                    isSelected ? 'bg-black text-white' : 'bg-black/60 text-[#00F5D4]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Category Filter Strip */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'id'
                  ? 'Cari berita, judul, media, atau topik (contoh: Resident Evil, Steam, PS5, GPU)...'
                  : 'Search news, title, outlet, or topic (e.g. Resident Evil, Steam, PS5, GPU)...'
              }
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-black bg-[#14161F] text-white font-mono text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#00F5D4] focus:bg-[#1A1C26] transition-all shadow-[3px_3px_0px_#000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Result Counter & Active View info */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00F566]" />
              <span>
                {activeTab === 'feed'
                  ? (language === 'id' ? `Menampilkan: ${filteredArticles.length} Berita` : `Showing: ${filteredArticles.length} Articles`)
                  : (language === 'id' ? `Menampilkan: ${filteredOutlets.length} Media` : `Showing: ${filteredOutlets.length} Outlets`)}
              </span>
            </span>
            {selectedOutlet !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-[#1E2230] text-[#FFE600] font-bold border border-white/10">
                {currentOutletMeta?.name}
              </span>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {NEWS_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7.5px] sm:text-[8px] transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FFE600] text-black font-bold shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-[#14161F] text-zinc-400 hover:text-white hover:bg-white/10 shadow-[1px_1px_0px_#000]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Outlet Spotlight Banner (when a specific outlet is filtered) */}
      {currentOutletMeta && (
        <div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border-4 border-black shadow-[4px_4px_0px_#000] text-white animate-scale-up"
          style={{ backgroundColor: '#161924', borderLeftColor: currentOutletMeta.themeColor, borderLeftWidth: '8px' }}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{currentOutletMeta.icon}</span>
              <h2 className="font-['Syne'] font-black text-base sm:text-xl text-white">
                {currentOutletMeta.name}
              </h2>
              <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 font-mono text-[10px] text-[#00F5D4]">
                {currentOutletMeta.domain}
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-300">
              "{currentOutletMeta.tagline}" — {getOutletDescription(currentOutletMeta, language)}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => handleOpenExternal(e, currentOutletMeta.url)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7.5px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors cursor-pointer"
            >
              <span>{language === 'id' ? 'SITUS RESMI ↗' : 'OFFICIAL SITE ↗'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={() => setSelectedOutlet('all')}
              className="px-3 py-2 rounded-lg border-2 border-black bg-[#282E40] text-white hover:bg-white hover:text-black font-mono text-xs font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 1: LIVE ARTICLE FEED                                          */}
      {/* =================================================================== */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((article) => (
                <article
                  key={`${article.id}-${article.url || ''}`}
                  onClick={() => {
                    sound.playClick();
                    setReadingArticle(article);
                  }}
                  className="group relative flex flex-col justify-between rounded-2xl border-4 border-black bg-[#14161F] overflow-hidden shadow-[6px_6px_0px_#000] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_#00F5D4] transition-all duration-200 cursor-pointer text-left"
                >
                  {/* Article Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/60 border-b-3 border-black">
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
                      <span 
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-black font-['Press_Start_2P'] text-[7px] font-bold text-white shadow-[2px_2px_0px_#000]"
                        style={{ backgroundColor: article.outletThemeColor || '#FF2A85' }}
                      >
                        <span>{article.outletIcon}</span>
                        <span>{article.outletName}</span>
                      </span>

                      {article.isHot && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#FFE600] text-black border border-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] animate-pulse">
                          <Flame className="w-3 h-3 fill-black" /> HOT
                        </span>
                      )}
                    </div>

                    {/* Bottom Category Tag */}
                    <div className="absolute bottom-2 left-2.5">
                      <span className="px-2 py-0.5 rounded bg-black/85 border border-white/20 font-mono text-[9px] text-[#00F5D4] font-bold backdrop-blur-xs">
                        #{article.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
                          {article.publishedAt}
                        </span>
                        <span className="text-zinc-500">{article.readTime}</span>
                      </div>

                      <h3 className="font-['Syne'] font-black text-sm sm:text-base text-white group-hover:text-[#FFE600] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="font-mono text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 text-[11px] truncate max-w-[140px]">
                        {article.outletDomain}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleOpenExternal(e, article.url)}
                          title={`Buka situs resmi ${article.outletDomain}`}
                          className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <span className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold group-hover:bg-[#FFE600] transition-colors shadow-[2px_2px_0px_#000]">
                          <span>{language === 'id' ? 'BACA' : 'READ'}</span>
                          <span>▸</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border-4 border-black bg-[#14161F] p-12 text-center space-y-4 shadow-[8px_8px_0px_#000]">
              <div className="text-5xl">🔍</div>
              <h3 className="font-['Syne'] font-black text-2xl text-white">
                {language === 'id' ? 'TIDAK DITEMUKAN ARTIKEL' : 'NO ARTICLES FOUND'}
              </h3>
              <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
                {language === 'id'
                  ? `Tidak ada artikel yang cocok dengan filter atau kata kunci "${searchQuery}". Coba kata kunci lain atau reset filter.`
                  : `No articles matched filters or query "${searchQuery}". Try another keyword or reset filters.`}
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                  setSelectedOutlet('all');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 rounded-lg border-2 border-black bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                {language === 'id' ? 'RESET SEMUA FILTER' : 'RESET ALL FILTERS'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 2: 12 MEDIA OUTLETS DIRECTORY                                  */}
      {/* =================================================================== */}
      {activeTab === 'outlets' && (
        <div className="space-y-6">
          {filteredOutlets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOutlets.map((outlet) => {
                const articleCount = articles.filter((a) => a.outletId === outlet.id).length;
                return (
                  <div
                    key={outlet.id}
                    className="group relative flex flex-col justify-between rounded-2xl border-4 border-black bg-[#14161F] p-5 shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all duration-200"
                    style={{ borderTopColor: outlet.themeColor, borderTopWidth: '8px' }}
                  >
                    <div className="space-y-4">
                      {/* Top Meta Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black text-2xl shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: `${outlet.themeColor}33`, borderColor: outlet.themeColor }}
                          >
                            {outlet.icon}
                          </div>
                          <div>
                            <h3 className="font-['Syne'] font-black text-lg text-white group-hover:text-[#FFE600] transition-colors leading-tight">
                              {outlet.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Globe className="w-3 h-3 text-zinc-500" />
                              <span className="font-mono text-[10px] text-zinc-400">{outlet.domain}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded-xs font-['Press_Start_2P'] text-[6px] font-bold uppercase bg-black text-zinc-300 border border-white/10">
                            EST. {outlet.foundedYear}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-xs font-mono text-[9px] font-bold"
                            style={{ color: outlet.themeColor }}
                          >
                            {outlet.category}
                          </span>
                        </div>
                      </div>

                      {/* Tagline */}
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <p className="font-mono text-xs text-[#00F5D4] font-medium italic">
                          "{outlet.tagline}"
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                        {getOutletDescription(outlet, language)}
                      </p>

                      {/* Focus Topic Tags */}
                      <div className="space-y-1.5">
                        <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                          <BookmarkCheck className="w-3 h-3 text-[#FFE600]" />
                          <span>{language === 'id' ? 'Fokus Liputan:' : 'Coverage Focus:'}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {outlet.focusTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#1E2230] border border-white/10 font-mono text-[10px] text-zinc-300 hover:border-white/30 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Headline Beats List */}
                      <div className="space-y-1 pt-1">
                        <div className="font-mono text-[9px] text-zinc-500 uppercase">
                          {language === 'id' ? 'Segmen Unggulan:' : 'Featured Beats:'}
                        </div>
                        <ul className="space-y-1">
                          {outlet.headlineBeats.map((beat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                              <ChevronRight className="w-3 h-3 text-[#FFE600] shrink-0" />
                              <span className="truncate">{beat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOutletClick(outlet.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-black bg-[#1E2230] text-white hover:bg-[#FFE600] hover:text-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                      >
                        <Radio className="w-2.5 h-2.5 text-[#00F5D4]" />
                        <span>{language === 'id' ? `BERITA (${articleCount})` : `ARTICLES (${articleCount})`}</span>
                      </button>

                      <button
                        onClick={(e) => handleOpenExternal(e, outlet.url)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7px] font-bold text-black shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-all cursor-pointer"
                        style={{ backgroundColor: outlet.themeColor === '#000000' ? '#FFE600' : outlet.themeColor }}
                      >
                        <span>{language === 'id' ? 'KUNJUNGI ↗' : 'VISIT ↗'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border-4 border-black bg-[#14161F] p-12 text-center space-y-4 shadow-[8px_8px_0px_#000]">
              <div className="text-5xl">🔍</div>
              <h3 className="font-['Syne'] font-black text-2xl text-white">
                {language === 'id' ? 'TIDAK DITEMUKAN OUTLET BERITA' : 'NO NEWS OUTLETS FOUND'}
              </h3>
              <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
                {language === 'id'
                  ? `Tidak ada media yang cocok dengan kata kunci "${searchQuery}". Coba kata kunci lain atau reset filter.`
                  : `No media matched keyword "${searchQuery}". Try another keyword or reset filters.`}
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 rounded-lg border-2 border-black bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                {language === 'id' ? 'RESET SEMUA FILTER' : 'RESET ALL FILTERS'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Dispatch Footer Notice */}
      <div className="rounded-2xl border-3 border-black bg-[#0B0C10] p-6 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFE600] text-black border-2 border-black text-2xl shadow-[2px_2px_0px_#000]">
            📰
          </div>
          <div>
            <div className="font-['Syne'] font-black text-base text-white">
              {language === 'id'
                ? 'BACA BERITA TERBARU LANGSUNG DI ERAGO ARCADE'
                : 'READ LATEST NEWS DIRECTLY IN ERAGO ARCADE'}
            </div>
            <p className="font-mono text-xs text-zinc-400">
              {language === 'id'
                ? 'Pilih kartu berita apa pun untuk membaca artikel lengkap dengan poin sorotan dan terjemahan instan, atau buka situs asli di tab baru.'
                : 'Click any article card to read full article with key highlights and instant translation, or open the original outlet in a new tab.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onBackToArcade();
          }}
          className="px-5 py-3 rounded-lg border-2 border-black bg-[#FF2A85] text-black font-['Press_Start_2P'] text-[9px] font-bold shadow-[3px_3px_0px_#000] hover:bg-white transition-colors shrink-0 cursor-pointer"
        >
          {language === 'id' ? 'KEMBALI KE ARCADE ➔' : 'BACK TO ARCADE ➔'}
        </button>
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

export default GamingNewsSection;
