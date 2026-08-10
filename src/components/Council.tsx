import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { council, initiatives, pillars } from '../data/council';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The council section. Its six pillars assemble cell by cell as the grid comes
 * into view — the one place on the page where structure is built in front of
 * you, which suits a section about building an institution.
 *
 * Every word here is transcribed from the council's own site so the two
 * properties can never contradict each other.
 */
export const Council = () => {
  return (
    <section
      id="council"
      aria-labelledby="council-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-surface py-24 sm:py-32"
    >
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

      <div className="shell relative">
        <SectionHeading
          index="03"
          kicker="The Council"
          title={
            <span id="council-heading">
              Peacemakers of Puducherry <Accent>Council</Accent>.
            </span>
          }
        />

        <Reveal delay={0.1} className="mt-10 max-w-3xl">
          <blockquote className="border-l-2 border-red pl-6">
            <p className="text-xl leading-relaxed text-ink sm:text-2xl">{council.mission}</p>
          </blockquote>
          <p className="mt-7 text-lg leading-relaxed text-ink-soft">
            <span className="text-ink">{council.standing}</span>, spanning{' '}
            {council.institutions} institutions with {council.members} registered members.{' '}
            {council.backing}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="eyebrow text-muted">Founded {council.founded}</span>
            <span className="eyebrow text-muted">{council.location}</span>
            <span className="eyebrow text-muted">Non-partisan</span>
            <span className="eyebrow text-muted">{council.institutions} institutions</span>
            <span className="eyebrow text-muted">{council.members} members</span>
          </div>
        </Reveal>

        {/* Six pillars — assembled cell by cell */}
        <div className="mt-20">
          <Reveal>
            <h3 className="eyebrow eyebrow-dash text-muted">The six pillars</h3>
          </Reveal>

          <ul className="mt-8 grid list-none gap-px border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.09, ease }}
                className="group relative bg-bg p-7 transition-colors duration-500 hover:bg-card sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="eyebrow mono text-red">{p.n}</span>
                <h4 className="display mt-4 text-xl leading-tight text-ink">{p.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Active initiatives */}
        <div className="mt-20">
          <Reveal>
            <h3 className="eyebrow eyebrow-dash text-muted">Active initiatives</h3>
          </Reveal>

          <ul className="mt-8 list-none border-t border-line p-0">
            {initiatives.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.07}>
                <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]">
                  <h4 className="display text-xl text-ink">{it.title}</h4>
                  <p className="text-base leading-relaxed text-ink-soft">{it.desc}</p>
                  <span className="eyebrow text-muted sm:text-right">{it.meta}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.05} className="mt-12">
          <a
            href={council.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn group"
          >
            Visit the council
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
