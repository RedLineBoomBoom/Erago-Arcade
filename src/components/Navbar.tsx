import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Tv, Radio, Sparkles, ChevronDown, Newspaper, Tag, Gamepad2, Trophy, Terminal } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { currencyManager, type CurrencyState } from '../utils/currencyManager';

import type { ViewMode } from '../types/trivia';
import { useLanguage } from '../utils/i18n';



interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  unlockedCount: number;
  totalCount: number;
  onOpenTrophies: () => void;
  onOpenSoundboard: () => void;
  isStickerModeActive: boolean;
  onToggleStickers: () => void;
  onOpenBonusStage: () => void;
  onOpenJukebox: () => void;
  onOpenBossBattle: () => void;
  onOpenThemeModal: () => void;
  onOpenTerminal: () => void;
  onOpenCardBinder: () => void;
  onOpenBankModal: () => void;
  onOpenNewsModal?: () => void;
  onOpenSalesModal?: () => void;
  onRebootConsole?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  crtEnabled,
  onToggleCrt,
  unlockedCount,
  totalCount,
  onOpenTrophies,
  onOpenSoundboard,
  isStickerModeActive,
  onToggleStickers,
  onOpenBonusStage,
  onOpenJukebox,
  onOpenBossBattle,
  onOpenThemeModal,
  onOpenTerminal,
  onOpenCardBinder,
  onOpenBankModal,
  onOpenNewsModal,
  onOpenSalesModal,
  onRebootConsole,
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isBgmActive, setIsBgmActive] = useState(sound.isBgmActive);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [currencyState, setCurrencyState] = useState<CurrencyState>(() => ({
    coins: currencyManager.getCoins(),
    accumulatedPoints: currencyManager.getAccumulatedPoints(),
    playtimeSeconds: 0,
  }));
  const extrasMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubSound = sound.subscribe(() => {
      setIsMuted(sound.isMuted);
      setIsBgmActive(sound.isBgmActive);
    });
    const unsubCurrency = currencyManager.subscribe((state) => {
      setCurrencyState(state);
    });
    return () => {
      unsubSound();
      unsubCurrency();
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (extrasMenuRef.current && !extrasMenuRef.current.contains(e.target as Node)) {
        setIsExtrasOpen(false);
      }
    };
    if (isExtrasOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isExtrasOpen]);

  const handleToggleMute = () => {
    sound.playClick();
    sound.toggleMute();
  };


  return (

    <header className="sticky top-0 z-50 border-b-2 border-black bg-[#0B0C10]/95 backdrop-blur-md px-2 sm:px-4 xl:px-6 2xl:px-8 py-1.5 sm:py-2.5 w-full max-w-full">
      <div className="relative w-full flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            sound.playClick();
            onViewChange('home');
          }}
          className="flex items-center gap-1 sm:gap-2.5 cursor-pointer group select-none py-0.5 shrink-0 z-10"
          data-cursor="HOME"
        >
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Authentic ERAGO Logo Image (E R △ G ○) */}
              <div className="relative flex items-center">
                <img 
                  src="/images/erago-logo.png" 
                  alt="ERAGO" 
                  className="h-5 sm:h-7 xl:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span className="absolute -top-1 -right-1.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#00F5D4]"></span>
                </span>
              </div>

              <span className="rounded bg-[#FFE600] px-1 sm:px-1.5 py-0.5 font-['Press_Start_2P'] text-[6px] sm:text-[8px] font-bold text-black uppercase border border-black shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000]">
                ARCADE
              </span>
            </div>

            <p className="font-['Press_Start_2P'] text-[6px] xl:text-[7px] text-[#00F5D4] tracking-wider hidden 2xl:block mt-0.5">
              {t('brand_subtitle')}
            </p>
          </div>
        </div>


        {/* Desktop View Switcher Tabs (Hidden on mobile < lg, mathematically centered on lg+) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
          <nav className="flex items-center justify-center gap-0.5 xl:gap-1 rounded-sm border-2 border-black bg-[#14161F] p-0.5 xl:p-1 brutal-shadow-sm">
            <button
              onClick={() => {
                sound.playClick();
                onViewChange('home');
              }}
              data-cursor="MENU"
              className={`flex items-center gap-1 xl:gap-1.5 rounded-xs px-1 xl:px-1.5 2xl:px-2 py-0.5 sm:py-1 font-['Press_Start_2P'] text-[6.5px] 2xl:text-[7.5px] transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gamepad2 className="h-2.5 w-2.5 xl:h-3 xl:w-3" />
              <span className="hidden lg:inline">{t('tab_home')}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onViewChange('quiz');
              }}
              data-cursor="PLAY"
              className={`flex items-center gap-1 xl:gap-1.5 rounded-xs px-1 xl:px-1.5 2xl:px-2 py-0.5 sm:py-1 font-['Press_Start_2P'] text-[6.5px] 2xl:text-[7.5px] transition-all cursor-pointer ${
                currentView === 'quiz'
                  ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="h-2.5 w-2.5 xl:h-3 xl:w-3" />
              <span className="hidden lg:inline">{t('tab_quiz')}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onViewChange('news');
              }}
              data-cursor="NEWS"
              className={`flex items-center gap-1 xl:gap-1.5 rounded-xs px-1 xl:px-1.5 2xl:px-2 py-0.5 sm:py-1 font-['Press_Start_2P'] text-[6.5px] 2xl:text-[7.5px] transition-all cursor-pointer ${
                currentView === 'news'
                  ? 'bg-[#00F5D4] text-black font-bold shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Newspaper className="h-2.5 w-2.5 xl:h-3 xl:w-3" />
              <span className="hidden lg:inline">{t('tab_news')}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onViewChange('sales');
              }}
              data-cursor="SALES"
              title="SteamDB Live Game Sales"
              className={`flex items-center gap-1 xl:gap-1.5 rounded-xs px-1 xl:px-1.5 2xl:px-2 py-0.5 sm:py-1 font-['Press_Start_2P'] text-[6.5px] 2xl:text-[7.5px] transition-all cursor-pointer ${
                currentView === 'sales'
                  ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                  : 'text-[#FFE600] hover:bg-[#FFE600] hover:text-black'
              }`}
            >
              <Tag className="h-2.5 w-2.5 xl:h-3 xl:w-3" />
              <span className="hidden lg:inline">{t('tab_sales')}</span>
              <span className="rounded bg-[#FF2A85] px-1 py-0.2 text-[6px] text-white font-bold animate-pulse">
                -90%
              </span>
            </button>

            {/* Trophy Cabinet Tab Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenTrophies();
              }}
              data-cursor="TROPHY"
              title="Trophy Cabinet & Achievements"
              className="flex items-center gap-1 xl:gap-1.5 rounded-xs px-1 xl:px-1.5 2xl:px-2 py-0.5 sm:py-1 font-['Press_Start_2P'] text-[6.5px] 2xl:text-[7.5px] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black transition-all cursor-pointer"
            >
              <Trophy className="h-2.5 w-2.5 xl:h-3 xl:w-3" />
              <span className="hidden lg:inline">{t('tab_trophies')}</span>
            </button>

            {/* MS-DOS Terminal Tab Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              data-cursor="MSDOS"
              title="Vintage MS-DOS Prompt CLI [C:\ERAGO>]"
              className="flex items-center gap-1 xl:gap-1.5 rounded-xs px-1 xl:px-1.5 2xl:px-2 py-0.5 sm:py-1 font-['Press_Start_2P'] text-[6.5px] 2xl:text-[7.5px] text-[#84CC16] hover:bg-[#84CC16] hover:text-black transition-all cursor-pointer"
            >
              <Terminal className="h-2.5 w-2.5 xl:h-3 xl:w-3" />
              <span className="hidden lg:inline">{t('tab_terminal')}</span>
            </button>
          </nav>
        </div>


        {/* Action Controls: Sound / BGM / CRT / Cartridge Counter & Toys */}
        <div className="flex items-center justify-end gap-1 2xl:gap-1.5 shrink-0 z-10">
          {/* Arcade Coin Counter Widget */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBankModal();
            }}
            data-cursor="COINS"
            title="Erago Coin Bank & Rewards Info"
            className="flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black bg-[#1A1C26] hover:bg-[#FFE600] text-[#FFE600] hover:text-black px-1.5 sm:px-2 font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] group shrink-0"
          >
            <span className="text-[11px] sm:text-xs group-hover:scale-110 transition-transform">🪙</span>
            <span>{currencyState.coins.toLocaleString()}</span>
            <span className="hidden min-[1900px]:inline text-[6px] text-zinc-400 group-hover:text-black">{t('coins_label')}</span>
          </button>

          {/* Unified Arcade Extras Hub Dropdown */}
          <div className="relative" ref={extrasMenuRef}>
            <button
              onClick={() => {
                sound.playClick();
                setIsExtrasOpen((prev) => !prev);
              }}
              data-cursor="HUB"
              title="Arcade Extras & Game Modes Hub"
              className="flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black bg-[#FFE600] px-1.5 sm:px-2 font-['Press_Start_2P'] text-[6px] sm:text-[7px] text-black font-bold hover:bg-white transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0"
            >
              <span>🕹️</span>
              <span className="hidden min-[1900px]:inline">{t('hub_button')}</span>
              <span className="min-[1900px]:hidden">HUB</span>
              <ChevronDown className={`w-2.5 sm:w-3 h-2.5 sm:h-3 transition-transform duration-200 ${isExtrasOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Popover */}
            {isExtrasOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1rem)] max-h-[85vh] overflow-y-auto custom-scrollbar rounded-xl border-3 border-black bg-[#14161F] p-3 shadow-[8px_8px_0px_#000] z-[70] animate-fade-in space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🎮</span>
                    <span className="font-['Press_Start_2P'] text-[8px] text-[#00F5D4]">{t('hub_title')}</span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400">{t('hub_modes_count')}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Boss Rush */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenBossBattle();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-[#FF2A85] text-white transition-all group"
                  >
                    <span className="text-lg">⚔️</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] text-white font-bold">{t('hub_boss_rush')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_boss_rush_desc')}</div>
                    </div>
                  </button>

                  {/* Bonus Stage */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenBonusStage();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-[#00F5D4] text-white hover:text-black transition-all group"
                  >
                    <span className="text-lg">🕹️</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_bonus_stage')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_bonus_stage_desc')}</div>
                    </div>
                  </button>

                  {/* 3D Card Binder */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenCardBinder();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-[#FFE600] text-white hover:text-black transition-all group"
                  >
                    <span className="text-lg">🃏</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_card_binder')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_card_binder_desc')}</div>
                    </div>
                  </button>

                  {/* Trophies */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenTrophies();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-[#FFE600] text-white hover:text-black transition-all group"
                  >
                    <span className="text-lg">🏆</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_trophy')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_trophy_desc')}</div>
                    </div>
                  </button>

                  {/* MS-DOS */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenTerminal();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-[#00F5D4] text-white hover:text-black transition-all group"
                  >
                    <span className="text-lg">📟</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_terminal')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_terminal_desc')}</div>
                    </div>
                  </button>

                  {/* Themes */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenThemeModal();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-white text-white hover:text-black transition-all group"
                  >
                    <span className="text-lg">🎨</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_theme')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_theme_desc')}</div>
                    </div>
                  </button>

                  {/* Sticker Stamp */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onToggleStickers();
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg border-2 border-black text-left transition-all group ${
                      isStickerModeActive ? 'bg-[#FF2A85] text-white' : 'bg-[#1E2230] text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    <span className="text-lg">🎨</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_stickers')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{isStickerModeActive ? (language === 'id' ? 'Aktif' : 'Active') : t('hub_stickers_desc')}</div>
                    </div>
                  </button>

                  {/* Pocket SFX */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExtrasOpen(false);
                      onOpenSoundboard();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-left hover:bg-[#9D4EDD] text-white transition-all group"
                  >
                    <span className="text-lg">🎛️</span>
                    <div>
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_soundboard')}</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_soundboard_desc')}</div>
                    </div>
                  </button>

                  {/* Gaming News Press Wire */}
                  {onOpenNewsModal && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsExtrasOpen(false);
                        onOpenNewsModal();
                      }}
                      className="col-span-2 flex items-center justify-between p-2 rounded-lg border-2 border-black bg-gradient-to-r from-[#1E2230] to-[#282E40] text-left hover:bg-[#FFE600] text-white hover:text-black transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📰</span>
                        <div>
                          <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_press_wire')}</div>
                          <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_press_wire_desc')}</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold">
                        12 SITES
                      </span>
                    </button>
                  )}

                  {/* Steam Sales & SteamDB Tracker */}
                  {onOpenSalesModal && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsExtrasOpen(false);
                        onOpenSalesModal();
                      }}
                      className="col-span-2 flex items-center justify-between p-2 rounded-lg border-2 border-black bg-gradient-to-r from-[#1E2230] to-[#2B1B34] text-left hover:bg-[#FFE600] text-white hover:text-black transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏷️</span>
                        <div>
                          <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_sales')}</div>
                          <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_sales_desc')}</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold">
                        STEAMDB
                      </span>
                    </button>
                  )}

                  {/* Reboot Console Loader */}
                  {onRebootConsole && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsExtrasOpen(false);
                        onRebootConsole();
                      }}
                      className="col-span-2 flex items-center justify-between p-2 rounded-lg border-2 border-black bg-gradient-to-r from-[#1E2230] to-[#282E40] text-left hover:bg-[#00F5D4] text-white hover:text-black transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔄</span>
                        <div>
                          <div className="font-['Press_Start_2P'] text-[7px] font-bold">{t('hub_reboot')}</div>
                          <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{t('hub_reboot_desc')}</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold">
                        BOOT
                      </span>
                    </button>
                  )}

                  {/* Quick Controls: Radio & CRT for Mobile / Hub Access */}
                  <div className="col-span-2 grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsExtrasOpen(false);
                        onOpenJukebox();
                      }}
                      className="flex items-center justify-center gap-1.5 p-2 rounded-lg border-2 border-black bg-[#1E2230] text-zinc-300 hover:text-white font-['Press_Start_2P'] text-[7px] transition-colors"
                    >
                      <Radio className="w-3.5 h-3.5 text-[#9D4EDD]" />
                      <span>{t('fm_radio')}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playCrtBuzz();
                        onToggleCrt();
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[7px] transition-colors ${
                        crtEnabled
                          ? 'bg-[#00F5D4] text-black font-bold'
                          : 'bg-[#1E2230] text-zinc-300 hover:text-white'
                      }`}
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>CRT: {crtEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>



          {/* Cartridge Discoveries Unlocked Badge */}
          <button
            onClick={() => {
              sound.playClick();
              onViewChange('lookbook');
            }}
            data-cursor="LOOKBOOK"
            title={
              language === 'id'
                ? `Koleksi Cartridge Game: ${unlockedCount}/${totalCount} Terbuka (Klik untuk Buka)`
                : `Game Cartridge Discoveries: ${unlockedCount}/${totalCount} Unlocked (Click to Open)`
            }
            className={`flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black px-1.5 sm:px-2 font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] group shrink-0 cursor-pointer ${
              currentView === 'lookbook'
                ? 'bg-[#00F5D4] text-black shadow-inner'
                : 'bg-[#1A1C26] hover:bg-[#00F5D4] text-zinc-200 hover:text-black'
            }`}
          >
            <span className="inline-block h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-[#00F5D4] group-hover:bg-black animate-pulse shrink-0" />
            <span className="hidden xl:inline text-[6px] text-zinc-400 group-hover:text-black">
              {language === 'id' ? 'TERBUKA:' : 'DISCOVERED:'}
            </span>
            <span className="text-[#FFE600] group-hover:text-black font-bold">
              {unlockedCount}/{totalCount}
            </span>
          </button>


          {/* Language Switcher (ID / EN) */}
          <button
            onClick={toggleLanguage}
            data-cursor="LANG"
            title={language === 'id' ? 'Ganti Bahasa ke English [EN]' : 'Ganti Bahasa ke Indonesia [ID]'}
            className="flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black bg-[#1A1C26] hover:bg-[#FFE600] text-white hover:text-black px-1.5 sm:px-2 font-['Press_Start_2P'] text-[6px] sm:text-[7px] font-bold transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] group shrink-0"
          >
            <span className="text-[11px] sm:text-xs group-hover:scale-110 transition-transform">
              {language === 'id' ? '🇮🇩' : '🇬🇧'}
            </span>
            <span className={language === 'id' ? 'text-[#00F5D4] group-hover:text-black font-black' : 'text-[#FF2A85] group-hover:text-black font-black'}>
              {language.toUpperCase()}
            </span>
          </button>


          {/* Procedural Chiptune BGM / Jukebox Modal Toggle (Desktop 2xl+) */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenJukebox();
            }}
            data-cursor="RADIO"
            title="Open 90s Chiptune FM Jukebox [Tracks & Visualizer]"
            className={`relative hidden 2xl:flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black px-1.5 sm:px-2 text-xs font-bold transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0 ${
              isBgmActive
                ? 'bg-[#9D4EDD] text-white hover:bg-[#8338ec]'
                : 'bg-[#1a1c26] text-zinc-400 hover:text-white'
            }`}
          >
            <Radio className={`h-3.5 w-3.5 ${isBgmActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            {/* Equalizer animation bar */}
            {isBgmActive ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-[#FFE600] animate-[bounce_0.6s_infinite_ease-in-out_0.1s] h-3"></span>
                <span className="w-0.5 bg-[#00F5D4] animate-[bounce_0.8s_infinite_ease-in-out_0.2s] h-2"></span>
                <span className="w-0.5 bg-[#FF2A85] animate-[bounce_0.5s_infinite_ease-in-out_0.3s] h-3.5"></span>
              </div>
            ) : (
              <span className="font-['Press_Start_2P'] text-[6px] hidden min-[1900px]:inline">{t('fm_radio')}</span>
            )}
          </button>


          {/* CRT Monitor Filter Switch (Desktop 2xl+ when not on main menu) */}
          {currentView !== 'home' && (
            <button
              onClick={() => {
                sound.playCrtBuzz();
                onToggleCrt();
              }}
              data-cursor="CRT"
              title="Toggle CRT Screen Scanline Filter [Hotkey: C]"
              className={`hidden 2xl:flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-sm border-2 border-black transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0 ${
                crtEnabled
                  ? 'bg-[#00F5D4] text-black shadow-inner'
                  : 'bg-[#1a1c26] text-zinc-400 hover:text-white'
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Master SFX Toggle */}
          <button
            onClick={handleToggleMute}
            data-cursor="SFX"
            title="Toggle Sound Effects [Hotkey: M]"
            className={`flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-sm border-2 border-black transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0 ${
              !isMuted
                ? 'bg-[#FFE600] text-black'
                : 'bg-[#1a1c26] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {!isMuted ? <Volume2 className="h-3 sm:h-3.5 w-3 sm:w-3.5" /> : <VolumeX className="h-3 sm:h-3.5 w-3 sm:w-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip (Visible on mobile/tablet < lg) */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar border-t border-white/10 mt-2 pt-2 pb-0.5">
        <nav className="flex items-center gap-1.5 px-2 min-w-max mx-auto justify-start sm:justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onViewChange('home');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                : 'bg-[#14161F] text-zinc-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="h-2.5 w-2.5" />
            <span>{t('tab_home')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('quiz');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all cursor-pointer ${
              currentView === 'quiz'
                ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                : 'bg-[#14161F] text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-2.5 w-2.5" />
            <span>{t('tab_quiz')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('news');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all ${
              currentView === 'news'
                ? 'bg-[#00F5D4] text-black font-bold shadow-inner'
                : 'bg-[#14161F] text-zinc-400 hover:text-white'
            }`}
          >
            <Newspaper className="h-2.5 w-2.5" />
            <span>{t('tab_news')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('sales');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all cursor-pointer ${
              currentView === 'sales'
                ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                : 'bg-[#14161F] text-[#FFE600] hover:bg-[#FFE600] hover:text-black'
            }`}
          >
            <Tag className="h-2.5 w-2.5" />
            <span>{t('tab_sales')}</span>
            <span className="rounded bg-[#FF2A85] px-1 py-0.2 text-[5.5px] text-white font-bold animate-pulse ml-0.5">
              -90%
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenTrophies();
            }}
            className="flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] text-[#F59E0B] bg-[#14161F] hover:bg-[#F59E0B] hover:text-black transition-all cursor-pointer"
          >
            <Trophy className="h-2.5 w-2.5" />
            <span>{t('tab_trophies')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] text-[#84CC16] bg-[#14161F] hover:bg-[#84CC16] hover:text-black transition-all cursor-pointer"
          >
            <Terminal className="h-2.5 w-2.5" />
            <span>{t('tab_terminal')}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
