import { motion } from 'motion/react';
import { Award } from 'lucide-react';

const awards = [
  {
    badge: 'Certified',
    title: 'CS in Data Science & AI',
    issuer: 'IIT Madras · School Connect',
    year: '2024',
  },
  {
    badge: 'Certified',
    title: 'Economic Finance & Money Matters',
    issuer: 'IIT Madras · School Connect',
    year: '2024',
  },
  {
    badge: 'Certified',
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    year: '2023',
  },
];

export const Recognition = () => {
  return (
    <section id="recognition" aria-labelledby="recognition-heading" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 sm:mb-16">
          <p className="eyebrow text-gold/70 mb-4">Recognition</p>
          <h2 id="recognition-heading" className="serif text-4xl sm:text-5xl md:text-6xl text-chalk">
            Credentials &amp; <span className="italic text-ember">honours.</span>
          </h2>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none p-0 max-w-4xl mx-auto">
          {awards.map((a, i) => (
            <motion.li
              key={a.title}
              initial={{ opacity: 0, y: 16, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, y: -4 }}
              className="group"
            >
              {/* hand-drawn award badge */}
              <div className="relative h-full p-7 rounded-[14px] border border-gold/25 bg-ink-2/60 text-center flex flex-col items-center gap-3 overflow-hidden">
                <span
                  aria-hidden="true"
                  className="absolute inset-1.5 rounded-[10px] border border-dashed border-gold/15 pointer-events-none"
                />
                <span className="relative w-12 h-12 rounded-full glass-gold flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  <Award size={22} aria-hidden="true" />
                </span>
                <span className="hand text-ember text-xl leading-none">{a.badge}</span>
                <h3 className="serif text-xl text-chalk leading-snug px-1">{a.title}</h3>
                <p className="ui text-[10px] uppercase tracking-[0.18em] text-chalk/40 font-bold">{a.issuer}</p>
                <span className="brush text-gold/50 text-2xl leading-none mt-1">{a.year}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
