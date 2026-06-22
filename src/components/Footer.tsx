import { profiles } from '../data/profiles';

const sitemap = [
  { name: 'About', href: '#about' },
  { name: 'SciPhyLabs', href: '#sciphylabs' },
  { name: 'Work', href: '#work' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

const groups = ['Professional', 'Writing', 'Social'] as const;

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="px-5 sm:px-8 py-14 border-t-[3px] border-crimson bg-paper">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          <p className="display text-xl font-semibold text-ink">Sreeram Venugopal</p>
          <p className="text-sm text-ink-soft leading-relaxed max-w-sm">
            Founder, author and researcher of SciPhyLabs — an interactive-first, research-backed physics
            ecosystem. This is my home on the web; everything below links back here.
          </p>
          <a
            href="mailto:sreeram23db@gmail.com"
            className="inline-block text-sm text-crimson link-underline pt-1"
          >
            sreeram23db@gmail.com
          </a>
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
      </div>

      {/* crawlable identity hub — rel="me" ties every profile to this site */}
      <section aria-labelledby="find-me" className="max-w-6xl mx-auto mt-12 pt-10 border-t border-line">
        <h2 id="find-me" className="eyebrow text-stone mb-6">Find me online</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group} className="space-y-2.5">
              <h3 className="text-xs font-semibold text-ink">{group}</h3>
              <ul className="space-y-1.5 list-none p-0 text-sm">
                {profiles.filter((p) => p.group === group).map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="text-ink-soft hover:text-crimson transition-colors"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone">
        <p>© {year} Sreeram Venugopal · All profiles verified via rel=&quot;me&quot;</p>
        <a
          href="https://orcid.org/0009-0009-2916-7633"
          target="_blank"
          rel="me noopener noreferrer"
          className="hover:text-crimson transition-colors"
        >
          ORCID 0009-0009-2916-7633
        </a>
      </div>
    </footer>
  );
};
