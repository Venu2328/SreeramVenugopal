import { ArrowUpRight, Github } from 'lucide-react';
import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { Ticker } from '../components/paper/Ticker';
import { PdfFrame } from '../components/paper/PdfFrame';
import { OrcidMark } from '../components/research/OrcidMark';
import { Reveal } from '../components/motion/Reveal';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { assurances, github, indexes, orcid, papers } from '../data/journals';

/**
 * The research supplement.
 *
 * One paper, shown as the document it is, with the claims about how it was made
 * standing beside it. A single piece of work a reader can open persuades more
 * than a list of titles, and the claims about method and scrutiny are the part
 * somebody outside the field can actually judge.
 */
const ticker = [
  'Research papers',
  'Journals',
  'Conferences',
  'Peer review',
  'Open data',
];

/** The supplement body, so the front page can run it inline. */
export const ResearchSection = () => (
  <>
      <section
        id="research"
        aria-labelledby="research-heading"
        className="scroll-mt-20 border-b border-ink bg-paper"
      >
        <Ticker words={ticker} />

        <div className="shell py-14 sm:py-20">
          <Reveal>
            <p className="eyebrow text-orange">Peer review · Published · Indexed</p>

            <h1
              id="research-heading"
              className="headline mt-5 text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-ink"
            >
              RESEARCH PAPERS,
              <br />
              JOURNALS &amp;{' '}
              <span className="text-orange">CONFERENCES</span>
            </h1>

            <div className="rule-double mt-8" />
          </Reveal>

          {/* ── Where the record lives ───────────────────────────────── */}
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={orcid}
                target="_blank"
                rel="me noopener noreferrer"
                className="group flex items-center gap-3 border border-ink bg-paper-white px-4 py-3 transition-colors hover:bg-paper-raised"
              >
                <OrcidMark className="size-6 shrink-0" />
                <span className="min-w-0">
                  <span className="eyebrow block text-muted">ORCID iD</span>
                  <span className="mono mt-0.5 block text-sm text-ink">
                    0009-0009-2916-7633
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={github}
                target="_blank"
                rel="me noopener noreferrer"
                className="group flex items-center gap-3 border border-ink bg-paper-white px-4 py-3 transition-colors hover:bg-paper-raised"
              >
                <Github className="size-6 shrink-0 text-ink" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="eyebrow block text-muted">GitHub</span>
                  <span className="mono mt-0.5 block text-sm text-ink">Venu2328</span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {indexes
                .filter((ix) => !ix.href)
                .map((ix) => (
                  <span key={ix.name} className="chip">
                    {ix.name}
                  </span>
                ))}
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* ── What stands behind it ──────────────────────────────── */}
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
            </Reveal>

            {/* ── The paper ──────────────────────────────────────────── */}
            <Reveal delay={0.14} className="space-y-12">
              {papers.map((p) => (
                <figure key={p.title}>
                  <PdfFrame
                    src={p.cover ?? ''}
                    alt={p.title}
                    label="the-role-of-technology-in-modern-indian-education.pdf"
                    meta="Abstract"
                    /* The scan is landscape (2408x1570); framing it portrait
                       cropped a third of the page away down both sides. */
                    aspect="aspect-[3/2]"
                  />

                  <figcaption className="mt-6 border-t-2 border-ink pt-5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="eyebrow bg-ink px-2.5 py-1 text-paper">
                        {p.status}
                      </span>
                      {p.venue && <span className="eyebrow text-orange">{p.venue}</span>}
                      {p.duration && (
                        <span className="eyebrow text-muted">
                          {p.duration} of original work
                        </span>
                      )}
                    </div>

                    <h2 className="headline mt-4 text-xl leading-snug text-ink sm:text-2xl">
                      {p.title}
                    </h2>

                    <p className="mt-3 leading-relaxed text-ink-soft">{p.note}</p>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
  </>
);

export const Research = () => (
  <>
    <Masthead page="research" edition="Research" />
    <Dateline centre="Papers · Journals · Conferences" edition="Research Supplement" />

    <main id="main-content" tabIndex={-1}>
      <ResearchSection />
      <Contact />
    </main>

    <Footer />
  </>
);
