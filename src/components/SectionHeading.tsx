import { type ReactNode } from 'react';
import { Reveal } from './motion/Reveal';

/**
 * Consistent editorial section masthead: a numbered index, a crimson rule and
 * an optional kicker, set above a strong display heading. The number reflects
 * the section's real position in the page's running order.
 */
export const SectionHeading = ({
  index,
  kicker,
  title,
  className = '',
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  className?: string;
}) => (
  <Reveal className={className}>
    <div className="flex items-center gap-4 mb-5">
      <span className="index-num text-sm text-crimson">{index}</span>
      <span className="crimson-rule" aria-hidden="true" />
      <span className="eyebrow text-stone">{kicker}</span>
    </div>
    <h2 className="display font-semibold text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
      {title}
    </h2>
  </Reveal>
);
