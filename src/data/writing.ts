/**
 * Published writing — real articles only.
 *
 * Sourced from the Medium feed (medium.com/feed/@sreeram23db). Titles, dates,
 * tags and read times are exactly as published; nothing speculative or
 * forthcoming goes in this list.
 *
 * `cover` is a screenshot of the article's opening page, in
 * `public/writings-thumbnails/`. An entry without one still renders — the card
 * typesets a stand-in from the title and publication instead.
 */
export type Article = {
  title: string;
  href: string;
  date: string;
  display: string;
  tags: string[];
  note: string;
  cover?: string;
  /** As Medium reports it, e.g. '2 min read'. */
  readTime?: string;
};

export const articles: Article[] = [
  {
    title: "The Future of JEE Preparation Isn't More PDFs",
    href: 'https://medium.com/@sreeram23db/the-future-of-jee-preparation-isnt-more-pdfs-9d9ebb755315',
    date: '2026-05-19',
    display: '19 May 2026',
    tags: ['Science', 'Education', 'Deep Learning', 'Artificial Intelligence', 'Writing'],
    note: 'Students are not disconnected from physics — they are disconnected from the way it is presented to them. On why more material is not the answer, and what actually moves a student forward.',
    cover: '/writings-thumbnails/Medium-Article1.png',
    readTime: '2 min read',
  },
  {
    title: 'SciPhyLabs — The revolution of the Decade.',
    href: 'https://medium.com/@sreeram23db/sciphylabs-the-revolution-of-the-decade-072293126ec7',
    date: '2026-05-06',
    display: '6 May 2026',
    tags: ['Education', 'News', 'AI'],
    note: 'Somewhere along the way physics stopped being observed and started being memorised. The case for interactive-first learning, and the platform I built to argue it.',
    cover: '/writings-thumbnails/Medium-Article2.png',
    readTime: '2 min read',
  },
];

export const writingHome = 'https://medium.com/@sreeram23db';
