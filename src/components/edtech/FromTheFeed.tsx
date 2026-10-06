import { ArrowUpRight, Instagram } from 'lucide-react';
import { Reveal } from '../motion/Reveal';
import { instagram, posts } from '../../data/posts';
import { LogoDrift } from '../sketch/LogoDrift';

/**
 * FromTheFeed
 *
 * Two Instagram posts, republished here as clippings and linked back to the
 * account they went out from.
 *
 * Each card prints the post's own line as a headline above the frame, in the
 * paper's type. That is not decoration: an embed is somebody else's document,
 * it can be slow, it can be blocked, and the account could go private tomorrow
 * — and in every one of those cases this section still reads as a section,
 * because the argument each post makes is set here in ink.
 *
 * The frames are Instagram's /embed route, which renders on its own without the
 * official embed.js. That matters twice over: no third-party script runs on
 * this site, and the content security policy can stay as narrow as it is —
 * frames from Instagram, and scripts from nowhere but here.
 *
 * Each frame is capped at a measure Instagram's own layout fits inside. Their
 * embed is roughly as tall as it is wide plus a fixed header and caption, so a
 * wider card would simply have its caption cut off at the bottom; the cap is
 * what keeps every post whole.
 */
export const FromTheFeed = () => {
  if (posts.length === 0) return null;

  return (
    <section
      id="feed"
      aria-labelledby="feed-heading"
      className="relative scroll-mt-20 overflow-hidden border-b border-ink bg-paper py-14 sm:py-20"
    >
      {/* The places these went out to, drifting past behind them. */}
      <div className="absolute inset-0 opacity-[0.11]">
        <LogoDrift />
      </div>

      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow text-orange">From the feed</p>
          <h2
            id="feed-heading"
            className="headline mt-4 text-[clamp(2rem,7vw,5rem)] leading-[0.88] tracking-[-0.03em] text-ink"
          >
            PHYSICS, POSTED
            <br />
            IN <span className="text-orange">PUBLIC</span>
          </h2>
          <div className="rule-double mt-7" />
          <p className="deck mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.4rem)] leading-snug text-ink">
            The same argument, made where people actually are. Two posts, printed
            here as they went out.
          </p>
        </Reveal>

        {/* Held to a narrower measure than the shell: two cards capped at Instagram's
            own width, spread across the full page, would sit at opposite ends of it
            like a pair of strangers. */}
        <ul className="mt-12 grid max-w-3xl list-none grid-cols-[minmax(0,1fr)] gap-10 p-0 sm:grid-cols-2 sm:gap-8">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={0.1 + i * 0.08} className="min-w-0">
              <figure className="mx-auto w-full max-w-[21rem] sm:mx-0">
                <figcaption>
                  <p className="eyebrow mono text-muted">{post.byline}</p>
                  <h3 className="headline mt-3 text-xl leading-tight text-ink sm:text-2xl">
                    {post.head}
                  </h3>
                  <p className="mt-2.5 text-sm leading-snug text-ink-soft">{post.note}</p>
                </figcaption>

                <div className="mt-5 h-[32rem] overflow-hidden border-2 border-ink bg-paper-white">
                  <iframe
                    src={`https://www.instagram.com/p/${post.id}/embed`}
                    title={post.head}
                    loading="lazy"
                    scrolling="no"
                    allowFullScreen
                    className="size-full border-0"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.24}>
          <a
            href={instagram}
            target="_blank"
            rel="me noopener noreferrer"
            className="group mt-12 flex items-center justify-between gap-4 border-2 border-ink bg-paper-raised px-5 py-4 transition-colors hover:bg-ink sm:px-7 sm:py-5"
          >
            <span className="flex min-w-0 items-center gap-4">
              <Instagram
                className="size-6 shrink-0 text-orange"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="eyebrow block text-orange">Instagram</span>
                <span className="headline mt-1 block truncate text-lg text-ink transition-colors group-hover:text-paper sm:text-xl">
                  Follow the whole feed
                </span>
              </span>
            </span>
            <ArrowUpRight
              className="size-5 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
