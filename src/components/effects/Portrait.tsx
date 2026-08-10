import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * Portrait
 *
 * The hero's atmospheric layer. The source photograph is a casual snapshot,
 * so it is never presented as a portrait — it is cropped hard to the head,
 * pushed through a two-tone ramp that maps black to the page ground and white
 * to the accent red, then held at low opacity behind the type. What survives
 * is a red-lit silhouette; the room it was taken in falls into shadow.
 *
 * The duotone is a real `feComponentTransfer` ramp rather than a CSS filter
 * stack, because CSS can desaturate but cannot re-map the endpoints of the
 * tonal range — and the endpoints are the whole effect.
 *
 * Drifts slowly upward on scroll for parallax; static under reduced motion.
 * If the image is missing the layer simply renders nothing visible, and the
 * hero falls back to its grid and vignette.
 */
export const Portrait = ({ src = '/founder15.png' }: { src?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Duotone ramp: shadows → #0d0b0a, highlights → #e0242a */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="duotone-red" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.34 0.5 0.16 0 0
                      0.34 0.5 0.16 0 0
                      0.34 0.5 0.16 0 0
                      0    0   0    1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.05 0.88" />
              <feFuncG type="table" tableValues="0.043 0.14" />
              <feFuncB type="table" tableValues="0.039 0.165" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="absolute inset-y-0 right-0 w-full sm:w-[62%] lg:w-[52%]"
      >
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover opacity-[0.80] contrast-[1.35] saturate-0"
          style={{
            filter: 'url(#duotone-red) contrast(1.3) brightness(0.92)',
            objectPosition: '64% 12%',
            transform: 'scale(2.05)',
            transformOrigin: '64% 14%',
            // Wide solid core with a short falloff. The previous mask started
            // fading at 8% and took until 78% to finish, which read as haze
            // rather than as an edge — the image was never fully opaque
            // anywhere. It now holds full strength out to 48%, including the
            // area above the head, then releases quickly.
            maskImage:
              'radial-gradient(80% 72% at 62% 30%, #000 48%, rgba(0,0,0,0.85) 70%, transparent 92%)',
            WebkitMaskImage:
              'radial-gradient(80% 72% at 62% 30%, #000 48%, rgba(0,0,0,0.85) 70%, transparent 92%)',
          }}
        />
      </motion.div>

      {/* Sink the left edge so display type always has clean ground under it */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent" />
      {/* Top stop lightened 70% → 60%: less ground laid over the area above the head */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60" />
    </div>
  );
};
