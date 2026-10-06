import { useEffect, useRef, useState } from 'react';
import { Pause, Play, VolumeX } from 'lucide-react';
import { channel, reels } from '../../data/edtech';

/**
 * ProductReel
 *
 * The app, running. Both reels side by side and both playing at once, the way
 * two phones propped on a desk would — no tab to find, no reel waiting behind
 * another, and nothing to press before anything happens.
 *
 * The pair sits inside one capped measure rather than filling the column. Two
 * 9:16 frames given half of a wide column each would each be taller than the
 * screen, so the measure is what is capped and the frames take their height
 * from it. That holds at every width: the two stay side by side on a phone,
 * narrower but still a pair.
 *
 * They loop for as long as the page is open. YouTube's own `loop` is no use
 * here — it needs the video named as a single-item playlist, and a player in
 * playlist mode quietly ignores `controls=0`, which brings back the title bar
 * and the skip buttons this frame exists to avoid. So the players are asked to
 * loop over the player API instead: a short handshake, then a restart the
 * moment either one reports that it has ended. A slow nudge runs underneath as
 * insurance, because a reel that silently stops on its last frame is the one
 * failure worth spending a few lines to rule out.
 *
 * Playback starts when the pair reaches the screen, not on load. Mounting two
 * YouTube players at the top of the document would have the page fetching them
 * for a reader who may never scroll this far.
 *
 * Silent, as everywhere else on this site: a browser refuses to start a video
 * carrying sound, so muted is the only kind that can begin on its own.
 */
const ORIGIN = 'https://www.youtube-nocookie.com';

/** How often the players are nudged, if the handshake never landed at all. */
const NUDGE = 4000;

export const ProductReel = () => {
  const ref = useRef<HTMLUListElement>(null);
  const frames = useRef<(HTMLIFrameElement | null)[]>([]);
  const [playing, setPlaying] = useState(false);

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
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Keeping both reels running. */
  useEffect(() => {
    if (!playing) return;

    const send = (frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) =>
      frame?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        ORIGIN,
      );

    /* A player with the API switched on stays silent until the page asks it to
       report; this is that request. */
    const listen = (frame: HTMLIFrameElement | null) =>
      frame?.contentWindow?.postMessage(
        JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
        ORIGIN,
      );

    let heard = false;
    let nudge = 0;

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return;

      let data: { info?: { playerState?: number } };
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (!data?.info) return;

      const frame = frames.current.find((f) => f?.contentWindow === e.source);
      if (!frame) return;

      /* The players are talking, so the fallback below is not needed. */
      heard = true;

      /* 0 is ended. Anything else is a player getting on with it. */
      if (data.info.playerState !== 0) return;
      send(frame, 'seekTo', [0, true]);
      send(frame, 'playVideo');
    };

    window.addEventListener('message', onMessage);

    const hello = window.setTimeout(() => frames.current.forEach(listen), 900);

    /*
     * The fallback, and only if the handshake never landed: `playVideo` on a
     * player that has ended starts it again, and on one that is already playing
     * does nothing. It is armed late and not at all in the normal case, because
     * a command sent to a player that is running flashes its controls back up
     * on a phone — which is the one thing these frames are built to avoid.
     */
    const arm = window.setTimeout(() => {
      if (heard) return;
      nudge = window.setInterval(
        () => frames.current.forEach((f) => send(f, 'playVideo')),
        NUDGE,
      );
    }, 6000);

    return () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(hello);
      window.clearTimeout(arm);
      window.clearInterval(nudge);
    };
  }, [playing]);

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
    /* Only so the page can tell them to start again. Nothing is read back. */
    enablejsapi: '1',
  });

  return (
    <figure>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-muted">The app, running</p>
        <p className="eyebrow text-muted">Both reels · silent · on a loop</p>
      </div>

      <div className="rule-hair mt-3" />

      {/* One capped measure holding the pair, so the frames stay a sane height
          whatever the column around them is doing. */}
      <ul
        ref={ref}
        className="mx-auto mt-5 grid w-full max-w-[29rem] list-none grid-cols-2 gap-2.5 p-0"
      >
        {reels.map((reel, i) => (
          <li key={reel.id} className="min-w-0">
            <div className="relative aspect-[9/16] w-full border-2 border-ink bg-slab">
              {playing ? (
                /* Inert on purpose. Hovering a YouTube embed summons its title
                   bar, its related-video rail and an unmute button; taking
                   pointer events away removes all three, and the controls below
                   sit outside the frame where they still work. */
                <iframe
                  ref={(el) => {
                    frames.current[i] = el;
                  }}
                  src={`${ORIGIN}/embed/${reel.id}?${params}`}
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
                  <span className="flex size-12 items-center justify-center bg-orange text-on-orange transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-5 translate-x-0.5 fill-current" />
                  </span>
                </button>
              )}

              <span className="eyebrow absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-slab/85 px-1.5 py-1 text-[0.55rem] text-on-slab/80">
                <VolumeX className="size-2.5" aria-hidden="true" />
                Silent
              </span>
            </div>

            <p className="headline mt-2.5 text-sm leading-snug text-ink">{reel.title}</p>
            <p className="mt-1 text-xs leading-snug text-ink-soft">{reel.note}</p>

            <a
              href={`https://youtube.com/shorts/${reel.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw eyebrow mt-2 inline-block text-muted transition-colors hover:text-ink"
            >
              With sound
            </a>
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 border-t border-rule pt-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* Pausing unmounts both players, which is the only way to stop one
              whose own controls have been suppressed. */}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="eyebrow inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            {playing ? (
              <>
                <Pause className="size-3 fill-current" aria-hidden="true" />
                Pause both
              </>
            ) : (
              <>
                <Play className="size-3 fill-current" aria-hidden="true" />
                Play both
              </>
            )}
          </button>

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
