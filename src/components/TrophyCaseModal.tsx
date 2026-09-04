import React, { useEffect, useState } from 'react';
import { X, Trophy, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { 
  ACHIEVEMENTS_LIST, 
  getUnlockedAchievements, 
  subscribeToAchievements, 
  type Achievement 
} from '../utils/achievements';
import { sound } from '../audio/soundEngine';

interface TrophyCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrophyCaseModal: React.FC<TrophyCaseModalProps> = ({ isOpen, onClose }) => {
  const [unlockedMap, setUnlockedMap] = useState<Record<string, number>>(() => getUnlockedAchievements());
  const [toast, setToast] = useState<Achievement | null>(null);

  // Subscribe to live unlocks
  useEffect(() => {


    const unsubscribe = subscribeToAchievements((newAchievement) => {
      setUnlockedMap(getUnlockedAchievements());
      setToast(newAchievement);
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    });

    return unsubscribe;
  }, []);

  const total = ACHIEVEMENTS_LIST.length;
  const unlockedCount = Object.keys(unlockedMap).length;
  const percentage = Math.round((unlockedCount / total) * 100);

  return (
    <>
      {/* 1. Floating Arcade Achievement Pop-Up Toast */}
      {toast && (
        <div 
          className="fixed top-6 right-6 z-99999 flex items-center gap-3.5 p-3.5 bg-[#14161F] border-3 border-[#FFE600] rounded-xl shadow-[6px_6px_0px_#000] animate-bounce-in max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFE600] text-2xl border-2 border-black">
            {toast.badge}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 font-['Press_Start_2P'] text-[8px] text-[#FFE600] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#FFE600]" />
              <span>ACHIEVEMENT UNLOCKED!</span>
            </div>
            <h4 className="font-['Syne'] font-extrabold text-sm text-white leading-tight">
              {toast.title}
            </h4>
            <p className="font-mono text-[11px] text-zinc-300 leading-snug">
              {toast.description}
            </p>
          </div>
        </div>
      )}

      {/* 2. Full Trophy Case Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#14161F] border-4 border-black rounded-2xl shadow-[10px_10px_0px_#000] overflow-hidden text-white animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#FFE600] border-b-4 border-black text-black">
              <div className="flex items-center gap-2 font-black text-sm tracking-wider uppercase">
                <Trophy className="w-5 h-5 text-black animate-spin-slow" />
                <span>ERAGO ARCADE // TROPHY CASE</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="flex items-center gap-1 px-2 py-1 bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-xs uppercase rounded transition-colors border-2 border-black"
                aria-label="Close Trophy Case"
              >
                <X className="w-4 h-4" />
                <span>ESC [CLOSE]</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {/* Progress Bar */}
              <div className="p-4 bg-black/50 border-2 border-white/10 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-['Press_Start_2P'] text-[9px]">
                  <span className="text-zinc-400">UNLOCKED TROPHIES</span>
                  <span className="text-[#00F5D4]">{unlockedCount} / {total} ({percentage}%)</span>
                </div>
                <div className="h-3 w-full bg-black/80 rounded-full border border-white/20 overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF2A85] via-[#FFE600] to-[#00F5D4] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Trophies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ACHIEVEMENTS_LIST.map((ach) => {
                  const isUnlocked = Boolean(unlockedMap[ach.id]);
                  const unlockedDate = unlockedMap[ach.id] 
                    ? new Date(unlockedMap[ach.id]).toLocaleDateString()
                    : null;

                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-xl border-2 transition-all flex items-start gap-3.5 ${
                        isUnlocked
                          ? 'bg-black/60 border-[#FFE600]/60 shadow-[4px_4px_0px_rgba(255,230,0,0.3)]'
                          : 'bg-black/30 border-white/5 opacity-60'
                      }`}
                    >
                      <div className={`h-12 w-12 shrink-0 flex items-center justify-center rounded-lg text-2xl border-2 ${
                        isUnlocked
                          ? 'bg-[#FFE600]/20 border-[#FFE600] text-white shadow-inner'
                          : 'bg-white/5 border-white/10 text-zinc-600'
                      }`}>
                        {isUnlocked ? ach.badge : <Lock className="w-5 h-5 text-zinc-600" />}
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`font-['Syne'] font-extrabold text-sm truncate ${
                            isUnlocked ? 'text-[#FFE600]' : 'text-zinc-500'
                          }`}>
                            {ach.title}
                          </h4>
                          {isUnlocked && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5D4] shrink-0" />
                          )}
                        </div>
                        <p className="font-mono text-[11px] text-zinc-400 leading-snug">
                          {ach.description}
                        </p>
                        {isUnlocked && unlockedDate && (
                          <div className="font-mono text-[9px] text-[#00F5D4] pt-0.5">
                            UNLOCKED ON: {unlockedDate}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0d0d11] border-t-4 border-black font-mono text-xs text-zinc-400">
              <span className="font-['Press_Start_2P'] text-[8px] text-zinc-500 hidden sm:inline">
                EXPLORE TRIVIA & EASTER EGGS TO COLLECT ALL
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-1.5 bg-[#FFE600] text-black font-black uppercase tracking-wider rounded-lg border-2 border-black hover:bg-white transition-colors ml-auto"
              >
                RESUME ARCADE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
