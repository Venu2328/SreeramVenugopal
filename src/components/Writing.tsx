import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { PdfFrame } from './paper/PdfFrame';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { SketchLayer } from './sketch/Sketch';
import { PencilAndPins } from './sketch/figures';
import { DemoReel } from './writing/DemoReel';
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
export const Writing = ({ lead = false }: { lead?: boolean }) => (
  <section
    id="writing"
    aria-labelledby="writing-heading"
    className="relative scroll-mt-20 overflow-hidden border-b border-ink bg-paper py-16 sm:py-24 flex min-h-[100svh] flex-col justify-center"
  >
    {/* The desk these were written at, drawn across the foot of the page. */}
    <SketchLayer className="-right-16 bottom-0 w-[30rem] opacity-[0.13] sm:-right-10 sm:w-[40rem] lg:w-[46rem]">
      <PencilAndPins />
    </SketchLayer>

    <div className="shell relative z-10">
      <SectionRule
        lead={lead}
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

      <Reveal delay={0.06} className="mt-12">
        <DemoReel />
      </Reveal>

      {/*
        The essays, set as cards rather than as a column of figures.
        Each one is a bordered panel that opens on its own kind and date — the
        way a resource index lists what it holds — then the article's own
        opening page, then the headline, the argument and its tags. The whole
        card is the link; the button at the foot is there for anyone who wants
        something to aim at rather than a region.
      */}
      <ul className="mt-14 grid list-none grid-cols-[minmax(0,1fr)] gap-6 p-0 lg:grid-cols-2 lg:gap-7">
        {articles.map((post, i) => (
          <Reveal as="li" key={post.href} delay={i * 0.08} className="min-w-0">
            <article className="group flex h-full flex-col border-2 border-ink bg-paper-raised transition-colors hover:bg-paper-white">
              {/* The kind, and when. A resource index says what a thing is
                  before it says what it is called. */}
              <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3.5">
                <span className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-orange" aria-hidden="true" />
                  <span className="eyebrow text-muted">Article</span>
                </span>
                <span className="flex items-center gap-4">
                  {post.readTime && (
                    <span className="eyebrow hidden text-muted sm:inline">
                      {post.readTime}
                    </span>
                  )}
                  <time dateTime={post.date} className="eyebrow shrink-0 text-muted">
                    {post.display}
                  </time>
                </span>
              </div>

              {post.cover && (
                <div className="border-b border-rule p-5 pb-0">
                  <PdfFrame
                    src={post.cover}
                    alt={post.title}
                    label={`${
                      post.href.split('/').pop()?.split('-').slice(0, -1).join('-') ||
                      'essay'
                    }.pdf`}
                    /* The card's own head already carries the reading time;
                       printing it again on the document strip just says the
                       same thing twice, two centimetres apart. */
                    aspect="aspect-[16/11]"
                  />
                  <div className="h-5" />
                </div>
              )}

              <div className="flex flex-1 flex-col px-5 py-6">
                <h3 className="headline text-xl leading-snug text-ink sm:text-2xl">
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
                  className="btn btn-solid mt-6 self-start"
                >
                  Read on Medium
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <p className="eyebrow mt-6 text-muted">
        Showing {articles.length} of {articles.length} essays
      </p>
    </div>
  </section>
);
