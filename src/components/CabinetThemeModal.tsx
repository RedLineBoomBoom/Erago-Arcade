import React, { useState } from 'react';
import { X, Palette, Check, Sparkles } from 'lucide-react';
import { ARCADE_THEMES, type ArcadeThemeId } from '../types/theme';
import { getActiveTheme, setActiveTheme } from '../utils/themeManager';
import { sound } from '../audio/soundEngine';

interface CabinetThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CabinetThemeModal: React.FC<CabinetThemeModalProps> = ({ isOpen, onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState<ArcadeThemeId>(() => getActiveTheme());

  if (!isOpen) return null;

  const handleSelectTheme = (themeId: ArcadeThemeId) => {
    sound.playCoin();
    setSelectedTheme(themeId);
    setActiveTheme(themeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-xl rounded-2xl border-4 border-black bg-[#14161F] p-6 shadow-[8px_8px_0px_#000] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#00F5D4] text-black shadow-[2px_2px_0px_#000]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg text-white">CABINET THEME CUSTOMIZER</h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#FFE600] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  4 CONSOLES
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">SELECT A VINTAGE DISPLAY HARDWARE PALETTE</p>
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

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ARCADE_THEMES.map((th) => {
            const isSelected = selectedTheme === th.id;
            return (
              <button
                key={th.id}
                onClick={() => handleSelectTheme(th.id)}
                className={`relative flex flex-col justify-between p-4 rounded-xl border-3 border-black text-left transition-all ${
                  isSelected
                    ? 'bg-[#1E2230] shadow-[4px_4px_0px_#00F5D4] -translate-y-1'
                    : 'bg-[#181A24] hover:bg-[#202332] shadow-[3px_3px_0px_#000]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-xs bg-black text-[#FFE600] font-['Press_Start_2P'] text-[6px] border border-white/20">
                      {th.badge}
                    </span>
                    {isSelected && (
                      <div className="flex items-center gap-1 font-mono text-[9px] text-[#00F5D4] font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>ACTIVE</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-['Syne'] font-black text-sm text-white">{th.name}</h3>
                  <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                    {th.description}
                  </p>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 pt-3 mt-2 border-t border-white/10">
                  {th.colors.map((c, i) => (
                    <div
                      key={i}
                      className="h-4 flex-1 rounded border border-black"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-[10px] text-zinc-300">
          <Sparkles className="w-4 h-4 text-[#FFE600] shrink-0" />
          <span>Palettes instantly adapt the display hardware matrix and CRT phosphors across the entire vault.</span>
        </div>
      </div>
    </div>
  );
};
