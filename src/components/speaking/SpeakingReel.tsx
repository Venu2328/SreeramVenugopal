import { useEffect, useState } from 'react';
import { Pause, Play, VolumeX } from 'lucide-react';
import { videos, type Video } from '../../data/media';

/**
 * SpeakingReel
 *
 * The footage. One clip is set large as the lead; anything after it prints
 * underneath in a row, the way a channel shows a feature and then its backlist.
 *
 * Clips are cued rather than embedded whole. Each entry carries `start` and
 * `end` in seconds, so the passage that matters opens on itself instead of
 * asking a viewer to go looking for it inside an hour of footage.
 */
export const SpeakingReel = () => {
  if (videos.length === 0) return null;

  const [lead, ...rest] = videos;

  return (
    <div>
      <p className="eyebrow text-muted">On the stage</p>
      <div className="rule-hair mt-3" />

      <div className="mt-6">
        <VideoCard v={lead} />
      </div>

      {rest.length > 0 && (
        <ul className="mt-5 grid list-none gap-5 p-0 sm:grid-cols-2">
          {rest.map((v, i) => (
            <li key={v.youtubeId + i}>
              <VideoCard v={v} compact />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/** mm:ss for a caption. Only shown when the clip is actually cued. */
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/**
 * An autoplaying clip, muted and cued.
 *
 * It starts as soon as the page loads rather than waiting to be scrolled to, so
 * the clip is already running by the time a reader arrives at it.
 *
 * YouTube's own controls are suppressed, because they carry an unmute button
 * and this clip is meant to stay silent. Suppressing them would normally strand
 * a viewer with no way to stop moving content — so the card supplies its own
 * control, which stops playback by unmounting the player outright.
 *
 * Playback begins on the client, never in the prerendered markup, so a crawler
 * receives the caption and the credit rather than an embed it cannot read.
 */
const VideoCard = ({ v, compact = false }: { v: Video; compact?: boolean }) => {
  const [playing, setPlaying] = useState(false);
  /* Bumping this remounts the iframe, which is how the clip loops — see below. */
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!v.autoplay) return;

    // Motion that starts by itself is exactly what this preference opts out of;
    // those visitors get the still and the play button instead.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    setPlaying(true);
  }, [v.autoplay]);

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    autoplay: '1',
    mute: '1',
    controls: '0',
    disablekb: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
  });
  if (v.start !== undefined) params.set('start', String(v.start));
  if (v.end !== undefined) params.set('end', String(v.end));

  /*
   * YouTube's own `loop` needs the video named as a single-item `playlist`,
   * and a player in playlist mode quietly ignores `controls=0` — it brings back
   * the title bar, the skip buttons and the related-video rail, which is the
   * entire thing this card is built to avoid.
   *
   * So the clip keeps its own clock. When the cued passage is up, the player is
   * either remounted (looping it) or dropped for the still frame — which also
   * means YouTube's end screen, with its suggestions for what to watch next,
   * never gets the chance to appear.
   */
  const span = v.start !== undefined && v.end !== undefined ? v.end - v.start : undefined;

  useEffect(() => {
    if (!playing || span === undefined) return;
    const timer = window.setTimeout(
      () => (v.loop ? setCycle((c) => c + 1) : setPlaying(false)),
      (span + 1) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [playing, cycle, span, v.loop]);

  const embed = `https://www.youtube-nocookie.com/embed/${v.youtubeId}?${params}`;
  const watch = `https://www.youtube.com/watch?v=${v.youtubeId}${
    v.start !== undefined ? `&t=${v.start}s` : ''
  }`;

  return (
    <figure className="flex h-full flex-col border border-ink bg-paper-white">
      <div className="relative aspect-video border-b border-ink bg-slab">
        {playing ? (
          /* The player is deliberately inert. Hovering a YouTube embed summons
             its title bar, its related-video rail and — the thing this card is
             specifically meant not to offer — an unmute button. Taking pointer
             events away from the frame removes all three at once, and the card
             supplies its own pause control below, outside the iframe. */
          <iframe
            key={cycle}
            src={embed}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="pointer-events-none absolute inset-0 size-full"
          />
        ) : (
          /* The still is ours or it is nothing. YouTube's own thumbnail for a
             recording of a whole event is a frame of somebody else entirely,
             so an entry without a `poster` is typeset instead of borrowing one. */
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full cursor-pointer"
            aria-label={`Play: ${v.title}`}
          >
            {v.poster ? (
              <>
                <img
                  src={v.poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  /* Posters are taller than 16:9, so cover crops top and bottom.
                     Biasing upward keeps headroom above the speaker rather than
                     shaving the crown of their head against the frame. */
                  className="size-full object-[50%_20%] object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <span
                  aria-hidden="true"
                  className="halftone absolute inset-0 opacity-[0.12] mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
                />
              </>
            ) : (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
                <span className="eyebrow text-on-slab/50">{v.outlet}</span>
                <span className="headline text-2xl text-on-slab/90">{v.title}</span>
              </span>
            )}
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center bg-orange text-on-orange transition-transform duration-300 group-hover:scale-110">
                <Play className="size-6 translate-x-0.5 fill-current" />
              </span>
            </span>
          </button>
        )}

        {/* Standing notice that the silence is deliberate, not a broken player. */}
        <span className="eyebrow absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slab/85 px-2.5 py-1.5 text-on-slab/80">
          <VolumeX className="size-3" aria-hidden="true" />
          Silent
        </span>
      </div>

      <figcaption className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow truncate text-orange">{v.outlet}</p>
          {v.start !== undefined && v.end !== undefined && (
            <span className="eyebrow shrink-0 text-muted">
              {clock(v.start)}–{clock(v.end)}
            </span>
          )}
        </div>

        <h3
          className={`headline mt-3 leading-snug text-ink ${
            compact ? 'text-lg' : 'text-xl sm:text-2xl'
          }`}
        >
          {v.title}
        </h3>

        {!compact && <p className="mt-2.5 flex-1 leading-relaxed text-ink-soft">{v.note}</p>}

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
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
            Watch in full, with sound
          </a>
        </div>
      </figcaption>
    </figure>
  );
};
