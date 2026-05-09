import { motion } from 'motion/react';
import { ArrowRight, FlaskConical, Brain, BookOpen, Rocket } from 'lucide-react';
import { MagneticButton } from './effects/MagneticButton';

const chips = [
  { icon: Rocket, text: 'Founder, SciPhyLabs' },
  { icon: FlaskConical, text: 'Scientific Researcher' },
  { icon: BookOpen, text: 'STEM Educator · Andragogist' },
  { icon: Brain, text: 'Cognitive Development Research' },
];

// Subtitle copy split into segments so word-by-word reveal preserves the
// in-line lavender-haze highlights without manual delay accounting.
const SUBTITLE_SEGMENTS: { text: string; highlight?: boolean }[] = [
  { text: 'Student founder, scientific researcher and educator advancing ' },
  { text: 'andragogical STEM learning', highlight: true },
  { text: ' — building ' },
  { text: 'SciPhyLabs', highlight: true },
  { text: ', an interactive physics simulation platform that turns cognitive development research into immersive, simulation-led education.' },
];

const SUBTITLE_WORDS = (() => {
  const out: { text: string; highlight: boolean }[] = [];
  for (const seg of SUBTITLE_SEGMENTS) {
    for (const part of seg.text.split(/(\s+)/)) {
      if (part) out.push({ text: part, highlight: !!seg.highlight });
    }
  }
  return out;
})();

export const Hero = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden"
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
            aria-label="Sreeram Venugopal"
            className="text-[clamp(3rem,12vw,9rem)] font-display font-bold tracking-tight mb-6 sm:mb-8 text-white text-glow leading-[1.05] sm:leading-[1.1]"
          >
            <AnimatedWord word="Sreeram" />
            <br />
            <AnimatedWord word="Venugopal" muted />
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-10 sm:mb-12 px-2"
            aria-label="Student founder, scientific researcher and educator advancing andragogical STEM learning — building SciPhyLabs, an interactive physics simulation platform that turns cognitive development research into immersive, simulation-led education."
          >
            <span aria-hidden="true">
              {SUBTITLE_WORDS.map((w, i) =>
                /^\s+$/.test(w.text) ? (
                  <span key={i}>{w.text}</span>
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.55 + i * 0.022,
                      duration: 0.55,
                      ease: [0.21, 1, 0.32, 1],
                    }}
                    className={`inline-block ${w.highlight ? 'text-white' : ''}`}
                  >
                    {w.text}
                  </motion.span>
                ),
              )}
            </span>
          </p>

          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-16 list-none p-0">
            {chips.map((chip, i) => (
              <motion.li
                key={chip.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl glass text-xs sm:text-sm font-medium text-white/70"
              >
                <chip.icon size={16} className="text-lavender-haze" aria-hidden="true" />
                {chip.text}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            <MagneticButton strength={0.4} className="w-full sm:w-auto">
              <motion.a
                href="#sciphylabs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-graphite font-bold overflow-hidden transition-all w-full sm:w-auto inline-flex items-center justify-center"
                aria-label="View SciPhyLabs and other projects"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </motion.a>
            </MagneticButton>

            <MagneticButton strength={0.3} className="w-full sm:w-auto">
              <motion.a
                href="#writing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white font-medium w-full sm:w-auto inline-flex items-center justify-center"
                aria-label="Read writing and technical notes"
              >
                Read Writing
              </motion.a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-lavender-haze/5 blur-[120px] sm:blur-[150px] rounded-full pointer-events-none"
      />
    </section>
  );
};

const AnimatedWord = ({ word, muted = false }: { word: string; muted?: boolean }) => (
  <span aria-hidden="true" className={muted ? 'text-white/60' : ''}>
    {word.split('').map((ch, i) => (
      <span
        key={i}
        className="inline-block cursor-default transition-[transform,color,text-shadow] duration-300 ease-out hover:scale-[1.18] hover:text-lavender-haze hover:[text-shadow:0_0_40px_rgba(176,168,204,0.65)]"
      >
        {ch}
      </span>
    ))}
  </span>
);
