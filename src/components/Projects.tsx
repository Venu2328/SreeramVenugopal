import { motion } from 'motion/react';
import { ExternalLink, Tag } from 'lucide-react';

const otherProjects = [
  {
    title: 'SciPhy Master Physics',
    desc: 'An interactive system book linking physical text with simulation-based learning.',
    status: 'In Progress',
    tags: ['Education', 'HCI', 'Book Design'],
  },
  {
    title: 'Sutra AI',
    desc: 'Researching AI-native educational assistants for high-school level physics.',
    status: 'Prototype',
    tags: ['AI', 'GPT-4o', 'Prompt Engineering'],
  },
  {
    title: 'Venice (Agency)',
    desc: 'Entrepreneurial venture providing digital transformation, branding, and marketing for large-scale enterprises.',
    status: 'Active',
    tags: ['Agency', 'Entrepreneurship', 'Branding'],
  },
  {
    title: 'Swaminathan Enterprises',
    desc: 'Serving as the lead digital partner through Venice Agency, driving system operations and modernization.',
    status: 'Client Strategy',
    tags: ['Partnership', 'Ops', 'Modernization'],
  },
  {
    title: 'Experimental Research',
    desc: 'Personal writing and technical research on learning efficiency and visual mnemonics.',
    status: 'Ongoing',
    tags: ['Research', 'Writing'],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Active Ecosystem</h2>
          <p className="text-white/40 max-w-xl mx-auto font-light">
            Beyond simulations, I build tools and research systems that rethink how technical knowledge is transferred.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -12, 
                scale: 1.01,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-lavender-haze/20 to-transparent rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
              <div className="relative p-10 glass rounded-[32px] border-white/5 h-full flex flex-col justify-between hover:border-lavender-haze/40 hover:bg-white/[0.08] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(176,168,204,0.15)]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-lavender-haze/10 text-lavender-haze text-[10px] font-bold uppercase tracking-widest border border-lavender-haze/20">
                      {project.status}
                    </div>
                    <ExternalLink size={18} className="text-white/20 group-hover:text-white transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">{project.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{project.desc}</p>
                  </div>
                </div>

                <div className="pt-8 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium uppercase tracking-wider">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
