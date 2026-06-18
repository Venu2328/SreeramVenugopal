/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Quote } from './components/Quote';
import { Profile } from './components/Profile';
import { SciPhyLabs } from './components/SciPhyLabs';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Resources } from './components/Resources';
import { Contact } from './components/Contact';
import { Recognition } from './components/Recognition';
import { Footer } from './components/Footer';
import { Atmosphere } from './components/atmosphere/Atmosphere';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        <Atmosphere />

        <div className="relative z-10">
          <Navbar />

          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Quote />
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
    </MotionConfig>
  );
}
