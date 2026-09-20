import { type ReactNode } from 'react';

/**
 * Accent
 *
 * One word per headline, set in orange italic. In print the italic does as
 * much work as the colour — a headline that simply changes colour mid-phrase
 * reads as a link, while one that changes cut reads as emphasis.
 *
 * Used once per heading and never twice, which is what keeps it deliberate.
 */
export const Accent = ({ children }: { children: ReactNode }) => (
  <em className="font-display italic text-orange">{children}</em>
);
