import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

/* ~115 characters a second — half the pace it ran at, which is about the speed
   of reading along rather than the speed of a machine. Struck in small groups
   rather than one at a time, because one character a frame is both slower than
   reading and more work than it needs to be. */
const TICK = 26;
const STEP = 3;

/** How long a finished sheet stands before the next one lands on top of it. */
const HOLD = 2600;

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
 * A short stack of notes beside the portrait. The top sheet types itself out,
 * stands long enough to be read, and then the next one is laid on top of it and
 * types in turn — round and round, so the column is never finished and never
 * still. The sheets underneath show at the corners, which is what makes it a
 * stack rather than a panel that swaps its contents.
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
 * another, so the column is as tall as its tallest sheet from the start. They
 * are positioned and given levels, because grid items merely in flow do not
 * layer as units: every background in a cell is painted before any of the text
 * in it, and an unpositioned sheet would lay its paper down only for the one
 * beneath to print straight through it.
 *
 * Nothing runs while the column is off screen. A loop with no end would
 * otherwise keep striking characters into a part of the page nobody is looking
 * at, for as long as the tab stayed open.
 */
export const TypedSheets = ({ sheets }: { sheets: Sheet[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  /* Whether the typing owns the column at all. */
  const [live, setLive] = useState(false);
  /* Whether it has started striking — the paper may still be opening. */
  const [running, setRunning] = useState(false);
  /* Whether anyone can see it. */
  const [onScreen, setOnScreen] = useState(true);
  /* Counts up for ever; which sheet is on top is this modulo the stack. */
  const [turn, setTurn] = useState(0);
  const [struck, setStruck] = useState(0);

  const count = sheets.length;
  const active = turn % count;

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
    const el = ref.current;
    if (!live || !el) return;
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [live]);

  useEffect(() => {
    if (!running || !onScreen) return;
    const total = totals[active];

    if (struck < total) {
      const t = window.setTimeout(
        () => setStruck((n) => Math.min(total, n + STEP)),
        TICK,
      );
      return () => window.clearTimeout(t);
    }

    /* Round to the next sheet — and round again, for as long as anyone is
       reading. A stack of notes being worked through does not stop at the
       bottom of the pile; it goes back to the top. */
    const t = window.setTimeout(() => {
      setTurn((n) => n + 1);
      setStruck(0);
    }, HOLD);
    return () => window.clearTimeout(t);
  }, [running, onScreen, struck, active, totals]);

  /* The plain column: what the server sends, and what a reader who has asked
     for less motion keeps. Still a stack of notes, simply all of them at once. */
  if (!live) {
    return (
      <div className="space-y-5">
        {sheets.map((sheet, si) => (
          <article key={si} className={`${PAPER} relative`}>
            <Head sheet={sheet} si={si} count={count} />
            <div className="space-y-4">
              {sheet.paras.map((text, pi) => (
                <p key={pi} className={si === 0 && pi === 0 ? 'dropcap' : undefined}>
                  {text}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    /* A little room around the cell, so the corners of the sheets below the top
       one are not clipped away by the column they sit in. */
    <div ref={ref} className="grid p-1.5">
      {sheets.map((sheet, si) => {
        /* The turn this sheet was last laid down on. Below zero means it has
           not been laid down yet, which only happens on the first pass. */
        const laid = turn - ((((turn - si) % count) + count) % count);
        const top = si === active;
        const shown = top ? struck : totals[si];
        let offset = 0;

        return (
          <motion.article
            /* Re-keyed each time it comes back to the top, so the sheet is laid
               down again rather than merely fading up where it was. */
            key={`${si}:${laid}`}
            initial={{ opacity: 0, y: -26, rotate: si % 2 ? 2.2 : -2.2 }}
            animate={{
              opacity: laid < 0 ? 0 : 1,
              y: 0,
              /* The sheet being read sits square; the ones under it lie askew,
                 which is the only reason you can tell there are any. */
              rotate: top ? 0 : si % 2 ? 1.1 : -1.1,
            }}
            transition={{ duration: 0.6, ease }}
            /* Levels follow the order they were last laid in, not the order
               they are written in — otherwise the first sheet could never come
               back to the top of its own stack. */
            style={{ zIndex: laid + 1 }}
            className={`${PAPER} col-start-1 row-start-1 ${
              top ? '' : 'pointer-events-none'
            }`}
          >
            <Head sheet={sheet} si={si} count={count} />

            <div className="space-y-4">
              {sheet.paras.map((text, pi) => {
                const start = offset;
                offset += text.length;
                const n = Math.max(0, Math.min(text.length, shown - start));
                /* The caret belongs to whichever paragraph the cursor is
                   sitting in — including when it has just reached the end. */
                const caret =
                  top && shown > 0 && shown >= start && shown <= offset;

                return (
                  <Line
                    key={pi}
                    text={text}
                    count={n}
                    caret={caret}
                    drop={si === 0 && pi === 0}
                  />
                );
              })}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

/* Paper pinned to paper: a white sheet, a hairline edge and the one real
   shadow on this site. */
const PAPER =
  'clipping relative border border-rule px-5 py-5 sm:px-6 sm:py-6';

/** The head of a sheet: what it is, and where it falls in the stack. */
const Head = ({ sheet, si, count }: { sheet: Sheet; si: number; count: number }) => (
  <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-rule pb-2.5">
    <p className="eyebrow text-orange">{sheet.folio ?? `Note ${si + 1}`}</p>
    <p className="eyebrow mono text-muted">
      {String(si + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
    </p>
  </div>
);

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
