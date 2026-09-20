/**
 * Prerender step.
 *
 * Runs after the client and SSR builds. Renders <App /> once per route to a
 * static HTML string, rewrites the head for that route, and writes one file per
 * page — so crawlers that don't execute JavaScript still receive the full page,
 * and each route carries its own title, description and canonical rather than
 * inheriting the front page's.
 *
 * Vercel checks the filesystem before applying the SPA rewrite in vercel.json,
 * so `dist/ventures.html` is what actually answers a request for /ventures.
 *
 * Fails loudly rather than silently shipping an empty shell or a page wearing
 * the wrong title — a soft failure here would be invisible and would quietly
 * undo the whole point of the step.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const serverEntry = resolve(root, 'dist-ssr/entry-server.js');
const MARKER = '<div id="root"></div>';
const ORIGIN = 'https://sreeramvenugopal.com';

/**
 * `head` is omitted for the front page, which already owns every tag in
 * index.html. Any other route restates the handful that must not be inherited.
 */
const routes = [
  { path: '/', out: 'dist/index.html' },
  {
    path: '/ventures',
    out: 'dist/ventures.html',
    head: {
      title:
        'SciPhyLabs & POPC — the ventures of Sreeram Venugopal, Founder & Researcher',
      description:
        'The two organisations founded by Sreeram Venugopal — founder, author and researcher at SciPhyLabs, an interactive physics platform for JEE, NEET, AP, SAT and CUET students, and founder of the Peacemakers of Puducherry Council, the largest student organisation in Puducherry, spanning 17 institutions with 112 registered members.',
      canonical: `${ORIGIN}/ventures`,
    },
  },
];

if (!existsSync(serverEntry)) {
  console.error(`[prerender] SSR bundle missing at ${serverEntry}`);
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const template = readFileSync(htmlPath, 'utf-8');

if (!template.includes(MARKER)) {
  console.error(`[prerender] could not find ${MARKER} in dist/index.html`);
  process.exit(1);
}

/**
 * Swaps the contents of a single tag, and fails the build if the tag it was
 * told to swap isn't there — a silent no-op would ship the wrong metadata.
 */
const swap = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    console.error(`[prerender] could not find ${label} in the template`);
    process.exit(1);
  }
  return html.replace(pattern, replacement);
};

for (const route of routes) {
  const appHtml = render(route.path);

  if (!appHtml || appHtml.length < 1000) {
    console.error(
      `[prerender] ${route.path} rendered suspiciously small (${appHtml?.length ?? 0} chars)`,
    );
    process.exit(1);
  }

  let html = template.replace(MARKER, `<div id="root">${appHtml}</div>`);

  if (route.head) {
    const { title, description, canonical } = route.head;
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

    html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, '<title>');

    for (const attr of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
      html = swap(
        html,
        new RegExp(`<meta ${attr} content="[^"]*"`),
        `<meta ${attr} content="${esc(description)}"`,
        attr,
      );
    }

    for (const attr of ['property="og:title"', 'name="twitter:title"']) {
      html = swap(
        html,
        new RegExp(`<meta ${attr} content="[^"]*"`),
        `<meta ${attr} content="${esc(title)}"`,
        attr,
      );
    }

    html = swap(
      html,
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonical}"`,
      'canonical',
    );

    for (const attr of ['property="og:url"', 'name="twitter:url"']) {
      html = swap(
        html,
        new RegExp(`<meta ${attr} content="[^"]*"`),
        `<meta ${attr} content="${canonical}"`,
        attr,
      );
    }
  }

  writeFileSync(resolve(root, route.out), html, 'utf-8');

  const kb = (Buffer.byteLength(appHtml, 'utf8') / 1024).toFixed(1);
  console.log(`[prerender] ${route.path} → ${route.out} (${kb} kB of markup)`);
}

// The SSR bundle is a build artefact only; it must never be deployed.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
