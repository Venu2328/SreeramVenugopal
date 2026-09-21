import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { Ticker } from '../components/paper/Ticker';
import { Writing } from '../components/Writing';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

/**
 * The writing supplement.
 *
 * Essays get a supplement of their own rather than a slot at the foot of the
 * front page, because they are the one part of the record that grows on its own
 * schedule — a section sized for two pieces would need rebuilding at five.
 */
const ticker = [
  'Essays',
  'Medium',
  'Interactive-first learning',
  'Exam preparation',
  'Notes on teaching',
];

export const WritingPage = () => (
  <>
    <Masthead page="writing" edition="Writing" />
    <Dateline centre="Essays · Notes · Medium" edition="Writing Supplement" />

    <main id="main-content" tabIndex={-1}>
      <div className="border-b border-ink">
        <Ticker words={ticker} />
      </div>
      <Writing />
      <Contact />
    </main>

    <Footer />
  </>
);
