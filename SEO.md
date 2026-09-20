# SEO & digital-presence playbook — Sreeram Venugopal

Goal: when someone searches **"Sreeram Venugopal"**, page one is your properties, and
Google treats them as **one entity** — not the doctor or other namesakes.

`sreeramvenugopal.com` is the canonical hub. Everything points here; this points back.

---

## Live audit — 2026-08-11

Every property fetched directly. `backlink` = the page's HTML contains a link to
`sreeramvenugopal.com`.

| Property | HTTP | Backlink | Notes |
| --- | --- | --- | --- |
| sreeramvenugopal.com | 200 | — | Canonical hub |
| popcindia.vercel.app | 200 | ✅ | Corroborates the council role |
| sciphylabs.vercel.app | 200 | ❌ | **Gap — your own site, fix first** |
| github.com/Venu2328 | 200 | ✅ | |
| gitlab.com/Venu2328 | 200 | ✅ | |
| dev.to/sreeram23_ | 200 | ✅ | |
| about.me | 200 | ✅ | `robots: index` |
| linktr.ee | 200 | ✅ | Published; self-canonical |
| sites.google.com/view/… | 200 | ✅ | Published, real content |
| orcid.org | 200 | ❌ | **Gap — high-authority domain** |
| medium.com/@sreeram23db | 403 | ? | Bot-blocked; feed confirms it works |
| linkedin.com | 999 | ? | Bot-blocked (LinkedIn always returns 999) |
| x.com | 200 | ? | JS-rendered — check manually |
| threads.com | 200 | ? | JS-rendered — check manually |
| instagram.com | 200 | ? | JS-rendered — check manually |
| facebook.com/venuuu7 | 400 | ? | **Verify this URL is correct** |

### What the audit settles

**The Google Site and Linktree are both published.** Both return 200 with real content
and working backlinks. The Google Site carries a full bio, both ventures, and a "Visit
Website" button pointing here.

**Nothing is blocked from indexing.** No `noindex` meta on any property; Google Sites'
`robots.txt` permits `/view/` pages; Linktree and Dev.to set correct self-canonicals.

**So "not published" was never the problem.** Published, crawlable and indexed are three
different states, and only the first two are technically guaranteed. The remaining
obstacle is authority and time, not configuration.

---

## Why a live page still doesn't rank

1. **Nothing links to it.** A page with no inbound links is a page Google has little
   reason to crawl often or rank. Your profiles all link *out* to the hub; few link *in*.
2. **Shared-domain pages are deprioritised.** `sites.google.com/view/*` sits on a domain
   with millions of pages, most of them low quality. Google treats those URLs
   conservatively regardless of how good yours is.
3. **It has not been submitted.** Google does not promise to find anything on its own.
4. **It is new.** Ranking for a personal name against established namesakes takes months
   of consistent signals, not days.

---

## Do these, in order

### 1. Close the two backlink gaps (highest value, fully in your control)

- **SciPhyLabs → add a link to `sreeramvenugopal.com`.** You own this site, so it costs
  nothing. Put it in the footer and on any about page, with descriptive anchor text —
  "Built by Sreeram Venugopal", not "click here". Add the same `Person` JSON-LD used on
  POPC, reusing `@id: https://sreeramvenugopal.com/#person`.
- **ORCID → add the website.** Sign in → *Websites & social links* → add
  `https://sreeramvenugopal.com`. ORCID is a high-authority academic domain and currently
  links nowhere.

### 2. Verify the Facebook URL

`facebook.com/venuuu7` returned 400. If that URL is wrong, it is a dead link in your
`sameAs` schema on every page, which weakens the whole graph. Correct it in
`src/data/profiles.ts` and in `index.html`, or remove it.

### 3. Submit everything

- **Google Search Console** — add and verify `sreeramvenugopal.com`, submit
  `sitemap.xml`, then URL Inspection → *Request Indexing* on the homepage. Repeat after
  each significant change.
- **Bing Webmaster Tools** — add the site, import from GSC, submit the sitemap.
- Do the same for **popcindia.vercel.app** and **sciphylabs.vercel.app**. Three verified
  properties beat one.
- Confirm the entity graph parses: **Google Rich Results Test** on the homepage.

### 4. Set the website field on every remaining profile

Google merges identities when profiles link back. Set the link field to
`https://sreeramvenugopal.com` on: LinkedIn (Contact info → Website), Medium (bio), X,
Threads, Instagram (bio), Facebook. Use the **same name and headline everywhere**:

> Sreeram Venugopal — Founder & Committee Leader, Peacemakers of Puducherry Council

Consistency across profiles is what merges them into one entity.

### 5. Build authority over time

- **Wikidata item** — occupation, the council, ORCID, this site. Wikidata feeds Google's
  Knowledge Graph and is the single highest-leverage remaining item.
- **Publish regularly** under the same author name, each post linking back here. Fresh
  on-topic content is the strongest signal you fully control.
- **Earn real mentions** — school or college features, interviews, local press covering
  the council. Quality over quantity.

---

## Already done in code

- **Prerendering.** The site was a client-rendered SPA shipping an empty `<div id="root">`
  — invisible to Bing, LinkedIn and most AI crawlers. A build-time SSR pass now injects
  ~52 kB of real HTML. The build fails loudly if this regresses.
- **Entity graph.** `Person` ↔ `Organization` linked by shared `@id`, using
  `https://popcindia.vercel.app/#organization` as the council's canonical identifier on
  both sites so the two resolve as one organisation.
- **AI crawlers allowed** — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web,
  anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent,
  CCBot. GPTBot and CCBot were previously blocked outright.
- `Article` schema on both published essays; FAQ, breadcrumb, ProfilePage and WebSite
  schema; `sitemap.xml` and `site.webmanifest` rebuilt; dead image references removed.
- **`rel="me"` hub** in the footer linking all 13 profiles.

## Never do

Buying links, link exchanges, PBNs, hidden text, keyword stuffing, doorway pages or
cloaking. These carry manual penalties and would deindex the site outright — the exact
opposite of the goal. Only real links between properties you genuinely own.

---

## Keep in sync

Name · headline · bio · link — identical across all properties. The canonical URL list
lives in [`src/data/profiles.ts`](src/data/profiles.ts) and the `sameAs` array in
`index.html`; keep both aligned.

`112 members` and `17 institutions` are point-in-time counts published on **both** this
site and POPC. Update them together or not at all.
