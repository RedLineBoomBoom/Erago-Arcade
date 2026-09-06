import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Zap, Gauge, Sparkles } from 'lucide-react';

interface MatrixRainCanvasProps {
  className?: string;
  isBackground?: boolean;
  onExit?: () => void;
  language?: 'id' | 'en';
}

const GLYPHS = 
  'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ' +
  '0123456789' +
  'ABCDEFXYZ' +
  ':・."=*+-<>|%&$#@!' +
  '01010101';

export const MatrixRainCanvas: React.FC<MatrixRainCanvasProps> = ({
  className = '',
  isBackground = false,
  onExit,
  language = 'id',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [speedLevel, setSpeedLevel] = useState<'normal' | 'fast' | 'slow'>('normal');

  // Animation refs
  const animFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Speed intervals (ms per frame)
  const speedInterval = speedLevel === 'fast' ? 22 : speedLevel === 'slow' ? 65 : 35;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      columns = Math.floor(width / fontSize);
      drops = [];
      speeds = [];

      for (let i = 0; i < columns; i++) {
        // Random initial vertical position staggered across and above screen
        drops[i] = Math.floor(Math.random() * -40);
        // Column speeds: 1 is standard, 2 is fast drop
        speeds[i] = Math.random() > 0.8 ? 2 : 1;
      }

      // Initial dark canvas clear
      ctx.fillStyle = '#070D09';
      ctx.fillRect(0, 0, width, height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const render = (time: number) => {
      animFrameId.current = requestAnimationFrame(render);

      if (time - lastTimeRef.current < speedInterval) {
        return;
      }
      lastTimeRef.current = time;

      if (!ctx || width === 0 || height === 0) return;

      // Authentic trailing phosphor fade
      ctx.fillStyle = isBackground ? 'rgba(7, 13, 9, 0.22)' : 'rgba(7, 13, 9, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < columns; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y > 0 && y < height + fontSize * 2) {
          // Leading drop is crisp white/pale green with intense glow
          ctx.shadowColor = '#00FF66';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(char, x, y);

          // Second drop trailing is bright matrix neon green
          if (drops[i] > 1) {
            const prevChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            ctx.shadowBlur = 4;
            ctx.fillStyle = '#00F5D4';
            ctx.fillText(prevChar, x, y - fontSize);
          }
        }

        // Reset drop to top with randomized delay once it leaves the bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = Math.random() > 0.8 ? 2 : 1;
        } else {
          drops[i] += speeds[i];
        }
      }
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      resizeObserver.disconnect();
    };
  }, [speedInterval, isBackground]);

  // Keyboard navigation for interactive exit
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isBackground) return;
      if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onExit?.();
      } else if (e.key === ' ') {
        e.preventDefault();
        setSpeedLevel((prev) => (prev === 'normal' ? 'fast' : prev === 'fast' ? 'slow' : 'normal'));
      }
    },
    [isBackground, onExit]
  );

  useEffect(() => {
    if (!isBackground) {
      window.addEventListener('keydown', handleKeyDown, { capture: true });
      return () => {
        window.removeEventListener('keydown', handleKeyDown, { capture: true });
      };
    }
  }, [isBackground, handleKeyDown]);

  if (isBackground) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 pointer-events-none overflow-hidden opacity-35 ${className}`}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Subtle Scanlines overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 100, 0.08) 0px, rgba(0, 255, 100, 0.08) 1px, transparent 2px, transparent 4px)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={() => onExit?.()}
      className={`absolute inset-0 z-30 flex flex-col justify-between overflow-hidden bg-[#070D09] cursor-pointer animate-fade-in ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* CRT Scanline & Phosphor Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0, 255, 100, 0.15) 0px, rgba(0, 255, 100, 0.15) 1px, transparent 2px, transparent 4px)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(7, 13, 9, 0.75) 100%)',
        }}
      />

      {/* Top HUD Controls Bar */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-40 flex items-center justify-between p-3 bg-black/60 backdrop-blur-xs border-b border-emerald-500/30 text-xs font-mono select-none"
      >
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
          <span className="tracking-wider">
            {language === 'id' ? 'ERAGO MATRIX DIGITAL RAIN // AKTIF' : 'ERAGO MATRIX DIGITAL RAIN // ACTIVE'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Speed Toggle */}
          <button
            onClick={() => {
              setSpeedLevel((prev) => (prev === 'normal' ? 'fast' : prev === 'fast' ? 'slow' : 'normal'));
            }}
            title={language === 'id' ? 'Ganti kecepatan aliran digital rain' : 'Toggle stream speed'}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-500/50 bg-emerald-950/60 hover:bg-emerald-400 hover:text-black text-emerald-300 text-[10px] font-mono font-bold transition-all cursor-pointer"
          >
            <Gauge className="w-3 h-3" />
            <span className="uppercase">{speedLevel}</span>
          </button>

          {/* Close/Exit Button */}
          <button
            onClick={() => onExit?.()}
            title={language === 'id' ? 'Kembali ke Prompt MS-DOS (ESC)' : 'Return to MS-DOS Prompt (ESC)'}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-red-500 bg-red-950/80 hover:bg-red-500 hover:text-white text-red-300 text-[10px] font-mono font-bold transition-all cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>{language === 'id' ? 'KELUAR [ESC]' : 'EXIT [ESC]'}</span>
          </button>
        </div>
      </div>

      {/* Center Cybernetic Lore Modal Card */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-40 mx-auto my-auto max-w-lg p-5 rounded-lg border-2 border-emerald-500 bg-black/85 text-center shadow-[0_0_25px_rgba(0,255,100,0.35)] backdrop-blur-sm space-y-3 font-mono"
      >
        <div className="flex items-center justify-center gap-2 text-emerald-300 text-[11px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#00F5D4]" />
          <span>WAKE UP, NEO...</span>
          <Sparkles className="w-3.5 h-3.5 text-[#00F5D4]" />
        </div>

        <h3 className="text-sm sm:text-base font-bold text-white tracking-wide" style={{ textShadow: '0 0 8px #00FF66' }}>
          {language === 'id'
            ? 'THE ERAGO ARCADE MATRIX HAS YOU...'
            : 'THE ERAGO ARCADE MATRIX HAS YOU...'}
        </h3>

        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-[11px] leading-relaxed break-all">
          01000101 01010010 01000001 01000111 01001111 00100000 01000001 01010010 01000011 01000001 01000100 01000101<br />
          01100011 01101000 01100101 01100001 01110100 01110011 00100000 01101111 01101110 01101100 01111001
        </div>

        <p className="text-[10px] text-zinc-400">
          {language === 'id'
            ? 'Aliran kode digital real-time kini aktif di terminal retro Anda.'
            : 'Real-time phosphor digital rain is now streaming inside your retro terminal.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onExit?.()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded border-2 border-emerald-400 bg-emerald-400 text-black font-bold text-xs hover:bg-white hover:border-white transition-all shadow-[0_0_12px_rgba(0,255,100,0.5)] cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'id' ? 'KEMBALI KE C:\\ERAGO>' : 'RETURN TO C:\\ERAGO>'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Hint Strip */}
      <div className="relative z-40 p-2 bg-black/70 border-t border-emerald-500/20 text-center text-[10px] font-mono text-zinc-400 select-none">
        {language === 'id'
          ? 'Tekan [ESC] atau klik di mana saja pada layar untuk kembali ke command prompt MS-DOS'
          : 'Press [ESC] or click anywhere on the screen to return to the MS-DOS command prompt'}
      </div>
    </div>
  );
};

export default MatrixRainCanvas;
