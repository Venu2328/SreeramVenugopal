import { ArrowRight } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import { positions, type Position } from '../data/positions';

/**
 * VentureStrip
 *
 * The two ventures as a pair of front-page teasers, pointing at their full
 * spreads on /ventures. Rendered from `positions.ts`, which is the same list
 * the ventures page itself is built from — the front page advertises the
 * record, it does not keep a second copy of it.
 */
const anchors: Record<string, string> = {
  'Peacemakers of Puducherry Council': '/ventures#popc',
  SciPhyLabs: '/ventures#sciphylabs',
};

const framing: Record<string, string> = {
  'Peacemakers of Puducherry Council': 'The Council',
  SciPhyLabs: 'The Startup',
};

/**
 * Device
 *
 * An organisation's mark, printed the way a paper prints one: in ink.
 *
 * The SciPhyLabs file is a white mark on transparency, which would be all but
 * invisible on cream, and the alternate version sits on a lavender field that
 * fights everything else on the page. `brightness(0)` drives every opaque pixel
 * to black while leaving the alpha channel alone, so the mark arrives as a
 * solid silhouette — which is what a logo becomes when it goes through a press.
 *
 * An organisation without a file gets a typographic monogram at the same size,
 * so the two cards keep the same rhythm instead of one looking unfinished.
 */
const Device = ({ p }: { p: Position }) => (
  <span className="flex size-12 shrink-0 items-center justify-center">
    {p.logo ? (
      <img
        src={p.logo}
        alt=""
        aria-hidden="true"
        width="48"
        height="48"
        loading="lazy"
        decoding="async"
        /* The artwork sits inside a generous transparent margin, so it is
           scaled up to match the optical size of the monogram beside it. */
        className="size-full scale-[1.45] object-contain opacity-90"
        style={{ filter: 'brightness(0)' }}
      />
    ) : (
      <span
        aria-hidden="true"
        className="headline flex size-full items-center justify-center border border-ink text-sm tracking-tight text-ink"
      >
        {p.abbr ?? p.organisation.slice(0, 4).toUpperCase()}
      </span>
    )}
  </span>
);

export const VentureStrip = () => (
  <section
    aria-labelledby="ventures-strip-heading"
    className="border-b border-ink bg-paper-raised py-12 sm:py-16"
  >
    <div className="shell">
      <div className="flex items-baseline justify-between gap-6">
        <p className="eyebrow text-orange">
          Ventures<span className="ml-3 text-muted">§ A</span>
        </p>
        <a
          href="/ventures"
          className="link-draw eyebrow inline-flex items-center gap-2 text-ink"
        >
          Both spreads
          <ArrowRight className="size-3.5 text-orange" aria-hidden="true" />
        </a>
      </div>

      <div className="rule-heavy mt-3" />

      <h2 id="ventures-strip-heading" className="sr-only">
        Ventures
      </h2>

      <ul className="mt-8 grid list-none gap-px border border-rule bg-rule p-0 md:grid-cols-2">
        {positions.map((p, i) => (
          <Reveal as="li" key={p.organisation} delay={i * 0.08}>
            <a
              href={anchors[p.organisation] ?? '/ventures'}
              className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-paper-white sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-orange">
                  {framing[p.organisation] ?? 'Venture'}
                </span>
                <span className="eyebrow text-muted">Est. {p.since}</span>
              </div>

              <div className="mt-6">
                <Device p={p} />
              </div>

              <h3 className="headline mt-5 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-ink">
                {p.organisation}
              </h3>

              <p className="mt-2 text-sm text-muted">{p.office}</p>

              <p className="mt-5 flex-1 leading-relaxed text-ink-soft">{p.mandate}</p>

              <span className="eyebrow mt-7 inline-flex items-center gap-2 text-ink">
                Read the spread
                <ArrowRight
                  className="size-3.5 text-orange transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
