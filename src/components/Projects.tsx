import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './motion/Reveal';

const projects = [
  {
    title: 'SciPhyLabs — Master Physics',
    desc: 'A companion text that pairs written explanation with the interactive simulations it describes.',
    meta: ['Education', 'Product', 'In progress'],
  },
  {
    title: 'Sutra AI',
    desc: 'An experimental AI study assistant for high-school physics, focused on conceptual reasoning over rote answers.',
    meta: ['AI', 'Prototype'],
  },
  {
    title: 'Venice',
    desc: 'A small studio delivering branding, web and digital work for businesses that need a clearer presence.',
    meta: ['Studio', 'Client work', 'Active'],
  },
  {
    title: 'Swaminathan Enterprises',
    desc: 'Digital partner through Venice — operations, modernization and growth strategy for an established business.',
    meta: ['Consulting', 'Ops'],
  },
];

export const Projects = () => {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 sm:py-32 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="03"
          kicker="Selected work"
          title={<span id="work-heading">Beyond the lab.</span>}
          className="max-w-3xl"
        />

        <ul className="mt-14 list-none p-0 border-t border-line">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.05}>
              <a
                href="#contact"
                className="group grid sm:grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-2 py-7 sm:py-8 border-b border-line hover:bg-paper-2/60 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors rounded-sm"
              >
                <span className="index-num text-sm text-crimson">{String(i + 1).padStart(2, '0')}</span>
                <div className="space-y-2">
                  <h3 className="display text-2xl sm:text-3xl text-ink leading-tight flex items-center gap-2">
                    {p.title}
                    <ArrowUpRight
                      size={20}
                      className="text-stone opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-ink-soft leading-relaxed max-w-xl">{p.desc}</p>
                </div>
                <ul className="flex sm:flex-col sm:items-end flex-wrap gap-x-3 gap-y-1 list-none p-0">
                  {p.meta.map((m) => (
                    <li key={m} className="eyebrow text-stone">{m}</li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
