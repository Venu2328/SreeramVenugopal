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
  /** Link to the paper or its DOI, once there is one. */
  href?: string;
  /** How long the original work took. */
  duration?: string;
};

export const papers: Paper[] = [
  {
    title:
      'The Role of Technology in Modern Indian Education Through Cloud-Based, Visual, Interactive Simulation and STEM',
    note: 'Virtual laboratories are widely proposed as a remedy for the shortage of physical science laboratories in Indian schools — on an untested premise: that schools lacking laboratories have the electricity, devices and connectivity to run a digital substitute. This study tests that premise against the complete 2024–25 UDISE+ census. Because a cloud-connected virtual laboratory needs all three at once while published statistics report only the three marginal distributions, sharp Fréchet–Hoeffding bounds are derived rather than independence assumed. Capacity and need are found to be inversely aligned.',
    cover: '/researchpage.png',
    status: 'In review',
    duration: '14 months',
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
 * Where the record is indexed. An entry with no `href` prints as a plain mark
 * rather than a link to nowhere.
 */
export const indexes = [
  { name: 'Peer review' },
  { name: 'Published' },
  { name: 'ORCID iD', href: 'https://orcid.org/0009-0009-2916-7633' },
  { name: 'Google Scholar' },
];

export const orcid = 'https://orcid.org/0009-0009-2916-7633';
export const github = 'https://github.com/Venu2328';
