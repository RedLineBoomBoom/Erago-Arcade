import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Tv, Radio, Sparkles, BookOpen, Shuffle, Terminal, ChevronDown, Newspaper } from 'lucide-react';
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

    <header className="sticky top-0 z-50 border-b-2 border-black bg-[#0B0C10]/95 backdrop-blur-md px-2 sm:px-6 py-1.5 sm:py-3 w-full max-w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 sm:gap-4 w-full">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            sound.playClick();
            onViewChange('arcade');
          }}
          className="flex flex-col justify-center cursor-pointer group select-none py-0.5 shrink-0"
          data-cursor="HOME"
        >
          <div className="flex items-center gap-1 sm:gap-2.5">
            {/* Authentic ERAGO Logo Image (E R △ G ○) */}
            <div className="relative flex items-center">
              <img 
                src="/images/erago-logo.png" 
                alt="ERAGO" 
                className="h-5 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
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

          <p className="font-['Press_Start_2P'] text-[7px] text-[#00F5D4] tracking-wider hidden md:block mt-1">
            {t('brand_subtitle')}
          </p>
        </div>


        {/* Desktop View Switcher Tabs (Hidden on mobile < lg) */}
        <nav className="hidden lg:flex items-center gap-1 rounded-sm border-2 border-black bg-[#14161F] p-1 brutal-shadow-sm">
          <button
            onClick={() => {
              sound.playClick();
              onViewChange('arcade');
            }}
            data-cursor="SPIN"
            className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] transition-all ${
              currentView === 'arcade'
                ? 'bg-[#FF2A85] text-black font-bold shadow-inner'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shuffle className="h-3 w-3" />
            <span className="hidden md:inline">{t('tab_roulette')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('lookbook');
            }}
            data-cursor="CATALOG"
            className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] transition-all ${
              currentView === 'lookbook'
                ? 'bg-[#00F5D4] text-black font-bold shadow-inner'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="h-3 w-3" />
            <span className="hidden md:inline">{t('tab_lookbook')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('quiz');
            }}
            data-cursor="PLAY"
            className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] transition-all ${
              currentView === 'quiz'
                ? 'bg-[#FFE600] text-black font-bold shadow-inner'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden md:inline">{t('tab_quiz')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('cheats');
            }}
            data-cursor="CHEATS"
            className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] transition-all ${
              currentView === 'cheats'
                ? 'bg-[#9D4EDD] text-white font-bold shadow-inner'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span className="hidden md:inline">{t('tab_cheats')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('news');
            }}
            data-cursor="NEWS"
            className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] transition-all ${
              currentView === 'news'
                ? 'bg-[#00F5D4] text-black font-bold shadow-inner'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Newspaper className="h-3 w-3" />
            <span className="hidden md:inline">{t('tab_news')}</span>
          </button>
        </nav>


        {/* Action Controls: Sound / BGM / CRT / Cartridge Counter & Toys */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Arcade Coin Counter Widget */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBankModal();
            }}
            data-cursor="COINS"
            title="Erago Coin Bank & Rewards Info"
            className="flex h-7 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black bg-[#1A1C26] hover:bg-[#FFE600] text-[#FFE600] hover:text-black px-1.5 sm:px-2.5 font-['Press_Start_2P'] text-[6px] sm:text-[8px] font-bold transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] group shrink-0"
          >
            <span className="text-[11px] sm:text-sm group-hover:scale-110 transition-transform">🪙</span>
            <span>{currencyState.coins.toLocaleString()}</span>
            <span className="hidden xl:inline text-[6px] text-zinc-400 group-hover:text-black">{t('coins_label')}</span>
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
              className="flex h-7 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black bg-[#FFE600] px-1.5 sm:px-2.5 font-['Press_Start_2P'] text-[6px] sm:text-[8px] text-black font-bold hover:bg-white transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0"
            >
              <span>🕹️</span>
              <span className="hidden sm:inline">{t('hub_button')}</span>
              <span className="sm:hidden">HUB</span>
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



          {/* Cartridge Unlocked Badge (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 rounded-sm border-2 border-black bg-black/60 px-2.5 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00F5D4] animate-pulse"></span>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-300">
              {t('discovered')}: <strong className="text-[#FFE600]">{unlockedCount}</strong>/{totalCount}
            </span>
          </div>


          {/* Language Switcher (ID / EN) */}
          <button
            onClick={toggleLanguage}
            data-cursor="LANG"
            title={language === 'id' ? 'Ganti Bahasa ke English [EN]' : 'Ganti Bahasa ke Indonesia [ID]'}
            className="flex h-7 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-sm border-2 border-black bg-[#1A1C26] hover:bg-[#FFE600] text-white hover:text-black px-1.5 sm:px-2.5 font-['Press_Start_2P'] text-[6px] sm:text-[8px] font-bold transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] group shrink-0"
          >
            <span className="text-[11px] sm:text-xs group-hover:scale-110 transition-transform">
              {language === 'id' ? '🇮🇩' : '🇬🇧'}
            </span>
            <span className={language === 'id' ? 'text-[#00F5D4] group-hover:text-black font-black' : 'text-[#FF2A85] group-hover:text-black font-black'}>
              {language.toUpperCase()}
            </span>
          </button>


          {/* Procedural Chiptune BGM / Jukebox Modal Toggle (Desktop) */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenJukebox();
            }}
            data-cursor="RADIO"
            title="Open 90s Chiptune FM Jukebox [Tracks & Visualizer]"
            className={`relative hidden sm:flex h-9 items-center gap-1.5 rounded-sm border-2 border-black px-2 text-xs font-bold transition-all brutal-shadow-sm shrink-0 ${
              isBgmActive
                ? 'bg-[#9D4EDD] text-white hover:bg-[#8338ec]'
                : 'bg-[#1a1c26] text-zinc-400 hover:text-white'
            }`}
          >
            <Radio className={`h-4 w-4 ${isBgmActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            {/* Equalizer animation bar */}
            {isBgmActive ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-[#FFE600] animate-[bounce_0.6s_infinite_ease-in-out_0.1s] h-3"></span>
                <span className="w-0.5 bg-[#00F5D4] animate-[bounce_0.8s_infinite_ease-in-out_0.2s] h-2"></span>
                <span className="w-0.5 bg-[#FF2A85] animate-[bounce_0.5s_infinite_ease-in-out_0.3s] h-3.5"></span>
              </div>
            ) : (
              <span className="font-['Press_Start_2P'] text-[7px] hidden md:inline">{t('fm_radio')}</span>
            )}
          </button>


          {/* CRT Monitor Filter Switch (Desktop) */}
          <button
            onClick={() => {
              sound.playCrtBuzz();
              onToggleCrt();
            }}
            data-cursor="CRT"
            title="Toggle CRT Screen Scanline Filter [Hotkey: C]"
            className={`hidden sm:flex h-9 w-9 items-center justify-center rounded-sm border-2 border-black transition-all brutal-shadow-sm shrink-0 ${
              crtEnabled
                ? 'bg-[#00F5D4] text-black shadow-inner'
                : 'bg-[#1a1c26] text-zinc-400 hover:text-white'
            }`}
          >
            <Tv className="h-4 w-4" />
          </button>

          {/* Master SFX Toggle */}
          <button
            onClick={handleToggleMute}
            data-cursor="SFX"
            title="Toggle Sound Effects [Hotkey: M]"
            className={`flex h-7 sm:h-9 w-7 sm:w-9 items-center justify-center rounded-sm border-2 border-black transition-all shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] shrink-0 ${
              !isMuted
                ? 'bg-[#FFE600] text-black'
                : 'bg-[#1a1c26] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {!isMuted ? <Volume2 className="h-3 sm:h-4 w-3 sm:w-4" /> : <VolumeX className="h-3 sm:h-4 w-3 sm:w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip (Visible on mobile/tablet < lg) */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar border-t border-white/10 mt-2 pt-2 pb-0.5">
        <nav className="flex items-center gap-1.5 px-2 min-w-max mx-auto justify-start sm:justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onViewChange('arcade');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all ${
              currentView === 'arcade'
                ? 'bg-[#FF2A85] text-black font-bold shadow-inner'
                : 'bg-[#14161F] text-zinc-400 hover:text-white'
            }`}
          >
            <Shuffle className="h-2.5 w-2.5" />
            <span>{t('tab_roulette')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('lookbook');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all ${
              currentView === 'lookbook'
                ? 'bg-[#00F5D4] text-black font-bold shadow-inner'
                : 'bg-[#14161F] text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-2.5 w-2.5" />
            <span>{t('tab_lookbook')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onViewChange('quiz');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all ${
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
              onViewChange('cheats');
            }}
            className={`flex items-center gap-1 rounded-sm border-2 border-black px-2 py-1 font-['Press_Start_2P'] text-[7px] transition-all ${
              currentView === 'cheats'
                ? 'bg-[#9D4EDD] text-white font-bold shadow-inner'
                : 'bg-[#14161F] text-zinc-400 hover:text-white'
            }`}
          >
            <Terminal className="h-2.5 w-2.5" />
            <span>{t('tab_cheats')}</span>
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
        </nav>
      </div>
    </header>
  );
};
