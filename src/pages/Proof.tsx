import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { LogoTicker } from '../components/paper/LogoTicker';
import { Reveal } from '../components/motion/Reveal';
import { CertificatePile } from '../components/proof/CertificatePile';
import { CertificateReel } from '../components/proof/CertificateReel';
import { Credentials } from '../components/Credentials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { institutions } from '../data/institutions';

/**
 * The proof supplement.
 *
 * It replaces the static credentials section that used to sit on the front
 * page. That section stated four things and stopped; this page shows the paper
 * they were written on, and keeps room for the rest.
 *
 * The argument runs left to right: the claim and who backs it, then the
 * evidence itself. The detailed record follows underneath as § A, so a reader
 * who wants course names and dates rather than scans still gets them.
 */
export const Proof = () => (
  <>
    <Masthead page="credentials" edition="Proof of Work" />
    <Dateline centre="Certified · Trained · Recognised" edition="Credentials Supplement" />

    <main id="main-content" tabIndex={-1}>
      <section
        id="proof"
        aria-labelledby="proof-heading"
        className="relative scroll-mt-20 border-b border-ink bg-paper"
      >
        <LogoTicker />

        {/* Runs the full height of the section, start to end. */}
        <CertificateReel />

        <div className="shell py-14 sm:py-20 xl:pr-[9.5rem]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* ── The claim ───────────────────────────────────────────── */}
            <Reveal>
              <h1
                id="proof-heading"
                className="headline text-[clamp(2.4rem,7.5vw,5.5rem)] leading-[0.92] tracking-[-0.025em] text-ink"
              >
                I&apos;ve got
                <br />
                <span className="text-orange">PROOF OF WORK</span>
                <br />
                &amp; credentials.
              </h1>

              <div className="rule-double mt-8" />

              <p className="mt-6 max-w-lg leading-relaxed text-ink-soft">
                Coursework, training and recognition from the bodies below — each one
                issued, dated, and scanned. Nothing on this page is a claim you have to
                take my word for.
              </p>

              <ol className="mt-9 list-none border-t-2 border-ink p-0">
                {institutions.map((inst, i) => (
                  <Reveal as="li" key={inst.name} delay={i * 0.05}>
                    <div className="flex items-baseline gap-5 border-b border-rule py-4">
                      <span className="eyebrow mono shrink-0 text-orange">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {inst.href ? (
                        <a
                          href={inst.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw headline text-xl text-ink sm:text-2xl"
                        >
                          {inst.name}
                        </a>
                      ) : (
                        <span className="headline text-xl text-ink sm:text-2xl">
                          {inst.name}
                        </span>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Reveal>

            {/* ── The evidence ────────────────────────────────────────── */}
            <Reveal delay={0.12}>
              <CertificatePile />
            </Reveal>
          </div>
        </div>
      </section>

      <Credentials />
      <Contact />
    </main>

    <Footer />
  </>
);
