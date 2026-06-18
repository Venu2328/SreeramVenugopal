import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Work', href: '#work' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Writing', href: '#writing' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled ? 'bg-paper/90 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
          <a href="#top" className="flex items-baseline gap-2 group" aria-label="Sreeram Venugopal — Home">
            <span className="display text-lg sm:text-xl font-semibold tracking-tight text-ink">
              Sreeram Venugopal
            </span>
            <span aria-hidden="true" className="hidden sm:block w-1.5 h-1.5 rounded-full bg-crimson translate-y-[-2px]" />
          </a>

          <ul className="hidden md:flex items-center gap-7 lg:gap-9 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="eyebrow text-ink-soft hover:text-crimson transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="eyebrow text-crimson border border-crimson/30 rounded-full px-4 py-2 hover:bg-crimson hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 -mr-2 flex items-center justify-center text-ink hover:text-crimson transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-paper md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-line">
              <span className="display text-lg font-semibold">Sreeram Venugopal</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-10 h-10 -mr-2 flex items-center justify-center text-ink hover:text-crimson transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-7" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.08 }}
                  className="display text-4xl text-ink py-3 border-b border-line flex items-baseline gap-3"
                >
                  <span className="index-num text-sm text-crimson">{String(i + 1).padStart(2, '0')}</span>
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length + 0.08 }}
                className="display text-4xl text-crimson py-3"
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
