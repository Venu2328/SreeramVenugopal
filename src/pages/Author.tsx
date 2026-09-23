import { ArrowUpRight } from 'lucide-react';
import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { Ticker } from '../components/paper/Ticker';
import { Reveal } from '../components/motion/Reveal';
import { BookShelf } from '../components/author/BookShelf';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { books, bookstore, series } from '../data/books';

/**
 * The authoring supplement.
 *
 * The books, and only the books — academic physics written for Grade 11 and 12
 * against how Indian education actually teaches the subject. The papers have
 * their own supplement.
 *
 * The claim in the nameplate is a large one, so everything under it is a
 * reason rather than a restatement: what the books do differently, who they
 * are for, and how far they are meant to reach.
 */
const ticker = [
  'The G.O.A.T. series',
  'Guide of all time',
  'Interactive simulations',
  'PYQ vault',
  'Grade 11 & 12',
];

const claims = [
  {
    head: 'Next-generational designs',
    body: 'Laid out to be read rather than endured — the opposite of the dense, static page a physics book usually hands you.',
  },
  {
    head: 'An app for interactive simulations',
    body: 'Every concept tied to a system you can change and watch respond, so the formula arrives after the intuition rather than in place of it.',
  },
  {
    head: `${series.name} — ${series.expansion}`,
    body: 'A single spine covering the syllabus, the past papers and the reasoning, written to still be worth opening in a decade.',
  },
  {
    head: 'Reaching 10+ million students, annually',
    body: 'The Indian student community sitting these exams every year is the audience. The books are priced and built for that scale.',
  },
];

/** The supplement body, so the front page can run it inline. */
export const BooksSection = () => (
  <>
      <section
        id="books"
        aria-labelledby="books-heading"
        className="scroll-mt-20 border-b border-ink bg-paper flex min-h-[100svh] flex-col justify-center"
      >
        <Ticker words={ticker} />

        <div className="shell py-14 sm:py-20">
          <Reveal>
            <p className="eyebrow text-orange">
              Authoring academic books to solve Indian education&apos;s #1 problem
            </p>

            <h1
              id="books-heading"
              className="headline mt-5 text-[clamp(2.5rem,9.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em] text-ink"
            >
              THE MOST MODERN
              <br />
              <span className="text-orange">BOOKS EVER</span>
            </h1>

            <div className="rule-double mt-8" />
          </Reveal>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* ── Why they exist ──────────────────────────────────────── */}
            <Reveal delay={0.1}>
              <p className="eyebrow text-muted">What makes them different</p>
              <div className="rule-hair mt-3" />

              <ul className="mt-7 list-none border-t border-rule p-0">
                {claims.map((c, i) => (
                  <Reveal as="li" key={c.head} delay={0.08 + i * 0.07}>
                    <div className="flex gap-5 border-b border-rule py-6">
                      <span className="eyebrow mono shrink-0 pt-1.5 text-orange">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h2 className="headline text-xl leading-tight text-ink sm:text-2xl">
                          {c.head}
                        </h2>
                        <p className="mt-2 leading-relaxed text-ink-soft">{c.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.2}>
                <a
                  href={bookstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-2.5"
                >
                  <span className="link-draw eyebrow text-muted transition-colors group-hover:text-ink">
                    + Show more
                  </span>
                  <ArrowUpRight
                    className="size-3.5 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            </Reveal>

            {/* ── The books themselves ────────────────────────────────── */}
            <Reveal delay={0.14}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-muted">On the desk</p>
                <p className="eyebrow text-muted">
                  {books.length} title{books.length === 1 ? '' : 's'} in progress
                </p>
              </div>
              <div className="rule-hair mt-3" />

              <div className="mt-7">
                <BookShelf />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
  </>
);

export const Author = () => (
  <>
    <Masthead page="author" edition="Authoring" />
    <Dateline centre={`${series.name} · Physics`} edition="Authoring Supplement" />

    <main id="main-content" tabIndex={-1}>
      <BooksSection />
      <Contact />
    </main>

    <Footer />
  </>
);
