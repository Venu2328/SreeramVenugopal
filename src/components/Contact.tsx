import { ArrowUpRight, Mail } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import { profiles } from '../data/profiles';

const featured = ['LinkedIn', 'ORCID', 'GitHub', 'Medium', 'X', 'Instagram'];
const links = featured
  .map((name) => profiles.find((p) => p.name === name))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

/**
 * Contact
 *
 * The back page: an inverted slab carrying the one address that actually
 * reaches me, with the verified profiles set beneath it as a hairline index.
 */
export const Contact = () => (
  <section
    id="contact"
    aria-labelledby="contact-heading"
    className="scroll-mt-20 bg-slab py-20 sm:py-28"
  >
    <div className="shell">
      <Reveal>
        <p className="eyebrow text-orange">Contact</p>
        <div className="mt-3 h-px w-full bg-on-slab/25" />
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          id="contact-heading"
          className="headline headline-tight mt-8 text-[clamp(2.4rem,8vw,5.5rem)] text-on-slab"
        >
          Let&apos;s work <em className="font-display italic text-orange">together</em>.
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-slab/70">
          Open to collaborations, consulting, and conversations about education and civic
          work. Email reaches me fastest.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <a href="mailto:sreeram23db@gmail.com" className="btn btn-orange group mt-9">
          <Mail className="size-4" aria-hidden="true" />
          sreeram23db@gmail.com
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </Reveal>

      <Reveal delay={0.24}>
        <ul className="mt-14 flex list-none flex-wrap gap-x-8 gap-y-3 border-t border-on-slab/20 p-0 pt-7">
          {links.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="link-draw eyebrow text-on-slab/60 transition-colors hover:text-on-slab"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
