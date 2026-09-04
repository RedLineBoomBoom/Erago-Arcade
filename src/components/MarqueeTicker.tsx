import React from 'react';

interface MarqueeTickerProps {
  text?: string;
  speed?: 'normal' | 'fast';
  bgClass?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  text,
  bgClass = 'bg-[#FFE600] text-black border-y-2 border-black',
}) => {
  const defaultItems = [
    '✦ ERAGO ARCADE MEMORY VAULT',
    '★ 100% UNHINGED GAMING SECRETS',

    '✦ INSERT COIN TO SHUFFLE',
    '★ RETRO CODE ARCHIVE',
    '✦ HARDWARE HACKS & GLITCH LORE',
    '★ NOSTALGIA OVERLOAD 90s-00s',
    '✦ PRESS [SPACEBAR] TO ROLL TRIVIA',
  ];

  const items = text ? [text, text, text, text] : defaultItems;

  return (
    <div className={`overflow-hidden py-1.5 font-['Press_Start_2P'] text-[10px] uppercase font-bold tracking-wider select-none ${bgClass}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="mx-6 inline-flex items-center gap-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
