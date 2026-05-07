import { Linkedin, BookOpen, Youtube, Instagram, Mail } from 'lucide-react';

const sitemap = [
  { name: 'About', href: '#profile' },
  { name: 'SCI-PHY Lab', href: '#sciphylabs' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

const socials = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376/' },
  { name: 'Medium', icon: BookOpen, href: 'https://medium.com/@sreeram23db' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/venuuu7_' },
  { name: 'Email', icon: Mail, href: 'mailto:sreeram23db@gmail.com' },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative z-10 px-6 pt-16 pb-12 border-t border-white/5 bg-graphite/40 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="w-9 h-9 rounded-full bg-lavender-haze flex items-center justify-center text-graphite text-xs font-bold"
            >
              SV
            </span>
            <span className="text-lg font-display font-bold tracking-tight text-white">
              Sreeram Venugopal
            </span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed max-w-sm">
            Student founder of <span className="text-white/70">SCI-PHY Lab</span> — building interactive physics simulations and immersive education systems engineered around andragogical principles and cognitive development research.
          </p>
        </div>

        <nav aria-label="Footer sitemap" className="space-y-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
            Sitemap
          </h2>
          <ul className="grid grid-cols-2 gap-y-2 list-none p-0 text-sm">
            {sitemap.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
            Elsewhere
          </h2>
          <ul className="flex gap-3 list-none p-0">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={`${social.name} — Sreeram Venugopal`}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-lavender-haze hover:border-lavender-haze/40 transition-all"
                >
                  <social.icon size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/30 pt-2">
            <a
              href="mailto:sreeram23db@gmail.com"
              className="hover:text-white/60 transition-colors"
            >
              sreeram23db@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
        <p>© {year} Sreeram Venugopal · SCI-PHY Lab</p>
        <p>
          Built with intent. <span className="text-white/40">Designed to teach.</span>
        </p>
      </div>
    </footer>
  );
};
