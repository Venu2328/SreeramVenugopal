import { motion } from 'motion/react';

export const Profile = () => {
  return (
    <section id="profile" className="py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <span className="text-lavender-haze font-bold uppercase tracking-widest text-xs">Founder · Researcher · Educator</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-tight">
              Engineering how a generation <br />
              <span className="text-white/40 italic font-serif">learns physics.</span>
            </h2>
          </div>

          <div className="space-y-6 text-xl text-white/60 font-light leading-relaxed">
            <p>
              As a <span className="text-white">founder and scientific researcher</span>, Sreeram studies how cognitive development unfolds when learners are placed at the centre of their own discovery — drawing on <span className="text-white">andragogical principles</span> of self-direction, intrinsic motivation, and intuition-first reasoning to redesign how STEM concepts are introduced, internalised, and mastered.
            </p>
            <p>
              Through <span className="text-white">SciPhyLabs</span>, he is building that thesis into product: an interactive physics ecosystem where every concept is a system to be played with, not a paragraph to be memorised. The mission is to change the cognitive trajectory of how the next generation learns STEM — proving that simulation-led pedagogy is the future of education.
            </p>
          </div>

          <div className="pt-4 flex gap-8">
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white tracking-tighter">04+</div>
              <div className="text-xs uppercase tracking-wider text-white/40 font-bold">Years Researching</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white tracking-tighter">347+</div>
              <div className="text-xs uppercase tracking-wider text-white/40 font-bold">Simulations Built</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white tracking-tighter">10+</div>
              <div className="text-xs uppercase tracking-wider text-white/40 font-bold">STEM Domains</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 relative aspect-square w-full max-w-md group"
        >
          <div className="absolute inset-0 bg-lavender-haze/10 rounded-3xl blur-[40px] group-hover:blur-[60px] transition-all" />
          <div className="relative h-full w-full glass rounded-3xl overflow-hidden border-white/5">
            <img
              src="/sreeram-portrait.jpg"
              alt="Sreeram Venugopal"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Founder</div>
                <div className="text-lg font-display font-bold text-white tracking-tight">Sreeram Venugopal</div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/80">
                SciPhyLabs
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
