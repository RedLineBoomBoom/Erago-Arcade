import React, { useState, useEffect, useRef } from 'react';
import { Timer, RotateCcw, ArrowLeft } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { unlockAchievement } from '../../utils/achievements';
import { triggerArcadeConfetti } from '../../utils/arcadeConfetti';
import { currencyManager } from '../../utils/currencyManager';

interface MemoryMatchGameProps {
  onBack: () => void;
}

interface CardItem {
  uid: number;
  pairId: string;
  name: string;
  symbol: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARDS_DATA = [
  { pairId: 'mario', name: 'SUPER MARIO', symbol: '🍄', color: '#FF2A85' },
  { pairId: 'snake', name: 'SOLID SNAKE', symbol: '🐍', color: '#00F5D4' },
  { pairId: 'bond', name: 'AGENT 007', symbol: '🕵️', color: '#FFE600' },
  { pairId: 'doom', name: 'DOOM SLAYER', symbol: '💀', color: '#FF8700' },
  { pairId: 'vault', name: 'VAULT BOY', symbol: '☢️', color: '#00F566' },
  { pairId: 'gandhi', name: 'CIV GANDHI', symbol: '🕊️', color: '#9D4EDD' },
];

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ onBack }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'gameover'>('ready');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem('erago_bonus_highscore');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  const timerRef = useRef<number | null>(null);

  const startNewGame = () => {
    sound.playPowerUp();
    const deck: CardItem[] = [];
    let uidCounter = 1;

    CARDS_DATA.forEach((card) => {
      deck.push({ ...card, uid: uidCounter++, isFlipped: false, isMatched: false });
      deck.push({ ...card, uid: uidCounter++, isFlipped: false, isMatched: false });
    });

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedUids([]);
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          sound.playError();
          setGameState('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleCardClick = (card: CardItem) => {
    if (gameState !== 'playing' || card.isFlipped || card.isMatched || flippedUids.length >= 2) {
      return;
    }

    sound.playClick();
    const newFlipped = [...flippedUids, card.uid];
    setFlippedUids(newFlipped);

    setCards((prev) =>
      prev.map((c) => (c.uid === card.uid ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      const [firstUid, secondUid] = newFlipped;
      const firstCard = cards.find((c) => c.uid === firstUid);
      const secondCard = card;

      if (firstCard && firstCard.pairId === secondCard.pairId) {
        sound.playCorrect();
        const earned = 200 + Math.max(0, timeLeft) * 5;
        currencyManager.convertPoints(earned, 'MEMORY_MATCH');
        setScore((prev) => {
          const newTotal = prev + earned;
          if (newTotal > highScore) {
            setHighScore(newTotal);
            try {
              localStorage.setItem('erago_bonus_highscore', newTotal.toString());
            } catch {
              // Ignore
            }
          }
          return newTotal;
        });

        setTimeout(() => {
          setCards((prev) => {
            const next = prev.map((c) =>
              c.uid === firstUid || c.uid === secondUid
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            );

            if (next.every((c) => c.isMatched)) {
              if (timerRef.current) clearInterval(timerRef.current);
              sound.playJackpot();
              triggerArcadeConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);
              unlockAchievement('BONUS_CHAMPION');
              setGameState('won');
            }

            return next;
          });
          setFlippedUids([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === firstUid || c.uid === secondUid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedUids([]);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Game Sub-Header */}
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
          <div className="flex items-center gap-1 text-[#FFE600] font-bold">
            <Timer className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
          <div>SCORE: <span className="text-[#00F5D4] font-bold">{score}</span></div>
          <div className="hidden sm:block">HI-SCORE: <span className="text-[#FF2A85] font-bold">{highScore}</span></div>
        </div>
      </div>

      {/* Stage Area */}
      <div className="flex-1 p-5 flex items-center justify-center min-h-[380px]">
        {gameState === 'ready' && (
          <div className="text-center space-y-4 max-w-sm">
            <div className="text-4xl animate-bounce">🧠</div>
            <h3 className="font-['Syne'] font-black text-2xl text-white">
              CARTRIDGE MEMORY RUSH
            </h3>
            <p className="font-mono text-xs text-zinc-300 leading-relaxed">
              Match 6 pairs of classic gaming cartridges & symbols in under 30 seconds!
            </p>
            <button
              onClick={startNewGame}
              className="px-6 py-2.5 bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-white transition-colors"
            >
              START SPEED MATCH
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="grid grid-cols-4 gap-2.5 w-full max-w-md mx-auto">
            {cards.map((card) => {
              const isRevealed = card.isFlipped || card.isMatched;
              return (
                <button
                  key={card.uid}
                  onClick={() => handleCardClick(card)}
                  disabled={card.isMatched}
                  className={`aspect-square rounded-xl border-3 border-black flex flex-col items-center justify-center transition-all duration-200 select-none ${
                    card.isMatched
                      ? 'opacity-40 bg-emerald-950/40 border-emerald-500 scale-95'
                      : isRevealed
                      ? 'scale-100 shadow-[3px_3px_0px_#000]'
                      : 'bg-[#1E2230] hover:bg-[#282E40] hover:-translate-y-0.5 shadow-[4px_4px_0px_#000]'
                  }`}
                  style={{
                    backgroundColor: isRevealed ? card.color : undefined,
                  }}
                >
                  {isRevealed ? (
                    <>
                      <span className="text-2xl sm:text-3xl">{card.symbol}</span>
                      <span className="font-['Press_Start_2P'] text-[6px] text-black font-bold uppercase mt-1 text-center px-1 truncate w-full">
                        {card.name}
                      </span>
                    </>
                  ) : (
                    <span className="font-['Press_Start_2P'] text-xs text-zinc-500">?</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {gameState === 'won' && (
          <div className="text-center space-y-4 max-w-sm animate-scale-up">
            <div className="text-5xl">🏆</div>
            <h3 className="font-['Syne'] font-black text-2xl text-[#FFE600]">
              STAGE CLEAR! YOU WIN!
            </h3>
            <p className="font-mono text-sm text-white">
              Final Score: <span className="text-[#00F5D4] font-black">{score} PTS</span>
            </p>
            <div className="px-3 py-1 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black shadow inline-block">
              +{Math.floor(score / 10)} COINS EARNED! 🪙
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={startNewGame}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>PLAY AGAIN</span>
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="text-center space-y-4 max-w-sm animate-scale-up">
            <div className="text-5xl">⏰</div>
            <h3 className="font-['Syne'] font-black text-2xl text-[#FF2A85]">
              TIME UP! GAME OVER
            </h3>
            <p className="font-mono text-xs text-zinc-300">
              You ran out of time! Try again to beat your record.
            </p>
            <button
              onClick={startNewGame}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow-[3px_3px_0px_#000] mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>TRY AGAIN</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
