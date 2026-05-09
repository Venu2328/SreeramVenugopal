import { motion } from 'motion/react';
import { Mail, ArrowRight, MessageSquareCode } from 'lucide-react';
import { MagneticButton } from './effects/MagneticButton';

export const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div
            className="inline-flex p-3 sm:p-4 rounded-full bg-lavender-haze/10 border border-lavender-haze/20 mb-3 sm:mb-4 animate-bounce"
            aria-hidden="true"
          >
            <MessageSquareCode className="text-lavender-haze" size={28} />
          </div>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.05]"
          >
            Let's redefine <br />
            <span className="text-lavender-haze">how we learn.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Open to research collaborations, fellowships, and serious conversations on andragogy, cognitive development, and the future of STEM education and educational technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton strength={0.4} className="w-full sm:w-auto">
            <a
              href="mailto:sreeram23db@gmail.com"
              className="group flex items-center justify-center gap-3 px-7 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-graphite font-bold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
              aria-label="Email Sreeram Venugopal at sreeram23db@gmail.com"
            >
              <Mail size={18} aria-hidden="true" />
              Email Sreeram
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.3} className="w-full sm:w-auto">
            <a
              href="https://www.linkedin.com/in/sreeram-venugopal-701531376/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 sm:px-10 py-4 sm:py-5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white font-medium text-sm sm:text-base w-full sm:w-auto inline-flex items-center justify-center"
              aria-label="Connect on LinkedIn — opens in a new tab"
            >
              Connect on LinkedIn
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-lavender-haze/5 blur-[100px] rounded-full -z-10 pointer-events-none"
      />
    </section>
  );
};
