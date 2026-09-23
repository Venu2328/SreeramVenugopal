import { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

/**
 * PdfFrame
 *
 * A document shown the way a reader expects a document to be shown: a chrome
 * bar naming the file, then the page itself under it.
 *
 * Pressing it opens the real document when there is one to open, and otherwise
 * enlarges the still in an overlay. The distinction matters: sending a reader to
 * a separate viewer to look at an image they can already see costs them their
 * place and gives nothing back — but sending them to the actual manuscript is
 * the entire point of showing its first page.
 *
 * It takes an image rather than an embedded PDF. A real `<embed>` renders a
 * different viewer in every browser, refuses to load at all on several mobile
 * ones, and cannot be styled — where an image of the page looks identical
 * everywhere and costs a fraction of the weight.
 */
export const PdfFrame = ({
  src,
  alt,
  label,
  meta,
  href,
  aspect = 'aspect-[4/3]',
}: {
  src: string;
  alt: string;
  /** The real document. Given one, the frame opens it instead of the still. */
  href?: string;
  /** The filename printed in the chrome bar. */
  label: string;
  /** Anything else the bar should carry, e.g. 'Abstract · 1 page'. */
  meta?: string;
  /** Tailwind aspect class for the page. */
  aspect?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="clipping overflow-hidden">
        {/* ── Chrome ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-ink bg-slab px-4 py-2.5">
          <span className="eyebrow shrink-0 bg-orange px-2 py-1 text-on-orange">PDF</span>
          <span className="eyebrow min-w-0 flex-1 truncate text-on-slab/80">{label}</span>
          {meta && (
            <span className="eyebrow hidden shrink-0 text-on-slab/45 sm:block">{meta}</span>
          )}
        </div>

        {/* ── The page ───────────────────────────────────────────────── */}
        <Face href={href} onEnlarge={() => setOpen(true)} alt={alt} aspect={aspect}>
          {failed ? (
            <span className="flex size-full items-center justify-center px-8 text-center">
              <span className="eyebrow text-muted">{label}</span>
            </span>
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="size-full object-contain object-top"
            />
          )}

          {/* The page fades slightly under the prompt so the prompt stays legible
              over whatever happens to be printed at the foot of the document. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Maximize2 className="size-3.5 text-paper" />
            <span className="eyebrow text-paper">
              {href ? 'Read white paper' : 'Click to open'}
            </span>
          </span>
        </Face>
      </div>

      {open && !href && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex flex-col bg-slab/95 backdrop-blur-sm"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-on-slab/20 px-5 py-4 sm:px-8">
            <p className="eyebrow min-w-0 truncate text-on-slab/70">{label}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex size-10 shrink-0 items-center justify-center text-on-slab transition-colors hover:text-orange"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              className="mx-auto w-auto max-w-4xl bg-paper-white shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

/**
 * The clickable face of the frame.
 *
 * A real document gets an anchor, because it is navigation and should behave
 * like it — middle-click, open in a new tab, copy the address. Only the
 * fallback, which merely enlarges an image in place, is a button.
 */
const Face = ({
  href,
  onEnlarge,
  alt,
  aspect,
  children,
}: {
  href?: string;
  onEnlarge: () => void;
  alt: string;
  aspect: string;
  children: React.ReactNode;
}) => {
  const className = `group relative block w-full bg-paper-white ${aspect} ${
    href ? 'cursor-pointer' : 'cursor-zoom-in'
  }`;

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read: ${alt}`}
      className={className}
    >
      {children}
    </a>
  ) : (
    <button type="button" onClick={onEnlarge} aria-label={`Open: ${alt}`} className={className}>
      {children}
    </button>
  );
};
