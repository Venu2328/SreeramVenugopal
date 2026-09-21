import {
  AtSign,
  BookOpen,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Rss,
  Twitter,
  type LucideIcon,
} from 'lucide-react';
import { profiles, type Profile } from '../../data/profiles';

/**
 * SocialStrips
 *
 * Two belts of profiles turning against each other — the top one drifting left,
 * the bottom one right — which is what makes them read as a mechanism rather
 * than as one animation played twice.
 *
 * Both stop the moment a pointer lands anywhere on the pair. A strip that keeps
 * moving while you are trying to click something in it is a strip you cannot
 * use, and these are real links, not decoration.
 *
 * Each belt lays its profiles down twice and slides by exactly half its own
 * width, so the loop resets on a frame where nothing has changed and the seam
 * never shows. Only the first copy is reachable; the duplicate is an artefact
 * of how the loop is built, so it is hidden from assistive technology and taken
 * out of the tab order.
 */

/** Not every profile has a brand mark; anything unmapped gets the globe. */
const icons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  GitLab: Github,
  Instagram: Instagram,
  Facebook: Facebook,
  X: Twitter,
  Threads: AtSign,
  Medium: BookOpen,
  'Dev Community': Rss,
  ORCID: AtSign,
  Linktree: LinkIcon,
  'about.me': AtSign,
  'Google Site': Globe,
};

export const SocialStrips = () => {
  /* Split so each belt carries a comparable run of names. */
  const half = Math.ceil(profiles.length / 2);
  const belts = [profiles.slice(0, half), profiles.slice(half)];

  return (
    <div className="marquee space-y-3">
      {belts.map((belt, i) => (
        <div key={i} className="overflow-hidden border-y border-ink bg-paper-white">
          <div className={i === 0 ? 'marquee-track' : 'marquee-track-reverse'}>
            <Belt items={belt} />
            <Belt items={belt} clone />
          </div>
        </div>
      ))}

      <p className="eyebrow pt-1 text-muted">Hover to stop · every link verified</p>
    </div>
  );
};

const Belt = ({ items, clone = false }: { items: Profile[]; clone?: boolean }) => (
  <ul
    aria-hidden={clone || undefined}
    className="flex shrink-0 list-none items-center gap-0 p-0"
  >
    {items.map((p) => {
      const Icon = icons[p.name] ?? Globe;
      return (
        <li key={p.name}>
          <a
            href={p.href}
            target="_blank"
            rel="me noopener noreferrer"
            tabIndex={clone ? -1 : undefined}
            className="group flex items-center gap-2.5 whitespace-nowrap px-5 py-3.5 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <Icon className="size-4 shrink-0 text-orange transition-colors group-hover:text-paper" aria-hidden="true" />
            <span className="eyebrow">{p.name}</span>
          </a>
        </li>
      );
    })}
  </ul>
);
