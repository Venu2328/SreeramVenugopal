import { motion } from 'motion/react';
import { Mail, ArrowRight, MessageSquareCode } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-6"
        >
          <div className="inline-flex p-4 rounded-full bg-lavender-haze/10 border border-lavender-haze/20 mb-4 animate-bounce">
            <MessageSquareCode className="text-lavender-haze" size={32} />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">Let's redefine <br /> <span className="text-lavender-haze">how we learn.</span></h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Open to research collaborations, fellowships, and serious conversations on andragogy, cognitive development, and the future of STEM education.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="mailto:sreeram23db@gmail.com" 
            className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white text-graphite font-bold hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
          >
            <Mail size={20} />
            Email Sreeram
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <button className="px-10 py-5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white font-medium w-full sm:w-auto">
            Book a Meeting
          </button>
        </motion.div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-white/30 text-xs uppercase tracking-[0.2em] font-bold">
           <div>© 2024 Sreeram Venugopal</div>
           <div className="flex gap-8">
             <a href="#" className="hover:text-lavender-haze transition-colors">Privacy</a>
             <a href="#" className="hover:text-lavender-haze transition-colors">Legal</a>
           </div>
        </div>
      </div>

      {/* Footer background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-lavender-haze/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </section>
  );
};
