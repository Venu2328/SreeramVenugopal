/**
 * Research — papers, journals and conferences.
 *
 * `cover` is a scan of the paper's own front page, in /public. A paper without
 * one still prints: the card typesets a stand-in from the same metadata rather
 * than leaving a hole where the document should be.
 *
 * Nothing speculative belongs in `papers`. `status` is what keeps the section
 * honest about where each one actually is.
 */
export type Paper = {
  title: string;
  /** What the paper argues, in the author's own words. */
  note: string;
  /** Scan of the front page, e.g. '/researchpage.png'. */
  cover?: string;
  /** Where it sits: 'In review', 'Published', and so on. */
  status: string;
  /** The journal or conference, once there is one. */
  venue?: string;
  /** The white paper. Given one, the frame opens it. */
  href?: string;
  /** The manuscript behind the brief, if it is published separately. */
  preprint?: string;
  /** How long the original work took. */
  duration?: string;
};

export const papers: Paper[] = [
  {
    title: 'Where Virtual Laboratories Cannot Reach',
    note: 'At least 537,486 Indian schools cannot run a cloud-connected virtual science laboratory — and the schools that lack physical laboratories are disproportionately among them. An analysis of UDISE+ 2024–25 covering all 1,471,473 recognised schools, deriving sharp Fréchet–Hoeffding bounds rather than assuming the three infrastructure distributions are independent.',
    cover: '/research-whitepaper-cover.png',
    status: 'Research brief',
    duration: '14 months',
    href: '/Research-Whitepaper.pdf',
    preprint: '/preprint.html',
  },
];

/** The findings the brief leads with, printed as a figure row. */
export const findings = [
  { figure: '63.5%', label: 'of schools can run a cloud-connected virtual laboratory — at most' },
  { figure: '537,486', label: 'schools cannot, under any reading of the government data' },
  { figure: '124,741', label: 'secondary schools have no functional science laboratory' },
  { figure: '59.2%', label: 'of all schools are in states short of both' },
];

/**
 * What stands behind the work. Printed as a numbered record beside the paper —
 * the claims are about method and scrutiny, which is what a reader outside the
 * field can actually judge.
 */
export const assurances = [
  'Backed by researchers',
  'Future trend analysis',
  'Personal theses & big data collection',
  'Original work took 14 months',
  'Validated by top-tier researchers, scholars & PhD professors',
  'Documented on GitHub',
];

/**
 * The paper's standing, printed as marks beside it.
 *
 * These have to agree with the manuscript itself, which is one click away and
 * stamped "PREPRINT — NOT PEER REVIEWED" with no DOI assigned. A chip reading
 * "Published" next to a document that says otherwise is not a claim a reader
 * has to take on trust — it is one they can disprove immediately.
 *
 * An entry with no `href` prints as a plain mark rather than a link to nowhere.
 */
export const indexes = [
  { name: 'Preprint' },
  { name: 'Open access · CC BY 4.0' },
  { name: 'ORCID iD', href: 'https://orcid.org/0009-0009-2916-7633' },
  { name: 'Peer review pending' },
];

export const orcid = 'https://orcid.org/0009-0009-2916-7633';
export const github = 'https://github.com/Venu2328';
