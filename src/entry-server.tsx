import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Server entry, used only at build time to prerender each route into static
 * HTML.
 *
 * The site is a client-rendered SPA: without this, everything a crawler
 * receives is an empty `<div id="root">`. Google will execute the JavaScript
 * eventually, but Bing, LinkedIn, Slack and most AI crawlers largely will not —
 * so the ventures, the council description and the institution count never
 * reach them. Rendering to a string at build time puts all of it in the initial
 * response at zero runtime cost.
 *
 * `url` selects the route, because the app resolves its page from the path and
 * there is no `window` here to read one from.
 *
 * Every browser-only API in the tree (IntersectionObserver, matchMedia,
 * window.scrollY, getElementById) is called inside useEffect, which never runs
 * during renderToString — so this is safe without guards.
 */
export function render(url = '/'): string {
  return renderToString(<App path={url} />);
}
