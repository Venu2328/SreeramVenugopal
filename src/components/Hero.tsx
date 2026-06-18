import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { MagneticButton } from './effects/MagneticButton';

const services = [
  'Physics Simulations',
  'Andragogy',
  'Cognitive Research',
  'EdTech Product',
  'STEM Leadership',
];

export const Hero = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-12 items-center">
        {/* ── Spotlight portrait ─────────────────────────────────────── */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[78vw] max-w-[360px] sm:max-w-[420px] lg:max-w-none aspect-square m-0 order-1 lg:order-none"
        >
          {/* the cone of light */}
          <div
            aria-hidden="true"
            className="absolute inset-[-18%] rounded-full spotlight blur-2xl"
            style={{ ['--sx' as string]: '50%', ['--sy' as string]: '46%' }}
          />
          <div
            className="relative h-full w-full rounded-full overflow-hidden ring-1 ring-gold/20 flex items-center justify-center"
            data-portrait-slot
            style={{ background: 'radial-gradient(circle at 50% 38%, rgba(217,182,95,0.14), rgba(10,10,11,0.96) 72%)' }}
          >
            {/* image-free spotlight stage — drop a portrait here later */}
            <span
              aria-hidden="true"
              className="brush brush-rough text-[clamp(5rem,18vw,11rem)] leading-none text-gold/80 text-gold-glow"
            >
              SV
            </span>
            {/* vignette into black */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 50% 42%, transparent 40%, rgba(8,8,9,0.9) 80%)' }}
            />
          </div>
          {/* breathing key-light halo */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-[-6%] rounded-full pointer-events-none"
            style={{ boxShadow: '0 0 120px 10px rgba(217,182,95,0.18) inset' }}
          />
          <figcaption className="sr-only">Portrait of Sreeram Venugopal under a spotlight.</figcaption>
        </motion.figure>

        {/* ── Painted billing ────────────────────────────────────────── */}
        <div className="relative text-center lg:text-left order-2 lg:order-none">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="eyebrow text-gold/70 mb-5 flex items-center gap-2.5 justify-center lg:justify-start"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            Open for collaborations — 2026
          </motion.p>

          <h1 id="hero-heading" aria-label="Sreeram Venugopal" className="mb-3">
            <motion.span
              aria-hidden="true"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.3 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="brush brush-rough block text-chalk text-gold-glow leading-[0.92] text-[clamp(3.4rem,11vw,9rem)]"
            >
              Sreeram
            </motion.span>
            <motion.span
              aria-hidden="true"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.3 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="brush brush-rough block text-chalk/85 leading-[0.92] text-[clamp(3.4rem,11vw,9rem)]"
            >
              Venugopal
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="serif italic text-ember text-ember-glow text-2xl sm:text-3xl md:text-4xl mb-6"
          >
            Founder &amp; Researcher
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="font-body text-lg sm:text-xl text-chalk/65 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            I help a generation learn physics the way it's meant to be felt — building{' '}
            <span className="text-chalk italic">SciPhyLabs</span>, an immersive, simulation-led
            ecosystem engineered around how the mind actually learns.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 1.05 } } }}
            className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start mb-10 list-none p-0"
            aria-label="Areas of focus"
          >
            {services.map((s) => (
              <motion.li
                key={s}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="hand text-xl sm:text-2xl text-chalk/55 hover:text-gold transition-colors -rotate-1 even:rotate-1"
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
          >
            <MagneticButton strength={0.4} className="w-full sm:w-auto">
              <a
                href="#sciphylabs"
                className="ui inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-ink font-bold text-sm uppercase tracking-[0.16em] hover:bg-chalk transition-colors w-full"
              >
                See the work
              </a>
            </MagneticButton>
            <MagneticButton strength={0.3} className="w-full sm:w-auto">
              <a
                href="#contact"
                className="ui inline-flex items-center justify-center px-8 py-4 rounded-full border border-chalk/15 text-chalk font-medium text-sm uppercase tracking-[0.16em] hover:border-gold/50 hover:text-gold transition-colors w-full"
              >
                Get in touch
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#profile"
        aria-label="Scroll to learn more"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-chalk/40 hover:text-gold transition-colors"
      >
        <span className="eyebrow">Who am I</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
};
