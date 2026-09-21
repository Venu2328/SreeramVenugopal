import { ArrowUpRight, Github } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { github, projects, type Project } from '../data/projects';

/**
 * Projects
 *
 * Work outside the two ventures, printed as a hairline record. A row becomes a
 * link the moment its entry has an `href`; until then it prints as a plain
 * record with an honest status, because four dead ends dressed as case studies
 * are worse than four honest rows.
 *
 * The rest of the work is not restated here — the pointer at the bottom sends
 * you to the repositories themselves, which are more current than any list on
 * this page could stay.
 */
export const Projects = () => (
  <section
    id="projects"
    aria-labelledby="projects-heading"
    className="scroll-mt-20 border-b border-ink bg-paper py-16 sm:py-24"
  >
    <div className="shell">
      <SectionRule
        kicker="Selected work"
        mark="C"
        id="projects-heading"
        title={
          <>
            Also on the <Accent>bench</Accent>.
          </>
        }
        lede="Smaller projects and things still being built. Status is stated plainly rather than dressed up."
      />

      <ul className="mt-12 list-none border-t-2 border-ink p-0">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.07}>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block transition-colors hover:bg-paper-raised"
              >
                <Row p={p} i={i} />
              </a>
            ) : (
              <Row p={p} i={i} />
            )}
          </Reveal>
        ))}
      </ul>

      {/* Everything else lives in the repositories rather than in this list. */}
      <Reveal delay={0.1}>
        <a
          href={github}
          target="_blank"
          rel="me noopener noreferrer"
          className="group mt-7 inline-flex items-center gap-2.5"
        >
          <Github className="size-4 text-muted transition-colors group-hover:text-ink" aria-hidden="true" />
          <span className="link-draw eyebrow text-muted transition-colors group-hover:text-ink">
            See all 14+ projects on GitHub
          </span>
          <ArrowUpRight
            className="size-3.5 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </Reveal>
    </div>
  </section>
);

const Row = ({ p, i }: { p: Project; i: number }) => (
  <div className="grid items-baseline gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:py-8">
    <span className="eyebrow mono text-orange">{String(i + 1).padStart(2, '0')}</span>

    <div className="space-y-2.5">
      <h3 className="headline text-2xl leading-tight text-ink">{p.title}</h3>
      <p className="max-w-xl leading-relaxed text-ink-soft">{p.desc}</p>
      <ul className="flex list-none flex-wrap gap-x-4 gap-y-1 p-0 pt-1">
        {p.meta.map((m) => (
          <li key={m} className="eyebrow text-muted">
            {m}
          </li>
        ))}
      </ul>
    </div>

    <span className="eyebrow border border-rule-strong px-3 py-1.5 text-muted sm:justify-self-end">
      {p.status}
    </span>
  </div>
);
