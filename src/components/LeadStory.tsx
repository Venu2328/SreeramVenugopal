import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { NewsPhoto } from './paper/NewsPhoto';
import { Accent } from './Accent';
import { CountUp } from './effects/CountUp';
import { council } from '../data/council';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * LeadStory
 *
 * The front page's three-column spread, set the way a broadsheet sets one: the
 * standing identity and the numbers down the left, the photograph in the
 * middle, and the article itself down the right, opening on a drop cap.
 *
 * The columns are separated by hairlines rather than gaps, and they collapse to
 * a single stack below the large breakpoint — the vertical rules go with them,
 * because a rule between stacked blocks means nothing.
 *
 * The figures here are deliberately small and checkable. They are point-in-time
 * counts that come from `council.ts` rather than being typed twice, so they can
 * never drift away from what the council's own site publishes.
 */
/* Mirrors the title tag. On-page text that corroborates the <title> is a
   stronger signal than a title claiming something the page never says. */
const identity = ['Founder.', 'Author.', 'Researcher.', 'Physics Educator.'];

const interests = [
  'Physics',
  'Civic Leadership',
  'Constitutional Law',
  'Civil Liberties',
  'Debate',
  'Education',
  'Research',
  'AI',
  'Building',
];

export const LeadStory = () => (
  <section
    id="top"
    aria-labelledby="lead-heading"
    className="border-b border-ink bg-paper py-10 sm:py-14"
  >
    <div className="shell">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="eyebrow text-orange"
      >
        Lead story
      </motion.p>

      <motion.h2
        id="lead-heading"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.08, ease }}
        className="headline headline-tight mt-4 text-[clamp(2.1rem,6.6vw,5rem)] text-ink"
      >
        Building at the intersection of <Accent>physics</Accent>, education &amp;
        civic leadership.
      </motion.h2>

      <div className="rule-heavy mt-7" />

      {/* Three columns, hairline-separated, stacking below lg */}
      <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-0">
        {/* ── Column one: the standing identity ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="lg:pr-10"
        >
          <p className="eyebrow text-muted">Puducherry, India</p>

          <h3 className="headline mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)] text-ink">
            {identity.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          <div className="mt-8 border-t border-rule pt-5">
            <p className="eyebrow mb-4 text-muted">In numbers</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <dd className="headline text-3xl leading-none text-orange">
                  <CountUp target={council.members} />
                </dd>
                <dt className="mt-2 text-xs leading-tight text-muted">
                  Students registered
                </dt>
              </div>
              <div>
                <dd className="headline text-3xl leading-none text-orange">
                  <CountUp target={council.institutions} />
                </dd>
                <dt className="mt-2 text-xs leading-tight text-muted">
                  Institutions reached
                </dt>
              </div>
              <div>
                <dd className="headline text-3xl leading-none text-ink">2</dd>
                <dt className="mt-2 text-xs leading-tight text-muted">Ventures founded</dt>
              </div>
              <div>
                <dd className="headline text-3xl leading-none text-ink">2023</dd>
                <dt className="mt-2 text-xs leading-tight text-muted">Started building</dt>
              </div>
            </dl>
          </div>
        </motion.div>

        {/* ── Column two: the photograph ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="lg:border-x lg:border-rule lg:px-10"
        >
          <NewsPhoto
            src="/founder15.png"
            alt="Sreeram Venugopal"
            caption="Sreeram Venugopal · Puducherry"
            credit="Portrait"
            priority
            objectPosition="50% 50%"
            zoom={2.35}
            focal="61% 19%"
            className="[&>div]:aspect-[4/5]"
          />

          <blockquote className="mt-8 border-l-2 border-orange pl-5">
            <p className="deck text-xl leading-snug text-ink sm:text-2xl">
              “You understand a system by changing it and watching what happens.”
            </p>
          </blockquote>

          <a href="#about" className="btn btn-solid group mt-8 w-full">
            Read the full story
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        {/* ── Column three: the article ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="lg:pl-10"
        >
          <p className="eyebrow text-muted">By Sreeram Venugopal</p>

          <div className="column-copy mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p className="dropcap">
              I founded <strong className="font-semibold text-ink">SciPhyLabs</strong> in
              2023 — an interactive physics platform for students sitting JEE, NEET, AP,
              SAT and CUET, built on the idea that you learn a system by changing it
              rather than by memorising the formula that describes it.
            </p>
            <p>
              Working on it taught me something the platform could not fix on its own. The
              students I met were not short of ability or ambition. They were short of
              structure — someone to hand them a project, a mentor, and a stage, and then
              expect something of them.
            </p>
            <p>
              So in 2026 I founded the{' '}
              <strong className="font-semibold text-ink">
                Peacemakers of Puducherry Council
              </strong>{' '}
              — now the largest student organisation in Puducherry, spanning{' '}
              {council.institutions} institutions with {council.members} registered
              members, and backed by government, the public and the student community.
            </p>
            <p>
              Outside both, I debate — most recently arguing the opposition case against
              India&apos;s Emergency. Constitutional law and civil liberties are the
              subjects I read for their own sake, and the council&apos;s non-partisan
              footing is what forces me to argue them carefully rather than loudly.
            </p>
            <p className="text-ink">
              Both are still running. I would rather they be judged on what they ship than
              on how they describe themselves.
            </p>
          </div>

          <div className="mt-8 border-t border-rule pt-5">
            <p className="eyebrow mb-3.5 text-muted">Interests</p>
            <ul className="flex list-none flex-wrap gap-1.5 p-0">
              {interests.map((t) => (
                <li key={t}>
                  <span className="chip">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={council.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 flex items-center justify-between gap-4 border border-ink bg-paper-raised px-5 py-4 transition-colors hover:bg-ink"
          >
            <span className="min-w-0">
              <span className="eyebrow block text-orange">The Council</span>
              <span className="mt-1 block truncate text-sm text-ink transition-colors group-hover:text-paper">
                Peacemakers of Puducherry Council
              </span>
            </span>
            <ArrowUpRight
              className="size-5 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);
