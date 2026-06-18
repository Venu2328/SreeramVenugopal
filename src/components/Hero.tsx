import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

const facts = [
  ['Role', 'Founder, Author & Researcher'],
  ['Building', 'SciPhyLabs'],
  ['Based in', 'India'],
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* masthead label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-8 sm:mb-10"
        >
          <span className="crimson-rule" aria-hidden="true" />
          <span className="eyebrow text-crimson">Founder · Author · Researcher</span>
        </motion.div>

        <h1 id="hero-heading" className="display font-semibold text-ink leading-[0.92] tracking-[-0.02em]">
          {['Sreeram', 'Venugopal'].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                className="block text-[clamp(3.5rem,13vw,11rem)]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-8 sm:mt-10 max-w-2xl text-lg sm:text-xl text-ink-soft leading-relaxed"
        >
          I'm the founder, author and researcher behind{' '}
          <span className="text-ink font-medium">SciPhyLabs</span> — an interactive-first, research-backed
          physics ecosystem of 500+ simulations that help students truly understand the subject rather
          than memorise it, and that's driving growth in STEM education and schools infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 bg-crimson text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-crimson-deep transition-colors"
          >
            View selected work
            <ArrowDownRight size={17} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-ink border border-line hover:border-ink/40 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* quick facts strip, anchored low */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-6xl mx-auto w-full mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 border-t border-line"
      >
        {facts.map(([k, v]) => (
          <div key={k} className="py-5 sm:pr-8 border-b sm:border-b-0 border-line sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:pr-8">
            <dt className="eyebrow text-stone mb-1.5">{k}</dt>
            <dd className="display text-xl text-ink">{v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};
