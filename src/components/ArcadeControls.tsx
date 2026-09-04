import { useEffect } from 'react';
import { Sparkles, Coins, Disc3, Filter } from 'lucide-react';
import type { GameEra, TriviaTag } from '../types/trivia';
import { GAME_ERAS, TRIVIA_TAGS } from '../data/triviaData';
import { sound } from '../audio/soundEngine';


interface ArcadeControlsProps {
  onRoll: () => void;
  isRolling: boolean;
  selectedEra: GameEra;
  onSelectEra: (era: GameEra) => void;
  selectedTag: TriviaTag;
  onSelectTag: (tag: TriviaTag) => void;
  disabledHotkeys?: boolean;
}

export const ArcadeControls: React.FC<ArcadeControlsProps> = ({
  onRoll,
  isRolling,
  selectedEra,
  onSelectEra,
  selectedTag,
  onSelectTag,
  disabledHotkeys = false,
}) => {
  // Global spacebar listener to roll trivia
  useEffect(() => {
    if (disabledHotkeys) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        sound.playCoin();
        onRoll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRoll, disabledHotkeys]);


  const handleRollClick = () => {
    sound.playCoin();
    onRoll();
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-4 space-y-5">
      {/* Primary Arcade Trigger Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleRollClick}
          disabled={isRolling}
          data-cursor="INSERT COIN"
          className="group relative flex items-center justify-center gap-3 rounded-md border-3 border-black bg-[#FF2A85] px-8 py-4 font-['Syne'] text-lg sm:text-xl font-black text-black uppercase tracking-wider brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all disabled:opacity-75 disabled:pointer-events-none"
        >
          {/* Animated Coin Indicator */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE600] border-2 border-black group-hover:rotate-12 transition-transform">
            <Coins className={`h-5 w-5 text-black ${isRolling ? 'animate-spin' : ''}`} />
          </div>

          <div className="text-left">
            <div className="leading-tight text-black flex items-center gap-1.5">
              <span>{isRolling ? 'SHUFFLING MEMORY...' : 'INSERT COIN / ROLL'}</span>
              <Sparkles className="h-4 w-4 text-[#FFE600]" />
            </div>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-900 tracking-tighter block mt-0.5">
              PRESS [SPACEBAR] OR CLICK TO SHUFFLE
            </span>
          </div>
        </button>
      </div>

      {/* Filter Tabs Section (Decathlon Yestalgia Category Strip) */}
      <div className="rounded-lg border-2 border-black bg-[#14161F] p-3 sm:p-4 brutal-shadow-sm space-y-3">
        {/* Era Filter Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600] uppercase mr-2 flex items-center gap-1">
            <Disc3 className="h-3 w-3" /> ERA:
          </span>
          {GAME_ERAS.map((era) => {
            const active = selectedEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => {
                  sound.playClick();
                  onSelectEra(era.id);
                }}
                data-cursor={era.label}
                className={`rounded-xs border-2 border-black px-2.5 py-1 font-['Press_Start_2P'] text-[8px] transition-all ${
                  active
                    ? 'bg-[#00F5D4] text-black font-bold brutal-shadow-sm'
                    : 'bg-black/40 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{era.icon} </span>
                <span>{era.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tag Filter Row */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-black/50 pt-2.5">
          <span className="font-['Press_Start_2P'] text-[8px] text-[#FF2A85] uppercase mr-2 flex items-center gap-1">
            <Filter className="h-3 w-3" /> LORE:
          </span>
          {TRIVIA_TAGS.map((tag) => {
            const active = selectedTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTag(tag.id);
                }}
                data-cursor={tag.label}
                className={`rounded-xs border border-black px-2 py-0.5 font-['Space_Grotesk'] text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#FFE600] text-black border-2 brutal-shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
