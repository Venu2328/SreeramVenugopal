import { type FC, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { SectionHeading } from './SectionHeading';

type Credential = {
  title: string;
  issuer: string;
  short: string;
  year: string;
  logo: string;
  alt: string;
};

const credentials: Credential[] = [
  {
    title: 'CS in Data Science & AI',
    issuer: 'IIT Madras — School Connect',
    short: 'IIT Madras',
    year: '2024',
    logo: '/logos/iit-madras.png',
    alt: 'Indian Institute of Technology Madras',
  },
  {
    title: 'Economic Finance & Money Matters',
    issuer: 'IIT Madras — School Connect',
    short: 'IIT Madras',
    year: '2024',
    logo: '/logos/iit-madras.png',
    alt: 'Indian Institute of Technology Madras',
  },
  {
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    short: 'Google',
    year: '2023',
    logo: '/logos/google.svg',
    alt: 'Google',
  },
];

export const Recognition = () => {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-paper-2 border-y border-line scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          index="04"
          kicker="Credentials"
          title={<span id="credentials-heading">Certified by the best.</span>}
          className="max-w-3xl"
        />

        <ul className="mt-14 space-y-4 list-none p-0">
          {credentials.map((c, i) => (
            <CredentialRow key={c.title + i} c={c} />
          ))}
        </ul>
      </div>
    </section>
  );
};

const CredentialRow: FC<{ c: Credential }> = ({ c }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();

  // Scrub the curtain to scroll position: covered when the row sits low in
  // the viewport, fully revealed as it rises — and it reverses on scroll-up.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'start 0.42'],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], ['0%', '-103%']);
  const x = useSpring(xRaw, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <li
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-line bg-paper min-h-[112px] sm:min-h-[128px]"
    >
      {/* certification — revealed beneath the curtain */}
      <div className="flex items-center justify-between gap-4 h-[112px] sm:h-[128px] px-6 sm:px-9">
        <div>
          <p className="eyebrow text-crimson mb-1.5">{c.short}</p>
          <h3 className="display text-xl sm:text-2xl text-ink leading-tight">{c.title}</h3>
          <p className="text-sm text-stone mt-1 hidden sm:block">{c.issuer}</p>
        </div>
        <span className="display text-2xl sm:text-3xl text-crimson shrink-0">{c.year}</span>
      </div>

      {/* the curtain: a bold crimson panel carrying the logo */}
      <motion.div
        aria-hidden="true"
        style={reduce ? { x: '-103%' } : { x }}
        className="absolute inset-0 bg-crimson flex items-center gap-5 px-6 sm:px-9"
      >
        <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center p-3 shrink-0 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] ring-2 ring-white/40">
          <img
            src={c.logo}
            alt={c.alt}
            width="80"
            height="80"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </span>
        <span className="min-w-0">
          <span className="eyebrow text-white/70 block">Certified by</span>
          <span className="display text-2xl sm:text-3xl font-semibold text-white leading-tight block truncate">
            {c.short}
          </span>
        </span>
        <span className="eyebrow text-white/60 ml-auto shrink-0 hidden sm:flex items-center gap-2">
          Scroll
          <span aria-hidden="true">→</span>
        </span>
      </motion.div>
    </li>
  );
};
