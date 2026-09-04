import { useEffect, useState } from 'react';
import { sound } from '../audio/soundEngine';

interface SlotMachineReelProps {
  activeTitle: string;
  isSpinning: boolean;
  titlesPool: string[];
}

export const SlotMachineReel: React.FC<SlotMachineReelProps> = ({
  activeTitle,
  isSpinning,
  titlesPool,
}) => {
  const [shufflingTitle, setShufflingTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!isSpinning) return;

    let count = 0;
    const maxTicks = 12;
    const interval = setInterval(() => {
      count++;
      const randomIdx = Math.floor(Math.random() * titlesPool.length);
      setShufflingTitle(titlesPool[randomIdx]);
      sound.playRoll(1 + count * 0.05);

      if (count >= maxTicks) {
        clearInterval(interval);
        setShufflingTitle(null);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isSpinning, titlesPool]);

  const displayTitle = isSpinning && shufflingTitle ? shufflingTitle : activeTitle;


  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-sm border-2 border-black bg-black/80 px-4 py-2 brutal-shadow-sm">
      {/* Decorative slot markers */}
      <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between py-1 text-[8px] text-[#FFE600] opacity-40">
        <span>▲</span>
        <span>▼</span>
      </div>
      <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-between py-1 text-[8px] text-[#FFE600] opacity-40">
        <span>▲</span>
        <span>▼</span>
      </div>

      <div
        className={`font-['Press_Start_2P'] text-xs sm:text-sm md:text-base font-bold tracking-wider text-[#00F5D4] transition-all duration-75 ${
          isSpinning ? 'animate-reel text-[#FFE600] scale-105' : ''
        }`}
      >
        {displayTitle}
      </div>
    </div>
  );
};
