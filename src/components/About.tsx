import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';

/**
 * About
 *
 * The full story, set as newspaper body columns — the piece the lead story's
 * "read the full story" pointer resolves to. Civic work is told second because
 * that is the order it happened in: the platform came first and produced the
 * observation that led to the council.
 */
const facts = [
  ['Based in', 'Puducherry, India'],
  ['Focus', 'Civic leadership, education'],
  ['Languages', 'English, Tamil'],
  ['Founded', 'SciPhyLabs (2023), POPC (2026)'],
];

export const About = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="scroll-mt-20 border-b border-ink bg-paper py-16 sm:py-24"
  >
    <div className="shell">
      <SectionRule
        kicker="The full story"
        mark="B"
        id="about-heading"
        title={
          <>
            First a platform, then a <Accent>council</Accent>.
          </>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal>
          {/* Two true columns at desktop width — the one place on the page that
              sets body copy the way a broadsheet actually does. */}
          <div className="column-copy space-y-5 leading-relaxed text-ink-soft md:columns-2 md:gap-10 md:space-y-0 md:[&>p]:mb-5">
            <p>
              I built SciPhyLabs in 2023. Physics is taught as a wall of formulas to be
              memorised, which is exactly backwards — you understand a system by changing
              it and watching what happens. So I built somewhere you can do that, aimed at
              the students sitting JEE, NEET, AP, SAT and CUET.
            </p>
            <p>
              Working on it taught me something the platform couldn&apos;t fix on its own.
              The students I met weren&apos;t short of ability, and they weren&apos;t short
              of ambition. They were short of structure — someone to hand them a project, a
              mentor, and a stage, and then expect something of them.
            </p>
            <p>
              So in 2026 I founded the Peacemakers of Puducherry Council. It is
              deliberately non-partisan, works through six pillars, and runs three
              programmes. Its measure is simple: can a student who walks in with an idea
              walk out having actually done it, in front of people.
            </p>
            <p className="text-ink">
              The council is new, and I would rather it be judged on what it ships than on
              how it describes itself.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="list-none border-t-2 border-ink">
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
              >
                <dt className="eyebrow shrink-0 text-muted">{k}</dt>
                <dd className="text-right text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  </section>
);
