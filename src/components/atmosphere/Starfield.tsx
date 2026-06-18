import { useEffect, useRef } from 'react';

/**
 * Starfield
 *
 * A dense, softly twinkling night sky scoped to its container — the backdrop
 * for the final contact scene. Stars are seeded once per resize; each has its
 * own twinkle phase and the brightest few flare with cross rays. Pauses when
 * off-screen and renders a single static frame under reduced-motion.
 */
export const Starfield = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    type Star = { x: number; y: number; r: number; base: number; ph: number; sp: number; flare: boolean };
    let stars: Star[] = [];
    let dpr = 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const seed = () => {
      const count = Math.min(160, Math.max(50, Math.round((w * h) / 9000)));
      stars = Array.from({ length: count }, () => {
        const r = 0.4 + Math.random() * 1.3;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          base: 0.25 + Math.random() * 0.5,
          ph: Math.random() * Math.PI * 2,
          sp: 0.3 + Math.random() * 0.8,
          flare: r > 1.4,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (tw: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = Math.max(0, s.base * (0.6 + 0.4 * Math.sin(s.ph + tw * s.sp)));
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        glow.addColorStop(0, `rgba(245,240,225,${a * 0.4})`);
        glow.addColorStop(1, 'rgba(245,240,225,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,253,247,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.flare) {
          const ray = s.r * 7;
          ctx.strokeStyle = `rgba(255,253,247,${a * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - ray, s.y);
          ctx.lineTo(s.x + ray, s.y);
          ctx.moveTo(s.x, s.y - ray);
          ctx.lineTo(s.x, s.y + ray);
          ctx.stroke();
        }
      }
    };

    resize();
    if (reduce) {
      draw(0);
    } else {
      const start = performance.now();
      const tick = (now: number) => {
        if (visible) draw((now - start) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver((es) => es.forEach((e) => (visible = e.isIntersecting)), {
      threshold: 0,
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block ${className}`} />;
};
