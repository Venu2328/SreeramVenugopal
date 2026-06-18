/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { SciPhyLabs } from './components/SciPhyLabs';
import { Projects } from './components/Projects';
import { Recognition } from './components/Recognition';
import { Journey } from './components/Journey';
import { Resources } from './components/Resources';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
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
    </MotionConfig>
  );
}
