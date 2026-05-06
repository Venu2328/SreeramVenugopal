import { motion } from 'motion/react';
import { Award, ShieldCheck, GraduationCap, Cpu } from 'lucide-react';

const certs = [
  {
    title: 'Google Cloud Certified',
    issuer: 'Associate Cloud Engineer',
    icon: ShieldCheck,
  },
  {
    title: 'Meta Certified',
    issuer: 'Digital Marketing Associate',
    icon: GraduationCap,
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    icon: Cpu,
  },
  {
    title: 'Stanford Online',
    issuer: 'Technology & Education Studies',
    icon: Award,
  }
];

export const Recognition = () => {
  return (
    <section className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1,
                duration: 0.5
              }}
              className="p-6 rounded-3xl glass border-white/5 flex flex-col items-center text-center gap-4 hover:border-lavender-haze/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-lavender-haze/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-lavender-haze/10 flex items-center justify-center text-lavender-haze group-hover:scale-110 transition-transform">
                <cert.icon size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white tracking-tight">{cert.title}</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
