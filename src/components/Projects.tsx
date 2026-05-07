import { motion } from 'motion/react';
import { ExternalLink, Tag } from 'lucide-react';

const otherProjects = [
  {
    title: 'SciPhy Master Physics',
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
    title: 'Venice (Agency)',
    desc: 'Entrepreneurial venture providing digital transformation, branding and marketing for large-scale enterprises.',
    status: 'Active',
    tags: ['Agency', 'Entrepreneurship', 'Branding'],
  },
  {
    title: 'Swaminathan Enterprises',
    desc: 'Lead digital partner through Venice Agency — driving systems operations, modernization and growth strategy.',
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
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight"
          >
            Active Ecosystem
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-light">
            Beyond simulations, Sreeram builds tools and research systems that rethink how technical knowledge is transferred — from interactive learning platforms to AI-native study assistants.
          </p>
        </header>

        <ul className="grid md:grid-cols-2 gap-8 list-none p-0">
          {otherProjects.map((project, i) => (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -12,
                scale: 1.01,
                transition: { type: 'spring', stiffness: 400, damping: 25 },
              }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="group relative"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-1 bg-gradient-to-r from-lavender-haze/20 to-transparent rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
              />
              <article className="relative p-10 glass rounded-[32px] border-white/5 h-full flex flex-col justify-between hover:border-lavender-haze/40 hover:bg-white/[0.08] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(176,168,204,0.15)]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-lavender-haze/10 text-lavender-haze text-[10px] font-bold uppercase tracking-widest border border-lavender-haze/20">
                      {project.status}
                    </span>
                    <ExternalLink
                      size={18}
                      className="text-white/20 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{project.desc}</p>
                  </div>
                </div>

                <ul className="pt-8 flex flex-wrap gap-2 list-none p-0" aria-label={`${project.title} tags`}>
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium uppercase tracking-wider"
                    >
                      <Tag size={10} aria-hidden="true" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
