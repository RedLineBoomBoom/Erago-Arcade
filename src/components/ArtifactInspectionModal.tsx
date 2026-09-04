import React, { useEffect } from 'react';
import { X, ZoomIn, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';


export interface InspectionModalData {
  type: 'character' | 'game';
  title: string;
  subtitle: string;
  badge: string;
  japanese?: string;
  imageUrl: string;
  quote?: string;
  details: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  loreSnippet: string;
  themeColor: string;
}

interface ArtifactInspectionModalProps {
  data: InspectionModalData | null;
  onClose: () => void;
}

export const ArtifactInspectionModal: React.FC<ArtifactInspectionModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    if (!data) return;

    sound.playCoin();
    unlockAchievement('ARCHIVE_INSPECTOR');

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };


    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Archive Inspection Modal"
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl lg:max-w-4xl max-h-[92vh] flex flex-col bg-[#141419] border-4 border-black rounded-2xl shadow-[12px_12px_0px_#000] overflow-hidden text-white animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: data.themeColor }}
      >
        {/* Retro Header Bar */}
        <div 
          className="flex items-center justify-between px-4 py-3 border-b-4 border-black font-black uppercase text-xs sm:text-sm tracking-widest select-none"
          style={{ backgroundColor: data.themeColor, color: '#000' }}
        >
          <div className="flex items-center gap-2">
            <ZoomIn className="w-4 h-4 animate-spin-slow shrink-0" />
            <span className="break-words">ARCHIVAL INSPECTION // {data.type === 'character' ? 'EXHIBIT A: HERO DOSSIER' : 'EXHIBIT B: BOX ART ARTIFACT'}</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-xs uppercase rounded transition-colors border-2 border-black shrink-0 ml-2"
            aria-label="Close Inspection"
          >
            <X className="w-4 h-4" />
            <span>ESC [CLOSE]</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {/* Main Showcase Hero */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {/* Image Frame */}
            <div className="relative w-48 sm:w-64 h-60 sm:h-80 shrink-0 bg-black/70 border-4 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_#000] flex items-center justify-center group">
              <img 
                src={data.imageUrl} 
                alt={data.title}
                className="w-full h-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Scanline CRT overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

              {/* Status Badge */}
              <div 
                className="absolute bottom-2 left-2 right-2 text-center font-mono font-black text-[10px] tracking-wider uppercase px-2 py-1 bg-black/90 border border-white/20 rounded shadow break-words"
                style={{ color: data.themeColor }}
              >
                {data.badge}
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 flex flex-col justify-between space-y-3 text-center sm:text-left min-w-0">
              {data.japanese && (
                <div className="font-mono text-xs text-gray-400 tracking-widest uppercase break-words">
                  {data.japanese}
                </div>
              )}

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight break-words">
                {data.title}
              </h2>

              <p className="font-mono text-xs sm:text-sm text-gray-300 font-semibold break-words leading-relaxed">
                {data.subtitle}
              </p>

              {/* Quote Bubble if Character */}
              {data.quote && (
                <div className="relative p-3 bg-black/60 border-2 border-white/10 rounded-xl text-xs sm:text-sm italic text-gray-300 font-mono break-words leading-relaxed">
                  {data.quote}
                </div>
              )}

              {/* Verified Seal */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#00F5D4]/15 border border-[#00F5D4]/40 font-mono text-[11px] font-black text-[#00F5D4] uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  AUTHENTIC RETRO ROM VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="border-t-2 border-white/10 pt-4">
            <h3 className="font-mono font-black text-xs uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: data.themeColor }} />
              TECHNICAL SPECIFICATIONS & ARCHIVAL DOSSIER
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {data.details.map((detail, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-black/60 border border-white/10 rounded-xl gap-1.5 sm:gap-4 hover:border-white/20 transition-colors"
                >
                  <span className="text-gray-400 flex items-center gap-1.5 shrink-0 font-bold uppercase text-[11px]">
                    {detail.icon}
                    {detail.label}:
                  </span>
                  <span className="text-white font-bold text-left sm:text-right text-xs break-words leading-relaxed selection:bg-[#FFE600] selection:text-black">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Trivia Lore */}
          <div className="p-4 bg-black/50 border-2 border-dashed border-white/20 rounded-xl font-mono text-xs leading-relaxed text-gray-300 break-words">
            <div className="font-black text-white uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              ARCHIVAL CURATOR NOTE:
            </div>
            <p className="leading-relaxed">
              {data.loreSnippet}
            </p>

          </div>
        </div>


        {/* Footer Actions */}

        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d11] border-t-4 border-black font-mono text-xs">
          <span className="text-gray-500 font-bold uppercase hidden sm:inline">
            ERAGO ARCADE ARCHIVE // PRESS [ESC] TO CLOSE
          </span>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 bg-[#FFE600] text-black font-black uppercase tracking-wider rounded-lg border-2 border-black hover:bg-white transition-colors ml-auto shadow-[3px_3px_0px_#000]"
          >
            RETURN TO VAULT
          </button>
        </div>
      </div>
    </div>
  );
};
