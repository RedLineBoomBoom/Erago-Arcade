import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, X } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';

interface ConsoleBootLoaderProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type BootPhase = 'crt_warmup' | 'bios' | 'logo' | 'ready' | 'exit';

interface BiosLogLine {
  text: string;
  highlight?: boolean;
  color?: string;
  delayMs: number;
}

const BIOS_LOGS: BiosLogLine[] = [
  { text: 'ERAGO ARCADE BIOS V3.2 // REV 1994-2026', highlight: true, color: 'text-[#00F5D4]', delayMs: 120 },
  { text: 'HARDWARE SELF-TEST INITIATED (POST)...', color: 'text-zinc-400', delayMs: 320 },
  { text: 'MAIN CPU: MOTOROLA 68000 @ 16.67 MHz ......... [OK]', color: 'text-emerald-400', delayMs: 600 },
  { text: 'AUDIO CO-PROCESSOR: ZILOG Z80 @ 4.0 MHz ...... [OK]', color: 'text-emerald-400', delayMs: 880 },
  { text: 'RAM CHECK: 2048 KB BASE // 512 KB VRAM ....... [OK]', color: 'text-emerald-400', delayMs: 1150 },
  { text: 'SOUND DSP: YAMAHA YM2612 6-CHANNEL STEREO FM . [ONLINE]', color: 'text-yellow-400', delayMs: 1420 },
  { text: 'MOUNTING CARTRIDGE: "ERAGO TRIVIA VAULT" ..... [0x8F3D OK]', color: 'text-[#FF2A85]', delayMs: 1700 },
  { text: 'SYSTEM BUS READY // LAUNCHING ARCADE OS...', highlight: true, color: 'text-[#FFE600]', delayMs: 1980 },
];

export const ConsoleBootLoader: React.FC<ConsoleBootLoaderProps> = ({ onComplete, onSkip }) => {
  const { t } = useLanguage();

  // Protect callbacks against parent re-renders
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onSkipRef = useRef(onSkip);
  onSkipRef.current = onSkip;

  // Boot phase state - runs immediately on mount!
  const [phase, setPhase] = useState<BootPhase>('crt_warmup');
  const [visibleBiosLines, setVisibleBiosLines] = useState<BiosLogLine[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(12);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted);

  // Speed modifier (1x or 2.2x)
  const isFastRef = useRef(isFastForward);
  isFastRef.current = isFastForward;

  const timeoutsRef = useRef<number[]>([]);
  const isExitingRef = useRef(false);

  const addTimeout = useCallback((fn: () => void, delayMs: number) => {
    const factor = isFastRef.current ? 2.2 : 1;
    const id = window.setTimeout(fn, delayMs / factor);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // Exit transition handler
  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    clearAllTimeouts();
    setPhase('exit');
    sound.resumeAudio();
    sound.playBootWhoosh();

    // Ensure BGM continues playing into main website
    if (!sound.isMuted && !sound.isBgmActive) {
      sound.startBgm();
    }

    setTimeout(() => {
      if (onSkipRef.current) {
        onSkipRef.current();
      } else {
        onCompleteRef.current();
      }
    }, 400);
  }, [clearAllTimeouts]);

  // Main synchronous boot sequence: runs directly without needing user button press
  const startBootSequence = useCallback(() => {
    clearAllTimeouts();
    setPhase('crt_warmup');
    setProgressPercent(14);

    // 1. Resume audio & start BGM immediately together at 0ms!
    sound.resumeAudio();
    if (!sound.isMuted) {
      sound.startBgm();
    }

    // 2. Play mechanical relay switch & CRT degauss buzz together at 0ms!
    sound.playRelayClick();
    sound.playCrtBuzz();

    // 3. Phase 2: BIOS Diagnostics (650ms - 2500ms)
    addTimeout(() => {
      setPhase('bios');
      setVisibleBiosLines([]);

      BIOS_LOGS.forEach((item, idx) => {
        addTimeout(() => {
          setVisibleBiosLines((prev) => [...prev, item]);

          // Sound effects for lines
          if (idx % 2 === 0) {
            sound.playBiosBeep(880 + idx * 80, 0.035);
          } else {
            sound.playDiscSeek();
          }

          // Smooth progress update
          const pct = Math.round(20 + ((idx + 1) / BIOS_LOGS.length) * 55);
          setProgressPercent(pct);
        }, item.delayMs);
      });
    }, 650);

    // 4. Phase 3: Logo Reveal & Console Boot Chime (2700ms - 4300ms)
    addTimeout(() => {
      setPhase('logo');
      setProgressPercent(88);
      sound.playConsoleBootChime();
    }, 2700);

    // 5. Phase 4: Ready Phase (4400ms - 5600ms)
    addTimeout(() => {
      setPhase('ready');
      setProgressPercent(100);
      sound.playCoin();
    }, 4400);

    // 6. Phase 5: Automatic exit to main app (5700ms)
    addTimeout(() => {
      handleExit();
    }, 5700);
  }, [addTimeout, clearAllTimeouts, handleExit]);

  // Start boot sequence immediately on mount
  useEffect(() => {
    startBootSequence();

    const unsub = sound.subscribe(() => {
      setIsMuted(sound.isMuted);
    });

    // Capture first user gesture to unlock AudioContext if browser initially paused it
    const handleFirstGesture = () => {
      sound.resumeAudio();
    };
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      unsub();
      clearAllTimeouts();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [clearAllTimeouts, startBootSequence]);

  // Global click/touch on the screen
  const handleScreenClick = () => {
    sound.resumeAudio();
    if (phase === 'ready') {
      handleExit();
    }
  };

  // Global keydown listeners for boot navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      sound.resumeAudio();

      if (e.key === 'Escape') {
        e.preventDefault();
        handleExit();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (phase === 'ready') {
          handleExit();
        } else {
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
  }, [handleExit, phase]);

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono select-none overflow-hidden transition-opacity duration-400 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* CRT Scanlines & Curved Screen Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-950 via-black to-black opacity-95" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[length:100%_4px] opacity-75" />
      <div className="absolute inset-0 pointer-events-none border-[12px] sm:border-[24px] border-[#0E1017] shadow-[inset_0_0_90px_rgba(0,0,0,0.95)]" />

      {/* Top HUD Controls Bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-2 text-zinc-500 text-[9px] sm:text-[11px] tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
          <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-emerald-400">
            ERAGO CONSOLE 1994
          </span>
          <span className="hidden md:inline text-zinc-600">// NTSC 60Hz STEREO</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Mute Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.toggleMute();
            }}
            title="Toggle Sound"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border-2 border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[10px] font-mono transition-all"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'SFX ON'}</span>
          </button>

          {/* Fast-Forward Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFastForward((prev) => !prev);
              sound.playClick();
            }}
            title="Fast Forward Boot Animation"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border-2 text-[10px] font-mono transition-all ${
              isFastForward
                ? 'border-[#FFE600] bg-[#FFE600] text-black font-bold shadow-[0_0_12px_rgba(255,230,0,0.5)]'
                : 'border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <FastForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFastForward ? '2X SPEED' : 'FF 2X'}</span>
          </button>

          {/* Skip Boot Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExit();
            }}
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
        {/* PHASE 1: CRT WARMUP LINE */}
        {phase === 'crt_warmup' && (
          <div className="w-full flex flex-col items-center justify-center space-y-4 animate-fade-in">
            <div className="w-full h-1 sm:h-1.5 bg-white shadow-[0_0_25px_#fff,0_0_50px_#00F5D4] animate-pulse rounded-full" />
            <div className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-[#00F5D4] tracking-widest animate-pulse">
              POWER ON // MONITOR WARMUP...
            </div>
          </div>
        )}

        {/* PHASE 2: BIOS DIAGNOSTICS STREAM */}
        {phase === 'bios' && (
          <div className="w-full max-w-2xl bg-black/90 border-2 border-zinc-800 p-4 sm:p-6 rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.85)] text-left space-y-2 animate-fade-in">
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleExit();
                }}
                data-cursor="START"
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-sm border-2 border-black bg-[#FFE600] hover:bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[9px] sm:text-[10px] font-bold shadow-[4px_4px_0px_#000] animate-bounce transition-all pointer-events-auto"
              >
                <span>🪙</span>
                <span>{t('boot_insert_coin')}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Progress Bar & Status Footer */}
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-3xl mx-auto w-[calc(100%-2rem)] z-30 space-y-2 pointer-events-auto">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-400">
          <span className="text-[#00F5D4] font-bold">
            {phase === 'ready'
              ? t('boot_system_ready')
              : 'LOADING MEMORY CARTRIDGE...'}
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

        <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span>PRESS [ESC] TO SKIP // [SPACE] TO ACCELERATE</span>
          </div>
          <span className="hidden sm:inline">60 FPS // PROCEDURAL AUDIO + SYNTH BGM</span>
        </div>
      </div>
    </div>
  );
};

export default ConsoleBootLoader;
