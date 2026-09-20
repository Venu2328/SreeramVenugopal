/**
 * Grain
 *
 * Newsprint tooth. A fixed noise wash over the whole page, multiplied into the
 * cream so the ground reads as a sheet of paper rather than a flat fill.
 *
 * Far lighter than the film grain this replaces: on a dark ground noise has to
 * fight banding, but on cream it only has to suggest fibre, and anything
 * heavier immediately reads as dirt on the screen.
 *
 * Rendered as an inline SVG data URI so it costs no request and never blocks
 * paint. Purely decorative: no pointer events, hidden from assistive tech, and
 * it doesn't animate, so there is nothing for reduced-motion to disable.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[80] opacity-[0.045] mix-blend-multiply"
    style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '200px 200px' }}
  />
);
