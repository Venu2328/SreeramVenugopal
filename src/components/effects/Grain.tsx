/**
 * Grain
 *
 * A fixed film-grain wash over the whole page. Dark grounds band badly on
 * cheap panels — a little noise breaks the gradients up and is most of what
 * separates "cinematic" from "flat black". Rendered as an inline SVG data URI
 * so it costs no request and never blocks paint.
 *
 * Purely decorative: no pointer events, hidden from assistive tech, and it
 * doesn't animate, so there is nothing here for reduced-motion to disable.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

export const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[80] opacity-[0.16] mix-blend-soft-light"
    style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '180px 180px' }}
  />
);
