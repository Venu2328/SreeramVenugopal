import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { positions } from '../data/positions';

/**
 * The record: office, organisation, term, mandate, and the public link that
 * corroborates it. Set as a hairline table because that is how an institutional
 * record looks — the restraint is what makes it read as fact rather than pitch.
 */
export const Positions = () => {
  return (
    <section
      id="positions"
      aria-labelledby="positions-heading"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <div className="shell">
        <SectionHeading
          index="01"
          kicker="Positions"
          title={
            <span id="positions-heading">
              What I <Accent>lead</Accent>.
            </span>
          }
          lede="Two organisations, both founded and both still running. Every claim on this page links to somewhere you can check it."
        />

        <ul className="mt-16 list-none border-t border-line p-0">
          {positions.map((p, i) => (
            <Reveal as="li" key={p.organisation} delay={i * 0.08}>
              <article className="grid gap-6 border-b border-line py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow mono text-red">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow text-muted">
                      {p.since} — Present
                    </span>
                  </div>

                  <h3 className="display mt-4 text-2xl leading-tight text-ink sm:text-3xl">
                    {p.office}
                  </h3>

                  <p className="mt-2.5 text-lg text-ink-soft">
                    {p.organisation}
                    {p.abbr && (
                      <span className="eyebrow ml-2.5 text-muted">({p.abbr})</span>
                    )}
                  </p>
                </div>

                <div className="lg:pt-1">
                  <p className="text-base leading-relaxed text-ink-soft">{p.mandate}</p>

                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                    <div>
                      <dt className="eyebrow text-muted">Location</dt>
                      <dd className="mt-1.5 text-sm text-ink">{p.location}</dd>
                    </div>
                    {p.verify && (
                      <div className="min-w-0">
                        <dt className="eyebrow text-muted">Verify</dt>
                        <dd className="mt-1.5 min-w-0 text-sm">
                          <a
                            href={p.verify.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-draw group inline-flex items-center gap-1.5 text-ink"
                          >
                            {p.verify.label}
                            <ArrowUpRight
                              className="size-3.5 shrink-0 text-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
