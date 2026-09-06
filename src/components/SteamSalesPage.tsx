import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft,
  Search, 
  RefreshCw, 
  Flame, 
  Star, 
  Sparkles,
  DollarSign,
  Tag,
  ExternalLink,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { steamSalesService } from '../utils/steamSalesService';
import type { SteamSaleItem, DiscountTierFilter, SalesSortOption, CurrencyMode } from '../types/steamSales';
import { useLanguage } from '../utils/i18n';

interface SteamSalesPageProps {
  onBackToArcade: () => void;
}

const IDR_EXCHANGE_RATE = 16300; // 1 USD ~ Rp 16.300

export const SteamSalesPage: React.FC<SteamSalesPageProps> = ({ onBackToArcade }) => {
  const { t, language } = useLanguage();
  const [sales, setSales] = useState<SteamSaleItem[]>(() => steamSalesService.getSales());
  const [lastUpdated, setLastUpdated] = useState<number>(() => steamSalesService.getLastUpdated());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);

  // Filters and controls
  const [searchQuery, setSearchQuery] = useState('');
  const [discountTier, setDiscountTier] = useState<DiscountTierFilter>('all');
  const [sortOption, setSortOption] = useState<SalesSortOption>('discount');
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>(() => {
    return language === 'id' ? 'IDR' : 'USD';
  });

  // Keep currency aligned if user toggles website language
  useEffect(() => {
    setCurrencyMode(language === 'id' ? 'IDR' : 'USD');
  }, [language]);

  // Subscribe to live sales updates and refresh on mount
  useEffect(() => {
    const unsub = steamSalesService.subscribe((freshSales, updatedTime) => {
      setSales(freshSales);
      setLastUpdated(updatedTime);
    });

    steamSalesService.refreshSales(false);
    return unsub;
  }, []);

  // Real-time manual refresh
  const handleRefresh = async () => {
    sound.playPowerUp();
    setIsRefreshing(true);
    setRefreshNotice(null);
    try {
      const result = await steamSalesService.refreshSales(true);
      setSales(result.sales);
      setLastUpdated(Date.now());
      sound.playJackpot();
      setRefreshNotice(t('sales_refresh_success'));
      setTimeout(() => setRefreshNotice(null), 4500);
    } catch (err) {
      console.error('Failed to refresh Steam sales:', err);
      sound.playCrtBuzz();
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatPrice = (usdAmount: number) => {
    if (currencyMode === 'IDR') {
      const idr = Math.round(usdAmount * IDR_EXCHANGE_RATE);
      return `Rp ${idr.toLocaleString('id-ID')}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  // Pre-calculate tier counts
  const tierCounts = useMemo(() => {
    return {
      all: sales.length,
      '75plus': sales.filter((s) => s.discountPercent >= 75).length,
      '50plus': sales.filter((s) => s.discountPercent >= 50 && s.discountPercent < 75).length,
      under5: sales.filter((s) => s.salePrice <= 5).length,
      under10: sales.filter((s) => s.salePrice > 5 && s.salePrice <= 10).length,
      topRated: sales.filter((s) => (s.steamRatingPercent || 0) >= 90).length,
    };
  }, [sales]);

  // Max discount available
  const maxDiscount = useMemo(() => {
    return sales.reduce((max, item) => Math.max(max, item.discountPercent), 0);
  }, [sales]);

  // Filter and sort items
  const filteredSales = useMemo(() => {
    let list = sales.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        item.title.toLowerCase().includes(q) || 
        (item.category && item.category.toLowerCase().includes(q));
      if (!matchesSearch) return false;

      // Tier filter
      if (discountTier === '75plus') return item.discountPercent >= 75;
      if (discountTier === '50plus') return item.discountPercent >= 50 && item.discountPercent < 75;
      if (discountTier === 'under5') return item.salePrice <= 5;
      if (discountTier === 'under10') return item.salePrice > 5 && item.salePrice <= 10;
      if (discountTier === 'topRated') return (item.steamRatingPercent || 0) >= 90;

      return true;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortOption === 'discount') {
        return b.discountPercent - a.discountPercent;
      }
      if (sortOption === 'rating') {
        return (b.steamRatingPercent || 0) - (a.steamRatingPercent || 0);
      }
      if (sortOption === 'priceAsc') {
        return a.salePrice - b.salePrice;
      }
      if (sortOption === 'dealRating') {
        return (b.dealRating || 0) - (a.dealRating || 0);
      }
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  }, [sales, searchQuery, discountTier, sortOption]);

  const handleOpenLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 space-y-6 sm:space-y-8 animate-fade-in text-white">
      {/* Top Navigation & Back Button */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onBackToArcade();
          }}
          className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] text-zinc-300 hover:text-black px-3 sm:px-4 py-2 font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>{language === 'id' ? 'KEMBALI KE ARCADE' : 'BACK TO ARCADE'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setCurrencyMode((prev) => (prev === 'USD' ? 'IDR' : 'USD'));
            }}
            title={currencyMode === 'USD' ? 'Ganti ke Rupiah [IDR]' : 'Switch to USD [$]'}
            className="flex items-center gap-1 rounded-xl border-2 border-black bg-[#1C2030] hover:bg-[#FFE600] hover:text-black px-2.5 sm:px-3 py-2 font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
          >
            <DollarSign className="w-3 h-3" />
            <span>{currencyMode}</span>
          </button>

          {/* Sync Refresh */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Sinkronkan Diskon Steam Terbaru"
            className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#1E2230] hover:bg-[#00F5D4] text-white hover:text-black px-2.5 sm:px-3 py-2 font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#FFE600]' : ''}`} />
            <span className="hidden sm:inline">SYNC</span>
          </button>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border-4 border-black bg-gradient-to-r from-[#14161F] via-[#1A1C26] to-[#14161F] p-4 sm:p-8 shadow-[6px_6px_0px_#FFE600] sm:shadow-[8px_8px_0px_#FFE600]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFE600] via-[#00F5D4] to-[#FF2A85]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFE600] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                <Tag className="w-3 h-3 fill-current" /> RADAR DISKON STEAM
              </span>
              <span className="px-2.5 py-1 rounded bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold border border-black shadow-[2px_2px_0px_#000]">
                DISKON S/D -{maxDiscount}%
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold border border-black animate-pulse">
                <Flame className="w-3 h-3 fill-current" /> LIVE RADAR
              </span>
              <span className="hidden sm:inline-flex font-mono text-xs text-[#FFE600]">
                // UPDATED: {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h1 className="font-['Syne'] font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {language === 'id' ? 'STEAMDB LIVE SALES VAULT' : 'STEAMDB LIVE SALES VAULT'}
            </h1>

            <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {language === 'id'
                ? 'Pusat radar diskon game Steam real-time terhubung langsung ke basis data SteamDB & toko resmi Steam. Telusuri ratusan promo terbaik, game legendaris dengan diskon hingga 95%, dan pantau rating ulasan komunitas secara transparan.'
                : 'Real-time Steam game discount radar synced directly with SteamDB database & official Steam store. Browse hundreds of the best deals, legendary titles with up to 95% off, and review community sentiment transparently.'}
            </p>

            {refreshNotice && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00F5D4]/20 border border-[#00F5D4] text-[#00F5D4] font-mono text-xs animate-fade-in">
                <span>✓</span>
                <span>{refreshNotice}</span>
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border-3 border-black bg-[#0B0C10] shadow-[4px_4px_0px_#000] shrink-0 text-center">
            <div className="p-2 sm:p-2.5 bg-[#141622] rounded-lg border border-white/10">
              <div className="font-['Press_Start_2P'] text-[12px] sm:text-sm text-[#00F5D4]">{sales.length}+</div>
              <div className="font-mono text-[9px] text-zinc-400 mt-0.5">{language === 'id' ? 'Game Aktif' : 'Active Deals'}</div>
            </div>
            <div className="p-2 sm:p-2.5 bg-[#141622] rounded-lg border border-white/10">
              <div className="font-['Press_Start_2P'] text-[12px] sm:text-sm text-[#FF2A85]">-{maxDiscount}%</div>
              <div className="font-mono text-[9px] text-zinc-400 mt-0.5">{language === 'id' ? 'Diskon Max' : 'Max Discount'}</div>
            </div>
            <div className="p-2 sm:p-2.5 bg-[#141622] rounded-lg border border-white/10">
              <div className="font-['Press_Start_2P'] text-[12px] sm:text-sm text-[#FFE600]">{tierCounts.under5}</div>
              <div className="font-mono text-[9px] text-zinc-400 mt-0.5">{language === 'id' ? '< Rp 80rb' : 'Under $5'}</div>
            </div>
            <div className="p-2 sm:p-2.5 bg-[#141622] rounded-lg border border-white/10">
              <div className="font-['Press_Start_2P'] text-[12px] sm:text-sm text-[#00F5D4]">{tierCounts.topRated}</div>
              <div className="font-mono text-[9px] text-zinc-400 mt-0.5">{language === 'id' ? 'Rating 90%+' : 'Top Rated'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter, Search & Controls Section */}
      <div className="rounded-2xl border-4 border-black bg-[#14161F] p-4 sm:p-5 shadow-[6px_6px_0px_#000] space-y-4">
        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('sales_search_placeholder')}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-black bg-[#0C0E17] text-white placeholder-zinc-500 font-mono text-xs sm:text-sm focus:border-[#00F5D4] focus:outline-none transition-colors shadow-[2px_2px_0px_#000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & External Link */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-black bg-[#0C0E17] shadow-[2px_2px_0px_#000]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span className="font-['Press_Start_2P'] text-[7px] text-zinc-400 hidden sm:inline">SORT:</span>
              <select
                value={sortOption}
                onChange={(e) => {
                  sound.playClick();
                  setSortOption(e.target.value as SalesSortOption);
                }}
                className="bg-transparent font-['Press_Start_2P'] text-[7px] text-[#00F5D4] focus:outline-none cursor-pointer"
              >
                <option value="discount">{t('sales_sort_discount')}</option>
                <option value="rating">{t('sales_sort_rating')}</option>
                <option value="priceAsc">{t('sales_sort_price_asc')}</option>
                <option value="dealRating">{t('sales_sort_deal')}</option>
                <option value="title">{t('sales_sort_title')}</option>
              </select>
            </div>

            <button
              onClick={(e) => handleOpenLink(e, 'https://steamdb.info/sales/')}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-black bg-[#1A1D2B] hover:bg-[#FFE600] text-zinc-300 hover:text-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer shrink-0"
            >
              <span>STEAMDB</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Discount Tier Filter Chips */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 flex-nowrap sm:flex-wrap">
          {[
            { key: 'all', label: t('sales_tier_all'), count: tierCounts.all, icon: '🏷️' },
            { key: '75plus', label: t('sales_tier_75plus'), count: tierCounts['75plus'], icon: '💥' },
            { key: '50plus', label: t('sales_tier_50plus'), count: tierCounts['50plus'], icon: '🔥' },
            { key: 'under5', label: t('sales_tier_under5'), count: tierCounts.under5, icon: '🪙' },
            { key: 'under10', label: t('sales_tier_under10'), count: tierCounts.under10, icon: '💎' },
            { key: 'topRated', label: t('sales_tier_top_rated'), count: tierCounts.topRated, icon: '⭐' },
          ].map((tab) => {
            const isActive = discountTier === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  sound.playClick();
                  setDiscountTier(tab.key as DiscountTierFilter);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[6.5px] sm:text-[7.5px] font-bold transition-all shadow-[2px_2px_0px_#000] cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#FFE600] text-black -translate-y-0.5 shadow-[3px_3px_0px_#000]'
                    : 'bg-[#1C2030] text-zinc-300 hover:bg-[#00F5D4] hover:text-black'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[6px] ${isActive ? 'bg-black text-white' : 'bg-white/10 text-zinc-300'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
            <span>
              {language === 'id'
                ? `Menampilkan ${filteredSales.length} dari total ${sales.length} game diskon`
                : `Showing ${filteredSales.length} of ${sales.length} total discounted games`}
            </span>
          </div>

          {(searchQuery || discountTier !== 'all') && (
            <button
              onClick={() => {
                sound.playClick();
                setSearchQuery('');
                setDiscountTier('all');
              }}
              className="text-[#FFE600] hover:underline font-mono text-[10px] cursor-pointer"
            >
              {language === 'id' ? 'Reset Semua Filter' : 'Reset All Filters'}
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredSales.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-4 border-black bg-[#14161F] p-8 shadow-[6px_6px_0px_#000]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-3 border-black bg-[#1E2230] text-3xl mb-4 shadow-[4px_4px_0px_#000]">
            👾
          </div>
          <h3 className="font-['Press_Start_2P'] text-sm text-[#FFE600] mb-2">
            {t('sales_empty_title')}
          </h3>
          <p className="font-mono text-sm text-zinc-400 max-w-md mb-5">
            {t('sales_empty_desc')}
          </p>
          <button
            onClick={() => {
              sound.playClick();
              setSearchQuery('');
              setDiscountTier('all');
            }}
            className="rounded-xl border-2 border-black bg-[#00F5D4] text-black px-4 py-2 font-['Press_Start_2P'] text-[8px] font-bold hover:bg-white transition-all shadow-[3px_3px_0px_#000] cursor-pointer"
          >
            {t('sales_empty_reset')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredSales.map((item) => {
            const isSuperDeal = item.discountPercent >= 85 || (item.dealRating && item.dealRating >= 9.0);
            const hasHighRating = (item.steamRatingPercent || 0) >= 85;
            const savingsAmount = item.normalPrice - item.salePrice;

            return (
              <article
                key={item.id || item.appId}
                className="group relative flex flex-col justify-between rounded-xl border-3 border-black bg-[#141622] hover:bg-[#1A1D2B] transition-all duration-200 overflow-hidden shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#00F5D4] hover:-translate-y-1"
              >
                {/* Game Artwork Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border-b-2 border-black">
                  <img
                    src={item.bannerUrl}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('capsule_231x87')) {
                        target.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${item.appId}/capsule_231x87.jpg`;
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-0.5 rounded border-2 border-black bg-[#FFE600] px-1.5 py-0.5 font-['Press_Start_2P'] text-[8px] font-black text-black shadow-[2px_2px_0px_#000]">
                    <span>-{item.discountPercent}%</span>
                  </div>

                  {/* Super Deal / Top Rated Highlight */}
                  {isSuperDeal ? (
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded border-2 border-black bg-[#FF2A85] px-1.5 py-0.5 font-['Press_Start_2P'] text-[6px] font-bold text-white shadow-[2px_2px_0px_#000] animate-pulse">
                      <Flame className="w-2.5 h-2.5 fill-current" />
                      <span>HOT</span>
                    </div>
                  ) : hasHighRating ? (
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded border-2 border-black bg-[#00F5D4] px-1.5 py-0.5 font-['Press_Start_2P'] text-[6px] font-bold text-black shadow-[2px_2px_0px_#000]">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                      <span>90%+</span>
                    </div>
                  ) : null}
                </div>

                {/* Card Info */}
                <div className="flex flex-col flex-1 p-3 gap-2">
                  {/* Title */}
                  <h3 
                    className="font-['Space_Grotesk'] font-bold text-sm text-white line-clamp-1 group-hover:text-[#00F5D4] transition-colors"
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  {/* Rating & Review Counter Row */}
                  <div className="flex items-center justify-between gap-1 font-mono text-[10px] text-zinc-400">
                    {item.steamRatingPercent !== undefined ? (
                      <div className="flex items-center gap-1 text-[#00F5D4]">
                        <Star className="w-3 h-3 fill-current text-[#FFE600]" />
                        <span className="font-bold">{item.steamRatingPercent}%</span>
                        <span className="text-zinc-500 text-[9px] truncate max-w-[90px]">
                          {item.steamRatingText || 'Positive'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-500 text-[9px]">Steam Official</span>
                    )}

                    <span className="text-[8px] font-['Press_Start_2P'] text-zinc-500">
                      #{item.appId}
                    </span>
                  </div>

                  {/* Price Strip */}
                  <div className="mt-auto pt-2 border-t border-white/10 flex items-baseline justify-between gap-1">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-zinc-500 line-through">
                        {formatPrice(item.normalPrice)}
                      </span>
                      {savingsAmount > 0 && (
                        <span className="font-mono text-[8.5px] text-[#FF2A85]">
                          {language === 'id' ? 'Hemat' : 'Save'} {formatPrice(savingsAmount)}
                        </span>
                      )}
                    </div>
                    <span className="font-['Space_Grotesk'] font-black text-sm text-[#00F5D4]">
                      {formatPrice(item.salePrice)}
                    </span>
                  </div>
                </div>

                {/* Direct Links Action */}
                <div className="grid grid-cols-2 gap-1.5 p-2 bg-[#0C0E17] border-t-2 border-black">
                  <button
                    onClick={(e) => handleOpenLink(e, item.steamUrl)}
                    className="flex items-center justify-center gap-1 rounded border-2 border-black bg-[#1E2230] hover:bg-[#00F5D4] hover:text-black py-1.5 font-['Press_Start_2P'] text-[6.5px] text-zinc-300 font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer"
                    title={`Buka ${item.title} di Toko Steam`}
                  >
                    <span>STORE</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>

                  <button
                    onClick={(e) => handleOpenLink(e, item.steamDbUrl)}
                    className="flex items-center justify-center gap-1 rounded border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black py-1.5 font-['Press_Start_2P'] text-[6.5px] text-zinc-300 font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer"
                    title={`Buka ${item.title} di basis data SteamDB`}
                  >
                    <span>STEAMDB</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SteamSalesPage;
