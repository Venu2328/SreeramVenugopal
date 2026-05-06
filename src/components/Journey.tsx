import { motion } from 'motion/react';

const timelineData = [
  {
    year: '2022',
    title: 'Foundations',
    desc: 'Began exploring simulation engines and identifying gaps in traditional physics pedagogy.',
  },
  {
    year: '2023',
    title: 'SciPhy Lab Launch',
    desc: 'Officially started SciPhy Labs, reaching the 100+ simulation milestone and defining the core interactive engine.',
  },
  {
    year: '2024',
    title: 'Systems & Strategy',
    desc: 'Scaled to 347+ simulations while studying startup ideation and product-led growth frameworks.',
  },
  {
    year: 'Present',
    title: 'Research & Fellowships',
    desc: 'Conducting outreach for global CS/AI fellowships and bridging simulations with AI-native learning.',
  },
];

export const Journey = () => {
  return (
    <section id="journey" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">The Evolution</h2>
          <p className="text-white/40 font-light">Documenting the progress from a student project to a scalable educational ecosystem.</p>
        </header>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-lavender-haze/40 via-lavender-haze/10 to-transparent" />

          {timelineData.map((item, i) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 group"
            >
              {/* Dot */}
              <div className="absolute left-0 top-3 w-4 h-4 rounded-full glass border-lavender-haze/40 group-hover:bg-lavender-haze transition-all duration-500" />
              
              <div className="space-y-2">
                <span className="text-lavender-haze font-display font-bold text-lg">{item.year}</span>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-white/50 leading-relaxed max-w-lg italic">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
