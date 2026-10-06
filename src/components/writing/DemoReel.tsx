import { useEffect, useRef, useState } from 'react';
import { Pause, Play, VolumeX } from 'lucide-react';

/**
 * DemoReel
 *
 * The eleven seconds of screen recording that open the writing section — the
 * card layout this section is now set in, shown working.
 *
 * Served from this site rather than from a video platform, which is the right
 * call at this size and only at this size. The master arrived as a 6MB, 2938px
 * QuickTime with its index at the end of the file, meaning a browser had to
 * fetch the whole thing before it could show a frame. Re-encoded to the width
 * it is actually drawn at, and with the index moved to the front, it is 400KB
 * and starts on the first packets. Anything heavier belongs on YouTube, which
 * is where the product reels went.
 *
 * Silent like every other moving thing here — and the audio track is gone
 * rather than muted, so there is nothing to unmute and nothing to download.
 *
 * It starts when it reaches the screen and not before, and it loops, because a
 * demonstration that stops on its last frame is a screenshot.
 */
const SRC = '/writing-demo.mp4';
const POSTER = '/writing-demo-poster.jpg';

export const DemoReel = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* A clip that starts itself is what this preference opts out of. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="relative">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-orange">The layout, running</p>
        <p className="eyebrow text-muted">11 seconds · silent</p>
      </div>

      <div className="rule-hair mt-3" />

      <div className="relative mt-5 border-2 border-ink bg-slab">
        <video
          ref={ref}
          src={SRC}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          /* The recording is 2938x1140; the frame takes its shape from the file
             rather than imposing one, so nothing is ever cut. */
          className="block aspect-[2938/1140] w-full object-cover"
        />

        <span className="eyebrow absolute bottom-3 right-3 flex items-center gap-1.5 bg-slab/85 px-2.5 py-1.5 text-on-slab/80">
          <VolumeX className="size-3" aria-hidden="true" />
          Silent
        </span>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule pt-4">
        <p className="text-sm leading-snug text-ink-soft">
          How the essays below are set — each one a card carrying its own kind,
          its date and what it argues.
        </p>

        <button
          type="button"
          onClick={toggle}
          className="eyebrow inline-flex shrink-0 items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          {playing ? (
            <>
              <Pause className="size-3 fill-current" aria-hidden="true" />
              Pause
            </>
          ) : (
            <>
              <Play className="size-3 fill-current" aria-hidden="true" />
              Play
            </>
          )}
        </button>
      </figcaption>
    </figure>
  );
};
