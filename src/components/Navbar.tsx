import { motion } from 'motion/react';

const navLinks = [
  { name: 'About', href: '#profile' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Writing', href: '#writing' },
];

export const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex justify-center py-3 sm:py-5 md:py-6 px-3 sm:px-4"
      aria-label="Primary"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full pl-3 sm:pl-4 md:pl-6 pr-2 sm:pr-3 py-2 sm:py-3 flex items-center justify-between gap-3 w-full max-w-4xl"
      >
        <a
          href="#main-content"
          className="text-base sm:text-lg md:text-xl font-display font-bold tracking-tight text-white flex items-center gap-2 min-w-0"
          aria-label="Sreeram Venugopal — Home"
        >
          <span
            aria-hidden="true"
            className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-lavender-haze flex items-center justify-center text-graphite text-[10px] sm:text-xs font-bold"
          >
            SV
          </span>
          <span className="hidden sm:inline truncate">Sreeram Venugopal</span>
          <span className="sm:hidden truncate">Sreeram</span>
        </a>

        <ul className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] xl:text-xs uppercase tracking-widest font-semibold text-white/60">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="text-[10px] sm:text-xs uppercase tracking-widest font-bold bg-white text-graphite px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full hover:bg-white/90 transition-all font-sans whitespace-nowrap shrink-0"
          aria-label="Contact Sreeram Venugopal"
        >
          Connect
        </a>
      </motion.div>
    </nav>
  );
};
