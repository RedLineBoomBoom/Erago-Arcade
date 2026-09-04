import React, { useState } from 'react';
import { X, Volume2, Sparkles, Disc3 } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface ArcadeSoundboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SoundPad {
  id: string;
  name: string;
  sub: string;
  color: string;
  icon: string;
  action: (pitchMod: number) => void;
}

export const ArcadeSoundboard: React.FC<ArcadeSoundboardProps> = ({ isOpen, onClose }) => {
  const [pitchMod, setPitchMod] = useState<number>(1.0);
  const [activePad, setActivePad] = useState<string | null>(null);

  const pads: SoundPad[] = [
    {
      id: 'coin',
      name: 'INSERT COIN',
      sub: '25¢ ARCADE CHIME',
      color: '#FFE600',
      icon: '🪙',
      action: () => sound.playCoin(),
    },
    {
      id: 'powerup',
      name: 'POWER UP',
      sub: 'RISING ARPEGGIO',
      color: '#00F5D4',
      icon: '🍄',
      action: (mod) => sound.playPowerUp(mod),
    },
    {
      id: 'explosion',
      name: '8-BIT BOOM',
      sub: 'CRUNCHY BLAST',
      color: '#FF2A85',
      icon: '💥',
      action: () => sound.playExplosion(),
    },
    {
      id: 'oneup',
      name: '1-UP LIFE',
      sub: 'EXTRA CREDIT',
      color: '#00F566',
      icon: '👾',
      action: () => sound.play1Up(),
    },
    {
      id: 'laser',
      name: 'LASER BLAST',
      sub: 'PEW-PEW RAY',
      color: '#00F5D4',
      icon: '⚡',
      action: () => sound.playLaser(),
    },
    {
      id: 'warp',
      name: 'WARP GLIDE',
      sub: 'TELEPORT JUMP',
      color: '#9D4EDD',
      icon: '🚀',
      action: () => sound.playWarp(),
    },
    {
      id: 'kart',
      name: 'KART BOOST',
      sub: 'ENGINE ACCEL',
      color: '#FF8700',
      icon: '🏎️',
      action: () => sound.playKartBoost(),
    },
    {
      id: 'jackpot',
      name: 'JACKPOT WIN',
      sub: 'VICTORY FANFARE',
      color: '#FFE600',
      icon: '🏆',
      action: () => sound.playJackpot(),
    },
  ];

  const handleTrigger = (pad: SoundPad) => {
    setActivePad(pad.id);
    pad.action(pitchMod);
    setTimeout(() => setActivePad(null), 250);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-xl bg-[#14161F] border-4 border-black rounded-2xl shadow-[10px_10px_0px_#000] overflow-hidden text-white animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FF2A85] border-b-4 border-black text-black">
          <div className="flex items-center gap-2 font-black text-sm tracking-wider uppercase">
            <Volume2 className="w-5 h-5 text-black animate-pulse" />
            <span>ERAGO ARCADE // POCKET SFX SYNTH</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-1 px-2 py-1 bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-xs uppercase rounded transition-colors border-2 border-black"
          >
            <X className="w-4 h-4" />
            <span>ESC [CLOSE]</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Synth Controls & Equalizer Simulation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 bg-black/60 border-2 border-white/10 rounded-xl">
            <div className="flex items-center gap-2">
              <Disc3 className="w-4 h-4 text-[#00F5D4] animate-spin" />
              <span className="font-['Press_Start_2P'] text-[8px] text-zinc-300">PITCH PRESET:</span>
              <div className="flex gap-1">
                {[
                  { label: '0.8x LO-FI', val: 0.8 },
                  { label: '1.0x NORM', val: 1.0 },
                  { label: '1.25x HYPER', val: 1.25 },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => {
                      sound.playClick();
                      setPitchMod(p.val);
                    }}
                    className={`px-2 py-1 font-['Press_Start_2P'] text-[7px] rounded border transition-colors ${
                      pitchMod === p.val
                        ? 'bg-[#FFE600] text-black border-black font-bold'
                        : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Equalizer LED bars */}
            <div className="flex items-end gap-1 h-5">
              {[40, 80, 60, 100, 75, 90, 50, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-[#00F5D4] rounded-t transition-all duration-150"
                  style={{
                    height: activePad ? `${h}%` : '20%',
                    backgroundColor: activePad ? '#FF2A85' : '#00F5D4',
                  }}
                />
              ))}
            </div>
          </div>

          {/* 8-Pad Arcade Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pads.map((pad) => {
              const isActive = activePad === pad.id;
              return (
                <button
                  key={pad.id}
                  onClick={() => handleTrigger(pad)}
                  data-cursor="PLAY"
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-3 border-black text-center transition-all duration-100 select-none ${
                    isActive 
                      ? 'scale-95 shadow-none' 
                      : 'hover:-translate-y-0.5 shadow-[4px_4px_0px_#000]'
                  }`}
                  style={{
                    backgroundColor: isActive ? pad.color : '#1A1C28',
                    color: isActive ? '#000' : '#FFF',
                  }}
                >
                  <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">
                    {pad.icon}
                  </span>
                  <span className="font-['Press_Start_2P'] text-[8px] font-bold tracking-tight block">
                    {pad.name}
                  </span>
                  <span className={`font-mono text-[9px] mt-1 block ${
                    isActive ? 'text-black/80 font-bold' : 'text-zinc-400'
                  }`}>
                    {pad.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0d0d11] border-t-4 border-black font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 font-['Press_Start_2P'] text-[7px] text-zinc-500">
            <Sparkles className="w-3 h-3 text-[#FFE600]" />
            <span>100% REALTIME WEB AUDIO PROCEDURAL SYNTHESIS</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-bold uppercase text-[11px] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
