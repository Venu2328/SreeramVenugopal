/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { SciPhyLabs } from './components/SciPhyLabs';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Resources } from './components/Resources';
import { Contact } from './components/Contact';
import { SpaceBackground } from './components/SpaceBackground';
import { Recognition } from './components/Recognition';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-lavender-haze/30">
      <SpaceBackground />

      <div className="relative z-10">
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Profile />
          <SciPhyLabs />
          <Projects />
          <Recognition />
          <Journey />
          <Resources />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
