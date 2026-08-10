# Portfolio Rebuild — Dark Cinematic

**Date:** 2026-08-10
**Site:** sreeramvenugopal.com
**Stack:** Vite 6 · React 19 · Tailwind v4 (CSS-first `@theme`) · Framer Motion (`motion` v12) · Lucide · Vercel

Two things happened together: the content was rebuilt around two real, externally
verifiable leadership positions, and the visual layer was rebuilt dark and cinematic.
No new tools, no new dependencies, no CMS, no page builder.

> **Direction history.** This began as a warm cream + varsity red "editorial varsity"
> restyle modelled on popcindia.vercel.app, then moved to a public-figure brief, then
> settled on dark cinematic (davidkushnerofficial.com as mood reference, not as a
> template). The content architecture below survived all three changes unaltered, which
> is why it is documented first — it is the durable half of this work.

---

## 1. Why the content changed

An evidence audit of the previous site found claims that did not survive scrutiny:

| Claim on site | Finding |
| --- | --- |
| Writing section listed three essays | None existed. Two real Medium posts existed; all three cards linked to the profile, not to articles. |
| "Author & Researcher", "research-backed" | ORCID `0009-0009-2916-7633` returns `"group":[]` — zero registered works. |
| "500+ simulations across 10+ topics" | Not externally verifiable; `SEO.md` records it replaced an earlier "347". |
| "Certified by the best" | Two IIT Madras School Connect certs + Google Digital Garage, a free open course. |
| 4 project rows | All linked to `#contact`. No URLs, dates, outcomes, or named clients. |
| Portrait | Empty slot rendering the letters "SV". |
| SciPhyLabs preview | A hand-drawn SVG mock, not a screenshot. |

Meanwhile the strongest asset was absent entirely: **Peacemakers of Puducherry Council**,
which Sreeram founded and leads, and whose own site names him in the role.

**Founding date — corrected 2026-08-11.** The council's site publishes `Est. 2021` both as
visible text and as `"foundingDate":"2021"` in its JSON-LD. Sreeram confirmed the real
founding year is **2026** and undertook to correct the council site. This portfolio now
states 2026 throughout. Until popcindia.vercel.app is updated the two properties
contradict each other in machine-readable data, which is the one outstanding risk to the
corroboration strategy in §9.

The correction inverts the narrative: SciPhyLabs (2023) predates the council (2026) by
three years, so the About section leads with the platform and the timeline opens in 2023.

**Governing rule: nothing goes on the page that cannot be checked.** Where evidence is
missing the claim is removed, not softened into vagueness.

---

## 2. Positioning

Replaces "Founder, Author & Researcher of SciPhyLabs".

> **Founder & Committee Leader** — Peacemakers of Puducherry Council
> **Founder** — SciPhyLabs

Two named positions at named organisations with start dates, one corroborated by a
third-party site. This is the entire basis of the professional/public-figure read.

**Retired titles:** *Researcher* (approved by the user — retired until ORCID lists works)
and *Author* (same standard; evidence is two Medium posts and one book marked "In
progress"). Flagged to the user, who did not object. Reinstating either is a one-line change.

**Retired claims:** "research-backed", "driving growth in STEM education and schools
infrastructure", "500+ simulations", "10+ topics". All numeric platform claims dropped per
the user's "describe without counting" decision.

**Numbers that remain**, all provable: 2023, 2026, six pillars, three initiatives, a
twelve-week cohort, three certifications. `CountUp` survives, fed only by these.

---

## 3. Verified source material

**Peacemakers of Puducherry Council** — est. 2026, Puducherry, India. Non-partisan.

> "The Peacemakers of Puducherry Council develops principled student leaders through
> education, service, innovation, and collaboration."

Six pillars: Leadership Development · Education · Community Service · Innovation ·
Collaboration · Youth Empowerment.

Three initiatives: **Leaders Lab** (twelve-week mentored cohort, proposal to public
showcase) · **Open Classroom** (free peer-led workshops in coding, design, finance and
public speaking on partner campuses) · **Civic Corps** (neighbourhood service teams —
clean-ups, literacy drives, shelter support).

Transcribed verbatim into `src/data/council.ts` so the two properties cannot drift apart.

**Writing** — both real, both live, replacing three invented cards:

| Date | Title | Tags |
| --- | --- | --- |
| 19 May 2026 | The Future of JEE Preparation Isn't More PDFs | AI, Education |
| 6 May 2026 | SciPhyLabs — The revolution of the Decade. | Education, AI |

**Credentials** — CS in Data Science & AI (IIT Madras School Connect, 2024) · Economic
Finance & Money Matters (IIT Madras School Connect, 2024) · Fundamentals of Digital
Marketing (Google Digital Garage, 2023).

**Assets** — `public/logos/iit-madras.png`, `public/logos/google.svg`, and
`public/founder15.png`. The logos are real institutional marks and are kept because they
substantiate rather than decorate.

---

## 4. Design tokens — `src/index.css`

A warm near-black ground, not a cold one. `#000` reads cheap and turns photography grey;
the ground is `#0d0b0a`. Depth comes from vignette, grain and hairlines — never from
blurred drop shadows. Red is the only accent and the only source of light, carried across
from the council's site so the two properties read as one identity.

| Utility | Hex | Role |
| --- | --- | --- |
| `ground` | `#0a0908` | Deepest — contact slab, footer |
| `bg` | `#0d0b0a` | Page ground |
| `surface` | `#131010` | Raised band |
| `card` | `#171413` | Card / hover state |
| `line` | `#272120` | Hairline |
| `line-strong` | `#3a312e` | Emphasised hairline, control borders |
| `ink` | `#f2ece3` | Primary text — warm off-white |
| `ink-soft` | `#b3a99f` | Secondary text |
| `muted` | `#7d736c` | Labels, captions, data |
| `red` | `#e0242a` | The single accent |
| `red-bright` | `#ff3b40` | Hover / glow |
| `red-deep` | `#a8161b` | Pressed |
| `on-red` | `#fff6f2` | Text on red |

Containers max-width 1152px via `.shell`. Section rhythm 6–8rem, separated by a single
hairline. Corners are square — rounding is reserved for nav pills and status badges.

---

## 5. Typography

Archivo (700/800/900) + Inter (400/500/600) + JetBrains Mono (400/500), replacing
Fraunces. Loaded in `index.html` with the existing preconnect/preload structure.

- `.display` — Archivo 800, `-0.02em`, leading 1.02; `.display-tight` drops to 0.94
- `.eyebrow` — JetBrains Mono, uppercase, `0.15em`, 11px
- `.eyebrow-dash` — adds the `— ` prefix; section mastheads only, never definition labels
- `.mono` — tabular figures for indices and dates
- `h1/h2/h3` get `text-wrap: balance` globally

**Hero size.** The original brief pinned this to `clamp(2.5rem, 6vw, 4.5rem)`. That figure
came from the cream editorial system; cinematic depends on scale, so the hero is
`clamp(2.75rem, 10.5vw, 8.5rem)`. This is a deliberate departure and is flagged for the
user.

**Controls.** The brutalist hard-shadow button belonged to the varsity system and was
dropped. `.btn` is a hairline ghost control — mono, uppercase, wide tracking, square —
that fills with red light on hover. `.btn-solid` is the red variant with a bloom.

---

## 6. Motion

Reveals are `opacity 0→1`, `y 22→0`, `whileInView`, `once: true`, `0.85s`, ease
`[0.16, 1, 0.3, 1]` — longer than typical, because on a dark ground a quick fade reads as
a flicker while a slow one reads as a camera settling. Children stagger at `0.09s`.
`prefers-reduced-motion` is honoured globally via `MotionConfig reducedMotion="user"`, and
individually in every scroll-scrubbed component.

### One signature per section

| Section | Device |
| --- | --- |
| Navbar | Condenses into a bordered translucent pill past 12px |
| Hero | Duotone portrait layer, 64px grid, red pool, vignette, mono facts strip |
| 01 Positions | Hairline record table with verification links |
| 02 About | Accent keyword + provable counters |
| 03 The Council | Six pillars assembling cell by cell, staggered `0.09s` |
| 04 SciPhyLabs | Spec sheet — the technical register |
| 05 Selected work | Status badges; rows are only links when a real URL exists |
| 06 Credentials | *Retained* red curtain, scroll-scrubbed and reversible |
| 07 Timeline | *Retained* scroll-drawn red line |
| 08 Writing | *Retained* red index rail, now on real articles |
| Contact | Grid + red pool + accent keyword |

Global: film grain, red text selection, red scroll-progress bar, and a fixed **margin rail**
(xl+) showing the running section number and label like the running head on a printed
document.

`Accent` is the one repeated flourish: a keyword lit red with a rule that draws in beneath
it. Used once per heading, never twice.

---

## 7. Information architecture

| # | Section | Status |
| --- | --- | --- |
| — | Hero | Rewritten — name, both positions, facts strip |
| 01 | **Positions** | **New** — office, term, mandate, verification link |
| 02 | About | Rewritten civic-first |
| 03 | **The Council** | **New** — mission, six pillars, three initiatives |
| 04 | SciPhyLabs | Numbers dropped; SVG mock replaced by a spec sheet |
| 05 | Selected work | Honest status labels; no fake links |
| 06 | Credentials | Heading softened; curtain and logos kept |
| 07 | Timeline | Rebuilt, opens 2023 |
| 08 | Writing | Two real articles, real dates, deep links |
| — | Contact / Footer | Restyled; `rel="me"` hub unchanged |

Existing anchors are preserved so inbound links keep working; `#positions` and `#council`
are added.

---

## 8. Portrait handling

The source is a casual snapshot, so it is never presented as a portrait. It is cropped
hard to the head, pushed through an SVG `feComponentTransfer` ramp mapping black to the
page ground and white to the accent red, held at 30% opacity behind a radial mask, and
parallaxed on scroll. What survives is a red-lit silhouette; the room falls into shadow.

A real `feColorMatrix`/`feComponentTransfer` ramp is used rather than CSS filters because
CSS can desaturate but cannot re-map the endpoints of the tonal range — and the endpoints
are the whole effect.

**Progressive enhancement:** if `public/founder15.png` is absent the hero falls back to
grid and vignette and still reads as intentional. The layer is `aria-hidden` throughout.

---

## 9. SEO

**Built:**

- **Person ↔ Organization entity graph** — Sreeram as `founder`, `employee` and
  `memberOf` the council; the council as a named `Organization` with `foundingDate: 2026`
  and Puducherry as `foundingLocation`. This is the highest-value change, because
  popcindia.vercel.app names him independently, so the pair is externally corroborated.
- `Article` schema for both Medium posts with real `datePublished`, wrapped in an `ItemList`.
- Three-way cross-linking: portfolio ↔ popcindia.vercel.app ↔ sciphylabs.vercel.app.
- Metadata rewritten throughout — title, description, OG, Twitter, FAQ, breadcrumbs — with
  every retired claim removed. ORCID stays as a real `identifier`; nothing implies publications.
- Dead schema image references (`sreeram-portrait.png`, `sciphylabs-preview.png`, both 404)
  removed.

**Not buildable, stated plainly:** third-party backlinks cannot be manufactured, and
purchased ones incur penalties. `SEO.md`'s reciprocal-link playbook — set the website field
on all 13 profiles — is the correct approach and needs the user's logins.

---

## 10. Theme

The site is dark-only. An earlier decision added a light/dark toggle, which was dropped
when the direction changed: cinematic *is* dark, and a light mode would dismantle the
concept. `color-scheme: dark` is declared on `html`, and `theme-color` is `#0d0b0a`.

This also removed the need for the Contact-section fix — the old hardcoded `bg-ink
text-paper` inversion is gone, replaced by `bg-ground`.

---

## 11. Files

**New:** `data/positions.ts` · `data/council.ts` · `data/writing.ts` ·
`components/Positions.tsx` · `components/Council.tsx` · `components/Accent.tsx` ·
`components/effects/Grain.tsx` · `components/effects/Portrait.tsx` ·
`components/motion/MarginRail.tsx`

**Rewritten:** `index.html` · `src/index.css` · `App.tsx` · `Navbar` · `Hero` · `Profile` ·
`SciPhyLabs` · `Projects` · `Recognition` · `Journey` · `Resources` · `Contact` · `Footer` ·
`SectionHeading` · `motion/Reveal` · `motion/ScrollProgress`

**Untouched:** `data/profiles.ts` · `effects/CountUp.tsx` · `effects/MagneticButton.tsx`

Buttons are CSS classes rather than a component, because every CTA is a plain `<a>`.

---

## 12. Verification

`tsc --noEmit` clean · `vite build` clean (35.6 kB CSS, 374 kB JS, 118 kB gzipped) ·
custom utilities and `@theme` variables confirmed present in the built CSS · dev server
serves 200 for the document, the portrait and both logos.

Not verified: visual rendering in a browser. No browser tooling was available in this
session, so layout, the duotone result and motion timing need a human look.

---

## 13. Open items

1. **Correct popcindia.vercel.app to 2026** — visible `Est. 2021` text and the
   `"foundingDate":"2021"` JSON-LD. Until then the two sites disagree in structured data.
2. **Confirm the council's founding month.** The timeline carries two 2026 entries —
   "started writing publicly" (May 2026, known) and "founded the council" (month unknown,
   currently placed second). Reorder if the council came first.
3. **Timeline 2024→2026 gap.** Real dated milestones — cohorts run, workshops hosted,
   campuses partnered, Civic Corps drives — belong here.
4. **`og-image.png` is stale** — it was designed for the old cream site and no longer
   matches. Needs regenerating.
5. All first-person copy is a draft written on the user's behalf and should be read as
   such before it ships.
6. A real headshot would let the portrait be promoted from atmosphere to a portrait proper.
