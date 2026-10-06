import { type ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';
import { Ticker } from '../paper/Ticker';
import { ProductReel } from './ProductReel';
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
export const AdvancedEdtech = ({ lead = false }: { lead?: boolean }) => (
  <section
    id="edtech"
    aria-labelledby="edtech-heading"
    className="scroll-mt-20 border-b border-ink bg-paper flex min-h-[100svh] flex-col justify-center"
  >
    <Ticker words={ticker} />

    <div className="shell py-10 sm:py-14">
      <Reveal>
        <Head lead={lead}
          id="edtech-heading"
          className="headline text-[clamp(2.2rem,8.5vw,6.5rem)] leading-[0.86] tracking-[-0.03em] text-ink"
        >
          {/* Cut in blackletter and leaning, the way a nameplate was cut before
              anyone set type with a machine. EDTECH stays in the paper's own
              display face underneath it: the contrast between the two is the
              whole idea — the old trade and the thing being announced. */}
          <span className="gothic gothic-lean text-[1.22em]">Advanced</span>
          <br />
          EDTECH
        </Head>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="rule-double mt-6" />
        <p className="deck mt-5 text-[clamp(1.05rem,1.9vw,1.35rem)] text-ink-soft">
          Founder background &amp; startup on news headlines.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* ── The creed ───────────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <p className="eyebrow text-muted">The premise</p>
          <div className="rule-hair mt-3" />

          <ul className="mt-6 list-none space-y-6 p-0">
            {creed.map((c, i) => (
              <Reveal as="li" key={c.land} delay={0.1 + i * 0.09}>
                <div className="flex gap-5">
                  <span className="eyebrow mono shrink-0 pt-2 text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="headline text-[clamp(1.3rem,2.7vw,1.95rem)] leading-[1.08] text-ink">
                    {c.lead}{' '}
                    {/* The landing word is the line — it gets the colour and the
                        extra tracking that makes it read as a stamp. */}
                    <span className="tracking-[0.02em] text-orange">{c.land}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* The three lines make the case; this is what to do about it. It
              belongs under them rather than under the reels — the reels are the
              evidence, and a reader who has just read the argument should not
              have to cross the page to act on it. */}
          <div className="mt-10">
            <AppCta />
          </div>
        </Reveal>

        {/* ── The product ─────────────────────────────────────────────── */}
        <Reveal delay={0.16}>
          <ProductReel />
        </Reveal>
      </div>
    </div>
  </section>
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
