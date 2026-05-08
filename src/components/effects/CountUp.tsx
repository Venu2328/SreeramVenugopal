import { useEffect, useRef, useState } from 'react';

/**
 * CountUp
 *
 * Animates a number from 0 to `target` over `duration` ms when the element
 * scrolls into view. Uses an IntersectionObserver so it doesn't run until
 * actually visible (cheaper, also more impactful — viewer sees the count
 * unfold).
 *
 * Respects `prefers-reduced-motion` — for those users it just renders the
 * final value immediately. The animation runs once.
 *
 * `pad` zero-pads the integer portion (e.g. pad=2 → "04"). `suffix` is
 * appended verbatim (typically "+").
 */
export const CountUp = ({
  target,
  duration = 1500,
  suffix = '',
  prefix = '',
  pad = 0,
  className = '',
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  pad?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const startTs = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - startTs) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * target));
              if (t < 1) requestAnimationFrame(tick);
              else setValue(target);
            };
            requestAnimationFrame(tick);
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const display = pad > 0 ? String(value).padStart(pad, '0') : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
