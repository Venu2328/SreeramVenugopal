import { motion } from 'motion/react';
import { CountUp } from './effects/CountUp';

export const Profile = () => {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <p className="text-lavender-haze font-bold uppercase tracking-widest text-xs">
              Founder · Researcher · Educator
            </p>
            <h2
              id="profile-heading"
              className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-tight"
            >
              Engineering how a generation <br />
              <span className="text-white/40 italic font-serif">learns physics.</span>
            </h2>
          </div>

          <div className="space-y-6 text-xl text-white/60 font-light leading-relaxed">
            <p>
              As a <span className="text-white">student founder and scientific researcher</span>, Sreeram studies how cognitive development unfolds when learners are placed at the centre of their own discovery — drawing on <span className="text-white">andragogical principles</span> of self-direction, intrinsic motivation, and intuition-first reasoning to redesign how STEM concepts are introduced, internalised, and mastered.
            </p>
            <p>
              Through <span className="text-white">SciPhyLabs</span>, he is building that thesis into product: an <span className="text-white">interactive physics learning</span> ecosystem where every concept is a system to be played with, not a paragraph to be memorised. The mission is to change the cognitive trajectory of how the next generation learns STEM — proving that simulation-led pedagogy and immersive educational technology are the future of education.
            </p>
          </div>

          <dl className="pt-4 flex gap-8" aria-label="Key statistics">
            <div className="space-y-1">
              <dt className="sr-only">Years Researching</dt>
              <dd className="text-3xl font-display font-bold text-white tracking-tighter">
                <CountUp target={4} pad={2} suffix="+" />
              </dd>
              <p className="text-xs uppercase tracking-wider text-white/40 font-bold" aria-hidden="true">Years Researching</p>
            </div>
            <div className="space-y-1">
              <dt className="sr-only">Simulations Built</dt>
              <dd className="text-3xl font-display font-bold text-white tracking-tighter">
                <CountUp target={347} suffix="+" duration={1800} />
              </dd>
              <p className="text-xs uppercase tracking-wider text-white/40 font-bold" aria-hidden="true">Simulations Built</p>
            </div>
            <div className="space-y-1">
              <dt className="sr-only">STEM Domains</dt>
              <dd className="text-3xl font-display font-bold text-white tracking-tighter">
                <CountUp target={10} suffix="+" />
              </dd>
              <p className="text-xs uppercase tracking-wider text-white/40 font-bold" aria-hidden="true">STEM Domains</p>
            </div>
          </dl>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 relative aspect-square w-full max-w-md group m-0"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-lavender-haze/10 rounded-3xl blur-[40px] group-hover:blur-[60px] transition-all"
          />
          <div className="relative h-full w-full glass rounded-3xl overflow-hidden border-white/5">
            <img
              src="/sreeram-portrait.png"
              alt="Portrait of Sreeram Venugopal — student founder of SciPhyLabs and researcher in interactive physics learning."
              width="800"
              height="800"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent"
            />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 block">Founder</span>
                <span className="text-lg font-display font-bold text-white tracking-tight block">Sreeram Venugopal</span>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/80">
                SciPhyLabs
              </span>
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  );
};
