import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

/* ~225 characters a second: quick enough not to be a wait, slow enough to read
   along with. Struck in small groups rather than one at a time, because a single
   character per frame is both slower than reading and more work than it needs
   to be. */
const TICK = 22;
const STEP = 5;

/** How long a finished sheet stands before the next one lands on top of it. */
const HOLD = 1400;

/** The opening animation holds the screen for 2.15s. Nothing types behind it. */
const OPENING = 2300;
const SETTLE = 450;

/*
 * Taking the column over has to happen before the browser paints, or the
 * finished text the server sent would be seen for a frame and then wiped. A
 * layout effect runs before paint; on the server there is no paint and no
 * layout, so it falls back to the ordinary one to keep React quiet.
 */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type Sheet = {
  /** A kicker printed at the head of the sheet — a page turn, named. */
  folio?: string;
  paras: string[];
};

/**
 * TypedSheets
 *
 * A column of type that is struck out rather than simply being there: the first
 * sheet types itself, stands for a moment, and then a second sheet drops onto
 * the stack and types itself in turn.
 *
 * Every word is real text in the document from the very first byte. The server
 * renders the sheets finished, one after another, and the typing only takes the
 * column over once JavaScript is running — so a crawler, a reader with no
 * JavaScript, and anyone who has asked for less motion all get the whole column
 * at once, set normally. That is the point of doing it this way rather than
 * appending characters to an empty element: nothing here is ever only an
 * animation.
 *
 * Each paragraph is printed twice. The lower copy is the paragraph itself and
 * holds the measure and the height open; the upper copy is laid exactly over it
 * and carries however much has been struck so far. Because the upper copy is a
 * prefix of the same words in the same width, the two wrap identically and
 * nothing moves as the line fills — which is why the height of the column is
 * settled at the first paint and never changes again.
 *
 * The sheets are stacked in a single grid cell rather than following one
 * another, so the column is as tall as its tallest sheet from the start, and a
 * sheet landing on the stack covers the one beneath it the way paper does.
 */
export const TypedSheets = ({ sheets }: { sheets: Sheet[] }) => {
  /* Whether the typing owns the column at all. */
  const [live, setLive] = useState(false);
  /* Whether it has started striking — the paper may still be opening. */
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState(0);
  const [struck, setStruck] = useState(0);

  const totals = useMemo(
    () => sheets.map((s) => s.paras.reduce((n, p) => n + p.length, 0)),
    [sheets],
  );

  useBeforePaint(() => {
    /* Text that appears a character at a time is exactly the kind of motion
       this preference opts out of; it keeps the plain column. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    setLive(true);
  }, []);

  useEffect(() => {
    if (!live) return;
    /* The opening sheet holds <html> while it unfolds. Typing underneath it
       would mean the column was already written by the time anyone saw it. */
    const wait = document.documentElement.classList.contains('press-run')
      ? OPENING
      : SETTLE;
    const t = window.setTimeout(() => setRunning(true), wait);
    return () => window.clearTimeout(t);
  }, [live]);

  useEffect(() => {
    if (!running) return;
    const total = totals[active];

    if (struck < total) {
      const t = window.setTimeout(
        () => setStruck((n) => Math.min(total, n + STEP)),
        TICK,
      );
      return () => window.clearTimeout(t);
    }

    /* The last sheet stays up. There is nothing to turn to. */
    if (active >= sheets.length - 1) return;

    const t = window.setTimeout(() => {
      setActive((a) => a + 1);
      setStruck(0);
    }, HOLD);
    return () => window.clearTimeout(t);
  }, [running, struck, active, totals, sheets.length]);

  /* The plain column: what the server sends, and what a reader who has asked
     for less motion keeps. */
  if (!live) {
    return (
      <div className="space-y-4">
        {sheets.map((sheet, si) => (
          <div key={si} className="space-y-4">
            {sheet.folio && <p className="eyebrow text-orange">{sheet.folio}</p>}
            {sheet.paras.map((text, pi) => (
              <p key={pi} className={si === 0 && pi === 0 ? 'dropcap' : undefined}>
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid">
      {sheets.map((sheet, si) => {
        const done = si < active;
        const shown = done ? totals[si] : si === active ? struck : 0;
        let offset = 0;

        return (
          <motion.div
            key={si}
            /* No entrance on mount: the first sheet is already lying there, and
               the ones above it are already off the top of the stack. */
            initial={false}
            animate={
              si <= active
                ? { opacity: 1, y: 0, rotate: 0 }
                : { opacity: 0, y: -22, rotate: -0.9 }
            }
            transition={{ duration: 0.55, ease }}
            /* Positioned, and stacked in order. Grid items that are merely in
               flow do not layer as units: every background in the cell is
               painted before any of the text in it, so an unpositioned sheet
               lays its paper down and then the sheet underneath prints straight
               through it. Giving each one a position and a level makes each
               sheet paint as a whole, which is the only way paper behaves. */
            style={{ zIndex: si }}
            className={`relative col-start-1 row-start-1 space-y-4 bg-paper ${
              /* A sheet above the first one casts a little shade along its top
                 edge, which is what makes it read as paper over paper rather
                 than as text being replaced. */
              si > 0 ? 'shadow-[0_-12px_26px_-16px_rgb(26_23_20/0.4)]' : ''
            } ${si === active ? '' : 'pointer-events-none'}`}
          >
            {sheet.folio && <p className="eyebrow text-orange">{sheet.folio}</p>}

            {sheet.paras.map((text, pi) => {
              const start = offset;
              offset += text.length;
              const count = Math.max(0, Math.min(text.length, shown - start));
              /* The caret belongs to whichever paragraph the cursor is sitting
                 in — including when it has just reached the end of one. */
              const caret =
                si === active && shown > 0 && shown >= start && shown <= offset;

              return (
                <Line
                  key={pi}
                  text={text}
                  count={count}
                  caret={caret}
                  drop={si === 0 && pi === 0}
                />
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * One paragraph, printed twice: the paragraph itself holding the shape of the
 * block, and the struck prefix laid over it.
 *
 * The lower copy is transparent rather than hidden, because a hidden paragraph
 * leaves the accessibility tree — and the whole point is that the words are
 * always there. The upper copy is the animation, so it is hidden from assistive
 * technology instead; otherwise every paragraph would be announced twice.
 */
const Line = ({
  text,
  count,
  caret,
  drop,
}: {
  text: string;
  count: number;
  caret: boolean;
  drop: boolean;
}) => {
  const cap = drop ? 'dropcap ' : '';
  return (
    <p className="relative">
      <span className={`${cap}block opacity-0`}>{text}</span>
      <span aria-hidden="true" className={`${cap}absolute inset-0 block`}>
        {text.slice(0, count)}
        {/* An empty span carrying a right border and pulling it back by its own
            width: a cursor that occupies no space and so moves nothing. */}
        {caret && <span className="press-caret" />}
      </span>
    </p>
  );
};
