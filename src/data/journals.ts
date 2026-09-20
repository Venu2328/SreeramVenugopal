/**
 * Published journals and papers.
 *
 * This list ships empty on purpose. The Research & Publications section still
 * prints while it is empty — it renders reserved slots rather than hiding
 * itself, because the section is a standing part of the paper.
 *
 * To add a publication:
 *   1. Drop the PDF into `public/journals/` (e.g. public/journals/my-paper.pdf)
 *   2. Optionally drop a cover image — a screenshot of the paper's first page,
 *      which is what makes the card read as a clipping — into the same folder
 *   3. Add an entry below. `cover` and `doi` are both optional; a card with no
 *      cover prints a typeset stand-in built from the title and journal name.
 *
 * Nothing speculative or "forthcoming" belongs in this list — only work that
 * has actually been published, with a PDF a stranger can open.
 */
export type Journal = {
  /** Full title of the paper, exactly as published. */
  title: string;
  /** The journal that published it. */
  journal: string;
  /** Year of publication. */
  year: string;
  /** A few sentences on what the paper argues and what it found. */
  abstract: string;
  /** Path to the PDF in /public, e.g. '/journals/my-paper.pdf'. */
  pdf: string;
  /** Optional cover image — a screenshot of page one. */
  cover?: string;
  /** Optional DOI or publisher URL. */
  doi?: string;
  /** Short subject tags, uppercased on render. */
  tags: string[];
};

export const journals: Journal[] = [];

/** Where the full list of publications lives, if it ever outgrows this page. */
export const orcid = 'https://orcid.org/0009-0009-2916-7633';
