# Mandalon — Architecture Review

**Date:** 2026-08-01
**Scope:** `src/` (36 Svelte files, ~4 200 lines), build and deploy configuration, convention rules.
**Method:** full read of the source tree. Analysis only — no files were modified during the review.
**Follow-up:** the implementation plan derived from this review is in [`review-roadmap.md`](review-roadmap.md).
**Amended 2026-08-01:** sections 2.1, 2.7, 4.1, 4.4 and R2 were corrected after the roadmap was reviewed and the URL claims were measured against a real `adapter-node` build. Two claims were wrong and one problem was larger than reported; the corrections are marked inline.

---

## 1. Executive summary

The foundation is better than the average project of this size. Content is typed and separated from presentation, runes mode is enforced project-wide, the site is fully prerendered, the token system is coherent, and the archived convention rules are unusually well written. None of that needs replacing.

The review found one structural weakness and a small cluster of defects that follow from it. **The mapping between a page, its Swedish slug, and its English slug is encoded independently in five places, and those five places have already drifted apart.** The visible consequences are a broken language switch on the design guide, four live URLs per page (two of them serving the wrong language), and an English homepage link that leads into the Swedish site. Separately, four defects exist that are unrelated to structure but affect the product directly: the homepage renders no call-to-action buttons despite them being authored in content, every English page declares itself as Swedish to assistive technology, the body font loads from the italic file, and the design guide serves English body copy under the Swedish locale.

The recommended target is not a rewrite. It is a **single route registry** that all slug knowledge derives from, a **locale-as-route-group** routing shape that makes wrong-language URLs unrepresentable rather than merely discouraged, and the deletion of roughly a dozen files that duplicate work the root layout already does. Estimated as a sequence of independent, individually shippable steps rather than one migration.

---

## 2. Current architecture assessment

### 2.1 Routing and locale resolution

All public pages live under `src/routes/(site)/[[lang]]/`. Swedish slugs are canonical; English slug routes sit in a `(en)` group **inside** `[[lang]]` and re-export the Swedish page module.

Because `[[lang]]` is optional and `(en)` is nested inside it, the parameter can be absent while an English slug still matches. Measured against `node build/index.js`:

| URL            | Resolves                             | Content served     | Correct? |
| -------------- | ------------------------------------ | ------------------ | -------- |
| `/kontakt`     | `[[lang]]/kontakt`, lang absent      | Swedish            | yes      |
| `/en/contact`  | `[[lang]]/(en)/contact`, lang=`en`   | English            | yes      |
| `/contact`     | `[[lang]]/(en)/contact`, lang absent | **Swedish**        | no       |
| `/en/kontakt`  | `[[lang]]/kontakt`, lang=`en`        | 404                | n/a      |
| `/foo/kontakt` | `[[lang]]/kontakt`, lang=`foo`       | **301 → /kontakt** | no       |

**Correction.** The original review claimed four resolvable URLs per page. It is three, and the third one is unbounded.

`/en/kontakt` and its five siblings **return 404**, not English content. The route matches, but the prerenderer cannot enumerate a value for `[[lang]]`, so no file is generated and the runtime has nothing to serve.

`/contact` and its five siblings resolve and serve Swedish, and they are worse than described: they are **prerendered to static files**. `build/prerendered/contact.html` exists with `<title>Mandalon | Kontakt</title>`. SvelteKit's default entry enumeration includes each route once with optional parameters omitted, so every `(en)` route is baked at the root. Nothing links to them; the route shape alone is enough to generate them.

The unbounded case was missed entirely. `/<anything>/<any-valid-slug>` matches `[[lang]]/<slug>` with junk in the parameter, `getLocaleAndPathFromEvent` returns `locale: null`, and the root layout permanently redirects to the last segment. Confirmed: `/foo/kontakt` → `301 /kontakt`. Every valid slug has infinitely many 301 sources. Nothing links to them either, so the practical impact is low, but it makes a hard 404 impossible for a whole class of mistyped URLs.

No canonical tags exist anywhere, and `getAlternateLinks` returns an empty array for the hybrids because they match no entry in `localizedRouteEntries`, so they emit no hreflang either.

This is not purely theoretical: the English homepage links into it. `salesIntro.resource.href` is the bare string `'design-guide'` rendered as a relative link, so from `/en` the browser resolves it to `/design-guide` — the Swedish design guide — and it opens in a new tab (`target="_blank"` on an internal link, which also bypasses client-side routing). That is one crawlable path into the duplicate-URL space, which means the prerenderer follows it too.

Three separate functions independently decide what locale a URL is in. `getLocaleAndPathFromEvent` in `src/lib/utils/routing.ts` parses segments for the layout; `loadLocalePage` in `src/lib/content/loadLocalePage.ts` checks `params.lang === 'en'` for pages; `getLocalizedEntry` in `src/lib/seo.ts` does string-prefix matching for hreflang and the sitemap. They agree today by coincidence rather than construction.

### 2.2 The five slug sources

| #   | Source                        | File                                                                                                          |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | Swedish route folder names    | `src/routes/(site)/[[lang]]/<slug>/`                                                                          |
| 2   | English route folder names    | `src/routes/(site)/[[lang]]/(en)/<slug>/`                                                                     |
| 3   | `pagePaths` reverse lookup    | `src/lib/content/site.ts`                                                                                     |
| 4   | `localizedRouteEntries`       | `src/lib/seo.ts`                                                                                              |
| 5   | Nav `path` strings in content | `siteContent.*.topLinks`, `primaryLinks`, `footer.nav`, `glossaryPage.guide.path`, `salesIntro.resource.href` |

Source 3 is missing `designguide`/`design-guide` entirely, which is the root cause of the broken language toggle already logged in `todo.md`. Its own inline comment reads "Ugly reverse lookup table, replace with something better at some point."

### 2.3 Data loading

Every page has a `+page.ts` that calls `loadLocalePage`, returning `{ locale, defaultLocale, content }`. The root `+layout.ts` already returns `{ path, locale, defaultLocale, content }`, and SvelteKit merges layout data into `PageData`. The six Swedish `+page.ts` files and six English re-exports therefore appear to duplicate data that is already present — confirmed by `experiment/+page.svelte` and `fonts/+page.svelte`, which have no loader and work fine.

The one exception is `(site)/[[lang]]/+page.ts`, which throws a 404 when `path !== ''`. This is a hand-rolled fallback compensating for `[[lang]]` matching any single segment.

### 2.4 Components

Sixteen components across seven folders. `MediaArticleSection` is the genuine workhorse — four pages, snippet-based API, and its `reverse` and `mediaMaxWidth` props are exactly the two axes those pages actually vary. That is a well-found boundary.

Against that: `icons/` (2 files) is imported by nothing, `Button` is imported only by the experiment page, and `content/`, `data/`, and `icons/` hold one or two items each. `Heading` correctly separates semantic level from visual class but caps out at `h3` while the design guide uses raw `h1`–`h4`. `PageContent` is a ten-line component that applies one global class.

The pattern `todo.md` flags — components wrapped in a `<div class="…">` at every call site, purely to attach a margin — is real and visible on nearly every page. It exists because the components own no external spacing, so callers must.

`SiteHeader` and `SiteFooter` take the entire `data` object and redeclare their own structural types (`HeaderData`, `FooterData`) that shadow `LayoutData`. A small coupling smell: they need three or four fields, not the bag.

Three pages opt out of the component system entirely. `designguide` is 682 lines of hand-written HTML in one file; `stats` is 315 lines with its own table markup, hardcoded hex colors, and a `:global(body)` override that mutates the site background from inside a page; `fonts` uses a raw `<h1>` with no page shell. Two of the three are documented as intentional in the archived styling rule, but there is no written boundary for when a page may drop out of the system.

### 2.5 Content

`src/lib/content/site.ts` is 862 lines holding both locales, closed with `satisfies Record<Locale, LocaleContent>`. The `satisfies` approach is correct and should stay — it gives literal inference for consumers plus structural checking against `types.ts`, without widening.

The problem is that TypeScript can only check _shape_, and everything that has actually gone wrong lives below the shape:

- `glossaryPage.sections`: 4 in Swedish, 5 in English. English has a "Sensors" section Swedish lacks.
- `chipSensorsPage.areas[3].paragraphs`: 5 in Swedish, 4 in English.
- `salesIntro.actions` is required by `SalesIntroContent`, populated in both locales, and rendered nowhere — `SalesIntroSection` declares only `title`, `paragraphs`, and `resource`.
- `siteContent.en.salesIntro.actions[0].path` is `'paketering'`, a Swedish slug on an English page.

There is no mechanism, test, or lint that would catch locale drift.

### 2.6 Styling

The token layer is well-judged for the size: one `:root` block, semantic names (`--ink`, `--muted`, `--accent`, `--line`), and shared classes for typography, surfaces, buttons, and tables. Scoped component styles stick mostly to layout and pull colors from variables, which is the discipline the archived styling rule asked for.

The model is hybrid in a way that is not written down anywhere. The design system is delivered three ways:

1. Components that emit global classes (`Surface`, `Text`).
2. Components that apply global classes (`PageContent` → `.text-width`).
3. Pages that apply global classes directly (`.content-list`, `.surface-grid`).

All three work, but a new contributor — human or model — has no rule for choosing.

There are 11 `:global()` pierces across the codebase, mostly `MediaArticleSection` styling its `figure`/`img`/`figcaption` slot content, which is legitimate. A few page-level reaches into `.link` and `p + p` indicate the component did not expose the option the page needed. The `:global(body)` override in `stats` is the outlier.

One concrete defect: in `src/lib/styles/fonts.css`, the `Roboto` face declared `font-style: normal` points at the italic file. The upright file `Roboto-VariableFont_wdth,wght.woff2` (216 KB) ships but is referenced by nothing.

```css
@font-face {
	font-family: 'Roboto';
	src: url('/fonts/Roboto-Italic-VariableFont_wdth,wght.woff2') format('woff2');
	font-weight: 100 900;
	font-style: normal;
	font-display: swap;
}
```

Since `body` is `font-family: 'Roboto'`, every piece of text _not_ routed through `Text`/`Heading` — the entire design guide article, `Table` cells, `.content-list` items, header and footer nav, the stats page — renders from the italic outlines.

### 2.7 Build and delivery

Fully prerendered, `adapter-node`, Passenger on CloudLinux, GitHub Actions building on Node 24 and deploying to Node 18. `data-sveltekit-preload-data="hover"` is set.

`robots.txt` branches on `url.hostname` to block the develop subdomain — a request-time decision sitting under a layout that declares `prerender = true`. **Resolved:** the build was checked and `build/prerendered/` contains no `robots.txt`; the endpoint is served at runtime and returns the correct variant per hostname. No change is needed. `README.md` still documents `adapter-static` and a `build/` upload flow. `package.json` has no `engines` field despite the README citing an engine requirement, and it pins `@types/node@^24` against a Node 18 runtime.

---

## 3. Strengths

These are load-bearing and should survive any refactor.

**Typed content with `satisfies`.** Gives literal inference for consumers plus structural checking against `types.ts`, without widening. Better than the `as const` or plain-annotation alternatives.

**Content/presentation separation.** No user-facing string is hardcoded in a component. This is the single biggest reason the codebase is safe for AI-assisted editing.

**`MediaArticleSection`.** A correctly located boundary: snippet props rather than string props, and `reverse`/`mediaMaxWidth` match the two axes pages actually vary.

**Forced runes mode** in `svelte.config.js` removes all Svelte 4/5 ambiguity — an agent has exactly one pattern to follow.

**Full prerendering with hover preloading.** The right performance baseline for this content.

**`Heading`'s level/style decoupling.** Makes correct heading hierarchy possible without visual compromise.

**The archived rule files.** `svelte-components.mdc` and `styling.mdc` contain explicit "do not" lists and a component-extraction heuristic. These are better than most hand-written team docs.

**Deployment.** Reproducible CI, artifact-based, stop/deploy/start ordering, separate dev and main targets.

---

## 4. Problems, ranked

### 4.1 Critical

**C1 — Six prerendered wrong-language duplicate pages, plus an unbounded 301 space, and no canonical tags.**
_Where:_ `src/routes/(site)/[[lang]]/(en)/**`, `src/routes/+layout.ts`, `src/lib/seo.ts`, `src/routes/+layout.svelte`.
_Why it matters:_ The site's stated primary goal is inbound leads from technical buyers, which makes search visibility a business function, not a nicety. Duplicate URLs split ranking signals, and `/contact` serving Swedish copy is a broken experience for anyone who reaches it. As corrected in 2.1, these six pages are not merely reachable — they are **built as static files on every deploy**, independent of whether anything links to them, so a crawler that discovers one by any route gets a permanent, indexable copy. The `/<junk>/<slug>` 301 space compounds it by guaranteeing that mistyped URLs redirect somewhere plausible instead of failing.

**C2 — `<html lang="sv">` is hardcoded for every page.**
_Where:_ `src/app.html`.
_Why it matters:_ Screen readers select pronunciation from this attribute, so every English page is read with Swedish phonetics. It also misleads translation tooling and search engines. It is one line of output, but fixing it correctly requires the locale to be available at document-render time, which is an architectural dependency.

**C3 — The homepage renders no call-to-action buttons.**
_Where:_ `src/lib/content/site.ts` (`salesIntro.actions`), `src/lib/components/sections/SalesIntroSection.svelte`, `src/lib/content/types.ts`.
_Why it matters:_ "Paketering av Chip / Kontakt" is authored in both locales and required by the type, but the component never destructures it. On a lead-generation site, the primary conversion element is silently absent.

**C4 — Body text renders from the italic font file.**
_Where:_ `src/lib/styles/fonts.css`.
_Why it matters:_ Highly visible across the whole site, trivially fixable, and it undermines the professional tone the product rules call for. See 2.6 for the mechanism.

### 4.2 High

**H1 — Five independent slug sources.** Adding a page requires five coordinated edits with no compile-time link between them; the design guide toggle is already broken because one was missed. _Files:_ both route trees, `site.ts`, `seo.ts`, nav arrays in `siteContent`.

**H2 — Design guide serves English body copy under the Swedish locale.** Only `title`, `intro`, `articleIntroTitle`, `articleIntroBody`, and the download labels come from content; the remaining ~650 lines are hardcoded English. A Swedish visitor gets a Swedish heading over an English document. _File:_ `src/routes/(site)/[[lang]]/designguide/+page.svelte`.

**H3 — Locale content drift with no detection mechanism.** Section and paragraph counts differ between locales and the type system cannot see it. _File:_ `src/lib/content/site.ts`.

**H4 — No canonical, Open Graph, or structured data.** Each page hand-rolls `<title>` and `<meta name="description">` in `<svelte:head>` — eight near-identical blocks. For a B2B site whose links get shared into email and Teams, missing OG tags means unpreviewable links; missing Organization/LocalBusiness JSON-LD leaves address, phone, and certification invisible to search.

**H5 — Unoptimized image delivery.** Outside the design guide, every `<img>` lacks `width`/`height`, `loading`, and `srcset`, and no modern formats exist. Full-resolution JPEGs of 100–220 KB are downloaded at arbitrary display sizes, causing layout shift on every content page. The design guide is worse in volume (~40 images, one 987 KB PNG) though better in markup, having inherited it from WordPress. _Files:_ `kontakt`, `kunskapsbank`, `paketering` pages, `FeatureCarousel.svelte`.

**H6 — Carousel is a WCAG 2.2.2 failure.** Auto-advances every 5 s with no pause control, no prev/next, no indicators, and no `prefers-reduced-motion` check. Keyboard users cannot reach slides two and three. `stopOnMouseEnter` only helps pointer users. _File:_ `src/lib/components/sections/FeatureCarousel.svelte`.

**H7 — No `+error.svelte`.** The deliberate 404 renders SvelteKit's bare fallback with no header, footer, or styling, and its message is a hardcoded Swedish string outside the content system. _File:_ `src/routes/(site)/[[lang]]/+page.ts`.

### 4.3 Medium

**M1 — Twelve redundant loader files.** Six `+page.ts` calling `loadLocalePage` plus six re-exports, all re-providing data the root layout already supplies.

**M2 — Component taxonomy exceeds inventory.** Seven folders, sixteen components, three folders holding unused or single items. `icons/` is dead; `Button` is production-unused.

**M3 — Dev-only routes ship to production.** `/experiment`, `/fonts`, and `/stats` are enumerable routes under `prerender = true`, so they are built and served. `todo.md` already flags this for `experiment`.

**M4 — `Table` has no header semantics.** The capabilities table is a two-column name/description grid rendered entirely as `<td>`, so the pairing is lost non-visually. It is semantically a description list. _File:_ `src/lib/components/data/Table.svelte`.

**M5 — No focus-visible styling and no `aria-current`.** Active navigation is conveyed by color and weight alone against a dark header, relying on UA outline defaults. `todo.md` independently notes the active state is hard to see.

**M6 — Three undocumented CSS delivery mechanisms** (see 2.6), leaving no rule for a contributor choosing between them.

**M7 — The stats page deviates on every axis:** own table markup, hardcoded hex colors, Swedish-only strings outside the content system, and a `:global(body)` override mutating the site background from inside a page. `todo.md` already prohibits the last of these in principle.

**M8 — Dead analytics code in the root layout.** `trackCurrentPage` is defined, suppressed with `eslint-disable`, and called from two commented-out sites. _File:_ `src/routes/+layout.svelte`.

**M9 — Design guide images all carry `alt=""`,** marking technical diagrams as decorative.

### 4.4 Low

**L1** — `README.md` documents `adapter-static` and a `build/` upload flow; the project uses `adapter-node` behind Passenger.
**L2** — No `engines` field despite the README citing one; `@types/node@^24` against a Node 18 runtime; CI builds on Node 24.
**L3** — `localePath(locale, defaultLocaleArg, path)` takes a parameter the module already imports; called identically in five places.
**L4** — Dead branch in `loadLocalePage`: `locale` is assigned `'en'` or `defaultLocale`, then tested for membership in `locales`, which cannot fail.
**L5** — `Roboto-VariableFont_wdth,wght.woff2` shipped but unreferenced; no font preload.
**L6** — `background-attachment: fixed` on a 131 KB body image; scroll repaint cost, poor iOS behavior.
**L7** — `target="_blank"` on internal links (`SalesIntroSection`), bypassing client-side routing.
**L8** — Embla plus autoplay plugin for three static cards on an otherwise nearly JS-free site.
**L9** — ~~`robots.txt` hostname branching under a prerendering layout~~. **Resolved, not a defect:** verified absent from `build/prerendered/`; served at runtime. See 2.7.
**L10** — `src/routes/+layout.ts` 301-redirects any unmatched two-segment URL to its last segment (see 2.1). Dead weight once locale is structural.

---

## 5. Recommended target architecture

Six changes, ordered so each is independently shippable. Nothing here requires a rewrite. Sequenced task-by-task in [`review-roadmap.md`](review-roadmap.md).

### R1 — One route registry as the sole source of slug truth

**Shape.** A single module, e.g. `src/lib/routes.ts`, keyed by a stable page identifier:

```ts
export const pages = {
	home: { sv: '', en: '' },
	packaging: { sv: 'paketering', en: 'packaging' },
	consulting: { sv: 'konsulttjanster', en: 'consulting' },
	contact: { sv: 'kontakt', en: 'contact' },
	about: { sv: 'om-mandalon', en: 'about' },
	knowledge: { sv: 'kunskapsbank', en: 'knowledge-bank' },
	designGuide: { sv: 'designguide', en: 'design-guide' }
} as const;

export type PageKey = keyof typeof pages;
```

Forward lookup (`PageKey` + locale → href), reverse lookup (path → `PageKey`), hreflang alternates, sitemap entries, and the language switch all derive from this one object. Navigation content changes from `{ label, path: string }` to `{ label, page: PageKey }`, so a typo in a nav slug becomes a compile error instead of a 404.

**Reasoning.** Sources 3, 4, and 5 exist because there was no single place to put this. Collapsing them removes the class of bug that produced the broken design guide toggle, rather than fixing one instance of it.

**Affected:** `src/lib/content/site.ts` (delete `pagePaths`, retype nav arrays), `src/lib/seo.ts` (delete `localizedRouteEntries`, derive), `src/lib/utils/routing.ts`, `SiteHeader.svelte`, `SiteFooter.svelte`, `kunskapsbank/+page.svelte`.

**Benefit:** adding a page drops from five coordinated edits to two (registry entry plus route folders). Every existing cross-locale link becomes type-checked.

### R2 — Locale as route group, not optional parameter

**Shape.** Replace `[[lang]]` with structural locale:

```
src/routes/(site)/(sv)/paketering/+page.svelte     → /paketering
src/routes/(site)/en/packaging/+page.svelte        → /en/packaging
```

`(sv)/+layout.ts` returns `{ locale: 'sv' }`, `en/+layout.ts` returns `{ locale: 'en' }`. Locale becomes a static fact of position rather than something parsed at runtime.

Because a child layout cannot feed locale up to the root layout, the site chrome moves out of `src/routes/+layout.svelte` into a shared `SiteChrome` component rendered by each locale group's layout. The root layout keeps only the `app.css` import.

**Reasoning.** This makes the wrong-language URLs from C1 _unrepresentable_: `/contact` matches nothing, `/en/kontakt` matches nothing, both return a real 404. It also deletes `getLocaleAndPathFromEvent` and the hand-rolled 404 in the root `+page.ts`, and it structurally resolves the `/sv/en` collision ambiguity `todo.md` worries about — a Swedish page named `en` can no longer be created by accident.

**On the smaller step.** A param matcher at `src/params/locale.ts` restricting `[[lang=locale]]` to `'en'` removes the 404 hack and closes the unbounded `/xyz/contact` redirect space, but does **not** fix the duplicate-page problem, because `/contact` still matches with the parameter absent — and that is the case the prerenderer actually bakes to disk. Since everything the matcher fixes is also fixed here, and the matcher would then be deleted, the roadmap rejects it rather than treating it as a stepping stone.

**Sequencing.** Because the six duplicates are live, prerendered and possibly indexed, retiring them must ship together with 301 redirects to their correct-language equivalents. A hard 404 discards whatever link equity they hold, and the redirects double as the permalink support `todo.md` lists under High priority.

**Affected:** the entire `src/routes/(site)/` tree (folder moves; page contents largely unchanged), `src/lib/utils/routing.ts`, `src/routes/+layout.ts`, `src/routes/+layout.svelte`.

**Benefit:** two URLs per page instead of four, correct by construction; one fewer locale-resolution implementation; the 404 fallback becomes real SvelteKit routing.

### R3 — Delete the redundant per-page loaders

**Shape.** Remove the six `loadLocalePage` calls and six `(en)` re-exports; let pages read `data.content` from layout data.

**Reasoning.** SvelteKit merges layout data into `PageData`. `experiment/+page.svelte` already demonstrates this works. Twelve files currently exist to restate what the layout provides.

**Affected:** all `+page.ts` under `(site)/[[lang]]/`, `src/lib/content/loadLocalePage.ts`.

**Benefit:** twelve fewer files; one fewer locale-resolution path; the `(en)` wrappers shrink to the `.svelte` re-export alone. Verify with `npm run check` before committing.

### R4 — Enforce locale parity at the type level

**Shape.** Where parity matters, replace positional arrays with keyed records:

```ts
type GlossarySectionKey = 'asic' | 'mems' | 'wafer' | 'sensors' | 'microstructures';
sections: Record<GlossarySectionKey, GlossarySection>;
```

Optionally split `site.ts` into one module per page (`src/lib/content/pages/contact.ts` exporting `{ sv, en }`) — keeping both locales **adjacent** in the same file, never split by locale.

**Reasoning.** Every drift found is a missing element in one locale's array. A keyed record turns that into a compile error at zero runtime cost and with no test infrastructure. Splitting by page rather than locale is what makes drift visible during editing; splitting by locale would maximize it.

**Affected:** `src/lib/content/types.ts`, `src/lib/content/site.ts`, `kunskapsbank/+page.svelte`, `paketering/+page.svelte`.

**Benefit:** `glossaryPage` and `chipSensorsPage` drift becomes impossible; the 862-line file becomes navigable; an AI agent editing one page's content touches one small file.

### R5 — Centralize document head and the `lang` attribute

**Shape.** A `PageMeta` component (or a layout-level snippet) taking `{ meta, pageKey, locale }` and emitting title, description, canonical, Open Graph, and hreflang from the registry. Add `src/hooks.server.ts` with a `transformPageChunk` that substitutes a `%lang%` placeholder in `app.html` from the request URL — this runs during prerendering, so it works with the current build.

**Reasoning.** C2 and H4 share a root cause: locale and route identity are known in `load` but never reach the document shell. Solving them together avoids eight more hand-rolled `<svelte:head>` blocks. Add Organization/LocalBusiness JSON-LD in the same component — the address, phone, and ISO 9001 data already exist in `contactPage` and `aboutPage`.

**Affected:** `src/app.html`, new `src/hooks.server.ts`, new `src/lib/components/layout/PageMeta.svelte`, all eight page components, `src/lib/seo.ts`.

**Benefit:** correct language announcement, canonical URLs closing the duplicate-content exposure, previewable shared links, and machine-readable company data — all directly serving the lead-generation goal.

### R6 — An image component with a delivery convention

**Shape.** A small `Image.svelte` requiring `width`, `height`, and `alt`, defaulting to `loading="lazy"` with an `eager` opt-out for above-the-fold media.

**Amendment on variants.** This originally recommended pre-generated `srcset` variants over `@sveltejs/enhanced-img`, on the grounds that hand-generated files add no dependency. For a solo developer that is the wrong trade: it converts a one-time first-party dependency into a permanent manual asset pipeline across 40-plus images that must be re-run and kept in sync forever. The roadmap therefore takes the one-time WebP conversion, which captures most of the saving at almost no ongoing cost, and reserves `enhanced-img` for the day per-width variants are genuinely needed.

**Reasoning.** The archived rule says "No `Image.svelte` — use `<img>` directly **until lazy loading / aspect ratio / captions are needed**." All three are now needed: `MediaArticleSection` already hand-styles `figure`/`figcaption` through `:global()`, and layout shift is present on every content page. The rule's own escape clause has triggered.

**Affected:** new `src/lib/components/media/Image.svelte`, `MediaArticleSection.svelte`, `kontakt`, `kunskapsbank`, `paketering`, `FeatureCarousel.svelte`, and eventually `designguide`.

**Benefit:** eliminates CLS, cuts image transfer substantially, and makes `alt` a required prop — which prevents recurrence of the design guide's `alt=""` problem.

### Also worth deciding, outside the six

**The carousel (H6).** Two honest options: add prev/next controls, slide indicators, a pause affordance, and a `prefers-reduced-motion` guard; or replace it with a three-card grid and drop the dependency. For three trust-building cards on a B2B page, a grid shows all three at once, converts at least as well, and removes ~15 KB of JS plus the accessibility obligation. Recommendation is the grid, but it is a design call.

**Dev routes (M3).** Guard `(dev)`-grouped routes with `export const prerender = dev` plus a `!dev → error(404)` check in the group layout. Keeps the experiment lab useful locally without shipping it.

**Design guide (H2, M9).** Treat as its own project. Its content belongs in a structured content module keyed by section so `todo.md`'s "read the docs" restructure becomes possible. Not urgent, but it should stop being treated as a page.

**Amendment:** this section originally assumed localization was required. It is a product decision, and the cheaper answer deserves a hearing. English is the working language of chip design, so an English-only technical guide, labelled as such in Swedish, is defensible and costs a day rather than a week. The roadmap puts the choice to the developer before any restructuring begins. The `alt=""` problem and the structural work are worth doing either way.

---

## 6. Long-term development principles

These are the rules to write into `.cursor/rules/` once the archived files are restored — they encode the reasoning above so it survives without the reviewer.

**One fact, one location.** Any piece of knowledge duplicated across files will drift; the design guide toggle is the proof. Before adding a second place that knows a slug, a locale, or a route, make the first place derivable.

**Prefer making mistakes unrepresentable over documenting them as forbidden.** A route shape that cannot produce `/en/kontakt` is stronger than a rule saying not to link to it. A `Record<Key, T>` that cannot lose a section is stronger than a review checklist. This matters more than usual here, because a solo developer plus an AI agent has no second reader to catch violations.

**Let the type system carry the invariants, not tests.** With no test suite and no plans for one, TypeScript is the only automated safety net. Spend effort where types can actually check something — keyed content records, `PageKey`-typed navigation, required `alt` props — and accept that everything else is manually verified.

**Content is data with a schema, not strings in components.** This is already the practice and it is the main reason the codebase is safe for AI editing. Extend it to the places that escaped: the 404 message, the stats page, and the design guide body.

**Locale is a property of the route, not of a runtime parse.** Whenever locale must be inferred by inspecting a URL, there will eventually be a second inference that disagrees. There are three today.

**Accessibility requirements are architecture, not polish.** The `lang` attribute, focus visibility, table semantics, and pause controls are all consequences of structural decisions — where locale lives, whether a shared component owns focus styles, whether `Table` models data or markup. Retrofitting them later means touching structure anyway.

**Every asset on the page is a performance decision.** A 987 KB PNG, a fixed-attachment background, and a carousel library are each defensible in isolation; the discipline is deciding deliberately rather than inheriting them.

**Abstract on the second use, not the first.** The archived extraction heuristic is right and should be kept. `MediaArticleSection` earned its place across four pages; `icons/` and production-unused `Button` did not. Prune what has not earned it — dead code is worse than absent code, because an agent will treat it as a pattern to follow.

**Write down which mechanism to use when there is more than one.** Three CSS delivery paths exist and none is wrong; the absence of a rule for choosing is the problem. The same applies to when a page may drop out of the component system.
