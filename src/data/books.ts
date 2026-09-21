/**
 * The G.O.A.T. series — academic physics books being written under SciPhyLabs.
 *
 * `cover` is the front and `back` the reverse, both in `public/books/`. A title
 * with no front cover still prints: the shelf typesets a stand-in from the same
 * metadata rather than leaving a gap where a book should be.
 *
 * Only books that are actually being written belong here. The page says
 * "authoring", present tense, and `status` is what keeps that honest.
 */
export type Book = {
  title: string;
  subtitle?: string;
  /** Who it is for, e.g. 'Grade 11 & 12'. */
  audience?: string;
  /** Where it is up to. Stated plainly rather than dressed up. */
  status: string;
  cover?: string;
  back?: string;
  blurb: string;
  /** What the book carries, printed as small caps under the blurb. */
  features?: string[];
};

export const series = {
  name: 'The G.O.A.T. Series',
  expansion: 'Guide Of All Time',
};

export const books: Book[] = [
  {
    title: 'Physics Masterbook',
    subtitle: 'Unveil the magic',
    audience: 'Grade 11 & 12',
    status: 'In progress',
    cover: '/books/PHYSICS (1) sv.png',
    back: '/books/PHYSICS (2) sv.png',
    blurb:
      'Is physics really that hard? The masterbook is the answer written out in full — built for students sitting national and international competitive exams, and tied to the simulations that show what the equations describe.',
    features: ['PYQ vault', 'G.O.A.T. series', 'Simulations & app'],
  },
];

/** Where the rest of the series will live. */
export const bookstore = 'https://sciphylabs.vercel.app';
