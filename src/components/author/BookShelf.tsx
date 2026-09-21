import { useState } from 'react';
import { ArrowUpRight, BookOpen, RotateCcw } from 'lucide-react';
import { Reveal } from '../motion/Reveal';
import { books, bookstore, type Book } from '../../data/books';

/**
 * BookShelf
 *
 * The covers, shown the way a book is actually shown: front first, with the
 * back one press away. A cover is the only part of an unfinished book that
 * exists yet, so it is given the room to be read rather than shrunk to a
 * thumbnail beside a paragraph.
 *
 * Turning is a state change rather than a CSS 3-D flip. A flip looks right on a
 * desktop and stutters badly on the phones most of these readers use, and it
 * hides the back face from assistive technology in a way that is fiddly to
 * undo — where swapping the image keeps one honest `alt` at all times.
 */
export const BookShelf = () => (
  /* A lone title in a two-up grid reads as a gap where a second book should
     be, so a single book takes the full measure. */
  <ul
    className={`grid list-none gap-10 p-0 lg:gap-8 ${
      books.length > 1 ? 'sm:grid-cols-2' : ''
    }`}
  >
    {books.map((b, i) => (
      <Reveal as="li" key={b.title} delay={i * 0.08}>
        <BookCard b={b} />
      </Reveal>
    ))}
  </ul>
);

const BookCard = ({ b }: { b: Book }) => {
  const [showBack, setShowBack] = useState(false);
  const face = showBack ? b.back : b.cover;

  return (
    <figure className="flex h-full flex-col">
      <div className="clipping relative">
        {face ? (
          <img
            src={face}
            alt={`${b.title} — ${showBack ? 'back cover' : 'front cover'}`}
            loading="lazy"
            decoding="async"
            className="block aspect-[1410/2000] w-full object-contain"
          />
        ) : (
          /* No artwork yet: the card typesets its own rather than leaving a
             hole where a book should be. */
          <div className="flex aspect-[1410/2000] flex-col items-center justify-center gap-4 px-8 text-center">
            <BookOpen className="size-7 text-rule-strong" aria-hidden="true" />
            <p className="headline text-2xl leading-tight text-ink">{b.title}</p>
            {b.audience && <p className="eyebrow text-muted">{b.audience}</p>}
            <p className="eyebrow mt-2 text-muted">Cover to come</p>
          </div>
        )}

      </div>

      {b.back && (
        <button
          type="button"
          onClick={() => setShowBack((v) => !v)}
          className="eyebrow mt-3 inline-flex items-center gap-2 self-start text-muted transition-colors hover:text-ink"
        >
          <RotateCcw className="size-3" aria-hidden="true" />
          {showBack ? 'Show front cover' : 'Show back cover'}
        </button>
      )}

      <figcaption className="mt-5 flex flex-1 flex-col border-t-2 border-ink pt-5">
        <h3 className="headline text-2xl leading-tight text-ink">{b.title}</h3>
        {b.subtitle && <p className="deck mt-1.5 text-lg text-orange">{b.subtitle}</p>}
        {/* Status sits in the caption rather than stamped across the cover —
            the cover is artwork, and a badge laid over it hides the imprint. */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {b.audience && <span className="eyebrow text-muted">{b.audience}</span>}
          <span className="eyebrow bg-ink px-2.5 py-1 text-paper">{b.status}</span>
        </div>

        <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{b.blurb}</p>

        {b.features && b.features.length > 0 && (
          <ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
            {b.features.map((f) => (
              <li key={f}>
                <span className="chip">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={bookstore}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid group mt-6 self-start"
        >
          The bookstore
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </figcaption>
    </figure>
  );
};
