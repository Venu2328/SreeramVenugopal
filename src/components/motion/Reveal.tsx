import { motion } from 'motion/react';
import { type FC, type ReactNode } from 'react';

type Tag = 'div' | 'li' | 'ul' | 'ol' | 'section' | 'span' | 'p' | 'dl';

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
 * The page's core scroll choreography: children fade and rise the first time
 * they enter the viewport. Slower and longer than a typical reveal — on a dark
 * ground a quick fade reads as a flicker, while a long one reads as a camera
 * settling.
 *
 * Reduced motion is honoured globally through the app-level MotionConfig.
 * Stagger groups by passing an incrementing `delay`.
 */
export const Reveal: FC<RevealProps> = ({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = 22,
  once = true,
}) => {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};
