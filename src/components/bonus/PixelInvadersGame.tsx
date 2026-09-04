import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft, Heart } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { unlockAchievement } from '../../utils/achievements';
import { triggerArcadeConfetti } from '../../utils/arcadeConfetti';
import { currencyManager } from '../../utils/currencyManager';

interface PixelInvadersGameProps {
  onBack: () => void;
}

interface Invader {
  x: number;
  y: number;
  alive: boolean;
  type: 0 | 1 | 2;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
}

export const PixelInvadersGame: React.FC<PixelInvadersGameProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover' | 'won'>('ready');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem('erago_invaders_highscore');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Game internal state ref for 60fps loop
  const stateRef = useRef({
    playerX: 200,
    playerWidth: 32,
    bullets: [] as Bullet[],
    invaders: [] as Invader[],
    invaderDir: 1,
    invaderSpeed: 0.8,
    lastShootTime: 0,
    keys: { left: false, right: false, shoot: false },
    score: 0,
    lives: 3,
  });

  const startGame = () => {
    sound.playPowerUp();
    const invaders: Invader[] = [];
    const rows = 3;
    const cols = 7;
    const startX = 35;
    const startY = 35;
    const gapX = 45;
    const gapY = 30;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        invaders.push({
          x: startX + c * gapX,
          y: startY + r * gapY,
          alive: true,
          type: (r % 3) as 0 | 1 | 2,
        });
      }
    }

    stateRef.current = {
      playerX: 180,
      playerWidth: 32,
      bullets: [],
      invaders,
      invaderDir: 1,
      invaderSpeed: 1.0,
      lastShootTime: 0,
      keys: { left: false, right: false, shoot: false },
      score: 0,
      lives: 3,
    };

    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  const shootBullet = React.useCallback(() => {
    if (gameState !== 'playing') return;
    const now = Date.now();
    if (now - stateRef.current.lastShootTime < 220) return; // Rate limit
    stateRef.current.lastShootTime = now;

    sound.playLaser();
    stateRef.current.bullets.push({
      x: stateRef.current.playerX + stateRef.current.playerWidth / 2,
      y: 350,
      vy: -7,
    });
  }, [gameState]);

  // Keyboard handlers
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
      if ([' ', 'ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        stateRef.current.keys.shoot = true;
        shootBullet();
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
      if ([' ', 'ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        stateRef.current.keys.shoot = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [gameState, shootBullet]);



  // Main Canvas Render Loop
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

      // Update Player
      if (state.keys.left) state.playerX = Math.max(8, state.playerX - 4.5);
      if (state.keys.right) state.playerX = Math.min(width - state.playerWidth - 8, state.playerX + 4.5);

      // Update Bullets
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.y += b.vy;
        if (b.y < 0) {
          state.bullets.splice(i, 1);
          continue;
        }

        // Check collision with invaders
        for (const inv of state.invaders) {
          if (!inv.alive) continue;
          if (
            b.x >= inv.x &&
            b.x <= inv.x + 24 &&
            b.y >= inv.y &&
            b.y <= inv.y + 18
          ) {
            inv.alive = false;
            state.bullets.splice(i, 1);
            sound.playExplosion();
            state.score += 150;
            setScore(state.score);
            currencyManager.convertPoints(150, 'PIXEL_INVADERS');

            if (state.score > highScore) {
              setHighScore(state.score);
              try {
                localStorage.setItem('erago_invaders_highscore', state.score.toString());
              } catch {
                // Ignore
              }
            }
            break;
          }
        }
      }

      // Update Invaders
      let hitEdge = false;
      const aliveInvaders = state.invaders.filter((inv) => inv.alive);

      if (aliveInvaders.length === 0) {
        // Victory!
        sound.playJackpot();
        triggerArcadeConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
        unlockAchievement('BONUS_CHAMPION');
        setGameState('won');
        return;
      }

      for (const inv of aliveInvaders) {
        inv.x += state.invaderDir * state.invaderSpeed;
        if (inv.x > width - 30 || inv.x < 10) {
          hitEdge = true;
        }

        // If invader reaches player baseline
        if (inv.y >= 350) {
          sound.playError();
          setGameState('gameover');
          return;
        }
      }

      if (hitEdge) {
        state.invaderDir *= -1;
        for (const inv of aliveInvaders) {
          inv.y += 12;
        }
        state.invaderSpeed = Math.min(3.5, state.invaderSpeed + 0.15);
      }

      // Draw Screen
      ctx.fillStyle = '#0B0C10';
      ctx.fillRect(0, 0, width, height);

      // Background scanline grid
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.06)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Invaders
      const invaderColors = ['#FF2A85', '#00F5D4', '#FFE600'];
      for (const inv of state.invaders) {
        if (!inv.alive) continue;
        ctx.fillStyle = invaderColors[inv.type];
        // Pixel Alien shape
        ctx.fillRect(inv.x + 4, inv.y, 16, 4);
        ctx.fillRect(inv.x, inv.y + 4, 24, 8);
        ctx.fillRect(inv.x + 2, inv.y + 12, 6, 6);
        ctx.fillRect(inv.x + 16, inv.y + 12, 6, 6);
        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(inv.x + 4, inv.y + 6, 4, 4);
        ctx.fillRect(inv.x + 16, inv.y + 6, 4, 4);
      }

      // Draw Bullets
      ctx.fillStyle = '#FFE600';
      for (const b of state.bullets) {
        ctx.fillRect(b.x - 1.5, b.y, 3, 10);
      }

      // Draw Player Cannon
      ctx.fillStyle = '#00F5D4';
      ctx.fillRect(state.playerX + 12, 360, 8, 8);
      ctx.fillRect(state.playerX, 368, state.playerWidth, 12);
      ctx.fillStyle = '#FF2A85';
      ctx.fillRect(state.playerX + 4, 372, 6, 4);
      ctx.fillRect(state.playerX + 22, 372, 6, 4);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore]);

  return (
    <div className="flex flex-col h-full select-none">
      {/* Sub Header */}
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
          <div className="flex items-center gap-1 text-[#FF2A85]">
            {[...Array(lives)].map((_, i) => (
              <Heart key={i} className="w-3.5 h-3.5 fill-[#FF2A85]" />
            ))}
          </div>
          <div>SCORE: <span className="text-[#00F5D4] font-bold">{score}</span></div>
          <div className="hidden sm:block">HI-SCORE: <span className="text-[#FFE600] font-bold">{highScore}</span></div>
        </div>
      </div>

      {/* Canvas / Game Arena */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-[380px]">
        {gameState === 'ready' && (
          <div className="text-center space-y-4 max-w-sm">
            <div className="text-4xl animate-bounce">👾</div>
            <h3 className="font-['Syne'] font-black text-2xl text-white">
              PIXEL INVADERS: BUG BLASTER
            </h3>
            <p className="font-mono text-xs text-zinc-300 leading-relaxed">
              Blast descending waves of corrupted pixel bugs before they breach your memory baseline!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[9px] font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-white hover:text-black transition-colors"
            >
              INSERT COIN // LAUNCH SHIP
            </button>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'gameover' || gameState === 'won') && (
          <div className="relative border-4 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_#000] bg-black">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full max-w-[340px] sm:max-w-[400px] aspect-square block"
            />

            {gameState === 'won' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-3 p-4 animate-scale-up">
                <div className="text-4xl">🏆</div>
                <h4 className="font-['Syne'] text-2xl font-black text-[#00F5D4]">GALAXY DEFENDED!</h4>
                <p className="font-mono text-sm text-white">Score: {score} PTS</p>
                <div className="px-3 py-1 bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black shadow">
                  +{Math.floor(score / 10)} COINS EARNED! 🪙
                </div>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold rounded border-2 border-black shadow"
                >
                  PLAY AGAIN
                </button>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-3 p-4 animate-scale-up">
                <div className="text-4xl">💥</div>
                <h4 className="font-['Syne'] text-2xl font-black text-[#FF2A85]">BASE BREACHED!</h4>
                <p className="font-mono text-xs text-zinc-300">The invaders took over the arcade. Score: {score} PTS</p>
                <div className="px-3 py-1 bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[8px] font-bold rounded border border-black shadow">
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

        {/* On-Screen Touch / Mouse Controls */}
        {gameState === 'playing' && (
          <div className="flex items-center gap-3 mt-3 sm:hidden">
            <button
              onMouseDown={() => (stateRef.current.keys.left = true)}
              onMouseUp={() => (stateRef.current.keys.left = false)}
              onTouchStart={() => (stateRef.current.keys.left = true)}
              onTouchEnd={() => (stateRef.current.keys.left = false)}
              className="px-4 py-2 bg-[#1E2230] border-2 border-black text-white font-mono font-bold rounded active:bg-[#00F5D4] active:text-black"
            >
              ◀ LEFT
            </button>
            <button
              onClick={shootBullet}
              className="px-5 py-2 bg-[#FF2A85] border-2 border-black text-white font-['Press_Start_2P'] text-[8px] rounded active:scale-95"
            >
              FIRE! 🔥
            </button>
            <button
              onMouseDown={() => (stateRef.current.keys.right = true)}
              onMouseUp={() => (stateRef.current.keys.right = false)}
              onTouchStart={() => (stateRef.current.keys.right = true)}
              onTouchEnd={() => (stateRef.current.keys.right = false)}
              className="px-4 py-2 bg-[#1E2230] border-2 border-black text-white font-mono font-bold rounded active:bg-[#00F5D4] active:text-black"
            >
              RIGHT ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
