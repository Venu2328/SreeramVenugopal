import { Rough } from './Sketch';

/**
 * The figures themselves.
 *
 * Each one is a single <svg> with its own roughening filter — its own, rather
 * than one shared, so two figures on the same page cannot collide over a name.
 * Stroke widths are set per figure instead of inherited, because these are
 * drawn at wildly different scales and a shelf of books wants a heavier line
 * than a scatter of paper does.
 */

/* ── Pencil, pins and a clip: the writing desk ─────────────────────────── */
export const PencilAndPins = () => (
  <svg viewBox="0 0 400 300" strokeWidth="3">
    <Rough id="rough-desk" scale={2.6} />
    <g filter="url(#rough-desk)">
      {/* The pencil: barrel, ferrule, eraser, and a sharpened point. */}
      <path d="M54 231 L314 61 L326 79 L66 249 Z" />
      <path d="M314 61 L352 48 L326 79 Z" />
      <path d="M345 55 L340 69" strokeWidth="2.4" />
      <path d="M78 215 L90 233" strokeWidth="2.4" />
      <path d="M92 206 L104 224" strokeWidth="2.4" />
      <path d="M54 231 L66 249 L46 262 L34 244 Z" />

      {/* Three push-pins, dropped at the angles pins land at. */}
      <g>
        <circle cx="96" cy="64" r="16" />
        <circle cx="96" cy="64" r="6" strokeWidth="2.4" />
        <path d="M107 75 L126 96" strokeWidth="2.4" />
      </g>
      <g>
        <circle cx="196" cy="42" r="13" />
        <circle cx="196" cy="42" r="5" strokeWidth="2.4" />
        <path d="M205 51 L221 68" strokeWidth="2.4" />
      </g>
      <g>
        <circle cx="258" cy="196" r="14" />
        <circle cx="258" cy="196" r="5" strokeWidth="2.4" />
        <path d="M248 206 L230 224" strokeWidth="2.4" />
      </g>

      {/* A paperclip, drawn the way one is actually bent. */}
      <path
        d="M330 150 L330 212 a13 13 0 0 0 26 0 L356 140 a19 19 0 0 1 38 0 L394 206"
        strokeWidth="2.8"
      />
    </g>
  </svg>
);

/* ── Paper thrown across a desk: the research brief ────────────────────── */
export const ScatteredPapers = () => {
  /* Where each sheet lies and how far it is turned. Back to front, because the
     sheets are solid and each one has to cover the one it landed on. */
  const sheets = [
    { x: 14, y: 90, w: 152, h: 198, r: -14 },
    { x: 240, y: 104, w: 152, h: 198, r: -4 },
    { x: 120, y: 38, w: 152, h: 198, r: 8, chart: true },
    { x: 178, y: 170, w: 152, h: 198, r: 17 },
  ];

  return (
    <svg viewBox="0 0 400 340" strokeWidth="2.8">
      <Rough id="rough-papers" scale={1.5} />
      <g filter="url(#rough-papers)">
        {sheets.map((s, i) => (
          <g key={i} transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`}>
            <rect className="solid" x={s.x} y={s.y} width={s.w} height={s.h} />

            {/* A heading, then ruled lines — a page of findings, set up the way
                one is. The last line of each block runs short, because a
                paragraph that ends flush is a paragraph nobody wrote. */}
            <path
              d={`M${s.x + 20} ${s.y + 32} L${s.x + s.w - 58} ${s.y + 32}`}
              strokeWidth="5"
            />
            {[0, 1, 2, 3].map((n) => (
              <path
                key={n}
                d={`M${s.x + 20} ${s.y + 62 + n * 22} L${
                  s.x + s.w - (n === 3 ? 62 : 22)
                } ${s.y + 62 + n * 22}`}
                strokeWidth="2.4"
              />
            ))}

            {/* One sheet carries the chart. A brief is numbers before it is
                sentences, and ruled lines alone say essay. */}
            {s.chart && (
              <g strokeWidth="2.6">
                <path d={`M${s.x + 20} ${s.y + 178} L${s.x + 20} ${s.y + 118}`} />
                <path d={`M${s.x + 20} ${s.y + 178} L${s.x + s.w - 22} ${s.y + 178}`} />
                <rect className="solid" x={s.x + 34} y={s.y + 148} width="20" height="30" />
                <rect className="solid" x={s.x + 64} y={s.y + 126} width="20" height="52" />
                <rect className="solid" x={s.x + 94} y={s.y + 158} width="20" height="20" />
                <rect className="solid" x={s.x + 124} y={s.y + 138} width="20" height="40" />
              </g>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
};

/* ── A shelf of spines: the books ──────────────────────────────────────── */
export const BookShelves = () => {
  /* Width, height and lean. Two volumes fall against the gap, because a shelf
     that is perfectly upright is a shelf nobody takes anything off. */
  const row = (seed: number) =>
    [
      { w: 26, h: 104, r: 0 },
      { w: 18, h: 92, r: 0 },
      { w: 32, h: 112, r: 0 },
      { w: 22, h: 86, r: 0 },
      { w: 28, h: 100, r: 0 },
      { w: 20, h: 94, r: 0 },
      { w: 30, h: 108, r: 0 },
      { w: 24, h: 90, r: seed ? -14 : 0 },
      { w: 26, h: 98, r: 0 },
      { w: 18, h: 84, r: seed ? 0 : 11 },
      { w: 30, h: 106, r: 0 },
    ];

  const Shelf = ({ y, seed }: { y: number; seed: number }) => {
    let x = 16;
    return (
      <g>
        {row(seed).map((b, i) => {
          const left = x;
          x += b.w + 5;
          return (
            <g key={i} transform={`rotate(${b.r} ${left + b.w / 2} ${y})`}>
              <rect x={left} y={y - b.h} width={b.w} height={b.h} />
              {/* Two bands across the spine: the title and the imprint. */}
              <path d={`M${left + 4} ${y - b.h + 18} L${left + b.w - 4} ${y - b.h + 18}`} strokeWidth="2" />
              <path d={`M${left + 4} ${y - 20} L${left + b.w - 4} ${y - 20}`} strokeWidth="2" />
            </g>
          );
        })}
        {/* The plank, with its front edge. */}
        <path d={`M4 ${y} L372 ${y}`} strokeWidth="4" />
        <path d={`M4 ${y + 9} L372 ${y + 9}`} strokeWidth="2.4" />
        <path d={`M4 ${y} L4 ${y + 9}`} strokeWidth="2.4" />
        <path d={`M372 ${y} L372 ${y + 9}`} strokeWidth="2.4" />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 380 300" strokeWidth="2.8">
      <Rough id="rough-shelf" scale={2.2} />
      <g filter="url(#rough-shelf)">
        <Shelf y={126} seed={1} />
        <Shelf y={276} seed={0} />
      </g>
    </svg>
  );
};

/* ── A hall, from the lectern: the speaking ────────────────────────────── */
export const Audience = () => {
  /* Three rows going back: smaller heads, closer together, further up the page
     — which is the whole of perspective as a staff artist drew it. Listed back
     row first, because each row is solid and has to cover the one behind it. */
  const rows = [
    { y: 104, r: 14, gap: 60, from: -16 },
    { y: 154, r: 19, gap: 82, from: 14 },
    { y: 216, r: 26, gap: 112, from: -30 },
  ];

  /* Shoulders a shade narrower than the step between people, so neighbours
     stand beside one another rather than through one another. */
  const HALF = 1.75;

  return (
    <svg viewBox="0 0 560 260" strokeWidth="2.8">
      <Rough id="rough-hall" scale={1.8} />
      <g filter="url(#rough-hall)">
        {rows.map((row, ri) => {
          const people = [];
          for (let x = row.from; x < 580; x += row.gap) {
            const r = row.r;
            people.push(
              <g key={x}>
                {/* Shoulders first, then the head over them, so the neck never
                    shows through. */}
                <path
                  className="solid"
                  d={`M${x - r * HALF} ${row.y + r * 4.4} L${x - r * HALF} ${
                    row.y + r * 2.5
                  } A ${r * HALF} ${r * 1.2} 0 0 1 ${x + r * HALF} ${row.y + r * 2.5} L${
                    x + r * HALF
                  } ${row.y + r * 4.4}`}
                />
                <circle className="solid" cx={x} cy={row.y} r={r} />
              </g>,
            );
          }
          return <g key={ri}>{people}</g>;
        })}

        {/* A raised hand somewhere in the middle row — the detail that says
            these were people who were free to disagree. */}
        <g strokeWidth="2.8">
          <path className="solid" d="M126 182 L126 108 a10 10 0 0 1 20 0 L146 182 Z" />
        </g>
      </g>
    </svg>
  );
};
