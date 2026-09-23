import { Masthead } from '../components/paper/Masthead';
import { PressRun } from '../components/paper/PressRun';
import { Dateline } from '../components/paper/Dateline';
import { LeadStory } from '../components/LeadStory';
import { VentureStrip } from '../components/VentureStrip';
import { AdvancedEdtech } from '../components/edtech/AdvancedEdtech';
import { SpeakingSection } from './Speaking';
import { ProofSection } from './Proof';
import { BooksSection } from './Author';
import { ResearchSection } from './Research';
import { Writing } from '../components/Writing';
import { PullQuote } from '../components/PullQuote';
import { Journey } from '../components/Journey';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

/**
 * The front page — the whole paper, in one scroll.
 *
 * Every supplement runs inline here, in the order the story is told: what was
 * built, what is said out loud, what backs it, what is being written, what has
 * been researched, and what has been published. A reader who does nothing but
 * scroll sees all of it.
 *
 * The supplements still exist as their own routes. Each one is the same section
 * component wrapped in a nameplate, so there is one copy of every section and
 * the two readings cannot drift apart — and a link to /speaking or /research
 * still lands somewhere real, which matters for anyone sharing a single part of
 * the record rather than the whole of it.
 */
export const Home = () => (
  <>
    <PressRun />
    <Masthead page="home" />
    <Dateline />

    <main id="main-content" tabIndex={-1}>
      <LeadStory />
      <VentureStrip />

      <AdvancedEdtech />
      <SpeakingSection />
      <ProofSection />
      <BooksSection />
      <ResearchSection />
      <Writing />

      <PullQuote />
      <Journey />
      <Contact />
    </main>

    <Footer />
  </>
);
