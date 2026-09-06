import React, { useState } from 'react';
import { X, Swords, Heart, RotateCcw } from 'lucide-react';
import { TRIVIA_DATABASE } from '../data/triviaData';

import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';
import { triggerArcadeConfetti } from '../utils/arcadeConfetti';
import { currencyManager, BOSS_CLEAR_REWARD_COINS } from '../utils/currencyManager';
import { useLanguage, getTranslatedTrivia } from '../utils/i18n';

interface BossBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BossProfile {
  id: number;
  name: string;
  title: string;
  avatar: string;
  themeColor: string;
  maxHp: number;
  attackName: string;
}

const BOSSES: BossProfile[] = [
  {
    id: 1,
    name: 'MISSINGNO. 000',
    title: 'THE CORRUPTED MEMORY GLITCH',
    avatar: '👾',
    themeColor: '#00F5D4',
    maxHp: 600,
    attackName: 'MEMORY OVERFLOW BLAST',
  },
  {
    id: 2,
    name: 'MECHA-BOWSER 90s',
    title: 'CYBER CARTRIDGE TYRANT',
    avatar: '🐉',
    themeColor: '#FF2A85',
    maxHp: 1000,
    attackName: 'PIXELATED HELLFIRE',
  },
  {
    id: 3,
    name: 'SEPHIROTH (PIXEL FORM)',
    title: 'ONE-WINGED CODE DESTROYER',
    avatar: '⚔️',
    themeColor: '#9D4EDD',
    maxHp: 1400,
    attackName: 'SUPERNOVA REBOOT',
  },
];

export const BossBattleModal: React.FC<BossBattleModalProps> = ({ isOpen, onClose }) => {
  const [bossIndex, setBossIndex] = useState(0);
  const [bossHp, setBossHp] = useState(BOSSES[0].maxHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [combo, setCombo] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [battleLog, setBattleLog] = useState('BATTLE START! Answer trivia to strike the boss!');
  const [isShaking, setIsShaking] = useState(false);
  const [damagePopup, setDamagePopup] = useState<string | null>(null);
  const [battleStatus, setBattleStatus] = useState<'playing' | 'victory' | 'defeated'>('playing');

  const currentBoss = BOSSES[bossIndex];
  const { language } = useLanguage();
  const rawTrivia = TRIVIA_DATABASE[questionIdx % TRIVIA_DATABASE.length];
  const currentTrivia = getTranslatedTrivia(rawTrivia, language);

  const resetBattle = (idx: number = bossIndex) => {
    sound.playPowerUp();
    setBossIndex(idx);
    setBossHp(BOSSES[idx].maxHp);
    setPlayerHp(100);
    setCombo(0);
    setBattleStatus('playing');
    setQuestionIdx(Math.floor(Math.random() * TRIVIA_DATABASE.length));
    setBattleLog(`Encountered ${BOSSES[idx].name}! Prepare your trivia weapons!`);
  };

  if (!isOpen) return null;


  const handleAnswer = (selectedIndex: number) => {
    if (battleStatus !== 'playing') return;

    const isCorrect = selectedIndex === currentTrivia.quizAnswerIndex;

    if (isCorrect) {
      sound.playLaser();
      const baseDmg = 250;
      const comboBonus = combo * 40;
      const totalDmg = baseDmg + comboBonus;
      const newBossHp = Math.max(0, bossHp - totalDmg);

      setCombo((prev) => prev + 1);
      setBossHp(newBossHp);
      setDamagePopup(`-${totalDmg} CRIT!`);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setDamagePopup(null);
      }, 700);

      if (newBossHp <= 0) {
        sound.playJackpot();
        triggerArcadeConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);
        unlockAchievement('BOSS_CHAMPION');
        currencyManager.addCoins(BOSS_CLEAR_REWARD_COINS, true);
        setBattleStatus('victory');
        setBattleLog(`💥 DEFEATED ${currentBoss.name}! ARCADE SAVED! (+${BOSS_CLEAR_REWARD_COINS} 🪙 REWARD)`);
      } else {
        setBattleLog(`⚔️ DIRECT HIT! Dealt ${totalDmg} DMG to ${currentBoss.name}!`);
        setQuestionIdx((prev) => (prev + 1) % TRIVIA_DATABASE.length);
      }
    } else {
      sound.playError();
      const dmgToPlayer = 25;
      const newPlayerHp = Math.max(0, playerHp - dmgToPlayer);
      setCombo(0);
      setPlayerHp(newPlayerHp);
      setBattleLog(`💔 MISS! ${currentBoss.name} counter-attacked with ${currentBoss.attackName}!`);

      if (newPlayerHp <= 0) {
        setBattleStatus('defeated');
      } else {
        setQuestionIdx((prev) => (prev + 1) % TRIVIA_DATABASE.length);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border-4 border-black bg-[#14161F] p-5 sm:p-6 shadow-[8px_8px_0px_#000] space-y-5 sm:space-y-6 custom-scrollbar ${isShaking ? 'animate-[bounce_0.2s_infinite]' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white shadow-[2px_2px_0px_#000]">
              <Swords className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg text-white">TRIVIA BOSS RUSH</h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#FFE600] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  STAGE {bossIndex + 1}/{BOSSES.length}
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">ARCADE RPG COMBAT // ANSWER TO STRIKE</p>
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

        {/* Boss Arena Card */}
        <div className="rounded-xl border-3 border-black bg-[#0B0C10] p-5 shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="relative flex h-16 w-16 items-center justify-center rounded-xl border-3 border-black text-4xl shadow-[3px_3px_0px_#000]"
                style={{ backgroundColor: currentBoss.themeColor }}
              >
                <span>{currentBoss.avatar}</span>
                {damagePopup && (
                  <div className="absolute -top-3 -right-6 px-2 py-0.5 bg-red-600 text-white font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black animate-bounce shadow">
                    {damagePopup}
                  </div>
                )}
              </div>

              <div>
                <div className="font-mono text-[9px] text-zinc-400">{currentBoss.title}</div>
                <h3 className="font-['Syne'] font-black text-xl text-white">{currentBoss.name}</h3>
                <div className="font-mono text-[10px] text-[#FF2A85]">
                  Special: <strong>{currentBoss.attackName}</strong>
                </div>
              </div>
            </div>

            {/* Combo Counter */}
            {combo > 1 && (
              <div className="px-3 py-1 bg-[#FFE600] text-black rounded border-2 border-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] animate-pulse">
                {combo}X COMBO! 🔥
              </div>
            )}
          </div>

          {/* Boss HP Gauge */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-zinc-400 font-bold">BOSS HP</span>
              <span className="text-[#FF2A85] font-black">{bossHp} / {currentBoss.maxHp}</span>
            </div>
            <div className="h-4 w-full rounded-full border-2 border-black bg-black/60 p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF2A85] to-[#FFE600] transition-all duration-300"
                style={{ width: `${(bossHp / currentBoss.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Player Status Bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#1A1C26] rounded-lg border-2 border-black font-mono text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>HERO HP: <strong className="text-white">{playerHp} / 100</strong></span>
          </div>

          <div className="text-[11px] text-[#00F5D4] font-medium text-right truncate flex-1">
            {battleLog}
          </div>
        </div>

        {/* Dynamic Battle Stage or Victory/Defeat */}
        {battleStatus === 'playing' ? (
          <div className="rounded-xl border-3 border-black bg-[#1A1C26] p-4 sm:p-5 shadow-[4px_4px_0px_#000] space-y-4">
            <div className="font-mono text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
              ⚔️ <strong className="text-[#FFE600]">{currentTrivia.gameTitle}:</strong> {currentTrivia.quizQuestion}
            </div>

            {/* Answer Attack Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {currentTrivia.quizOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-lg border-2 border-black bg-[#282E40] text-white font-mono text-xs hover:bg-[#FFE600] hover:text-black font-bold shadow-[2px_2px_0px_#000] transition-all text-left group min-h-[50px]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black/40 border border-white/20 text-[9px] group-hover:bg-black group-hover:text-white mt-0.5 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 break-words leading-relaxed text-zinc-100 group-hover:text-black">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : battleStatus === 'victory' ? (
          <div className="text-center space-y-4 py-4 animate-scale-up">
            <div className="text-5xl">🏆</div>
            <h3 className="font-['Syne'] font-black text-2xl text-[#FFE600]">
              BOSS DEFEATED! STAGE CLEAR!
            </h3>
            <p className="font-mono text-xs text-zinc-300">
              You annihilated {currentBoss.name} with superior gaming knowledge!
            </p>
            <div className="px-4 py-2 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow inline-block">
              +{BOSS_CLEAR_REWARD_COINS} COINS EARNED IN BATTLE! 🪙
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              {bossIndex < BOSSES.length - 1 ? (
                <button
                  onClick={() => resetBattle(bossIndex + 1)}
                  className="px-5 py-2.5 bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-white"
                >
                  NEXT BOSS ➔
                </button>
              ) : (
                <button
                  onClick={() => resetBattle(0)}
                  className="px-5 py-2.5 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-white"
                >
                  REPLAY BOSS RUSH 🔁
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4 animate-scale-up">
            <div className="text-5xl">💀</div>
            <h3 className="font-['Syne'] font-black text-2xl text-[#FF2A85]">
              HERO DEFEATED! GAME OVER
            </h3>
            <p className="font-mono text-xs text-zinc-300">
              {currentBoss.name} overpowered your shields. Try again!
            </p>
            <button
              onClick={() => resetBattle(bossIndex)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] mx-auto hover:bg-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REMATCH BOSS</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
