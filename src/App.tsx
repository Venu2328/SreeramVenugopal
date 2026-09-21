/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { Grain } from './components/effects/Grain';
import { Home } from './pages/Home';
import { Ventures } from './pages/Ventures';
import { Speaking } from './pages/Speaking';
import { Proof } from './pages/Proof';
import { Author } from './pages/Author';
import { Research } from './pages/Research';
import { WritingPage } from './pages/WritingPage';

/**
 * Routing, such as it is.
 *
 * Seven pages do not justify a router. Navigation is plain `<a href>`, which
 * means every link is a real page load served from a real prerendered HTML
 * file — better for crawlers than client-side routing, and it keeps the
 * prerender step honest, since there is no route the build can silently miss.
 *
 * `path` is supplied by the server entry at build time and read from the
 * browser at runtime. Anything unrecognised falls through to the front page,
 * which is also what Vercel's SPA rewrite does for unknown URLs.
 */
export default function App({ path }: { path?: string }) {
  const route =
    path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  const normalised = route.replace(/\/+$/, '') || '/';

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Grain />

      {normalised === '/ventures' ? (
        <Ventures />
      ) : normalised === '/speaking' ? (
        <Speaking />
      ) : normalised === '/credentials' ? (
        <Proof />
      ) : normalised === '/author' ? (
        <Author />
      ) : normalised === '/research' ? (
        <Research />
      ) : normalised === '/writing' ? (
        <WritingPage />
      ) : (
        <Home />
      )}
    </MotionConfig>
  );
}
