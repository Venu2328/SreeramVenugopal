import { ExternalLink } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { ClippingCard } from './paper/ClippingCard';
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
        mark="E"
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
            <ClippingCard
              cover={post.cover}
              coverAlt={`Opening page of ${post.title}`}
              source="Medium"
              stamp={post.display}
              title={post.title}
              body={post.note}
              tags={post.tags}
              action={{ label: 'Read essay', href: post.href }}
              aside={
                post.readTime && (
                  <span className="eyebrow text-muted">{post.readTime}</span>
                )
              }
            />
          </Reveal>
        ))}
      </ul>

      <p className="eyebrow mt-6 text-muted">
        Showing {articles.length} of {articles.length} essays
      </p>
    </div>
  </section>
);
