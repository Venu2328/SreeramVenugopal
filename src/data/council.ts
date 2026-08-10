/**
 * Peacemakers of Puducherry Council — transcribed from the council's own site
 * (popcindia.vercel.app). Kept verbatim so the two properties never drift
 * apart: this portfolio and the council must describe the council identically.
 */
export const council = {
  name: 'Peacemakers of Puducherry Council',
  abbr: 'POPC',
  founded: '2026',
  location: 'Puducherry, India',
  href: 'https://popcindia.vercel.app',
  mission:
    'The Peacemakers of Puducherry Council develops principled student leaders through education, service, innovation, and collaboration.',
  /** Standing and backing, as stated by the council. */
  standing: 'The largest student organisation in Puducherry',
  backing:
    'Backed by government, the public and the student community under one name, and supported by partner associations across the region.',
  members: 112,
  institutions: 17,
} as const;

export type Pillar = { n: string; title: string; desc: string };

export const pillars: Pillar[] = [
  {
    n: '01',
    title: 'Leadership Development',
    desc: 'Structured mentorship, public-speaking labs, and hands-on project ownership that turn students into dependable leaders.',
  },
  {
    n: '02',
    title: 'Education',
    desc: 'Peer learning circles, skill workshops, and scholarship guidance that widen access to opportunity.',
  },
  {
    n: '03',
    title: 'Community Service',
    desc: 'Volunteer drives and neighbourhood partnerships that put civic responsibility into daily practice.',
  },
  {
    n: '04',
    title: 'Innovation',
    desc: 'Idea sprints and build weekends where students prototype solutions to real problems in their community.',
  },
  {
    n: '05',
    title: 'Collaboration',
    desc: 'A non-partisan network connecting campuses, mentors, and institutions around shared goals.',
  },
  {
    n: '06',
    title: 'Youth Empowerment',
    desc: 'Platforms, funding, and stages that give young people the confidence and tools to act.',
  },
];

export type Initiative = { title: string; desc: string; meta: string };

export const initiatives: Initiative[] = [
  {
    title: 'Leaders Lab',
    desc: "A twelve-week cohort where students take a project from proposal to public showcase under a mentor's guidance.",
    meta: 'Twelve weeks',
  },
  {
    title: 'Open Classroom',
    desc: 'Free peer-led workshops in coding, design, finance, and public speaking, hosted on partner campuses.',
    meta: 'Ongoing',
  },
  {
    title: 'Civic Corps',
    desc: 'Neighbourhood service teams tackling clean-ups, literacy drives, and support for local shelters.',
    meta: 'Ongoing',
  },
];
