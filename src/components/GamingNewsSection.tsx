import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Radio, 
  Globe, 
  SlidersHorizontal,
  BookmarkCheck,
  ChevronRight
} from 'lucide-react';
import { NEWS_OUTLETS_DATABASE, NEWS_CATEGORIES } from '../data/newsOutletsData';
import type { NewsCategory } from '../types/news';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';

interface GamingNewsSectionProps {
  onBackToArcade: () => void;
}

export const GamingNewsSection: React.FC<GamingNewsSectionProps> = ({ onBackToArcade }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');

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

  const handleOpenOutlet = (url: string) => {
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      {/* Header Banner: Cyber-Press Desk */}
      <div className="relative overflow-hidden rounded-2xl border-4 border-black bg-gradient-to-r from-[#14161F] via-[#1A1C26] to-[#14161F] p-6 sm:p-8 shadow-[8px_8px_0px_#00F5D4] text-white">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00F5D4] via-[#FFE600] to-[#FF2A85]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                <Radio className="w-3 h-3 animate-pulse" /> LIVE WIRE
              </span>
              <span className="px-2.5 py-1 rounded bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                12 VERIFIED OUTLETS
              </span>
              <span className="font-mono text-xs text-[#00F5D4] hidden sm:inline">
                // UPDATED HOURLY // GLOBAL COVERAGE
              </span>
            </div>

            <h1 className="font-['Syne'] font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              ERAGO GAMING & ENTERTAINMENT NEWS
            </h1>

            <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {language === 'id'
                ? 'Pusat sindikasi berita video game dan industri hiburan dunia. Akses langsung portal berita resmi untuk ulasan terpercaya, bocoran rilis, investigasi hardware, dan liputan budaya pop.'
                : 'Global video game and entertainment news syndication hub. Direct access to official news portals for trusted reviews, release leaks, hardware investigations, and pop culture coverage.'}
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="flex sm:flex-col justify-around sm:justify-center gap-3 p-4 rounded-xl border-3 border-black bg-[#0B0C10] shadow-[4px_4px_0px_#000] shrink-0 text-center">
            <div>
              <div className="font-['Press_Start_2P'] text-xl sm:text-2xl text-[#FFE600]">12</div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase mt-1">
                {language === 'id' ? 'Media Global' : 'Global Outlets'}
              </div>
            </div>
            <div className="border-l sm:border-l-0 sm:border-t border-white/10 sm:pt-2 pl-3 sm:pl-0">
              <div className="font-['Press_Start_2P'] text-xl sm:text-2xl text-[#00F5D4]">100%</div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase mt-1">
                {language === 'id' ? 'Tautan Resmi' : 'Official Links'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Press Marquee Ticker */}
      <div className="overflow-hidden rounded-lg border-2 border-black bg-[#FFE600] text-black py-2 font-['Press_Start_2P'] text-[9px] font-bold shadow-[3px_3px_0px_#000]">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-6 inline-flex items-center gap-2">✦ PC GAMER: HARDWARE & PC GAMING SCOOPS</span>
          <span className="mx-6 inline-flex items-center gap-2">★ GAMESPOT: IN-DEPTH REVIEWS & TRAILERS</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ IGN SOUTHEAST ASIA: REGIONAL GAMING & POP CULTURE</span>
          <span className="mx-6 inline-flex items-center gap-2">★ BLOOMBERG GAMING: FINANCIAL INTEL & INDUSTRY MERGERS</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ VGC: BREAKING STUDIO SCOOPS & NEXT-GEN LEAKS</span>
          <span className="mx-6 inline-flex items-center gap-2">★ POLYGON: GAMING ESSAYS & ENTERTAINMENT CULTURE</span>
          <span className="mx-6 inline-flex items-center gap-2">✦ THE VERGE: CLOUD GAMING & TECH HARDWARE</span>
        </div>
      </div>

      {/* Search Bar & Category Strip */}
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
                  ? 'Cari media, topik, atau kata kunci (contoh: PC Gamer, Hardware, IGN, Steam, Bloomberg)...'
                  : 'Search outlets, topics, or keywords (e.g. PC Gamer, Hardware, IGN, Steam, Bloomberg)...'
              }
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-black bg-[#14161F] text-white font-mono text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#00F5D4] focus:bg-[#1A1C26] transition-all shadow-[3px_3px_0px_#000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Result Counter */}
          <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-mono text-zinc-400">
            <SlidersHorizontal className="w-4 h-4 text-[#FFE600]" />
            <span>
              {language === 'id'
                ? `Menampilkan: ${filteredOutlets.length} dari ${NEWS_OUTLETS_DATABASE.length} Media`
                : `Showing: ${filteredOutlets.length} of ${NEWS_OUTLETS_DATABASE.length} Outlets`}
            </span>
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-black font-['Press_Start_2P'] text-[8px] transition-all ${
                  active
                    ? 'bg-[#00F5D4] text-black font-bold shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-[#14161F] text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Outlets Grid */}
      {filteredOutlets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOutlets.map((outlet) => {
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
                    {outlet.description}
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

                {/* Bottom Action Button */}
                <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="font-mono text-[9px] text-zinc-500 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F566] animate-ping" />
                    <span>Official Portal</span>
                  </div>

                  <button
                    onClick={() => handleOpenOutlet(outlet.url)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[8px] font-bold text-black shadow-[3px_3px_0px_#000] hover:bg-white hover:text-black hover:translate-x-0.5 transition-all"
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
          <div className="text-5xl animate-bounce">🔍</div>
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
            className="px-5 py-2.5 rounded-lg border-2 border-black bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000]"
          >
            {language === 'id' ? 'RESET SEMUA FILTER' : 'RESET ALL FILTERS'}
          </button>
        </div>
      )}

      {/* Bottom Dispatch Footer Notice */}
      <div className="rounded-2xl border-3 border-black bg-[#0B0C10] p-6 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFE600] text-black border-2 border-black text-2xl">
            📰
          </div>
          <div>
            <div className="font-['Syne'] font-black text-base text-white">
              {language === 'id'
                ? 'BACA BERITA TERBARU TANPA MENUTUP ERAGO ARCADE'
                : 'READ LATEST NEWS WITHOUT CLOSING ERAGO ARCADE'}
            </div>
            <p className="font-mono text-xs text-zinc-400">
              {language === 'id'
                ? 'Setiap tautan outlet akan dibuka di tab baru, sehingga sesi koin dan progress trivia Anda tetap terjaga 100%.'
                : 'Each outlet link will open in a new tab, keeping your coin balance and trivia progress 100% preserved.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onBackToArcade();
          }}
          className="px-5 py-3 rounded-lg border-2 border-black bg-[#FF2A85] text-black font-['Press_Start_2P'] text-[9px] font-bold shadow-[3px_3px_0px_#000] hover:bg-white transition-colors shrink-0"
        >
          {language === 'id' ? 'KEMBALI KE ROULETTE ➔' : 'BACK TO ROULETTE ➔'}
        </button>
      </div>
    </div>
  );
};

export default GamingNewsSection;
