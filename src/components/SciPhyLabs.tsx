import { motion } from 'motion/react';
import { Layers, Rocket, Zap, Book, ChartArea } from 'lucide-react';
import { type ReactNode } from 'react';
import { CountUp } from './effects/CountUp';
import { MagneticButton } from './effects/MagneticButton';
import { MagicCard } from './effects/MagicCard';

type Metric = {
  icon: typeof Layers;
  label: string;
  display: ReactNode;
};

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
  'Self-directed progress tracking and streak-based incentive design rooted in andragogical research',
];

export const SciPhyLabs = () => {
  return (
    <section
      id="sciphylabs"
      aria-labelledby="sciphylabs-heading"
      className="py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 bg-white/[0.02] border-y border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10 order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 sm:w-12 h-[1px] bg-lavender-haze" aria-hidden="true" />
                <span className="text-lavender-haze font-bold uppercase tracking-widest text-[10px]">Primary Project</span>
              </div>
              <h2
                id="sciphylabs-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
              >
                SciPhyLabs <br />
                <span className="text-lavender-haze text-xl sm:text-2xl md:text-3xl lg:text-5xl block mt-2 leading-tight">
                  Master physics through interactive simulations
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
                SciPhyLabs is an <span className="text-white">interactive physics learning</span> ecosystem engineered around <span className="text-white">andragogical principles</span> and cognitive-development research. It replaces rigid curriculum delivery with self-directed simulation — turning every concept into something a learner builds intuition for, not just memorises. Designed for JEE, NEET, SAT and AP, built as a thesis on the future of <span className="text-white">STEM education and educational technology</span>.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 list-none p-0" aria-label="SciPhyLabs platform metrics">
              {metrics.map((m) => (
                <li key={m.label}>
                  <MagicCard maxTilt={4} spotlightRadius={220} className="rounded-2xl">
                    <div className="p-4 sm:p-5 md:p-6 rounded-2xl glass space-y-2 group hover:bg-white/10 transition-all">
                      <m.icon size={20} className="text-lavender-haze" aria-hidden="true" />
                      <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{m.display}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{m.label}</div>
                    </div>
                  </MagicCard>
                </li>
              ))}
            </ul>

            <ul className="space-y-4 pt-4" aria-label="Platform capabilities">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-lavender-haze flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-6">
              <MagneticButton strength={0.4} className="w-full sm:w-auto">
                <a
                  href="https://sciphylabs.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-graphite font-bold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all text-center w-full sm:w-fit"
                  aria-label="Explore SciPhyLabs — opens in a new tab"
                >
                  <Rocket size={18} aria-hidden="true" />
                  Explore SciPhyLabs
                </a>
              </MagneticButton>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-graphite" />
                  <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-graphite" />
                  <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-graphite" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                  Trusted by JEE Aspirants
                </span>
              </div>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 m-0"
          >
            <MagicCard maxTilt={7} spotlightRadius={420} spotlightOpacity={0.16} className="rounded-[32px] group">
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-lavender-haze/10 blur-[80px] opacity-50 rounded-[40px] group-hover:opacity-100 transition-all -z-10"
              />
              <div className="relative glass aspect-video rounded-[32px] overflow-hidden shadow-2xl border-white/5 flex items-center justify-center bg-graphite-light">
                <img
                  src="/sciphylabs-preview.png"
                  alt="SciPhyLabs landing page preview — interactive physics simulations for JEE, NEET, SAT and AP."
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent"
                />
                <figcaption className="absolute bottom-8 left-8 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <Rocket size={18} className="text-lavender-haze" aria-hidden="true" />
                  </div>
                  <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                    System Preview
                  </span>
                </figcaption>
              </div>
            </MagicCard>
          </motion.figure>

        </div>
      </div>
    </section>
  );
};
