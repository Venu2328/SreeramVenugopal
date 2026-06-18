import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { MagicCard } from './effects/MagicCard';

const projects = [
  {
    title: 'SciPhyLabs — Master Physics',
    desc: 'An interactive system book linking physical text with simulation-based learning for STEM students.',
    status: 'In Progress',
    tags: ['Education', 'HCI', 'Book Design'],
  },
  {
    title: 'Sutra AI',
    desc: 'Researching AI-native educational assistants for high-school physics — bridging conceptual reasoning and curriculum mastery.',
    status: 'Prototype',
    tags: ['AI', 'GPT-4o', 'Prompt Engineering'],
  },
  {
    title: 'Venice — Agency',
    desc: 'Entrepreneurial venture providing digital transformation, branding and marketing for large-scale enterprises.',
    status: 'Active',
    tags: ['Agency', 'Entrepreneurship', 'Branding'],
  },
  {
    title: 'Swaminathan Enterprises',
    desc: 'Lead digital partner through Venice — driving systems operations, modernization and growth strategy.',
    status: 'Client Strategy',
    tags: ['Partnership', 'Ops', 'Modernization'],
  },
  {
    title: 'Experimental Research',
    desc: 'Independent writing and technical research on learning efficiency, visual mnemonics and immersive education systems.',
    status: 'Ongoing',
    tags: ['Research', 'Writing'],
  },
];

export const Projects = () => {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-14 sm:mb-20 text-center">
          <p className="eyebrow text-gold/70 mb-4">The body of work</p>
          <h2 id="projects-heading" className="serif text-4xl sm:text-5xl md:text-6xl text-chalk">
            Beyond the <span className="italic text-ember">lab.</span>
          </h2>
          <p className="font-body text-lg text-chalk/55 max-w-xl mx-auto mt-4">
            Ventures and research systems that rethink how technical knowledge is built, transferred and led.
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 gap-5 sm:gap-6 list-none p-0">
          {projects.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagicCard maxTilt={4} spotlightRadius={320} spotlightOpacity={0.12} className="rounded-2xl h-full">
                <article className="relative h-full p-7 sm:p-9 rounded-2xl glass hover:border-gold/30 transition-colors flex flex-col justify-between group overflow-hidden">
                  <span aria-hidden="true" className="brush absolute -top-3 -left-1 text-chalk/[0.04] text-7xl select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="ui glass-gold text-gold text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-full">
                        {p.status}
                      </span>
                      <ArrowUpRight size={20} className="text-chalk/25 group-hover:text-gold transition-colors" aria-hidden="true" />
                    </div>
                    <h3 className="serif text-2xl sm:text-3xl text-chalk leading-snug">{p.title}</h3>
                    <p className="font-body text-base sm:text-lg text-chalk/55 leading-relaxed">{p.desc}</p>
                  </div>
                  <ul className="relative pt-7 flex flex-wrap gap-x-4 gap-y-1.5 list-none p-0" aria-label={`${p.title} tags`}>
                    {p.tags.map((t) => (
                      <li key={t} className="hand text-lg text-chalk/40">#{t}</li>
                    ))}
                  </ul>
                </article>
              </MagicCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
