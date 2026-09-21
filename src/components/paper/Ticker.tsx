/**
 * Ticker
 *
 * The strip of running words across the top of a page — the printed equivalent
 * of a stock crawl, and the one place on the site where the accent takes a
 * whole band rather than a single word.
 *
 * The words are laid down twice. The track slides left by exactly half its own
 * width, so the instant the first copy has finished leaving, the second copy is
 * standing precisely where the first began — the loop resets on a frame where
 * nothing is different, and the seam never shows.
 *
 * Only the first copy is read aloud; the duplicate is an artefact of how the
 * loop is built, not content, so it is hidden from assistive technology.
 */
export const Ticker = ({ words }: { words: string[] }) => {
  if (words.length === 0) return null;

  const run = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 list-none items-center gap-0 p-0"
    >
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="headline whitespace-nowrap px-9 py-5 text-[clamp(1.1rem,2.4vw,1.9rem)] uppercase tracking-tight text-on-orange">
            {w}
          </span>
          <span aria-hidden="true" className="text-[clamp(1rem,2vw,1.6rem)] text-on-orange/55">
            ★
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="marquee overflow-hidden border-y-[3px] border-ink bg-orange"
      role="marquee"
      aria-label="Highlights"
    >
      <div className="marquee-track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
};
