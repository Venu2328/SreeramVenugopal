/**
 * The Advanced EdTech page — SciPhyLabs told as a founder's front page.
 *
 * Everything the page prints comes from here, so adding a clip or switching on
 * the store links is a data edit rather than a component edit.
 */

/** The words that run across the strip at the top, on a loop. */
export const ticker = [
  '1000+ downloads',
  'Active learning',
  'School & college outreach',
  'Scientific technology',
];

/**
 * The three lines down the left. Written as a phrase plus the word it lands on,
 * so the landing word can be set apart without parsing the string at render.
 */
export const creed = [
  { lead: 'Interactive physics was the', land: 'DREAM' },
  { lead: '400+ Simulations is the', land: 'SLEEP' },
  { lead: 'Exams & Scores are the', land: 'ALARM' },
];

/**
 * Simulation clips, shown in the reel on the right.
 *
 * Ships empty: the reel prints reserved slots until there are files. Drop MP4s
 * into `public/portfoliopage-2/` and add an entry each. A `poster` is optional
 * but worth having — without one the slot is blank until the video decodes its
 * first frame.
 *
 * Keep them short and silent. They play muted and on a loop, which is the only
 * kind of video a browser will start on its own.
 */
export type Clip = {
  /** What the simulation shows, e.g. 'Projectile motion'. */
  title: string;
  /** Path under /public, e.g. '/portfoliopage-2/projectile.mp4'. */
  src: string;
  /** Optional still, e.g. '/portfoliopage-2/projectile.jpg'. */
  poster?: string;
};

export const clips: Clip[] = [];

/**
 * The app, and where to get it.
 *
 * `url` is deliberately empty until the real listing is known. An empty url
 * prints the badge as a plain mark reading "Coming soon" rather than as a link
 * to nowhere — a dead store button is worse than an honest one.
 */
export type Store = {
  name: string;
  /** The badge artwork in /public. */
  logo: string;
  /** How tall to set the mark, so two different artworks sit level. */
  markClass: string;
  url: string;
};

export const stores: Store[] = [
  {
    name: 'Google Play',
    logo: '/playstore.png',
    markClass: 'h-7 w-7',
    url: '',
  },
  {
    name: 'App Store',
    logo: '/applestore.png',
    markClass: 'h-6 w-auto',
    url: '',
  },
];

/** The device printed beside the call to action. */
export const appLogo = '/sciphylabs-logo-sv.png';

export const sciphylabs = 'https://sciphylabs.vercel.app';
