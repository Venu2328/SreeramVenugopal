import { useEffect, useRef, useState } from 'react';
import { Pause, Play, VolumeX } from 'lucide-react';
import { channel, reels } from '../../data/edtech';

/**
 * ProductReel
 *
 * The app, running. One take of the product in use, standing on one side of the
 * page the way a press photograph stands beside a story.
 *
 * The reels are vertical, so the frame is built around 9:16 — a letterbox would
 * put bars down both sides of a phone recording. The height is capped against
 * the viewport rather than the width against the column, because a 9:16 clip
 * given a full column would be taller than the screen on its own.
 *
 * Several reels share the one frame. Stacking them would double the height of a
 * section meant to be read in a single screen, so they are switched instead and
 * the frame never changes size.
 *
 * Playback starts when the frame reaches the screen, not on load. Mounting a
 * YouTube iframe at the top of the document would have the page fetching a
 * player for a reader who may never scroll this far, and would hand YouTube a
 * request from someone who never asked to watch anything.
 *
 * Silent, as everywhere else on this site: a browser refuses to start a video
 * carrying sound, so muted is the only kind that can begin on its own.
 */
export const ProductReel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const reel = reels[index];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Motion that starts by itself is what this preference opts out of. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlaying(true);
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Choosing a reel is choosing to watch it. */
  const choose = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  /*
   * No `loop`. YouTube's own loop needs the video named as a single-item
   * playlist, and a player in playlist mode quietly ignores `controls=0` — it
   * brings back the title bar and the skip buttons, which is the entire thing
   * this frame is built to avoid.
   */
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    disablekb: '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
  });

  const embed = `https://www.youtube-nocookie.com/embed/${reel.id}?${params}`;
  const watch = `https://youtube.com/shorts/${reel.id}`;

  return (
    <figure>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-muted">The app, running</p>

        {reels.length > 1 ? (
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Reels">
            {reels.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={r.title}
                onClick={() => choose(i)}
                className={`eyebrow mono border px-2.5 py-1 transition-colors ${
                  i === index
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule-strong text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        ) : (
          <p className="eyebrow text-muted">Screen recording</p>
        )}
      </div>

      <div className="rule-hair mt-3" />

      <div className="mt-5 flex justify-center">
        {/* 9:16, capped against the screen so the section stays one page. */}
        <div
          ref={ref}
          className="relative aspect-[9/16] h-[46svh] max-h-[520px] w-auto max-w-full border-2 border-ink bg-slab"
        >
          {playing ? (
            /* Inert on purpose. Hovering a YouTube embed summons its title bar,
               its related-video rail and an unmute button; taking pointer events
               away removes all three, and the control below sits outside the
               frame where it still works.

               Keyed by id so switching reels remounts the player rather than
               leaving the previous one running behind a new src. */
            <iframe
              key={reel.id}
              src={embed}
              title={`SciPhyLabs — ${reel.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="pointer-events-none absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play: ${reel.title}`}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="flex size-16 items-center justify-center bg-orange text-on-orange transition-transform duration-300 group-hover:scale-110">
                <Play className="size-6 translate-x-0.5 fill-current" />
              </span>
            </button>
          )}

          <span className="eyebrow absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slab/85 px-2.5 py-1.5 text-on-slab/80">
            <VolumeX className="size-3" aria-hidden="true" />
            Silent
          </span>
        </div>
      </div>

      <figcaption className="mt-5 border-t border-rule pt-4">
        <p className="headline text-base leading-snug text-ink">{reel.title}</p>
        <p className="mt-1.5 text-sm leading-snug text-ink-soft">{reel.note}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* Pausing unmounts the player, which is the only way to stop one
              whose own controls have been suppressed. */}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="eyebrow inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
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

          <a
            href={watch}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw eyebrow text-muted transition-colors hover:text-ink"
          >
            Watch with sound
          </a>

          <a
            href={channel}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw eyebrow text-muted transition-colors hover:text-ink"
          >
            The channel
          </a>
        </div>
      </figcaption>
    </figure>
  );
};
