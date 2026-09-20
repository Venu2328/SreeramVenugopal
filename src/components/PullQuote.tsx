import { Reveal } from './motion/Reveal';

/**
 * PullQuote
 *
 * The inverted spread a paper runs to break up a long column of grey — one
 * sentence set enormous on a dark slab, with nothing else on the page. It is
 * the only full-bleed dark band on the front page, which is what gives it its
 * effect; a second one would cost the first its weight.
 */
export const PullQuote = () => (
  <section aria-label="Pull quote" className="border-b border-ink bg-slab py-20 sm:py-28">
    <div className="shell max-w-4xl">
      <Reveal>
        <div className="h-px w-full bg-orange" />

        <blockquote className="mt-10">
          <p className="headline text-[clamp(1.9rem,5.6vw,4.25rem)] leading-[1.02] text-on-slab">
            “Physics taught me how systems work. The council taught me that people are one.”
          </p>
        </blockquote>

        <div className="mt-10 flex items-center gap-5">
          <span aria-hidden="true" className="h-px flex-1 bg-on-slab/25" />
          <span className="eyebrow text-on-slab/60">Sreeram Venugopal · Puducherry</span>
          <span aria-hidden="true" className="h-px flex-1 bg-on-slab/25" />
        </div>
      </Reveal>
    </div>
  </section>
);
