import { motion } from 'motion/react';
import { type FC, type ReactNode } from 'react';

type Tag = 'div' | 'li' | 'ul' | 'section' | 'span' | 'p';

interface RevealProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Reveal
 *
 * The page's core scroll choreography: children fade and rise into place the
 * first time they enter the viewport. Honours reduced motion globally through
 * the app-level MotionConfig. Stagger groups of items by passing an
 * incrementing `delay`.
 */
export const Reveal: FC<RevealProps> = ({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = 24,
  once = true,
}) => {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};
