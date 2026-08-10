import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';

/**
 * The platform. Deliberately free of counts — the simulation library changes,
 * and a number nobody can check is worth less than a description anybody can
 * verify by opening the site. The spec panel replaces the old browser mock:
 * a drawn screenshot of a product is a picture of a claim, not evidence of one.
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
  ['Status', 'Live'],
];

export const SciPhyLabs = () => {
  return (
    <section
      id="sciphylabs"
      aria-labelledby="sciphylabs-heading"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="The platform"
          title={
            <span id="sciphylabs-heading">
              Physics you can actually <Accent>handle</Accent>.
            </span>
          }
          className="max-w-3xl"
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            {/* Spec sheet — the technical register, stated as plainly as possible */}
            <dl className="list-none border-t border-line-strong">
              {spec.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                >
                  <dt className="eyebrow text-muted">{k}</dt>
                  <dd className="text-right text-sm text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <a
              href="https://sciphylabs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid group mt-10"
            >
              Visit SciPhyLabs
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>

          <Reveal delay={0.12} className="space-y-8">
            <p className="text-lg leading-relaxed text-ink-soft">
              Most physics teaching hands you a diagram and a formula and asks you to trust
              both. SciPhyLabs hands you the system itself — change a value, watch it respond,
              and build the intuition that makes the formula obvious afterwards.
            </p>

            <ul className="list-none space-y-0 border-t border-line p-0">
              {capabilities.map((c, i) => (
                <Reveal as="li" key={c} delay={0.06 * i}>
                  <div className="flex items-start gap-5 border-b border-line py-5">
                    <span className="eyebrow mono shrink-0 pt-1 text-red">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-ink-soft">{c}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
