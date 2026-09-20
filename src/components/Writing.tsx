import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { articles, writingHome } from '../data/writing';

/**
 * Writing
 *
 * Published essays, straight from the Medium feed. Every card links to the
 * article itself rather than to the profile, and nothing appears here that
 * hasn't actually been published.
 */
export const Writing = () => (
  <section
    id="writing"
    aria-labelledby="writing-heading"
    className="scroll-mt-20 border-b border-ink bg-paper py-16 sm:py-24"
  >
    <div className="shell">
      <SectionRule
        kicker="Writing"
        mark="H"
        id="writing-heading"
        title={
          <>
            Notes on <Accent>learning</Accent>.
          </>
        }
        action={
          <a
            href={writingHome}
            target="_blank"
            rel="me noopener noreferrer"
            className="btn group"
          >
            All writing
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        }
      />

      <ul className="mt-12 list-none border-t-2 border-ink p-0">
        {articles.map((post, i) => (
          <Reveal as="li" key={post.href} delay={i * 0.08}>
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border-b border-rule py-7 transition-colors hover:bg-paper-raised sm:py-9"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-orange transition-transform duration-500 group-hover:scale-y-100"
              />

              <div className="flex items-start gap-5 pl-5 pr-2 sm:gap-8 sm:pl-7">
                <span className="headline shrink-0 text-3xl leading-none text-orange sm:text-4xl">
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

                  <h3 className="headline mt-3 text-xl leading-snug text-ink transition-colors group-hover:text-orange sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{post.note}</p>
                </div>

                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-orange group-hover:opacity-100"
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
