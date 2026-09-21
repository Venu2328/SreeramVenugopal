import { ArrowRight } from 'lucide-react';
import { Reveal } from './motion/Reveal';

/**
 * VentureStrip
 *
 * The front page's pointer to its two supplements. It used to list
 * organisations; it now lists the pages themselves, because that is what a
 * front page actually does — it tells you what else is in the paper.
 *
 * Each card carries its own device: the startup gets its mark printed in ink,
 * the speaking page a typographic monogram, both set in the same well so the
 * pair keeps one rhythm.
 */
type Supplement = {
  kicker: string;
  title: string;
  role: string;
  blurb: string;
  href: string;
  since: string;
  logo?: string;
  monogram?: string;
};

const supplements: Supplement[] = [
  {
    kicker: 'The startup',
    title: 'Advanced EdTech',
    role: 'Founder · SciPhyLabs',
    blurb:
      'An interactive physics platform built for students preparing for JEE, NEET, AP, SAT and CUET — 400+ simulations and an app past a thousand downloads.',
    href: '/ventures',
    since: '2023',
    logo: '/sciphylabs-logo2-sv.png',
  },
  {
    kicker: 'The podium',
    title: 'Keynote Speaker & Leader',
    role: 'Halls · Panels · Debate',
    blurb:
      'Unedited footage of arguments made in front of rooms that were free to disagree, and every profile where the record is kept.',
    href: '/speaking',
    since: 'Ongoing',
    monogram: 'SPK',
  },
];

export const VentureStrip = () => (
  <section
    id="inside"
    aria-labelledby="ventures-strip-heading"
    className="border-b border-ink bg-paper-raised py-12 sm:py-16"
  >
    <div className="shell">
      <div className="flex items-baseline justify-between gap-6">
        <p className="eyebrow text-orange">
          Inside<span className="ml-3 text-muted">§ A</span>
        </p>
        <a
          href="/ventures"
          className="link-draw eyebrow inline-flex items-center gap-2 text-ink"
        >
          Both supplements
          <ArrowRight className="size-3.5 text-orange" aria-hidden="true" />
        </a>
      </div>

      <div className="rule-heavy mt-3" />

      <h2 id="ventures-strip-heading" className="sr-only">
        Supplements
      </h2>

      <ul className="mt-8 grid list-none gap-px border border-rule bg-rule p-0 md:grid-cols-2">
        {supplements.map((s, i) => (
          <Reveal as="li" key={s.href} delay={i * 0.08}>
            <a
              href={s.href}
              className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-paper-white sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-orange">{s.kicker}</span>
                <span className="eyebrow text-muted">{s.since}</span>
              </div>

              <span className="mt-6 flex size-12 shrink-0 items-center justify-center">
                {s.logo ? (
                  <img
                    src={s.logo}
                    alt=""
                    aria-hidden="true"
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    /* White-on-transparent artwork would vanish on cream, so it
                       is driven to a solid silhouette — logos go through a press
                       as ink. The scale offsets the file's own wide margin. */
                    className="size-full scale-[1.45] object-contain opacity-90"
                    style={{ filter: 'brightness(0)' }}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="headline flex size-full items-center justify-center border border-ink text-sm tracking-tight text-ink"
                  >
                    {s.monogram}
                  </span>
                )}
              </span>

              <h3 className="headline mt-5 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-ink">
                {s.title}
              </h3>

              <p className="mt-2 text-sm text-muted">{s.role}</p>

              <p className="mt-5 flex-1 leading-relaxed text-ink-soft">{s.blurb}</p>

              <span className="eyebrow mt-7 inline-flex items-center gap-2 text-ink">
                Read the supplement
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
