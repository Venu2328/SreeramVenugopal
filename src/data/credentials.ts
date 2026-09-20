/**
 * Coursework completed outside school, with the body that issued it.
 *
 * `year` is optional: a credential with no confirmed date prints without one
 * rather than carrying a guessed year.
 *
 * `logo` points at a file in /public. If the file is missing the card prints a
 * typeset stand-in with the issuer's name instead of a broken image, so a lost
 * asset degrades to a blank frame rather than a torn one.
 */
export type Credential = {
  title: string;
  issuer: string;
  short: string;
  year?: string;
  logo: string;
  alt: string;
};

export const credentials: Credential[] = [
  {
    title: 'CS in Data Science & AI',
    issuer: 'IIT Madras — School Connect',
    short: 'IIT Madras',
    year: '2024',
    logo: '/iit-madras2.png',
    alt: 'Indian Institute of Technology Madras',
  },
  {
    title: 'Economic Finance & Money Matters',
    issuer: 'IIT Madras — School Connect',
    short: 'IIT Madras',
    year: '2024',
    logo: '/iit-madras2.png',
    alt: 'Indian Institute of Technology Madras',
  },
  {
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    short: 'Google',
    year: '2023',
    logo: '/logos/google.svg',
    alt: 'Google',
  },
  {
    title: 'Introduction to Robotics & STEM',
    issuer: 'iRISE',
    short: 'iRISE',
    logo: '/logos/Rise-india.png',
    alt: 'iRISE',
  },
];
