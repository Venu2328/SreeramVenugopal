import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './motion/Reveal';

const posts = [
  {
    title: 'Why physics needs simulations',
    note: 'On the gap between knowing the formula and understanding the idea.',
    tag: 'Education',
  },
  {
    title: 'Building 500 simulations',
    note: 'What I learned shipping a large interactive library at speed.',
    tag: 'Engineering',
  },
  {
    title: 'Teaching with AI, carefully',
    note: 'Where AI helps students learn — and where it quietly gets in the way.',
    tag: 'AI',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Resources = () => {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="py-24 sm:py-32 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            index="06"
            kicker="Writing"
            title={<span id="writing-heading">Notes on learning.</span>}
          />
          <Reveal delay={0.1}>
            <a
              href="https://medium.com/@sreeram23db"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 eyebrow text-crimson link-underline"
            >
              All writing on Medium <ExternalLink size={13} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 space-y-5 list-none p-0">
          {posts.map((post, i) => (
            <motion.li
              key={post.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -22% 0px' }}
              transition={{ duration: 0.6, ease }}
            >
              <a
                href="https://medium.com/@sreeram23db"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-line bg-paper hover:border-crimson transition-colors duration-300"
              >
                {/* royal crimson index rail */}
                <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
                <div className="pl-7 sm:pl-9 pr-6 py-7 sm:py-8 flex items-start gap-5 sm:gap-8">
                  <span className="display text-3xl sm:text-4xl text-crimson leading-none shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="eyebrow text-stone">{post.tag}</span>
                    <h3 className="display text-2xl sm:text-3xl text-ink leading-snug mt-1.5 group-hover:text-crimson transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-ink-soft mt-2 leading-relaxed">{post.note}</p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="text-stone shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-crimson transition-all"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <Reveal delay={0.05} className="mt-8 text-center">
          <span className="eyebrow text-stone">More essays coming soon</span>
        </Reveal>
      </div>
    </section>
  );
};
