import { useState, useEffect, useCallback, useMemo } from 'react';
import { TRIVIA_DATABASE } from './data/triviaData';
import type { TriviaItem, GameEra, TriviaTag, ViewMode } from './types/trivia';
import { sound } from './audio/soundEngine';

import { Navbar } from './components/Navbar';
import { TriviaCard } from './components/TriviaCard';
import { ArcadeControls } from './components/ArcadeControls';
import { SlotMachineReel } from './components/SlotMachineReel';
import { LookbookArchive } from './components/LookbookArchive';
import { QuizMode } from './components/QuizMode';
import { CheatCodesPage } from './components/CheatCodesPage';
import { MarqueeTicker } from './components/MarqueeTicker';
import { CrtOverlay } from './components/CrtOverlay';
import { CharacterSpotlightWing } from './components/CharacterSpotlightWing';
import { GameArtifactWing } from './components/GameArtifactWing';
import { MobilePhotoCompanion } from './components/MobilePhotoCompanion';
import { CustomCursor } from './components/CustomCursor';
import { TrophyCaseModal } from './components/TrophyCaseModal';
import { ArcadeSoundboard } from './components/ArcadeSoundboard';
import { StickerBombCanvas } from './components/StickerBombCanvas';
import { BonusStageMiniGame } from './components/BonusStageMiniGame';
import { ArcadeWallpaper } from './components/ArcadeWallpaper';
import { ArcadeJukeboxModal } from './components/ArcadeJukeboxModal';
import { BossBattleModal } from './components/BossBattleModal';
import { CabinetThemeModal } from './components/CabinetThemeModal';
import { DosTerminalModal } from './components/DosTerminalModal';
import { CardBinderModal } from './components/CardBinderModal';
import { InsufficientCoinsModal } from './components/InsufficientCoinsModal';
import { CoinBankModal } from './components/CoinBankModal';
import { GamingNewsModal } from './components/GamingNewsModal';
import { SteamSalesModal } from './components/SteamSalesModal';
import { TimeRewardBanner } from './components/TimeRewardBanner';
import { VaultTamperBanner } from './components/VaultTamperBanner';
import { GamingNewsSection } from './components/GamingNewsSection';
import { SteamSalesPage } from './components/SteamSalesPage';
import { SteamSalesStrip } from './components/SteamSalesStrip';
import { NewsStrip } from './components/NewsStrip';
import { ConsoleBootLoader } from './components/ConsoleBootLoader';
import { currencyManager, ROLL_COST } from './utils/currencyManager';
import type { TamperIncident } from './utils/securityLedger';
import { getActiveTheme, setActiveTheme } from './utils/themeManager';
import { unlockAchievement } from './utils/achievements';
import { useLanguage } from './utils/i18n';

export function App() {
  const { toggleLanguage, t } = useLanguage();

  // Random trivia selected instantly upon opening the website
  const [activeTrivia, setActiveTrivia] = useState<TriviaItem>(() => {
    const randomIndex = Math.floor(Math.random() * TRIVIA_DATABASE.length);
    return TRIVIA_DATABASE[randomIndex];
  });

  const [isRolling, setIsRolling] = useState(false);
  const [selectedEra, setSelectedEra] = useState<GameEra>('All');
  const [selectedTag, setSelectedTag] = useState<TriviaTag>('All');
  const [currentView, setCurrentView] = useState<ViewMode>('arcade');
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  // Entertaining Arcade Toys & Expansions Modals
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState(false);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);
  const [isStickerModeActive, setIsStickerModeActive] = useState(false);
  const [isBonusStageOpen, setIsBonusStageOpen] = useState(false);
  const [isJukeboxOpen, setIsJukeboxOpen] = useState(false);
  const [isBossBattleOpen, setIsBossBattleOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCardBinderOpen, setIsCardBinderOpen] = useState(false);
  const [isInsufficientCoinsOpen, setIsInsufficientCoinsOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [newsOutletFilter, setNewsOutletFilter] = useState<string>('all');
  const [timeRewardCoins, setTimeRewardCoins] = useState<number | null>(null);
  const [tamperIncident, setTamperIncident] = useState<TamperIncident | null>(null);
  const [coins, setCoins] = useState<number>(() => currencyManager.getCoins());
  const [accumulatedPoints, setAccumulatedPoints] = useState<number>(() => currencyManager.getAccumulatedPoints());

  // Apply active console theme on mount and subscribe to currency
  useEffect(() => {
    setActiveTheme(getActiveTheme());
    const unsub = currencyManager.subscribe((state) => {
      setCoins(state.coins);
      setAccumulatedPoints(state.accumulatedPoints);
    });
    const unsubReward = currencyManager.onTimeReward((awarded) => {
      setTimeRewardCoins(awarded);
    });
    const unsubTamper = currencyManager.onTamperDetected((incident) => {
      setTamperIncident(incident);
    });
    return () => {
      unsub();
      unsubReward();
      unsubTamper();
    };
  }, []);

  // Global hotkey to toggle language [Hotkey: L]
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'KeyL') {
        e.preventDefault();
        toggleLanguage();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [toggleLanguage]);


  // Track discovered trivia cartridges
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(() => {
    return new Set<string>([TRIVIA_DATABASE[0].id]);
  });

  // Filter pool based on selected era and tag
  const filteredPool = useMemo(() => {
    return TRIVIA_DATABASE.filter((item) => {
      const matchEra = selectedEra === 'All' || item.era === selectedEra;
      const matchTag = selectedTag === 'All' || item.tag === selectedTag;
      return matchEra && matchTag;
    });
  }, [selectedEra, selectedTag]);

  // Roll new trivia with slot animation (Costs 10 Coins)
  const handleRollTrivia = useCallback(() => {
    if (isRolling) return;

    // Check coin balance (10 coins per roll)
    const success = currencyManager.spendCoins(ROLL_COST);
    if (!success) {
      sound.playError();
      setIsInsufficientCoinsOpen(true);
      return;
    }

    sound.playCoin();
    setIsRolling(true);
    unlockAchievement('FIRST_COIN');

    const pool = filteredPool.length > 0 ? filteredPool : TRIVIA_DATABASE;
    // Exclude current item if pool has more than 1 item
    const candidates = pool.filter((item) => item.id !== activeTrivia.id);
    const chosenList = candidates.length > 0 ? candidates : pool;
    const nextItem = chosenList[Math.floor(Math.random() * chosenList.length)];

    setTimeout(() => {
      setActiveTrivia(nextItem);
      setUnlockedIds((prev) => new Set([...prev, nextItem.id]));
      setIsRolling(false);
      sound.playJackpot();
    }, 550);
  }, [isRolling, filteredPool, activeTrivia.id]);

  // Check if any foreground modal or mini-game is open
  const isAnyModalOpen =
    isBooting ||
    isBonusStageOpen ||
    isTrophyModalOpen ||
    isSoundboardOpen ||
    isJukeboxOpen ||
    isBossBattleOpen ||
    isThemeModalOpen ||
    isTerminalOpen ||
    isCardBinderOpen ||
    isInsufficientCoinsOpen ||
    isBankModalOpen ||
    isNewsModalOpen ||
    isSalesModalOpen;

  // Hotkey listeners for CRT ('c'), Mute ('m'), Sales ('s'), and Terminal ('~')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      // Terminal shortcut toggle
      if (e.key === '`' || e.key === '~') {
        sound.playClick();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      if (isAnyModalOpen) return;

      if (e.key === 's' || e.key === 'S') {
        sound.playClick();
        setIsSalesModalOpen(true);
        return;
      }

      if (e.key === 'c' || e.key === 'C') {
        sound.playCrtBuzz();
        setCrtEnabled((prev) => {
          const next = !prev;
          if (next) unlockAchievement('CRT_PURIST');
          return next;
        });
      }
      if (e.key === 'm' || e.key === 'M') {
        sound.toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (typeof window !== 'undefined') {
      (window as unknown as { __openTerminal?: () => void }).__openTerminal = () => setIsTerminalOpen(true);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnyModalOpen]);



  // Title list for slot reel
  const allTitles = useMemo(() => TRIVIA_DATABASE.map((t) => t.gameTitle), []);

  return (
    <div className={`relative min-h-screen text-[#FFFDF0] flex flex-col justify-between selection:bg-[#FF2A85] selection:text-black w-full max-w-full overflow-x-hidden ${crtEnabled ? 'crt-screen' : ''}`}>
      {/* Custom Retro Magnetic Cursor */}
      <CustomCursor />

      {/* CRT Scanlines Overlay */}
      <CrtOverlay enabled={crtEnabled} />

      {/* Neo-Retro Arcade Ambient Wallpaper & Synthwave Grid Horizon */}
      <ArcadeWallpaper />

      {/* Foreground Interactive Page Layout */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between w-full max-w-full overflow-x-hidden">
        {/* Main Header Navbar */}
        <div className="w-full relative z-40">
          <Navbar

          currentView={currentView}
          onViewChange={setCurrentView}
          crtEnabled={crtEnabled}
          onToggleCrt={() => setCrtEnabled(!crtEnabled)}
          unlockedCount={unlockedIds.size}
          totalCount={TRIVIA_DATABASE.length}
          onOpenTrophies={() => setIsTrophyModalOpen(true)}
          onOpenSoundboard={() => setIsSoundboardOpen(true)}
          isStickerModeActive={isStickerModeActive}
          onToggleStickers={() => setIsStickerModeActive((prev) => !prev)}
          onOpenBonusStage={() => setIsBonusStageOpen(true)}
          onOpenJukebox={() => setIsJukeboxOpen(true)}
          onOpenBossBattle={() => setIsBossBattleOpen(true)}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenCardBinder={() => setIsCardBinderOpen(true)}
          onOpenBankModal={() => setIsBankModalOpen(true)}
          onOpenNewsModal={() => {
            setNewsOutletFilter('all');
            setIsNewsModalOpen(true);
          }}
          onOpenSalesModal={() => setIsSalesModalOpen(true)}
          onRebootConsole={() => setIsBooting(true)}
        />



        {/* Top Memphis Marquee Ticker */}
        <MarqueeTicker speed="normal" />
      </div>

      {/* Dynamic Content Views */}
      <main className="flex-1 py-4 sm:py-6 w-full max-w-full overflow-x-hidden">
        {currentView === 'arcade' && (
          <div className="space-y-4 w-full max-w-full">
            {/* Slot Reel Bar */}
            <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
              <div className="flex items-center gap-2">
                <span className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-zinc-400">
                  {t('memory_cartridge_label')}
                </span>
              </div>
              <SlotMachineReel
                activeTitle={activeTrivia.gameTitle}
                isSpinning={isRolling}
                titlesPool={allTitles}
              />
            </div>

            {/* Mobile Companion Photo Strip for screens < xl */}
            <MobilePhotoCompanion item={activeTrivia} />

            {/* Main Stage: Left Wing (Character) + Center (3D Card) + Right Wing (Game Box Art) */}
            <div className="relative mx-auto w-full max-w-[1720px] px-2 sm:px-4 lg:px-6">
              <div className="flex items-start justify-center gap-4 2xl:gap-8 w-full max-w-full min-w-0">
                {/* Left Side: Character / Hero Spotlight */}
                <CharacterSpotlightWing key={`char-${activeTrivia.id}`} item={activeTrivia} />

                {/* Center 3D Holographic Interactive Trivia Card with Cartridge Slam Animation */}
                <div key={`card-${activeTrivia.id}`} className="w-full max-w-4xl min-w-0 animate-cartridge-slam">
                  <TriviaCard

                    item={activeTrivia}
                    onOpenQuizModal={() => setCurrentView('quiz')}
                  />
                </div>

                {/* Right Side: Game Box Art / Cartridge Artifact */}
                <GameArtifactWing key={`box-${activeTrivia.id}`} item={activeTrivia} />

              </div>
            </div>


            {/* Arcade Controls & Filter Strip */}
            <ArcadeControls
              onRoll={handleRollTrivia}
              isRolling={isRolling}
              selectedEra={selectedEra}
              onSelectEra={setSelectedEra}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              disabledHotkeys={isAnyModalOpen}
              coins={coins}
            />

            {/* Standalone Real-Time Steam Game Sales Section (Above News Strip) */}
            <SteamSalesStrip
              onOpenSalesTab={() => setCurrentView('sales')}
              onOpenSalesModal={() => setCurrentView('sales')}
            />

            {/* Quick Access Gaming News Press Wire Strip */}
            <NewsStrip
              onOpenNewsModal={(outletId) => {
                setNewsOutletFilter(outletId || 'all');
                setIsNewsModalOpen(true);
              }}
            />

          </div>
        )}

        {currentView === 'lookbook' && (
          <LookbookArchive
            items={TRIVIA_DATABASE}
            onSelectTrivia={(item) => {
              setActiveTrivia(item);
              setCurrentView('arcade');
            }}
          />
        )}

        {currentView === 'quiz' && (
          <QuizMode
            triviaList={TRIVIA_DATABASE}
            onBackToArcade={() => setCurrentView('arcade')}
          />
        )}

        {currentView === 'cheats' && (
          <CheatCodesPage />
        )}

        {currentView === 'news' && (
          <GamingNewsSection onBackToArcade={() => setCurrentView('arcade')} />
        )}

        {currentView === 'sales' && (
          <SteamSalesPage onBackToArcade={() => setCurrentView('arcade')} />
        )}
      </main>


      {/* Bottom Retro Marquee & Footer */}
      <footer className="relative z-10 border-t-3 border-black bg-[#0B0C10]/95 backdrop-blur-sm mt-8">
        <MarqueeTicker
          text={t('marquee_bottom')}
          bgClass="bg-[#00F5D4] text-black border-b-2 border-black"
        />

        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-['Space_Grotesk']">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <img 
              src="/images/erago-logo.png" 
              alt="ERAGO" 
              className="h-4.5 w-auto object-contain opacity-90" 
            />
            <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600]">
              ARCADE
            </span>
            <span className="hidden sm:inline">— {t('footer_tagline')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-zinc-400">
            <span>{t('footer_space')}</span>
            <span>{t('footer_crt')}</span>
            <span>{t('footer_mute')}</span>
            <span>{t('footer_lang')}</span>
          </div>
        </div>
      </footer>
    </div>



      {/* 1. Trophy Case Modal & Achievement System */}
      <TrophyCaseModal 
        isOpen={isTrophyModalOpen} 
        onClose={() => setIsTrophyModalOpen(false)} 
      />

      {/* 2. Pocket Arcade SFX Soundboard */}
      <ArcadeSoundboard 
        isOpen={isSoundboardOpen} 
        onClose={() => setIsSoundboardOpen(false)} 
      />

      {/* 3. 90s Sticker Bomb Canvas Overlay */}
      <StickerBombCanvas 
        isActive={isStickerModeActive} 
        onToggle={() => setIsStickerModeActive((prev) => !prev)} 
      />

      {/* 4. Bonus Stage: Arcade Mini-Game Library */}
      <BonusStageMiniGame 
        isOpen={isBonusStageOpen} 
        onClose={() => setIsBonusStageOpen(false)} 
      />

      {/* 5. Arcade Chiptune FM Jukebox & Spectrum Visualizer */}
      <ArcadeJukeboxModal
        isOpen={isJukeboxOpen}
        onClose={() => setIsJukeboxOpen(false)}
      />

      {/* 6. Trivia Boss Rush: RPG Battle Mode */}
      <BossBattleModal
        isOpen={isBossBattleOpen}
        onClose={() => setIsBossBattleOpen(false)}
      />

      {/* 7. Retro Cabinet Display Theme Customizer */}
      <CabinetThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* 8. MS-DOS Vintage C:\ERAGO> Command Prompt */}
      <DosTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onReboot={() => setIsBooting(true)}
      />

      {/* 9. 90s Holographic Trading Card Binder */}
      <CardBinderModal
        isOpen={isCardBinderOpen}
        onClose={() => setIsCardBinderOpen(false)}
        discoveredIds={unlockedIds}
      />

      {/* 10. Insufficient Coins Arcade Warning & Refill Options */}
      <InsufficientCoinsModal
        isOpen={isInsufficientCoinsOpen}
        onClose={() => setIsInsufficientCoinsOpen(false)}
        onOpenMiniGames={() => setIsBonusStageOpen(true)}
        onOpenBossBattle={() => setIsBossBattleOpen(true)}
        currentCoins={coins}
      />

      {/* 11. Passive 10-Minute Playtime Reward Banner Toast */}
      <TimeRewardBanner
        coinsAwarded={timeRewardCoins}
        onDismiss={() => setTimeRewardCoins(null)}
      />

      {/* Cryptographic Anti-Tamper Security Violation Toast */}
      <VaultTamperBanner
        incident={tamperIncident}
        onDismiss={() => setTamperIncident(null)}
      />

      {/* 12. Arcade Coin Bank & Rewards Information Modal */}
      <CoinBankModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        coins={coins}
        accumulatedPoints={accumulatedPoints}
        onOpenMiniGames={() => setIsBonusStageOpen(true)}
        onOpenBossBattle={() => setIsBossBattleOpen(true)}
      />

      {/* 13. Gaming & Entertainment News Popup Modal (12 Outlets) */}
      <GamingNewsModal
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        initialOutletId={newsOutletFilter}
      />

      {/* 14. Real-Time Steam Game Sales & SteamDB Tracker Modal */}
      <SteamSalesModal
        isOpen={isSalesModalOpen}
        onClose={() => setIsSalesModalOpen(false)}
      />

      {/* 15. Retro Console Boot Loader & Power-On Sequence */}
      {isBooting && (
        <ConsoleBootLoader
          onComplete={() => setIsBooting(false)}
          onSkip={() => setIsBooting(false)}
        />
      )}
    </div>

  );

}

export default App;
