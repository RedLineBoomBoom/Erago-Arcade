import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, Play, Power, X } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';

interface ConsoleBootLoaderProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type BootPhase = 'standby' | 'crt_warmup' | 'bios' | 'logo' | 'ready' | 'exit';

interface BiosLogLine {
  text: string;
  highlight?: boolean;
  color?: string;
  delayMs: number;
}

const BIOS_LOGS: BiosLogLine[] = [
  { text: 'ERAGO ARCADE BIOS V3.2 // REV 1994-2026', highlight: true, color: 'text-[#00F5D4]', delayMs: 150 },
  { text: 'HARDWARE SELF-TEST INITIATED (POST)...', color: 'text-zinc-400', delayMs: 350 },
  { text: 'MAIN CPU: MOTOROLA 68000 @ 16.67 MHz ......... [OK]', color: 'text-emerald-400', delayMs: 650 },
  { text: 'AUDIO CO-PROCESSOR: ZILOG Z80 @ 4.0 MHz ...... [OK]', color: 'text-emerald-400', delayMs: 950 },
  { text: 'RAM CHECK: 2048 KB BASE // 512 KB VRAM ....... [OK]', color: 'text-emerald-400', delayMs: 1250 },
  { text: 'SOUND DSP: YAMAHA YM2612 6-CHANNEL STEREO FM . [ONLINE]', color: 'text-yellow-400', delayMs: 1550 },
  { text: 'MOUNTING CARTRIDGE: "ERAGO TRIVIA VAULT" ..... [0x8F3D OK]', color: 'text-[#FF2A85]', delayMs: 1850 },
  { text: 'SYSTEM BUS READY // LAUNCHING ARCADE OS...', highlight: true, color: 'text-[#FFE600]', delayMs: 2150 },
];

export const ConsoleBootLoader: React.FC<ConsoleBootLoaderProps> = ({ onComplete, onSkip }) => {
  const { t } = useLanguage();

  // Boot phase state
  const [phase, setPhase] = useState<BootPhase>('standby');
  const [visibleBiosLines, setVisibleBiosLines] = useState<BiosLogLine[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted);
  const [needsUserGesture, setNeedsUserGesture] = useState<boolean>(false);

  // Speed modifier (1 = normal, 2 = fast forward)
  const speed = isFastForward ? 2 : 1;
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const timeoutsRef = useRef<number[]>([]);

  const addTimeout = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs / speedRef.current);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // Handle termination / skip
  const handleExit = useCallback(() => {
    clearAllTimeouts();
    setPhase('exit');
    sound.playBootWhoosh();
    
    // Smooth fade out into main app
    setTimeout(() => {
      // Start BGM on entry if not muted
      if (!sound.isMuted && !sound.isBgmActive) {
        sound.startBgm();
      }
      if (onSkip) {
        onSkip();
      } else {
        onComplete();
      }
    }, 450);
  }, [clearAllTimeouts, onComplete, onSkip]);

  // Main boot runner
  const startBootSequence = useCallback(() => {
    clearAllTimeouts();
    setNeedsUserGesture(false);

    // 1. CRT Warmup Phase
    setPhase('crt_warmup');
    sound.playRelayClick();
    sound.playCrtBuzz();

    // 2. BIOS Diagnostics Phase
    addTimeout(() => {
      setPhase('bios');
      setVisibleBiosLines([]);

      // Schedule stream of BIOS lines
      BIOS_LOGS.forEach((item, idx) => {
        addTimeout(() => {
          setVisibleBiosLines((prev) => [...prev, item]);
          
          // Sound effects for lines
          if (idx % 2 === 0) {
            sound.playBiosBeep(900 + idx * 75, 0.035);
          } else {
            sound.playDiscSeek();
          }

          // Progress percentage update
          setProgressPercent(Math.round(((idx + 1) / BIOS_LOGS.length) * 60));
        }, item.delayMs);
      });
    }, 700);

    // 3. Logo Reveal & Chime Phase
    addTimeout(() => {
      setPhase('logo');
      setProgressPercent(80);
      sound.playConsoleBootChime();
    }, 3100);

    // 4. Progress Completion & Ready Prompt Phase
    addTimeout(() => {
      setPhase('ready');
      setProgressPercent(100);
      sound.playCoin();
    }, 4900);

    // 5. Automatic transition into main app
    addTimeout(() => {
      handleExit();
    }, 6400);
  }, [addTimeout, clearAllTimeouts, handleExit]);

  // Check audio context readiness or require click
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const audioReady = await sound.resumeAudio();
      if (!isMounted) return;
      if (audioReady) {
        startBootSequence();
      } else {
        // Browser requires user interaction before audio starts
        setNeedsUserGesture(true);
        setPhase('standby');
      }
    })();

    const unsub = sound.subscribe(() => {
      setIsMuted(sound.isMuted);
    });

    return () => {
      unsub();
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, startBootSequence]);

  // Global keydown listeners for boot navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleExit();
      } else if (needsUserGesture) {
        e.preventDefault();
        sound.resumeAudio();
        startBootSequence();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (phase === 'ready') {
          handleExit();
        } else {
          // Toggle fast forward
          setIsFastForward((prev) => !prev);
          sound.playClick();
        }
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        sound.toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleExit, needsUserGesture, phase, startBootSequence]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono select-none overflow-hidden transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background CRT Scanlines & Screen Curve Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-950 via-black to-black opacity-95" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-70" />
      <div className="absolute inset-0 pointer-events-none border-[12px] sm:border-[24px] border-[#0F111A] shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]" />

      {/* Top HUD Controls Bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-2 text-zinc-500 text-[9px] sm:text-[11px] tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-emerald-400">
            ERAGO CONSOLE 1994
          </span>
          <span className="hidden md:inline text-zinc-600">// NTSC 60Hz STEREO</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Mute Button */}
          <button
            onClick={() => {
              sound.toggleMute();
            }}
            title="Toggle Sound"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border-2 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[10px] font-mono transition-all"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'SFX ON'}</span>
          </button>

          {/* Fast-Forward Button */}
          {!needsUserGesture && (
            <button
              onClick={() => {
                sound.playClick();
                setIsFastForward((prev) => !prev);
              }}
              title="Fast Forward Boot Animation"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border-2 text-[10px] font-mono transition-all ${
                isFastForward
                  ? 'border-[#FFE600] bg-[#FFE600] text-black font-bold shadow-[0_0_12px_rgba(255,230,0,0.5)]'
                  : 'border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              <FastForward className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isFastForward ? '2X SPEED' : 'FF 2X'}</span>
            </button>
          )}

          {/* Skip Boot Button */}
          <button
            onClick={handleExit}
            data-cursor="SKIP"
            title="Skip Boot and Enter Arcade Directly"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs border-2 border-[#FF2A85] bg-[#FF2A85]/20 hover:bg-[#FF2A85] text-[#FF2A85] hover:text-black text-[10px] font-['Press_Start_2P'] transition-all shadow-[2px_2px_0px_#000]"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t('boot_skip')}</span>
          </button>
        </div>
      </div>

      {/* Center Screen Display Area */}
      <div className="relative z-20 w-full max-w-3xl px-4 sm:px-8 py-6 flex flex-col items-center justify-center min-h-[380px]">
        {/* STANDBY: Autoplay Unblock / Power On Prompt */}
        {needsUserGesture && (
          <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-emerald-400 bg-emerald-950/40 flex items-center justify-center shadow-[0_0_35px_rgba(0,245,212,0.4)] animate-pulse">
                <Power className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h2 className="font-['Press_Start_2P'] text-base sm:text-lg text-white tracking-wide text-stroke-black">
                ERAGO ARCADE SYSTEM
              </h2>
              <p className="font-mono text-xs sm:text-sm text-zinc-400">
                {t('boot_click_to_start')}
              </p>
            </div>

            <button
              onClick={() => {
                sound.resumeAudio();
                startBootSequence();
              }}
              data-cursor="POWER"
              className="flex items-center gap-3 px-6 py-3.5 rounded-sm border-3 border-black bg-[#00F5D4] hover:bg-[#FFE600] text-black font-['Press_Start_2P'] text-[10px] sm:text-xs font-bold transition-all shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] group"
            >
              <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
              <span>{t('boot_power_on')}</span>
            </button>
          </div>
        )}

        {/* PHASE 1: CRT WARMUP LINE */}
        {phase === 'crt_warmup' && (
          <div className="w-full flex items-center justify-center">
            <div className="w-full h-1 bg-white shadow-[0_0_20px_#fff,0_0_40px_#00F5D4] animate-pulse rounded-full" />
          </div>
        )}

        {/* PHASE 2: BIOS DIAGNOSTICS STREAM */}
        {phase === 'bios' && (
          <div className="w-full max-w-2xl bg-black/85 border-2 border-zinc-800 p-4 sm:p-6 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] text-left space-y-2">
            <div className="border-b border-zinc-800 pb-2 mb-3 flex items-center justify-between text-[10px] text-zinc-500 font-['Press_Start_2P']">
              <span>SYSTEM POST V3.2</span>
              <span>640KB BASE OK</span>
            </div>

            <div className="font-mono text-xs sm:text-sm space-y-1.5 leading-relaxed min-h-[190px]">
              {visibleBiosLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`${line.color || 'text-zinc-300'} ${
                    line.highlight ? 'font-bold' : ''
                  } animate-fade-in flex items-center justify-between`}
                >
                  <span>{line.text}</span>
                </div>
              ))}
              <div className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
            </div>
          </div>
        )}

        {/* PHASE 3 & 4: 3D CHROME LOGO REVEAL & CHIME */}
        {(phase === 'logo' || phase === 'ready') && (
          <div className="flex flex-col items-center justify-center text-center space-y-5 animate-cartridge-slam">
            {/* Holographic Glowing Badge */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FF2A85] via-[#FFE600] to-[#00F5D4] rounded-2xl blur-lg opacity-75 animate-pulse" />

              <div className="relative px-6 py-5 sm:px-10 sm:py-7 rounded-xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#000] flex flex-col items-center gap-3">
                <img
                  src="/images/erago-logo.png"
                  alt="ERAGO ARCADE"
                  className="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,245,212,0.6)]"
                />

                <div className="flex items-center gap-2">
                  <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[#FFE600] tracking-wider">
                    ARCADE
                  </span>
                  <span className="text-[10px] sm:text-xs text-zinc-400 font-mono">//</span>
                  <span className="font-mono text-[9px] sm:text-[11px] text-[#00F5D4] font-bold">
                    SYSTEM 1994
                  </span>
                </div>

                {/* Shimmering Laser Scanline across Logo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                  <div className="animate-laser-scan" />
                </div>
              </div>
            </div>

            {/* Subtitle & License Statement */}
            <div className="space-y-1 max-w-md">
              <div className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-[#00F5D4] tracking-widest">
                16-BIT MULTI-SYSTEM ENTERTAINMENT
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] text-zinc-400">
                PRODUCED BY ERAGO RETRO ENTERTAINMENT CORP // ALL RIGHTS RESERVED
              </div>
            </div>

            {/* Interactive Insert Coin / Press Start Prompt in Ready Phase */}
            {phase === 'ready' && (
              <button
                onClick={handleExit}
                data-cursor="START"
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-sm border-2 border-black bg-[#FFE600] hover:bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[9px] sm:text-[10px] font-bold shadow-[4px_4px_0px_#000] animate-bounce transition-all"
              >
                <span>🪙</span>
                <span>{t('boot_insert_coin')}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Progress Bar & Status Footer */}
      {!needsUserGesture && (
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-3xl mx-auto w-[calc(100%-2rem)] z-30 space-y-2 pointer-events-auto">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-400">
            <span className="text-[#00F5D4] font-bold">
              {phase === 'ready' ? t('boot_system_ready') : 'LOADING MEMORY CARTRIDGE...'}
            </span>
            <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600]">
              {progressPercent}%
            </span>
          </div>

          {/* Segmented Retro Progress Bar */}
          <div className="w-full h-3.5 sm:h-4 bg-zinc-900 border-2 border-black rounded-xs overflow-hidden p-0.5 shadow-[2px_2px_0px_#000]">
            <div
              className="h-full bg-gradient-to-r from-[#FF2A85] via-[#FFE600] to-[#00F5D4] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-zinc-600 font-mono">
            <span>PRESS [ESC] TO SKIP // [SPACE] TO ACCELERATE</span>
            <span className="hidden sm:inline">60 FPS // SYNTHESIZED PROCEDURAL AUDIO</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsoleBootLoader;
