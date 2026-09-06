import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Clock, Coins } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { triggerArcadeConfetti } from '../utils/arcadeConfetti';

interface TimeRewardBannerProps {
  coinsAwarded: number | null;
  onDismiss: () => void;
}

export const TimeRewardBanner: React.FC<TimeRewardBannerProps> = ({ coinsAwarded, onDismiss }) => {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  // Track if confetti and sound have already fired for the current reward event
  const isTriggeredRef = useRef(false);

  useEffect(() => {
    if (coinsAwarded !== null) {
      if (!isTriggeredRef.current) {
        isTriggeredRef.current = true;
        sound.playJackpot();
        triggerArcadeConfetti(window.innerWidth / 2, 80, 60);
      }

      const timer = setTimeout(() => {
        onDismissRef.current();
        isTriggeredRef.current = false;
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      isTriggeredRef.current = false;
    }
  }, [coinsAwarded]);

  if (coinsAwarded === null) return null;

  return (
    <div className="fixed top-18 right-4 z-50 max-w-sm sm:max-w-md animate-slide-in select-none">
      <div className="relative rounded-2xl border-3 border-black bg-gradient-to-r from-[#14161F] via-[#1E2230] to-[#14161F] p-4 shadow-[6px_6px_0px_#FFE600] text-white">
        {/* Animated Top Border Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFE600] via-[#FF2A85] to-[#00F5D4] rounded-t-xl" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]">
              <Coins className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  TIME BONUS
                </span>
                <Clock className="w-3.5 h-3.5 text-[#00F5D4]" />
              </div>

              <h4 className="font-['Syne'] font-black text-base text-[#FFE600] flex items-center gap-1">
                <span>+{coinsAwarded} COINS DITERIMA!</span>
                <Sparkles className="w-4 h-4 text-[#FFE600] animate-spin" />
              </h4>

              <p className="font-mono text-[11px] text-zinc-300 leading-tight">
                Terima kasih telah menjelajahi Erago Arcade selama 10 menit! Hadiah loyalitas koin telah ditambahkan.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              isTriggeredRef.current = false;
              onDismiss();
            }}
            className="flex h-6 w-6 items-center justify-center rounded border border-black bg-white/10 hover:bg-[#FF2A85] text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeRewardBanner;
