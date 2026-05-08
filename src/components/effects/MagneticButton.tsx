import { motion, useMotionValue, useSpring } from 'motion/react';
import { type ReactNode, type MouseEvent, useRef } from 'react';

/**
 * MagneticButton
 *
 * Wraps a child element so it gently translates toward the cursor while it
 * hovers within the wrapper's bounds. Uses spring-damped motion values so the
 * pull and the snap-back both feel cinematic (no jitter).
 *
 * Hover-only: on touch devices the wrapper renders inert. The translation is
 * decorative and applied via CSS transform — no layout shift, no impact on
 * surrounding flow, so siblings don't reflow.
 */
export const MagneticButton = ({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
