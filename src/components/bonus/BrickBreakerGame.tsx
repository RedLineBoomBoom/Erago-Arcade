import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { unlockAchievement } from '../../utils/achievements';
import { triggerArcadeConfetti } from '../../utils/arcadeConfetti';
import { currencyManager } from '../../utils/currencyManager';

interface BrickBreakerGameProps {
  onBack: () => void;
}

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  alive: boolean;
}

export const BrickBreakerGame: React.FC<BrickBreakerGameProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'gameover'>('ready');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem('erago_breaker_highscore');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  const stateRef = useRef({
    paddleX: 160,
    paddleW: 75,
    ballX: 200,
    ballY: 340,
    ballVx: 3.5,
    ballVy: -3.5,
    ballRadius: 6,
    bricks: [] as Brick[],
    keys: { left: false, right: false },
    score: 0,
  });

  const startGame = () => {
    sound.playPowerUp();
    const bricks: Brick[] = [];
    const rows = 4;
    const cols = 6;
    const colors = ['#FF2A85', '#00F5D4', '#FFE600', '#9D4EDD'];
    const brickW = 56;
    const brickH = 16;
    const startX = 20;
    const startY = 35;
    const gapX = 7;
    const gapY = 8;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: startX + c * (brickW + gapX),
          y: startY + r * (brickH + gapY),
          w: brickW,
          h: brickH,
          color: colors[r % colors.length],
          alive: true,
        });
      }
    }

    stateRef.current = {
      paddleX: 160,
      paddleW: 75,
      ballX: 200,
      ballY: 340,
      ballVx: 3.2 * (Math.random() > 0.5 ? 1 : -1),
      ballVy: -3.5,
      ballRadius: 6,
      bricks,
      keys: { left: false, right: false },
      score: 0,
    };

    setScore(0);
    setGameState('playing');
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        stateRef.current.keys.left = true;
      }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        stateRef.current.keys.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        stateRef.current.keys.left = false;
      }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        stateRef.current.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    };
  }, []);


  // Mouse / Touch paddle tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = 400 / rect.width;
    const clientX = (e.clientX - rect.left) * scale;
    stateRef.current.paddleX = Math.max(0, Math.min(400 - stateRef.current.paddleW, clientX - stateRef.current.paddleW / 2));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const scale = 400 / rect.width;
    const clientX = (e.touches[0].clientX - rect.left) * scale;
    stateRef.current.paddleX = Math.max(0, Math.min(400 - stateRef.current.paddleW, clientX - stateRef.current.paddleW / 2));
  };

  // 60FPS loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 400;
    const height = 400;

    const loop = () => {
      const state = stateRef.current;

      // Update paddle by keyboard
      if (state.keys.left) state.paddleX = Math.max(0, state.paddleX - 6);
      if (state.keys.right) state.paddleX = Math.min(width - state.paddleW, state.paddleX + 6);

      // Move ball
      state.ballX += state.ballVx;
      state.ballY += state.ballVy;

      // Wall bounce
      if (state.ballX - state.ballRadius <= 0) {
        state.ballX = state.ballRadius;
        state.ballVx = Math.abs(state.ballVx);
        sound.playClick();
      } else if (state.ballX + state.ballRadius >= width) {
        state.ballX = width - state.ballRadius;
        state.ballVx = -Math.abs(state.ballVx);
        sound.playClick();
      }

      if (state.ballY - state.ballRadius <= 0) {
        state.ballY = state.ballRadius;
        state.ballVy = Math.abs(state.ballVy);
        sound.playClick();
      }

      // Paddle collision
      const paddleY = 365;
      const paddleH = 12;
      if (
        state.ballY + state.ballRadius >= paddleY &&
        state.ballY - state.ballRadius <= paddleY + paddleH &&
        state.ballX >= state.paddleX - 4 &&
        state.ballX <= state.paddleX + state.paddleW + 4
      ) {
        state.ballVy = -Math.abs(state.ballVy);
        // Angle deflection based on hit position
        const hitOffset = (state.ballX - (state.paddleX + state.paddleW / 2)) / (state.paddleW / 2);
        state.ballVx = hitOffset * 4.5;
        sound.playClick();
      }

      // Bricks collision
      let activeBricksCount = 0;
      for (const b of state.bricks) {
        if (!b.alive) continue;
        activeBricksCount++;

        if (
          state.ballX + state.ballRadius >= b.x &&
          state.ballX - state.ballRadius <= b.x + b.w &&
          state.ballY + state.ballRadius >= b.y &&
          state.ballY - state.ballRadius <= b.y + b.h
        ) {
          b.alive = false;
          state.ballVy *= -1;
          sound.playPowerUp();
          state.score += 100;
          setScore(state.score);
          currencyManager.convertPoints(100, 'BRICK_BREAKER');

          if (state.score > highScore) {
            setHighScore(state.score);
            try {
              localStorage.setItem('erago_breaker_highscore', state.score.toString());
            } catch {
              // Ignore
            }
          }
          break;
        }
      }

      // Check Victory
      if (activeBricksCount === 0) {
        sound.playJackpot();
        triggerArcadeConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
        unlockAchievement('BONUS_CHAMPION');
        setGameState('won');
        return;
      }

      // Ball missed paddle (Floor)
      if (state.ballY > height + 20) {
        sound.playError();
        setGameState('gameover');
        return;
      }

      // Render
      ctx.fillStyle = '#0B0C10';
      ctx.fillRect(0, 0, width, height);

      // Neon grid
      ctx.strokeStyle = 'rgba(255, 230, 0, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Bricks
      for (const b of state.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        // Cartridge label shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(b.x + 4, b.y + 3, b.w - 8, 3);
      }

      // Draw Paddle
      ctx.fillStyle = '#FFE600';
      ctx.fillRect(state.paddleX, paddleY, state.paddleW, paddleH);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(state.paddleX, paddleY, state.paddleW, paddleH);

      // Draw Ball
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, state.ballRadius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
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
          <div>SCORE: <strong className="text-[#FFE600]">{score}</strong></div>
          <div className="hidden sm:block">HI-SCORE: <span className="text-[#00F5D4] font-bold">{highScore}</span></div>
        </div>
      </div>

      {/* Arena */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-[380px]">
        {gameState === 'ready' && (
          <div className="text-center space-y-4 max-w-sm">
            <div className="text-4xl animate-bounce">🧱</div>
            <h3 className="font-['Syne'] font-black text-2xl text-white">
              CARTRIDGE BRICK BREAKER
            </h3>
            <p className="font-mono text-xs text-zinc-300 leading-relaxed">
              Bounce the pixel ball to smash all 24 neon memory cartridges with your paddle!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-white transition-colors"
            >
              INSERT COIN // SERVE BALL
            </button>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'gameover' || gameState === 'won') && (
          <div className="relative border-4 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_#000] bg-black">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="w-full max-w-[340px] sm:max-w-[400px] aspect-square block cursor-ew-resize"
            />

            {gameState === 'won' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-3 p-4 animate-scale-up">
                <div className="text-4xl">🏆</div>
                <h4 className="font-['Syne'] text-2xl font-black text-[#FFE600]">ALL BRICKS SMASHED!</h4>
                <p className="font-mono text-sm text-white">Score: {score} PTS</p>
                <div className="px-3 py-1 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black shadow">
                  +{Math.floor(score / 10)} COINS EARNED! 🪙
                </div>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow"
                >
                  PLAY AGAIN
                </button>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-3 p-4 animate-scale-up">
                <div className="text-4xl">💔</div>
                <h4 className="font-['Syne'] text-2xl font-black text-[#FF2A85]">BALL DROPPED!</h4>
                <p className="font-mono text-sm text-zinc-200">Final Score: {score} PTS</p>
                <div className="px-3 py-1 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black shadow">
                  +{Math.floor(score / 10)} COINS EARNED! 🪙
                </div>
                <button
                  onClick={startGame}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RETRY</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
