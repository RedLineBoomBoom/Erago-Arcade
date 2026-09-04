import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Tv, Radio, Sparkles, BookOpen, Shuffle, Terminal, ChevronDown } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { currencyManager, type CurrencyState } from '../utils/currencyManager';
import { CoinBankModal } from './CoinBankModal';

import type { ViewMode } from '../types/trivia';



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
}) => {


  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isBgmActive, setIsBgmActive] = useState(sound.isBgmActive);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
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

    <header className="sticky top-0 z-40 border-b-2 border-black bg-[#0B0C10]/95 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            sound.playClick();
            onViewChange('arcade');
          }}
          className="flex flex-col justify-center cursor-pointer group select-none py-1"
          data-cursor="HOME"
        >
          <div className="flex items-center gap-2.5">
            {/* Authentic ERAGO Logo Image (E R △ G ○) */}
            <div className="relative flex items-center">
              <img 
                src="/images/erago-logo.png" 
                alt="ERAGO" 
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="absolute -top-1 -right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5D4]"></span>
              </span>
            </div>

            <span className="rounded bg-[#FFE600] px-1.5 py-0.5 font-['Press_Start_2P'] text-[8px] font-bold text-black uppercase border border-black shadow-[2px_2px_0px_#000]">
              ARCADE
            </span>
          </div>

          <p className="font-['Press_Start_2P'] text-[7px] text-[#00F5D4] tracking-wider hidden sm:block mt-1">
            VIDEO GAME TRIVIA VAULT // EST. 1980–2024
          </p>
        </div>


        {/* View Switcher Tabs (Roulette vs Lookbook vs Quiz) */}
        <nav className="flex items-center gap-1 rounded-sm border-2 border-black bg-[#14161F] p-1 brutal-shadow-sm">
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
            <span className="hidden md:inline">ROULETTE</span>
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
            <span className="hidden md:inline">LOOKBOOK</span>
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
            <span className="hidden md:inline">CHALLENGE</span>
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
            <span className="hidden md:inline">CHEATS</span>
          </button>
        </nav>


        {/* Action Controls: Sound / BGM / CRT / Cartridge Counter & Toys */}
        <div className="flex items-center gap-2">
          {/* Arcade Coin Counter Widget */}
          <button
            onClick={() => {
              sound.playClick();
              setIsBankModalOpen(true);
            }}
            data-cursor="COINS"
            title="Erago Coin Bank & Rewards Info"
            className="flex h-8 sm:h-9 items-center gap-1.5 rounded-sm border-2 border-black bg-[#1A1C26] hover:bg-[#FFE600] text-[#FFE600] hover:text-black px-2 sm:px-2.5 font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold transition-all shadow-[2px_2px_0px_#000] group"
          >
            <span className="text-xs sm:text-sm group-hover:scale-110 transition-transform">🪙</span>
            <span>{currencyState.coins.toLocaleString()}</span>
            <span className="hidden xl:inline text-[6px] text-zinc-400 group-hover:text-black">COINS</span>
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
              className="flex h-8 sm:h-9 items-center gap-1.5 rounded-sm border-2 border-black bg-[#FFE600] px-2.5 font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-black font-bold hover:bg-white transition-all shadow-[2px_2px_0px_#000]"
            >
              <span>🕹️</span>
              <span>ARCADE HUB</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExtrasOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Popover */}
            {isExtrasOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border-3 border-black bg-[#14161F] p-3 shadow-[8px_8px_0px_#000] z-50 animate-fade-in space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🎮</span>
                    <span className="font-['Press_Start_2P'] text-[8px] text-[#00F5D4]">ARCADE VAULT EXTRAS</span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400">8 MODES</span>
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
                      <div className="font-['Press_Start_2P'] text-[7px] text-white font-bold">BOSS RUSH</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">RPG Combat</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">5 GAMES</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">Bonus Library</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">BINDER</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">Holo Cards</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">TROPHIES</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">Achievements</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">MS-DOS</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">Prompt ~</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">THEMES</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">4 Palettes</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">STICKERS</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">{isStickerModeActive ? 'Active' : 'Stamp Mode'}</div>
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
                      <div className="font-['Press_Start_2P'] text-[7px] font-bold">SFX SYNTH</div>
                      <div className="font-mono text-[8px] text-zinc-400 group-hover:text-black/80">Soundboard</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>



          {/* Cartridge Unlocked Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-sm border-2 border-black bg-black/60 px-2.5 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00F5D4] animate-pulse"></span>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-300">
              DISCOVERED: <strong className="text-[#FFE600]">{unlockedCount}</strong>/{totalCount}
            </span>
          </div>


          {/* Procedural Chiptune BGM / Jukebox Modal Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenJukebox();
            }}
            data-cursor="RADIO"
            title="Open 90s Chiptune FM Jukebox [Tracks & Visualizer]"
            className={`relative flex h-9 items-center gap-1.5 rounded-sm border-2 border-black px-2 text-xs font-bold transition-all brutal-shadow-sm ${
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
              <span className="font-['Press_Start_2P'] text-[7px] hidden sm:inline">FM RADIO</span>
            )}
          </button>


          {/* CRT Monitor Filter Switch */}
          <button
            onClick={() => {
              sound.playCrtBuzz();
              onToggleCrt();
            }}
            data-cursor="CRT"
            title="Toggle CRT Screen Scanline Filter [Hotkey: C]"
            className={`flex h-9 w-9 items-center justify-center rounded-sm border-2 border-black transition-all brutal-shadow-sm ${
              crtEnabled
                ? 'bg-[#00F5D4] text-black shadow-inner'
                : 'bg-[#1a1c26] text-zinc-400 hover:text-white'
            }`}
          >
            <Tv className="h-4 w-4" />
          </button>

          {/* Master Sound Toggle */}
          <button
            onClick={handleToggleMute}
            data-cursor="SFX"
            title="Toggle Sound Effects [Hotkey: M]"
            className={`flex h-9 w-9 items-center justify-center rounded-sm border-2 border-black transition-all brutal-shadow-sm ${
              !isMuted
                ? 'bg-[#FFE600] text-black'
                : 'bg-[#1a1c26] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {!isMuted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Arcade Coin Bank & Rewards Information Modal */}
      <CoinBankModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        coins={currencyState.coins}
        accumulatedPoints={currencyState.accumulatedPoints}
        onOpenMiniGames={onOpenBonusStage}
        onOpenBossBattle={onOpenBossBattle}
      />
    </header>
  );
};
