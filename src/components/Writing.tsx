import { ArrowUpRight, ExternalLink, FileText, Hash } from 'lucide-react';
import { SectionRule } from './paper/SectionRule';
import { PdfFrame } from './paper/PdfFrame';
import { Accent } from './Accent';
import { Reveal } from './motion/Reveal';
import { SketchLayer } from './sketch/Sketch';
import { PencilAndPins } from './sketch/figures';
import { articles, writingHome, type Article } from '../data/writing';

/**
 * Writing
 *
 * Published essays, set as cards in a resource index rather than as a column of
 * figures: each one opens by saying what kind of thing it is and when it ran,
 * then gives the headline, the argument it makes, and what it is filed under.
 *
 * One card to a row, with the article's own opening page standing beside the
 * text rather than above it. Two essays side by side would each get half a
 * measure and neither would get a headline worth reading; across the full width
 * the headline can be set at the size it deserves and the page still shows what
 * the essay actually looks like.
 *
 * The card is not itself a link. The opening page inside it opens to full size
 * on a click, and a button inside a link is both invalid and unusable — so the
 * link is the one at the foot, where it can be aimed at.
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

      {/*
        A three-column index, with the lead essay held across two of them.
        Equal cards in a row give every piece the same weight and let the reader
        decide which matters, which is the one job an index should not hand
        over. The lead card gets the width for a headline worth reading and the
        room to show the page itself; the rest are read at a glance.
      */}
      <ul className="mt-12 grid list-none grid-cols-[minmax(0,1fr)] gap-6 p-0 lg:grid-cols-3 lg:gap-7">
        {articles.map((post, i) => (
          <Reveal
            as="li"
            key={post.href}
            delay={i * 0.08}
            className={`min-w-0 ${i === 0 ? 'lg:col-span-2' : ''}`}
          >
            <Card post={post} lead={i === 0} />
          </Reveal>
        ))}
      </ul>

      <p className="eyebrow mt-6 text-muted">
        Showing {articles.length} of {articles.length} essays
      </p>
    </div>
  </section>
);

/**
 * One essay.
 *
 * The lead sets the page beside the type; the rest set it above, because a
 * single column has no room for both side by side and the opening page is what
 * tells you an essay is a real published thing rather than a line in a list.
 *
 * The card is not itself a link. The opening page inside it opens to full size
 * on a click, and a button inside a link is both invalid and unusable — so the
 * link is the one at the foot, where it can be aimed at.
 */
const Card = ({ post, lead }: { post: Article; lead: boolean }) => {
  const page = post.cover && (
    <PdfFrame
      src={post.cover}
      alt={post.title}
      label={`${
        post.href.split('/').pop()?.split('-').slice(0, -1).join('-') || 'essay'
      }.pdf`}
      /* The card's own head already carries the reading time; printing it again
         two centimetres below says the same thing twice. */
      aspect="aspect-[16/11]"
    />
  );

  return (
    <article className="group flex h-full flex-col border-2 border-ink bg-paper-raised transition-colors hover:bg-paper-white">
      {/* What it is, and when. An index says the kind of a thing before it says
          what the thing is called. */}
      <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3.5 sm:px-6">
        <span className="flex items-center gap-2.5">
          <FileText className="size-4 shrink-0 text-orange" aria-hidden="true" />
          <span className="eyebrow text-muted">Article</span>
        </span>
        <span className="flex items-center gap-5">
          {post.readTime && (
            <span className="eyebrow hidden text-muted sm:inline">{post.readTime}</span>
          )}
          <time dateTime={post.date} className="eyebrow shrink-0 text-muted">
            {post.display}
          </time>
        </span>
      </div>

      {lead ? (
        <div className="grid flex-1 grid-cols-[minmax(0,1fr)] gap-8 px-5 py-7 sm:px-7 sm:py-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-11">
          <Body post={post} lead />
          {page && <div className="min-w-0 lg:self-center">{page}</div>}
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          {page && <div className="border-b border-rule p-5 sm:p-6">{page}</div>}
          <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-7">
            <Body post={post} lead={false} />
          </div>
        </div>
      )}
    </article>
  );
};

/** The headline, the argument, what it is filed under, and the way in. */
const Body = ({ post, lead }: { post: Article; lead: boolean }) => (
  <div className="flex min-w-0 flex-1 flex-col">
    <h3
      className={`headline text-ink ${
        lead
          ? 'text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08]'
          : 'text-xl leading-snug sm:text-2xl'
      }`}
    >
      {post.title}
    </h3>

    <p className={`leading-relaxed text-ink-soft ${lead ? 'mt-4 max-w-xl' : 'mt-3 text-sm'}`}>
      {post.note}
    </p>

    {/* Filed under. Set as a row of marks rather than as boxes — a card that
        ends in eight bordered chips ends in a fence. */}
    <ul className={`flex list-none flex-wrap gap-x-5 gap-y-2 p-0 ${lead ? 'mt-6' : 'mt-5'}`}>
      {post.tags.map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <Hash className="size-3 shrink-0 text-orange" aria-hidden="true" />
          <span className="eyebrow text-muted">{t}</span>
        </li>
      ))}
    </ul>

    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-solid self-start ${lead ? 'mt-8' : 'mt-6'}`}
    >
      Read on Medium
      <ArrowUpRight
        className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  </div>
);
