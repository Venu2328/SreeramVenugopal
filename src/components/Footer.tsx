import { profiles } from '../data/profiles';

/**
 * Footer
 *
 * The colophon, and the site's identity hub. Every profile is emitted with
 * rel="me" so search engines and identity services can tie each one back here
 * as the authoritative source — which is the whole reason the list is rendered
 * as crawlable links rather than icons.
 */
const sitemap = [
  { name: 'Home', href: '/' },
  { name: 'Ventures', href: '/ventures' },
  { name: 'SciPhyLabs', href: '/ventures#sciphylabs' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Credentials', href: '/credentials' },
  { name: 'Books', href: '/author' },
  { name: 'Research', href: '/research' },
  { name: 'Writing', href: '/writing' },
  { name: 'Contact', href: '/#contact' },
];

const groups = ['Professional', 'Writing', 'Social'] as const;

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t-2 border-orange bg-slab-deep px-5 py-14 text-on-slab sm:px-8"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3.5">
          <p className="headline text-2xl">
            Sreeram Venugopal<span className="text-orange">.</span>
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-on-slab/65">
            Founder, author and researcher at SciPhyLabs, and an active keynote
            speaker. This is my home on the web; everything below links back here.
          </p>
          <a
            href="mailto:sreeram23db@gmail.com"
            className="link-draw inline-block pt-1 text-sm text-on-slab"
          >
            sreeram23db@gmail.com
          </a>

          {/* The projects section came off the front page; this is the pointer
              it used to carry, kept because the repositories stay more current
              than any list on this site could. */}
          <a
            href="https://github.com/Venu2328"
            target="_blank"
            rel="me noopener noreferrer"
            className="eyebrow block pt-3 text-on-slab/65 transition-colors hover:text-orange"
          >
            See all 14+ projects on GitHub &#8599;
          </a>
        </div>

        <nav aria-label="Sitemap" className="space-y-3.5">
          <h2 className="eyebrow text-on-slab/50">Sitemap</h2>
          <ul className="grid list-none grid-cols-2 gap-y-1.5 p-0 text-sm">
            {sitemap.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  className="text-on-slab/65 transition-colors hover:text-orange"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section
        aria-labelledby="find-me"
        className="mx-auto mt-12 max-w-[1280px] border-t border-on-slab/15 pt-10"
      >
        <h2 id="find-me" className="eyebrow mb-6 text-on-slab/50">
          Find me online
        </h2>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group} className="space-y-2.5">
              <h3 className="text-xs font-semibold text-on-slab">{group}</h3>
              <ul className="list-none space-y-1.5 p-0 text-sm">
                {profiles
                  .filter((p) => p.group === group)
                  .map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="text-on-slab/65 transition-colors hover:text-orange"
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

      <div className="mx-auto mt-12 flex max-w-[1280px] flex-col items-center justify-between gap-2 border-t border-on-slab/15 pt-6 text-xs text-on-slab/45 sm:flex-row">
        <p>© {year} Sreeram Venugopal · All profiles verified via rel=&quot;me&quot;</p>
        <a
          href="https://orcid.org/0009-0009-2916-7633"
          target="_blank"
          rel="me noopener noreferrer"
          className="transition-colors hover:text-orange"
        >
          ORCID 0009-0009-2916-7633
        </a>
      </div>
    </footer>
  );
};
