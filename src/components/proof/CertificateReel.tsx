import { FileText } from 'lucide-react';
import { certificates } from '../../data/certificates';

/**
 * CertificateReel
 *
 * A strip of film running down the edge of the page, start to end — sprocket
 * holes on both sides, frames between them, turning slowly and continuously.
 *
 * It carries every certificate rather than the seven the pile shows, which is
 * the division of labour between them: the pile is the handful thrown on the
 * desk, the reel is the whole roll.
 *
 * The frames are laid down twice and the strip slides by exactly half its own
 * height, so the loop resets on a frame where nothing has changed and the join
 * never shows. It stops on hover, because a certificate worth printing is worth
 * stopping to read.
 *
 * Hidden below xl. On a narrow screen there is no page edge to spare, and a
 * strip this size would be competing with the pile rather than framing it.
 */
export const CertificateReel = () => {
  const has = certificates.length > 0;
  /* A short roll would show its join; repeating it gives the loop some length. */
  const source = has ? certificates : Array.from({ length: 4 });
  const frames = source.length < 6 ? [...source, ...source, ...source] : source;

  const Strip = ({ clone = false }: { clone?: boolean }) => (
    <ul aria-hidden={clone || undefined} className="list-none p-0">
      {frames.map((frame, i) => {
        const cert = has ? (frame as (typeof certificates)[number]) : undefined;
        return (
          <li key={i} className="px-3 py-2">
            {cert ? (
              <figure className="bg-paper-white">
                <img
                  src={cert.src}
                  alt={clone ? '' : `${cert.title} — ${cert.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover object-top"
                />
              </figure>
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center bg-paper-white/70">
                <FileText className="size-4 text-rule-strong" aria-hidden="true" />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      aria-label="Certificate reel"
      className="marquee pointer-events-auto absolute inset-y-0 right-0 hidden w-[118px] overflow-hidden bg-slab xl:block"
    >
      {/* Sprocket holes, one edge each side of the frames. */}
      <span
        aria-hidden="true"
        className="reel-perf pointer-events-none absolute inset-y-0 left-1 z-10 w-[7px] opacity-70"
      />
      <span
        aria-hidden="true"
        className="reel-perf pointer-events-none absolute inset-y-0 right-1 z-10 w-[7px] opacity-70"
      />

      <div className="reel-track">
        <Strip />
        <Strip clone />
      </div>
    </div>
  );
};
