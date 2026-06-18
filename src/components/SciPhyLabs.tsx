import { motion } from 'motion/react';
import { Layers, Rocket, Zap, Book, ChartArea } from 'lucide-react';
import { type ReactNode } from 'react';
import { CountUp } from './effects/CountUp';
import { MagneticButton } from './effects/MagneticButton';
import { MagicCard } from './effects/MagicCard';

type Metric = { icon: typeof Layers; label: string; display: ReactNode };

const metrics: Metric[] = [
  { icon: Layers, label: 'Simulations', display: <CountUp target={347} suffix="+" duration={1800} /> },
  { icon: Zap, label: 'Domains', display: <CountUp target={10} suffix="+" /> },
  { icon: Book, label: 'Curriculum', display: 'AP/JEE' },
  { icon: ChartArea, label: 'Approach', display: 'AI Native' },
];

const features = [
  'Interactive physics simulations engineered for deep intuition and conceptual mastery',
  'JEE, NEET, SAT and AP physics coverage with simulation-led learning paths',
  'Integrated formulae, derivations and notes — every concept linked to a live system',
  'Self-directed progress and streak-based incentive design rooted in andragogical research',
];

export const SciPhyLabs = () => {
  return (
    <section
      id="sciphylabs"
      aria-labelledby="sciphylabs-heading"
      className="relative py-24 sm:py-32 px-4 sm:px-6 border-y border-chalk/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14 sm:mb-20">
          <p className="eyebrow text-gold/70 mb-4">The flagship</p>
          <h2 id="sciphylabs-heading" className="brush brush-rough text-chalk text-gold-glow text-[clamp(3rem,10vw,7rem)] leading-none">
            SciPhyLabs
          </h2>
          <p className="serif italic text-ember text-xl sm:text-2xl md:text-3xl mt-3">
            Master physics through interactive simulations
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.figure
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 m-0"
          >
            <MagicCard maxTilt={6} spotlightRadius={420} spotlightOpacity={0.14} className="rounded-2xl group">
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-gold/10 blur-[70px] opacity-50 rounded-3xl group-hover:opacity-90 transition-opacity -z-10"
              />
              <div
                className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-chalk/10 bg-ink-2"
                data-preview-slot
              >
                {/* image-free app-frame mock — drop a screenshot here later */}
                <div aria-hidden="true" className="absolute top-0 inset-x-0 h-8 bg-ink-3 border-b border-chalk/10 flex items-center gap-1.5 px-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-ember/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cosmos/70" />
                </div>
                <svg aria-hidden="true" viewBox="0 0 400 200" className="absolute inset-0 top-8 w-full h-[calc(100%-2rem)] opacity-60">
                  <defs>
                    <linearGradient id="sci-trace" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d9b65f" />
                      <stop offset="100%" stopColor="#6f63a6" />
                    </linearGradient>
                  </defs>
                  {[40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(242,239,230,0.06)" />
                  ))}
                  <path d="M0 160 Q 100 40 200 120 T 400 60" fill="none" stroke="url(#sci-trace)" strokeWidth="2.5" />
                  <circle cx="200" cy="120" r="4" fill="#d9b65f" />
                  <circle cx="60" cy="118" r="3" fill="#f2efe6" opacity="0.6" />
                </svg>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="p-2 rounded-lg glass-gold">
                    <Rocket size={16} className="text-gold" aria-hidden="true" />
                  </span>
                  <span className="ui text-chalk text-[10px] uppercase tracking-[0.2em] font-bold">Live preview</span>
                </figcaption>
              </div>
            </MagicCard>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.8 }}
            className="order-2 space-y-8"
          >
            <p className="font-body text-lg sm:text-xl text-chalk/65 leading-relaxed">
              SciPhyLabs is an <span className="text-chalk">interactive physics learning</span> ecosystem built on{' '}
              <span className="text-chalk italic">andragogical principles</span> and cognitive-development research.
              It replaces rigid curriculum delivery with self-directed simulation — turning every concept into
              something a learner builds intuition for, not just memorises.
            </p>

            <ul className="grid grid-cols-2 gap-3 sm:gap-4 list-none p-0" aria-label="Platform metrics">
              {metrics.map((m) => (
                <li key={m.label}>
                  <MagicCard maxTilt={4} spotlightRadius={200} className="rounded-xl">
                    <div className="p-4 sm:p-5 rounded-xl glass space-y-1.5 hover:border-gold/30 transition-colors">
                      <m.icon size={18} className="text-gold" aria-hidden="true" />
                      <div className="brush text-chalk text-2xl sm:text-3xl leading-none">{m.display}</div>
                      <div className="ui text-[10px] uppercase tracking-[0.18em] text-chalk/35 font-bold">{m.label}</div>
                    </div>
                  </MagicCard>
                </li>
              ))}
            </ul>

            <ul className="space-y-3 list-none p-0" aria-label="Capabilities">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-chalk/65 font-body text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-ember flex-shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <MagneticButton strength={0.4} className="w-full sm:w-auto">
              <a
                href="https://sciphylabs.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="ui inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold text-ink font-bold text-sm uppercase tracking-[0.16em] hover:bg-chalk transition-colors w-full sm:w-auto"
              >
                <Rocket size={17} aria-hidden="true" />
                Explore SciPhyLabs
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
