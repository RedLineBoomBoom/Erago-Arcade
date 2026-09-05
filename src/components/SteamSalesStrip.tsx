import React, { useState, useMemo, useEffect } from 'react';
import { 
  Tag, 
  ExternalLink, 
  Flame, 
  Star, 
  Maximize2, 
  ChevronUp, 
  ChevronDown, 
  RefreshCw, 
  DollarSign, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { steamSalesService } from '../utils/steamSalesService';
import type { SteamSaleItem, DiscountTierFilter, CurrencyMode } from '../types/steamSales';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';

const IDR_EXCHANGE_RATE = 16300;

interface SteamSalesStripProps {
  onOpenSalesModal?: () => void;
}

export const SteamSalesStrip: React.FC<SteamSalesStripProps> = ({ onOpenSalesModal }) => {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);
  const [sales, setSales] = useState<SteamSaleItem[]>(() => steamSalesService.getSales());
  const [lastUpdated, setLastUpdated] = useState<number>(() => steamSalesService.getLastUpdated());
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>(language === 'id' ? 'IDR' : 'USD');
  const [discountTier, setDiscountTier] = useState<DiscountTierFilter>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync currency preference when website language switches
  useEffect(() => {
    setCurrencyMode(language === 'id' ? 'IDR' : 'USD');
  }, [language]);

  // Subscribe to live sales service
  useEffect(() => {
    const unsub = steamSalesService.subscribe((freshSales, updatedTime) => {
      setSales(freshSales);
      setLastUpdated(updatedTime);
    });
    return () => unsub();
  }, []);

  const handleRefresh = async () => {
    sound.playPowerUp();
    setIsRefreshing(true);
    try {
      const result = await steamSalesService.refreshSales(true);
      setSales(result.sales);
      setLastUpdated(Date.now());
      sound.playJackpot();
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

  const handleOpenLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Counts of available deals per tier
  const tierCounts = useMemo(() => {
    return {
      all: sales.length,
      '75plus': sales.filter((s) => s.discountPercent >= 75).length,
      '50plus': sales.filter((s) => s.discountPercent >= 50 && s.discountPercent < 75).length,
      under5: sales.filter((s) => s.salePrice <= 5).length,
      topRated: sales.filter((s) => (s.steamRatingPercent || 0) >= 90).length,
    };
  }, [sales]);

  // Filter top deals for the showcase strip (display top 6 deals with distinct sorting per tier)
  const displayedDeals = useMemo(() => {
    let list = sales.filter((item) => {
      if (discountTier === '75plus') return item.discountPercent >= 75;
      if (discountTier === '50plus') return item.discountPercent >= 50 && item.discountPercent < 75;
      if (discountTier === 'under5') return item.salePrice <= 5;
      if (discountTier === 'topRated') return (item.steamRatingPercent || 0) >= 90;
      return true;
    });

    if (discountTier === 'topRated') {
      // Prioritize highest rating and substantial review volume
      list = [...list].sort((a, b) => {
        const aCount = a.steamRatingCount || 0;
        const bCount = b.steamRatingCount || 0;
        const aWeight = (a.steamRatingPercent || 0) + (aCount > 50 ? 5 : 0);
        const bWeight = (b.steamRatingPercent || 0) + (bCount > 50 ? 5 : 0);
        return bWeight - aWeight || bCount - aCount;
      });
    } else if (discountTier === 'under5') {
      // Lowest price first
      list = [...list].sort((a, b) => a.salePrice - b.salePrice || b.discountPercent - a.discountPercent);
    } else if (discountTier === '50plus') {
      // 50-74% tier: sort by deal quality / popular AAA titles
      list = [...list].sort((a, b) => (b.dealRating || 0) - (a.dealRating || 0) || b.discountPercent - a.discountPercent);
    } else if (discountTier === '75plus') {
      // Deepest discounts first (95%, 90%, 85%, 80%, 75%)
      list = [...list].sort((a, b) => b.discountPercent - a.discountPercent || (b.steamRatingPercent || 0) - (a.steamRatingPercent || 0));
    } else {
      // 'all': balanced showcase of top deals
      list = [...list].sort((a, b) => (b.dealRating || 0) - (a.dealRating || 0) || b.discountPercent - a.discountPercent);
    }

    return list.slice(0, 6);
  }, [sales, discountTier]);

  return (
    <section className="mx-auto w-full max-w-6xl px-3 sm:px-4 py-2 animate-fade-in">
      <div className="rounded-2xl border-4 border-black bg-[#14161F] p-4 sm:p-5 shadow-[6px_6px_0px_#FFE600] space-y-4 text-white">
        
        {/* ======================================================== */}
        {/* 1. HEADER BAR                                            */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFE600] text-black border-2 border-black text-xl shadow-[2px_2px_0px_#000]">
              <Tag className="w-5 h-5 fill-current" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-['Syne'] font-black text-sm sm:text-base text-white uppercase tracking-wide">
                  {language === 'id' ? 'RADAR DISKON STEAM // STEAMDB SALES' : 'STEAM GAME SALES // STEAMDB DEALS'}
                </h2>
                <span className="px-1.5 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold border border-black">
                  {language === 'id' ? 'DISKON S/D -95%' : 'UP TO -95% OFF'}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold animate-pulse">
                  <Flame className="w-2.5 h-2.5 fill-current" /> {t('sales_live_badge')}
                </span>
                <span className="hidden md:inline-flex font-mono text-[9px] text-[#FFE600] bg-black/50 px-1.5 py-0.5 rounded border border-[#FFE600]/30">
                  {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400">
                {t('sales_modal_subtitle')}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Currency Mode Switcher */}
            <button
              onClick={() => {
                sound.playClick();
                setCurrencyMode((prev) => (prev === 'USD' ? 'IDR' : 'USD'));
              }}
              title={currencyMode === 'USD' ? 'Ganti ke Rupiah [IDR]' : 'Switch to USD [$]'}
              className="flex items-center gap-1 rounded-lg border-2 border-black bg-[#1C2030] hover:bg-[#FFE600] hover:text-black px-2 py-1.5 font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <DollarSign className="w-3 h-3" />
              <span>{currencyMode}</span>
            </button>

            {/* Sync / Refresh */}
            <button
              onClick={handleRefresh}
              title={language === 'id' ? 'Segarkan Diskon Steam' : 'Refresh Steam Sales'}
              disabled={isRefreshing}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black font-mono text-[10px] font-bold shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#FFE600]' : ''}`} />
              <span className="hidden md:inline">SYNC</span>
            </button>

            {/* Open Full Sales Popup Modal */}
            {onOpenSalesModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenSalesModal();
                }}
                data-cursor="SALES"
                title={language === 'id' ? 'Buka Popup Lengkap Radar Diskon' : 'Open Complete Sales Radar Modal'}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#00F5D4] hover:bg-white text-black font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">{language === 'id' ? 'BUKA POPUP' : 'OPEN POPUP'}</span>
                <span className="sm:hidden">{language === 'id' ? 'POPUP' : 'POPUP'}</span>
              </button>
            )}

            {/* Expand / Collapse Button */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded((prev) => !prev);
              }}
              title={isExpanded ? (language === 'id' ? 'Tutup Tampilan Diskon' : 'Collapse Sales') : (language === 'id' ? 'Buka Tampilan Diskon' : 'Open Sales')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#282E40] hover:bg-white text-white hover:text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{language === 'id' ? 'Tutup' : 'Hide'}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{language === 'id' ? 'Buka' : 'Show'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. EXPANDED CONTENT AREA                                 */}
        {/* ======================================================== */}
        {isExpanded && (
          <div className="space-y-4 animate-fade-in">
            {/* Quick Filter Pill Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-['Press_Start_2P'] text-[7px] text-[#FFE600] mr-1 hidden sm:inline">
                  FILTER:
                </span>

                <button
                  onClick={() => { sound.playClick(); setDiscountTier('all'); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border-2 border-black font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                    discountTier === 'all'
                      ? 'bg-[#00F5D4] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-[#1C2030] text-zinc-300 hover:bg-[#FFE600] hover:text-black'
                  }`}
                >
                  <span>{t('sales_tier_all')}</span>
                  <span className="text-[6px] opacity-75 font-mono">({tierCounts.all})</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setDiscountTier('75plus'); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border-2 border-black font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                    discountTier === '75plus'
                      ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-[#1C2030] text-zinc-300 hover:bg-[#FFE600] hover:text-black'
                  }`}
                >
                  <span>{t('sales_tier_75plus')}</span>
                  <span className="text-[6px] opacity-75 font-mono">({tierCounts['75plus']})</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setDiscountTier('50plus'); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border-2 border-black font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                    discountTier === '50plus'
                      ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-[#1C2030] text-zinc-300 hover:bg-[#FFE600] hover:text-black'
                  }`}
                >
                  <span>{t('sales_tier_50plus')}</span>
                  <span className="text-[6px] opacity-75 font-mono">({tierCounts['50plus']})</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setDiscountTier('under5'); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border-2 border-black font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                    discountTier === 'under5'
                      ? 'bg-[#00F5D4] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-[#1C2030] text-zinc-300 hover:bg-[#FFE600] hover:text-black'
                  }`}
                >
                  <span>{t('sales_tier_under5')}</span>
                  <span className="text-[6px] opacity-75 font-mono">({tierCounts.under5})</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); setDiscountTier('topRated'); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border-2 border-black font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                    discountTier === 'topRated'
                      ? 'bg-[#FF2A85] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-[#1C2030] text-zinc-300 hover:bg-[#FFE600] hover:text-black'
                  }`}
                >
                  <span>{t('sales_tier_top_rated')}</span>
                  <span className="text-[6px] opacity-75 font-mono">({tierCounts.topRated})</span>
                </button>
              </div>

              {/* Browse on SteamDB Link */}
              <button
                onClick={(e) => handleOpenLink(e, 'https://steamdb.info/sales/')}
                className="hidden md:flex items-center gap-1 font-['Press_Start_2P'] text-[7px] text-[#00F5D4] hover:text-[#FFE600] transition-colors cursor-pointer"
              >
                <span>steamdb.info/sales</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Showcase Deals Grid (6 cards) with Key on Tier for Instant Visual Animation */}
            <div key={discountTier} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 animate-fade-in">
              {displayedDeals.map((item) => {
                const isSuperDeal = item.discountPercent >= 85;
                const hasHighRating = (item.steamRatingPercent || 0) >= 90;

                return (
                  <article
                    key={item.id || item.appId}
                    onClick={() => {
                      if (onOpenSalesModal) {
                        sound.playClick();
                        onOpenSalesModal();
                      }
                    }}
                    className="group relative flex flex-col justify-between rounded-xl border-2 border-black bg-[#0C0E17] hover:bg-[#161926] transition-all duration-200 overflow-hidden shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#FFE600] hover:-translate-y-0.5 cursor-pointer"
                  >
                    {/* Thumbnail Artwork Banner */}
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

                      {/* Discount Badge */}
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded border border-black bg-[#FFE600] px-1.5 py-0.5 font-['Press_Start_2P'] text-[8px] font-black text-black shadow-[1px_1px_0px_#000]">
                        <span>-{item.discountPercent}%</span>
                      </div>

                      {/* Highlight Tag */}
                      {isSuperDeal ? (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 rounded border border-black bg-[#FF2A85] px-1 py-0.5 font-['Press_Start_2P'] text-[5px] font-bold text-white shadow animate-pulse">
                          <span>HOT</span>
                        </div>
                      ) : hasHighRating ? (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 rounded border border-black bg-[#00F5D4] px-1 py-0.5 font-['Press_Start_2P'] text-[5px] font-bold text-black shadow">
                          <span>90%+</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Card Body */}
                    <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
                      <div>
                        <h3 
                          className="font-['Space_Grotesk'] font-bold text-xs text-white line-clamp-1 group-hover:text-[#FFE600] transition-colors"
                          title={item.title}
                        >
                          {item.title}
                        </h3>

                        <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400 mt-0.5">
                          {item.steamRatingPercent ? (
                            <span className="flex items-center gap-0.5 text-[#00F5D4]">
                              <Star className="w-2.5 h-2.5 fill-current text-[#FFE600]" />
                              <span>{item.steamRatingPercent}%</span>
                            </span>
                          ) : (
                            <span className="text-zinc-500">Steam</span>
                          )}
                          <span className="text-zinc-500 text-[8px]">#{item.appId}</span>
                        </div>
                      </div>

                      {/* Price Strip */}
                      <div className="pt-1.5 border-t border-white/10 flex items-baseline justify-between gap-1">
                        <span className="font-mono text-[9px] text-zinc-500 line-through">
                          {formatPrice(item.normalPrice)}
                        </span>
                        <span className="font-['Space_Grotesk'] font-black text-xs text-[#00F5D4]">
                          {formatPrice(item.salePrice)}
                        </span>
                      </div>
                    </div>

                    {/* Direct Links Action */}
                    <div className="grid grid-cols-2 gap-1 p-1.5 bg-[#08090F] border-t border-black">
                      <button
                        onClick={(e) => handleOpenLink(e, item.steamUrl)}
                        className="flex items-center justify-center gap-1 rounded border border-black bg-[#1F2438] hover:bg-[#00F5D4] hover:text-black py-1 font-['Press_Start_2P'] text-[5.5px] text-zinc-300 font-bold transition-all"
                        title={`Buka ${item.title} di Toko Steam`}
                      >
                        <span>STORE</span>
                        <ExternalLink className="w-2 h-2" />
                      </button>
                      <button
                        onClick={(e) => handleOpenLink(e, item.steamDbUrl)}
                        className="flex items-center justify-center gap-1 rounded border border-black bg-[#1F2438] hover:bg-[#FFE600] hover:text-black py-1 font-['Press_Start_2P'] text-[5.5px] text-zinc-300 font-bold transition-all"
                        title={`Buka ${item.title} di SteamDB`}
                      >
                        <span>STEAMDB</span>
                        <ExternalLink className="w-2 h-2" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Strip Bar: CTA to Open Full Sales Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
                <span>
                  {language === 'id'
                    ? `Menampilkan diskon pilihan Steam & SteamDB (${sales.length}+ game aktif)`
                    : `Showing featured Steam & SteamDB discounts (${sales.length}+ active deals)`}
                </span>
              </div>

              {onOpenSalesModal && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenSalesModal();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black bg-[#FFE600] hover:bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'id' ? 'BUKA SEMUA DISKON DI POPUP LENGKAP' : 'OPEN FULL SALES POPUP RADAR'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default SteamSalesStrip;
