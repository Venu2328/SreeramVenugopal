import { Reveal } from '../motion/Reveal';
import { Ticker } from '../paper/Ticker';
import { SimulationReel } from './SimulationReel';
import { AppCta } from './AppCta';
import { creed, ticker } from '../../data/edtech';

/**
 * AdvancedEdtech
 *
 * The front page of the ventures supplement: the running strip, the nameplate
 * set as solid ink, and then the two columns the page is built on — the creed
 * down the left, the simulations and the app down the right.
 *
 * ADVANCED EDTECH is set as large as the measure allows and tracked tight,
 * which is what makes it read as a printed nameplate rather than a heading. It
 * is the only type on the site set larger than the site's own masthead, and
 * that is deliberate: on this page, the product is the paper.
 */
export const AdvancedEdtech = () => (
  <section
    id="edtech"
    aria-labelledby="edtech-heading"
    className="scroll-mt-20 border-b border-ink bg-paper"
  >
    <Ticker words={ticker} />

    <div className="shell py-14 sm:py-20">
      <Reveal>
        <h1
          id="edtech-heading"
          className="headline text-[clamp(2.6rem,12.5vw,10rem)] leading-[0.86] tracking-[-0.03em] text-ink"
        >
          ADVANCED
          <br />
          EDTECH
        </h1>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="rule-double mt-8" />
        <p className="deck mt-6 text-[clamp(1.1rem,2.2vw,1.6rem)] text-ink-soft">
          Founder background &amp; startup on news headlines.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* ── The creed ───────────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <p className="eyebrow text-muted">The premise</p>
          <div className="rule-hair mt-3" />

          <ul className="mt-8 list-none space-y-9 p-0">
            {creed.map((c, i) => (
              <Reveal as="li" key={c.land} delay={0.1 + i * 0.09}>
                <div className="flex gap-5">
                  <span className="eyebrow mono shrink-0 pt-2 text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="headline text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.06] text-ink">
                    {c.lead}{' '}
                    {/* The landing word is the line — it gets the colour and the
                        extra tracking that makes it read as a stamp. */}
                    <span className="tracking-[0.02em] text-orange">{c.land}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        {/* ── The product ─────────────────────────────────────────────── */}
        <Reveal delay={0.16} className="space-y-12">
          <SimulationReel />
          <AppCta />
        </Reveal>
      </div>
    </div>
  </section>
);
