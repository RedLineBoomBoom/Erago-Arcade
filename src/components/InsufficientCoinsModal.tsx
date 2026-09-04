import React from 'react';
import { X, Coins, Swords, Gamepad2, Clock, AlertTriangle } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { currencyManager } from '../utils/currencyManager';

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
  if (!isOpen) return null;

  const { formatted, progressPercent } = currencyManager.getPlaytimeRemaining();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg rounded-2xl border-4 border-black bg-[#14161F] p-5 sm:p-6 shadow-[8px_8px_0px_#000] space-y-5 text-white animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white shadow-[2px_2px_0px_#000]">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg sm:text-xl text-white">
                  INSUFFICIENT COINS!
                </h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[7px] font-bold">
                  CREDITS: 0
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">
                KOIN TIDAK CUKUP UNTUK MEMUTAR TRIVIA
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black font-bold transition-all shadow-[2px_2px_0px_#000]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance Status Box */}
        <div className="rounded-xl border-3 border-black bg-[#0B0C10] p-4 text-center space-y-2 shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-center gap-2">
            <Coins className="w-6 h-6 text-[#FFE600] animate-pulse" />
            <span className="font-['Press_Start_2P'] text-xl sm:text-2xl text-[#FFE600]">
              {currentCoins} <span className="text-xs text-zinc-400">COINS</span>
            </span>
          </div>
          <p className="font-mono text-xs text-zinc-300">
            Setiap putaran roulette trivia membutuhkan <strong className="text-[#FF2A85]">10 Koin</strong>.
          </p>
        </div>

        {/* How to Earn Coins Section */}
        <div className="space-y-3">
          <div className="font-['Press_Start_2P'] text-[8px] text-[#00F5D4] uppercase tracking-wider">
            CARA MENDAPATKAN KOIN:
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
                  <div className="font-['Syne'] font-black text-sm group-hover:text-black">
                    MAIN MINI GAME (5 GAMES)
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 group-hover:text-black/80">
                    Setiap 100 Poin yang diraih = 10 Koin!
                  </div>
                </div>
              </div>
              <span className="font-['Press_Start_2P'] text-[9px] px-2 py-1 rounded bg-[#00F5D4] text-black font-bold group-hover:bg-black group-hover:text-white">
                PLAY ➔
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
                  <div className="font-['Syne'] font-black text-sm">
                    TRIVIA BOSS RUSH
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 group-hover:text-white/90">
                    Serang boss & menang untuk dapat koin berlimpah!
                  </div>
                </div>
              </div>
              <span className="font-['Press_Start_2P'] text-[9px] px-2 py-1 rounded bg-[#FF2A85] text-white font-bold group-hover:bg-black">
                FIGHT ➔
              </span>
            </button>

            {/* Time Bonus Reminder */}
            <div className="p-3 rounded-xl border-2 border-black bg-[#1E2230] shadow-[3px_3px_0px_#000] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFE600]" />
                  <span className="text-zinc-300">
                    Hadiah Waktu Pasif: <strong className="text-[#FFE600]">+100 Koin</strong> / 10 menit
                  </span>
                </div>
                <span className="font-['Press_Start_2P'] text-[9px] text-[#FFE600]">
                  {formatted}
                </span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-[#FFE600] to-[#00F5D4] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-lg border-2 border-black bg-zinc-700 hover:bg-white text-white hover:text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] transition-colors"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientCoinsModal;
