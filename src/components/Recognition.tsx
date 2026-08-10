import { type FC, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';

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
      className="scroll-mt-24 border-y border-line bg-surface py-24 sm:py-32"
    >
      <div className="shell max-w-5xl">
        <SectionHeading
          index="06"
          kicker="Credentials"
          title={
            <span id="credentials-heading">
              Where I've <Accent>trained</Accent>.
            </span>
          }
          lede="Coursework completed outside school, listed with the body that issued it and the year it was awarded."
          className="max-w-3xl"
        />

        <ul className="mt-16 list-none space-y-4 p-0">
          {credentials.map((c, i) => (
            <CredentialRow key={c.title + i} c={c} />
          ))}
        </ul>
      </div>
    </section>
  );
};

/**
 * Each row sits behind a red curtain that slides away as the row rises through
 * the viewport, revealing the certification underneath. Scrubbed to scroll
 * position rather than triggered, so it reverses when you scroll back up.
 */
const CredentialRow: FC<{ c: Credential }> = ({ c }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'start 0.42'],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], ['0%', '-103%']);
  const x = useSpring(xRaw, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <li
      ref={ref}
      className="relative min-h-[112px] overflow-hidden border border-line bg-bg sm:min-h-[128px]"
    >
      <div className="flex h-[112px] items-center justify-between gap-4 px-6 sm:h-[128px] sm:px-9">
        <div className="min-w-0">
          <p className="eyebrow mb-2 text-red">{c.short}</p>
          <h3 className="display text-lg leading-tight text-ink sm:text-2xl">{c.title}</h3>
          <p className="mt-1.5 hidden text-sm text-muted sm:block">{c.issuer}</p>
        </div>
        <span className="display shrink-0 text-2xl text-muted sm:text-3xl">{c.year}</span>
      </div>

      <motion.div
        aria-hidden="true"
        style={reduce ? { x: '-103%' } : { x }}
        className="absolute inset-0 flex items-center gap-5 bg-red px-6 sm:px-9"
      >
        <span className="flex size-16 shrink-0 items-center justify-center bg-white p-3 sm:size-20">
          <img
            src={c.logo}
            alt={c.alt}
            width="80"
            height="80"
            loading="lazy"
            decoding="async"
            className="size-full object-contain"
          />
        </span>
        <span className="min-w-0">
          <span className="eyebrow block text-on-red/70">Issued by</span>
          <span className="display block truncate text-2xl leading-tight text-on-red sm:text-3xl">
            {c.short}
          </span>
        </span>
      </motion.div>
    </li>
  );
};
