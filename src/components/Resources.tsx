import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { articles, writingHome } from '../data/writing';

/**
 * Published writing, straight from the Medium feed. Every card links to the
 * article itself rather than to the profile, and nothing appears here that
 * hasn't actually been published.
 */
export const Resources = () => {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell max-w-3xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            index="08"
            kicker="Writing"
            title={
              <span id="writing-heading">
                Notes on <Accent>learning</Accent>.
              </span>
            }
          />
          <Reveal delay={0.1}>
            <a
              href={writingHome}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw eyebrow inline-flex items-center gap-2 text-ink"
            >
              All writing
              <ExternalLink className="size-3.5 text-red" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-16 list-none border-t border-line p-0">
          {articles.map((post, i) => (
            <Reveal as="li" key={post.href} delay={i * 0.08}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block border-b border-line py-8 transition-colors hover:bg-card sm:py-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-red transition-transform duration-500 group-hover:scale-y-100"
                />

                <div className="flex items-start gap-5 pl-5 pr-2 sm:gap-8 sm:pl-7">
                  <span className="display shrink-0 text-3xl leading-none text-red sm:text-4xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <time dateTime={post.date} className="eyebrow text-muted">
                        {post.display}
                      </time>
                      {post.tags.map((t) => (
                        <span key={t} className="eyebrow text-muted">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="display mt-3 text-xl leading-snug text-ink transition-colors group-hover:text-red sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{post.note}</p>
                  </div>

                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-red group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
