const sitemap = [
  { name: 'About', href: '#about' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Work', href: '#work' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

const elsewhere = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376/' },
  { name: 'Medium', href: 'https://medium.com/@sreeram23db' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA' },
  { name: 'Instagram', href: 'https://www.instagram.com/venuuu7_' },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="px-5 sm:px-8 py-14 border-t-[3px] border-crimson bg-paper">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="display text-xl font-semibold text-ink">Sreeram Venugopal</p>
          <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
            Founder of SciPhyLabs. Building interactive physics and writing about how people learn.
          </p>
        </div>

        <nav aria-label="Sitemap" className="space-y-3">
          <h2 className="eyebrow text-stone">Sitemap</h2>
          <ul className="grid grid-cols-2 gap-y-1.5 list-none p-0 text-sm">
            {sitemap.map((s) => (
              <li key={s.name}>
                <a href={s.href} className="text-ink-soft hover:text-crimson transition-colors">{s.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="eyebrow text-stone">Elsewhere</h2>
          <ul className="space-y-1.5 list-none p-0 text-sm">
            {elsewhere.map((e) => (
              <li key={e.name}>
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-crimson transition-colors"
                >
                  {e.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone">
        <p>© {year} Sreeram Venugopal</p>
        <a href="mailto:sreeram23db@gmail.com" className="hover:text-crimson transition-colors">sreeram23db@gmail.com</a>
      </div>
    </footer>
  );
};
