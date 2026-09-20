import { ArrowUpRight } from 'lucide-react';
import { SectionRule } from '../paper/SectionRule';
import { Accent } from '../Accent';
import { Reveal } from '../motion/Reveal';

/**
 * SciPhyLabsSpread
 *
 * The entrepreneurial half of the ventures page: what was built, why it was
 * built, who it serves and where it stands.
 *
 * Deliberately free of counts. The simulation library changes, and a number
 * nobody can check is worth less than a description anybody can verify by
 * opening the site — so the spec sheet states kind, subject, scope and status,
 * and stops there.
 */
const capabilities = [
  'Simulations you manipulate in real time, built for understanding rather than recall',
  'Coverage aligned to JEE, NEET, AP, SAT and CUET syllabi',
  'Formulas, derivations and notes tied to the system they describe',
  'Progress tracking that rewards consistent, self-directed practice',
];

const spec = [
  ['Type', 'Interactive learning platform'],
  ['Subject', 'Physics'],
  ['Exams', 'JEE · NEET · AP · SAT · CUET'],
  ['Founded', '2023'],
  ['Role', 'Founder'],
  ['Status', 'Live'],
];

export const SciPhyLabsSpread = () => (
  <section
    id="sciphylabs"
    aria-labelledby="sciphylabs-heading"
    className="scroll-mt-20 border-b border-ink bg-paper py-16 sm:py-24"
  >
    <div className="shell">
      {/*
        The device, printed in ink. The source file is a white mark on
        transparency — legible on a dark ground, invisible on cream — so
        `brightness(0)` drives it to a solid black silhouette, which is what a
        logo becomes when it goes through a press.
      */}
      <Reveal>
        <img
          src="/sciphylabs-logo2-sv.png"
          alt="SciPhyLabs"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
          className="mb-7 size-20 scale-[1.45] object-contain"
          style={{ filter: 'brightness(0)' }}
        />
      </Reveal>

      <SectionRule
        kicker="The startup"
        mark="A"
        id="sciphylabs-heading"
        title={
          <>
            Physics you can actually <Accent>handle</Accent>.
          </>
        }
        action={
          <a
            href="https://sciphylabs.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid group"
          >
            Visit SciPhyLabs
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        }
        lede="An interactive physics platform I founded in 2023, built for students preparing for the exams that decide where they go next."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <dl className="list-none border-t-2 border-ink">
            {spec.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
              >
                <dt className="eyebrow shrink-0 text-muted">{k}</dt>
                <dd className="text-right text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 border-l-2 border-orange pl-6">
            <p className="deck text-xl leading-snug text-ink">
              “Change a value, watch it respond, and the formula becomes obvious
              afterwards.”
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          <div className="column-copy space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Most physics teaching hands you a diagram and a formula and asks you to trust
              both. SciPhyLabs hands you the system itself — change a value, watch it
              respond, and build the intuition that makes the formula obvious afterwards.
            </p>
            <p>
              I started it at fifteen because the tool I wanted did not exist. Building it
              meant learning the product side as much as the physics: what a student will
              actually open on a Tuesday night, what they abandon, and how much scaffolding
              a concept needs before it stops being intimidating.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4 text-muted">What it does</p>
            <ul className="list-none border-t border-rule p-0">
              {capabilities.map((c, i) => (
                <Reveal as="li" key={c} delay={0.05 * i}>
                  <div className="flex items-start gap-5 border-b border-rule py-4">
                    <span className="eyebrow mono shrink-0 pt-1 text-orange">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-ink-soft">{c}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
