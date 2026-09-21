import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { LeadStory } from '../components/LeadStory';
import { VentureStrip } from '../components/VentureStrip';
import { PullQuote } from '../components/PullQuote';
import { Journey } from '../components/Journey';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

/**
 * The front page, in printing order: nameplate, dateline, lead story, then the
 * sections lettered § A through § G down the page.
 */
export const Home = () => (
  <>
    <Masthead page="home" />
    <Dateline />

    <main id="main-content" tabIndex={-1}>
      <LeadStory />
      <VentureStrip />
      <PullQuote />
      <Journey />
      <Contact />
    </main>

    <Footer />
  </>
);
