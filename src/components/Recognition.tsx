import { SectionHeading } from './SectionHeading';
import { Reveal } from './motion/Reveal';

const credentials = [
  { title: 'CS in Data Science & AI', issuer: 'IIT Madras — School Connect', year: '2024' },
  { title: 'Economic Finance & Money Matters', issuer: 'IIT Madras — School Connect', year: '2024' },
  { title: 'Fundamentals of Digital Marketing', issuer: 'Google Digital Garage', year: '2023' },
];

export const Recognition = () => {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-paper-2 border-y border-line scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="04"
          kicker="Credentials"
          title={<span id="credentials-heading">Certifications &amp; coursework.</span>}
          className="max-w-3xl"
        />

        <ul className="mt-14 list-none p-0 border-t border-line">
          {credentials.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06}>
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-6 border-b border-line">
                <span className="index-num text-sm text-stone">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display text-xl sm:text-2xl text-ink leading-tight">{c.title}</h3>
                  <p className="text-sm text-stone mt-1">{c.issuer}</p>
                </div>
                <span className="display text-lg sm:text-xl text-crimson">{c.year}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
