import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { PdfFrame } from './paper/PdfFrame';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { articles, writingHome } from '../data/writing';

/**
 * Writing
 *
 * Published essays, cut out and pinned the same way the papers are — each one
 * showing the top of its own page, so the card carries the article's real
 * headline and byline rather than a description of them.
 *
 * Every card links to the article itself rather than to the profile, and
 * nothing appears here that has not actually been published.
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
        mark="A"
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
        lede="Essays on what is actually broken in exam preparation, and what interactive-first learning does differently."
      />

      <ul className="mt-12 grid list-none gap-6 p-0 lg:grid-cols-2">
        {articles.map((post, i) => (
          <Reveal as="li" key={post.href} delay={i * 0.08}>
            <figure className="flex h-full flex-col">
              {post.cover && (
                <PdfFrame
                  src={post.cover}
                  alt={post.title}
                  label={`${post.href.split('/').pop()?.split('-').slice(0, -1).join('-') || 'essay'}.pdf`}
                  meta={post.readTime}
                  aspect="aspect-[16/11]"
                />
              )}

              <figcaption className="mt-5 flex flex-1 flex-col border-t-2 border-ink pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow truncate text-orange">Medium</span>
                  <time dateTime={post.date} className="eyebrow shrink-0 text-muted">
                    {post.display}
                  </time>
                </div>

                <h3 className="headline mt-3.5 text-xl leading-snug text-ink sm:text-2xl">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{post.note}</p>

                <ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
                  {post.tags.map((t) => (
                    <li key={t}>
                      <span className="chip">{t}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid group mt-6 self-start"
                >
                  Read on Medium
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <p className="eyebrow mt-6 text-muted">
        Showing {articles.length} of {articles.length} essays
      </p>
    </div>
  </section>
);
