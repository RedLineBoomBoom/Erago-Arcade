import React, { useState } from 'react';
import { X, BookOpen, RotateCw } from 'lucide-react';
import { TRIVIA_DATABASE } from '../data/triviaData';
import { TRIVIA_VISUALS_MAP } from '../data/triviaVisualsData';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';

interface CardBinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredIds: Set<string>;
}

export const CardBinderModal: React.FC<CardBinderModalProps> = ({
  isOpen,
  onClose,
  discoveredIds,
}) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('All');
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleFlip = (id: string) => {
    sound.playClick();
    unlockAchievement('CARD_COLLECTOR');
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = TRIVIA_DATABASE.filter((item) => {
    if (selectedRarity === 'All') return true;
    return item.rarityTier === selectedRarity;
  });

  const rarities = ['All', 'COMMON VINTAGE', 'RARE COLLECTIBLE', 'LEGENDARY SECRET', 'CURSED ANOMALY'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-5xl h-[88vh] rounded-2xl border-4 border-black bg-[#14161F] p-5 sm:p-6 shadow-[8px_8px_0px_#000] flex flex-col space-y-4">
        {/* Binder Header */}
        <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg sm:text-xl text-white">
                  90s HOLOGRAPHIC CARD BINDER
                </h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  {discoveredIds.size}/{TRIVIA_DATABASE.length} DISCOVERED
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">
                CLICK ANY CARD TO FLIP BETWEEN HOLOGRAPHIC ART & ARCHIVE LORE
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

        {/* Rarity Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {rarities.map((r) => (
            <button
              key={r}
              onClick={() => {
                sound.playClick();
                setSelectedRarity(r);
              }}
              className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold border border-black transition-all ${
                selectedRarity === r
                  ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Card Binder Grid View */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => {
              const isFlipped = !!flippedMap[card.id];
              const isDiscovered = discoveredIds.has(card.id);
              const visual = TRIVIA_VISUALS_MAP[card.id] || TRIVIA_VISUALS_MAP[card.gameTitle];
              const cardImg = visual?.characterImageUrl || visual?.boxArtImageUrl || '';

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className="group relative cursor-pointer perspective-[1000px] h-[340px]"
                >
                  <div
                    className={`relative w-full h-full rounded-xl border-3 border-black p-3 transition-transform duration-500 transform-style-3d shadow-[4px_4px_0px_#000] group-hover:-translate-y-1 ${
                      isFlipped ? 'rotate-y-180 bg-[#1E2230]' : 'bg-[#181A24]'
                    }`}
                  >
                    {/* Front Face: Holographic Card Art */}
                    {!isFlipped ? (
                      <div className="flex flex-col justify-between h-full space-y-2">
                        {/* Top Label */}
                        <div className="flex items-center justify-between">
                          <span className="font-['Press_Start_2P'] text-[6px] text-zinc-400">
                            #{card.id}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded font-['Press_Start_2P'] text-[5px] font-bold border border-black"
                            style={{
                              backgroundColor:
                                card.rarityTier === 'COMMON VINTAGE'
                                  ? '#00F5D4'
                                  : card.rarityTier === 'RARE COLLECTIBLE'
                                  ? '#FFE600'
                                  : card.rarityTier === 'LEGENDARY SECRET'
                                  ? '#FF2A85'
                                  : '#9D4EDD',
                              color: '#000',
                            }}
                          >
                            {card.rarityTier.split(' ')[0]}
                          </span>
                        </div>

                        {/* Card Graphic */}
                        <div className="relative flex-1 rounded-lg border-2 border-black overflow-hidden bg-black/50 flex items-center justify-center">
                          {cardImg ? (
                            <img
                              src={cardImg}
                              alt={card.gameTitle}
                              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                                !isDiscovered ? 'grayscale blur-xs opacity-50' : ''
                              }`}
                            />
                          ) : (
                            <span className="text-3xl">🎮</span>
                          )}
                          {/* Holo Sheen */}
                          <div className="holo-foil absolute inset-0 opacity-40 pointer-events-none" />
                        </div>

                        {/* Title & Metadata */}
                        <div>
                          <h4 className="font-['Syne'] font-black text-sm text-white truncate">
                            {card.gameTitle}
                          </h4>
                          <div className="font-mono text-[9px] text-zinc-400">
                            {card.platform} • {card.releaseYear}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 pt-1 border-t border-white/10">
                          <span>{card.tag}</span>
                          <span className="flex items-center gap-1 text-[#00F5D4]">
                            <RotateCw className="w-2.5 h-2.5" /> FLIP
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Back Face: Trivia Backstory & Dev Lore */
                      <div className="flex flex-col justify-between h-full space-y-2 rotate-y-180">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="font-['Press_Start_2P'] text-[7px] text-[#FFE600]">
                            ARCHIVE LORE
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {card.developer}
                          </span>
                        </div>

                        <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
                          <div className="font-['Syne'] font-black text-xs text-[#00F5D4] leading-tight">
                            "{card.headline}"
                          </div>
                          <p className="font-mono text-[10px] text-zinc-300 leading-relaxed">
                            {card.story}
                          </p>
                          {card.verifiedFact && (
                            <div className="text-[9px] font-mono text-zinc-500 italic pt-1">
                              Fact: {card.verifiedFact}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-white/10 font-mono text-[8px] text-zinc-400">
                          <span className="text-[#FF2A85]">AUTHENTIC</span>
                          <span className="flex items-center gap-1 text-[#00F5D4]">
                            <RotateCw className="w-2.5 h-2.5" /> FLIP BACK
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
