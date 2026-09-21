/**
 * The certificates themselves, as scans.
 *
 * This list ships empty. The pile and the strip both print while it is empty —
 * the pile lays out blank sheets and the strip holds reserved slots — so the
 * page reads as finished-and-waiting rather than broken.
 *
 * To add one: drop the image into `public/certificates-images/` and add an
 * entry. Portrait scans suit the pile best; anything legible works in the strip.
 *
 * Only certificates that actually exist belong here. The page is called proof
 * of work, and a placeholder that looks like a credential is the opposite.
 */
export type Certificate = {
  /** What it certifies, e.g. 'CS in Data Science & AI'. */
  title: string;
  /** Who issued it. Should match a name in institutions.ts where it can. */
  issuer: string;
  /** Year awarded, if known. */
  year?: string;
  /** Path under /public, e.g. '/certificates-images/iitm-data-science.png'. */
  src: string;
};

export const certificates: Certificate[] = [
  {
    title: 'Hindi Fortnight Celebrations — First prize, elocution',
    issuer: 'Jimper',
    year: '2023',
    src: '/certificates-images/jimper-certificate.jpeg',
  },

  /*
   * Two scans are held back rather than published.
   *
   * `iitm-certificate.jpg` is made out to DHANYASHRI of Amalorpavam Lourds
   * Academy, and `google-fundamentalsofdm.jpeg` to Elizabeth Harrin. Neither is
   * Sreeram's, and this page is headed "proof of work" — publishing somebody
   * else's certificate under that heading is the one mistake it cannot afford.
   *
   * Replace the two files with the real ones and uncomment:
   *
   * {
   *   title: 'CS in Data Science & AI',
   *   issuer: 'IIT Madras',
   *   year: '2024',
   *   src: '/certificates-images/iitm-certificate.jpg',
   * },
   * {
   *   title: 'Fundamentals of Digital Marketing',
   *   issuer: 'Google Digital Garage',
   *   year: '2023',
   *   src: '/certificates-images/google-fundamentalsofdm.jpeg',
   * },
   */
];

/** How many blank sheets the pile lays out before there are real ones. */
export const PILE_PLACEHOLDERS = 7;
