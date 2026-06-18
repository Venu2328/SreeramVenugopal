import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './motion/Reveal';

const capabilities = [
  'Interactive simulations you can manipulate in real time, built for genuine understanding',
  'Coverage aligned to JEE, NEET, SAT and AP physics',
  'Formulas, derivations and notes linked directly to the system they describe',
  'Progress tracking that rewards consistent, self-directed practice',
];

export const SciPhyLabs = () => {
  return (
    <section
      id="sciphylabs"
      aria-labelledby="sciphylabs-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-paper-2 border-y border-line scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="02"
          kicker="Flagship project"
          title={<span id="sciphylabs-heading">SciPhyLabs — physics you can actually feel.</span>}
          className="max-w-3xl"
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            {/* swappable product preview slot */}
            <div
              data-preview-slot
              className="relative aspect-video rounded-lg border border-line bg-paper overflow-hidden shadow-[0_24px_60px_-30px_rgba(24,22,20,0.4)]"
            >
              <div aria-hidden="true" className="absolute top-0 inset-x-0 h-9 border-b border-line bg-paper-2 flex items-center gap-1.5 px-4">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-crimson/40" />
                <span className="ml-3 text-[11px] text-stone">sciphylabs.app</span>
              </div>
              <svg aria-hidden="true" viewBox="0 0 400 200" className="absolute inset-0 top-9 w-full h-[calc(100%-2.25rem)]">
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="20" y1={y} x2="380" y2={y} stroke="#e3ded4" />
                ))}
                <path d="M20 165 Q 120 40 200 110 T 380 60" fill="none" stroke="#a51c30" strokeWidth="2.5" />
                <circle cx="200" cy="110" r="4.5" fill="#a51c30" />
                <circle cx="300" cy="84" r="3" fill="#181614" />
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <p className="text-lg text-ink-soft leading-relaxed">
              SciPhyLabs is an interactive physics platform with{' '}
              <span className="text-ink font-medium">500+ simulations across 10+ topics</span>. Instead of
              static diagrams, students work with live systems — adjusting variables and seeing the
              physics respond — which is how intuition actually forms.
            </p>

            <ul className="space-y-3.5 list-none p-0">
              {capabilities.map((c, i) => (
                <Reveal as="li" key={c} delay={0.05 * i} className="flex items-start gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0" />
                  <span>{c}</span>
                </Reveal>
              ))}
            </ul>

            <a
              href="https://sciphylabs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-crimson text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-crimson-deep transition-colors"
            >
              Visit SciPhyLabs
              <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
