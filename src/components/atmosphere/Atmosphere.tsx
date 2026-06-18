import { useEffect, useRef } from 'react';

/**
 * Atmosphere
 *
 * The fixed cinematic stage that sits behind every scene:
 *  - deep ink base with two faint, slowly breathing nebula glows (gold + cosmos)
 *  - a global film-grain overlay for texture
 *  - shared SVG <defs> consumed across the app:
 *      #roughen  → dry-brush displacement applied to painted display text
 *      #grain    → fractal-noise tile used by the grain overlay
 *
 * On pointer-capable, non-reduced-motion devices the gold glow drifts gently
 * toward the cursor so the whole page feels lit by a single moving key light.
 */
export const Atmosphere = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let raf = 0;
    let cx = 50;
    let cy = 30;
    let tx = 50;
    let ty = 30;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      el.style.setProperty('--gx', `${cx}%`);
      el.style.setProperty('--gy', `${cy}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-ink pointer-events-none">
      {/* shared filters / textures */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="roughen" x="-6%" y="-30%" width="112%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014 0.022" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* moving key light */}
      <div
        ref={glowRef}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(48vw 48vw at var(--gx,50%) var(--gy,28%), rgba(217,182,95,0.10), transparent 62%)',
        }}
      />
      {/* ambient cosmos pool, bottom */}
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(111,99,166,0.10), transparent 65%)' }}
      />
      {/* deepen the edges — cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* film grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" aria-hidden="true">
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};
