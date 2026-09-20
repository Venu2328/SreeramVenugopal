import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionRule } from '../paper/SectionRule';
import { Accent } from '../Accent';
import { Reveal } from '../motion/Reveal';
import { CountUp } from '../effects/CountUp';
import { council, initiatives, pillars } from '../../data/council';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * PopcSpread
 *
 * The civic half of the ventures page: mandate, standing, and the structure
 * that turns both into something a student can actually walk into.
 *
 * Every word describing the council is transcribed from the council's own site
 * via `council.ts`, so the two properties can never contradict each other. The
 * counts are point-in-time and live in that one file for the same reason —
 * two sites quoting different totals is worse than neither quoting any.
 */
export const PopcSpread = () => (
  <section
    id="popc"
    aria-labelledby="popc-heading"
    className="scroll-mt-20 border-b border-ink bg-paper-raised py-16 sm:py-24"
  >
    <div className="shell">
      <SectionRule
        kicker="The council"
        mark="B"
        id="popc-heading"
        title={
          <>
            Turning students into <Accent>leaders</Accent>.
          </>
        }
        action={
          <a
            href={council.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid group"
          >
            Visit the council
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        }
        lede="The Peacemakers of Puducherry Council — founded 2026, non-partisan, and now the largest student organisation in Puducherry."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal>
          <blockquote className="border-l-2 border-orange pl-6">
            <p className="deck text-xl leading-snug text-ink sm:text-2xl">
              {council.mission}
            </p>
          </blockquote>

          <div className="column-copy mt-8 space-y-5 leading-relaxed text-ink-soft">
            <p>
              <span className="text-ink">{council.standing}</span>, spanning{' '}
              {council.institutions} institutions with {council.members} registered
              members. {council.backing}
            </p>
            <p>
              It exists because ability and ambition were never the bottleneck. Structure
              was. The council hands a student a project, a mentor and a stage, and then
              expects something of them — and the measure of whether it works is simply
              whether someone who walks in with an idea walks out having done it, in front
              of people.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t-2 border-ink pt-7">
            <div>
              <dd className="headline text-4xl leading-none text-orange">
                <CountUp target={council.members} />
              </dd>
              <dt className="mt-2.5 text-xs leading-tight text-muted">
                Students registered
              </dt>
            </div>
            <div>
              <dd className="headline text-4xl leading-none text-orange">
                <CountUp target={council.institutions} />
              </dd>
              <dt className="mt-2.5 text-xs leading-tight text-muted">
                Institutions reached
              </dt>
            </div>
            <div>
              <dd className="headline text-4xl leading-none text-ink">
                {council.founded}
              </dd>
              <dt className="mt-2.5 text-xs leading-tight text-muted">Founded</dt>
            </div>
            <div>
              <dd className="headline text-4xl leading-none text-ink">6</dd>
              <dt className="mt-2.5 text-xs leading-tight text-muted">Pillars</dt>
            </div>
          </dl>

          <ul className="mt-9 flex list-none flex-wrap gap-1.5 p-0">
            {['Non-partisan', 'Government backed', 'Student led', council.location].map(
              (t) => (
                <li key={t}>
                  <span className="chip">{t}</span>
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </div>

      {/* ── The six pillars, assembled cell by cell ─────────────────── */}
      <div className="mt-16">
        <Reveal>
          <p className="eyebrow text-muted">The six pillars</p>
          <div className="rule-hair mt-3" />
        </Reveal>

        <ul className="mt-7 grid list-none gap-px border border-rule bg-rule p-0 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-paper-white"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="eyebrow mono text-orange">{p.n}</span>
              <h3 className="headline mt-4 text-xl leading-tight text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ── Active initiatives ─────────────────────────────────────── */}
      <div className="mt-16">
        <Reveal>
          <p className="eyebrow text-muted">Active initiatives</p>
          <div className="rule-hair mt-3" />
        </Reveal>

        <ul className="mt-7 list-none border-t-2 border-ink p-0">
          {initiatives.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.07}>
              <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]">
                <h3 className="headline text-xl text-ink">{it.title}</h3>
                <p className="leading-relaxed text-ink-soft">{it.desc}</p>
                <span className="eyebrow text-muted sm:text-right">{it.meta}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
