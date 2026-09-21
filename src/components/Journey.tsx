import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';

/**
 * Journey
 *
 * The record in chronological order. Only dated, checkable events appear — if
 * more happened between 2023 and 2026 (talks given, campuses reached, releases
 * shipped) it belongs here, with a date.
 *
 * The orange rule down the left fills as you read, scrubbed to scroll position
 * rather than triggered, so it reverses when you scroll back up.
 */
const timeline = [
  {
    year: '2023',
    title: 'Founded SciPhyLabs',
    desc: 'Built the first interactive simulations, and turned them into a platform aimed at students preparing for JEE, NEET, AP, SAT and CUET.',
  },
  {
    year: '2024',
    title: 'Coursework at IIT Madras',
    desc: 'Completed School Connect programmes in Data Science & AI and in Economic Finance, alongside building the platform.',
  },
  {
    year: '2026',
    title: 'Started writing publicly',
    desc: 'Began publishing on what is actually broken in exam preparation, and what interactive-first learning does differently.',
  },
  {
    year: '2026',
    title: 'Took the platform to the stage',
    desc: 'Began speaking and debating in front of schools, colleges and halls — carrying the argument for interactive learning to the people it is built for.',
  },
];

export const Journey = () => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="scroll-mt-20 border-b border-ink bg-paper-raised py-16 sm:py-24"
    >
      <div className="shell">
        <SectionRule
          kicker="The record"
          mark="B"
          id="timeline-heading"
          title={
            <>
              How it has <Accent>gone</Accent>.
            </>
          }
        />

        <ol ref={ref} className="relative mt-12 max-w-3xl list-none p-0">
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-rule-strong" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-orange"
          />

          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year + t.title} delay={i * 0.06} className="relative pb-11 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-orange bg-paper-raised"
              />
              <span className="eyebrow mono text-orange">{t.year}</span>
              <h3 className="headline mt-2 mb-2.5 text-2xl text-ink">{t.title}</h3>
              <p className="leading-relaxed text-ink-soft">{t.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
