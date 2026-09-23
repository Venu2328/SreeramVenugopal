import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * PressRun
 *
 * The paper opening. A folded sheet lies on the screen, the nameplate strikes
 * onto it, and then the fold breaks: the top half lifts away and the bottom
 * half drops, revealing the front page underneath.
 *
 * The two halves rotate about the fold line on a shared perspective, which is
 * what makes it read as paper being opened rather than two rectangles sliding
 * apart. Each carries its own half of the nameplate, clipped at the fold, so
 * the type tears along the crease exactly where the paper does.
 *
 * It runs once per session, not once per page. A visitor moving between the
 * supplements is not opening the paper again, and an animation that replays on
 * every navigation stops being an entrance and becomes a toll.
 *
 * Nothing here is rendered on the server. The overlay exists only after mount,
 * so a crawler — and anyone whose JavaScript fails — receives the front page
 * directly, with no sheet to get past.
 */
const KEY = 'press-run-shown';

export const PressRun = () => {
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle');

  useEffect(() => {
    /* Reduced motion opts out of exactly this kind of thing. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setState('done');
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* Private browsing can throw on access; treat it as a first visit. */
    }

    if (seen) {
      setState('done');
      return;
    }

    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* Not being able to remember is survivable; it just plays again. */
    }

    setState('running');

    /*
     * Locked from <html> via a class, not from `body.style.overflow`. The
     * masthead owns that inline property for its mobile menu and clears it on
     * mount, which would quietly release this lock a frame after it was taken.
     */
    const root = document.documentElement;
    root.classList.add('press-run');

    const done = window.setTimeout(() => {
      setState('done');
      root.classList.remove('press-run');
    }, 2150);

    return () => {
      window.clearTimeout(done);
      root.classList.remove('press-run');
    };
  }, []);

  /* Half of the nameplate, positioned so the two halves line up across the
     fold. Each half clips the same block of type at the crease. */
  const Plate = ({ half }: { half: 'top' | 'bottom' }) => (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 flex h-[100svh] items-center justify-center"
        style={half === 'top' ? { top: 0 } : { bottom: 0 }}
      >
        <div className="px-6 text-center">
          <p className="eyebrow text-sm font-bold tracking-[0.3em] text-orange">
            The Sreeram Venugopal Record
          </p>
          <p className="headline mt-4 text-[clamp(2.2rem,10vw,7rem)] leading-[0.85] tracking-[-0.04em] text-ink">
            SREERAM <span className="text-orange">VENU</span>GOPAL
          </p>
          <p className="eyebrow mt-5 text-sm font-bold tracking-[0.22em] text-muted">
            Puducherry · Est. 2023
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {state === 'running' && (
        <motion.div
          key="press-run"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-0 z-[300]"
          style={{ perspective: '1600px' }}
        >
          {/* ── Upper leaf ─────────────────────────────────────────── */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -92 }}
            transition={{ duration: 0.95, delay: 1.05, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden border-b border-rule bg-paper"
          >
            <Plate half="top" />
          </motion.div>

          {/* ── Lower leaf ─────────────────────────────────────────── */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 92 }}
            transition={{ duration: 0.95, delay: 1.05, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-paper"
          >
            <Plate half="bottom" />
          </motion.div>

          {/* The crease: a hairline of ink that draws across, then parts. */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.45, 1], ease: 'easeOut' }}
            className="absolute inset-x-0 top-1/2 h-[2px] origin-center bg-ink"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
