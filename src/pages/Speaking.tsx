import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { Ticker } from '../components/paper/Ticker';
import { Reveal } from '../components/motion/Reveal';
import { SpeakingReel } from '../components/speaking/SpeakingReel';
import { SocialStrips } from '../components/speaking/SocialStrips';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

/**
 * The speaking supplement.
 *
 * Its nameplate is the page's only h1, set as solid ink the same way the EdTech
 * supplement sets its own — the two supplements should read as issues of one
 * paper, not as two different websites.
 *
 * The footage runs down the left and the profiles down the right, because the
 * argument of the page is that the two are the same act: saying a thing in a
 * room, and saying it where anyone can find it afterwards.
 */
const ticker = [
  'Keynotes',
  'Debate',
  'Panels',
  'School & college halls',
  'On the record',
];

/** The supplement body, so the front page can run it inline. */
export const SpeakingSection = () => (
  <>
      <section
        id="speaking"
        aria-labelledby="speaking-heading"
        className="scroll-mt-20 border-b border-ink bg-paper"
      >
        <Ticker words={ticker} />

        <div className="shell py-14 sm:py-20">
          <Reveal>
            <h1
              id="speaking-heading"
              className="headline text-[clamp(2.4rem,10.5vw,8.5rem)] leading-[0.88] tracking-[-0.03em] text-ink"
            >
              ACTIVE KEYNOTE
              <br />
              SPEAKER &amp; <span className="text-orange">LEADER</span>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rule-double mt-8" />
            <p className="deck mt-6 text-[clamp(1.2rem,2.6vw,2rem)] text-ink">
              I have my own public stand.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Halls, panels, benches and cameras. The clips below are unedited
              stretches of me making an argument in front of people who were free to
              disagree — which is the only test of one worth making.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal delay={0.12}>
              <SpeakingReel />
            </Reveal>

            <Reveal delay={0.16} className="space-y-10">
              <div>
                <p className="eyebrow text-muted">Where to find me</p>
                <div className="rule-hair mt-3" />
                <p className="mt-6 leading-relaxed text-ink-soft">
                  Everything I publish points back to one place, and this is it. The
                  belts below carry every profile I actually keep — each one verified,
                  each one linking home.
                </p>
              </div>

              <SocialStrips />
            </Reveal>
          </div>
        </div>
      </section>
  </>
);

export const Speaking = () => (
  <>
    <Masthead page="speaking" edition="Speaking" />
    <Dateline centre="Keynotes · Debate · Panels" edition="Speaking Supplement" />

    <main id="main-content" tabIndex={-1}>
      <SpeakingSection />
      <Contact />
    </main>

    <Footer />
  </>
);
