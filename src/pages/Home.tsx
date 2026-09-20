import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { LeadStory } from '../components/LeadStory';
import { VentureStrip } from '../components/VentureStrip';
import { About } from '../components/About';
import { Credentials } from '../components/Credentials';
import { PullQuote } from '../components/PullQuote';
import { Journals } from '../components/Journals';
import { Media } from '../components/Media';
import { Projects } from '../components/Projects';
import { Journey } from '../components/Journey';
import { Writing } from '../components/Writing';
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
      <About />
      <Credentials />
      <PullQuote />
      <Journals />
      <Media />
      <Projects />
      <Journey />
      <Writing />
      <Contact />
    </main>

    <Footer />
  </>
);
