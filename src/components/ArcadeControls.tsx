import { useEffect } from 'react';
import { Sparkles, Coins, Disc3, Filter } from 'lucide-react';
import type { GameEra, TriviaTag } from '../types/trivia';
import { GAME_ERAS, TRIVIA_TAGS } from '../data/triviaData';
import { sound } from '../audio/soundEngine';
import { useLanguage, translateEra, translateTag } from '../utils/i18n';


interface ArcadeControlsProps {
  onRoll: () => void;
  isRolling: boolean;
  selectedEra: GameEra;
  onSelectEra: (era: GameEra) => void;
  selectedTag: TriviaTag;
  onSelectTag: (tag: TriviaTag) => void;
  disabledHotkeys?: boolean;
  coins?: number;
}

export const ArcadeControls: React.FC<ArcadeControlsProps> = ({
  onRoll,
  isRolling,
  selectedEra,
  onSelectEra,
  selectedTag,
  onSelectTag,
  disabledHotkeys = false,
  coins = 2000,
}) => {
  const { language, t } = useLanguage();

  // Global spacebar listener to roll trivia
  useEffect(() => {
    if (disabledHotkeys) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        onRoll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRoll, disabledHotkeys]);


  const handleRollClick = () => {
    onRoll();
  };

  const hasEnoughCoins = coins >= 10;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-4 space-y-5">
      {/* Primary Arcade Trigger Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleRollClick}
          disabled={isRolling}
          data-cursor={hasEnoughCoins ? (language === 'id' ? "MASUKKAN 10 KOIN" : "INSERT 10 COINS") : (language === 'id' ? "BUTUH 10 KOIN" : "NEED 10 COINS")}
          className={`group relative flex items-center justify-center gap-3 rounded-md border-3 border-black px-8 py-4 font-['Syne'] text-lg sm:text-xl font-black text-black uppercase tracking-wider brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all disabled:opacity-75 disabled:pointer-events-none ${
            hasEnoughCoins ? 'bg-[#FF2A85]' : 'bg-[#FF5555]'
          }`}
        >
          {/* Animated Coin Indicator */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE600] border-2 border-black group-hover:rotate-12 transition-transform">
            <Coins className={`h-5 w-5 text-black ${isRolling ? 'animate-spin' : ''}`} />
          </div>

          <div className="text-left">
            <div className="leading-tight text-black flex items-center gap-2">
              <span>{isRolling ? t('roll_btn_shuffling') : t('roll_btn_roll')}</span>
              <span className="px-1.5 py-0.5 rounded bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold border border-black shadow-[1px_1px_0px_#000]">
                -10 🪙
              </span>
              <Sparkles className="h-4 w-4 text-[#FFE600]" />
            </div>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-900 tracking-tighter block mt-0.5">
              {hasEnoughCoins 
                ? t('roll_subtext_ready') 
                : t('roll_subtext_insufficient')}
            </span>
          </div>
        </button>
      </div>

      {/* Filter Tabs Section (Decathlon Yestalgia Category Strip) */}
      <div className="rounded-lg border-2 border-black bg-[#14161F] p-3 sm:p-4 brutal-shadow-sm space-y-3">
        {/* Era Filter Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600] uppercase mr-2 flex items-center gap-1">
            <Disc3 className="h-3 w-3" /> {t('filter_era_label')}
          </span>
          {GAME_ERAS.map((era) => {
            const active = selectedEra === era.id;
            const eraTranslated = translateEra(era.id, language);
            return (
              <button
                key={era.id}
                onClick={() => {
                  sound.playClick();
                  onSelectEra(era.id);
                }}
                data-cursor={eraTranslated}
                className={`rounded-xs border-2 border-black px-2.5 py-1 font-['Press_Start_2P'] text-[8px] transition-all ${
                  active
                    ? 'bg-[#00F5D4] text-black font-bold brutal-shadow-sm'
                    : 'bg-black/40 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{era.icon} </span>
                <span>{eraTranslated}</span>
              </button>
            );
          })}
        </div>

        {/* Tag Filter Row */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-black/50 pt-2.5">
          <span className="font-['Press_Start_2P'] text-[8px] text-[#FF2A85] uppercase mr-2 flex items-center gap-1">
            <Filter className="h-3 w-3" /> {t('filter_lore_label')}
          </span>
          {TRIVIA_TAGS.map((tag) => {
            const active = selectedTag === tag.id;
            const tagTranslated = translateTag(tag.id, language);
            return (
              <button
                key={tag.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTag(tag.id);
                }}
                data-cursor={tagTranslated}
                className={`rounded-xs border border-black px-2 py-0.5 font-['Space_Grotesk'] text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#FFE600] text-black border-2 brutal-shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                }`}
              >
                {tagTranslated}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
