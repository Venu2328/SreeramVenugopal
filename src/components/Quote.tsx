import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { PaintCloud } from './atmosphere/PaintCloud';

export const Quote = () => {
  return (
    <section
      aria-label="Pull quote"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      <PaintCloud
        tone="gold"
        seed={9}
        className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink pointer-events-none"
      />

      <figure className="relative max-w-4xl mx-auto text-center m-0">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="serif italic text-ember text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-ember-glow"
        >
          “The classroom is his laboratory. A founder by instinct, a
          researcher by discipline, and a teacher at heart.”
        </motion.blockquote>

        <motion.figcaption
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="ui mt-8 text-chalk/45 text-xs uppercase tracking-[0.3em]"
        >
          On building SciPhyLabs · 2025
        </motion.figcaption>

        <motion.a
          href="#profile"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="hand inline-flex items-center gap-2 mt-10 text-2xl text-gold hover:text-chalk transition-colors"
        >
          Who am I
          <ArrowDown size={20} aria-hidden="true" />
        </motion.a>
      </figure>
    </section>
  );
};
