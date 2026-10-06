import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { Ticker } from '../components/paper/Ticker';
import { PdfFrame } from '../components/paper/PdfFrame';
import { OrcidMark } from '../components/research/OrcidMark';
import { type ReactNode } from 'react';
import { Reveal } from '../components/motion/Reveal';
import { SketchLayer } from '../components/sketch/Sketch';
import { ScatteredPapers } from '../components/sketch/figures';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { assurances, findings, github, indexes, orcid, papers } from '../data/journals';

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
export const ResearchSection = ({ lead = false }: { lead?: boolean }) => (
  <>
      <section
        id="research"
        aria-labelledby="research-heading"
        className="relative scroll-mt-20 overflow-hidden border-b border-ink bg-paper flex min-h-[100svh] flex-col justify-center"
      >
        <Ticker words={ticker} />

        {/* 1,471,473 schools, as the pile of paper that actually was. */}
        <SketchLayer className="-left-20 bottom-0 w-[26rem] opacity-[0.12] sm:-left-12 sm:w-[34rem] lg:w-[40rem]">
          <ScatteredPapers />
        </SketchLayer>

        <div className="shell relative z-10 py-14 sm:py-20">
          <Reveal>
            <p className="eyebrow text-orange">Research brief · Open access · 1,471,473 schools</p>

            <Head lead={lead}
              id="research-heading"
              className="headline mt-5 text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-ink"
            >
              RESEARCH PAPERS,
              <br />
              JOURNALS &amp;{' '}
              <span className="text-orange">CONFERENCES</span>
            </Head>

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

          {/* The four figures the brief leads with. They are the argument;
              everything below is the working. */}
          <Reveal delay={0.08}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-y-2 border-ink py-7 lg:grid-cols-4">
              {findings.map((f) => (
                <div key={f.figure}>
                  <dt className="headline text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none text-orange">
                    {f.figure}
                  </dt>
                  <dd className="mt-2.5 text-xs leading-tight text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.45fr)] lg:gap-14">
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
                /*
                 * The brief stands to the right of what is said about it, not
                 * above it. A portrait page with its caption underneath runs the
                 * section well past a screen, and the measure beside the
                 * document was empty the whole time.
                 */
                <figure
                  key={p.title}
                  className="grid grid-cols-[minmax(0,1fr)] gap-7 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:items-start sm:gap-9"
                >
                  <div className="sm:order-2">
                  <PdfFrame
                    src={p.cover ?? ''}
                    alt={p.title}
                    href={p.href}
                    label="Research-Whitepaper.pdf"
                    meta="Research brief · 1,471,473 schools"
                    /* The brief is a portrait page (1131x1600). */
                    aspect="aspect-[3/4]"
                  />
                  </div>

                  <figcaption className="border-t-2 border-ink pt-5 sm:order-1 sm:border-t-0 sm:pt-0">
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

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-solid group"
                        >
                          Read white paper
                          <ArrowRight
                            className="size-3.5 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                      {p.preprint && (
                        <a
                          href={p.preprint}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw eyebrow text-muted transition-colors hover:text-ink"
                        >
                          The manuscript behind it
                        </a>
                      )}
                    </div>
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
      <ResearchSection lead />
      <Contact />
    </main>

    <Footer />
  </>
);

/**
 * The section's heading, promoted to <h1> only when the section is the whole
 * page. Inline on the front page it is one story among seven, so it is an <h2>.
 */
const Head = ({
  lead,
  children,
  ...rest
}: { lead: boolean; children: ReactNode } & Record<string, unknown>) =>
  lead ? <h1 {...rest}>{children}</h1> : <h2 {...rest}>{children}</h2>;
