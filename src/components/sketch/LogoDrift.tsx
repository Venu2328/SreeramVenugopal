import {
  AtSign,
  Facebook,
  Github,
  Globe,
  Hash,
  Instagram,
  Linkedin,
  MessageCircle,
  Rss,
  Send,
  Share2,
  Twitch,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

/**
 * LogoDrift
 *
 * Ordered lines of app marks drifting behind the feed, right to left, for ever.
 *
 * Scenery, not a strip. The social strips on the speaking page are real links
 * and stop the moment a pointer lands on them, because a moving thing you are
 * trying to click is a thing you cannot use. These are the opposite: nothing
 * here is a link, nothing is announced, nothing stops. They take no pointer
 * events at all, so a reader can select the type in front of them and never
 * know the marks are there as anything but a pattern.
 *
 * Each line lays its marks down twice and slides by exactly half its own width,
 * so the loop resets on a frame where nothing has changed and the seam never
 * shows. The three lines run at three speeds, which is the only reason they
 * read as depth rather than as one animation played three times.
 */
const LINES: LucideIcon[][] = [
  [Instagram, Youtube, Linkedin, Twitter, Github, Facebook, AtSign],
  [MessageCircle, Send, Rss, Globe, Twitch, Hash, Share2],
  [Youtube, Instagram, Github, AtSign, Linkedin, Twitter, Globe],
];

const SPEED = ['drift-slow', '', 'drift-fast'];

export const LogoDrift = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="flex h-full flex-col justify-center gap-10 sm:gap-16">
      {LINES.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className={`drift ${SPEED[i]}`}>
            <Line icons={line} />
            <Line icons={line} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Line = ({ icons }: { icons: LucideIcon[] }) => (
  <div className="flex shrink-0 items-center">
    {/* Laid down three times over, so one line is long enough that the two
        copies together always overrun the widest screen. */}
    {[0, 1, 2].flatMap((pass) =>
      icons.map((Icon, i) => (
        <span key={`${pass}-${i}`} className="px-7 sm:px-12">
          <Icon
            className="size-14 shrink-0 text-ink sm:size-20"
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </span>
      )),
    )}
  </div>
);
