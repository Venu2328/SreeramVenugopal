import { motion } from 'motion/react';

const acts = [
  {
    year: '2022',
    title: 'Foundations',
    desc: 'Began researching the gap between mathematical rigour and physical intuition in conventional STEM pedagogy.',
  },
  {
    year: '2023',
    title: 'SciPhyLabs Founded',
    desc: 'Translated cognitive-development research into a self-directed simulation engine — crossing the 100-simulation milestone.',
  },
  {
    year: '2024',
    title: 'Andragogical Framework',
    desc: 'Scaled to 347+ interactive simulations across 10+ STEM domains and formalised the andragogical framework behind the platform.',
  },
  {
    year: 'Now',
    title: 'Research & Leadership',
    desc: 'Leading research on simulation-led learning and AI-native pedagogy — building SciPhyLabs as the foundation for a new model of STEM education.',
  },
];

export const Journey = () => {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6 border-t border-chalk/[0.06]"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-14 sm:mb-20">
          <p className="eyebrow text-gold/70 mb-4">In four acts</p>
          <h2 id="journey-heading" className="serif text-4xl sm:text-5xl md:text-6xl text-chalk">
            The <span className="italic text-ember">evolution.</span>
          </h2>
        </header>

        <ol className="relative space-y-12 list-none p-0">
          <span
            aria-hidden="true"
            className="absolute left-[6px] top-3 bottom-3 w-px bg-gradient-to-b from-gold/50 via-gold/15 to-transparent"
          />
          {acts.map((a, i) => (
            <motion.li
              key={a.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative pl-12 group"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 w-[13px] h-[13px] rounded-full bg-ink border border-gold/50 group-hover:bg-gold transition-colors duration-500"
              />
              <article className="space-y-2">
                <span className="brush text-gold text-3xl leading-none block">{a.year}</span>
                <h3 className="serif text-2xl text-chalk">{a.title}</h3>
                <p className="font-body text-lg text-chalk/55 leading-relaxed max-w-xl">{a.desc}</p>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
