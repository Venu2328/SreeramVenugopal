/**
 * Published writing — real articles only.
 *
 * Sourced from the Medium feed (medium.com/feed/@sreeram23db). Titles, dates
 * and URLs are exactly as published; tags come from the posts themselves.
 * Nothing speculative or forthcoming goes in this list.
 */
export type Article = {
  title: string;
  href: string;
  date: string;
  display: string;
  tags: string[];
  note: string;
};

export const articles: Article[] = [
  {
    title: "The Future of JEE Preparation Isn't More PDFs",
    href: 'https://medium.com/@sreeram23db/the-future-of-jee-preparation-isnt-more-pdfs-9d9ebb755315',
    date: '2026-05-19',
    display: '19 May 2026',
    tags: ['Education', 'AI'],
    note: 'On why more material is not the answer, and what actually moves a student forward.',
  },
  {
    title: 'SciPhyLabs — The revolution of the Decade.',
    href: 'https://medium.com/@sreeram23db/sciphylabs-the-revolution-of-the-decade-072293126ec7',
    date: '2026-05-06',
    display: '6 May 2026',
    tags: ['Education', 'AI'],
    note: 'The case for interactive-first learning, and the platform I built to argue it.',
  },
];

export const writingHome = 'https://medium.com/@sreeram23db';
