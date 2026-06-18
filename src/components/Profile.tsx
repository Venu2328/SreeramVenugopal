import { SectionHeading } from './SectionHeading';
import { Reveal } from './motion/Reveal';
import { CountUp } from './effects/CountUp';

const stats = [
  { node: <CountUp target={347} suffix="+" duration={1700} />, label: 'Simulations built' },
  { node: <CountUp target={10} suffix="+" />, label: 'Topics covered' },
  { node: <>2023</>, label: 'Founded SciPhyLabs' },
];

export const Profile = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 sm:py-32 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="01"
          kicker="About"
          title={<span id="about-heading">Building tools that make hard ideas click.</span>}
          className="max-w-3xl"
        />

        <div className="mt-14 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
          <Reveal className="space-y-6 text-lg text-ink-soft leading-relaxed">
            <p>
              I started SciPhyLabs because most physics is taught as a wall of formulas to memorise.
              I wanted the opposite: a place where you can change a value, watch the system respond,
              and build real intuition for why things behave the way they do.
            </p>
            <p>
              That work sits at the intersection of three things I care about — software, teaching,
              and research into how people actually learn. Alongside SciPhyLabs I take on selected
              consulting and product work, and I write about education when I have something worth
              saying.
            </p>
            <p className="text-ink">
              The goal is simple: leave students understanding more than they did before, and prove
              that interactive, self-directed learning is better than rote.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-2">
            {/* swappable portrait slot — drop an image in here later */}
            <div
              data-portrait-slot
              className="relative aspect-[4/5] rounded-lg border border-line bg-paper-2 overflow-hidden flex items-center justify-center"
            >
              <span aria-hidden="true" className="display text-7xl text-line select-none">SV</span>
              <span className="absolute bottom-3 left-3 eyebrow text-stone">Portrait</span>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="display text-3xl sm:text-4xl text-ink leading-none">{s.node}</dd>
                  <dt className="mt-2 text-xs text-stone leading-tight">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
