import { motion } from 'motion/react';
import { ArrowRight, FlaskConical, Brain, BookOpen, Rocket } from 'lucide-react';

const chips = [
  { icon: Rocket, text: 'Founder, SCI-PHY Lab' },
  { icon: FlaskConical, text: 'Scientific Researcher' },
  { icon: BookOpen, text: 'STEM Educator · Andragogist' },
  { icon: Brain, text: 'Cognitive Development Research' },
];

export const Hero = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
    >
      <div className="max-w-5xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lavender-haze/20 bg-lavender-haze/5 backdrop-blur-sm text-lavender-haze text-xs font-semibold uppercase tracking-[0.2em] mb-8"
            role="status"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender-haze opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lavender-haze"></span>
            </span>
            Available for Collaborations
          </div>

          <h1
            id="hero-heading"
            className="text-7xl md:text-9xl font-display font-bold tracking-tight mb-8 text-white text-glow leading-[1.1]"
          >
            Sreeram <br />
            <span className="text-white/60">Venugopal</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Student founder, scientific researcher and educator advancing
            <span className="text-white"> andragogical STEM learning</span> — building <span className="text-white">SCI-PHY Lab</span>, an interactive physics simulation platform that turns cognitive development research into immersive, simulation-led education.
          </p>

          <ul className="flex flex-wrap justify-center gap-4 mb-16 list-none p-0">
            {chips.map((chip, i) => (
              <motion.li
                key={chip.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass text-sm font-medium text-white/70"
              >
                <chip.icon size={16} className="text-lavender-haze" aria-hidden="true" />
                {chip.text}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#sciphylabs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-white text-graphite font-bold overflow-hidden transition-all"
              aria-label="View SCI-PHY Lab and other projects"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </motion.a>

            <motion.a
              href="#writing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white font-medium"
              aria-label="Read writing and technical notes"
            >
              Read Writing
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-haze/5 blur-[150px] rounded-full pointer-events-none"
      />
    </section>
  );
};
