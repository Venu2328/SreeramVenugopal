import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Server entry, used only at build time to prerender the page into static HTML.
 *
 * The site is a client-rendered SPA: without this, everything the crawler
 * receives is an empty `<div id="root">`. Google will execute the JavaScript
 * eventually, but Bing, LinkedIn, Slack and most AI crawlers largely will not —
 * so the positions, the council description and the institution count never
 * reach them. Rendering to a string at build time puts all of it in the initial
 * response at zero runtime cost.
 *
 * Every browser-only API in the tree (IntersectionObserver, matchMedia,
 * window.scrollY, getElementById) is called inside useEffect, which never runs
 * during renderToString — so this is safe without guards.
 */
export function render(): string {
  return renderToString(<App />);
}
