/**
 * Instagram posts, republished here and linked back to the account.
 *
 * `id` is the shortcode between /p/ and the next slash in the post URL. The
 * `?stkn=` parameter Instagram appends to a shared link is a share token tied
 * to the sender, not part of the post's address — it is dropped.
 *
 * Instagram serves an iframe embed at /p/<id>/embed, which renders without any
 * third-party script. That matters: the official `embed.js` route would mean
 * loading Instagram's JavaScript into every page, and this site's CSP allows
 * scripts from its own origin only.
 */
export type Post = {
  id: string;
  /** Who it went out as — these are co-authored with the brand account. */
  byline: string;
  /** The line the post leads with, so the page reads without loading a frame. */
  head: string;
  /** What it argues, in one line. */
  note: string;
};

export const posts: Post[] = [
  {
    id: 'DeFj3iCEy5e',
    byline: '@venuuu7_ with @sciphylabs',
    head: 'You were never bad at physics. You just never saw it move.',
    note: 'A note from the founder — on why the subject loses people before it ever gets a chance to.',
  },
  {
    id: 'DeFizMVE_-A',
    byline: '@sciphylabs with @venuuu7_',
    head: 'Myth busted: without air, everything falls at g.',
    note: 'With air, drag decides who lands first. Mass alone never did.',
  },
];

export const instagram = 'https://www.instagram.com/venuuu7_';
