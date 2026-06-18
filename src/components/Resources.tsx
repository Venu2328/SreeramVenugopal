import { ArrowUpRight, ExternalLink } from 'lucide-react';
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

export const Resources = () => {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="py-24 sm:py-32 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
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

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.title} delay={i * 0.06}>
              <article className="group h-full p-7 rounded-lg border border-line bg-paper hover:border-ink/25 transition-colors flex flex-col justify-between min-h-[210px]">
                <div className="space-y-3">
                  <span className="eyebrow text-crimson">{post.tag}</span>
                  <h3 className="display text-xl sm:text-2xl text-ink leading-snug">{post.title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed">{post.note}</p>
                </div>
                <div className="pt-6 flex items-center justify-between">
                  <span className="eyebrow text-stone">Coming soon</span>
                  <ArrowUpRight size={18} className="text-stone group-hover:text-crimson transition-colors" aria-hidden="true" />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
