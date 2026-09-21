import { useState } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { assurances, github, indexes, orcid, papers, type Paper } from '../data/journals';

/**
 * Journals
 *
 * Research, argued rather than listed. The claims about how the work was done
 * run down the left as a numbered record; the paper itself stands on the right,
 * shown as its own front page.
 *
 * A single paper set large beats a grid of cards here. One piece of work that a
 * reader can actually see is more persuasive than a row of titles, and the
 * method claims beside it are the part someone outside the field can judge.
 */
export const Journals = () => (
  <section
    id="journals"
    aria-labelledby="journals-heading"
    className="scroll-mt-20 border-b border-ink bg-paper-raised py-16 sm:py-24"
  >
    <div className="shell">
      <SectionRule
        kicker="Research papers, journals & conferences"
        mark="B"
        id="journals-heading"
        title={
          <>
            Published <Accent>work</Accent>.
          </>
        }
        action={
          <a href={orcid} target="_blank" rel="me noopener noreferrer" className="btn group">
            ORCID record
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        }
      />

      {/* ── Where the record is indexed ──────────────────────────────── */}
      <Reveal delay={0.06}>
        <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">
          {indexes.map((ix) => (
            <li key={ix.name}>
              {ix.href ? (
                <a
                  href={ix.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="chip hover:border-orange hover:text-orange"
                >
                  {ix.name}
                </a>
              ) : (
                <span className="chip">{ix.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        {/* ── How the work was done ──────────────────────────────────── */}
        <Reveal delay={0.1}>
          <p className="eyebrow text-muted">What stands behind it</p>
          <div className="rule-hair mt-3" />

          <ol className="mt-7 list-none border-t-2 border-ink p-0">
            {assurances.map((a, i) => (
              <Reveal as="li" key={a} delay={0.06 + i * 0.05}>
                <div className="flex items-baseline gap-5 border-b border-rule py-4">
                  <span className="eyebrow mono shrink-0 text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="headline text-lg leading-snug text-ink sm:text-xl">
                    {a}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <a
              href={github}
              target="_blank"
              rel="me noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2.5"
            >
              <span className="link-draw eyebrow text-muted transition-colors group-hover:text-ink">
                The working record on GitHub
              </span>
              <ArrowUpRight
                className="size-3.5 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </Reveal>

        {/* ── The paper ──────────────────────────────────────────────── */}
        <Reveal delay={0.14}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow text-muted">The paper</p>
            <p className="eyebrow text-muted">
              {papers.length} in the record
            </p>
          </div>
          <div className="rule-hair mt-3" />

          <ul className="mt-7 list-none space-y-10 p-0">
            {papers.map((p) => (
              <li key={p.title}>
                <PaperCard p={p} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

/**
 * The document itself, shown face-up.
 *
 * If the scan is missing the card falls back to a typeset front page built from
 * the same title — which is what the real page says anyway, so a missing file
 * costs the layout nothing and still reads as a document.
 */
const PaperCard = ({ p }: { p: Paper }) => {
  const [failed, setFailed] = useState(false);
  const showScan = p.cover && !failed;

  return (
    <figure>
      <div className="clipping">
        {showScan ? (
          <img
            src={p.cover}
            alt={`Front page of “${p.title}”`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="block aspect-[3/4] w-full object-cover object-top"
          />
        ) : (
          <div className="flex aspect-[3/4] w-full flex-col justify-center gap-6 px-[12%] py-[10%]">
            <FileText className="size-6 text-rule-strong" aria-hidden="true" />
            <p className="headline text-[clamp(1rem,2.2vw,1.5rem)] leading-tight text-ink">
              {p.title}
            </p>
            <p className="eyebrow text-muted">Sreeram Venugopal</p>
            <span aria-hidden="true" className="mt-auto h-px w-1/3 bg-rule" />
          </div>
        )}
      </div>

      <figcaption className="mt-6 border-t-2 border-ink pt-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow bg-ink px-2.5 py-1 text-paper">{p.status}</span>
          {p.venue && <span className="eyebrow text-orange">{p.venue}</span>}
          {p.duration && (
            <span className="eyebrow text-muted">{p.duration} of original work</span>
          )}
        </div>

        <h3 className="headline mt-4 text-xl leading-snug text-ink sm:text-2xl">
          {p.title}
        </h3>

        <p className="mt-3 leading-relaxed text-ink-soft">{p.note}</p>

        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid group mt-6"
          >
            Read paper
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        )}
      </figcaption>
    </figure>
  );
};
