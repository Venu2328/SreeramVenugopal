import { ArrowUpRight, FileText } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { journals, orcid, type Journal } from '../data/journals';

/**
 * Journals
 *
 * Research and publications, printed as clippings — a cover image of the
 * paper's first page, the journal and year, what it argues, and a link to the
 * PDF itself.
 *
 * The section prints even while `journals.ts` is empty. It renders reserved
 * slots rather than hiding, because this is a standing section of the paper
 * and a page that silently omits it would be a different page. Adding entries
 * to `src/data/journals.ts` replaces the placeholders automatically; nothing
 * here needs touching.
 */
export const Journals = () => {
  const hasPapers = journals.length > 0;

  return (
    <section
      id="journals"
      aria-labelledby="journals-heading"
      className="scroll-mt-20 border-b border-ink bg-paper-raised py-16 sm:py-24"
    >
      <div className="shell">
        <SectionRule
          kicker="Research & publications"
          mark="D"
          id="journals-heading"
          title={
            <>
              Published <Accent>work</Accent>.
            </>
          }
          action={
            <a
              href={orcid}
              target="_blank"
              rel="me noopener noreferrer"
              className="btn group"
            >
              ORCID record
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          }
          lede="Peer-reviewed papers and journal articles, each linked to the full PDF."
        />

        <ul className="mt-12 grid list-none gap-6 p-0 lg:grid-cols-2">
          {hasPapers
            ? journals.map((j, i) => (
                <Reveal as="li" key={j.title} delay={i * 0.08}>
                  <JournalCard j={j} />
                </Reveal>
              ))
            : [0, 1].map((i) => (
                <Reveal as="li" key={i} delay={i * 0.08}>
                  <ReservedSlot />
                </Reveal>
              ))}
        </ul>

        {/* The folio line counts what is printed. While the section is empty
            the slots already say so, and repeating it here only shouts. */}
        {hasPapers && (
          <p className="eyebrow mt-6 text-muted">
            Showing {journals.length} publication{journals.length === 1 ? '' : 's'}
          </p>
        )}
      </div>
    </section>
  );
};

const JournalCard = ({ j }: { j: Journal }) => (
  <article className="flex h-full flex-col border border-rule bg-paper">
    {/* The cover is a photograph of page one; without one, the card typesets
        its own stand-in from the same metadata rather than leaving a hole. */}
    <div className="border-b border-rule bg-paper-white">
      {j.cover ? (
        <img
          src={j.cover}
          alt={`First page of ${j.title}`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="deck text-sm text-muted">{j.journal}</p>
          <p className="headline text-xl leading-tight text-ink">{j.title}</p>
          <p className="eyebrow text-muted">Sreeram Venugopal</p>
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow truncate text-orange">{j.journal}</p>
        <span className="eyebrow shrink-0 border border-rule-strong px-2.5 py-1 text-muted">
          {j.year}
        </span>
      </div>

      <h3 className="headline mt-4 text-xl leading-snug text-ink sm:text-2xl">{j.title}</h3>

      <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{j.abstract}</p>

      <ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
        {j.tags.map((t) => (
          <li key={t}>
            <span className="chip">{t}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={j.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid group"
        >
          Read paper
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
        {j.doi && (
          <a
            href={j.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw eyebrow text-muted transition-colors hover:text-ink"
          >
            DOI
          </a>
        )}
      </div>
    </div>
  </article>
);

/** The shape of a paper, held open until there is one to put in it. */
const ReservedSlot = () => (
  <div className="flex h-full min-h-[22rem] flex-col items-center justify-center border border-dashed border-rule-strong bg-paper/60 px-8 py-16 text-center">
    <FileText className="size-7 text-rule-strong" aria-hidden="true" />
    <p className="eyebrow mt-5 text-muted">Awaiting publication</p>
    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
      Papers appear here once published, each with its abstract and the full PDF.
    </p>
  </div>
);
