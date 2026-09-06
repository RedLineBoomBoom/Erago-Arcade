import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Shuffle,
  Sparkles,
  BookOpen,
  Tag,
  Newspaper,
  Terminal,
  Gamepad2,
  Swords,
  Layers,
  Radio,
  Coins,
  ArrowRight,
  Tv,
  Play,
  ShieldCheck,
  Activity,
  Users,
} from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';
import { useOnlinePlayersCount, type ArcadeSectionId } from '../utils/onlinePlayersService';
import type { ViewMode } from '../types/trivia';

interface GameMenuHomeProps {
  onSelectView: (view: ViewMode) => void;
  onOpenBonusStage: () => void;
  onOpenBossBattle: () => void;
  onOpenCardBinder: () => void;
  onOpenTrophies?: () => void;
  onOpenJukebox: () => void;
  onOpenTerminal?: () => void;
  onOpenBankModal: () => void;
  onOpenSoundboard?: () => void;
  coins: number;
  unlockedCount: number;
  totalCount: number;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  totalActivePlayers?: number;
  totalInGamePlayers?: number;
  localTabsCount?: number;
  sectionPlayerCounts?: Record<ArcadeSectionId, number>;
}

interface MenuItemDef {
  id: string;
  number: string;
  titleKey: string;
  category: 'core' | 'special';
  badgeKey: string;
  color: string;
  hoverBg: string;
  icon: React.ElementType;
  descId: string;
  descEn: string;
  featureBulletsId: string[];
  featureBulletsEn: string[];
  actionType: 'view' | 'modal';
  viewTarget?: ViewMode;
  modalAction?: () => void;
  coinsReward?: string;
  statBadge?: string;
}

export const GameMenuHome: React.FC<GameMenuHomeProps> = ({
  onSelectView,
  onOpenBonusStage,
  onOpenBossBattle,
  onOpenCardBinder,
  onOpenTrophies: _onOpenTrophies,
  onOpenJukebox,
  onOpenTerminal: _onOpenTerminal,
  onOpenBankModal,
  coins,
  unlockedCount,
  totalCount,
  crtEnabled,
  onToggleCrt,
  totalActivePlayers: propTotalActivePlayers,
  totalInGamePlayers: propTotalInGamePlayers,
  localTabsCount: propLocalTabsCount,
  sectionPlayerCounts: propSectionPlayerCounts,
}) => {
  const { language, t } = useLanguage();
  const fallbackPresence = useOnlinePlayersCount('main-menu');
  const totalActivePlayers = propTotalActivePlayers ?? fallbackPresence.totalActivePlayers;
  const totalInGamePlayers = propTotalInGamePlayers ?? fallbackPresence.totalInGamePlayers;
  const localTabsCount = propLocalTabsCount ?? fallbackPresence.localTabsCount;
  const sectionPlayerCounts = propSectionPlayerCounts ?? fallbackPresence.sectionPlayerCounts;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  // Define all 12 website sections as interactive game menu options
  const menuItems: MenuItemDef[] = useMemo(
    () => [
      {
        id: 'trivia-roulette',
        number: '01',
        titleKey: 'TRIVIA ROULETTE',
        category: 'core',
        badgeKey: 'CORE STAGE',
        color: '#00F5D4',
        hoverBg: 'hover:bg-[#00F5D4]/15',
        icon: Shuffle,
        descId: 'Putar gulungan mesin slot retro, buka 200 memory cartridge 3D holografis, spotlight karakter, dan rahasia developer.',
        descEn: 'Spin the retro slot reel, unveil 200 holographic 3D memory cartridges, character spotlight art, and developer secrets.',
        featureBulletsId: ['200 Game Klasik', 'Slot Machine Reel', 'Spotlight Hero & Cover Box', 'Biaya: 10 Koin/Putar'],
        featureBulletsEn: ['200 Classic Games', 'Slot Machine Reel', 'Hero Spotlight & Box Art', 'Cost: 10 Coins/Roll'],
        actionType: 'view',
        viewTarget: 'arcade',
        coinsReward: 'Biaya: 10 Koin',
        statBadge: '200 Games',
      },
      {
        id: 'quiz-speedrun',
        number: '02',
        titleKey: 'QUIZ SPEEDRUN',
        category: 'core',
        badgeKey: 'CHALLENGE',
        color: '#FFE600',
        hoverBg: 'hover:bg-[#FFE600]/15',
        icon: Sparkles,
        descId: 'Uji wawasan video game Anda dalam mode kuis interaktif berwaktu! Jaga combo streak dan kumpulkan koin berlimpah untuk brankas.',
        descEn: 'Test your gaming knowledge in timed interactive speedrun trivia! Build combo streaks and rack up coins for your vault.',
        featureBulletsId: ['Soal Trivia Berwaktu', 'Multiplier Combo Streak', 'Hadiah Koin Berlimpah', 'Papan Skor'],
        featureBulletsEn: ['Timed Trivia Questions', 'Combo Streak Multiplier', 'Generous Coin Rewards', 'Score Rankings'],
        actionType: 'view',
        viewTarget: 'quiz',
        coinsReward: '+10 s.d. +30 Koin',
        statBadge: 'Earn Coins',
      },
      {
        id: 'cartridge-lookbook',
        number: '03',
        titleKey: 'CARTRIDGE ARCHIVE',
        category: 'core',
        badgeKey: 'LIBRARY',
        color: '#FF2A85',
        hoverBg: 'hover:bg-[#FF2A85]/15',
        icon: BookOpen,
        descId: 'Katalog arsip lengkap seluruh 200 cartridge game era 80-an hingga modern. Filter berdasarkan era, genre, tag rahasia, atau pencarian instan.',
        descEn: 'Comprehensive library archive of all 200 game cartridges from 8-bit to modern eras. Filter by era, tags, or instant search.',
        featureBulletsId: ['200 Box Art Otentik', 'Filter 4 Era Game', 'Pencarian Instan Cepat', 'Kartu Detail Interaktif'],
        featureBulletsEn: ['200 Authentic Box Arts', 'Filter 4 Gaming Eras', 'Instant Fast Search', 'Interactive Lore Detail'],
        actionType: 'view',
        viewTarget: 'lookbook',
        coinsReward: 'Gratis Akses',
        statBadge: `${unlockedCount}/${totalCount} Unlocked`,
      },
      {
        id: 'steam-radar',
        number: '04',
        titleKey: 'STEAM SALES RADAR',
        category: 'core',
        badgeKey: 'HOT DEALS',
        color: '#10B981',
        hoverBg: 'hover:bg-[#10B981]/15',
        icon: Tag,
        descId: 'Radar diskon game Steam real-time bertenaga basis data SteamDB. Cari game termurah dengan potongan hingga -90% dan tautan resmi toko Steam.',
        descEn: 'Real-time Steam game discounts radar powered by SteamDB live data. Track lowest prices with up to -90% cuts & direct store links.',
        featureBulletsId: ['Data Real-Time SteamDB', 'Diskon s.d. -90%', 'Filter Publisher & Rating', 'Tautan Langsung Store'],
        featureBulletsEn: ['Real-Time SteamDB Data', 'Discounts up to -90%', 'Publisher & Rating Filter', 'Direct Steam Links'],
        actionType: 'view',
        viewTarget: 'sales',
        coinsReward: 'Market Radar',
        statBadge: 'Up to -90%',
      },
      {
        id: 'gaming-news',
        number: '05',
        titleKey: 'GAMING PRESS WIRE',
        category: 'core',
        badgeKey: 'NEWS ROOM',
        color: '#3B82F6',
        hoverBg: 'hover:bg-[#3B82F6]/15',
        icon: Newspaper,
        descId: 'Pusat warta game terintegrasi dari 12 media game ternama dunia (IGN, Kotaku, PC Gamer, Eurogamer, dsb). Baca ulasan dan headline terbaru.',
        descEn: 'Integrated gaming newsroom aggregating 12 world-renowned gaming outlets (IGN, Kotaku, PC Gamer, etc.). Read reviews & latest stories.',
        featureBulletsId: ['12 Outlet Internasional', 'Headline Terkini', 'Modal Baca Nyaman', 'Update Otomatis'],
        featureBulletsEn: ['12 Global Outlets', 'Live Headlines', 'Immersive Reading Modal', 'Auto-Updated Feed'],
        actionType: 'view',
        viewTarget: 'news',
        coinsReward: 'Live Wire',
        statBadge: '12 Outlets',
      },
      {
        id: 'cheat-vault',
        number: '06',
        titleKey: 'CHEAT CODES VAULT',
        category: 'core',
        badgeKey: 'SECRET CODES',
        color: '#9D4EDD',
        hoverBg: 'hover:bg-[#9D4EDD]/15',
        icon: Terminal,
        descId: 'Kompilasi kode curang legendaris dari zaman NES, SNES, PS1 hingga era modern. Konami Code, debug menu, invincibility, dan level warp.',
        descEn: 'Legendary cheat code database spanning NES, SNES, PS1 through modern consoles. Konami Code, god modes, level warps & secrets.',
        featureBulletsId: ['Konami Code & Hacks', 'Tombol Input Visual', 'Password Level Klasik', 'Salin Sekali Klik'],
        featureBulletsEn: ['Konami Code & Hacks', 'Visual Gamepad Inputs', 'Classic Level Passwords', 'One-Click Copy'],
        actionType: 'view',
        viewTarget: 'cheats',
        coinsReward: 'God Modes',
        statBadge: 'Retro Hacks',
      },
      {
        id: 'bonus-minigames',
        number: '07',
        titleKey: 'BONUS STAGE',
        category: 'special',
        badgeKey: 'MINI-GAMES',
        color: '#FB923C',
        hoverBg: 'hover:bg-[#FB923C]/15',
        icon: Gamepad2,
        descId: 'Istirahat sejenak dan mainkan 3 game arcade legendaris: Pixel Pong, Brick Breaker, dan Space Invaders. Kumpulkan skor untuk dikonversi menjadi koin.',
        descEn: 'Take a break and play 3 iconic retro arcade mini-games: Pixel Pong, Brick Breaker, and Space Invaders. Earn points to convert into coins.',
        featureBulletsId: ['Pixel Pong Duel', 'Cyber Brick Breaker', 'Retro Space Invaders', 'Konversi Poin ke Koin'],
        featureBulletsEn: ['Pixel Pong Duel', 'Cyber Brick Breaker', 'Retro Space Invaders', 'Convert Points to Coins'],
        actionType: 'modal',
        modalAction: onOpenBonusStage,
        coinsReward: '+10 s.d. +15 Koin',
        statBadge: '3 Games',
      },
      {
        id: 'boss-rush',
        number: '08',
        titleKey: 'BOSS BATTLE ARENA',
        category: 'special',
        badgeKey: 'RPG COMBAT',
        color: '#EF4444',
        hoverBg: 'hover:bg-[#EF4444]/15',
        icon: Swords,
        descId: 'Pertarungan bos RPG berbasis giliran! Gunakan kecerdasan trivia Anda untuk mengalahkan Giga Glitch & Mecha Dragon demi hadiah koin melimpah.',
        descEn: 'Turn-based RPG trivia combat! Use your video game knowledge to defeat Giga Glitch & Mecha Dragon for massive coin rewards.',
        featureBulletsId: ['Pertarungan Berbasis Giliran', 'Bos Bertahap Unik', 'Animasi Serangan 8-Bit', 'Hadiah Kemenangan Besar'],
        featureBulletsEn: ['Turn-Based RPG Combat', 'Multi-Stage Bosses', '8-Bit Battle Animations', 'Huge Victory Rewards'],
        actionType: 'modal',
        modalAction: onOpenBossBattle,
        coinsReward: '+20 Koin Bonus',
        statBadge: 'RPG Arena',
      },
      {
        id: 'card-binder',
        number: '09',
        titleKey: 'CARD BINDER',
        category: 'special',
        badgeKey: 'HOLO FOIL',
        color: '#F472B6',
        hoverBg: 'hover:bg-[#F472B6]/15',
        icon: Layers,
        descId: 'Album kartu koleksi era 90-an. Lihat setiap kartu game yang telah Anda buka dengan efek kilau foil holografis interaktif 3D.',
        descEn: 'Authentic 90s trading card binder. Inspect every discovered game cartridge with reactive 3D holographic foil shimmer effects.',
        featureBulletsId: ['Efek Shimmer Foil 3D', 'Refleksi Giroskop/Mouse', 'Tingkat Kelangkaan Kartu', 'Pelacak Kelengkapan'],
        featureBulletsEn: ['3D Foil Shimmer Effect', 'Mouse/Gyro Reflection', 'Rarity Tier Badges', 'Completion Tracker'],
        actionType: 'modal',
        modalAction: onOpenCardBinder,
        coinsReward: 'Koleksi Kartu',
        statBadge: '3D Binder',
      },
      {
        id: 'chiptune-jukebox',
        number: '10',
        titleKey: 'CHIPTUNE JUKEBOX',
        category: 'special',
        badgeKey: 'FM SYNTH',
        color: '#14B8A6',
        hoverBg: 'hover:bg-[#14B8A6]/15',
        icon: Radio,
        descId: 'Jukebox synthesizer FM retro dengan visualizer spektrum audio! Putar trek BGM 8-bit/16-bit arcade yang membakar semangat bermain.',
        descEn: 'Retro FM synth chiptune jukebox with dynamic audio spectrum visualizer! Stream procedural 8-bit & 16-bit arcade background music.',
        featureBulletsId: ['Sintesis Audio Web Murni', 'Visualizer Spektrum Real-Time', 'Trek BGM Arcade', 'Kontrol Playback Lengkap'],
        featureBulletsEn: ['Pure Web Audio Synthesis', 'Real-Time Spectrum Bars', 'Arcade BGM Soundtracks', 'Full Playback Controls'],
        actionType: 'modal',
        modalAction: onOpenJukebox,
        coinsReward: 'Musik Arcade',
        statBadge: 'FM Audio',
      },
    ],
    [
      unlockedCount,
      totalCount,
      onOpenBonusStage,
      onOpenBossBattle,
      onOpenCardBinder,
      onOpenJukebox,
    ]
  );

  const activeItem = menuItems[selectedIndex] || menuItems[0];

  // Launch action for a selected item
  const handleLaunch = useCallback(
    (item: MenuItemDef) => {
      if (isLaunching) return;
      setIsLaunching(true);
      sound.playJackpot();

      setTimeout(() => {
        setIsLaunching(false);
        if (item.actionType === 'view' && item.viewTarget) {
          onSelectView(item.viewTarget);
        } else if (item.actionType === 'modal' && item.modalAction) {
          item.modalAction();
        }
      }, 250);
    },
    [isLaunching, onSelectView]
  );

  // Keyboard Navigation: ArrowUp, ArrowDown, KeyW, KeyS, Enter, Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
      } else if (e.key === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleLaunch(menuItems[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, menuItems, handleLaunch]);

  return (
    <div className="relative w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 select-none animate-fadeIn">
      {/* 1. Cabinet Marquee & Arcade Title Header */}
      <div className="relative mb-6 sm:mb-8 rounded-xl border-3 border-black bg-[#12141F]/90 backdrop-blur-md p-4 sm:p-6 shadow-[6px_6px_0px_#000] overflow-hidden">
        {/* Neon scanline accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00F5D4] via-[#FF2A85] to-[#FFE600] animate-pulse" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-2 py-0.5 rounded bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] sm:text-[8px] font-bold shadow-[2px_2px_0px_#000]">
                {t('menu_home_badge')}
              </span>
              <div 
                title={`Live Active Players: ${totalActivePlayers} online // ${totalInGamePlayers} in-game (Local sessions: ${localTabsCount})`}
                className="px-2.5 py-1 rounded bg-black/80 border border-white/20 text-[#FFE600] font-mono text-[8.5px] sm:text-[9.5px] flex items-center gap-2 shadow-[2px_2px_0px_#000]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-['Press_Start_2P'] text-[7.5px] sm:text-[8px] text-[#FFE600]">
                  {totalActivePlayers}P READY
                </span>
                <span className="font-mono text-[8px] text-[#00F5D4] font-bold hidden sm:inline border-l border-white/20 pl-2">
                  {totalActivePlayers} {totalActivePlayers === 1 ? (language === 'id' ? 'PEMAIN ONLINE' : 'PLAYER ONLINE') : (language === 'id' ? 'PEMAIN ONLINE' : 'PLAYERS ONLINE')}
                </span>
                <span className="font-mono text-[8px] text-[#FF2A85] font-bold hidden sm:inline border-l border-white/20 pl-2">
                  {totalInGamePlayers} {language === 'id' ? 'SEDANG IN-GAME' : 'IN-GAME'}
                </span>
              </div>
            </div>

            <h1 className="font-['Press_Start_2P'] text-lg sm:text-2xl lg:text-3xl text-white tracking-wider text-shadow-retro mt-1 flex items-center gap-2">
              <span>{t('menu_home_title')}</span>
            </h1>

            <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-zinc-300 max-w-2xl">
              {t('menu_home_subtitle')}
            </p>
          </div>

          {/* Player Arcade Status Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onOpenBankModal();
              }}
              title="Arcade Vault & Coin Ledger"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-transform cursor-pointer"
            >
              <Coins className="w-4 h-4 text-black animate-spin-slow" />
              <div className="text-left">
                <div className="font-['Press_Start_2P'] text-[6px] opacity-75">CREDITS</div>
                <div className="font-['Press_Start_2P'] text-[9px] font-bold">
                  {coins.toLocaleString()} COINS
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                sound.playCrtBuzz();
                onToggleCrt();
              }}
              title="Toggle CRT Scanline Simulation"
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[8px] transition-all shadow-[3px_3px_0px_#000] cursor-pointer ${
                crtEnabled ? 'bg-[#00F5D4] text-black font-bold' : 'bg-black/60 text-zinc-300 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>CRT {crtEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Menu Grid: Selectable List (Left) + CRT Briefing Monitor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Selectable Game Menu Items (7 Cols on LG) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Press_Start_2P'] text-[9px] text-[#00F5D4] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
              {t('menu_category_core')}
            </span>
            <span className="font-mono text-[10px] text-zinc-400">
              10 MODES AVAILABLE // SELECT & ENTER
            </span>
          </div>

          {/* Menu Items Container */}
          <div className="space-y-2">
            {menuItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    handleLaunch(item);
                  }}
                  onMouseEnter={() => {
                    if (selectedIndex !== idx) {
                      sound.playClick();
                      setSelectedIndex(idx);
                    }
                  }}
                  className={`group relative rounded-xl border-2 transition-all duration-150 cursor-pointer p-3 sm:p-3.5 flex items-center justify-between gap-3 select-none ${
                    isSelected
                      ? 'border-white bg-[#1B1D2A] shadow-[4px_4px_0px_#000] translate-x-1.5'
                      : 'border-black/70 bg-[#12141F]/80 hover:bg-[#181A26] shadow-[2px_2px_0px_#000]'
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : undefined,
                    boxShadow: isSelected ? `5px 5px 0px #000, 0 0 15px ${item.color}40` : undefined,
                  }}
                >
                  {/* Left Side: Number, Cursor, Icon & Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Animated Cursor Arrow */}
                    <div className="w-4 sm:w-5 flex items-center justify-center shrink-0">
                      {isSelected ? (
                        <span
                          className="font-['Press_Start_2P'] text-[11px] sm:text-[13px] animate-bounce-right"
                          style={{ color: item.color }}
                        >
                          ▶
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400">
                          {item.number}
                        </span>
                      )}
                    </div>

                    {/* Icon Badge */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: isSelected ? item.color : '#252838',
                        color: isSelected ? '#000' : item.color,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Mode Title & Short Subtitle */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-['Press_Start_2P'] text-[9px] sm:text-[11px] tracking-wide truncate transition-colors"
                          style={{ color: isSelected ? item.color : '#FFFDF0' }}
                        >
                          {item.titleKey}
                        </span>
                      </div>
                      <p className="font-['Space_Grotesk'] text-[11px] sm:text-xs text-zinc-400 truncate mt-0.5">
                        {language === 'id' ? item.descId : item.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Badges & Action Arrow */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Real-Time In-Game Player Count Indicator */}
                    {(() => {
                      const sectionCount = sectionPlayerCounts[item.id as ArcadeSectionId] || 0;
                      return (
                        <div
                          title={`${sectionCount} ${
                            language === 'id' ? 'pemain sedang in-game di mode ini' : 'players in-game in this mode'
                          }`}
                          className={`flex items-center gap-1.5 px-2 py-0.5 sm:py-1 rounded-full border transition-all ${
                            sectionCount > 0
                              ? 'bg-emerald-950/90 border-emerald-400/80 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                              : isSelected
                              ? 'bg-black/95 border-[#00F5D4]/60 text-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.25)]'
                              : 'bg-black/70 border-white/10 text-zinc-500 group-hover:border-white/20 group-hover:text-zinc-300'
                          }`}
                        >
                          {sectionCount > 0 ? (
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                          )}
                          <span
                            className={`font-['Press_Start_2P'] text-[7px] sm:text-[7.5px] font-bold ${
                              sectionCount > 0 ? 'text-[#00F5D4]' : 'text-zinc-400'
                            }`}
                          >
                            {sectionCount}P
                          </span>
                          <span className="text-[6.5px] sm:text-[7px] font-mono text-zinc-400 uppercase tracking-tight hidden md:inline">
                            {language === 'id' ? 'IN-GAME' : 'IN-GAME'}
                          </span>
                        </div>
                      );
                    })()}

                    {item.statBadge && (
                      <span
                        className="hidden sm:inline-block px-2 py-0.5 rounded font-['Press_Start_2P'] text-[7px] border border-black/40 shadow-[1px_1px_0px_#000]"
                        style={{
                          backgroundColor: `${item.color}25`,
                          color: item.color,
                          borderColor: `${item.color}60`,
                        }}
                      >
                        {item.statBadge}
                      </span>
                    )}

                    <div
                      className={`w-7 h-7 rounded-md border border-black flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-white text-black shadow-[2px_2px_0px_#000]'
                          : 'bg-black/40 text-zinc-500 group-hover:text-white'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: CRT Mission Briefing & Mode Preview Screen (5 Cols on LG) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Press_Start_2P'] text-[9px] text-[#FFE600] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse" />
              {t('menu_preview_badge')}
            </span>
            <span className="font-mono text-[10px] text-zinc-400">
              HUD MONITOR // CH-01
            </span>
          </div>

          {/* CRT Monitor Housing */}
          <div
            className="rounded-xl border-3 border-black bg-[#10121C] p-5 sm:p-6 shadow-[6px_6px_0px_#000] relative overflow-hidden flex flex-col justify-between"
            style={{
              boxShadow: `6px 6px 0px #000, 0 0 25px ${activeItem.color}25`,
            }}
          >
            {/* Monitor Decorative Scanlines & Corners */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/30 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-white/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/30 pointer-events-none" />

            {/* Scanlines Effect Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-30 z-10" />

            {/* Header: Mode Number + Category */}
            <div className="relative z-20">
              <div className="flex items-center justify-between gap-2 border-b-2 border-black/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="font-['Press_Start_2P'] text-[9px] px-2 py-0.5 rounded border border-black font-bold shadow-[2px_2px_0px_#000]"
                    style={{ backgroundColor: activeItem.color, color: '#000' }}
                  >
                    MODE {activeItem.number}
                  </span>
                  <span className="font-['Press_Start_2P'] text-[8px] text-zinc-400">
                    {activeItem.badgeKey}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[9px]">
                  <span className="text-zinc-500 hidden sm:inline">[60Hz V-SYNC]</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Mode Large Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-xl border-3 border-black flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#000] animate-pulse"
                  style={{ backgroundColor: activeItem.color, color: '#000' }}
                >
                  <activeItem.icon className="w-8 h-8" />
                </div>

                <div>
                  <h2
                    className="font-['Press_Start_2P'] text-sm sm:text-base text-white tracking-wide"
                    style={{ color: activeItem.color }}
                  >
                    {activeItem.titleKey}
                  </h2>
                  <div className="inline-block mt-1 px-2 py-0.5 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-[#FFE600]">
                    {activeItem.coinsReward}
                  </div>
                </div>
              </div>

              {/* Description Prose */}
              <div className="rounded-lg bg-black/50 border border-white/10 p-3.5 mb-3 text-xs font-['Space_Grotesk'] text-zinc-200 leading-relaxed">
                {language === 'id' ? activeItem.descId : activeItem.descEn}
              </div>

              {/* Key Features Bullet Points */}
              <div className="space-y-1.5 mb-3">
                <div className="font-['Press_Start_2P'] text-[7.5px] text-zinc-400 uppercase mb-1">
                  // {language === 'id' ? 'FITUR UTAMA' : 'KEY FEATURES'}
                </div>
                {(language === 'id' ? activeItem.featureBulletsId : activeItem.featureBulletsEn).map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeItem.color }} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Oscilloscope HUD Visualizer */}
              <div className="rounded-lg bg-black/70 border border-white/10 p-2.5 mb-4 relative overflow-hidden">
                <div className="flex items-center justify-between text-[7px] font-mono text-zinc-400 mb-1.5 px-0.5">
                  <span className="flex items-center gap-1 font-bold" style={{ color: activeItem.color }}>
                    <Activity className="w-2.5 h-2.5 animate-pulse" />
                    <span>SIGNAL // {activeItem.number}</span>
                  </span>
                  <span className="text-[7px] text-zinc-500 font-mono">60 FPS // 44.1kHz DSP</span>
                </div>
                {/* Visualizer Wave Bars */}
                <div className="flex items-end justify-between gap-1 h-7 px-0.5">
                  {[45, 75, 30, 90, 60, 85, 40, 95, 70, 50, 80, 65, 90, 35, 75, 55, 85, 40, 95, 60].map((baseHeight, barIdx) => (
                    <div
                      key={barIdx}
                      className="flex-1 rounded-xs transition-all duration-300"
                      style={{
                        height: `${Math.max(18, (baseHeight + (barIdx % 3 === 0 ? 25 : -15)) % 100)}%`,
                        backgroundColor: activeItem.color,
                        opacity: 0.85,
                        boxShadow: `0 0 8px ${activeItem.color}88`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Real-time Mode Lobby & Player Telemetry */}
              <div className="rounded-lg bg-black/85 border-2 border-black p-3 mb-4 shadow-[3px_3px_0px_#000] space-y-2">
                <div className="flex items-center justify-between text-[8px] font-['Press_Start_2P']">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#00F5D4]" />
                    <span>{language === 'id' ? 'STATUS LOBBY REAL-TIME' : 'REAL-TIME LOBBY STATUS'}</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>ONLINE</span>
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-white/10 font-mono text-xs">
                  <span className="text-zinc-300 text-[11px]">
                    {language === 'id' ? 'Pemain Sedang In-Game di Mode Ini:' : 'Active Players In This Mode:'}
                  </span>
                  {(() => {
                    const activeModeInGame = sectionPlayerCounts[activeItem.id as ArcadeSectionId] || 0;
                    return (
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-['Press_Start_2P'] text-[9px] sm:text-[10px] font-bold ${
                            activeModeInGame > 0 ? 'text-[#00F5D4]' : 'text-zinc-400'
                          }`}
                        >
                          {activeModeInGame} {language === 'id' ? 'PEMAIN' : (activeModeInGame === 1 ? 'PLAYER' : 'PLAYERS')}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[7px] font-mono ${
                            activeModeInGame > 0
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-black/60 text-zinc-500 border border-white/10'
                          }`}
                        >
                          {activeModeInGame > 0 ? 'IN-GAME' : 'STANDBY'}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Launch Big Action Button */}
            <div className="relative z-20 space-y-2 pt-2 border-t-2 border-black/80">
              <button
                onClick={() => handleLaunch(activeItem)}
                disabled={isLaunching}
                className="w-full py-3.5 px-4 rounded-xl border-3 border-black font-['Press_Start_2P'] text-[10px] sm:text-[11px] text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                style={{ backgroundColor: activeItem.color }}
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{t('menu_launch_mode')}</span>
              </button>

              <div className="text-center font-mono text-[10px] text-zinc-400">
                {t('menu_insert_coin_blink')}
              </div>
            </div>
          </div>

          {/* Quick Cabinet Navigation Hotkeys Bar */}
          <div className="rounded-xl border-2 border-black bg-black/60 p-3 shadow-[3px_3px_0px_#000] text-center">
            <p className="font-mono text-[10px] text-zinc-400">
              {t('menu_hotkey_guide')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenuHome;
