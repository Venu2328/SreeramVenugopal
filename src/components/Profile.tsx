import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { CountUp } from './effects/CountUp';

/**
 * Biography, civic work first. The council predates the platform by two years,
 * and telling it in that order is both accurate and the stronger story.
 *
 * The figures below are deliberately small and checkable — six pillars, three
 * initiatives, one founding year. Nothing here is rounded or estimated.
 */
const facts = [
  ['Based in', 'Puducherry, India'],
  ['Focus', 'Civic leadership, education'],
  ['Languages', 'English, Tamil'],
];

const counts = [
  { node: <CountUp target={6} />, label: 'Pillars in the council framework' },
  { node: <CountUp target={3} />, label: 'Initiatives currently running' },
  { node: <>2021</>, label: 'Council founded' },
];

export const Profile = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          kicker="About"
          title={
            <span id="about-heading">
              I started with people, not <Accent>products</Accent>.
            </span>
          }
          className="max-w-3xl"
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
          <Reveal className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p>
              I founded the Peacemakers of Puducherry Council in 2021, while still at school,
              because I kept meeting students with real ambition and nowhere to put it. There
              was no shortage of talent in Puducherry. There was a shortage of structure —
              someone to hand you a project, a mentor, and a stage, and then expect something
              of you.
            </p>
            <p>
              The council is deliberately non-partisan. It works through six pillars and three
              running programmes, and its measure is simple: can a student who walks in with an
              idea walk out having actually done it, in front of people.
            </p>
            <p>
              SciPhyLabs came out of the same instinct two years later. Physics is taught as a
              wall of formulas to be memorised, which is exactly backwards — you understand a
              system by changing it and watching what happens. So I built somewhere you can do
              that.
            </p>
            <p className="text-ink">
              Both are the same job in different clothes: give people the tools and the room,
              then get out of the way.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:pt-2">
            <dl className="list-none border-t border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="eyebrow text-muted">{k}</dt>
                  <dd className="text-right text-sm text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-line pt-7">
              {counts.map((c) => (
                <div key={c.label}>
                  <dd className="display text-3xl leading-none text-red sm:text-4xl">{c.node}</dd>
                  <dt className="mt-2.5 text-xs leading-tight text-muted">{c.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
