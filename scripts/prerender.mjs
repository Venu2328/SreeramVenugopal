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
        'Advanced EdTech — SciPhyLabs by Sreeram Venugopal, Founder & Researcher',
      description:
        'SciPhyLabs — interactive physics built by Sreeram Venugopal, with 400+ simulations for students preparing for JEE, NEET, AP, SAT and CUET. Founder background, the simulations themselves, and the app on Android and iOS.',
      canonical: `${ORIGIN}/ventures`,
    },
  },
  {
    path: '/speaking',
    out: 'dist/speaking.html',
    head: {
      title:
        'Active Keynote Speaker & Leader — Sreeram Venugopal | Talks, Debate & Panels',
      description:
        'Sreeram Venugopal speaks and debates at schools, colleges, panels and youth parliaments across India, arguing for interactive learning and civic engagement. Unedited footage of talks and debates, plus every verified profile where the record is kept.',
      canonical: `${ORIGIN}/speaking`,
    },
  },
  {
    path: '/credentials',
    out: 'dist/credentials.html',
    head: {
      title:
        'Proof of Work & Credentials — Sreeram Venugopal | IIT Madras, Google, Duke',
      description:
        'The certificates behind the claims: coursework, training and recognition awarded to Sreeram Venugopal by IIT Madras, Google, iRISE, Saylor Academy, Duke, Jimper and the Government of India — each one issued, dated and scanned.',
      canonical: `${ORIGIN}/credentials`,
    },
  },
  {
    path: '/author',
    out: 'dist/author.html',
    head: {
      title:
        'The G.O.A.T. Series — Physics books by Sreeram Venugopal, Author & Researcher',
      description:
        'Sreeram Venugopal is authoring the G.O.A.T. Series — Guide Of All Time — academic physics books for Grade 11 and 12 students sitting national and international competitive exams, tied to interactive simulations and a PYQ vault. Plus published research papers, journals and conferences.',
      canonical: `${ORIGIN}/author`,
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
