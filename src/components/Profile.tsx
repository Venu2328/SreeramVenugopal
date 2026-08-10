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

/**
 * Council traction, stated exactly rather than rounded. A precise figure implies
 * someone is counting; a rounded one implies someone is estimating.
 *
 * These are point-in-time counts, so they need an owner — update them when the
 * real numbers move, and keep them identical to whatever popcindia.vercel.app
 * publishes. Two sites quoting different totals is worse than neither quoting any.
 */
const counts = [
  { node: <CountUp target={112} />, label: 'Students registered' },
  { node: <CountUp target={17} />, label: 'Institutions reached' },
  { node: <>2026</>, label: 'Council founded' },
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
              First a platform, then a <Accent>council</Accent>.
            </span>
          }
          className="max-w-3xl"
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
          <Reveal className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p>
              I built SciPhyLabs in 2023. Physics is taught as a wall of formulas to be
              memorised, which is exactly backwards — you understand a system by changing it
              and watching what happens. So I built somewhere you can do that, aimed at the
              students sitting JEE, NEET, AP, SAT and CUET.
            </p>
            <p>
              Working on it taught me something the platform couldn't fix on its own. The
              students I met weren't short of ability, and they weren't short of ambition.
              They were short of structure — someone to hand them a project, a mentor, and a
              stage, and then expect something of them.
            </p>
            <p>
              So in 2026 I founded the Peacemakers of Puducherry Council. It is deliberately
              non-partisan, works through six pillars, and runs three programmes. Its measure
              is simple: can a student who walks in with an idea walk out having actually done
              it, in front of people.
            </p>
            <p className="text-ink">
              The council is new, and I would rather it be judged on what it ships than on how
              it describes itself.
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
