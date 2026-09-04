/**
 * Neo-Retro 90s Memphis Arcade Confetti Engine
 * Zero external libraries — uses direct 2D Canvas rendering
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle' | 'triangle' | 'star';
  angle: number;
  rotationSpeed: number;
  alpha: number;
  decay: number;
}

const RETRO_PALETTE = [
  '#FF2A85', // Electric Pink
  '#00F5D4', // Cyan
  '#FFE600', // Neon Yellow
  '#9D4EDD', // Arcade Purple
  '#FF8700', // Orange
  '#FFFFFF', // White
];

export function triggerArcadeConfetti(originX?: number, originY?: number, count = 70) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const startX = originX !== undefined ? originX : window.innerWidth / 2;
  const startY = originY !== undefined ? originY : window.innerHeight / 2;

  const particles: Particle[] = [];
  const shapes: Particle['shape'][] = ['rect', 'circle', 'triangle', 'star'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 12;

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3, // Initial upward burst
      size: 6 + Math.random() * 8,
      color: RETRO_PALETTE[Math.floor(Math.random() * RETRO_PALETTE.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      angle: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      alpha: 1,
      decay: 0.012 + Math.random() * 0.015,
    });
  }

  let animationFrameId: number;

  const render = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let activeParticles = 0;

    for (const p of particles) {
      if (p.alpha <= 0) continue;
      activeParticles++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // Gravity
      p.vx *= 0.98; // Air friction
      p.angle += p.rotationSpeed;
      p.alpha = Math.max(0, p.alpha - p.decay);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size, p.size);
        ctx.lineTo(-p.size, p.size);
        ctx.closePath();
        ctx.fill();
      } else if (p.shape === 'star') {
        // Cross/pixel star
        ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
        ctx.fillRect(-p.size / 6, -p.size / 2, p.size / 3, p.size);
      }

      ctx.restore();
    }

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
    }
  };

  render();
}
