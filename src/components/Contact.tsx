import { motion } from 'motion/react';
import { Home, Instagram, Linkedin, Youtube, BookOpen } from 'lucide-react';
import { Starfield } from './atmosphere/Starfield';
import { MagneticButton } from './effects/MagneticButton';

const footerNav = [
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Writing', href: '#writing' },
];

const socials = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/venuuu7_' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376/' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA' },
  { name: 'Medium', icon: BookOpen, href: 'https://medium.com/@sreeram23db' },
];

export const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden px-4 sm:px-6 py-24 bg-black"
    >
      <Starfield className="absolute inset-0 w-full h-full" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hand text-gold text-2xl sm:text-3xl mb-4"
        >
          Want to collaborate
        </motion.p>

        <motion.h2
          id="contact-heading"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.3 }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="brush brush-rough text-chalk text-gold-glow text-[clamp(2.8rem,11vw,8rem)] leading-[0.92]"
        >
          Let's build
          <br />
          something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-lg sm:text-xl text-chalk/60 max-w-xl mx-auto mt-6"
        >
          Open to research collaborations, fellowships, and serious conversations on andragogy,
          cognitive development and the future of STEM education. I'd love to hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <MagneticButton strength={0.4}>
            <a
              href="mailto:sreeram23db@gmail.com"
              className="hand inline-flex items-center gap-2 text-3xl sm:text-4xl text-ink bg-gold px-9 py-3 rounded-full hover:bg-chalk transition-colors"
            >
              This way →
            </a>
          </MagneticButton>
        </motion.div>

        <div className="mt-8 ui text-chalk/50 text-sm uppercase tracking-[0.18em]">
          <a href="mailto:sreeram23db@gmail.com" className="hover:text-gold transition-colors">
            sreeram23db@gmail.com
          </a>
        </div>

        {/* footer nav row, echoing the reference's bottom bar */}
        <nav
          aria-label="Footer"
          className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
        >
          <a href="#home" aria-label="Home" className="text-chalk/60 hover:text-gold transition-colors">
            <Home size={20} aria-hidden="true" />
          </a>
          {footerNav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="ui text-[11px] uppercase tracking-[0.22em] font-bold text-chalk/60 hover:text-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
          <span aria-hidden="true" className="hidden sm:block w-px h-4 bg-chalk/15" />
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-chalk/60 hover:text-gold transition-colors"
            >
              <s.icon size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
