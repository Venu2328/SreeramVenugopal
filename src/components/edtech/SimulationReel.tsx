import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { clips, type Clip } from '../../data/edtech';

/**
 * SimulationReel
 *
 * The clips of the simulations themselves, in a rail you can push along —
 * by dragging, by swiping, by the arrows, or by the keyboard, since a rail that
 * only answers to a mouse strands half the people using it.
 *
 * Each clip plays silently and on a loop. That is not a stylistic choice: a
 * browser refuses to start a video carrying sound, so muted is the only kind
 * that can play on its own — and a page that begins talking at a reader is
 * rude anyway. The sound was never the point here; the motion is.
 *
 * The reel prints while `clips` is empty, holding reserved slots, so the page
 * reads as finished-and-waiting rather than broken. Adding entries to
 * `src/data/edtech.ts` replaces them.
 */
export const SimulationReel = () => {
  const rail = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ x: number; left: number } | null>(null);

  /** Pushes the rail by one slot, whichever way. */
  const nudge = (dir: -1 | 1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const hasClips = clips.length > 0;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-muted">The simulations</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous clip"
            className="flex size-9 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next clip"
            className="flex size-9 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="rule-hair mt-3" />

      {/*
        `tabIndex` and the scrollbar-free overflow make this a real scroll
        container: arrow keys move it, a trackpad swipes it, and the pointer
        handlers below add click-and-drag for mice, which have no swipe.
      */}
      <div
        ref={rail}
        tabIndex={0}
        role="group"
        aria-label="Simulation clips"
        onPointerDown={(e) => {
          const el = rail.current;
          if (!el) return;
          setDrag({ x: e.clientX, left: el.scrollLeft });
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const el = rail.current;
          if (!el || !drag) return;
          el.scrollLeft = drag.left - (e.clientX - drag.x);
        }}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
        className={`mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          drag ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {hasClips
          ? clips.map((c) => <ClipSlot key={c.src} c={c} />)
          : [0, 1].map((i) => <ReservedSlot key={i} />)}
      </div>

      <p className="eyebrow mt-1 text-muted">
        {hasClips
          ? `${clips.length} in the rail · drag to browse`
          : 'Clips land here shortly'}
      </p>
    </div>
  );
};

/*
 * Slots are landscape, because the app is. Screenshots and recorded
 * simulations both come off a desktop viewport, and a portrait slot would crop
 * the middle out of either one.
 */
const ClipSlot = ({ c }: { c: Clip }) => {
  const isVideo = /\.(mp4|webm|mov)$/i.test(c.src);

  return (
    <figure className="w-[20rem] shrink-0 snap-start border border-ink bg-paper-white sm:w-[26rem]">
      {isVideo ? (
        <video
          src={c.src}
          poster={c.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          // A dragged rail should not also be arming a click on the video.
          draggable={false}
          className="pointer-events-none block aspect-[16/10] w-full bg-paper-white object-contain"
        />
      ) : (
        <img
          src={c.src}
          alt={c.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none block aspect-[16/10] w-full bg-paper-white object-contain"
        />
      )}
      <figcaption className="border-t border-ink px-4 py-3">
        <p className="eyebrow truncate text-ink">{c.title}</p>
      </figcaption>
    </figure>
  );
};

/** The shape of a clip, held open until there is one to put in it. */
const ReservedSlot = () => (
  <div className="flex w-[16rem] shrink-0 snap-start flex-col items-center justify-center gap-3 border border-dashed border-rule-strong bg-paper/60 px-6 py-16 text-center sm:w-[18rem]">
    <Film className="size-6 text-rule-strong" aria-hidden="true" />
    <p className="eyebrow text-muted">Simulation clip</p>
  </div>
);
