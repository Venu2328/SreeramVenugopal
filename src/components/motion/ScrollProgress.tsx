import { motion, useScroll, useSpring } from 'motion/react';

/**
 * A thin crimson reading-progress bar pinned to the top of the page,
 * driven by overall scroll position and smoothed with a spring so it
 * glides rather than jumps.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-crimson"
    />
  );
};
