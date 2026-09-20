import { type ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';

/**
 * SectionRule
 *
 * How every section below the fold opens: a kicker and its section mark on one
 * line, a heavy rule beneath, then the headline — with an optional action
 * sitting on the baseline at the right, the way a paper hangs a "full record"
 * pointer off a section head.
 *
 * The repetition is the point. It is what makes a long scroll read as one
 * printed document rather than a stack of unrelated blocks.
 */
export const SectionRule = ({
  kicker,
  mark,
  title,
  lede,
  action,
  id,
  className = '',
}: {
  kicker: string;
  /** The section letter — § A, § B — printed in the margin of the kicker. */
  mark?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  /** Applied to the heading so `aria-labelledby` can point at it. */
  id?: string;
  className?: string;
}) => (
  <Reveal className={className}>
    <div className="flex items-baseline justify-between gap-6">
      <p className="eyebrow text-orange">
        {kicker}
        {mark && <span className="ml-3 text-muted">§ {mark}</span>}
      </p>
    </div>

    <div className="rule-heavy mt-3" />

    <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <h2 id={id} className="headline text-[clamp(2rem,5.5vw,3.75rem)] text-ink">
        {title}
      </h2>
      {action && <div className="shrink-0">{action}</div>}
    </div>

    {lede && (
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>
    )}
  </Reveal>
);
