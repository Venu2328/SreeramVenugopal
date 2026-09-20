/**
 * Work outside the two ventures.
 *
 * A row becomes a link the moment it has an `href`; until a project has
 * somewhere real to send you it prints as a plain record with an honest
 * status, because four dead links look worse than four honest rows.
 */
export type Project = {
  title: string;
  desc: string;
  meta: string[];
  status: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: 'SciPhyLabs — Master Physics',
    desc: 'A companion text pairing written explanation with the simulations it describes.',
    meta: ['Education', 'Writing'],
    status: 'In progress',
  },
  {
    title: 'Sutra AI',
    desc: 'An experimental study assistant for school physics, built around conceptual reasoning rather than answer lookup.',
    meta: ['AI', 'Research'],
    status: 'Prototype',
  },
];

/** Everything else lives on GitHub rather than being restated here. */
export const github = 'https://github.com/Venu2328';
