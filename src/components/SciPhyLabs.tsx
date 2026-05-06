import { motion } from 'motion/react';
import { Layers, Rocket, Zap, Book, ChartArea } from 'lucide-react';

const metrics = [
  { icon: Layers, label: 'Simulations', value: '347+' },
  { icon: Zap, label: 'Domains', value: '10+' },
  { icon: Book, label: 'Curriculum', value: 'AP/JEE' },
  { icon: ChartArea, label: 'Approach', value: 'AI Native' },
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
      className="py-32 px-6 bg-white/[0.02] border-y border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 order-2 lg:order-1"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-lavender-haze" aria-hidden="true" />
                <span className="text-lavender-haze font-bold uppercase tracking-widest text-[10px]">Primary Project</span>
              </div>
              <h2
                id="sciphylabs-heading"
                className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-tight"
              >
                SCI-PHY Lab <br />
                <span className="text-lavender-haze text-3xl md:text-4xl lg:text-5xl block mt-2">
                  Master physics through interactive simulations
                </span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed max-w-xl">
                SCI-PHY Lab is an <span className="text-white">interactive physics learning</span> ecosystem engineered around <span className="text-white">andragogical principles</span> and cognitive-development research. It replaces rigid curriculum delivery with self-directed simulation — turning every concept into something a learner builds intuition for, not just memorises. Designed for JEE, NEET, SAT and AP, built as a thesis on the future of <span className="text-white">STEM education and educational technology</span>.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-6 list-none p-0" aria-label="SCI-PHY Lab platform metrics">
              {metrics.map((m) => (
                <li key={m.label} className="p-6 rounded-2xl glass space-y-2 group hover:bg-white/10 transition-all">
                  <m.icon size={20} className="text-lavender-haze" aria-hidden="true" />
                  <div className="text-2xl font-bold text-white tracking-tight">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{m.label}</div>
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
              <a
                href="https://sciphylabs.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-graphite font-bold hover:scale-105 active:scale-95 transition-all text-center w-fit"
                aria-label="Explore SCI-PHY Lab — opens in a new tab"
              >
                <Rocket size={20} aria-hidden="true" />
                Explore SCI-PHY Lab
              </a>

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
            <div className="relative group">
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-lavender-haze/10 blur-[80px] opacity-50 rounded-[40px] group-hover:opacity-100 transition-all"
              />
              <div className="relative glass aspect-video rounded-[32px] overflow-hidden shadow-2xl border-white/5 flex items-center justify-center bg-graphite-light">
                <img
                  src="/sciphylabs-preview.png"
                  alt="SCI-PHY Lab landing page preview — interactive physics simulations for JEE, NEET, SAT and AP."
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
            </div>
          </motion.figure>

        </div>
      </div>
    </section>
  );
};
