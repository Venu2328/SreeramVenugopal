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
 * The product reel — one take of the app in use.
 *
 * A YouTube Short rather than a file in /public. The master was a 173MB,
 * two-minute vertical recording; even encoded down to 5MB it was a payload the
 * page had to carry and Vercel had to bill on every view. YouTube serves it,
 * transcodes it for the viewer's connection, and costs this repo nothing.
 *
 * `id` is the part after /shorts/ in the URL. A Short embeds exactly like any
 * other video — it is simply vertical, so the frame is built around 9:16.
 */
export const reel = {
  id: '-faxcHitg-4',
  label: 'Screen recording',
  note: 'Simulations, notes and practice, as a student actually meets them.',
};

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
