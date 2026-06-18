import { ArrowUpRight, Mail } from 'lucide-react';
import { Reveal } from './motion/Reveal';

const links = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sreeram-venugopal-701531376/' },
  { name: 'Medium', href: 'https://medium.com/@sreeram23db' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCMww2T1ZzUvdUMowVRyANGA' },
  { name: 'Instagram', href: 'https://www.instagram.com/venuuu7_' },
];

export const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-28 sm:py-36 px-5 sm:px-8 bg-ink text-paper scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="crimson-rule" aria-hidden="true" />
            <span className="eyebrow text-paper/60">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="contact-heading"
            className="display font-semibold leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,8vw,6rem)]"
          >
            Let's work
            <br />
            <span className="text-paper/55">together.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg text-paper/65 leading-relaxed">
            Open to collaborations, consulting, and conversations about education and building useful
            things. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="mailto:sreeram23db@gmail.com"
            className="group mt-10 inline-flex items-center gap-3 bg-crimson text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-ink transition-colors"
          >
            <Mail size={18} aria-hidden="true" />
            sreeram23db@gmail.com
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-14 pt-8 border-t border-paper/15 flex flex-wrap gap-x-8 gap-y-3 list-none p-0">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-paper/60 hover:text-white link-underline"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
