import { motion } from 'motion/react';
import { type ElementType, type ReactNode } from 'react';

/**
 * BrushText
 *
 * Hand-painted display type with a left-to-right "paint-on" wipe when it
 * scrolls into view. The dry-brush edge comes from the shared #roughen SVG
 * filter (see Atmosphere). Use only at large sizes — the displacement reads
 * as texture on headlines and as mush on body copy.
 */
export const BrushText = ({
  children,
  as = 'span',
  className = '',
  rough = true,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  rough?: boolean;
  delay?: number;
}) => {
  const Tag = motion(as as ElementType);
  return (
    <Tag
      initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`brush ${rough ? 'brush-rough' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
};
