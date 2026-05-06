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
            <span className="text-lavender-haze font-bold uppercase tracking-widest text-xs">Entrepreneur & Developer</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-tight">
              Building learning systems, <br />
              <span className="text-white/40 italic font-serif">and scalable digital brands.</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-xl text-white/60 font-light leading-relaxed">
            <p>
              As an <span className="text-white">entrepreneur and student developer</span>, he bridges the gap between technical rigor and business impact. His work focuses on developing an andragogy style of teaching—shifting focus from passive instruction to self-directed exploration.
            </p>
            <p>
              Through his agency, he currently leads digital transformation for <span className="text-white">Swaminathan Enterprises</span>, while building EdTech systems that empower students to master complex physics through intuition-first simulation design.
            </p>
          </div>

          <div className="pt-4 flex gap-8">
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white tracking-tighter">04+</div>
              <div className="text-xs uppercase tracking-wider text-white/40 font-bold">Years Building</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white tracking-tighter">10k+</div>
              <div className="text-xs uppercase tracking-wider text-white/40 font-bold">Concept Views</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white tracking-tighter">01</div>
              <div className="text-xs uppercase tracking-wider text-white/40 font-bold">Clear Vision</div>
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
