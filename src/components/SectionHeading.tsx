import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Reveal } from './motion/Reveal';

/**
 * Every section opens the same way: an index, a mono eyebrow, a rule that
 * draws itself across, then the display heading. The repetition is the point —
 * it's what makes a long single-page scroll read as one continuous document
 * rather than a stack of unrelated blocks.
 */
export const SectionHeading = ({
  index,
  kicker,
  title,
  lede,
  className = '',
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) => (
  <Reveal className={className}>
    <div className="flex items-center gap-4">
      <span className="eyebrow mono text-red">{index}</span>
      <span className="eyebrow eyebrow-dash text-muted">{kicker}</span>
    </div>

    <motion.div
      aria-hidden="true"
      className="filmline mt-5 origin-left"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    />

    <h2 className="display display-tight mt-8 text-[clamp(2rem,5vw,3.5rem)] text-ink">
      {title}
    </h2>

    {lede && (
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>
    )}
  </Reveal>
);
