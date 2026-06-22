/**
 * Canonical list of Sreeram Venugopal's verified profiles across the web.
 *
 * These power both the visible, crawlable "Find me online" links and the
 * Person `sameAs` graph in index.html. Rendered with rel="me" so search
 * engines and identity services can tie every profile back to this site as
 * the authoritative hub. Keep this list and the JSON-LD `sameAs` in sync.
 */
export type Profile = { name: string; href: string; group: 'Professional' | 'Writing' | 'Social' };

export const profiles: Profile[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376', group: 'Professional' },
  { name: 'ORCID', href: 'https://orcid.org/0009-0009-2916-7633', group: 'Professional' },
  { name: 'GitHub', href: 'https://github.com/Venu2328', group: 'Professional' },
  { name: 'GitLab', href: 'https://gitlab.com/Venu2328', group: 'Professional' },
  { name: 'Dev Community', href: 'https://dev.to/sreeram23_', group: 'Professional' },
  { name: 'Medium', href: 'https://medium.com/@sreeram23db', group: 'Writing' },
  { name: 'about.me', href: 'https://about.me/sreeramvenugopal', group: 'Writing' },
  { name: 'Linktree', href: 'https://linktr.ee/sreeramvenugopal', group: 'Writing' },
  { name: 'Google Site', href: 'https://sites.google.com/view/sreeramvenugopal', group: 'Writing' },
  { name: 'X', href: 'https://x.com/sreeram23_', group: 'Social' },
  { name: 'Threads', href: 'https://www.threads.com/@venuuu7_', group: 'Social' },
  { name: 'Instagram', href: 'https://www.instagram.com/venuuu7_', group: 'Social' },
  { name: 'Facebook', href: 'https://www.facebook.com/venuuu7', group: 'Social' },
];

/** The same URLs as a flat array, for any place that just needs the hrefs. */
export const profileUrls = profiles.map((p) => p.href);
