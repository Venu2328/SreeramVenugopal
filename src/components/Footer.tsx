import { profiles } from '../data/profiles';
import { council } from '../data/council';

const sitemap = [
  { name: 'Positions', href: '#positions' },
  { name: 'About', href: '#about' },
  { name: 'Council', href: '#council' },
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
    <footer role="contentinfo" className="border-t-2 border-red bg-ground px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-[1152px] gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3.5">
          <p className="display text-lg text-ink">Sreeram Venugopal</p>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Founder & Committee Leader of the {council.name}, and founder of SciPhyLabs. This
            is my home on the web; everything below links back here.
          </p>
          <a
            href="mailto:sreeram23db@gmail.com"
            className="link-draw inline-block pt-1 text-sm text-ink"
          >
            sreeram23db@gmail.com
          </a>
        </div>

        <nav aria-label="Sitemap" className="space-y-3.5">
          <h2 className="eyebrow text-muted">Sitemap</h2>
          <ul className="grid list-none grid-cols-2 gap-y-1.5 p-0 text-sm">
            {sitemap.map((s) => (
              <li key={s.name}>
                <a href={s.href} className="text-ink-soft transition-colors hover:text-red">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Crawlable identity hub — rel="me" ties every profile back to this site */}
      <section
        aria-labelledby="find-me"
        className="mx-auto mt-12 max-w-[1152px] border-t border-line pt-10"
      >
        <h2 id="find-me" className="eyebrow mb-6 text-muted">
          Find me online
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group} className="space-y-2.5">
              <h3 className="text-xs font-semibold text-ink">{group}</h3>
              <ul className="list-none space-y-1.5 p-0 text-sm">
                {profiles
                  .filter((p) => p.group === group)
                  .map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="text-ink-soft transition-colors hover:text-red"
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

      <div className="mx-auto mt-12 flex max-w-[1152px] flex-col items-center justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>© {year} Sreeram Venugopal · All profiles verified via rel=&quot;me&quot;</p>
        <a
          href="https://orcid.org/0009-0009-2916-7633"
          target="_blank"
          rel="me noopener noreferrer"
          className="transition-colors hover:text-red"
        >
          ORCID 0009-0009-2916-7633
        </a>
      </div>
    </footer>
  );
};
