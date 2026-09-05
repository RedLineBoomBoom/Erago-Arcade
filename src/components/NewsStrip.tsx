import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Newspaper, 
  Search, 
  ExternalLink, 
  Clock, 
  Flame, 
  Maximize2, 
  ChevronUp, 
  ChevronDown, 
  Radio, 
  RefreshCw 
} from 'lucide-react';
import { NEWS_OUTLETS_DATABASE, NEWS_CATEGORIES } from '../data/newsOutletsData';
import { liveNewsService, sortArticlesNewestFirst } from '../utils/liveNewsService';
import { sound } from '../audio/soundEngine';
import type { NewsCategory } from '../types/news';
import type { NewsArticle } from '../types/newsFeed';
import { ArticleDetailModal } from './ArticleDetailModal';
import { useLanguage } from '../utils/i18n';
import { getTranslatedArticleSync } from '../utils/newsTranslator';

interface NewsStripProps {
  onOpenNewsModal?: (outletId?: string) => void;
  onOpenSalesModal?: () => void;
}

export const NewsStrip: React.FC<NewsStripProps> = ({ onOpenNewsModal, onOpenSalesModal }) => {
  const { language, t } = useLanguage();
  // Start expanded by default so the popup news is directly visible right here
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedOutlet, setSelectedOutlet] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>(() => liveNewsService.getArticles());
  const [lastUpdated, setLastUpdated] = useState<number>(() => liveNewsService.getLastUpdated());

  // Subscribe to live news updates
  React.useEffect(() => {
    return liveNewsService.subscribe((freshArticles, updatedTime) => {
      setArticles(freshArticles);
      setLastUpdated(updatedTime);
    });
  }, []);

  const handleRefresh = async () => {
    sound.playPowerUp();
    setIsRefreshing(true);
    try {
      const result = await liveNewsService.refreshNews(true);
      setArticles(result.articles);
      setLastUpdated(Date.now());
      sound.playJackpot();
    } catch (err) {
      console.error('Failed to refresh news feed:', err);
      sound.playCrtBuzz();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOutletClick = (outletId: string) => {
    sound.playClick();
    if (selectedOutlet === outletId && isExpanded) {
      // Toggle to all if clicked again
      setSelectedOutlet('all');
    } else {
      setSelectedOutlet(outletId);
      setIsExpanded(true);
    }
  };

  const handleOpenLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Filtered and translated articles (always sorted by newest first)
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

  const currentOutletMeta = useMemo(() => {
    if (selectedOutlet === 'all') return null;
    return NEWS_OUTLETS_DATABASE.find((o) => o.id === selectedOutlet) || null;
  }, [selectedOutlet]);

  return (
    <section className="mx-auto w-full max-w-6xl px-3 sm:px-4 py-4 animate-fade-in">
      <div className="rounded-2xl border-4 border-black bg-[#14161F] p-4 sm:p-5 shadow-[6px_6px_0px_#00F5D4] space-y-4 text-white">
        
        {/* ======================================================== */}
        {/* 1. HEADER BAR                                            */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFE600] text-black border-2 border-black text-xl shadow-[2px_2px_0px_#000]">
              📰
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-['Syne'] font-black text-sm sm:text-base text-white uppercase tracking-wide">
                  {t('news_header_title')}
                </h2>
                <span className="px-1.5 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold border border-black">
                  {t('news_12_outlets')}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold animate-pulse">
                  <Radio className="w-2.5 h-2.5" /> {t('news_live_feed')}
                </span>
                <span className="hidden md:inline-flex font-mono text-[9px] text-[#00F5D4] bg-black/50 px-1.5 py-0.5 rounded border border-[#00F5D4]/30">
                  {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400">
                {t('news_tagline_text')}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Steam Sales Quick Modal Launcher */}
            {onOpenSalesModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenSalesModal();
                }}
                data-cursor="SALES"
                title="Buka Radar Diskon Game Steam & SteamDB"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#FF2A85] hover:bg-[#FFE600] text-white hover:text-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer animate-pulse"
              >
                <span>🏷️</span>
                <span className="hidden sm:inline">STEAM SALES</span>
                <span className="sm:hidden">SALES</span>
              </button>
            )}

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              title={language === 'id' ? 'Perbarui Berita' : 'Refresh News'}
              disabled={isRefreshing}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black font-mono text-[10px] font-bold shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#FFE600]' : ''}`} />
              <span className="hidden md:inline">SYNC</span>
            </button>

            {/* Select All Button */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedOutlet('all');
                setIsExpanded(true);
              }}
              data-cursor="NEWS"
              title={language === 'id' ? 'Tampilkan Berita dari Semua 12 Outlet' : 'Show News from All 12 Outlets'}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
                selectedOutlet === 'all' && isExpanded
                  ? 'bg-[#00F5D4] text-black'
                  : 'bg-[#FFE600] text-black hover:bg-white'
              }`}
            >
              <span>{t('news_all_outlets_btn')}</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>

            {/* Expand / Collapse Button */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded((prev) => !prev);
              }}
              title={isExpanded ? (language === 'id' ? 'Tutup Tampilan Berita' : 'Collapse News') : (language === 'id' ? 'Buka Tampilan Berita' : 'Open News')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#282E40] hover:bg-white text-white hover:text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span className="hidden sm:inline">{language === 'id' ? 'TUTUP' : 'COLLAPSE'}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-[#00F5D4]" />
                  <span className="hidden sm:inline">{language === 'id' ? 'BUKA BERITA' : 'OPEN NEWS'}</span>
                </>
              )}
            </button>

            {/* Fullscreen Modal Option */}
            {onOpenNewsModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenNewsModal(selectedOutlet);
                }}
                title="Buka Popup Layar Penuh"
                className="flex items-center justify-center h-8 w-8 rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. 12 OUTLETS SELECTOR CHIPS GRID                        */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {NEWS_OUTLETS_DATABASE.map((outlet) => {
            const isSelected = selectedOutlet === outlet.id && isExpanded;
            const count = articles.filter((a) => a.outletId === outlet.id).length;

            return (
              <button
                key={outlet.id}
                onClick={() => handleOutletClick(outlet.id)}
                data-cursor={outlet.name}
                title={`Filter berita dari ${outlet.name}`}
                className={`flex items-center justify-between p-2 rounded-lg border-2 transition-all shadow-[2px_2px_0px_#000] text-left cursor-pointer group ${
                  isSelected
                    ? 'bg-white text-black border-black font-black -translate-y-0.5 shadow-[3px_3px_0px_#00F5D4]'
                    : 'bg-[#1E2230] text-white border-black hover:bg-[#282E40] hover:border-white/30 font-mono text-[11px] font-bold'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-xs">{outlet.icon}</span>
                  <span className="truncate">{outlet.name}</span>
                </div>
                <span
                  className={`text-[8px] px-1 py-0.2 rounded font-mono shrink-0 ml-1 ${
                    isSelected ? 'bg-black text-white font-bold' : 'bg-black/50 text-[#00F5D4]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 3. INLINE NEWS POPUP PANEL (DIRECTLY RIGHT HERE)          */}
        {/* ======================================================== */}
        {isExpanded && (
          <div className="space-y-4 pt-3 border-t-2 border-white/10 animate-fade-in">
            
            {/* Outlet Spotlight Banner if specific outlet is chosen */}
            {currentOutletMeta && (
              <div 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] text-white"
                style={{ backgroundColor: '#1A1C26', borderLeftColor: currentOutletMeta.themeColor, borderLeftWidth: '6px' }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{currentOutletMeta.icon}</span>
                    <h3 className="font-['Syne'] font-black text-sm sm:text-base text-white">
                      {currentOutletMeta.name}
                    </h3>
                    <span className="px-1.5 py-0.2 rounded bg-black/60 border border-white/10 font-mono text-[9px] text-[#00F5D4]">
                      {currentOutletMeta.domain}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-zinc-300">
                    {currentOutletMeta.tagline} — {currentOutletMeta.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleOpenLink(e, currentOutletMeta.url)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>SITUS RESMI</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => setSelectedOutlet('all')}
                    className="px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#282E40] text-white hover:bg-white hover:text-black font-mono text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            )}

            {/* Filter Toolbar: Search Bar & Category Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-[#0B0C10] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] min-w-0 max-w-full overflow-hidden">
              
              {/* Search Box */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('news_search_placeholder')}
                  className="w-full pl-8 pr-7 py-1.5 bg-[#14161F] border-2 border-black rounded-lg text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F5D4]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 min-w-0 max-w-full">
                {NEWS_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-2.5 py-1 rounded-md border text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#FFE600] text-black border-black font-bold shadow-[1px_1px_0px_#000]'
                        : 'bg-[#1E2230] text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    <span>{cat.id === 'All' ? (language === 'id' ? 'Semua' : 'All') : cat.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
              <div>
                {t('news_showing')} <strong className="text-[#FFE600]">{filteredArticles.length}</strong> {t('news_articles')}
                {selectedOutlet !== 'all' && (
                  <span> {language === 'id' ? 'dari' : 'from'} <strong className="text-white">{currentOutletMeta?.name}</strong></span>
                )}
              </div>
              <div className="text-[10px] text-zinc-500 hidden sm:inline">
                {language === 'id' ? 'Klik kartu berita untuk membaca selengkapnya di portal asli' : 'Click news card to read full article on original site'}
              </div>
            </div>

            {/* Articles Grid (Scrollable Container) */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[580px] overflow-y-auto custom-scrollbar p-1">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => {
                      sound.playClick();
                      setReadingArticle(article);
                    }}
                    className="group relative flex flex-col justify-between rounded-xl border-3 border-black bg-[#1A1C26] overflow-hidden shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] transition-all duration-200 cursor-pointer text-left"
                  >
                    {/* Article Thumbnail */}
                    <div className="relative h-40 w-full overflow-hidden bg-black/40 border-b-2 border-black">
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

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5">
                        <span 
                          className="flex items-center gap-1 px-2 py-0.5 rounded border border-black font-['Press_Start_2P'] text-[6px] font-bold text-white shadow"
                          style={{ backgroundColor: article.outletThemeColor || '#FF2A85' }}
                        >
                          <span>{article.outletIcon}</span>
                          <span>{article.outletName}</span>
                        </span>

                        {article.isHot && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FFE600] text-black border border-black font-['Press_Start_2P'] text-[6px] font-bold shadow animate-pulse">
                            <Flame className="w-2.5 h-2.5 fill-black" /> HOT
                          </span>
                        )}
                      </div>

                      {/* Bottom Tag */}
                      <div className="absolute bottom-1.5 left-2">
                        <span className="px-1.5 py-0.2 rounded bg-black/80 border border-white/20 font-mono text-[9px] text-[#00F5D4] font-bold">
                          #{article.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#FFE600]" />
                            {article.publishedAt}
                          </span>
                          <span className="text-zinc-500">{article.readTime}</span>
                        </div>

                        <h4 className="font-['Syne'] font-bold text-xs sm:text-sm text-white group-hover:text-[#FFE600] transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h4>

                        <p className="font-mono text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-500 text-[10px] truncate max-w-[150px]">
                          {article.outletDomain}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => handleOpenLink(e, article.url)}
                            title={`Buka situs resmi ${article.outletDomain}`}
                            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <span className="flex items-center gap-1 text-[#00F5D4] group-hover:text-white font-bold transition-colors shrink-0">
                            <span>{language === 'id' ? 'BACA' : 'READ'}</span>
                            <span className="text-[10px]">▸</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="rounded-xl border-2 border-dashed border-white/20 bg-[#1A1C26]/50 p-6 text-center space-y-2">
                <div className="text-3xl">🔍</div>
                <div className="font-['Syne'] font-black text-sm text-white">
                  {language === 'id' ? 'TIDAK ADA BERITA COCOK' : 'NO MATCHING ARTICLES'}
                </div>
                <p className="font-mono text-xs text-zinc-400">
                  {language === 'id' ? `Tidak ada berita untuk kata kunci "${searchQuery}".` : `No articles found for query "${searchQuery}".`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedOutlet('all');
                    setSelectedCategory('All');
                  }}
                  className="px-3 py-1 rounded bg-[#FFE600] text-black font-mono text-xs font-bold cursor-pointer"
                >
                  {t('news_reset_filters')}
                </button>
              </div>
            )}

            {/* Bottom Footer Info Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5 text-[#00F5D4]" />
                <span>{language === 'id' ? 'Berita diambil langsung dari 12 portal resmi video game dunia.' : 'News curated directly from 12 official world video game outlets.'}</span>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsExpanded(false);
                }}
                className="text-xs text-zinc-400 hover:text-[#FFE600] underline font-mono cursor-pointer"
              >
                {language === 'id' ? '▲ Sembunyikan Berita' : '▲ Hide News Feed'}
              </button>
            </div>

          </div>
        )}

      </div>

      {/* In-App Article Reader Modal */}
      <ArticleDetailModal
        isOpen={!!readingArticle}
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
      />
    </section>
  );
};

export default NewsStrip;
