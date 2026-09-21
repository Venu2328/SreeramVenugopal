import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { NewsPhoto } from './paper/NewsPhoto';
import { Accent } from './Accent';
import { CountUp } from './effects/CountUp';

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
 */

/* The four roles the whole paper is organised around — one supplement each for
   the first three, and the research running under the fourth. */
const identity = ['Founder.', 'Leader.', 'Speaker.', 'Researcher.'];

const interests = [
  'Physics',
  'Simulation',
  'Education',
  'Public Speaking',
  'Research',
  'Debate',
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
        the people it reaches.
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
                  <CountUp target={400} suffix="+" />
                </dd>
                <dt className="mt-2 text-xs leading-tight text-muted">
                  Simulations built
                </dt>
              </div>
              <div>
                <dd className="headline text-3xl leading-none text-orange">
                  <CountUp target={1000} suffix="+" />
                </dd>
                <dt className="mt-2 text-xs leading-tight text-muted">App downloads</dt>
              </div>
              <div>
                <dd className="headline text-3xl leading-none text-ink">2023</dd>
                <dt className="mt-2 text-xs leading-tight text-muted">Started building</dt>
              </div>
              <div>
                <dd className="headline text-3xl leading-none text-ink">5</dd>
                <dt className="mt-2 text-xs leading-tight text-muted">Exam syllabi covered</dt>
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

          <a href="#inside" className="btn btn-solid group mt-8 w-full">
            See what&apos;s inside
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
              It has grown into 400+ simulations and an app past a thousand downloads,
              reaching students through schools and colleges rather than through
              advertising. The work is the same as it was on day one: take a concept that
              intimidates people, and hand them something they can move.
            </p>
            <p>
              The other half of the job is spoken aloud. I speak, I debate, and I take
              positions in front of rooms that may not agree with me — because an argument
              you will not defend in public is not really a position.
            </p>
            <p className="text-ink">
              I would rather be judged on what I ship and what I say than on how either is
              described.
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
            href="/ventures"
            className="group mt-8 flex items-center justify-between gap-4 border border-ink bg-paper-raised px-5 py-4 transition-colors hover:bg-ink"
          >
            <span className="min-w-0">
              <span className="eyebrow block text-orange">Advanced EdTech</span>
              <span className="mt-1 block truncate text-sm text-ink transition-colors group-hover:text-paper">
                SciPhyLabs — the startup
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
