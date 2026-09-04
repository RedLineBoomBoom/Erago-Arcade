import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft, Zap, Trophy } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { unlockAchievement } from '../../utils/achievements';
import { triggerArcadeConfetti } from '../../utils/arcadeConfetti';
import { currencyManager } from '../../utils/currencyManager';

interface ReflexTestGameProps {
  onBack: () => void;
}

type ReflexState = 'intro' | 'waiting' | 'ready_to_click' | 'result' | 'early';

export const ReflexTestGame: React.FC<ReflexTestGameProps> = ({ onBack }) => {
  const [stage, setStage] = useState<ReflexState>('intro');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    try {
      const s = localStorage.getItem('erago_reflex_best');
      return s ? parseInt(s, 10) : null;
    } catch {
      return null;
    }
  });

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const startTest = () => {
    sound.playClick();
    setStage('waiting');
    setReactionTime(null);

    // Random delay between 1.5 and 4.0 seconds
    const delay = 1500 + Math.random() * 2500;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      sound.play1Up();
      startTimeRef.current = performance.now();
      setStage('ready_to_click');
    }, delay);
  };

  const handleInteraction = () => {
    if (stage === 'intro') {
      startTest();
    } else if (stage === 'waiting') {
      // Clicked too early!
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      sound.playError();
      setStage('early');
    } else if (stage === 'ready_to_click') {
      // Success!
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setStage('result');

      const reflexPoints = elapsed < 240 ? 400 : elapsed < 320 ? 300 : elapsed < 420 ? 200 : 100;
      currencyManager.convertPoints(reflexPoints, 'REFLEX_TEST');

      if (elapsed < 240) {
        sound.playJackpot();
        triggerArcadeConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
        unlockAchievement('BONUS_CHAMPION');
      } else {
        sound.playCorrect();
      }

      if (bestTime === null || elapsed < bestTime) {
        setBestTime(elapsed);
        try {
          localStorage.setItem('erago_reflex_best', elapsed.toString());
        } catch {
          // Ignore
        }
      }
    } else if (stage === 'early' || stage === 'result') {
      startTest();
    }
  };

  // Keyboard Space listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        handleInteraction();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  });


  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getRank = (ms: number) => {
    if (ms < 200) return { rank: 'SSS', label: 'CYBERNETIC GOD', color: '#FFE600' };
    if (ms < 250) return { rank: 'S', label: 'ESPORTS SPEEDRUNNER', color: '#00F5D4' };
    if (ms < 300) return { rank: 'A', label: 'ARCADE CHAMPION', color: '#FF2A85' };
    if (ms < 400) return { rank: 'B', label: 'SOLID REFLEX', color: '#9D4EDD' };
    return { rank: 'C', label: 'INPUT LAG', color: '#888888' };
  };

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-black/60 border-b-2 border-white/10 font-mono text-xs">
        <button
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-[#FFE600] hover:text-black rounded font-mono font-bold text-xs uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>GAME LIBRARY</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>BEST: <strong className="text-[#00F5D4]">{bestTime ? `${bestTime} ms` : '--'}</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Reflex Arena */}
      <div className="flex-1 p-5 flex items-center justify-center min-h-[380px]">
        <div
          onClick={handleInteraction}
          className={`w-full max-w-md aspect-square rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 select-none ${
            stage === 'intro'
              ? 'bg-[#14161F] hover:bg-[#1c1f2b]'
              : stage === 'waiting'
              ? 'bg-[#FF2A85] text-white animate-pulse'
              : stage === 'ready_to_click'
              ? 'bg-[#00F566] text-black scale-102'
              : stage === 'early'
              ? 'bg-[#9D4EDD] text-white'
              : 'bg-[#14161F] text-white'
          }`}
        >
          {stage === 'intro' && (
            <div className="space-y-4">
              <Zap className="w-16 h-16 text-[#FFE600] mx-auto animate-bounce" />
              <h3 className="font-['Syne'] font-black text-2xl text-white">
                SPEEDRUNNER REFLEX TEST
              </h3>
              <p className="font-mono text-xs text-zinc-300">
                Wait for the screen to turn <strong className="text-[#00F566]">NEON GREEN</strong>, then click or press <strong className="text-[#FFE600]">[SPACE]</strong> as fast as humanly possible!
              </p>
              <div className="pt-2">
                <span className="inline-block px-5 py-2.5 bg-[#9D4EDD] text-white font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[3px_3px_0px_#000]">
                  CLICK TO START
                </span>
              </div>
            </div>
          )}

          {stage === 'waiting' && (
            <div className="space-y-3">
              <div className="text-4xl">⏳</div>
              <h3 className="font-['Syne'] font-black text-2xl uppercase tracking-wider">
                WAIT FOR GREEN...
              </h3>
              <p className="font-mono text-xs text-white/90">Do NOT click yet!</p>
            </div>
          )}

          {stage === 'ready_to_click' && (
            <div className="space-y-3">
              <div className="text-5xl animate-ping">⚡</div>
              <h3 className="font-['Syne'] font-black text-3xl sm:text-4xl uppercase tracking-wider">
                FIRE!! CLICK NOW!!
              </h3>
              <p className="font-mono text-xs font-bold">[CLICK / PRESS SPACE]</p>
            </div>
          )}

          {stage === 'early' && (
            <div className="space-y-4">
              <div className="text-4xl">🚫</div>
              <h3 className="font-['Syne'] font-black text-2xl text-[#FFE600]">
                TOO EARLY!
              </h3>
              <p className="font-mono text-xs text-zinc-200">
                You jumped the gun before the green light!
              </p>
              <span className="inline-block px-4 py-2 bg-black text-white font-['Press_Start_2P'] text-[8px] font-bold rounded border border-white/20">
                CLICK TO TRY AGAIN
              </span>
            </div>
          )}

          {stage === 'result' && reactionTime !== null && (
            <div className="space-y-4">
              <div className="font-['Press_Start_2P'] text-3xl sm:text-4xl text-[#00F5D4] drop-shadow">
                {reactionTime} ms
              </div>

              {(() => {
                const rankInfo = getRank(reactionTime);
                return (
                  <div className="space-y-1">
                    <div
                      className="font-['Press_Start_2P'] text-xl font-bold"
                      style={{ color: rankInfo.color }}
                    >
                      RANK {rankInfo.rank}
                    </div>
                    <div className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                      {rankInfo.label}
                    </div>
                    <div className="pt-1">
                      <span className="px-3 py-1 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black shadow inline-block">
                        +{Math.floor((reactionTime < 240 ? 400 : reactionTime < 320 ? 300 : reactionTime < 420 ? 200 : 100) / 10)} COINS EARNED! 🪙
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={startTest}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>TRY AGAIN</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
