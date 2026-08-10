import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Portrait } from './effects/Portrait';
import { positions } from '../data/positions';

const ease = [0.16, 1, 0.3, 1] as const;

const facts = [
  ['Council', 'Est. 2021'],
  ['Platform', 'Est. 2023'],
  ['Based in', 'Puducherry, India'],
];

export const Hero = () => {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-14"
    >
      {/* Atmosphere, back to front: grid, portrait, warmth, vignette */}
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
      <Portrait />
      <div aria-hidden="true" className="pool pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0" />

      <div className="shell relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-4"
        >
          <span aria-hidden="true" className="h-px w-10 bg-red" />
          <span className="eyebrow text-muted">Puducherry, India</span>
        </motion.div>

        <h1
          id="hero-heading"
          className="display display-tight mt-8 text-[clamp(2.75rem,10.5vw,8.5rem)] text-ink"
        >
          {['Sreeram', 'Venugopal'].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.12 + i * 0.1, ease }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* The two positions carry the page — stated plainly, immediately */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-9 list-none space-y-2.5 border-l border-line-strong p-0 pl-5"
        >
          {positions.map((p) => (
            <li key={p.organisation} className="text-base leading-snug sm:text-lg">
              <span className="text-ink">{p.office}</span>
              <span aria-hidden="true" className="mx-2 text-red">
                /
              </span>
              <span className="text-ink-soft">{p.organisation}</span>
              <span className="eyebrow ml-3 text-muted">{p.since}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58, ease }}
          className="mt-9 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          I build the things I wanted to exist. A council that turns students into
          leaders, and a platform that makes physics something you can handle rather
          than memorise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a href="#council" className="btn btn-solid group">
            The Council
            <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          <a href="#contact" className="btn group">
            Get in touch
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="shell relative mt-16 grid w-full grid-cols-1 border-t border-line sm:mt-20 sm:grid-cols-3"
      >
        {facts.map(([k, v]) => (
          <div
            key={k}
            className="border-b border-line py-5 sm:border-b-0 sm:pr-8 sm:[&:not(:last-child)]:border-r"
          >
            <dt className="eyebrow mb-2 text-muted">{k}</dt>
            <dd className="display text-lg text-ink">{v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};
