/**
 * Offices held — the spine of the site.
 *
 * Every entry here must be a named role at a named organisation with a real
 * start date, and must be checkable by a stranger. `verify` is the public URL
 * that corroborates the claim; if a position has no verification link, it does
 * not belong in this file.
 */
export type Position = {
  office: string;
  organisation: string;
  abbr?: string;
  since: string;
  location: string;
  mandate: string;
  verify?: { label: string; href: string };
};

export const positions: Position[] = [
  {
    office: 'Founder & Committee Leader',
    organisation: 'Peacemakers of Puducherry Council',
    abbr: 'POPC',
    since: '2026',
    location: 'Puducherry, India',
    mandate:
      'A non-partisan council that develops principled student leaders through education, service, innovation and collaboration.',
    verify: { label: 'popcindia.vercel.app', href: 'https://popcindia.vercel.app' },
  },
  {
    office: 'Founder',
    organisation: 'SciPhyLabs',
    since: '2023',
    location: 'Puducherry, India',
    mandate:
      'An interactive physics platform built for students preparing for JEE, NEET, AP, SAT and CUET.',
    verify: { label: 'sciphylabs.vercel.app', href: 'https://sciphylabs.vercel.app' },
  },
];
