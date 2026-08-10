/**
 * Prerender step.
 *
 * Runs after the client and SSR builds. Renders <App /> to a static HTML string
 * and injects it into the built index.html, so crawlers that don't execute
 * JavaScript still receive the full page. The client bundle then takes over
 * normally on load.
 *
 * Fails loudly rather than silently shipping an empty shell — a soft failure
 * here would be invisible and would quietly undo the whole point of the step.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const serverEntry = resolve(root, 'dist-ssr/entry-server.js');
const MARKER = '<div id="root"></div>';

if (!existsSync(serverEntry)) {
  console.error(`[prerender] SSR bundle missing at ${serverEntry}`);
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (!appHtml || appHtml.length < 1000) {
  console.error(`[prerender] rendered output suspiciously small (${appHtml?.length ?? 0} chars)`);
  process.exit(1);
}

const html = readFileSync(htmlPath, 'utf-8');

if (!html.includes(MARKER)) {
  console.error(`[prerender] could not find ${MARKER} in dist/index.html`);
  process.exit(1);
}

writeFileSync(htmlPath, html.replace(MARKER, `<div id="root">${appHtml}</div>`), 'utf-8');

// The SSR bundle is a build artefact only; it must never be deployed.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });

const kb = (Buffer.byteLength(appHtml, 'utf8') / 1024).toFixed(1);
console.log(`[prerender] injected ${kb} kB of prerendered HTML into dist/index.html`);
