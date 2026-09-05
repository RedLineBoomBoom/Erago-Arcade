import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  Search, 
  RefreshCw, 
  Flame, 
  Star, 
  Sparkles,
  DollarSign,
  Tag,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { steamSalesService } from '../utils/steamSalesService';
import type { SteamSaleItem, DiscountTierFilter, SalesSortOption, CurrencyMode } from '../types/steamSales';
import { useLanguage } from '../utils/i18n';

interface SteamSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IDR_EXCHANGE_RATE = 16300; // 1 USD ~ Rp 16.300

export const SteamSalesModal: React.FC<SteamSalesModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  // Subscribe to live sales updates and auto-refresh when opening modal
  useEffect(() => {
    const unsub = steamSalesService.subscribe((freshSales, updatedTime) => {
      setSales(freshSales);
      setLastUpdated(updatedTime);
    });

    if (isOpen) {
      steamSalesService.refreshSales(false);
    }

    return unsub;
  }, [isOpen]);

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

  // Filter and sort items
  const filteredSales = useMemo(() => {
    let list = sales.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || item.title.toLowerCase().includes(q) || (item.category && item.category.toLowerCase().includes(q));
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div 
        className="relative flex flex-col w-full max-w-3xl max-h-[82vh] rounded-2xl border-3 border-black bg-[#0C0E17] shadow-[8px_8px_0px_#00F5D4] overflow-hidden text-[#FFFDF0] my-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Steam Sales & SteamDB Tracker Modal"
      >
        {/* Retro Header Topbar */}
        <header className="relative flex flex-col gap-2 border-b-2 border-black bg-[#131622] p-2.5 sm:p-3 shrink-0">
          <div className="flex items-center justify-between gap-2.5">
            {/* Title & Live Badge */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border-2 border-black bg-[#00F5D4] text-black shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                <Tag className="h-4 w-4 fill-current" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-[#FFE600] truncate">
                    {t('sales_modal_title')}
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded bg-[#FF2A85] px-1 py-0.5 font-['Press_Start_2P'] text-[5.5px] font-bold text-white uppercase border border-black animate-pulse">
                    <span className="h-1 w-1 rounded-full bg-white"></span>
                    {t('sales_live_badge')}
                  </span>
                </div>
                <p className="font-mono text-[8px] sm:text-[9px] text-zinc-400 truncate">
                  {t('sales_modal_subtitle')}
                </p>
              </div>
            </div>

            {/* Quick Actions: Currency Toggle, SteamDB Link, Refresh, Close */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Currency Mode Switcher */}
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrencyMode(currencyMode === 'USD' ? 'IDR' : 'USD');
                }}
                title={currencyMode === 'USD' ? 'Ganti ke Rupiah [IDR]' : 'Ganti ke Dollar [USD]'}
                className="flex items-center gap-1 rounded border-2 border-black bg-[#1C2030] hover:bg-[#FFE600] hover:text-black px-1.5 py-0.5 font-['Press_Start_2P'] text-[6.5px] sm:text-[7px] font-bold transition-all shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
              >
                <DollarSign className="w-2.5 h-2.5" />
                <span>{currencyMode}</span>
              </button>

              {/* Direct SteamDB Link */}
              <button
                onClick={() => handleOpenLink('https://steamdb.info/sales/')}
                title="Buka Website Resmi SteamDB Sales"
                className="hidden md:flex items-center gap-1 rounded border-2 border-black bg-[#1C2030] hover:bg-[#00F5D4] hover:text-black px-2 py-0.5 font-['Press_Start_2P'] text-[6.5px] font-bold transition-all shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
              >
                <span>steamdb</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                title="Segarkan diskon game secara real-time"
                className={`flex items-center gap-1 rounded border-2 border-black bg-[#1C2030] hover:bg-[#FF2A85] text-white px-1.5 sm:px-2 py-0.5 font-['Press_Start_2P'] text-[6.5px] sm:text-[7px] transition-all shadow-[1.5px_1.5px_0px_#000] cursor-pointer ${
                  isRefreshing ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{t('sales_refresh_btn')}</span>
              </button>

              {/* Close Modal Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded border-2 border-black bg-[#FF2A85] text-white font-bold hover:bg-white hover:text-black transition-colors shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                aria-label="Close Sales Modal"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Refresh Notification Toast if active */}
          {refreshNotice && (
            <div className="flex items-center gap-2 rounded border border-[#00F5D4] bg-[#00F5D4]/15 px-2.5 py-1 text-xs text-[#00F5D4] animate-fade-in font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{refreshNotice}</span>
            </div>
          )}

          {/* Filter & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1 border-t border-white/10">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('sales_search_placeholder')}
                className="w-full rounded border-2 border-black bg-[#1A1D2B] py-1 pl-7 pr-3 font-mono text-[11px] text-white placeholder-zinc-500 focus:border-[#00F5D4] focus:outline-none shadow-[1.5px_1.5px_0px_#000]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <div className="flex items-center gap-1 font-['Press_Start_2P'] text-[6.5px] text-zinc-400">
                <SlidersHorizontal className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">SORT:</span>
              </div>
              <select
                value={sortOption}
                onChange={(e) => {
                  sound.playClick();
                  setSortOption(e.target.value as SalesSortOption);
                }}
                className="rounded border-2 border-black bg-[#1A1D2B] px-1.5 py-1 font-['Press_Start_2P'] text-[6.5px] text-[#00F5D4] focus:border-[#00F5D4] focus:outline-none shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
              >
                <option value="discount">{t('sales_sort_discount')}</option>
                <option value="rating">{t('sales_sort_rating')}</option>
                <option value="priceAsc">{t('sales_sort_price_asc')}</option>
                <option value="dealRating">{t('sales_sort_deal')}</option>
                <option value="title">{t('sales_sort_title')}</option>
              </select>
            </div>
          </div>

          {/* Discount Tier Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
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
                  className={`flex items-center gap-1.5 rounded-sm border border-black px-1.5 py-0.5 font-['Press_Start_2P'] text-[6px] whitespace-nowrap transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                    isActive
                      ? 'bg-[#FFE600] text-black font-bold -translate-y-0.5'
                      : 'bg-[#1A1D2B] text-zinc-400 hover:text-white hover:bg-[#252A3D]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`px-1 py-0.2 rounded text-[5.5px] ${isActive ? 'bg-black text-white' : 'bg-white/10 text-zinc-300'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Content Body: Game Sales Cards Grid */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 custom-scrollbar bg-[#090B12]">
          {filteredSales.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#1A1D2B] text-2xl mb-3 shadow-[2px_2px_0px_#000]">
                👾
              </div>
              <h3 className="font-['Press_Start_2P'] text-[10px] text-[#FFE600] mb-1.5">
                {t('sales_empty_title')}
              </h3>
              <p className="font-mono text-xs text-zinc-400 max-w-sm mb-3">
                {t('sales_empty_desc')}
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                  setDiscountTier('all');
                }}
                className="rounded border-2 border-black bg-[#00F5D4] text-black px-3 py-1.5 font-['Press_Start_2P'] text-[7px] font-bold hover:bg-white transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                {t('sales_empty_reset')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {filteredSales.map((item) => {
                const isSuperDeal = item.discountPercent >= 85 || (item.dealRating && item.dealRating >= 9.0);
                const hasHighRating = (item.steamRatingPercent || 0) >= 85;

                return (
                  <article
                    key={item.id || item.appId}
                    className="group relative flex flex-col justify-between rounded-lg border-2 border-black bg-[#141622] hover:bg-[#181B2A] transition-all duration-200 overflow-hidden shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#00F5D4] hover:-translate-y-0.5"
                  >
                    {/* Game Artwork Banner */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/80 border-b-2 border-black">
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

                      {/* Discount Neon Badge (Top-Left) */}
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded border border-black bg-[#FFE600] px-1.5 py-0.5 font-['Press_Start_2P'] text-[8px] font-black text-black shadow-[1px_1px_0px_#000]">
                        <span>-{item.discountPercent}%</span>
                      </div>

                      {/* Super Deal / Top Rated Highlight (Top-Right) */}
                      {isSuperDeal ? (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 rounded border border-black bg-[#FF2A85] px-1 py-0.5 font-['Press_Start_2P'] text-[5.5px] font-bold text-white shadow-[1px_1px_0px_#000] animate-pulse">
                          <Flame className="w-2 h-2 fill-current" />
                          <span>DEAL</span>
                        </div>
                      ) : hasHighRating ? (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 rounded border border-black bg-[#00F5D4] px-1 py-0.5 font-['Press_Start_2P'] text-[5.5px] font-bold text-black shadow-[1px_1px_0px_#000]">
                          <Sparkles className="w-2 h-2 fill-current" />
                          <span>90%+</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Card Content Information */}
                    <div className="flex flex-col flex-1 p-2.5 gap-1.5">
                      {/* Title */}
                      <h3 
                        className="font-['Space_Grotesk'] font-bold text-xs text-white line-clamp-1 group-hover:text-[#00F5D4] transition-colors"
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      {/* Rating & Review Counter Row */}
                      <div className="flex items-center justify-between gap-1 font-mono text-[9px] text-zinc-400">
                        {item.steamRatingPercent !== undefined ? (
                          <div className="flex items-center gap-1 text-[#00F5D4]">
                            <Star className="w-2.5 h-2.5 fill-current text-[#FFE600]" />
                            <span className="font-bold">{item.steamRatingPercent}%</span>
                            <span className="text-zinc-500 text-[8.5px] truncate max-w-[80px]">
                              {item.steamRatingText || 'Positive'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-500 text-[8.5px]">Steam Official</span>
                        )}

                        <span className="text-[7.5px] font-['Press_Start_2P'] text-zinc-500">
                          #{item.appId}
                        </span>
                      </div>

                      {/* Price Strip */}
                      <div className="mt-auto pt-1.5 border-t border-white/10 flex items-baseline justify-between gap-1">
                        {/* Strikethrough Normal Price */}
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] text-zinc-500 line-through">
                            {formatPrice(item.normalPrice)}
                          </span>
                          <span className="font-mono text-[8px] text-[#00F5D4]/80">
                            {t('sales_tier_all') === 'Semua Diskon' ? 'Hemat' : 'Save'} {formatPrice(item.normalPrice - item.salePrice)}
                          </span>
                        </div>

                        {/* Glow Sale Price */}
                        <div className="font-['Space_Grotesk'] font-black text-sm text-[#00F5D4] tracking-tight">
                          {formatPrice(item.salePrice)}
                        </div>
                      </div>
                    </div>

                    {/* Action Links Buttons Footer */}
                    <div className="grid grid-cols-2 gap-1 p-1.5 bg-[#0E101A] border-t border-black">
                      <button
                        onClick={() => handleOpenLink(item.steamUrl)}
                        className="flex items-center justify-center gap-1 rounded border border-black bg-[#1F2438] hover:bg-[#00F5D4] hover:text-black py-1 px-1 font-['Press_Start_2P'] text-[5.5px] text-zinc-300 font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer"
                        title={`Buka ${item.title} di Toko Steam`}
                      >
                        <span>{t('sales_store_btn')}</span>
                        <ExternalLink className="w-2 h-2" />
                      </button>

                      <button
                        onClick={() => handleOpenLink(item.steamDbUrl)}
                        className="flex items-center justify-center gap-1 rounded border border-black bg-[#1F2438] hover:bg-[#FFE600] hover:text-black py-1 px-1 font-['Press_Start_2P'] text-[5.5px] text-zinc-300 font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer"
                        title={`Buka ${item.title} di SteamDB`}
                      >
                        <span>{t('sales_steamdb_btn')}</span>
                        <ExternalLink className="w-2 h-2" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Strip */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t-2 border-black bg-[#131622] px-3 py-2 text-[9px] text-zinc-400 font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#00F5D4] animate-pulse"></span>
            <span>
              {t('sales_deals_found', { count: filteredSales.length })}
            </span>
            <span className="hidden md:inline text-zinc-500">
              • {currencyMode === 'IDR' ? t('sales_approx_idr') : 'Prices in USD'}
            </span>
            <span className="hidden lg:inline text-zinc-500">
              • {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenLink('https://steamdb.info/sales/')}
              className="flex items-center gap-1 text-[7px] font-['Press_Start_2P'] text-[#FFE600] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              <span>{t('sales_browse_steamdb_hub')}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
