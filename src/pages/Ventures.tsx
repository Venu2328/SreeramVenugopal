import { ArrowLeft } from 'lucide-react';
import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { SciPhyLabsSpread } from '../components/ventures/SciPhyLabsSpread';
import { PopcSpread } from '../components/ventures/PopcSpread';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

/**
 * The ventures supplement: both organisations at full length, § A and § B.
 *
 * It carries the same nameplate as the front page rather than a reduced one,
 * because a supplement of a paper is still that paper. Only the dateline
 * changes, to say which edition you are holding.
 */
export const Ventures = () => (
  <>
    <Masthead page="ventures" edition="Ventures" />
    <Dateline
      centre="SciPhyLabs · Est. 2023 — POPC · Est. 2026"
      edition="Ventures Supplement"
    />

    <main id="main-content" tabIndex={-1}>
      <section className="border-b border-ink bg-paper py-12 sm:py-16">
        <div className="shell">
          <a
            href="/"
            className="eyebrow group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="size-3.5 text-orange transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to the front page
          </a>

          <h1 className="headline headline-tight mt-7 text-[clamp(2.2rem,7vw,5rem)] text-ink">
            Two organisations, both founded and both{' '}
            <em className="font-display italic text-orange">still running</em>.
          </h1>

          <div className="rule-heavy mt-7" />

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            One is a physics platform I started at fifteen. The other is the largest
            student organisation in Puducherry. Every claim on this page links to
            somewhere you can check it.
          </p>
        </div>
      </section>

      <SciPhyLabsSpread />
      <PopcSpread />
      <Contact />
    </main>

    <Footer />
  </>
);
