import { useState } from 'react';
import { institutions, type Institution } from '../../data/institutions';

/**
 * LogoTicker
 *
 * The band of issuing bodies across the top of the proof page — the same belt
 * mechanism as the word ticker, carrying marks as well as names.
 *
 * Names are printed beside every mark rather than instead of them. A wall of
 * unlabelled logos asks a reader to recognise seven institutions on sight, and
 * the ones that matter most here are the ones a stranger may not know. It also
 * means a missing image costs the strip nothing: the name was always the point,
 * and the mark that fails to load simply leaves.
 *
 * Each mark sits on a small white tile, which is what lets artwork with an
 * opaque background sit on an orange band without printing as a coloured
 * rectangle — and gives seven different brand palettes a common frame.
 */
export const LogoTicker = () => {
  if (institutions.length === 0) return null;

  return (
    <div
      className="marquee overflow-hidden border-y-[3px] border-ink bg-orange"
      role="marquee"
      aria-label="Issuing institutions"
    >
      <div className="marquee-track">
        <Belt />
        <Belt clone />
      </div>
    </div>
  );
};

const Belt = ({ clone = false }: { clone?: boolean }) => (
  <ul
    aria-hidden={clone || undefined}
    className="flex shrink-0 list-none items-center gap-0 p-0"
  >
    {institutions.map((inst) => (
      <li key={inst.name} className="flex items-center">
        <Mark inst={inst} clone={clone} />
        <span aria-hidden="true" className="text-[clamp(1rem,2vw,1.6rem)] text-on-orange/55">
          ★
        </span>
      </li>
    ))}
  </ul>
);

const Mark = ({ inst, clone }: { inst: Institution; clone: boolean }) => {
  const [failed, setFailed] = useState(false);

  const body = (
    <>
      {!failed && (
        /* Each mark sits on its own white tile rather than being knocked back
           to a single ink. Half of these files carry an opaque background, and
           driving those to white would print a blank block where a logo should
           be; a tile takes transparent and opaque artwork alike, and reads as a
           stamp on the band. */
        <span className="flex size-14 shrink-0 items-center justify-center bg-paper-white p-2">
          <img
            src={inst.logo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="size-full object-contain"
          />
        </span>
      )}
      <span className="headline whitespace-nowrap text-[clamp(1rem,2.2vw,1.7rem)] uppercase tracking-tight text-on-orange">
        {inst.name}
      </span>
    </>
  );

  const shell = 'flex items-center gap-4 px-8 py-4';

  return inst.href ? (
    <a
      href={inst.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={clone ? -1 : undefined}
      className={`${shell} transition-opacity hover:opacity-70`}
    >
      {body}
    </a>
  ) : (
    <span className={shell}>{body}</span>
  );
};
