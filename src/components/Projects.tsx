import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';

/**
 * Other work. These rows used to be links pointing at the contact anchor,
 * which made four dead ends look like four case studies. Until a project has
 * somewhere real to send you it is presented as a plain record with an honest
 * status — add an `href` here and the row becomes a link automatically.
 */
type Project = {
  title: string;
  desc: string;
  meta: string[];
  status: string;
  href?: string;
};

const projects: Project[] = [
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
  {
    title: 'Venice',
    desc: 'A small studio delivering branding, web and digital work for businesses that need a clearer presence.',
    meta: ['Studio', 'Client work'],
    status: 'Active',
  },
  {
    title: 'Swaminathan Enterprises',
    desc: 'Digital partner through Venice — operations, modernisation and growth strategy for an established business.',
    meta: ['Consulting', 'Operations'],
    status: 'Engagement',
  },
];

const Row = ({ p, i }: { p: Project; i: number }) => (
  <div className="grid items-baseline gap-x-8 gap-y-3 border-b border-line py-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:py-9">
    <span className="eyebrow mono text-red">{String(i + 1).padStart(2, '0')}</span>

    <div className="space-y-2.5">
      <h3 className="display text-2xl leading-tight text-ink sm:text-[1.75rem]">{p.title}</h3>
      <p className="max-w-xl leading-relaxed text-ink-soft">{p.desc}</p>
      <ul className="flex list-none flex-wrap gap-x-4 gap-y-1 p-0 pt-1">
        {p.meta.map((m) => (
          <li key={m} className="eyebrow text-muted">
            {m}
          </li>
        ))}
      </ul>
    </div>

    <span className="eyebrow rounded-full border border-line-strong px-3.5 py-1.5 text-muted sm:justify-self-end">
      {p.status}
    </span>
  </div>
);

export const Projects = () => {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="05"
          kicker="Selected work"
          title={
            <span id="work-heading">
              Beyond the <Accent>council</Accent>.
            </span>
          }
          lede="Smaller projects, studio work and things still being built. Status is stated plainly rather than dressed up."
          className="max-w-3xl"
        />

        <ul className="mt-16 list-none border-t border-line p-0">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.06}>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-colors hover:bg-card"
                >
                  <Row p={p} i={i} />
                </a>
              ) : (
                <Row p={p} i={i} />
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
