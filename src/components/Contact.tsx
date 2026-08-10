import { ArrowUpRight, Mail } from 'lucide-react';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { profiles } from '../data/profiles';

const featured = ['LinkedIn', 'ORCID', 'GitHub', 'Medium', 'X', 'Instagram'];
const links = featured
  .map((name) => profiles.find((p) => p.name === name))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ground py-28 sm:py-36"
    >
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="pool pointer-events-none absolute inset-0" />

      <div className="shell relative">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-red" />
            <span className="eyebrow text-muted">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="contact-heading"
            className="display display-tight mt-8 text-[clamp(2.5rem,8vw,6rem)] text-ink"
          >
            Let's work
            <br />
            <Accent>together</Accent>.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-9 max-w-xl text-lg leading-relaxed text-ink-soft">
            Open to collaborations, consulting, and conversations about education and civic
            work. Email reaches me fastest.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <a href="mailto:sreeram23db@gmail.com" className="btn btn-solid group mt-11">
            <Mail className="size-4" aria-hidden="true" />
            sreeram23db@gmail.com
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>

        <Reveal delay={0.24}>
          <ul className="mt-16 flex list-none flex-wrap gap-x-8 gap-y-3 border-t border-line p-0 pt-8">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="link-draw eyebrow text-muted transition-colors hover:text-ink"
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
};
