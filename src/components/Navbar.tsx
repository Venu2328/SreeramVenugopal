import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Profile', href: '#profile' },
  { name: 'Featured', href: '#sciphylabs' },
  { name: 'Projects', href: '#projects' },
  { name: 'Timeline', href: '#journey' },
  { name: 'Ideas', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl"
      >
        <div className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-lavender-haze flex items-center justify-center text-graphite text-xs">SV</div>
          <span className="hidden sm:inline">Sreeram Venugopal</span>
          <span className="sm:hidden">Sreeram</span>
        </div>

        {/* CTA Button */}
        <div>
          <a 
            href="#contact"
            className="text-xs uppercase tracking-widest font-bold bg-white text-graphite px-5 py-2.5 rounded-full hover:bg-white/90 transition-all font-sans"
          >
            Connect
          </a>
        </div>
      </motion.div>
    </nav>
  );
};
