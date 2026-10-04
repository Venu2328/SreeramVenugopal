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
 * The product reels — the app in use, from the SciPhyLabs channel.
 *
 * YouTube Shorts rather than files in /public. The first arrived as a 173MB,
 * two-minute master; GitHub refuses anything over 100MB and everything under
 * public/ is copied into the build, so self-hosting was never going to work.
 * YouTube serves them, transcodes per connection, and costs this repo nothing.
 *
 * `id` is the part after /shorts/ in the URL. A Short embeds exactly like any
 * other video — it is simply vertical, so the frame is built around 9:16.
 *
 * They share one frame rather than stacking. Two phone-shaped players down a
 * column would double the height of a section that is meant to be read in a
 * single screen; one frame with a switch costs nothing and carries both.
 */
export type Reel = {
  id: string;
  /** The title as published, so the page and the channel never disagree. */
  title: string;
  /** One line on what the clip shows. */
  note: string;
};

export const reels: Reel[] = [
  {
    id: '-faxcHitg-4',
    title: 'SciPhyLabs for students',
    note: 'Simulations, notes and practice, as a student actually meets them.',
  },
  {
    id: 'oSQPEV-XNmM',
    title: 'Is physics back to life again?',
    note: 'The pitch, in ninety seconds — what the platform is actually for.',
  },
];

/** The channel both reels come from. */
export const channel = 'https://www.youtube.com/@sciphylabs';

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
