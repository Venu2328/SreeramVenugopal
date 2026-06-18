import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#profile' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Work', href: '#projects' },
  { name: 'Awards', href: '#recognition' },
  { name: 'Journey', href: '#journey' },
  { name: 'Writing', href: '#writing' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary"
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-chalk/8' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
          <a
            href="#main-content"
            className="flex items-center gap-2.5 group min-w-0"
            aria-label="Sreeram Venugopal — Home"
          >
            <span
              aria-hidden="true"
              className="brush text-gold text-2xl sm:text-3xl leading-none -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              SV
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="ui text-chalk text-sm font-semibold tracking-tight block">Sreeram Venugopal</span>
              <span className="eyebrow text-chalk/35 block">Founder · Researcher</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 xl:gap-9 ui text-[11px] uppercase tracking-[0.22em] font-semibold text-chalk/55 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-gold transition-colors duration-300">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center ui text-[11px] uppercase tracking-[0.2em] font-bold text-ink bg-gold px-5 py-2.5 rounded-full hover:bg-chalk transition-colors duration-300"
            >
              Let's talk
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 -mr-1 flex items-center justify-center text-chalk/80 hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
              <span className="brush text-gold text-3xl -rotate-6">SV</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-chalk/80 hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-2 px-8" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="serif italic text-4xl sm:text-5xl text-chalk/80 hover:text-gold transition-colors py-1.5"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * navLinks.length + 0.1 }}
                className="hand text-ember text-4xl sm:text-5xl mt-4"
              >
                Let's talk →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
