import { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const isFirstMove = useRef(true);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (isFirstMove.current) {
        isFirstMove.current = false;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        setIsVisible(true);
      }

      // 0ms instant GPU translation for the center dot anchor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover targets cleanly without excessive re-renders
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, [data-cursor]');
      if (interactive) {
        const label = interactive.getAttribute('data-cursor') || null;
        setIsHovering(true);
        setHoverLabel((prev) => (prev !== label ? label : prev));
      } else {
        setIsHovering((prev) => (prev ? false : prev));
        setHoverLabel((prev) => (prev !== null ? null : prev));
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsClicking(true);
    };

    const onMouseUp = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsClicking(false);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Highly responsive trailing physics loop (0.55 lerp: swift, tactile, and locked to cursor)
    const animate = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      ringPos.current.x += dx * 0.55;
      ringPos.current.y += dy * 0.55;

      if (ringRef.current) {
        // Translation only on the outer anchor, avoiding CSS scale coordinate corruption
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-9999 select-none transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Trailing arcade target ring (outer anchor at ringPos) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      >
        {/* Inner visual element: centered with translate(-50%, -50%) and scaled cleanly in-place */}
        <div
          className="flex items-center justify-center rounded-full transition-[width,height,border-color,background-color,transform] duration-100 ease-out"
          style={{
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
            width: isHovering ? '54px' : '28px',
            height: isHovering ? '54px' : '28px',
            borderColor: isHovering ? '#FF2A85' : 'rgba(255, 230, 0, 0.85)',
            borderWidth: '2px',
            borderStyle: isHovering ? 'solid' : 'dashed',
            backgroundColor: isHovering ? 'rgba(255, 42, 133, 0.18)' : 'transparent',
            boxShadow: isClicking ? '0 0 12px rgba(255, 230, 0, 0.6)' : 'none',
          }}
        >
          {hoverLabel && (
            <span className="font-['Press_Start_2P'] text-[7px] text-[#FFE600] tracking-tighter select-none">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>

      {/* 2. Central pinpoint dot (outer anchor at instant mousePos) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      >
        <div
          className="rounded-full transition-[transform,background-color,box-shadow] duration-75 ease-out"
          style={{
            width: '8px',
            height: '8px',
            transform: `translate(-50%, -50%) scale(${isClicking ? 1.4 : 1})`,
            backgroundColor: isClicking ? '#FFE600' : '#00F5D4',
            boxShadow: isClicking ? '0 0 14px #FFE600' : '0 0 8px #00F5D4',
          }}
        />
      </div>
    </div>
  );
};
