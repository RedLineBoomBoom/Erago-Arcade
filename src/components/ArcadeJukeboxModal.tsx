import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Radio, Disc, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';

interface ArcadeJukeboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArcadeJukeboxModal: React.FC<ArcadeJukeboxModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(sound.isBgmActive);
  const [currentIdx, setCurrentIdx] = useState(sound.currentTrackIndex);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsub = sound.subscribe(() => {
      setIsPlaying(sound.isBgmActive);
      setCurrentIdx(sound.currentTrackIndex);
    });
    return unsub;
  }, []);

  // Visualizer Animation Loop
  useEffect(() => {
    if (!isOpen) return;
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const data = sound.getVisualizerData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 20;
      const barWidth = (canvas.width / barCount) - 3;
      const height = canvas.height;

      for (let i = 0; i < barCount; i++) {
        // Read raw frequency or simulate if stopped
        const val = isPlaying ? (data[i % data.length] || 0) : 4;
        const normalized = Math.min(1, Math.max(0.08, val / 220));
        const barHeight = normalized * (height - 6);

        // Neon Gradient for bars
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, '#00F5D4');
        grad.addColorStop(0.5, '#FFE600');
        grad.addColorStop(1, '#FF2A85');

        ctx.fillStyle = isPlaying ? grad : 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(
          i * (barWidth + 3) + 2,
          height - barHeight,
          barWidth,
          barHeight
        );

        // Peak dot
        ctx.fillStyle = isPlaying ? '#FFF' : 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(
          i * (barWidth + 3) + 2,
          height - barHeight - 2,
          barWidth,
          2
        );
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentTrack = sound.tracks[currentIdx] || sound.tracks[0];

  const handlePlayToggle = () => {
    sound.playClick();
    sound.toggleBgm();
    unlockAchievement('CHIPTUNE_DJ');
  };

  const handleNext = () => {
    sound.playClick();
    sound.nextTrack();
    unlockAchievement('CHIPTUNE_DJ');
  };

  const handlePrev = () => {
    sound.playClick();
    sound.prevTrack();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-xl rounded-2xl border-4 border-black bg-[#14161F] p-6 shadow-[8px_8px_0px_#000] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#9D4EDD] text-white shadow-[2px_2px_0px_#000]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg text-white">CHIPTUNE FM JUKEBOX</h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[7px] font-bold">
                  98.5 MHz
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">100% SYNTHETIC WEB AUDIO FM SYNTHESIZER</p>
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

        {/* Cassette Boombox Display */}
        <div className="relative rounded-xl border-3 border-black bg-[#0B0C10] p-4 shadow-[4px_4px_0px_#000] overflow-hidden space-y-4">
          {/* LCD Track Screen */}
          <div className="rounded-lg border-2 border-black bg-[#042018] p-3 border-emerald-900/60 flex items-center justify-between font-mono shadow-inner">
            <div className="space-y-0.5">
              <span className="text-[9px] text-[#00F5D4] tracking-widest uppercase">
                {isPlaying ? '▶ LIVE CHIPTUNE BROADCAST' : '❚❚ FM RECEIVER PAUSED'}
              </span>
              <div className="font-['Press_Start_2P'] text-xs sm:text-sm text-[#FFE600] truncate max-w-[280px]">
                {currentTrack.name}
              </div>
              <div className="text-[10px] text-zinc-400">
                {currentTrack.genre} • {currentTrack.bpm} BPM • {currentTrack.vibe}
              </div>
            </div>

            <span className="text-xl">📻</span>
          </div>

          {/* Animated Cassette Tape Spools */}
          <div className="relative h-24 rounded-lg border-2 border-black bg-[#1A1C26] p-2 flex items-center justify-around overflow-hidden">
            {/* Left Spool */}
            <div className="flex items-center gap-3">
              <div
                className={`relative w-14 h-14 rounded-full border-3 border-black bg-[#10121A] flex items-center justify-center shadow-inner ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              >
                <Disc className="w-9 h-9 text-[#00F5D4]/40" />
                <div className="absolute w-3 h-3 rounded-full bg-white border border-black" />
              </div>
            </div>

            {/* Center Cassette Label */}
            <div className="px-3 py-1 bg-[#FFE600] border-2 border-black rounded text-center">
              <span className="font-['Press_Start_2P'] text-[7px] text-black font-bold block">ERAGO TAPE 60</span>
              <span className="font-mono text-[8px] text-black/70">HIGH BIAS // TYPE II</span>
            </div>

            {/* Right Spool */}
            <div className="flex items-center gap-3">
              <div
                className={`relative w-14 h-14 rounded-full border-3 border-black bg-[#10121A] flex items-center justify-center shadow-inner ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              >
                <Disc className="w-9 h-9 text-[#FF2A85]/40" />
                <div className="absolute w-3 h-3 rounded-full bg-white border border-black" />
              </div>
            </div>
          </div>

          {/* Real-time Equalizer Visualizer */}
          <div className="rounded border border-white/10 bg-black/50 p-2">
            <canvas ref={canvasRef} width={480} height={50} className="w-full h-12 block" />
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2.5 rounded-lg border-2 border-black bg-[#1E2230] text-white font-mono font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-all"
          >
            <SkipBack className="w-4 h-4" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <button
            onClick={handlePlayToggle}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-3 border-black font-['Press_Start_2P'] text-[9px] font-bold shadow-[4px_4px_0px_#000] transition-all ${
              isPlaying
                ? 'bg-[#FF2A85] text-white hover:bg-white hover:text-black'
                : 'bg-[#00F5D4] text-black hover:bg-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>PAUSE BGM</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>PLAY RADIO</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2.5 rounded-lg border-2 border-black bg-[#1E2230] text-white font-mono font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-all"
          >
            <span className="hidden sm:inline">NEXT</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Station Track List */}
        <div className="space-y-1.5 pt-2">
          <span className="font-['Press_Start_2P'] text-[7px] text-zinc-400">CHIPTUNE PRESETS:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sound.tracks.map((t, idx) => {
              const isSelected = currentIdx === idx;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    sound.setTrack(idx);
                    if (!isPlaying) sound.toggleBgm();
                    unlockAchievement('CHIPTUNE_DJ');
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg border-2 border-black font-mono text-xs transition-all text-left ${
                    isSelected
                      ? 'bg-[#FFE600] text-black font-bold shadow-[2px_2px_0px_#000]'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <div className="truncate">
                    <span className="font-bold mr-1.5">{idx + 1}.</span>
                    <span>{t.name}</span>
                  </div>
                  {isSelected && isPlaying && (
                    <Sparkles className="w-3.5 h-3.5 text-black shrink-0 animate-spin" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
