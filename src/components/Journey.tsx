import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './motion/Reveal';

const timeline = [
  {
    year: '2022',
    title: 'Started the research',
    desc: 'Began looking closely at why physics felt harder than it needed to be, and where conventional teaching loses people.',
  },
  {
    year: '2023',
    title: 'Founded SciPhyLabs',
    desc: 'Turned that into a product — the first interactive simulations, and the first hundred built.',
  },
  {
    year: '2024',
    title: 'Scaled the library',
    desc: 'Grew past 500 simulations across 10+ topics and tightened the platform around self-directed practice.',
  },
  {
    year: 'Now',
    title: 'Building and writing',
    desc: 'Expanding SciPhyLabs, taking on selected client work through Venice, and writing about how people learn.',
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
    <section id="journey" aria-labelledby="journey-heading" className="py-24 sm:py-32 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          index="05"
          kicker="Timeline"
          title={<span id="journey-heading">How it has gone so far.</span>}
        />

        <ol ref={ref} className="mt-14 relative list-none p-0">
          {/* track + scroll-drawn fill */}
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute left-[5px] top-2 bottom-2 w-px bg-crimson origin-top"
          />

          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.05} className="relative pl-10 pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-paper border-2 border-crimson"
              />
              <span className="index-num text-sm text-crimson">{t.year}</span>
              <h3 className="display text-2xl text-ink mt-1 mb-2">{t.title}</h3>
              <p className="text-ink-soft leading-relaxed">{t.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
