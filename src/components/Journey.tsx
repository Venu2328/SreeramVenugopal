import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';

/**
 * The record in chronological order.
 *
 * Only dated, checkable events appear here. The previous version opened in
 * 2022 with unsourced research and claimed a library milestone in 2024; both
 * were removed. If more happened between 2023 and 2026 — cohorts run,
 * workshops hosted, campuses partnered — those belong here, with dates.
 */
const timeline = [
  {
    year: '2021',
    title: 'Founded the council',
    desc: 'Started the Peacemakers of Puducherry Council to give students in Puducherry structure, mentorship and somewhere to put their ambition.',
  },
  {
    year: '2023',
    title: 'Founded SciPhyLabs',
    desc: 'Built the first interactive simulations, and turned them into a platform aimed at students preparing for JEE, NEET, AP, SAT and CUET.',
  },
  {
    year: '2024',
    title: 'Coursework at IIT Madras',
    desc: 'Completed School Connect programmes in Data Science & AI and in Economic Finance, alongside running both organisations.',
  },
  {
    year: '2026',
    title: 'Started writing publicly',
    desc: 'Began publishing on what is actually broken in exam preparation, and what interactive-first learning does differently.',
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
    <section id="journey" aria-labelledby="journey-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell max-w-3xl">
        <SectionHeading
          index="07"
          kicker="Timeline"
          title={
            <span id="journey-heading">
              How it has <Accent>gone</Accent>.
            </span>
          }
        />

        <ol ref={ref} className="relative mt-16 list-none p-0">
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-red"
          />

          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.06} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-red bg-bg"
              />
              <span className="eyebrow mono text-red">{t.year}</span>
              <h3 className="display mt-2 mb-2.5 text-2xl text-ink">{t.title}</h3>
              <p className="leading-relaxed text-ink-soft">{t.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
