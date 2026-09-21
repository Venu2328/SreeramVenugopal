import { FileText } from 'lucide-react';
import { certificates } from '../../data/certificates';

/**
 * CertificateStripe
 *
 * A belt of every certificate, running past the pile beside it. The pile shows
 * seven; this shows all of them, and keeps showing them.
 *
 * It runs the opposite way to the logo band at the top of the page, so the two
 * read as a mechanism turning rather than as the same trick used twice. It
 * stops on hover, because the sheets are worth stopping on.
 *
 * While there are no scans it prints reserved slots instead of collapsing, so
 * the page keeps its shape.
 */
export const CertificateStripe = () => {
  const has = certificates.length > 0;
  const items = has ? certificates : Array.from({ length: 5 });

  const Belt = ({ clone = false }: { clone?: boolean }) => (
    <ul
      aria-hidden={clone || undefined}
      className="flex shrink-0 list-none items-stretch gap-4 p-0 pr-4"
    >
      {items.map((item, i) => {
        const cert = has ? (item as (typeof certificates)[number]) : undefined;
        return (
          <li key={cert?.src ?? i} className="w-[9rem] shrink-0 sm:w-[10.5rem]">
            {cert ? (
              <figure className="clipping h-full">
                <img
                  src={cert.src}
                  alt={`${cert.title} — ${cert.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover object-top"
                />
                <figcaption className="border-t border-rule px-3 py-2">
                  <p className="eyebrow truncate text-muted">{cert.issuer}</p>
                </figcaption>
              </figure>
            ) : (
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-2 border border-dashed border-rule-strong bg-paper/60">
                <FileText className="size-5 text-rule-strong" aria-hidden="true" />
                <span className="eyebrow text-muted">Scan</span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-muted">Every certificate</p>
        <p className="eyebrow text-muted">
          {has ? `${certificates.length} on file` : 'Awaiting scans'}
        </p>
      </div>

      <div className="rule-hair mt-3" />

      <div className="marquee mt-5 overflow-hidden">
        <div className="marquee-track-reverse">
          <Belt />
          <Belt clone />
        </div>
      </div>

      <p className="eyebrow mt-3 text-muted">Hover to stop</p>
    </div>
  );
};
