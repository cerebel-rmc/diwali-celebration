import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEffects';

export type ClickAnimationMode = 'phuljhari' | 'atishbazi' | 'pushpa' | 'grand';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  prevX: number;
  prevY: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
  kind: 'spark' | 'petal' | 'firework' | 'ambient' | 'coin';
  rotation: number;
  rotationSpeed: number;
  shimmerPhase: number;
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

interface FestiveParticleCanvasProps {
  clickMode: ClickAnimationMode;
  reducedMotion: boolean;
}

export function triggerFestiveBurst(options?: {
  type?: 'sparkler' | 'firework' | 'petals' | 'grand' | 'coins';
  x?: number;
  y?: number;
}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('diwali-celebrate', {
        detail: options || { type: 'grand' },
      })
    );
  }
}

const SPARKLER_COLORS = ['#FFFDF5', '#F5C542', '#FF9E2C', '#FF7A00', '#FFE57F'];
const FIREWORK_COLORS = ['#F5C542', '#FF7A00', '#D81B60', '#00C49A', '#FFFDF5', '#FF4081'];
const PETAL_COLORS = ['#FF7A00', '#F5C542', '#D81B60', '#FF9800', '#E91E63'];

export const FestiveParticleCanvas: React.FC<FestiveParticleCanvasProps> = ({
  clickMode,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<ClickAnimationMode>(clickMode);
  const reducedRef = useRef<boolean>(reducedMotion);

  useEffect(() => {
    modeRef.current = clickMode;
  }, [clickMode]);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const rings: ShockwaveRing[] = [];
    const MAX_PARTICLES = 180;

    // Seed gentle ambient golden embers
    const seedAmbient = () => {
      if (reducedRef.current) return;
      for (let i = 0; i < 28; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          prevX: 0,
          prevY: 0,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(0.2 + Math.random() * 0.55),
          size: 1.2 + Math.random() * 2.2,
          color: SPARKLER_COLORS[Math.floor(Math.random() * SPARKLER_COLORS.length)],
          alpha: 0.2 + Math.random() * 0.55,
          decay: 0.0005,
          gravity: -0.002,
          drag: 0.999,
          kind: 'ambient',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: 0.01,
          shimmerPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    seedAmbient();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const spawnSparklerBurst = (x: number, y: number, count = 22) => {
      rings.push({
        x,
        y,
        radius: 4,
        maxRadius: 56,
        color: '#F5C542',
        alpha: 0.75,
      });

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        const speed = 2.2 + Math.random() * 6.8;
        particles.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: 1.6 + Math.random() * 2.4,
          color: SPARKLER_COLORS[Math.floor(Math.random() * SPARKLER_COLORS.length)],
          alpha: 1,
          decay: 0.016 + Math.random() * 0.014,
          gravity: 0.14,
          drag: 0.96,
          kind: 'spark',
          rotation: angle,
          rotationSpeed: 0.1,
          shimmerPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnFireworkBurst = (x: number, y: number, count = 34) => {
      rings.push({
        x,
        y,
        radius: 6,
        maxRadius: 95,
        color: '#FF7A00',
        alpha: 0.85,
      });
      rings.push({
        x,
        y,
        radius: 2,
        maxRadius: 60,
        color: '#00C49A',
        alpha: 0.65,
      });

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.15;
        const ringLayer = i % 2 === 0 ? 1 : 0.6;
        const speed = (3.5 + Math.random() * 5.5) * ringLayer;
        particles.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 2.5,
          color: FIREWORK_COLORS[i % FIREWORK_COLORS.length],
          alpha: 1,
          decay: 0.014 + Math.random() * 0.01,
          gravity: 0.08,
          drag: 0.965,
          kind: 'firework',
          rotation: angle,
          rotationSpeed: 0.08,
          shimmerPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnPetalBurst = (x: number, y: number, count = 16) => {
      rings.push({
        x,
        y,
        radius: 5,
        maxRadius: 48,
        color: '#D81B60',
        alpha: 0.55,
      });

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
        const speed = 1.8 + Math.random() * 4.5;
        particles.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 5 + Math.random() * 5,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
          alpha: 0.98,
          decay: 0.008 + Math.random() * 0.007,
          gravity: 0.055,
          drag: 0.985,
          kind: 'petal',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.14,
          shimmerPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnCoinsBurst = (x: number, y: number, count = 18) => {
      rings.push({
        x,
        y,
        radius: 6,
        maxRadius: 72,
        color: '#F5C542',
        alpha: 0.9,
      });
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
        const speed = 3 + Math.random() * 5.5;
        particles.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 5.5 + Math.random() * 2.5,
          color: i % 3 === 0 ? '#FFFDF5' : '#F5C542',
          alpha: 1,
          decay: 0.011,
          gravity: 0.18,
          drag: 0.98,
          kind: 'coin',
          rotation: Math.random() * Math.PI,
          rotationSpeed: 0.18,
          shimmerPhase: Math.random() * Math.PI,
        });
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      if (reducedRef.current) return;
      const x = e.clientX;
      const y = e.clientY;

      soundEngine.playSparklerClick();

      const mode = modeRef.current;
      if (mode === 'phuljhari') {
        spawnSparklerBurst(x, y, 22);
      } else if (mode === 'atishbazi') {
        spawnFireworkBurst(x, y, 30);
      } else if (mode === 'pushpa') {
        spawnPetalBurst(x, y, 16);
      } else {
        spawnSparklerBurst(x, y, 16);
        spawnPetalBurst(x, y, 10);
      }
    };

    const handleCustomCelebrate = (ev: Event) => {
      if (reducedRef.current) return;
      const customEv = ev as CustomEvent<{
        type?: 'sparkler' | 'firework' | 'petals' | 'grand' | 'coins';
        x?: number;
        y?: number;
      }>;
      const detail = customEv.detail || {};
      const cx = detail.x ?? width / 2;
      const cy = detail.y ?? height * 0.38;

      if (detail.type === 'coins') {
        spawnCoinsBurst(cx, cy, 22);
      } else if (detail.type === 'firework') {
        spawnFireworkBurst(cx, cy, 38);
      } else if (detail.type === 'petals') {
        spawnPetalBurst(cx, cy, 24);
      } else if (detail.type === 'sparkler') {
        spawnSparklerBurst(cx, cy, 26);
      } else {
        // Grand multi-burst across screen
        spawnFireworkBurst(width * 0.25, height * 0.3, 28);
        spawnFireworkBurst(width * 0.75, height * 0.28, 28);
        spawnSparklerBurst(width * 0.5, height * 0.35, 26);
        spawnPetalBurst(width * 0.5, height * 0.2, 24);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('diwali-celebrate', handleCustomCelebrate);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render expanding shockwave rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += (r.maxRadius - r.radius) * 0.14;
        r.alpha *= 0.9;

        if (r.alpha <= 0.02) {
          rings.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }

      // Render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;

        if (p.kind === 'ambient') {
          p.x += p.vx + Math.sin(p.shimmerPhase) * 0.18;
          p.y += p.vy;
          p.shimmerPhase += 0.03;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.save();
          ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.shimmerPhase));
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          continue;
        }

        // Physics update for interactive particles
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.shimmerPhase += 0.25;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.kind === 'spark' || p.kind === 'firework') {
          // Draw glowing sparkler streak line + bright core
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(p.prevX - p.vx * 1.4, p.prevY - p.vy * 1.4);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // White-hot sparkler tip
          ctx.fillStyle = '#FFFDF5';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'petal') {
          // Draw marigold / rose petal shape
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'coin') {
          // Spinning Dhanteras gold/silver Mudra coin
          ctx.translate(p.x, p.y);
          const scaleX = Math.cos(p.rotation);
          ctx.scale(scaleX, 1);
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#FF7A00';
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#F5C542';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('diwali-celebrate', handleCustomCelebrate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
};
