import { motion } from 'motion/react';
import { BookOpen, ExternalLink, Instagram, Linkedin, Mail, Youtube } from 'lucide-react';

const blogPosts = [
  {
    title: 'Why Physics Education Needs Simulations',
    description: 'Exploring the gap between mathematical rigor and physical intuition.',
    category: 'Education',
  },
  {
    title: 'Building 347 Physics Simulations',
    description: 'Technical challenges and design patterns in high-speed simulation building.',
    category: 'Engineering',
  },
  {
    title: 'The Future of AI-Native Education',
    description: 'How LLMs will transform structured concept learning for STEM students.',
    category: 'AI',
  },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376/', label: 'Network' },
  { name: 'Medium', icon: BookOpen, href: 'https://medium.com/@sreeram23db', label: 'Writing' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA', label: 'Guides' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/venuuu7_?igsh=MTM3Nm9rcjRiNGtiaQ==', label: 'Updates' },
  { name: 'Email', icon: Mail, href: 'mailto:sreeram23db@gmail.com', label: 'Contact' },
];

export const Resources = () => {
  return (
    <div id="writing">
      {/* Writing Section */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Knowledge Base</span>
              <h2 className="text-4xl font-display font-medium text-white tracking-tight leading-tight">
                Ideas and <span className="text-white/40 italic">Technical Notes.</span>
              </h2>
            </div>
            <a
              href="https://medium.com/@sreeram23db"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-lavender-haze hover:underline flex items-center gap-2"
            >
              View Publication <ExternalLink size={14} />
            </a>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl glass border-white/5 hover:bg-white/[0.08] transition-all flex flex-col justify-between h-full cursor-pointer overflow-hidden relative"
              >
                {/* Coming Soon Overlay Effect */}
                <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest text-white/20">Coming Soon</div>
                
                <div className="space-y-4 relative z-10">
                  <span className="text-[10px] font-bold text-lavender-haze uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-lavender-haze transition-colors leading-tight">{post.title}</h3>
                  <p className="text-white/40 text-sm italic">{post.description}</p>
                </div>
                
                <div className="pt-8 flex items-center gap-2 text-white/20 group-hover:text-white transition-colors">
                  <span className="text-xs font-bold uppercase tracking-widest">Read Article</span>
                  <ArrowRightIcon />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Presence */}
      <section className="py-24 px-6 glass rounded-t-[100px] border-x-0 border-b-0">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-12 tracking-tight">Digital Footprint</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {socialLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        whileHover={{ y: -5 }}
                        className="group flex flex-col items-center gap-3 w-40 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-graphite flex items-center justify-center text-white group-hover:bg-lavender-haze group-hover:text-graphite transition-all">
                            <link.icon size={20} />
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm font-bold text-white">{link.name}</div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{link.label}</div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
