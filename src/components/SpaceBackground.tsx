import { useEffect, useRef } from 'react';

/**
 * Ambient starfield + cursor-following lead star.
 *
 * Two systems share one canvas for performance:
 *  1) Background stars softly drift toward the cursor when nearby and
 *     ease back to origin when it's far. Critically-damped lerp — never shaky.
 *  2) A single brighter lead star follows the cursor with a luxurious lag,
 *     layered radial glows + slowly rotating sparkle rays.
 *
 * Tuned for subtlety so the stars never compete with foreground content:
 * lower alpha than the source implementation and a faint lavender tint that
 * blends with the portfolio's lavender-haze accents.
 */
export const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    type Star = {
      ox: number;
      oy: number;
      x: number;
      y: number;
      r: number;
      base: number;
      twPhase: number;
      twSpeed: number;
    };

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stars: Star[] = [];
    let dpr = 1;
    let w = 0;
    let h = 0;

    const pointer = { x: 0, y: 0, hasMoved: false, inside: true };
    const lead = { x: 0, y: 0, alpha: 0, t: 0 };

    const DENSITY = 0.00005;
    const MIN_STARS = 18;
    const MAX_STARS = 42;

    const seed = (width: number, height: number) => {
      const target = Math.round(width * height * DENSITY);
      const count = Math.max(MIN_STARS, Math.min(MAX_STARS, target));
      stars = new Array(count).fill(0).map(() => {
        const ox = Math.random() * width;
        const oy = Math.random() * height;
        return {
          ox,
          oy,
          x: ox,
          y: oy,
          r: 0.6 + Math.random() * 0.9,
          base: 0.28 + Math.random() * 0.22,
          twPhase: Math.random() * Math.PI * 2,
          twSpeed: 0.4 + Math.random() * 0.6,
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
      seed(w, h);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      if (!pointer.hasMoved) {
        lead.x = nx;
        lead.y = ny;
      }
      pointer.x = nx;
      pointer.y = ny;
      pointer.hasMoved = true;
      pointer.inside = true;
    };
    const onPointerLeave = () => {
      pointer.inside = false;
    };
    const onPointerEnter = () => {
      pointer.inside = true;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerenter', onPointerEnter);

    let raf = 0;
    let last = performance.now();

    const STAR_INFLUENCE_RADIUS = 220;
    const STAR_INFLUENCE_SHIFT = 22;
    const STAR_LERP = 0.045;
    const LEAD_LERP = 0.09;
    const LEAD_FADE_IN = 0.05;
    const LEAD_FADE_OUT = 0.04;
    const LEAD_OPACITY_CAP = 0.55;

    const tick = (now: number) => {
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      lead.t += dt * 0.05;

      ctx.clearRect(0, 0, w, h);

      if (pointer.hasMoved) {
        lead.x += (pointer.x - lead.x) * LEAD_LERP * dt;
        lead.y += (pointer.y - lead.y) * LEAD_LERP * dt;
      }
      const leadTargetAlpha = pointer.hasMoved && pointer.inside ? LEAD_OPACITY_CAP : 0;
      lead.alpha +=
        (leadTargetAlpha - lead.alpha) *
        (leadTargetAlpha > lead.alpha ? LEAD_FADE_IN : LEAD_FADE_OUT) *
        dt;

      for (const s of stars) {
        let tx = s.ox;
        let ty = s.oy;
        if (pointer.hasMoved && pointer.inside) {
          const dx = pointer.x - s.ox;
          const dy = pointer.y - s.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < STAR_INFLUENCE_RADIUS && dist > 0.5) {
            const f = 1 - dist / STAR_INFLUENCE_RADIUS;
            const eased = f * f * (3 - 2 * f);
            const shift = STAR_INFLUENCE_SHIFT * eased;
            tx = s.ox + (dx / dist) * shift;
            ty = s.oy + (dy / dist) * shift;
          }
        }
        s.x += (tx - s.x) * STAR_LERP * dt;
        s.y += (ty - s.y) * STAR_LERP * dt;

        if (!reduceMotion) s.twPhase += s.twSpeed * dt * 0.018;
        const twinkle = 0.7 + 0.3 * Math.sin(s.twPhase);
        const alpha = Math.max(0, Math.min(1, s.base * twinkle));

        const glowR = s.r * 4.2;
        const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
        halo.addColorStop(0, `rgba(206, 200, 230, ${alpha * 0.25})`);
        halo.addColorStop(1, 'rgba(206, 200, 230, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(245, 243, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (lead.alpha > 0.01) {
        drawLeadStar(ctx, lead.x, lead.y, lead.alpha, lead.t, reduceMotion);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerenter', onPointerEnter);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-graphite"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lavender-haze/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-lavender-haze/[0.03] blur-[100px] rounded-full" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />
    </div>
  );
};

function drawLeadStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  a: number,
  t: number,
  reduceMotion: boolean,
) {
  const pulse = reduceMotion ? 1 : 0.92 + 0.08 * Math.sin(t * 1.4);
  const coreR = 3.6 * pulse;

  const layers = [
    { r: 70 * pulse, alpha: 0.04 * a },
    { r: 38 * pulse, alpha: 0.09 * a },
    { r: 20 * pulse, alpha: 0.2 * a },
    { r: 11 * pulse, alpha: 0.42 * a },
  ];
  for (const layer of layers) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, layer.r);
    g.addColorStop(0, `rgba(220, 213, 245, ${layer.alpha})`);
    g.addColorStop(0.45, `rgba(220, 213, 245, ${layer.alpha * 0.35})`);
    g.addColorStop(1, 'rgba(220, 213, 245, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, layer.r, 0, Math.PI * 2);
    ctx.fill();
  }

  const rotate = reduceMotion ? 0 : t * 0.25;
  const longRay = 18 * pulse;
  const shortRay = longRay * 0.55;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotate);
  ctx.lineCap = 'round';
  ctx.strokeStyle = `rgba(245, 243, 255, ${0.5 * a})`;
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-longRay, 0);
  ctx.lineTo(longRay, 0);
  ctx.moveTo(0, -longRay);
  ctx.lineTo(0, longRay);
  ctx.stroke();
  ctx.strokeStyle = `rgba(245, 243, 255, ${0.26 * a})`;
  ctx.lineWidth = 0.75;
  ctx.beginPath();
  ctx.moveTo(-shortRay, -shortRay);
  ctx.lineTo(shortRay, shortRay);
  ctx.moveTo(-shortRay, shortRay);
  ctx.lineTo(shortRay, -shortRay);
  ctx.stroke();
  ctx.restore();

  const core = ctx.createRadialGradient(x, y, 0, x, y, coreR);
  core.addColorStop(0, `rgba(255, 255, 255, ${a})`);
  core.addColorStop(0.6, `rgba(245, 243, 255, ${a * 0.85})`);
  core.addColorStop(1, 'rgba(245, 243, 255, 0)');
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, coreR, 0, Math.PI * 2);
  ctx.fill();
}
