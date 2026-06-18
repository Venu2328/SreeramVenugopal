/**
 * PaintCloud
 *
 * A procedurally generated painterly haze — fractal noise pushed through a
 * displacement map and tinted with the stage palette. Stands in for the
 * "painted clouds" backdrop of the reference without shipping any image.
 * Purely decorative; rendered behind quote/divider scenes.
 */
export const PaintCloud = ({
  className = '',
  tone = 'gold',
  seed = 4,
}: {
  className?: string;
  tone?: 'gold' | 'cosmos' | 'ember';
  seed?: number;
}) => {
  const tint =
    tone === 'cosmos'
      ? { r: 0.43, g: 0.39, b: 0.65 }
      : tone === 'ember'
        ? { r: 0.84, g: 0.25, b: 0.18 }
        : { r: 0.85, g: 0.71, b: 0.37 };

  const id = `cloud-${tone}-${seed}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 400"
    >
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.013" numOctaves="4" seed={seed} result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values={`0 0 0 0 ${tint.r}
                     0 0 0 0 ${tint.g}
                     0 0 0 0 ${tint.b}
                     0 0 0 1.1 -0.32`}
            result="c"
          />
          <feGaussianBlur in="c" stdDeviation="3" />
        </filter>
        <radialGradient id={`${id}-mask`} cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-m`}>
          <rect width="600" height="400" fill={`url(#${id}-mask)`} />
        </mask>
      </defs>
      <rect width="600" height="400" filter={`url(#${id})`} mask={`url(#${id}-m)`} />
    </svg>
  );
};
