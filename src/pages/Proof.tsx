import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { LogoTicker } from '../components/paper/LogoTicker';
import { Reveal } from '../components/motion/Reveal';
import { CertificatePile } from '../components/proof/CertificatePile';
import { CertificateReel } from '../components/proof/CertificateReel';
import { Credentials } from '../components/Credentials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { institutions, type Institution } from '../data/institutions';
import { useState } from 'react';

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
/** The supplement body, so the front page can run it inline. */
export const ProofSection = () => (
  <>
      <section
        id="proof"
        aria-labelledby="proof-heading"
        className="relative scroll-mt-20 border-b border-ink bg-paper flex min-h-[100svh] flex-col justify-center"
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

              {/*
                Badges rather than a list. These are marks a reader recognises
                on sight, and seven of them collected in a grid say "certified
                by" faster than seven lines of type ever could.
              */}
              <p className="eyebrow mt-10 text-sm font-bold tracking-[0.25em] text-orange">
                Certified by
              </p>
              <div className="rule-heavy mt-3" />

              <ul className="mt-7 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3">
                {institutions.map((inst, i) => (
                  <Reveal as="li" key={inst.name} delay={i * 0.05}>
                    <InstitutionBadge inst={inst} />
                  </Reveal>
                ))}
              </ul>
            </Reveal>

            {/* ── The evidence ────────────────────────────────────────── */}
            <Reveal delay={0.12}>
              <CertificatePile />
            </Reveal>
          </div>
        </div>
      </section>

    <Credentials />
  </>
);

export const Proof = () => (
  <>
    <Masthead page="credentials" edition="Proof of Work" />
    <Dateline centre="Certified · Trained · Recognised" edition="Credentials Supplement" />

    <main id="main-content" tabIndex={-1}>
      <ProofSection />
      <Contact />
    </main>

    <Footer />
  </>
);

/**
 * InstitutionBadge
 *
 * A mark collected and pinned, big enough to be read across a room. The name is
 * printed under it rather than left to the logo alone — half these bodies are
 * ones a stranger will not recognise on sight, and a badge nobody can name is
 * decoration rather than evidence.
 *
 * A missing image leaves only the name, which was always the part that mattered.
 */
const InstitutionBadge = ({ inst }: { inst: Institution }) => {
  const [failed, setFailed] = useState(false);

  const body = (
    <>
      <span className="flex h-16 w-full items-center justify-center">
        {failed ? (
          <span className="headline text-2xl text-ink/30">{inst.name.slice(0, 2)}</span>
        ) : (
          <img
            src={inst.logo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            /* Contained, never cropped — a trimmed logo is a damaged one. */
            className="max-h-full max-w-full object-contain"
          />
        )}
      </span>
      <span className="eyebrow mt-4 block text-center text-xs font-bold leading-tight text-ink">
        {inst.name}
      </span>
    </>
  );

  const shell =
    'flex h-full flex-col items-center justify-center border-2 border-ink bg-paper-white p-5 transition-colors';

  return inst.href ? (
    <a
      href={inst.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} hover:bg-orange`}
    >
      {body}
    </a>
  ) : (
    <span className={shell}>{body}</span>
  );
};
