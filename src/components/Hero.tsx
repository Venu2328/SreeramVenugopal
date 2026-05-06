import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Binary, Lightbulb, Rocket } from 'lucide-react';

const chips = [
  { icon: Rocket, text: 'Founder, SciPhyLabs' },
  { icon: Binary, text: '347+ Physics Simulations' },
  { icon: Sparkles, text: 'Fellowship Candidate, CS/AI' },
  { icon: Lightbulb, text: 'Hackathon Competitor, Fintech' },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-5xl w-full text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lavender-haze/20 bg-lavender-haze/5 backdrop-blur-sm text-lavender-haze text-xs font-semibold uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender-haze opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lavender-haze"></span>
            </span>
            Available for Collaborations
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tight mb-8 text-white text-glow leading-[1.1]">
            Sreeram <br />
            <span className="text-white/60">Venugopal</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Student founder building interactive physics education systems through 
            <span className="text-white"> simulations, design, and AI-assisted learning.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {chips.map((chip, i) => (
              <motion.div
                key={chip.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass text-sm font-medium text-white/70"
              >
                <chip.icon size={16} className="text-lavender-haze" />
                {chip.text}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#sciphylabs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-white text-graphite font-bold overflow-hidden transition-all"
            >
              <div className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            <motion.a
              href="#writing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white font-medium"
            >
              Read Writing
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative center light blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-haze/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};
