import { Masthead } from '../components/paper/Masthead';
import { Dateline } from '../components/paper/Dateline';
import { AdvancedEdtech } from '../components/edtech/AdvancedEdtech';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

/**
 * The Advanced EdTech supplement.
 *
 * It opens on its own nameplate rather than on a section heading, because this
 * page is not a chapter of the front page — it is the paper the product gets to
 * itself. The founder background and the startup's record follow underneath as
 * § A.
 *
 * The site's own masthead stays at the top: a supplement of a paper is still
 * that paper. Only the dateline changes, to say which edition you are holding.
 */
export const Ventures = () => (
  <>
    <Masthead page="ventures" edition="Advanced EdTech" />
    <Dateline
      centre="SciPhyLabs · Est. 2023 — Interactive physics"
      edition="EdTech Supplement"
    />

    <main id="main-content" tabIndex={-1}>
      <AdvancedEdtech />
      <Contact />
    </main>

    <Footer />
  </>
);
