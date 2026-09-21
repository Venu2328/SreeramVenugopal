import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { certificates, PILE_PLACEHOLDERS, type Certificate } from '../../data/certificates';

/**
 * CertificatePile
 *
 * The certificates thrown down on the desk rather than filed — overlapping
 * sheets at slight angles, each with the one real drop shadow on the site, so
 * they read as paper lying on paper.
 *
 * The box is square on purpose: a sheet is placed by its top edge, so with a
 * shallower box the lowest sheets in the fan hang out of the bottom and cover
 * the caption underneath.
 *
 * The scatter is fixed rather than random. A random one would deal a different
 * hand on every render, which means it could deal a bad one — sheets stacked
 * dead centre, or a hole in the middle of the pile. These seven placements were
 * chosen once to fan out from the centre and stay legible at any width.
 *
 * The whole pile is a single button. Picking individual sheets out of an
 * overlapping stack is a fiddly target on a phone, and the sheets are a preview
 * of the record rather than a menu — one press opens the record itself.
 */
type Placement = { x: string; y: string; rotate: string; z: number; w: string };

const scatter: Placement[] = [
  { x: '2%', y: '14%', rotate: '-7deg', z: 1, w: '42%' },
  { x: '26%', y: '2%', rotate: '3deg', z: 2, w: '40%' },
  { x: '54%', y: '9%', rotate: '-3deg', z: 3, w: '38%' },
  { x: '14%', y: '38%', rotate: '5deg', z: 4, w: '44%' },
  { x: '48%', y: '42%', rotate: '-5deg', z: 5, w: '40%' },
  { x: '32%', y: '24%', rotate: '1deg', z: 6, w: '36%' },
  { x: '62%', y: '30%', rotate: '8deg', z: 4, w: '34%' },
];

export const CertificatePile = () => {
  const [open, setOpen] = useState(false);
  const hasScans = certificates.length > 0;

  /*
   * The fan always lays out every placement, so the pile keeps its shape
   * whether there are three certificates or seven. Real scans take the
   * frontmost placements and blanks fill in behind them, which reads as a stack
   * whose top sheets are the ones on file and whose lower ones are still to
   * come — rather than as a lopsided fan with a hole in one corner.
   */
  const frontToBack = scatter
    .map((p, i) => ({ i, z: p.z }))
    .sort((a, b) => b.z - a.z)
    .map((x) => x.i);

  const assigned = new Map<number, Certificate>();
  if (hasScans) {
    certificates.slice(0, scatter.length).forEach((cert, n) => {
      assigned.set(frontToBack[n], cert);
    });
  }

  const slots = hasScans
    ? scatter.length
    : Math.min(PILE_PLACEHOLDERS, scatter.length);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={
          hasScans
            ? `View all ${certificates.length} certificates`
            : 'View certificates'
        }
        className="group relative block aspect-square w-full"
      >
        {Array.from({ length: slots }, (_, i) => {
          const p = scatter[i];
          const cert = assigned.get(i);
          return (
            <span
              key={cert?.src ?? i}
              style={{
                left: p.x,
                top: p.y,
                width: p.w,
                zIndex: p.z,
                transform: `rotate(${p.rotate})`,
              }}
              /* Each sheet lifts a little on hover of the pile as a whole, the
                 outer ones further than the inner, so the stack fans rather
                 than sliding as one board. */
              className="clipping absolute block aspect-[3/4] origin-center transition-transform duration-500 group-hover:-translate-y-1.5"
            >
              {cert ? (
                <img
                  src={cert.src}
                  alt={`${cert.title} — ${cert.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-top"
                />
              ) : (
                <BlankSheet />
              )}
            </span>
          );
        })}
      </button>

      <p className="eyebrow mt-4 text-center text-muted">
        <span className="text-orange">↑</span> Click here
        {hasScans && ` · ${certificates.length} certificate${certificates.length === 1 ? '' : 's'}`}
      </p>

      {open && <Lightbox onClose={() => setOpen(false)} />}
    </div>
  );
};

/**
 * A sheet with nothing on it yet. Ruled with faint lines rather than left
 * plain, because a plain white rectangle reads as a rendering failure while a
 * ruled one reads as a document waiting to be filled.
 */
const BlankSheet = () => (
  <span aria-hidden="true" className="flex size-full flex-col gap-[6%] p-[12%]">
    <span className="h-[3%] w-1/2 bg-rule" />
    <span className="h-[2%] w-full bg-rule/60" />
    <span className="h-[2%] w-full bg-rule/60" />
    <span className="h-[2%] w-4/5 bg-rule/60" />
    <span className="mt-auto h-[3%] w-1/3 bg-rule" />
  </span>
);

/**
 * Lightbox
 *
 * Opens on the pile and steps through the scans. Escape closes it and the arrow
 * keys move it, because a viewer you can only leave with the mouse is a trap.
 * Scrolling behind it is locked while it is open for the same reason the mobile
 * index locks it: two scrollable things at once belongs to neither.
 */
const Lightbox = ({ onClose }: { onClose: () => void }) => {
  const [i, setI] = useState(0);
  const has = certificates.length > 0;
  const cert = certificates[i];

  const step = (d: -1 | 1) =>
    setI((n) => (n + d + certificates.length) % certificates.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!has) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [has, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Certificates"
      className="fixed inset-0 z-[100] flex flex-col bg-slab/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-on-slab/20 px-5 py-4 sm:px-8">
        <p className="eyebrow text-on-slab/70">
          {has ? `${i + 1} / ${certificates.length}` : 'Certificates'}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 items-center justify-center text-on-slab transition-colors hover:text-orange"
        >
          <X className="size-5" />
        </button>
      </div>

      <div
        className="flex flex-1 items-center justify-center gap-4 overflow-auto p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {has ? (
          <>
            <Arrow dir={-1} onClick={() => step(-1)} />
            <figure className="flex max-h-full min-w-0 flex-col items-center">
              <img
                src={cert.src}
                alt={`${cert.title} — ${cert.issuer}`}
                className="max-h-[72vh] w-auto max-w-full bg-paper-white object-contain"
              />
              <figcaption className="mt-4 text-center">
                <p className="eyebrow text-orange">{cert.issuer}</p>
                <p className="headline mt-1.5 text-xl text-on-slab">{cert.title}</p>
                {cert.year && <p className="eyebrow mt-1.5 text-on-slab/50">{cert.year}</p>}
              </figcaption>
            </figure>
            <Arrow dir={1} onClick={() => step(1)} />
          </>
        ) : (
          <p className="max-w-sm text-center leading-relaxed text-on-slab/70">
            The scans go in <code className="text-orange">public/certificates-images/</code>{' '}
            and are listed in <code className="text-orange">src/data/certificates.ts</code>.
            They appear here as soon as they exist.
          </p>
        )}
      </div>
    </div>
  );
};

const Arrow = ({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={dir === -1 ? 'Previous certificate' : 'Next certificate'}
    className="flex size-11 shrink-0 items-center justify-center border border-on-slab/35 text-on-slab transition-colors hover:border-orange hover:bg-orange hover:text-on-orange"
  >
    {dir === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
  </button>
);
