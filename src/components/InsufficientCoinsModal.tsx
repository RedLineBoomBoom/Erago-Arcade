import React, { useEffect, useState } from 'react';
import { X, Coins, Swords, Gamepad2, Clock, AlertTriangle } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { currencyManager, BOSS_CLEAR_REWARD_COINS } from '../utils/currencyManager';
import { useLanguage } from '../utils/i18n';

interface InsufficientCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMiniGames: () => void;
  onOpenBossBattle: () => void;
  currentCoins: number;
}

export const InsufficientCoinsModal: React.FC<InsufficientCoinsModalProps> = ({
  isOpen,
  onClose,
  onOpenMiniGames,
  onOpenBossBattle,
  currentCoins,
}) => {
  const { language, t } = useLanguage();
  const [playtime, setPlaytime] = useState(() => currencyManager.getPlaytimeRemaining());

  // Close on Escape key
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

  // Live countdown timer while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Subscribe to currencyManager which emits every second
    const unsub = currencyManager.subscribe(() => {
      setPlaytime(currencyManager.getPlaytimeRemaining());
    });

    // Secondary interval ticker for guaranteed 1000ms live ticks
    const intervalId = window.setInterval(() => {
      setPlaytime(currencyManager.getPlaytimeRemaining());
    }, 1000);

    return () => {
      unsub();
      clearInterval(intervalId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { formatted, progressPercent } = playtime;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      {/* Modal Container with strict viewport constraints and scrolling */}
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#FF2A85] text-white overflow-hidden animate-scale-up my-auto">
        {/* Fixed Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3.5 bg-[#0B0C10] border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white shadow-[2px_2px_0px_#000]">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-base sm:text-lg text-white">
                  {t('insufficient_title')}
                </h2>
                <span className="px-1.5 py-0.5 rounded-xs bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[6px] font-bold">
                  CREDITS: 0
                </span>
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                {t('insufficient_subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            title={language === 'id' ? 'Tutup (Esc)' : 'Close (Esc)'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black font-bold transition-all shadow-[2px_2px_0px_#000]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-3.5">
          {/* Balance Status Box */}
          <div className="rounded-xl border-3 border-black bg-[#0B0C10] p-3.5 text-center space-y-1.5 shadow-[3px_3px_0px_#000]">
            <div className="flex items-center justify-center gap-2">
              <Coins className="w-5 h-5 text-[#FFE600] animate-pulse" />
              <span className="font-['Press_Start_2P'] text-lg sm:text-xl text-[#FFE600]">
                {currentCoins} <span className="text-[10px] text-zinc-400">{t('coins_label')}</span>
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-300">
              {language === 'id' ? 'Setiap putaran roulette trivia membutuhkan ' : 'Each trivia roulette roll requires '}
              <strong className="text-[#FF2A85]">{language === 'id' ? '10 Koin' : '10 Coins'}</strong>.
            </p>
          </div>

          {/* How to Earn Coins Section */}
          <div className="space-y-2.5">
            <div className="font-['Press_Start_2P'] text-[7px] text-[#00F5D4] uppercase tracking-wider">
              {t('insufficient_how_to')}
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Play Mini Games */}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onOpenMiniGames();
                }}
                className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-[#1E2230] hover:bg-[#00F5D4] hover:text-black transition-all group shadow-[3px_3px_0px_#000] text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 border border-white/10 group-hover:bg-black group-hover:text-[#00F5D4] text-xl">
                    <Gamepad2 className="w-5 h-5 text-[#00F5D4] group-hover:text-[#00F5D4]" />
                  </div>
                  <div>
                    <div className="font-['Syne'] font-black text-xs sm:text-sm group-hover:text-black">
                      {language === 'id' ? 'MAIN MINI GAME (5 GAME)' : 'PLAY MINI GAMES (5 GAMES)'}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-400 group-hover:text-black/80">
                      {language === 'id' ? 'Setiap 100 Poin yang diraih = 10 Koin!' : 'Every 100 Points earned = 10 Coins!'}
                    </div>
                  </div>
                </div>
                <span className="font-['Press_Start_2P'] text-[8px] px-2 py-1 rounded bg-[#00F5D4] text-black font-bold group-hover:bg-black group-hover:text-white">
                  {language === 'id' ? 'MAIN ➔' : 'PLAY ➔'}
                </span>
              </button>

              {/* Boss Battle */}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onOpenBossBattle();
                }}
                className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-[#1E2230] hover:bg-[#FF2A85] hover:text-white transition-all group shadow-[3px_3px_0px_#000] text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 border border-white/10 group-hover:bg-black text-xl">
                    <Swords className="w-5 h-5 text-[#FF2A85] group-hover:text-[#FF2A85]" />
                  </div>
                  <div>
                    <div className="font-['Syne'] font-black text-xs sm:text-sm">
                      TRIVIA BOSS RUSH
                    </div>
                    <div className="font-mono text-[10px] text-zinc-400 group-hover:text-white/90">
                      {language === 'id' ? `Kalahkan boss & dapat +${BOSS_CLEAR_REWARD_COINS} Koin!` : `Defeat boss & get +${BOSS_CLEAR_REWARD_COINS} Coins!`}
                    </div>
                  </div>
                </div>
                <span className="font-['Press_Start_2P'] text-[8px] px-2 py-1 rounded bg-[#FF2A85] text-white font-bold group-hover:bg-black">
                  {language === 'id' ? 'LAWAN ➔' : 'FIGHT ➔'}
                </span>
              </button>

              {/* Time Bonus Reminder */}
              <div className="p-3 rounded-xl border-2 border-black bg-[#1E2230] shadow-[2px_2px_0px_#000] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
                    <span className="text-zinc-300">
                      {language === 'id' ? 'Hadiah Waktu Pasif:' : 'Passive Time Reward:'} <strong className="text-[#FFE600]">+100 Koin</strong> {language === 'id' ? '/ 10 menit' : '/ 10 mins'}
                    </span>
                  </div>
                  <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600]">
                    {formatted}
                  </span>
                </div>
                <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-[#FFE600] to-[#00F5D4] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Sticky Footer */}
        <div className="shrink-0 p-3 sm:p-4 bg-[#0B0C10] border-t-2 border-black flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-lg border-2 border-black bg-zinc-700 hover:bg-white text-white hover:text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] transition-colors"
          >
            {language === 'id' ? 'TUTUP' : 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientCoinsModal;
