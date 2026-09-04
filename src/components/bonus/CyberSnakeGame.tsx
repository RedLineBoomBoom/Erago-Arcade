import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { unlockAchievement } from '../../utils/achievements';
import { triggerArcadeConfetti } from '../../utils/arcadeConfetti';

interface CyberSnakeGameProps {
  onBack: () => void;
}

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_COUNT = 20; // 20x20 grid (400x400)

export const CyberSnakeGame: React.FC<CyberSnakeGameProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem('erago_snake_highscore');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  const stateRef = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ] as Point[],
    dir: { x: 1, y: 0 } as Point,
    nextDir: { x: 1, y: 0 } as Point,
    food: { x: 15, y: 10 } as Point,
    score: 0,
    speed: 110, // ms per tick
  });

  const generateFood = (snake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
      if (!snake.some((s) => s.x === newFood.x && s.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  };

  const startGame = () => {
    sound.playPowerUp();
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    stateRef.current = {
      snake: initialSnake,
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: generateFood(initialSnake),
      score: 0,
      speed: 110,
    };
    setScore(0);
    setGameState('playing');
  };

  const setDirection = useCallback((dx: number, dy: number) => {
    const cur = stateRef.current.dir;
    // Prevent reversing directly
    if (dx !== 0 && cur.x === -dx) return;
    if (dy !== 0 && cur.y === -dy) return;
    stateRef.current.nextDir = { x: dx, y: dy };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        e.stopPropagation();
        setDirection(0, -1);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        e.stopPropagation();
        setDirection(0, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        e.stopPropagation();
        setDirection(-1, 0);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        e.stopPropagation();
        setDirection(1, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [gameState, setDirection]);


  // Main Game Loop (Interval based for precise grid snake physics)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = window.setInterval(() => {
      const state = stateRef.current;
      state.dir = state.nextDir;

      const head = state.snake[0];
      const newHead: Point = {
        x: head.x + state.dir.x,
        y: head.y + state.dir.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= CELL_COUNT ||
        newHead.y < 0 ||
        newHead.y >= CELL_COUNT
      ) {
        sound.playError();
        setGameState('gameover');
        return;
      }

      // Check self collision
      if (state.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        sound.playError();
        setGameState('gameover');
        return;
      }

      // Move snake
      const newSnake = [newHead, ...state.snake];

      // Check food eating
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        sound.playCoin();
        state.score += 100;
        setScore(state.score);
        state.food = generateFood(newSnake);

        if (state.score > highScore) {
          setHighScore(state.score);
          try {
            localStorage.setItem('erago_snake_highscore', state.score.toString());
          } catch {
            // Ignore
          }
        }

        if (state.score === 1000) {
          unlockAchievement('BONUS_CHAMPION');
          triggerArcadeConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
        }
      } else {
        newSnake.pop();
      }

      state.snake = newSnake;

      // Render to canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = '#0B0C10';
      ctx.fillRect(0, 0, 400, 400);

      // Grid Lines
      ctx.strokeStyle = 'rgba(0, 245, 102, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 400; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
      }

      // Draw Food (Retro Floppy / Cartridge)
      ctx.fillStyle = '#FFE600';
      ctx.fillRect(
        state.food.x * GRID_SIZE + 2,
        state.food.y * GRID_SIZE + 2,
        GRID_SIZE - 4,
        GRID_SIZE - 4
      );
      ctx.fillStyle = '#000';
      ctx.fillRect(
        state.food.x * GRID_SIZE + 5,
        state.food.y * GRID_SIZE + 5,
        GRID_SIZE - 10,
        GRID_SIZE - 12
      );

      // Draw Snake
      state.snake.forEach((segment, idx) => {
        ctx.fillStyle = idx === 0 ? '#00F566' : 'rgba(0, 245, 102, 0.75)';
        ctx.fillRect(
          segment.x * GRID_SIZE + 1,
          segment.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );

        // Head pixel eyes
        if (idx === 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + 4, 3, 3);
          ctx.fillRect(segment.x * GRID_SIZE + 13, segment.y * GRID_SIZE + 4, 3, 3);
        }
      });
    }, stateRef.current.speed);

    return () => clearInterval(interval);
  }, [gameState, highScore]);

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
            <Trophy className="w-3.5 h-3.5 text-[#00F566]" />
            <span>SCORE: <strong className="text-[#00F566]">{score}</strong></span>
          </div>
          <div className="hidden sm:block">HI-SCORE: <span className="text-[#FFE600] font-bold">{highScore}</span></div>
        </div>
      </div>

      {/* Arena */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-[380px]">
        {gameState === 'ready' && (
          <div className="text-center space-y-4 max-w-sm">
            <div className="text-4xl animate-bounce">🐍</div>
            <h3 className="font-['Syne'] font-black text-2xl text-white">
              CYBER SNAKE 90s
            </h3>
            <p className="font-mono text-xs text-zinc-300 leading-relaxed">
              Devour yellow floppy disks to grow your cyber viper without crashing into the boundaries!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-[#00F566] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-white transition-colors"
            >
              INSERT COIN // START SNAKE
            </button>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'gameover') && (
          <div className="relative border-4 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_#000] bg-black">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full max-w-[340px] sm:max-w-[400px] aspect-square block"
            />

            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-3 p-4 animate-scale-up">
                <div className="text-4xl">💀</div>
                <h4 className="font-['Syne'] text-2xl font-black text-[#FF2A85]">CRASHED! GAME OVER</h4>
                <p className="font-mono text-sm text-zinc-200">Final Score: {score} PTS</p>
                <button
                  onClick={startGame}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#00F566] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>PLAY AGAIN</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* On-screen D-Pad for Mobile */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center gap-1 mt-3 sm:hidden">
            <button
              onClick={() => setDirection(0, -1)}
              className="px-4 py-2 bg-[#1E2230] border-2 border-black text-white rounded font-bold"
            >
              ▲
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => setDirection(-1, 0)}
                className="px-4 py-2 bg-[#1E2230] border-2 border-black text-white rounded font-bold"
              >
                ◀
              </button>
              <button
                onClick={() => setDirection(0, 1)}
                className="px-4 py-2 bg-[#1E2230] border-2 border-black text-white rounded font-bold"
              >
                ▼
              </button>
              <button
                onClick={() => setDirection(1, 0)}
                className="px-4 py-2 bg-[#1E2230] border-2 border-black text-white rounded font-bold"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
