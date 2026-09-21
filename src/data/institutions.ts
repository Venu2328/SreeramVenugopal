/**
 * The bodies that have certified, trained or recognised the work.
 *
 * These run in the strip across the top of the proof page. The strip is a list
 * of names first and logos second: a name typesets correctly whether or not an
 * image ever arrives, so a missing file costs the strip nothing — which is what
 * iRISE and the Government of India are doing until their marks turn up.
 */
export type Institution = {
  name: string;
  logo: string;
  /** Optional link to the issuing body. */
  href?: string;
};

export const institutions: Institution[] = [
  { name: 'IIT Madras', logo: '/icons-institutions/iitm2sv.png', href: 'https://www.iitm.ac.in/' },
  { name: 'Google', logo: '/icons-institutions/google2sv.webp', href: 'https://grow.google/' },
  { name: 'India STEM Foundation', logo: '/logos/Rise-india.png' },
  { name: 'Saylor Academy', logo: '/icons-institutions/sayloracademy2sv.jpeg', href: 'https://www.saylor.org/' },
  { name: 'Duke', logo: '/icons-institutions/duke2sv.jpeg', href: 'https://duke.edu/' },
  { name: 'Jimper', logo: '/icons-institutions/JIMPER2.png' },
    { name: 'Government of India', logo: '/icons-institutions/goi.svg' },
];
