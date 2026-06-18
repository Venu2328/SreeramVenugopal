import { motion } from 'motion/react';
import { ArrowRight, BookOpen, ExternalLink, Instagram, Linkedin, Mail, Youtube } from 'lucide-react';

const posts = [
  {
    title: 'Why Physics Education Needs Simulations',
    description: 'The gap between mathematical rigour and physical intuition in modern STEM pedagogy.',
    category: 'Education',
  },
  {
    title: 'Building 347 Physics Simulations',
    description: 'Engineering patterns behind high-velocity, classroom-ready interactive physics.',
    category: 'Engineering',
  },
  {
    title: 'The Future of AI-Native Education',
    description: 'How LLMs and simulation-led learning will transform concept mastery for STEM learners.',
    category: 'AI',
  },
];

const socials = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376/', label: 'Network' },
  { name: 'Medium', icon: BookOpen, href: 'https://medium.com/@sreeram23db', label: 'Writing' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA', label: 'Guides' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/venuuu7_', label: 'Updates' },
  { name: 'Email', icon: Mail, href: 'mailto:sreeram23db@gmail.com', label: 'Contact' },
];

export const Resources = () => {
  return (
    <div id="writing">
      <section aria-labelledby="writing-heading" className="relative py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 sm:mb-16">
            <div>
              <p className="eyebrow text-gold/70 mb-4">Field notes</p>
              <h2 id="writing-heading" className="serif text-4xl sm:text-5xl md:text-6xl text-chalk">
                Ideas &amp; <span className="italic text-ember">technical notes.</span>
              </h2>
            </div>
            <a
              href="https://medium.com/@sreeram23db"
              target="_blank"
              rel="noopener noreferrer"
              className="ui text-sm font-bold uppercase tracking-[0.18em] text-gold hover:text-chalk flex items-center gap-2 transition-colors"
            >
              View publication <ExternalLink size={14} aria-hidden="true" />
            </a>
          </header>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none p-0">
            {posts.map((post, i) => (
              <motion.li
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ delay: i * 0.08 }}
              >
                <article className="group relative h-full p-7 rounded-2xl glass hover:border-gold/30 transition-colors flex flex-col justify-between overflow-hidden cursor-pointer">
                  <span className="ui absolute top-4 right-4 text-[9px] uppercase font-bold tracking-[0.2em] text-chalk/25">
                    Coming soon
                  </span>
                  <div className="space-y-3">
                    <span className="hand text-ember text-xl leading-none">{post.category}</span>
                    <h3 className="serif text-2xl text-chalk group-hover:text-gold transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-body text-base text-chalk/50 italic leading-relaxed">{post.description}</p>
                  </div>
                  <div className="pt-7 flex items-center gap-2 text-chalk/25 group-hover:text-gold transition-colors">
                    <span className="ui text-[10px] font-bold uppercase tracking-[0.2em]">Read article</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="social-heading" className="relative py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="social-heading" className="serif text-3xl sm:text-4xl text-chalk mb-10">
            Digital <span className="italic text-ember">footprint.</span>
          </h2>
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 list-none p-0">
            {socials.map((link) => (
              <li key={link.name}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col items-center gap-3 w-28 sm:w-36 p-5 rounded-2xl glass hover:border-gold/30 transition-colors"
                  aria-label={`${link.name} — ${link.label}`}
                >
                  <span className="w-12 h-12 rounded-full bg-ink-2 flex items-center justify-center text-chalk/70 group-hover:bg-gold group-hover:text-ink transition-colors">
                    <link.icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="ui text-sm font-bold text-chalk block">{link.name}</span>
                    <span className="ui text-[10px] uppercase tracking-[0.18em] text-chalk/35 font-bold block">{link.label}</span>
                  </span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
