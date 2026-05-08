import { motion } from 'motion/react';
import { MagicCard } from './effects/MagicCard';

const certs = [
  {
    title: 'CS in Data Science & AI',
    issuer: 'IIT Madras · School Connect',
    logo: '/logos/iit-madras.png',
    alt: 'Indian Institute of Technology Madras logo',
  },
  {
    title: 'Economic Finance & Money Matters',
    issuer: 'IIT Madras · School Connect',
    logo: '/logos/iit-madras.png',
    alt: 'Indian Institute of Technology Madras logo',
  },
  {
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage · Certified',
    logo: '/logos/google.svg',
    alt: 'Google Digital Garage logo',
  },
];

export const Recognition = () => {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-heading"
      className="py-24 px-6 bg-white/[0.01]"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <p className="text-lavender-haze font-bold uppercase tracking-widest text-[10px] mb-3">
            Credentials
          </p>
          <h2
            id="recognition-heading"
            className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight"
          >
            Certifications & Recognition
          </h2>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.li
              key={cert.title + cert.issuer}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
              }}
            >
              <MagicCard maxTilt={5} spotlightRadius={240} spotlightOpacity={0.13} className="rounded-3xl h-full">
                <div className="p-6 rounded-3xl glass border-white/5 flex flex-col items-center text-center gap-4 hover:border-lavender-haze/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden h-full">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-lavender-haze/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center bg-white/[0.03] border border-white/5 group-hover:scale-110 transition-transform">
                    <img
                      src={cert.logo}
                      alt={cert.alt}
                      width="56"
                      height="56"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </MagicCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
