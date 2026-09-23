import { useState } from 'react';
import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { credentials, type Credential } from '../data/credentials';

/**
 * Credentials
 *
 * Coursework printed as physical clippings: white paper tiles pinned to the
 * page, each one knocked a degree or two off square, straightening when you
 * point at them. The rotation alternates by index so the wall reads as things
 * pinned by hand rather than a grid with a filter applied.
 *
 * These are the only elements on the site with a real drop shadow, because
 * they are the only ones meant to read as paper sitting on top of paper.
 */
const tilt = ['-rotate-[1.4deg]', 'rotate-[1deg]', 'rotate-[0.6deg]', '-rotate-[0.9deg]'];

export const Credentials = () => (
  <section
    id="credentials"
    aria-labelledby="credentials-heading"
    className="scroll-mt-20 border-b border-ink bg-paper py-16 sm:py-24"
  >
    <div className="shell">
      <SectionRule
        kicker="The record"
        mark="A"
        id="credentials-heading"
        title={
          <>
            Where I&apos;ve <Accent>trained</Accent>.
          </>
        }
        lede="The same credentials as a written record — course, issuing body, and the year it was awarded."
      />

      <ul className="mt-12 grid list-none grid-cols-[minmax(0,1fr)] gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((c, i) => (
          <Reveal as="li" key={c.title + i} delay={i * 0.07}>
            <CredentialClipping c={c} tilt={tilt[i % tilt.length]} />
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/**
 * A missing logo file prints the issuer's initials in the well rather than a
 * broken image icon — `public/logos/iit-madras.png` is absent from the repo at
 * the moment, and a blank frame is a far better failure than a torn one.
 */
const CredentialClipping = ({ c, tilt }: { c: Credential; tilt: string }) => {
  const [failed, setFailed] = useState(false);

  /* An acronym already in the name survives whole — "IIT Madras" reads as
     IITM, where taking first letters alone would give the meaningless IM. */
  const initials = c.short
    .split(/[\s—-]+/)
    .filter(Boolean)
    .map((w) => (w === w.toUpperCase() ? w : w[0].toUpperCase()))
    .join('')
    .slice(0, 5);

  return (
    <article
      className={`clipping group flex h-full flex-col p-6 transition-transform duration-500 hover:rotate-0 ${tilt}`}
    >
      <div className="flex h-20 items-center justify-center border-b border-rule pb-5">
        {failed ? (
          <span
            aria-label={c.alt}
            className="headline text-2xl tracking-tight text-ink/70"
          >
            {initials}
          </span>
        ) : (
          <img
            src={c.logo}
            alt={c.alt}
            width="120"
            height="60"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="max-h-12 w-auto object-contain"
          />
        )}
      </div>

      <p className="eyebrow mt-5 text-orange">{c.short}</p>

      <h3 className="headline mt-2.5 flex-1 text-lg leading-tight text-ink">{c.title}</h3>

      <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-rule pt-3">
        <span className="eyebrow truncate text-muted">Certified</span>
        {c.year && <span className="mono text-sm text-ink">{c.year}</span>}
      </div>
    </article>
  );
};
