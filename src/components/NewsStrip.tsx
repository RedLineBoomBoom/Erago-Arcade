import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { NEWS_OUTLETS_DATABASE } from '../data/newsOutletsData';
import { sound } from '../audio/soundEngine';

interface NewsStripProps {
  onOpenNewsView: () => void;
}

export const NewsStrip: React.FC<NewsStripProps> = ({ onOpenNewsView }) => {
  const handleOutletClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-2">
      <div className="rounded-xl border-3 border-black bg-[#14161F] p-4 shadow-[4px_4px_0px_#000] space-y-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-[#FFE600] text-black border border-black text-sm">
              📰
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Syne'] font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                  GAMING & ENTERTAINMENT PRESS WIRE
                </span>
                <span className="px-1.5 py-0.2 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold">
                  12 OUTLETS
                </span>
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                Akses berita game terpercaya langsung dari portal internasional resmi
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenNewsView();
            }}
            data-cursor="NEWS"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-black bg-[#FFE600] text-black hover:bg-white font-['Press_Start_2P'] text-[7px] font-bold shadow-[2px_2px_0px_#000] transition-colors shrink-0"
          >
            <span>SEMUA</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Quick Outlet Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {NEWS_OUTLETS_DATABASE.map((outlet) => (
            <button
              key={outlet.id}
              onClick={(e) => handleOutletClick(e, outlet.url)}
              data-cursor={outlet.name}
              title={`Buka ${outlet.name} (${outlet.url})`}
              className="flex items-center justify-between p-2 rounded-lg border-2 border-black bg-[#1E2230] hover:bg-white text-white hover:text-black font-mono text-[11px] font-bold transition-all shadow-[2px_2px_0px_#000] group text-left"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs">{outlet.icon}</span>
                <span className="truncate">{outlet.name}</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-black shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsStrip;
