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
  /** The manuscript itself. Given one, the frame opens it. */
  href?: string;
  /** How long the original work took. */
  duration?: string;
};

export const papers: Paper[] = [
  {
    title:
      'The Substitution Paradox: Digital Capacity for Virtual Science Laboratories Is Lowest in the Indian Schools That Lack Physical Laboratories',
    note: 'Virtual laboratories are widely proposed as a remedy for the shortage of physical science laboratories in Indian schools — on an untested premise: that schools lacking laboratories have the electricity, devices and connectivity to run a digital substitute. This study tests that premise across all 1,471,473 schools in the complete 2024\u201325 UDISE+ census. Because a cloud-connected virtual laboratory needs all three at once while published statistics report only the three marginal distributions, sharp Fr\u00e9chet\u2013Hoeffding bounds are derived rather than independence assumed. Capacity and need are found to be inversely aligned.',
    cover: '/researchpage.png',
    status: 'Preprint',
    duration: '14 months',
    href: '/preprint.html',
  },
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
