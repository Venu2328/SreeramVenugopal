import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { type ReactNode, type MouseEvent, useRef, useState } from 'react';

/**
 * MagicCard
 *
 * Premium-feel interactive card wrapper that combines two effects:
 *  1) A subtle 3D tilt on cursor position (max ~6° by default), driven by
 *     spring-damped motion values so it never feels twitchy.
 *  2) A faint gold radial spotlight that follows the cursor inside
 *     the card on hover. Spotlight position is wired via CSS variables for
 *     near-zero render cost (no per-frame React state churn).
 *
 * The wrapper inherits border-radius from its child (`rounded-[inherit]`)
 * so it slots cleanly into existing glass cards without extra styling.
 */
export const MagicCard = ({
  children,
  className = '',
  maxTilt = 6,
  spotlight = true,
  spotlightRadius = 280,
  spotlightOpacity = 0.12,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  spotlight?: boolean;
  spotlightRadius?: number;
  spotlightOpacity?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 22,
    mass: 0.35,
  });
  const rotY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 22,
    mass: 0.35,
  });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    mx.set(nx);
    my.set(ny);
    if (ref.current) {
      ref.current.style.setProperty('--spot-x', `${nx * 100}%`);
      ref.current.style.setProperty('--spot-y', `${ny * 100}%`);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle ${spotlightRadius}px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(217, 182, 95, ${spotlightOpacity}), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};
