import { ArrowUpRight } from 'lucide-react';
import { appLogo, sciphylabs, stores, type Store } from '../../data/edtech';

/**
 * AppCta
 *
 * The device, the call, and the two store badges.
 *
 * A store badge with no listing behind it prints as a plain mark reading
 * "Coming soon" rather than as a link to nowhere — a button that looks live and
 * goes nowhere costs more trust than an honest one costs impatience. Filling in
 * `url` in `src/data/edtech.ts` turns each badge into a real link on its own.
 */
export const AppCta = () => (
  <div className="border-t-2 border-ink pt-8">
    <div className="flex flex-wrap items-center gap-5">
      <a
        href={sciphylabs}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SciPhyLabs"
        className="group flex size-16 shrink-0 items-center justify-center border border-ink bg-paper-white p-2 transition-colors hover:bg-paper-raised"
      >
        <img
          src={appLogo}
          alt="SciPhyLabs"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
          className="size-full object-contain"
        />
      </a>

      <div className="min-w-0">
        <p className="headline text-[clamp(1.5rem,3vw,2.25rem)] leading-none text-ink">
          Get the app <span className="text-orange">now</span>.
        </p>
        <p className="eyebrow mt-2 text-muted">Free · Android &amp; iOS</p>
      </div>
    </div>

    <ul className="mt-7 flex list-none flex-wrap gap-4 p-0">
      {stores.map((s) => (
        <li key={s.name}>
          <StoreBadge s={s} />
        </li>
      ))}
    </ul>

    <p className="deck mt-8 max-w-md text-xl leading-snug text-ink">
      Be the first to tell your group about us. Get SciPhyLabs.
    </p>
  </div>
);

const StoreBadge = ({ s }: { s: Store }) => {
  const inner = (
    <>
      <img
        src={s.logo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`${s.markClass} shrink-0 object-contain`}
      />
      <span className="min-w-0">
        <span className="eyebrow block text-muted">
          {s.url ? 'Get it on' : 'Coming soon'}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-ink">{s.name}</span>
      </span>
    </>
  );

  const shell =
    'flex items-center gap-3.5 border border-ink bg-paper-white px-4 py-3 min-w-[11rem]';

  if (!s.url) {
    return (
      <span className={`${shell} opacity-60`} aria-disabled="true">
        {inner}
      </span>
    );
  }

  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} group transition-colors hover:bg-paper-raised`}
    >
      {inner}
      <ArrowUpRight
        className="ml-auto size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
};
