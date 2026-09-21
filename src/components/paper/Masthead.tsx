import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Mail, Menu, X } from 'lucide-react';

/**
 * Masthead
 *
 * The top of the paper: a thin dark strip, the nameplate, the role line, and
 * the navigation rule — then a dateline row handing off to the lead story.
 *
 * It prints in full at the top of every page and then gets out of the way. A
 * condensed bar takes over once you scroll past the nameplate, carrying only
 * the initials and the navigation, because a masthead that follows you down
 * the page is a website affectation rather than a newspaper one.
 *
 * `page` rewrites the anchors: section links are hashes on the front page and
 * absolute `/#section` links everywhere else, so the nav works identically
 * from /ventures without every item silently pointing at nothing.
 */
type NavLink = {
  name: string;
  href: string;
  /** Where this entry points when the reader is away from the front page. */
  page?: string;
  /** True for entries that are always the same URL, wherever you are. */
  absolute?: boolean;
};

const sections: NavLink[] = [
  { name: 'EdTech', href: '#edtech', page: '/ventures' },
  { name: 'Speaking', href: '#speaking', page: '/speaking' },
  { name: 'Credentials', href: '#proof', page: '/credentials' },
  { name: 'Books', href: '#books', page: '/author' },
  { name: 'Research', href: '#research', page: '/research' },
  { name: 'Writing', href: '#writing', page: '/writing' },
  { name: 'Contact', href: '#contact' },
];

export const Masthead = ({
  page = 'home',
  edition,
}: {
  page?: 'home' | 'ventures' | 'speaking' | 'credentials' | 'author' | 'research' | 'writing';
  edition?: string;
}) => {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 260);
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

  /*
   * The whole paper runs on the front page, so navigation there is in-page.
   * Away from it a bare hash would resolve against the wrong document, so each
   * entry falls back to its own supplement instead.
   */
  const resolve = (s: { href: string; page?: string }) =>
    page === 'home' ? s.href : (s.page ?? `/${s.href}`);

  const links: NavLink[] = [
    { name: 'Home', href: '/', absolute: true },
    ...sections,
  ];


  return (
    <>
      {/* ── Ear strip ──────────────────────────────────────────────── */}
      <div className="bg-slab text-on-slab">
        <div className="shell flex h-14 items-center justify-between gap-4">
          <p className="eyebrow flex items-center gap-2.5 truncate text-sm font-semibold tracking-[0.2em] text-on-slab">
            <Mail className="size-3.5 shrink-0 text-orange" aria-hidden="true" />
            <span className="truncate">Available for collaborations</span>
          </p>
          <a
            href={page === 'home' ? '#contact' : '/#contact'}
            className="eyebrow group inline-flex shrink-0 items-center gap-2 border-2 border-orange bg-orange px-4 py-2 text-sm font-bold text-on-orange transition-colors hover:bg-orange-deep hover:border-orange-deep"
          >
            Get in touch
            <ArrowRight
              className="size-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* ── Nameplate ──────────────────────────────────────────────── */}
      <header className="border-b-[3px] border-ink bg-paper">
        <div className="shell pt-6 pb-4 sm:pt-8">
          {/* Edition line, the way a front page carries one above the name. */}
          <div className="flex items-center justify-between gap-4 border-b border-ink pb-3">
            <p className="eyebrow hidden text-sm font-bold text-ink sm:block">
              Est. 2023
            </p>
            <p className="eyebrow text-center text-sm font-bold tracking-[0.3em] text-orange">
              The Sreeram Venugopal Record
            </p>
            <p className="eyebrow hidden text-sm font-bold text-ink sm:block">
              Puducherry
            </p>
          </div>

          <a href="/" aria-label="Sreeram Venugopal — home" className="mt-4 block">
            {/*
              The nameplate, set to fill its measure. A front-page name is not a
              heading with a size — it is a block of type that runs wall to wall,
              so it is tracked hard and let go as large as the column allows.
            */}
            <h1 className="headline text-center text-[clamp(2.4rem,11.5vw,10rem)] leading-[0.82] tracking-[-0.045em] text-ink">
              SREERAM <span className="text-orange">VENU</span>GOPAL
            </h1>
          </a>

          <div className="mt-5 border-t-[3px] border-b border-ink py-3">
            <p className="eyebrow text-center text-sm font-bold tracking-[0.22em] text-ink sm:text-base">
              Founder <span className="text-orange">★</span> Leader{' '}
              <span className="text-orange">★</span> Speaker{' '}
              <span className="text-orange">★</span> Researcher{' '}
              <span className="text-orange">★</span> Author
            </p>
          </div>
        </div>

        {/* ── Navigation rule ──────────────────────────────────────── */}
        <div className="rule-heavy border-t border-ink">
          <nav aria-label="Primary" className="shell">
            <ul className="hidden list-none items-center justify-center gap-0 p-0 py-3.5 lg:flex">
              {links.map((l, i) => (
                <li key={l.name} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="px-4 text-lg text-orange">
                      ·
                    </span>
                  )}
                  <a
                    href={l.absolute ? l.href : resolve(l)}
                    className="eyebrow text-sm font-bold text-ink transition-colors hover:text-orange"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between py-3 lg:hidden">
              <span className="eyebrow text-muted">{edition ?? 'The record'}</span>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="-mr-1.5 flex size-9 items-center justify-center text-ink transition-colors hover:text-orange"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Condensed bar ──────────────────────────────────────────── */}
      <AnimatePresence>
        {condensed && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[70] border-b border-ink bg-paper/95 backdrop-blur-sm"
          >
            <div className="shell flex h-14 items-center justify-between gap-6">
              <a href="/" className="headline text-xl text-ink" aria-label="Home">
                SV<span className="text-orange">.</span>
              </a>

              <ul className="hidden list-none items-center gap-0 p-0 lg:flex">
                {links.map((l, i) => (
                  <li key={l.name} className="flex items-center">
                    {i > 0 && (
                      <span aria-hidden="true" className="px-3.5 text-orange">
                        ·
                      </span>
                    )}
                    <a
                      href={l.absolute ? l.href : resolve(l)}
                      className="eyebrow text-sm font-bold text-ink transition-colors hover:text-orange"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="-mr-1.5 flex size-9 items-center justify-center text-ink transition-colors hover:text-orange lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile index ───────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[95] flex flex-col bg-paper lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Index"
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-ink px-6">
              <span className="headline text-xl text-ink">
                SV<span className="text-orange">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-1.5 flex size-10 items-center justify-center text-ink transition-colors hover:text-orange"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Index">
              {links.map((l, i) => (
                <motion.a
                  key={l.name}
                  href={l.absolute ? l.href : resolve(l)}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="headline flex items-baseline gap-4 border-b border-rule py-4 text-3xl text-ink"
                >
                  <span className="eyebrow mono text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {l.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
