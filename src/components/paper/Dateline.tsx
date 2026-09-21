/**
 * Dateline
 *
 * The row a paper prints between its nameplate and its lead story: where and
 * when it was set, what it is about, and which edition you are holding.
 *
 * The date is genuinely today's, which means the prerendered HTML and the
 * hydrated client can disagree whenever the build is older than the visit.
 * The value is decorative, so the mismatch is suppressed rather than frozen —
 * a dateline that quietly shows the build date would be worse than either.
 */
const today = () =>
  new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }).toUpperCase();

export const Dateline = ({
  centre = 'SciPhyLabs · Est. 2023 — Interactive physics',
  edition = 'Vol. I, Issue 1',
}: {
  centre?: string;
  edition?: string;
}) => (
  <div className="border-b border-rule bg-paper">
    <div className="shell grid gap-1.5 py-3 text-center sm:grid-cols-3 sm:text-left">
      <p className="eyebrow text-muted" suppressHydrationWarning>
        Puducherry, India — {today()}
      </p>
      <p className="eyebrow text-muted sm:text-center">{centre}</p>
      <p className="eyebrow text-muted sm:text-right">{edition}</p>
    </div>
  </div>
);
