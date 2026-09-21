import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';

/**
 * About
 *
 * The full story, set as newspaper body columns — the piece the lead story's
 * "read the full story" pointer resolves to. The platform comes first because
 * that is the order it happened in: building it is what produced everything
 * that followed, including the reason to stand up and talk about it.
 */
const facts = [
  ['Based in', 'Puducherry, India'],
  ['Focus', 'Physics education, research, speaking'],
  ['Languages', 'English, Tamil'],
  ['Founded', 'SciPhyLabs (2023)'],
  ['Speaks on', 'Learning, technology, civic life'],
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
            First a platform, then a <Accent>podium</Accent>.
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
              What started as a handful of simulations is now more than four hundred, with
              an app past a thousand downloads. It reached students through schools and
              colleges rather than through advertising, which meant standing in front of
              halls of them and explaining why any of it was worth their evening.
            </p>
            <p>
              That turned out to be the other half of the work. Speaking is not a sideline
              to building — it is how a thing built in private survives contact with people
              who did not ask for it. I speak, I debate, and I argue positions in front of
              rooms that may disagree, because an argument you will not defend in public is
              not really a position.
            </p>
            <p className="text-ink">
              I would rather be judged on what I ship and what I say than on how either is
              described.
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
