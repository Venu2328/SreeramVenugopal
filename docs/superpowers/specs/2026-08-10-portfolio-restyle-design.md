# Portfolio Restyle — "The Record"

**Date:** 2026-08-10
**Site:** sreeramvenugopal.com
**Stack:** Vite 6 · React 19 · Tailwind v4 (CSS-first `@theme`) · Framer Motion (`motion` v12) · Lucide · Vercel

Two things happen together: the visual layer is replaced with the POPC warm-editorial
varsity system, and the content is rebuilt around two real, externally verifiable
leadership positions. No new tools, no new dependencies, no CMS, no Wix.

---

## 1. Why the content changes

An evidence audit of the current site found claims that do not survive scrutiny:

| Claim on site | Finding |
| --- | --- |
| Writing section lists three essays | None exist. Two real Medium posts exist; all three cards linked to the profile, not to articles. |
| "Author & Researcher", "research-backed" | ORCID `0009-0009-2916-7633` returns `"group":[]` — zero registered works. |
| "500+ simulations across 10+ topics" | Not externally verifiable; `SEO.md` records it replaced an earlier "347". |
| "Certified by the best" | Two IIT Madras School Connect certs + Google Digital Garage (a free open course). |
| 4 project rows | All link to `#contact`. No URLs, dates, outcomes, or named clients. |
| Portrait | Empty slot rendering the letters "SV". |
| SciPhyLabs preview | Hand-drawn SVG mock, not a screenshot. |

Meanwhile the strongest asset was absent entirely: **Peacemakers of Puducherry Council**,
which the user founded and leads, and whose own site names him in the role. Civic
leadership (2021) predates the platform (2023), so the real chronology is also a better
narrative than the one being told.

**Governing rule for this work: nothing goes on the page that cannot be checked.**
Where evidence is missing, the claim is removed rather than softened into vagueness.

---

## 2. Positioning

Replaces "Founder, Author & Researcher of SciPhyLabs".

> **Founder & Committee Leader** — Peacemakers of Puducherry Council
> **Founder** — SciPhyLabs

Two named positions at named organisations with start dates, one of them corroborated by
a third-party site. This is the entire basis of the "professional / public figure" read.

**Retired titles:**

- **Researcher** — retired until ORCID lists works. Explicitly approved by the user.
- **Author** — retired on the same standard. Evidence is two Medium posts and one book
  marked "In progress". Flagged to the user, who did not object. *Assumption: this is
  accepted; reinstating it is a one-line change if the user disagrees.*

**Retired claims:** "research-backed", "driving growth in STEM education and schools
infrastructure", "500+ simulations", "10+ topics". All numeric platform claims are
dropped per the user's "describe without counting" decision.

**Numbers that stay** (all provable): 2021, 2023, six pillars, three initiatives, a
twelve-week cohort, three certifications. `CountUp` survives, fed only by these.

---

## 3. Verified source material

**Peacemakers of Puducherry Council** — est. 2021, Puducherry, India. Non-partisan.

> "The Peacemakers of Puducherry Council develops principled student leaders through
> education, service, innovation, and collaboration."

Six pillars: Leadership Development · Education · Community Service · Innovation ·
Collaboration · Youth Empowerment.

Three initiatives: **Leaders Lab** (twelve-week mentored cohort, proposal to public
showcase) · **Open Classroom** (free peer-led workshops in coding, design, finance,
public speaking, on partner campuses) · **Civic Corps** (neighbourhood service teams —
clean-ups, literacy drives, shelter support).

**Writing** — both real, both live, replacing three invented cards:

| Date | Title | URL | Tags |
| --- | --- | --- | --- |
| 19 May 2026 | The Future of JEE Preparation Isn't More PDFs | `medium.com/@sreeram23db/the-future-of-jee-preparation-isnt-more-pdfs-9d9ebb755315` | AI, Education |
| 6 May 2026 | SciPhyLabs — The revolution of the Decade. | `medium.com/@sreeram23db/sciphylabs-the-revolution-of-the-decade-072293126ec7` | Education, AI |

**Credentials** — CS in Data Science & AI (IIT Madras School Connect, 2024) · Economic
Finance & Money Matters (IIT Madras School Connect, 2024) · Fundamentals of Digital
Marketing (Google Digital Garage, 2023).

**Assets** — `public/logos/iit-madras.png`, `public/logos/google.svg` only. Both are real
institutional marks and are kept because they substantiate rather than decorate.

---

## 4. Design tokens — `src/index.css`

Tailwind v4 `@theme` cannot hold two palettes. Standard v4 pattern: raw hex on `:root`
and `.dark`, then `@theme inline` maps them onto utilities.

| Old utility | New utility | Light | Dark |
| --- | --- | --- | --- |
| `paper` | `bg` | `#faf6ec` | `#15110e` |
| `paper-2` | `surface` | `#f3ead7` | `#241d18` |
| — | `card` | `#fffdf8` | `#1d1814` |
| — | `accent` | `#f6e6d4` | `#2f251d` |
| `crimson` | `red` | `#d81f26` | `#ef3f42` |
| `crimson-deep` | `red-strong` | `#b3161c` | `#b3161c` |
| — | `red-soft` | `#f0c9ca` | `#f0c9ca` |
| — | `on-red` | `#fff8f2` | `#fff8f2` |
| `ink` | `ink` | `#1a1512` | `#f6efe2` |
| `ink-soft` | `ink-soft` | `#423a33` | `#ece2d2` |
| `stone` | `muted` | `#6f645a` | `#a89b8b` |
| `line` | `line` | `#e7dcc7` | `#322922` |
| — | `ink-shadow` | `#1a1512` | `#000000` |

`--ink-shadow` flips to pure black in dark so hard offset shadows still read — matching
POPC's `dark:border-black`.

Red is the only accent. Base radius `0.75rem`. Containers max-width 1152px.
Section rhythm 6–8rem, separated by a single hairline, never a shadow.

---

## 5. Typography

Fraunces is removed entirely. `index.html` swaps to Archivo (700/800/900) + Inter
(400/500/600) + JetBrains Mono (400/500), preserving the existing preconnect/preload
structure.

- `.display` — Archivo, `letter-spacing: -0.02em`, `text-wrap: balance`, leading 0.98–1.15
- `.eyebrow` — JetBrains Mono, uppercase, `0.15em`, 11px, muted
- `.eyebrow-dash` — adds the `— ` prefix via `::before`; applied to section mastheads
  only. Data labels (hero facts, project meta) stay bare, since "— ROLE" reads wrong
  on a definition list.
- `.index-num` — JetBrains Mono, tabular

**Hero size:** the directive specifies `clamp(2.5rem, 6vw, 4.5rem)`; the current site
uses `clamp(3rem, 12.5vw, 11rem)`. The directive wins — the name drops to ~72px at
desktop and is set on one line, with the watermark bleeding behind it. Flagged to the
user; reversible in one line.

**Buttons.** The directive's §4 (`rounded-full`) and §5.3 (hard brutalist) conflict.
Resolved against the reference implementation, which uses both for different things:

- `.btn-hard` — CTAs. `rounded-lg`, `border-2`, Archivo bold uppercase, `5px 5px 0`
  hard shadow. Hover `translate(2px,2px)` + `3px 3px 0`; active `translate(5px,5px)` +
  shadow 0. Variants `--primary` (red) and `--secondary` (card).
- `rounded-full` — nav pills, badges, tags only.

---

## 6. "The Record" — the scroll narrative

The page reads as one continuous printed dossier that assembles itself as you scroll.

- **Margin rail** — a sticky JetBrains Mono rail on the left edge showing the current
  section number and label, like a document margin. Updates on scroll. Hidden below `lg`.
- **Hairlines draw in** — section rules animate width 0→100% on enter rather than fading.
- **Pillars assemble** — the six POPC pillars land cell by cell, staggered `0.09s`.
- **Retained motions**, recoloured only: the Recognition credential curtain, the Journey
  scroll-drawn line, the Resources index rail. All three already satisfy "one signature
  per section" and are content-appropriate.

Reveals are `opacity 0→1`, `y 22→0`, `whileInView`, `once: true`, ease
`[0.16, 1, 0.3, 1]`. `prefers-reduced-motion` disables all transforms — already wired
through the app-level `MotionConfig reducedMotion="user"`.

### Signature devices, one per section

| Section | Device |
| --- | --- |
| Navbar | Condenses to a floating pill past 12px + theme toggle |
| Hero | Watermark **S**, masked 64px grid, duotone portrait layer, two hard CTAs |
| 01 Positions | Hairline record table, rules drawing in |
| 02 About | Marker highlight |
| 03 The Council | Six-pillar assembling grid |
| 04 SciPhyLabs | Marker highlight + typographic data panel |
| 05 Selected work | Marker highlight + red hover rail |
| 06 Credentials | *Existing curtain*, recoloured |
| 07 Timeline | *Existing drawn line*, recoloured |
| 08 Writing | *Existing index rail*, recoloured |
| Contact | Grid-lines + marker + hard CTA |

Global: paper grain, red text selection, recoloured scroll-progress bar.

---

## 7. Information architecture

| # | Section | Status | Content |
| --- | --- | --- | --- |
| — | Hero | Rewritten | Name, both positions, Puducherry, two CTAs, facts strip |
| 01 | **Positions** | **New** | Office · organisation · term · mandate · verification link |
| 02 | About | Rewritten | Civic-first biography |
| 03 | **The Council** | **New** | Mission, six pillars, three initiatives → popcindia.vercel.app |
| 04 | SciPhyLabs | Revised | Numbers dropped; SVG mock replaced by type/data panel |
| 05 | Selected work | Revised | Honest status labels; no fake links |
| 06 | Credentials | Revised | Heading softened; curtain + logos kept |
| 07 | Timeline | Rebuilt | Opens 2021 with POPC |
| 08 | Writing | Rewritten | Two real articles, real dates, deep links |
| — | Contact | Restyled | Content unchanged |
| — | Footer | Restyled | `rel="me"` identity hub unchanged |

Sections 01 and 03 are additions; nothing is deleted. Routes are unchanged (single page,
hash anchors). Existing anchors `#about #sciphylabs #work #credentials #writing #contact`
are preserved so inbound links keep working; `#positions` and `#council` are added.

**Timeline open question:** provable entries are 2021 (POPC founded), 2023 (SciPhyLabs
founded), May 2026 (began publishing). The 2022 and 2024 entries are removed as
unsupported. The user should supply real milestones for the gap, or the timeline ships
with three entries plus "Now".

---

## 8. Portrait handling

User decision: **faint background layer only** — never presented as a portrait, never
scrutinised.

- Tight crop, live SVG `feColorMatrix` duotone to ink/cream, heavy contrast, ~6–8%
  opacity, behind the hero grid, typography over it.
- Rendered with in-browser SVG filters, not a pre-edited asset, so it is tunable live.
- **Progressive enhancement:** requires `public/portrait.jpg`. If absent, the hero falls
  back to watermark + grid and reads as intentional. The build must not break without it.
- The slot is designed so a real headshot can replace it later with no redesign.

---

## 9. SEO

**Buildable now (on-page / technical):**

- `Person` ↔ `Organization` JSON-LD graph — Sreeram as `founder` and `member` of POPC,
  POPC as a named `Organization` with `foundingDate: 2021` and `location: Puducherry`.
  This is the high-value change: POPC's site independently names him, so the entity pair
  is externally corroborated.
- `Article` schema for both Medium posts with real `datePublished`.
- Three-way cross-linking: portfolio ↔ popcindia.vercel.app ↔ sciphylabs.vercel.app.
- Metadata rewrite dropping "Researcher", "research-backed" and the schools-infrastructure
  claim; adding POPC. Existing ORCID `identifier` stays (the iD is real) but nothing
  implies publications.
- `sitemap.xml`, `robots.txt`, manifest already correct — updated for the new anchors.

**Not buildable — stated plainly:** third-party backlinks cannot be manufactured, and
purchased ones incur penalties. `SEO.md`'s existing reciprocal-link playbook (set the
website field on all 13 profiles) is the correct approach and requires the user's logins.

---

## 10. Dark mode

- `ThemeToggle` — Sun/Moon in a `rounded-full` pill in the navbar. `localStorage.theme`
  → `matchMedia('(prefers-color-scheme: dark)')` fallback. Toggles `.dark` on `<html>`.
- Inline `<head>` script sets the class before first paint to prevent a light flash.
- `<meta name="color-scheme" content="light dark">`; `theme-color` gains a media query.
- **Structural fix:** Contact is currently `bg-ink text-paper`, a hardcoded inversion that
  breaks under dark (light text on light). It gets a dedicated `--invert-bg` /
  `--invert-fg` pair so the slab stays dark in both themes.

---

## 11. New files

| File | Purpose |
| --- | --- |
| `src/components/Marker.tsx` | Marker highlight. Red block, `on-red` text, `-2deg`, `4px 4px 0` shadow, draws in via `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` on `whileInView`. Reduced motion: no draw, no tilt. |
| `src/components/ThemeToggle.tsx` | Light/dark control |
| `src/components/Positions.tsx` | Section 01 |
| `src/components/Council.tsx` | Section 03 |
| `src/components/effects/Grain.tsx` | Fixed `feTurbulence` overlay, ~2.5% opacity |
| `src/components/effects/DuotonePortrait.tsx` | Hero background layer + SVG filter defs |
| `src/components/motion/MarginRail.tsx` | Sticky dossier rail |
| `src/data/council.ts` | Pillars, initiatives, mission — single source of truth |
| `src/data/positions.ts` | Offices held |
| `src/data/writing.ts` | The two real articles |

Buttons are CSS classes, not a component — every CTA is a plain `<a>`, so a class is the
lighter fit.

---

## 12. Out of scope

Photography direction, POPC's own site, SciPhyLabs itself, off-page backlink work,
analytics, and any CMS or hosting change. No dependencies are added.

---

## 13. Open items

1. `public/portrait.jpg` — user must add the file; build tolerates its absence.
2. Timeline entries between 2023 and 2026 — user to supply, or ships with four entries.
3. "Author" — assumed retired; reinstating is a one-line change.
4. Reference site — user opted to send one but did not; POPC's own architecture is the
   model. Adjustable later.
