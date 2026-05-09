import { motion } from 'motion/react';

const timelineData = [
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
    desc: 'Scaled to 347+ interactive physics simulations across 10+ STEM domains and formalised the andragogical framework behind the platform.',
  },
  {
    year: 'Present',
    title: 'Research & Leadership',
    desc: 'Leading research on simulation-led learning and AI-native pedagogy — building SciPhyLabs as the foundation for a new model of STEM education.',
  },
];

export const Journey = () => {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 sm:mb-16 md:mb-20">
          <h2
            id="journey-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-3 sm:mb-4"
          >
            The Evolution
          </h2>
          <p className="text-sm sm:text-base text-white/40 font-light">
            From early research into cognitive development to leading a new model of STEM education.
          </p>
        </header>

        <ol className="relative space-y-10 sm:space-y-12 list-none p-0">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-lavender-haze/40 via-lavender-haze/10 to-transparent"
          />

          {timelineData.map((item, i) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 group"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-3 w-4 h-4 rounded-full glass border-lavender-haze/40 group-hover:bg-lavender-haze transition-all duration-500"
              />

              <article className="space-y-2">
                <time className="text-lavender-haze font-display font-bold text-base sm:text-lg block">{item.year}</time>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-lg italic">{item.desc}</p>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
