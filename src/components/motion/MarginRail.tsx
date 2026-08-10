import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * MarginRail
 *
 * A fixed marker down the left margin showing which section you're currently
 * in, like the running head on a printed document. It tracks the section whose
 * top has most recently passed the upper third of the viewport, so the label
 * changes at the moment a new section takes over the screen.
 *
 * An IntersectionObserver with a top-weighted root margin does this without
 * any scroll handler. Decorative and duplicated by the nav, so it's hidden
 * from assistive technology and only shown where there's spare margin (xl+).
 */
type Entry = { id: string; index: string; label: string };

export const MarginRail = ({ entries }: { entries: Entry[] }) => {
  const [active, setActive] = useState<Entry | null>(null);

  useEffect(() => {
    const nodes = entries
      .map((e) => ({ e, el: document.getElementById(e.id) }))
      .filter((x): x is { e: Entry; el: HTMLElement } => Boolean(x.el));

    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) {
            const hit = nodes.find((n) => n.el === r.target);
            if (hit) setActive(hit.e);
          }
        }
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n.el));
    return () => io.disconnect();
  }, [entries]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex items-center gap-3 [writing-mode:vertical-rl]">
        <span className="h-16 w-px bg-line-strong" />
        <AnimatePresence mode="wait">
          {active && (
            <motion.span
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow flex items-center gap-3 text-muted"
            >
              <span className="text-red">{active.index}</span>
              {active.label}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="h-16 w-px bg-line-strong" />
      </div>
    </div>
  );
};
