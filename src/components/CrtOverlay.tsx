import React from 'react';

interface CrtOverlayProps {
  enabled: boolean;
}

export const CrtOverlay: React.FC<CrtOverlayProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Scanline pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-75" 
      />
      {/* Phosphor RGB subpixel array */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.015),rgba(0,0,255,0.03))] bg-[length:6px_100%] opacity-90" 
      />
      {/* CRT Vignette / Curved Screen Edge Shadow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.65)_100%)]" 
      />
      {/* Retro Status watermark in corner */}
      <div className="absolute bottom-3 right-4 font-['Press_Start_2P'] text-[9px] text-[#00f5d4]/60 tracking-wider">
        CRT-RGB MODE // 60Hz
      </div>
    </div>
  );
};
