import React, { useState } from 'react';
import { Trash2, X, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';
import { triggerArcadeConfetti } from '../utils/arcadeConfetti';

export interface StickerItem {
  id: string;
  text: string;
  bg: string;
  border: string;
  textColor: string;
  x: number;
  y: number;
  rotation: number;
}

const STICKER_TEMPLATES = [
  { text: '★ 100% RAD', bg: '#FFE600', border: '#000', textColor: '#000' },
  { text: '⚡ PWNED', bg: '#FF2A85', border: '#000', textColor: '#FFF' },
  { text: '💀 WASTED', bg: '#000', border: '#FF2A85', textColor: '#FF2A85' },
  { text: '👾 PIXEL 1UP', bg: '#00F566', border: '#000', textColor: '#000' },
  { text: '🎮 GAME OVER', bg: '#9D4EDD', border: '#000', textColor: '#FFF' },
  { text: '🔥 COMBO x99', bg: '#FF8700', border: '#000', textColor: '#FFF' },
  { text: '💿 RETRO GOLD', bg: '#FFE600', border: '#FF2A85', textColor: '#000' },
  { text: '💖 8-BIT LOVE', bg: '#FF2A85', border: '#00F5D4', textColor: '#FFF' },
  { text: '🕶️ DEAL WITH IT', bg: '#00F5D4', border: '#000', textColor: '#000' },
];

interface StickerBombCanvasProps {
  isActive: boolean;
  onToggle: () => void;
}

export const StickerBombCanvas: React.FC<StickerBombCanvasProps> = ({ isActive, onToggle }) => {
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSlapSticker = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid slapping if clicking on the toolbar
    const target = e.target as HTMLElement;
    if (target.closest('.sticker-toolbar')) return;

    sound.playSlap();
    unlockAchievement('STICKER_BOMBER');
    triggerArcadeConfetti(e.clientX, e.clientY, 15);

    const template = STICKER_TEMPLATES[selectedIndex];
    const newSticker: StickerItem = {
      id: `stk-${Date.now()}-${Math.random()}`,
      text: template.text,
      bg: template.bg,
      border: template.border,
      textColor: template.textColor,
      x: e.clientX,
      y: e.clientY,
      rotation: Math.floor(Math.random() * 30) - 15, // -15deg to +15deg
    };

    setStickers((prev) => [...prev, newSticker]);
  };

  const handleClear = () => {
    sound.playClick();
    setStickers([]);
  };

  return (
    <>
      {/* Active Sticker Canvas (Full Screen overlay) */}
      {isActive && (
        <div 
          onClick={handleSlapSticker}
          className="fixed inset-0 z-40 cursor-crosshair select-none overflow-hidden"
          title="Click anywhere to slap a sticker!"
        >
          {/* Instruction Banner at top */}
          <div className="absolute top-18 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#FFE600] border-2 border-black rounded-full font-['Press_Start_2P'] text-[9px] text-black shadow-[3px_3px_0px_#000] pointer-events-none animate-bounce">
            CLICK ANYWHERE TO SLAP A STICKER!
          </div>

          {/* Floating Sticker Toolbar Dock */}
          <div className="sticker-toolbar fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center gap-2 p-3 bg-[#14161F] border-3 border-black rounded-2xl shadow-[8px_8px_0px_#000] max-w-2xl">
            <div className="flex items-center gap-1.5 mr-2 font-['Press_Start_2P'] text-[8px] text-[#00F5D4] shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>STAMP:</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
              {STICKER_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedIndex(idx);
                  }}
                  className={`px-2 py-1 rounded font-['Press_Start_2P'] text-[8px] border-2 transition-transform ${
                    selectedIndex === idx
                      ? 'scale-105 border-white ring-2 ring-[#FFE600] shadow-[2px_2px_0px_#000]'
                      : 'border-black opacity-80 hover:opacity-100 hover:scale-100'
                  }`}
                  style={{
                    backgroundColor: tmpl.bg,
                    color: tmpl.textColor,
                    borderColor: tmpl.border,
                  }}
                >
                  {tmpl.text}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto shrink-0 pl-2 border-l border-white/10">
              <button
                onClick={handleClear}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded font-mono font-bold text-xs uppercase border-2 border-black"
                title="Peel all stickers"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>PEEL ALL</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onToggle();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#FFE600] hover:bg-white text-black font-mono font-black text-xs uppercase rounded border-2 border-black"
              >
                <X className="w-3.5 h-3.5" />
                <span>DONE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rendered Slapped Stickers (Persisted on Screen) */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {stickers.map((stk) => (
          <div
            key={stk.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 font-['Press_Start_2P'] text-xs font-black uppercase rounded-sm border-3 shadow-[5px_5px_0px_#000] select-none animate-scale-up"
            style={{
              left: `${stk.x}px`,
              top: `${stk.y}px`,
              backgroundColor: stk.bg,
              color: stk.textColor,
              borderColor: stk.border,
              transform: `translate(-50%, -50%) rotate(${stk.rotation}deg)`,
            }}
          >
            {stk.text}
          </div>
        ))}
      </div>
    </>
  );
};
