import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Positions', href: '#positions' },
  { name: 'About', href: '#about' },
  { name: 'Council', href: '#council' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Work', href: '#work' },
  { name: 'Writing', href: '#writing' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      {/* Floating bar that condenses into a bordered pill once you leave the top */}
      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 sm:px-6">
        <motion.nav
          aria-label="Primary"
          animate={{
            maxWidth: scrolled ? 1000 : 1152,
            backgroundColor: scrolled ? 'rgba(13,11,10,0.72)' : 'rgba(13,11,10,0)',
            borderColor: scrolled ? 'rgba(58,49,46,1)' : 'rgba(58,49,46,0)',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`mx-auto flex h-14 items-center justify-between gap-6 rounded-full border px-5 sm:px-6 ${
            scrolled ? 'backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]' : ''
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Sreeram Venugopal — home"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red glow-red" />
            <span className="display text-sm tracking-tight text-ink sm:text-base">
              Sreeram Venugopal
            </span>
          </a>

          <ul className="hidden list-none items-center gap-7 p-0 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="eyebrow text-muted transition-colors hover:text-ink">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="eyebrow hidden rounded-full border border-line-strong px-5 py-2.5 text-ink transition-colors hover:border-red hover:bg-red/10 sm:inline-flex">
              Contact
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="-mr-1.5 flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-red lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] flex flex-col bg-ground lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-6">
              <span className="display text-sm text-ink">Sreeram Venugopal</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-1.5 flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-red"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="display flex items-baseline gap-4 border-b border-line py-4 text-3xl text-ink"
                >
                  <span className="eyebrow mono text-red">{String(i + 1).padStart(2, '0')}</span>
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length + 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="display py-5 text-3xl text-red"
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
