/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { MarginRail } from './components/motion/MarginRail';
import { Grain } from './components/effects/Grain';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Positions } from './components/Positions';
import { Profile } from './components/Profile';
import { Council } from './components/Council';
import { SciPhyLabs } from './components/SciPhyLabs';
import { Projects } from './components/Projects';
import { Recognition } from './components/Recognition';
import { Journey } from './components/Journey';
import { Resources } from './components/Resources';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/** Drives the running head in the left margin. Order must match the page. */
const rail = [
  { id: 'positions', index: '01', label: 'Positions' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'council', index: '03', label: 'The Council' },
  { id: 'sciphylabs', index: '04', label: 'The Platform' },
  { id: 'work', index: '05', label: 'Selected Work' },
  { id: 'credentials', index: '06', label: 'Credentials' },
  { id: 'journey', index: '07', label: 'Timeline' },
  { id: 'writing', index: '08', label: 'Writing' },
];

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Grain />
      <MarginRail entries={rail} />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Positions />
        <Profile />
        <Council />
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
