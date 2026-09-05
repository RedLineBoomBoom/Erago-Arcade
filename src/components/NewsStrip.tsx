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
import { GAMING_NEWS_ARTICLES } from '../data/gamingNewsFeed';
import { sound } from '../audio/soundEngine';
import type { NewsCategory } from '../types/news';

interface NewsStripProps {
  onOpenNewsModal?: (outletId?: string) => void;
}

export const NewsStrip: React.FC<NewsStripProps> = ({ onOpenNewsModal }) => {
  // Start expanded by default so the popup news is directly visible right here
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedOutlet, setSelectedOutlet] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    sound.playPowerUp();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      sound.playJackpot();
    }, 500);
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

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return GAMING_NEWS_ARTICLES.filter((article) => {
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
  }, [selectedOutlet, selectedCategory, searchQuery]);

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
                  GAMING & ENTERTAINMENT PRESS WIRE
                </h2>
                <span className="px-1.5 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold border border-black">
                  12 OUTLETS
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold animate-pulse">
                  <Radio className="w-2.5 h-2.5" /> LIVE
                </span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400">
                Pusat sindikasi berita game resmi // Pilih portal atau jelajahi berita langsung di bawah
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              title="Perbarui Berita"
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
              title="Tampilkan Berita dari Semua 12 Outlet"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
                selectedOutlet === 'all' && isExpanded
                  ? 'bg-[#00F5D4] text-black'
                  : 'bg-[#FFE600] text-black hover:bg-white'
              }`}
            >
              <span>SEMUA (12)</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>

            {/* Expand / Collapse Button */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded((prev) => !prev);
              }}
              title={isExpanded ? 'Tutup Tampilan Berita' : 'Buka Tampilan Berita'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#282E40] hover:bg-white text-white hover:text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span className="hidden sm:inline">TUTUP</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-[#00F5D4]" />
                  <span className="hidden sm:inline">BUKA BERITA</span>
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
            const count = GAMING_NEWS_ARTICLES.filter((a) => a.outletId === outlet.id).length;

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-[#0B0C10] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berita langsung di sini..."
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
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
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
                    <span>{cat.id === 'All' ? 'Semua' : cat.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
              <div>
                Menampilkan <strong className="text-[#FFE600]">{filteredArticles.length}</strong> berita
                {selectedOutlet !== 'all' && (
                  <span> dari <strong className="text-white">{currentOutletMeta?.name}</strong></span>
                )}
              </div>
              <div className="text-[10px] text-zinc-500 hidden sm:inline">
                Klik kartu berita untuk membaca selengkapnya di portal asli
              </div>
            </div>

            {/* Articles Grid (Scrollable Container) */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[580px] overflow-y-auto custom-scrollbar p-1">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={(e) => handleOpenLink(e, article.url)}
                    className="group relative flex flex-col justify-between rounded-xl border-3 border-black bg-[#1A1C26] overflow-hidden shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] transition-all duration-200 cursor-pointer text-left"
                  >
                    {/* Article Thumbnail */}
                    <div className="relative h-40 w-full overflow-hidden bg-black/40 border-b-2 border-black">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80';
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
                        <span className="flex items-center gap-1 text-[#00F5D4] group-hover:text-white font-bold transition-colors shrink-0">
                          <span>BACA</span>
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
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
                  TIDAK ADA BERITA COCOK
                </div>
                <p className="font-mono text-xs text-zinc-400">
                  Tidak ada berita untuk kata kunci &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedOutlet('all');
                    setSelectedCategory('All');
                  }}
                  className="px-3 py-1 rounded bg-[#FFE600] text-black font-mono text-xs font-bold cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Bottom Footer Info Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5 text-[#00F5D4]" />
                <span>Berita diambil langsung dari 12 portal resmi video game dunia.</span>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsExpanded(false);
                }}
                className="text-xs text-zinc-400 hover:text-[#FFE600] underline font-mono cursor-pointer"
              >
                ▲ Sembunyikan Berita
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default NewsStrip;
