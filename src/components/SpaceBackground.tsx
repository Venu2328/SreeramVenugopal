import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Create static dots
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-graphite">
      {/* Subtle Gradient Overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lavender-haze/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-lavender-haze/3 blur-[100px] rounded-full" />
      
      <motion.div style={{ y }} className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </motion.div>

      {/* Grainy overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
    </div>
  );
};
