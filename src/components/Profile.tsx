import { motion } from 'motion/react';
import { CountUp } from './effects/CountUp';

const stats = [
  { label: 'Years Researching', node: <CountUp target={4} suffix="+" /> },
  { label: 'Simulations Built', node: <CountUp target={347} suffix="+" duration={1800} /> },
  { label: 'STEM Domains', node: <CountUp target={10} suffix="+" /> },
];

export const Profile = () => {
  return (
    <section id="profile" aria-labelledby="profile-heading" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* film-still framed portrait */}
        <motion.figure
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1 m-0 mx-auto w-full max-w-sm"
        >
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-chalk/10 flex items-center justify-center"
            data-portrait-slot
            style={{ background: 'linear-gradient(160deg, rgba(217,182,95,0.16), rgba(111,99,166,0.16) 60%, rgba(10,10,11,0.9))' }}
          >
            {/* image-free film still — drop a portrait here later */}
            <span aria-hidden="true" className="brush brush-rough text-[clamp(4rem,14vw,8rem)] text-chalk/15 leading-none">SV</span>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span className="hand text-2xl text-chalk leading-none">Sreeram, ’26</span>
              <span className="ui glass-gold text-gold text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full">
                Founder
              </span>
            </figcaption>
          </div>
          {/* corner registration marks */}
          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((p) => (
            <span key={p} className={`absolute ${p} w-4 h-4 border-gold/40 ${
              p.includes('top') ? 'border-t' : 'border-b'
            } ${p.includes('left') ? 'border-l' : 'border-r'}`} aria-hidden="true" />
          ))}
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 space-y-7"
        >
          <p className="eyebrow text-gold/70">Who I am</p>
          <h2 id="profile-heading" className="serif text-4xl sm:text-5xl md:text-6xl text-chalk leading-[1.08]">
            Engineering how a generation{' '}
            <span className="italic text-ember">learns physics.</span>
          </h2>

          <div className="font-body text-lg sm:text-xl text-chalk/65 leading-relaxed space-y-5">
            <p>
              As a <span className="text-chalk">student founder and scientific researcher</span>, I study how
              cognitive development unfolds when learners are placed at the centre of their own discovery —
              drawing on <span className="text-chalk italic">andragogical principles</span> of self-direction,
              intrinsic motivation and intuition-first reasoning.
            </p>
            <p>
              Through <span className="text-chalk">SciPhyLabs</span> I'm turning that thesis into product: a place
              where every concept is a system to be played with, not a paragraph to be memorised — proving that
              simulation-led pedagogy is the future of how the next generation learns STEM.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 border-t border-chalk/10" aria-label="Key statistics">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1">
                <dd className="brush text-gold text-3xl sm:text-4xl leading-none">{s.node}</dd>
                <dt className="ui text-[10px] uppercase tracking-[0.18em] text-chalk/40 font-bold">{s.label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};
