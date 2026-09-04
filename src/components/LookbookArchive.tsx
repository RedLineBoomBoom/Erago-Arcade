import { useState } from 'react';
import { Search, Gamepad2, Sparkles, ArrowUpRight } from 'lucide-react';
import type { TriviaItem, GameEra, TriviaTag } from '../types/trivia';
import { GAME_ERAS, TRIVIA_TAGS } from '../data/triviaData';
import { sound } from '../audio/soundEngine';
import { TRIVIA_VISUALS_MAP } from '../data/triviaVisualsData';

interface LookbookArchiveProps {
  items: TriviaItem[];
  onSelectTrivia: (item: TriviaItem) => void;
}

export const LookbookArchive: React.FC<LookbookArchiveProps> = ({
  items,
  onSelectTrivia,
}) => {
  const [search, setSearch] = useState('');
  const [selectedEra, setSelectedEra] = useState<GameEra>('All');
  const [selectedTag, setSelectedTag] = useState<TriviaTag>('All');
  const [activeModalItem, setActiveModalItem] = useState<TriviaItem | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.gameTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.headline.toLowerCase().includes(search.toLowerCase()) ||
      item.developer.toLowerCase().includes(search.toLowerCase()) ||
      item.story.toLowerCase().includes(search.toLowerCase());

    const matchesEra = selectedEra === 'All' || item.era === selectedEra;
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag;

    return matchesSearch && matchesEra && matchesTag;
  });

  const rarityColorMap: Record<string, string> = {
    'COMMON VINTAGE': 'text-[#00F5D4] border-[#00F5D4]',
    'RARE COLLECTIBLE': 'text-[#FFE600] border-[#FFE600]',
    'LEGENDARY SECRET': 'text-[#FF2A85] border-[#FF2A85]',
    'CURSED ANOMALY': 'text-[#9D4EDD] border-[#9D4EDD]',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Editorial Header (Decathlon Yestalgia Lookbook Style) */}
      <div className="border-b-3 border-black pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#00F5D4] px-2 py-0.5 font-['Press_Start_2P'] text-[9px] font-bold text-black uppercase">
                ARCHIVE CATALOG
              </span>
              <span className="font-['Press_Start_2P'] text-[9px] text-zinc-400">
                // ISSUE NO. 01
              </span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1">
              THE RETRO MEMORY CARTRIDGES
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search game, glitch, dev..."
              className="w-full rounded-sm border-2 border-black bg-[#14161F] pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-[#FF2A85] focus:outline-hidden brutal-shadow-sm font-['Space_Grotesk']"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {GAME_ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => {
                sound.playClick();
                setSelectedEra(era.id);
              }}
              className={`rounded-xs border-2 border-black px-2.5 py-1 font-['Press_Start_2P'] text-[8px] transition-all ${
                selectedEra === era.id
                  ? 'bg-[#FF2A85] text-black font-bold brutal-shadow-sm'
                  : 'bg-[#14161F] text-zinc-400 hover:text-white'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        {/* Lore Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {TRIVIA_TAGS.map((tag) => (
            <button
              key={tag.id}
              onClick={() => {
                sound.playClick();
                setSelectedTag(tag.id);
              }}
              className={`rounded-xs border border-black px-2 py-0.5 font-['Space_Grotesk'] text-xs font-semibold transition-all ${
                selectedTag === tag.id
                  ? 'bg-[#FFE600] text-black border-2 brutal-shadow-sm'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>


      {/* Grid of Catalog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => {
          const visual = TRIVIA_VISUALS_MAP[item.id] || TRIVIA_VISUALS_MAP[item.gameTitle];
          const cardImg = visual?.characterImageUrl || visual?.boxArtImageUrl;

          return (
          <div
            key={item.id}
            onClick={() => {
              sound.playClick();
              setActiveModalItem(item);
            }}
            data-cursor="INSPECT"
            className="group relative cursor-pointer rounded-md border-3 border-black bg-[#14161F] p-5 brutal-shadow hover:-translate-y-1 hover:border-[#00F5D4] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header & Number */}
              <div className="flex items-center justify-between border-b-2 border-black/40 pb-3 mb-3">
                <span className="font-['Press_Start_2P'] text-[9px] text-[#FFE600]">
                  #{String(idx + 1).padStart(2, '0')} // {item.platform}
                </span>
                <span
                  className={`border px-1.5 py-0.5 font-['Press_Start_2P'] text-[7px] ${
                    rarityColorMap[item.rarityTier] || 'text-white'
                  }`}
                >
                  {item.rarityTier}
                </span>
              </div>

              {/* Photo Thumbnail */}
              {cardImg && (
                <div className="relative mb-3 h-28 w-full overflow-hidden rounded-sm border-2 border-black bg-black/60">
                  <img
                    src={cardImg}
                    alt={item.gameTitle}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 font-['Press_Start_2P'] text-[6px] text-[#00F5D4] bg-black/70 px-1.5 py-0.5 rounded border border-black/40">
                    {visual?.characterName || item.gameTitle}
                  </span>
                </div>
              )}

              {/* Game Title & Badge */}
              <div className="flex items-center gap-2 mb-2">
                <Gamepad2 className="h-4 w-4 text-[#FF2A85]" />
                <span className="font-['Syne'] text-lg font-bold text-white group-hover:text-[#00F5D4] transition-colors">
                  {item.gameTitle}
                </span>
                <span className="text-xs text-zinc-400 font-mono">({item.releaseYear})</span>
              </div>

              {/* Headline */}
              <h3 className="font-['Syne'] text-base font-extrabold text-zinc-100 leading-snug line-clamp-2 mb-3">
                {item.headline}
              </h3>

              {/* Story excerpt */}
              <p className="font-['Space_Grotesk'] text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                {item.story}
              </p>
            </div>

            {/* Card Footer Bar */}
            <div className="border-t-2 border-black/40 pt-3 flex items-center justify-between">
              <span className="rounded-xs bg-white/5 px-2 py-0.5 font-['Press_Start_2P'] text-[7px] text-zinc-300">
                {item.tag}
              </span>
              <div className="flex items-center gap-1 font-['Press_Start_2P'] text-[8px] text-[#00F5D4] group-hover:translate-x-0.5 transition-transform">
                <span>VIEW</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-md border-2 border-dashed border-zinc-700 p-12 text-center">
          <p className="font-['Press_Start_2P'] text-xs text-zinc-400">
            NO MEMORY CARTRIDGES FOUND MATCHING CRITERIA.
          </p>
        </div>
      )}

      {/* Inspect Modal */}
      {activeModalItem && (() => {
        const modalVisual = TRIVIA_VISUALS_MAP[activeModalItem.id] || TRIVIA_VISUALS_MAP[activeModalItem.gameTitle];
        const modalImg = modalVisual?.characterImageUrl || modalVisual?.boxArtImageUrl;

        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-lg border-3 border-black bg-[#14161F] p-6 sm:p-8 brutal-shadow-lg space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Close */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute right-4 top-4 rounded-xs border-2 border-black bg-[#FF2A85] px-2.5 py-1 font-['Press_Start_2P'] text-[9px] text-black font-bold brutal-shadow-sm hover:bg-[#ff4396] z-10"
            >
              ESC ✕
            </button>

            {/* Modal Photo Banner */}
            {modalImg && (
              <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-md border-2 border-black bg-black/70">
                <img
                  src={modalImg}
                  alt={activeModalItem.gameTitle}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14161F] via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <span className="rounded-xs border border-black bg-[#FF2A85] px-2 py-0.5 font-['Press_Start_2P'] text-[7px] text-black font-bold uppercase">
                    {modalVisual?.characterName || activeModalItem.gameTitle}
                  </span>
                  <span className="font-['Space_Grotesk'] text-xs text-zinc-300 font-bold hidden sm:inline">
                    {modalVisual?.characterTitle || activeModalItem.developer}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-[#FFE600] px-2 py-0.5 font-['Press_Start_2P'] text-[8px] font-bold text-black">
                {activeModalItem.gameTitle} ({activeModalItem.releaseYear})
              </span>
              <span className="rounded-sm bg-[#00F5D4] px-2 py-0.5 font-['Press_Start_2P'] text-[8px] font-bold text-black">
                {activeModalItem.platform}
              </span>
              <span className="rounded-sm border border-[#FF2A85] px-2 py-0.5 font-['Press_Start_2P'] text-[7px] text-[#FF2A85]">
                {activeModalItem.rarityTier}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-['Syne'] text-xl sm:text-2xl font-black text-white leading-tight">
              {activeModalItem.headline}
            </h2>

            {/* Full Story */}
            <div className="rounded-sm border-l-3 border-[#00F5D4] bg-black/40 p-4 font-['Space_Grotesk'] text-sm sm:text-base leading-relaxed text-zinc-200">
              {activeModalItem.story}
            </div>

            {/* Verified Fact */}
            <div className="rounded-sm border border-white/20 bg-white/5 p-3 text-xs text-zinc-300">
              <strong className="text-[#FFE600]">ARCHIVE FACT:</strong> {activeModalItem.verifiedFact}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t-2 border-black pt-4">
              <button
                onClick={() => {
                  sound.playCoin();
                  onSelectTrivia(activeModalItem);
                  setActiveModalItem(null);
                }}
                className="flex items-center gap-2 rounded-sm border-2 border-black bg-[#00F5D4] px-4 py-2 font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-black font-bold brutal-shadow-sm hover:bg-[#20f7dc]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>LOAD IN 3D ROULETTE</span>
              </button>

              <button
                onClick={() => setActiveModalItem(null)}
                className="font-['Press_Start_2P'] text-[8px] text-zinc-400 hover:text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
};
