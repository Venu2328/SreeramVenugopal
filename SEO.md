# SEO & Online-Presence Playbook — Sreeram Venugopal

Goal: when someone searches **"Sreeram Venugopal"**, page one is dominated by *your*
properties (this site, SciPhyLabs, your verified profiles) and Google treats them as
**one person/entity** — not the doctor or other namesakes.

This site is the **canonical hub**. Everything points here; this points back to everything.

---

## ✅ Done on this site (in code)

- **`sameAs` graph** — all 13 profiles + SciPhyLabs listed in the Person JSON-LD (`index.html`).
- **ORCID** added as a structured `identifier` (strong academic-authority signal).
- **Visible `rel="me"` links** — the footer "Find me online" hub + Contact links use
  `rel="me"`, the recognised identity-verification signal.
- **Correct, consistent metadata** — title, description, OG/Twitter, manifest, sitemap all
  updated to the new positioning and the 500+ count. (Old "Student Founder / 347 / andragogical"
  copy fully removed.)
- **Favicon fixed** — real `favicon.ico` (star) generated; icons wired with `?v=2` cache-bust.
- **Sitemap + robots.txt** present and pointing at the canonical domain.

> After deploying, the SERP still shows old text/favicon until Google **re-crawls**. Force it:
> Google Search Console → URL Inspection → *Request Indexing* (see below).

---

## 🔁 Off-page — the reciprocal links (do these once)

Google verifies identity when profiles link **back** to your site. On each profile, set the
website/link field to `https://sreeramvenugopal.com`:

| Profile        | Where to add the backlink |
|----------------|---------------------------|
| LinkedIn       | Contact info → Website (label "Portfolio") + add to About |
| ORCID          | Websites & social links → add site |
| GitHub         | Profile → Website field; pin SciPhyLabs repo; add to bio |
| GitLab         | Profile → Website |
| Dev.to         | Settings → Website URL |
| Medium         | Profile → add site to bio |
| about.me       | Add site as primary link |
| Linktree       | Add the site as the top link |
| Google Site    | Link to the domain prominently |
| X              | Profile → Website |
| Threads        | Bio link |
| Instagram      | Bio → Website |
| Facebook       | Intro → Website |

Use the **same name and headline everywhere**: *"Sreeram Venugopal — Founder, Author &
Researcher of SciPhyLabs"*. Consistency is what merges the profiles into one entity.

---

## 🚀 Get indexed fast

1. **Google Search Console** (search.google.com/search-console)
   - Add & verify `sreeramvenugopal.com`.
   - Submit `https://sreeramvenugopal.com/sitemap.xml`.
   - URL Inspection → Request Indexing for the homepage (re-do after each big change).
2. **Bing Webmaster Tools** — add the site, import from GSC, submit sitemap.
3. Confirm the rich result: **Google Rich Results Test** on the homepage → Person should parse.

---

## 🏛️ Build authority (ongoing)

- **Wikidata item** — create one for yourself (occupation: founder/researcher; link ORCID,
  GitHub, this site). Wikidata feeds Google's Knowledge Graph and can trigger a
  knowledge panel. High leverage.
- **Crossref / ResearchGate / Google Scholar** — if you publish, link ORCID so academic
  results cluster under you (and outrank the doctor namesake).
- **Publish regularly** on Medium + Dev.to with the same author name, each linking back here.
  Fresh, on-topic content is the strongest ranking signal you control.
- **SciPhyLabs** — cross-link the platform and this portfolio both ways; add the same Person
  schema/author there.
- Seed a few quality mentions (school/college features, interviews, directory listings) that
  link to the domain — quality over quantity.

---

## 🧭 Keep consistent (NAP-style for a person)

Name • Headline • Photo • Bio • Link — identical across all 13 profiles. Update them together
whenever the positioning changes. The list of canonical URLs lives in
[`src/data/profiles.ts`](src/data/profiles.ts) and the JSON-LD `sameAs` in `index.html` — keep
both in sync.
