/**
 * Video and broadcast appearances.
 *
 * Each entry embeds YouTube with `start` and `end` (both in seconds), so a
 * short passage inside a long recording plays on its own rather than making a
 * viewer hunt for it.
 *
 * `autoplay` starts the clip silently as soon as the card reaches the screen.
 * Silent is not a stylistic choice — every browser blocks autoplay that carries
 * sound, so a muted clip is the only kind that can start on its own. A page
 * that begins talking at a reader is also simply rude.
 */
export type Video = {
  title: string;
  /** Where it aired, or the event it was recorded at. */
  outlet: string;
  /** The id from the URL: youtu.be/<id> or youtube.com/watch?v=<id> */
  youtubeId: string;
  /** Seconds into the video where the relevant passage begins. */
  start?: number;
  /** Seconds where it ends. Playback stops here. */
  end?: number;
  /** Plays silently, on its own, once scrolled to. */
  autoplay?: boolean;
  /** Loops the cued passage rather than stopping at `end`. */
  loop?: boolean;
  /**
   * A still to show before playback, e.g. '/media/emergency.jpg'. Without one
   * the card falls back to YouTube's own thumbnail — which, on a recording of
   * a whole debate, is often a frame of somebody else entirely.
   */
  poster?: string;
  /** One line on what is being said or shown. */
  note: string;
};

export const videos: Video[] = [
  {
    title: 'Against the Emergency',
    outlet: 'Youth Parliament · Opposition bench',
    youtubeId: 'mUIMg18RI4U',
    start: 270, // 4:30
    end: 360, //   6:00
    autoplay: true,
    loop: true,
    poster: '/thumbnail-yt1.png',
    note: 'Ninety seconds of the case against suspending a constitution — argued in opposition, on the record.',
  },
];
