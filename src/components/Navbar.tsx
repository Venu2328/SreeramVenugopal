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
      className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-4"
      aria-label="Primary"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl"
      >
        <a
          href="#main-content"
          className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-2"
          aria-label="Sreeram Venugopal — Home"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-full bg-lavender-haze flex items-center justify-center text-graphite text-xs"
          >
            SV
          </span>
          <span className="hidden sm:inline">Sreeram Venugopal</span>
          <span className="sm:hidden">Sreeram</span>
        </a>

        <ul className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-white/60">
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
          className="text-xs uppercase tracking-widest font-bold bg-white text-graphite px-5 py-2.5 rounded-full hover:bg-white/90 transition-all font-sans"
          aria-label="Contact Sreeram Venugopal"
        >
          Connect
        </a>
      </motion.div>
    </nav>
  );
};
