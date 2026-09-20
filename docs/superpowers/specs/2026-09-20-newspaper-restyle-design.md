# Newspaper restyle — design

**Date:** 2026-09-20
**Status:** approved, in implementation

## Goal

Rebuild sreeramvenugopal.com as a printed broadsheet: cream ground, black ink,
Claude orange as the single accent. Replaces the dark/varsity-red theme entirely.

Adds two content subsystems the site did not have — published journals and
video/press media — and moves the two ventures onto their own prerendered page.

## Palette

Dark tokens are removed, not recoloured. The old atmospherics (red duotone
portrait, vignette, glow, 64px grid) were built for a black ground and read as
mud on cream, so they go with them.

| Token          | Value     | Use                                    |
| -------------- | --------- | -------------------------------------- |
| `paper`        | `#F4F0E6` | page ground                            |
| `paper-raised` | `#EAE4D6` | alternating bands                      |
| `ink`          | `#1A1714` | headlines, body, heavy masthead rules  |
| `ink-soft`     | `#4A443B` | body copy                              |
| `muted`        | `#8A8073` | datelines, captions, section marks     |
| `rule`         | `#D5CDBC` | column hairlines                       |
| `orange`       | `#D97757` | the single accent                      |
| `slab`         | `#26221C` | inverted bands (pull-quote, contact)   |

## Type

Playfair Display 700/800/900 + italic carries the masthead and every headline —
the high-contrast didone is what makes the page read as print. Inter stays for
body copy; JetBrains Mono stays for datelines, kickers, stats and section marks.

## Routes

Two pages, no router dependency. `App` switches on `window.location.pathname`;
navigation is plain `<a href>`, which means real page loads and therefore real
prerendered HTML for every URL. Vercel serves static files ahead of the SPA
rewrite already in `vercel.json`, so `/ventures` resolves to `ventures.html`.

- `/` — the front page
- `/ventures` — SciPhyLabs (§ A) and POPC (§ B) feature spreads

`scripts/prerender.mjs` loops both routes and writes both files.
`entry-server.tsx` takes a url argument.

## Front page order

Top strip → masthead → nav rule → dateline → lead story → ventures strip →
credentials → pull-quote slab → journals → media → projects → timeline →
writing → contact slab → footer.

The lead story is a three-column spread. The portrait (`/founder15.png`) is a
framed photograph in the centre column — greyscale, hard contrast, with a
halftone dot screen over it so it reads as printed newsprint. It is no longer a
background wash.

## Credentials

Google, IIT Madras x2 and iRISE render as white paper tiles pinned to the page:
each slightly rotated, real paper shadow, issuing logo printed large, course
title in Playfair, year as a mono stamp. They straighten on hover.

Logos live at the public root (`/iit-madras2.png`, `/logos/google.svg`,
`/logos/Rise-india.png`). The component renders a typeset monogram in the well
when a logo file is missing, rather than a broken image.

## Devices

The ventures carry their organisation's mark. `sciphylabs-logo2-sv.png` is a
white mark on transparency — legible on a dark ground, invisible on cream — so
it is printed in ink: `filter: brightness(0)` drives every opaque pixel black
while leaving the alpha channel alone, which is what a logo becomes when it goes
through a press. The lavender-backed `sciphylabs-logo-sv.png` is unused; its
field fights the palette.

An organisation with no logo file is set as a typographic monogram at the same
size, so the pair of venture cards keeps one rhythm.

## Data contracts

```ts
// src/data/journals.ts — ships empty; entries replace the placeholder cards
{ title, journal, year, abstract, doi?, pdf, cover?, tags }

// src/data/media.ts
{ title, outlet, youtubeId, start?, end?, note }
```

Journals render two-up as newspaper clippings with a `READ PAPER` button. While
the array is empty the section still prints, with dashed `AWAITING PUBLICATION`
slots — the section is meant to be visibly reserved, not hidden.

Media renders click-to-load facades: a still frame and an orange play button,
with the YouTube iframe mounted only on click. `start`/`end` (in seconds) clip
playback to the relevant passage.

First entry: `mUIMg18RI4U`, 4:30-6:00 => `start: 270, end: 360`, with
`/thumbnail-yt1.png` as its poster — YouTube's own thumbnail for that recording
is a frame of a different speaker.

The clip autoplays, muted, when it reaches the screen rather than at document
load. YouTube's `loop` requires the video named as a single-item `playlist`, and
a player in playlist mode ignores `controls=0` — so the card keeps its own clock
and loops by remounting. The iframe is `pointer-events: none`, which suppresses
the hover title bar, the related-video rail and the unmute button at once; the
card supplies its own pause control outside the frame, since autoplaying content
needs a stop under WCAG 2.2.2. Reduced-motion visitors get the poster instead.

## CSP

`vercel.json` currently sets `default-src 'self'` and `img-src 'self' data:`,
which blocks both the YouTube iframe and its thumbnails. Adds exactly:

- `frame-src https://www.youtube-nocookie.com https://www.youtube.com`
- `https://i.ytimg.com` to `img-src`

## Removals

- Venice and Swaminathan Enterprises leave `Projects`.
- A small mono line below the project list points at `github.com/Venu2328`
  for the remaining work: `SEE ALL 14+ PROJECTS ON GITHUB`.
