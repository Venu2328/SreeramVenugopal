import { Linkedin, BookOpen, Youtube, Instagram, Mail } from 'lucide-react';

const sitemap = [
  { name: 'About', href: '#profile' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Work', href: '#projects' },
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
      className="relative z-10 px-4 sm:px-6 pt-16 pb-10 border-t border-chalk/[0.06] bg-ink/60 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div className="space-y-4 sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="brush text-gold text-3xl -rotate-6 leading-none">SV</span>
            <span className="ui text-base font-semibold tracking-tight text-chalk">Sreeram Venugopal</span>
          </div>
          <p className="font-body text-base text-chalk/50 leading-relaxed max-w-sm">
            Founder of <span className="text-chalk/80">SciPhyLabs</span> — building interactive physics
            simulations and immersive education systems engineered around andragogical principles and
            cognitive-development research.
          </p>
        </div>

        <nav aria-label="Footer sitemap" className="space-y-4">
          <h2 className="ui text-[10px] uppercase tracking-[0.22em] font-bold text-chalk/40">Sitemap</h2>
          <ul className="grid grid-cols-2 gap-y-2 list-none p-0 ui text-sm">
            {sitemap.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-chalk/55 hover:text-gold transition-colors">{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <h2 className="ui text-[10px] uppercase tracking-[0.22em] font-bold text-chalk/40">Elsewhere</h2>
          <ul className="flex gap-3 list-none p-0">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={`${social.name} — Sreeram Venugopal`}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-chalk/55 hover:text-gold hover:border-gold/30 transition-colors"
                >
                  <social.icon size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="ui text-xs text-chalk/30 pt-1">
            <a href="mailto:sreeram23db@gmail.com" className="hover:text-chalk/60 transition-colors">
              sreeram23db@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-7 border-t border-chalk/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 ui text-[10px] uppercase tracking-[0.22em] font-bold text-chalk/30">
        <p>© {year} Sreeram Venugopal · SciPhyLabs</p>
        <p>Built with intent. <span className="text-chalk/45">Designed to teach.</span></p>
      </div>
    </footer>
  );
};
