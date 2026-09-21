import { type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * ClippingCard
 *
 * A published thing, cut out and pinned: a facsimile of its opening page, then
 * the source, the title, what it argues, its subjects, and the way through to
 * the real thing.
 *
 * Papers and essays share this card rather than each having their own, because
 * they are the same object to a reader — something published elsewhere, shown
 * here with enough of its face to be recognised. Two near-identical cards
 * maintained separately drift apart within a month.
 *
 * A card with no cover typesets its own from the same metadata rather than
 * leaving a hole, so a missing screenshot degrades to a plain card instead of
 * a broken one.
 */
export const ClippingCard = ({
  cover,
  coverAlt,
  source,
  stamp,
  title,
  body,
  tags = [],
  action,
  aside,
}: {
  cover?: string;
  coverAlt: string;
  /** Where it was published — the journal, the publication. */
  source: string;
  /** The year, or anything else that behaves like a date stamp. */
  stamp?: string;
  title: string;
  body: string;
  tags?: string[];
  action: { label: string; href: string };
  /** An optional secondary link, e.g. a DOI. */
  aside?: ReactNode;
}) => (
  <article className="flex h-full flex-col border border-rule bg-paper">
    <div className="border-b border-rule bg-paper-white">
      {cover ? (
        <img
          src={cover}
          alt={coverAlt}
          loading="lazy"
          decoding="async"
          /* Anchored to the top: these are screenshots of an opening page, and
             the masthead and headline are the part worth showing. */
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="deck text-sm text-muted">{source}</p>
          <p className="headline text-xl leading-tight text-ink">{title}</p>
          <p className="eyebrow text-muted">Sreeram Venugopal</p>
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow truncate text-orange">{source}</p>
        {stamp && (
          <span className="eyebrow shrink-0 border border-rule-strong px-2.5 py-1 text-muted">
            {stamp}
          </span>
        )}
      </div>

      <h3 className="headline mt-4 text-xl leading-snug text-ink sm:text-2xl">{title}</h3>

      <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{body}</p>

      {tags.length > 0 && (
        <ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
          {tags.map((t) => (
            <li key={t}>
              <span className="chip">{t}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid group"
        >
          {action.label}
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
        {aside}
      </div>
    </div>
  </article>
);
