import { useEffect, useRef } from 'react';

/**
 * Cursor
 *
 * A filled square riding the pointer exactly, inside a larger open square that
 * chases it and never quite catches up. The lag is the whole effect: the dot
 * says where you are, the ring says where you have just been, and the gap
 * between them is what reads as weight.
 *
 * Both are drawn in white under `mix-blend-difference`, which inverts whatever
 * is behind them. That is not a stylistic flourish — this page runs cream, ink
 * and a full-width orange band, and no single fixed colour stays legible across
 * all three. Difference blending makes the cursor dark on paper, light on the
 * slab, and contrasting on the accent, without anything having to know which
 * section the pointer happens to be over.
 *
 * Position is written straight to the transform inside a rAF loop rather than
 * held in state. A pointer fires far more often than React can usefully
 * re-render, and putting the coordinates in state would re-render the whole
 * tree on every mouse move.
 *
 * It only exists for a fine pointer. On a touchscreen there is nothing to
 * follow, and the class that hides the native cursor is added from script
 * rather than written into the stylesheet, so a browser with JavaScript off is
 * never left with no pointer at all.
 */
const RING = 38;
const DOT = 7;

/** How far the ring closes on the dot each frame. Lower is heavier. */
const EASE = 0.16;

export const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    /* A coarse pointer has nothing to trail, and a hover-less device would
       leave these pinned wherever the last tap landed. */
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let rx = px;
    let ry = py;
    let frame = 0;
    let hovering = false;
    let down = false;

    /* A class rather than an inline style: the components set their own
       cursor-* utilities, and only a rule can outrank those. */
    const root = document.documentElement;
    root.classList.add('cursor-custom');

    const place = () => {
      d.style.transform = `translate3d(${px - DOT / 2}px, ${py - DOT / 2}px, 0)`;
      const scale = (hovering ? 1.9 : 1) * (down ? 0.8 : 1);
      r.style.transform = `translate3d(${rx - RING / 2}px, ${ry - RING / 2}px, 0) rotate(${
        hovering ? 45 : 0
      }deg) scale(${scale})`;
    };

    const tick = () => {
      /* Under reduced motion the ring is pinned to the dot: the chase is the
         part that moves independently, so it is the part that goes. */
      rx += (px - rx) * (reduce ? 1 : EASE);
      ry += (py - ry) * (reduce ? 1 : EASE);
      place();
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (r.style.opacity !== '1') {
        d.style.opacity = '1';
        r.style.opacity = '1';
      }
      const t = e.target as Element | null;
      hovering = Boolean(
        t?.closest?.('a, button, [role="button"], input, select, textarea, summary, label'),
      );
    };

    /* Leaving the window should take the cursor with it, or it sits frozen in
       the corner while the real pointer is somewhere else entirely. */
    const hide = () => {
      d.style.opacity = '0';
      r.style.opacity = '0';
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
      root.classList.remove('cursor-custom');
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] hidden mix-blend-difference [@media(pointer:fine)]:block">
      <div
        ref={ring}
        style={{ width: RING, height: RING, opacity: 0 }}
        className="absolute left-0 top-0 border-2 border-white transition-[opacity] duration-200 will-change-transform"
      />
      <div
        ref={dot}
        style={{ width: DOT, height: DOT, opacity: 0 }}
        className="absolute left-0 top-0 bg-white transition-[opacity] duration-200 will-change-transform"
      />
    </div>
  );
};
