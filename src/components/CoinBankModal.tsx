import React from 'react';
import { X, Coins, Clock, Sparkles, Gamepad2, Swords, RefreshCw } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { currencyManager } from '../utils/currencyManager';

interface CoinBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  accumulatedPoints: number;
  onOpenMiniGames: () => void;
  onOpenBossBattle: () => void;
}

export const CoinBankModal: React.FC<CoinBankModalProps> = ({
  isOpen,
  onClose,
  coins,
  accumulatedPoints,
  onOpenMiniGames,
  onOpenBossBattle,
}) => {
  if (!isOpen) return null;

  const { formatted, progressPercent } = currencyManager.getPlaytimeRemaining();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in select-none">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#FFE600] text-white my-auto overflow-hidden animate-scale-up">
        {/* Sticky Fixed Header */}
        <div className="flex items-center justify-between border-b-3 border-black px-4 sm:px-5 py-3 bg-[#0B0C10] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]">
              <Coins className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-base sm:text-lg text-white leading-tight">
                  ARCADE COIN VAULT
                </h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  BANK
                </span>
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                STATUS SALDO & SISTEM MATA UANG ERAGO
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

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-3.5">
          {/* Current Balance Display */}
          <div className="rounded-xl border-3 border-black bg-gradient-to-br from-[#1E2230] via-[#14161F] to-[#0B0C10] p-4 text-center space-y-1.5 shadow-[4px_4px_0px_#000]">
            <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
              SALDO SAAT INI
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <span className="text-2xl animate-bounce">🪙</span>
              <span className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-[#FFE600] tracking-tight">
                {coins.toLocaleString()}
              </span>
              <span className="font-['Press_Start_2P'] text-xs text-[#00F5D4]">COINS</span>
            </div>
          </div>

          {/* Status Dual Cards: Points Buffer & Time Reward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Points Progress */}
            <div className="rounded-xl border-2 border-black bg-[#1A1C26] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Poin Buffer:</span>
                <span className="text-[#00F5D4] font-bold">{accumulatedPoints} / 100 PTS</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-[#00F5D4] h-full transition-all duration-300"
                  style={{ width: `${accumulatedPoints}%` }}
                />
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                +{100 - accumulatedPoints} Poin lagi untuk auto-convert +10 Koin!
              </p>
            </div>

            {/* Time Progress */}
            <div className="rounded-xl border-2 border-black bg-[#1A1C26] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#FFE600]" /> Bonus 10 Menit:
                </span>
                <span className="text-[#FFE600] font-['Press_Start_2P'] text-[9px]">{formatted}</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-[#FFE600] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                Otomatis dapat <strong className="text-white">+100 Koin</strong> saat waktu habis!
              </p>
            </div>
          </div>

          {/* Currency Rules Table */}
          <div className="rounded-xl border-2 border-black bg-[#0B0C10] p-3.5 space-y-2">
            <div className="font-['Press_Start_2P'] text-[8px] text-[#FFE600] uppercase">
              ATURAN RESMI KOIN ARCADE:
            </div>

            <div className="space-y-1.5 font-mono text-xs text-zinc-300 divide-y divide-white/5">
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#FF2A85]" /> Roll Roulette Trivia:
                </span>
                <span className="font-bold text-[#FF2A85]">-10 Koin / spin</span>
              </div>

              <div className="flex items-center justify-between pt-1.5">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#00F5D4]" /> Mini Games (5 Game):
                </span>
                <span className="font-bold text-[#00F5D4]">100 Poin = +10 Koin</span>
              </div>

              <div className="flex items-center justify-between pt-1.5">
                <span className="flex items-center gap-2">
                  <Swords className="w-3.5 h-3.5 text-[#FFE600]" /> Trivia Boss Rush:
                </span>
                <span className="font-bold text-[#FFE600]">100 Poin = +10 Koin</span>
              </div>

              <div className="flex items-center justify-between pt-1.5">
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9D4EDD]" /> Hadiah Aktif Website:
                </span>
                <span className="font-bold text-[#9D4EDD]">+100 Koin / 10 menit</span>
              </div>

              <div className="flex items-center justify-between pt-1.5">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#00F5D4]" /> Modal Awal Pengguna:
                </span>
                <span className="font-bold text-white">2.000 Koin Gratis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Fixed Bottom Action Bar */}
        <div className="p-3 sm:p-4 bg-[#0B0C10] border-t-2 border-white/10 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenMiniGames();
            }}
            className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>MAIN MINI GAME</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenBossBattle();
            }}
            className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-black bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-colors"
          >
            <Swords className="w-4 h-4" />
            <span>LAWAN BOSS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinBankModal;
