import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode } from 'react';

/**
 * Accent
 *
 * One keyword per major heading, lit in red with a rule that draws in beneath
 * it from the left as the heading enters view. This is the page's single
 * repeated flourish — used once per section and never twice in one heading,
 * which is what keeps it feeling deliberate rather than decorative.
 *
 * Under reduced motion the rule is simply present at full width; nothing moves.
 */
export const Accent = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();

  return (
    <span className="relative inline-block whitespace-nowrap text-red">
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left bg-red glow-red"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -18% 0px' }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
};
