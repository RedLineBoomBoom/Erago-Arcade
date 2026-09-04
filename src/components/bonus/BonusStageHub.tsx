import React, { useState } from 'react';
import { X, Play, Trophy, Sparkles } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { MINI_GAMES_CATALOG, type MiniGameId, type MiniGameMeta } from './types';
import { MemoryMatchGame } from './MemoryMatchGame';
import { PixelInvadersGame } from './PixelInvadersGame';
import { CyberSnakeGame } from './CyberSnakeGame';
import { BrickBreakerGame } from './BrickBreakerGame';
import { ReflexTestGame } from './ReflexTestGame';

interface BonusStageHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BonusStageHub: React.FC<BonusStageHubProps> = ({ isOpen, onClose }) => {
  const [activeGameId, setActiveGameId] = useState<MiniGameId | null>(null);

  if (!isOpen) return null;

  const handleLaunchGame = (gameId: MiniGameId) => {
    sound.playCoin();
    setActiveGameId(gameId);
  };

  const handleBackToLibrary = () => {
    sound.playClick();
    setActiveGameId(null);
  };

  const getHighScore = (key: string): string => {
    try {
      const val = localStorage.getItem(key);
      if (!val) return '--';
      return key.includes('reflex') ? `${val} ms` : `${parseInt(val, 10).toLocaleString()} PTS`;
    } catch {
      return '--';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Cabinet Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#000] overflow-hidden">
        {/* Main Cabinet Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B0C10] border-b-4 border-black">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🕹️</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg sm:text-xl text-white tracking-wide">
                  ERAGO BONUS ARCADE
                </h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#FFE600] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  LIBRARY (5 GAMES)
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">
                {activeGameId ? 'MINI-GAME SESSION ACTIVE' : 'SELECT AN ARCADE MINI-GAME TO PLAY LIVE'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black font-bold transition-all shadow-[2px_2px_0px_#000]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Body: Library Selector OR Active Game */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeGameId === null ? (
            /* Game Selection Library */
            <div className="p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MINI_GAMES_CATALOG.map((game: MiniGameMeta) => {
                  const hiScore = getHighScore(game.storageKey);
                  return (
                    <div
                      key={game.id}
                      className="group relative flex flex-col justify-between rounded-xl border-3 border-black bg-[#1A1C26] p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all duration-200"
                      style={{ borderTopColor: game.themeColor, borderTopWidth: '6px' }}
                    >
                      <div className="space-y-3">
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between">
                          <span className="text-3xl p-2 rounded-lg bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                            {game.icon}
                          </span>
                          <div className="flex flex-col items-end gap-1">
                            <span
                              className="px-2 py-0.5 rounded-xs font-['Press_Start_2P'] text-[6px] font-bold uppercase border border-black"
                              style={{ backgroundColor: game.themeColor, color: '#000' }}
                            >
                              {game.difficulty}
                            </span>
                            <span className="font-mono text-[9px] text-zinc-400">
                              {game.genre}
                            </span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h3 className="font-['Syne'] font-black text-base text-white group-hover:text-[#FFE600] transition-colors leading-tight">
                            {game.title}
                          </h3>
                          <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                            {game.subtitle}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                          {game.description}
                        </p>

                        {/* Controls Tip */}
                        <div className="p-2 rounded bg-black/50 border border-white/5 font-mono text-[10px] text-zinc-400">
                          🎮 <strong className="text-zinc-200">Controls:</strong> {game.controls}
                        </div>
                      </div>

                      {/* Bottom Action & Highscore */}
                      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                          <Trophy className="w-3 h-3 text-[#FFE600]" />
                          <span>BEST: <strong className="text-white">{hiScore}</strong></span>
                        </div>

                        <button
                          onClick={() => handleLaunchGame(game.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black font-['Press_Start_2P'] text-[8px] font-bold text-black shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-colors"
                          style={{ backgroundColor: game.themeColor }}
                        >
                          <Play className="w-3 h-3 fill-black" />
                          <span>PLAY</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bonus Footer Banner */}
              <div className="rounded-xl border-2 border-black bg-gradient-to-r from-[#9D4EDD]/20 via-[#FF2A85]/20 to-[#00F5D4]/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFE600] animate-pulse" />
                  <span className="font-mono text-xs text-zinc-300">
                    Beat high-scores in any mini-game to unlock the <strong className="text-[#FFE600]">Bonus Stage Hero</strong> trophy badge!
                  </span>
                </div>
                <div className="font-['Press_Start_2P'] text-[8px] text-[#00F5D4]">
                  ALL GAMES 100% FREE
                </div>
              </div>
            </div>
          ) : (
            /* Active Mini-Game Session */
            <div className="h-full">
              {activeGameId === 'memory-match' && (
                <MemoryMatchGame onBack={handleBackToLibrary} />
              )}
              {activeGameId === 'pixel-invaders' && (
                <PixelInvadersGame onBack={handleBackToLibrary} />
              )}
              {activeGameId === 'cyber-snake' && (
                <CyberSnakeGame onBack={handleBackToLibrary} />
              )}
              {activeGameId === 'brick-breaker' && (
                <BrickBreakerGame onBack={handleBackToLibrary} />
              )}
              {activeGameId === 'speed-reflex' && (
                <ReflexTestGame onBack={handleBackToLibrary} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
