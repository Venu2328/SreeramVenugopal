import { type ReactNode } from 'react';

/**
 * The drawn layer.
 *
 * Every section of this paper carries a figure behind its type — a pencil and
 * pins over the notes, papers thrown across the research brief, a shelf of
 * spines behind the books, a hall of heads behind the speaking. They are the
 * same thing a staff artist drew for a page that could only be printed in
 * black: line, no tone, no colour.
 *
 * Each figure is drawn as clean geometry and then pushed out of true by a
 * turbulence filter, which is what separates a drawing from a diagram. Doing it
 * in the filter rather than in the coordinates means the wobble is different at
 * every point along every stroke, the way a hand is, instead of being the same
 * five kinks repeated.
 *
 * Nothing here is content. The whole layer is hidden from assistive technology
 * and takes no pointer events, so it cannot be tabbed to, read out, selected or
 * clicked through.
 */

/** The roughening filter, declared once per figure under its own name. */
export const Rough = ({ id, scale = 3 }: { id: string; scale?: number }) => (
  <defs>
    <filter id={id} x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.028"
        numOctaves="3"
        seed="7"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
);

/**
 * Places a figure behind a section.
 *
 * `className` carries the position and the size, because where a figure sits is
 * a decision about that one section and nothing else — a shelf of books wants
 * the foot of the page, a hall of heads wants the whole width of it.
 */
export const SketchLayer = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div aria-hidden="true" className={`sketch ${className}`}>
    {children}
  </div>
);
