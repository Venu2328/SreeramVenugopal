/**
 * NewsPhoto
 *
 * A photograph as a newspaper prints one: no colour, contrast pushed until the
 * midtones separate, and a halftone dot screen laid over the top so it reads as
 * something that went through a press rather than an image file.
 *
 * The screen is a real repeating dot pattern at 3.5px, blended in multiply and
 * held at low opacity — enough to catch the light at reading distance without
 * turning the face into texture. It is suppressed on very small screens, where
 * the dots would be larger than the features they sit on.
 *
 * `zoom` and `focal` exist because the photographs available are snapshots
 * rather than sittings. `object-fit: cover` can only choose which edges to
 * lose; it cannot push in past the frame. Scaling the image about a focal
 * point can, which is what turns a full-length phone snapshot into the
 * head-and-shoulders crop a lead story needs.
 *
 * The caption rule beneath is part of the component because a press photo
 * without a credit line is just a picture.
 */
export const NewsPhoto = ({
  src,
  alt,
  caption,
  credit,
  className = '',
  objectPosition = '50% 22%',
  zoom = 1,
  focal = '50% 30%',
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  className?: string;
  objectPosition?: string;
  /** Scale factor applied about `focal`. 1 leaves the framing to object-fit. */
  zoom?: number;
  /** The point the zoom pushes in on, as a transform-origin. */
  focal?: string;
  priority?: boolean;
}) => (
  <figure className={className}>
    <div className="relative overflow-hidden bg-paper-raised">
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className="block h-full w-full object-cover grayscale contrast-[1.18] brightness-[1.02]"
        style={{
          objectPosition,
          transform: zoom === 1 ? undefined : `scale(${zoom})`,
          transformOrigin: focal,
        }}
      />
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-0 hidden opacity-[0.14] mix-blend-multiply sm:block"
      />
    </div>

    {(caption || credit) && (
      <figcaption className="mt-2.5 flex items-baseline justify-between gap-4 border-t border-rule pt-2">
        {caption && <span className="eyebrow text-muted">{caption}</span>}
        {credit && <span className="eyebrow shrink-0 text-muted/70">{credit}</span>}
      </figcaption>
    )}
  </figure>
);
