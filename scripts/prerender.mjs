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
      card: 'ventures',
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
      card: 'speaking',
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
      card: 'credentials',
    },
  },
  {
    path: '/author',
    out: 'dist/author.html',
    head: {
      title:
        'The G.O.A.T. Series — Physics books by Sreeram Venugopal, Author & Researcher',
      description:
        'The G.O.A.T. Series — Guide Of All Time — academic physics books by Sreeram Venugopal for Grade 11 and 12, written against how modern Indian education teaches the subject and built around a Gen Z learning strategy, interactive simulations and a PYQ vault.',
      canonical: `${ORIGIN}/author`,
      card: 'author',
    },
  },
  {
    path: '/research',
    out: 'dist/research.html',
    head: {
      title:
        'Research Papers, Journals & Conferences — Sreeram Venugopal, Researcher',
      description:
        'Peer-reviewed research by Sreeram Venugopal on virtual laboratories and infrastructure in Indian school education, tested against the complete 2024-25 UDISE+ census. Indexed on ORCID, with the working record on GitHub.',
      canonical: `${ORIGIN}/research`,
      card: 'research',
    },
  },
  {
    path: '/writing',
    out: 'dist/writing.html',
    head: {
      title: 'Writing — Essays by Sreeram Venugopal on learning & physics',
      description:
        'Essays by Sreeram Venugopal on what is actually broken in exam preparation and what interactive-first learning does differently, published on Medium.',
      canonical: `${ORIGIN}/writing`,
      card: 'writing',
    },
  },
];

/**
 * Per-route structured data.
 *
 * Every route used to inherit index.html's graph wholesale, which meant seven
 * URLs each declaring themselves the ProfilePage for the front page, and seven
 * copies of one FAQPage and one ItemList. That contradicts each page's own
 * canonical and is a textbook duplicate signal — the likeliest reason the
 * supplements were not being indexed.
 *
 * Now the shared entities (Person, SciPhyLabs, WebSite) stay on every page,
 * because they are facts about the site rather than about the page, while the
 * page-specific blocks are swapped for one that says what this URL is.
 */
const crumb = (name, path) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name, item: `${ORIGIN}${path}` },
  ],
});

const page = (path, name, description, extra = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${ORIGIN}${path}#webpage`,
  url: `${ORIGIN}${path}`,
  name,
  description,
  isPartOf: { '@id': `${ORIGIN}/#website` },
  about: { '@id': `${ORIGIN}/#person` },
  primaryImageOfPage: { '@id': `${ORIGIN}${path}#primaryimage` },
  inLanguage: 'en-US',
  breadcrumb: crumb(name, path),
  ...extra,
});

const schemaFor = {
  '/ventures': [
    page('/ventures', 'Advanced EdTech — SciPhyLabs',
      'SciPhyLabs, the interactive physics platform founded by Sreeram Venugopal.',
      { mainEntity: { '@id': `${ORIGIN}/#sciphylab` } }),
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'SciPhyLabs',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Android, iOS, Web',
      url: 'https://sciphylabs.vercel.app',
      author: { '@id': `${ORIGIN}/#person` },
      description:
        'An interactive physics platform with 400+ simulations, aligned to the JEE, NEET, AP, SAT and CUET syllabi.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
  ],
  '/speaking': [
    page('/speaking', 'Active Keynote Speaker & Leader',
      'Talks, debates and panels by Sreeram Venugopal, with unedited footage.'),
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Taking the floor — Youth Parliament, opposition bench',
      description:
        'Ninety seconds of a case argued in front of a hall, unscripted and on the record.',
      thumbnailUrl: `${ORIGIN}/thumbnail-yt1.png`,
      uploadDate: '2026-09-20',
      embedUrl: 'https://www.youtube-nocookie.com/embed/mUIMg18RI4U',
      contentUrl: 'https://www.youtube.com/watch?v=mUIMg18RI4U',
      author: { '@id': `${ORIGIN}/#person` },
    },
  ],
  '/credentials': [
    page('/credentials', 'Proof of Work & Credentials',
      'Coursework, training and recognition awarded to Sreeram Venugopal, each one scanned.'),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${ORIGIN}/credentials#credentials`,
      name: 'Credentials held by Sreeram Venugopal',
      itemListElement: [
        ['CS in Data Science & AI', 'IIT Madras', '2024'],
        ['Economic Finance & Money Matters', 'IIT Madras', '2024'],
        ['Fundamentals of Digital Marketing', 'Google Digital Garage', '2025'],
        ['Introduction to Robotics & STEM', 'India STEM Foundation', '2026'],
        ['ESL005: Business-Proficient English as a Second Language', 'Saylor Academy', '2025'],
        ['CS105: Introduction to Python', 'Saylor Academy', '2025'],
      ].map(([name, issuer, year], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name,
          credentialCategory: 'certificate',
          dateCreated: year,
          recognizedBy: { '@type': 'Organization', name: issuer },
          about: { '@id': `${ORIGIN}/#person` },
        },
      })),
    },
  ],
  '/author': [
    page('/author', 'The G.O.A.T. Series',
      'Academic physics books for Grade 11 and 12, written by Sreeram Venugopal.'),
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Physics Masterbook — for Grade 11 & 12',
      author: { '@id': `${ORIGIN}/#person` },
      inLanguage: 'en',
      bookEdition: 'The G.O.A.T. Series',
      about: ['Physics', 'JEE', 'NEET', 'CUET', 'Competitive exam preparation'],
      publisher: { '@id': `${ORIGIN}/#sciphylab` },
      image: `${ORIGIN}/books/PHYSICS (1) sv.png`,
    },
  ],
  '/research': [
    page('/research', 'Research Papers, Journals & Conferences',
      'Peer-review-pending research by Sreeram Venugopal on virtual laboratories in Indian schools.'),
    {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      '@id': `${ORIGIN}/research#paper`,
      headline:
        'Where Virtual Laboratories Cannot Reach: digital capacity for virtual science laboratories is lowest in the Indian schools that lack physical laboratories',
      name: 'Where Virtual Laboratories Cannot Reach',
      author: { '@id': `${ORIGIN}/#person` },
      datePublished: '2026-09-21',
      inLanguage: 'en',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      creativeWorkStatus: 'Preprint',
      url: `${ORIGIN}/research`,
      sameAs: `${ORIGIN}/preprint.html`,
      abstract:
        'At least 537,486 Indian schools cannot run a cloud-connected virtual science laboratory, and the schools that lack physical laboratories are disproportionately among them. An analysis of the complete UDISE+ 2024-25 census covering all 1,471,473 recognised schools, deriving sharp Frechet-Hoeffding bounds rather than assuming independence.',
      keywords:
        'virtual laboratories, Indian school education, UDISE+, STEM infrastructure, educational technology, Frechet-Hoeffding bounds',
      encoding: { '@type': 'MediaObject', contentUrl: `${ORIGIN}/Research-Whitepaper.pdf`, encodingFormat: 'application/pdf' },
    },
  ],
  '/writing': [
    page('/writing', 'Writing — Notes on learning',
      'Essays by Sreeram Venugopal on exam preparation and interactive-first learning.'),
  ],
};

/**
 * Blocks that belong to the front page alone. A supplement carrying these is
 * claiming to be the profile page, and repeating one FAQ across seven URLs is
 * how a site teaches a crawler to ignore its FAQ entirely.
 */
const HOME_ONLY = ['"@type": "ProfilePage"', '"@type": "FAQPage"', '"@type": "ItemList"'];

/** Drops the <script> block containing a given marker. */
const dropBlock = (html, marker) => {
  const at = html.indexOf(marker);
  if (at === -1) return html;
  const open = html.lastIndexOf('<script type="application/ld+json">', at);
  const close = html.indexOf('</script>', at) + '</script>'.length;
  if (open === -1 || close < open) return html;
  return html.slice(0, open) + html.slice(close);
};

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

    /*
     * Its own card. Seven URLs sharing one image is a duplicate signal and a
     * wasted impression — a card naming the page is what earns the click.
     */
    if (route.head.card) {
      const card = `${ORIGIN}/og/${route.head.card}.png`;
      for (const attr of ['property="og:image"', 'property="og:image:secure_url"', 'name="twitter:image"']) {
        html = swap(html, new RegExp(`<meta ${attr} content="[^"]*"`), `<meta ${attr} content="${card}"`, attr);
      }
      for (const attr of ['property="og:image:alt"', 'name="twitter:image:alt"']) {
        html = swap(html, new RegExp(`<meta ${attr} content="[^"]*"`), `<meta ${attr} content="${esc(title)}"`, attr);
      }
    }

    /* A supplement is an article, not somebody's profile. */
    html = swap(
      html,
      /<meta property="og:type" content="[^"]*"/,
      '<meta property="og:type" content="article"',
      'og:type',
    );

    /* Strip the front page's own blocks, then state what this URL is. */
    for (const marker of HOME_ONLY) html = dropBlock(html, marker);

    const blocks = schemaFor[route.path];
    if (!blocks) {
      console.error(`[prerender] no structured data defined for ${route.path}`);
      process.exit(1);
    }
    const injected = blocks
      .map((b) => `<script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n</script>`)
      .join('\n    ');
    html = html.replace('</head>', `  ${injected}\n  </head>`);

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
