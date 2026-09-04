import React, { useEffect, useState } from 'react';

export const ArcadeWallpaper: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) - 0.5;
          const y = (e.clientY / window.innerHeight) - 0.5;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">

      {/* 1. Deep Space Cosmic Base Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#07080C] via-[#0B0C12] to-[#050608]" 
      />

      {/* 2. Dynamic Ambient Neon Plasma Flares (Subtly follows cursor) */}
      <div 
        className="absolute -top-[12%] -left-[8%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] opacity-30 mix-blend-screen transition-transform duration-700 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, #00F5D4 0%, #0077b6 45%, transparent 70%)',
          transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)`,
        }}
      />
      <div 
        className="absolute -top-[10%] -right-[8%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full blur-[150px] opacity-25 mix-blend-screen transition-transform duration-700 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, #FF2A85 0%, #7209b7 45%, transparent 70%)',
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`,
        }}
      />
      <div 
        className="absolute top-[40%] left-[25%] w-[45vw] h-[35vw] max-w-[650px] max-h-[500px] rounded-full blur-[160px] opacity-15 mix-blend-screen transition-transform duration-1000 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, #FFE600 0%, #ff5400 45%, transparent 70%)',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      />

      {/* 3. Retro Dot Matrix / Crosshair Texture Grid */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.45) 1.5px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px, 108px 108px, 108px 108px',
        }}
      />

      {/* 4. 3D Synthwave Perspective Floor Horizon (Bottom 38%) */}
      <div className="absolute bottom-0 inset-x-0 h-[38vh] overflow-hidden pointer-events-none opacity-45">
        {/* Horizon Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5D4] to-transparent shadow-[0_0_20px_#00F5D4]" />

        {/* Perspective Grid Plane */}
        <div 
          className="absolute inset-x-[-40%] -top-[40px] bottom-[-160px]"
          style={{
            transform: 'perspective(320px) rotateX(72deg)',
            transformOrigin: 'top center',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 245, 212, 0.35) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(255, 42, 133, 0.35) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '54px 40px',
          }}
        />

        {/* Gradient Mask to smoothly fade floor into dark UI center */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-transparent to-[#0B0C10] opacity-85" />
      </div>

      {/* 5. 90s Memphis Neo-Retro Geometric Graphic Art (Responsive 1920x1080 SVG ViewBox) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Memphis Striped Pattern */}
          <pattern id="memphis-stripe-bg" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#FFE600" strokeWidth="2.5" />
          </pattern>
          {/* Memphis Dot Grid Pattern */}
          <pattern id="memphis-dots-bg" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#00F5D4" />
          </pattern>
        </defs>

        {/* --- LEFT FLANK ACCENTS (Behind / Beside Left Character Wing) --- */}
        <g 
          style={{ 
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
            transition: 'transform 0.4s ease-out' 
          }}
        >
          {/* Large Memphis Triangle (Erago 'A' motif) */}
          <polygon 
            points="140,110 230,260 50,260" 
            fill="none" 
            stroke="#00F5D4" 
            strokeWidth="3.5" 
            strokeDasharray="8 6"
          />
          <polygon points="140,135 210,250 70,250" fill="url(#memphis-dots-bg)" opacity="0.4" />

          {/* Electric Hot Pink 90s Squiggle */}
          <path 
            d="M 40,360 Q 70,330 100,360 T 160,360 T 220,360 T 280,360" 
            fill="none" 
            stroke="#FF2A85" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />

          {/* Retro Arcade Plus Signs & Sparkles */}
          <text x="60" y="520" fill="#FFE600" fontSize="28" fontFamily="monospace" fontWeight="bold">✚</text>
          <text x="210" y="470" fill="#00F5D4" fontSize="22" fontFamily="monospace">✦</text>
          <text x="90" y="650" fill="#9D4EDD" fontSize="26" fontFamily="monospace">✱</text>
          <text x="180" y="730" fill="#FF2A85" fontSize="18" fontFamily="monospace">▲</text>

          {/* Mini 8-Bit Pixel Invader Wireframe */}
          <rect x="70" y="800" width="8" height="24" fill="#00F5D4" opacity="0.6" />
          <rect x="78" y="792" width="16" height="32" fill="#00F5D4" opacity="0.6" />
          <rect x="94" y="800" width="8" height="24" fill="#00F5D4" opacity="0.6" />
          <rect x="82" y="804" width="4" height="4" fill="#000" />
          <rect x="90" y="804" width="4" height="4" fill="#000" />
        </g>

        {/* --- RIGHT FLANK ACCENTS (Behind / Beside Right Game Box Wing) --- */}
        <g 
          style={{ 
            transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)`,
            transition: 'transform 0.4s ease-out' 
          }}
        >
          {/* Memphis Striped Circle (Erago 'O' motif) */}
          <circle 
            cx="1750" 
            cy="190" 
            r="65" 
            fill="url(#memphis-stripe-bg)" 
            stroke="#FFE600" 
            strokeWidth="3.5" 
            opacity="0.65"
          />
          <circle 
            cx="1750" 
            cy="190" 
            r="82" 
            fill="none" 
            stroke="#FF2A85" 
            strokeWidth="2.5" 
            strokeDasharray="9 7"
          />

          {/* Stepped Bauhaus / Deco Staircase */}
          <path 
            d="M 1660,340 h 25 v -25 h 25 v -25 h 25 v -25 h 25" 
            fill="none" 
            stroke="#00F5D4" 
            strokeWidth="4" 
            strokeLinecap="square"
          />

          {/* Floating Plus & Star Glyphs */}
          <text x="1810" y="440" fill="#FF2A85" fontSize="32" fontFamily="monospace" fontWeight="bold">✚</text>
          <text x="1670" y="540" fill="#FFE600" fontSize="24" fontFamily="monospace">✦</text>
          <text x="1780" y="660" fill="#00F5D4" fontSize="22" fontFamily="monospace">✖</text>
          <text x="1690" y="760" fill="#9D4EDD" fontSize="26" fontFamily="monospace">●</text>

          {/* Isometric Diamond Wireframe */}
          <polygon 
            points="1780,820 1820,860 1780,900 1740,860" 
            fill="none" 
            stroke="#FFE600" 
            strokeWidth="2.5" 
            strokeDasharray="6 4"
            opacity="0.6"
          />
        </g>

        {/* --- TOP HEADER ACCENTS --- */}
        <g opacity="0.3">
          <circle cx="450" cy="50" r="14" fill="none" stroke="#FFE600" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="1470" cy="50" r="14" fill="none" stroke="#00F5D4" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 940,30 L 960,10 L 980,30" fill="none" stroke="#FF2A85" strokeWidth="2" />
        </g>
      </svg>

      {/* 6. Cinematic Vignette Mask (Keeps central card crystal-clear & readable) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_48%,transparent_35%,rgba(7,8,12,0.85)_95%)] pointer-events-none" 
      />
    </div>
  );
};
