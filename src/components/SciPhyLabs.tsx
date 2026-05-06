import { motion } from 'motion/react';
import { Layers, Rocket, Zap, Book, ChartArea } from 'lucide-react';

const metrics = [
  { icon: Layers, label: 'Simulations', value: '347+' },
  { icon: Zap, label: 'Domains', value: '10+' },
  { icon: Book, label: 'Curriculum', value: 'AP/JEE' },
  { icon: ChartArea, label: 'Approach', value: 'AI Native' },
];

export const SciPhyLabs = () => {
  return (
    <section id="sciphylabs" className="py-32 px-6 bg-white/[0.02] border-y border-white/[0.05]">
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
                <span className="w-12 h-[1px] bg-lavender-haze" />
                <span className="text-lavender-haze font-bold uppercase tracking-widest text-[10px]">Primary Project</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-tight">
                SciPhy Labs <br />
                <span className="text-lavender-haze text-3xl md:text-4xl lg:text-5xl block mt-2">Master Physics through Simulations</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed max-w-xl">
                An immersive physics learning platform rooted in <span className="text-white">andragogical principles</span>. 
                Instead of rigid curriculum delivery, it bridges the gap between abstract formulas 
                and physical intuition through self-directed interactive simulations for JEE, NEET, and AP students.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {metrics.map((m) => (
                <div key={m.label} className="p-6 rounded-2xl glass space-y-2 group hover:bg-white/10 transition-all">
                  <m.icon size={20} className="text-lavender-haze" />
                  <div className="text-2xl font-bold text-white tracking-tight">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{m.label}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-4 pt-4">
              {[
                'Interactive physics simulations for deep intuition',
                'JEE / NEET / SAT / AP expansion vision',
                'Formulae, notes, and derivation ecosystem',
                'Student progress and streak-based incentive design'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-lavender-haze" />
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
              >
                <Rocket size={20} />
                Explore SciPhyLabs
              </a>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-graphite" />
                  <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-graphite" />
                  <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-graphite" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Trusted by JEE Aspirants</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-lavender-haze/10 blur-[80px] opacity-50 rounded-[40px] group-hover:opacity-100 transition-all" />
              <div className="relative glass aspect-video rounded-[32px] overflow-hidden shadow-2xl border-white/5 flex items-center justify-center bg-graphite-light">
                <img
                  src="/sciphylabs-preview.png"
                  alt="SciPhyLabs landing page — Master JEE Physics through Simulations"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <Rocket size={18} className="text-lavender-haze" />
                  </div>
                  <div className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                    System Preview
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
