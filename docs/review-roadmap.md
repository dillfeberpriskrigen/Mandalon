# Architecture review roadmap

Incremental implementation plan derived from the [architecture review](architecture-review.md) of 2026-08-01.

Each task below is **independently executable** and **leaves the project in a working, shippable state**. Tasks are ordered by dependency. Do not run two tasks in the same change set.

## How to use this document

- Work the first unchecked task whose `Blocked by` prerequisites are all complete.
- One task per branch and per commit. Do not mix unrelated refactors.
- Do not expand a task's scope. If a change seems necessary but is not in `Affected files`, stop and note it instead.
- Tick the checkbox and append a line to [Progress log](#progress-log) only after every verification step passes.
- Tasks tagged **`needs-decision`** or **`needs-copy`** require the developer. An agent must stop and ask rather than guess.

Automated execution: see `.cursor/skills/implement-review-task/SKILL.md`.

## Standard verification

Every task must end with all three of these passing, in this order:

```bash
npm run format
npm run check
npm run lint
```

Tasks that touch routing, loaders, or prerendering must also pass:

```bash
npm run build
```

Manual checks run against `npm run dev` (http://localhost:5173) unless a task says otherwise.

## URL matrix

Referenced by several tasks. Today all 26 URLs resolve; after T12 only the canonical 14 may resolve.

**Canonical (must always work):**

`/` `/paketering` `/konsulttjanster` `/kontakt` `/om-mandalon` `/kunskapsbank` `/designguide`
`/en` `/en/packaging` `/en/consulting` `/en/contact` `/en/about` `/en/knowledge-bank` `/en/design-guide`

**Wrong-language duplicates (must 404 after T12):**

`/packaging` `/consulting` `/contact` `/about` `/knowledge-bank` `/design-guide`
`/en/paketering` `/en/konsulttjanster` `/en/kontakt` `/en/om-mandalon` `/en/kunskapsbank` `/en/designguide`

---

# Phase 0 — Isolated defect fixes

No dependencies. Each task is small and touches one concern.

## T01 — Point the Roboto font face at the upright font file

- [ ] Complete

**Why:** `src/lib/styles/fonts.css` declares `font-style: normal` for `Roboto` but loads `Roboto-Italic-VariableFont_wdth,wght.woff2`. Every element using the `Roboto` family — the design guide body, `Table` cells, `.content-list` items, header and footer navigation, the stats page — renders from italic outlines. The upright file ships but is referenced by nothing.

**Affected files:** `src/lib/styles/fonts.css`

**Steps:** change the `src` of the first `@font-face` block (the `font-style: normal` one) to `/fonts/Roboto-VariableFont_wdth,wght.woff2`. Leave the italic block and both Roboto Condensed blocks unchanged.

**Verification:**

1. Standard verification.
2. Open `/designguide`, confirm body paragraphs render upright.
3. DevTools → Network, filter `woff2`: `Roboto-VariableFont_wdth,wght.woff2` is requested.

## T02 — Render the homepage call-to-action buttons

- [ ] Complete

**Why:** `salesIntro.actions` is authored in both locales and required by `SalesIntroContent`, but `SalesIntroSection` never destructures it, so the homepage has no CTA buttons. The site's primary goal is generating contact inquiries. The English entry also points at the Swedish slug `paketering`.

**Affected files:**

- `src/lib/components/sections/SalesIntroSection.svelte`
- `src/routes/(site)/[[lang]]/+page.svelte`
- `src/lib/content/site.ts` (English `salesIntro.actions[0].path` only)

**Steps:**

1. Add `actions: NavLink[]` to the component's `SalesIntro` interface and accept `locale` and `defaultLocale` props.
2. Render the actions with the existing `Button` primitive (`variant="primary"` for the first, `secondary` for the rest), building hrefs with `localePath` from `$lib/utils/routing` — the same pattern `kunskapsbank/+page.svelte` already uses.
3. Pass `locale={data.locale}` and `defaultLocale={data.defaultLocale}` from the homepage.
4. Change English `salesIntro.actions[0].path` from `'paketering'` to `'packaging'`.

**Verification:**

1. Standard verification.
2. `/` shows two buttons linking to `/paketering` and `/kontakt`.
3. `/en` shows two buttons linking to `/en/packaging` and `/en/contact`.

**Note:** T10 will re-express these links through the route registry. Using `localePath` here is the correct interim step.

## T03 — Remove the disabled analytics code from the root layout

- [ ] Complete

**Why:** `trackCurrentPage` is defined, suppressed with an `eslint-disable`, and called only from two commented-out sites. Dead code in the layout is a pattern an agent will copy.

**Affected files:** `src/routes/+layout.svelte`

**Steps:** delete `lastTrackedPath`, `trackCurrentPage`, the `eslint-disable` comment, the `if (browser) afterNavigate(...)` block, and the empty `onMount`. Remove the now-unused `browser`, `afterNavigate`, `onMount`, and `trackPageView` imports. Keep `src/lib/client/analytics.ts` — `/stats` still uses `getAnalyticsStatsUrl`.

**Verification:**

1. Standard verification.
2. `/stats` still loads and renders its error or data state.

## T04 — Delete unused icon components

- [ ] Complete

**Why:** `BusinessmanIcon.svelte` and `ProcessorIcon.svelte` are imported by nothing. `icons/` is a category with no members in use.

**Affected files:** delete `src/lib/components/icons/BusinessmanIcon.svelte`, `src/lib/components/icons/ProcessorIcon.svelte`, and the empty `icons/` directory.

**Verification:**

1. `rg -n "BusinessmanIcon|ProcessorIcon" src` returns nothing before deleting.
2. Standard verification.

## T05 — Correct repository metadata

- [ ] Complete

**Why:** `README.md` documents `@sveltejs/adapter-static` and a static `build/` upload, but the project uses `adapter-node` behind Passenger. `package.json` has no `engines` field despite the README citing an engine requirement.

**Affected files:** `README.md`, `package.json`

**Steps:**

1. Rewrite the README deploy section to describe `adapter-node`, `_passenger.cjs`, and the GitHub Actions flow in `.github/workflows/inleed-node-multi.yml`.
2. Add `"engines": { "node": ">=18" }`. **Do not pin to `18.x`** — CI builds on Node 24 and `npm ci` would fail.
3. Note in the README that `@sveltejs/adapter-static` remains in `devDependencies` but is unused, and that `@types/node` is a major ahead of the deploy runtime.

**Verification:**

1. Standard verification.
2. `npm ci` succeeds locally on the installed Node version.

## T06 — Confirm `robots.txt` is not prerendered

- [ ] Complete

**Why:** `src/routes/robots.txt/+server.ts` branches on `url.hostname` to block `develop.mandalon.se`, while the root `+layout.ts` declares `prerender = true`. If that option is inherited by the endpoint, one hostname's answer is baked in permanently and the develop subdomain becomes indexable.

**Affected files:** `src/routes/robots.txt/+server.ts` (only if the check fails)

**Steps:**

1. `npm run build`, then check whether a `robots.txt` file exists under `build/prerendered/`.
2. If it does, add `export const prerender = false;` to the endpoint.
3. If it does not, this task is complete — record the finding in the progress log.

**Verification:**

1. Standard verification (plus `npm run build`).
2. `npm run preview`, request `/robots.txt`, confirm it returns the allow variant for `localhost`.

---

# Phase 1 — Correctness safety net

Land these before any structural change, so routing work surfaces failures visibly.

## T07 — Serve the correct `lang` attribute per locale

- [ ] Complete

**Blocked by:** none

**Why:** `src/app.html` hardcodes `<html lang="sv">`, so every English page announces itself as Swedish to screen readers, translation tooling, and search engines.

**Affected files:** `src/app.html`, new `src/hooks.server.ts`

**Steps:**

1. Change `app.html` to `<html lang="%lang%">`.
2. Create `src/hooks.server.ts` with a `handle` that resolves with `transformPageChunk: ({ html }) => html.replace('%lang%', lang)`, where `lang` is `'en'` when `event.url.pathname === '/en'` or starts with `/en/`, otherwise `'sv'`.

**Verification:**

1. Standard verification (plus `npm run build` — the hook must run during prerendering).
2. View source on `/kontakt` → `lang="sv"`; on `/en/contact` → `lang="en"`.
3. Confirm no literal `%lang%` remains in any file under `build/prerendered/`.

## T08 — Add a localized error page

- [ ] Complete

**Blocked by:** none

**Why:** there is no `+error.svelte`, so the 404 thrown by `(site)/[[lang]]/+page.ts` renders SvelteKit's bare fallback with no chrome. Its message is a hardcoded Swedish string outside the content system. Routing work in Phase 3 will produce more 404s and they need to be visible.

**Affected files:** new `src/routes/+error.svelte`, `src/lib/content/types.ts`, `src/lib/content/site.ts`, `src/routes/(site)/[[lang]]/+page.ts`

**Steps:**

1. Add an `errorPage: { title: string; notFound: string; generic: string; homeLabel: string }` shape to `LocaleContent` and fill both locales.
2. Create `src/routes/+error.svelte` using `PageShell` and `PageHeader`, reading `page.status` and `page.error` from `$app/state`, with a link back to the locale home.
3. Remove the hardcoded `'Sidan kunde inte hittas'` string from the loader; throw `error(404)` without a message.

**Verification:**

1. Standard verification.
2. `/finns-inte` renders the styled 404 with header and footer.
3. `/en/does-not-exist` renders the English variant.

---

# Phase 2 — Route registry

Collapses the five independent slug sources into one. Each task migrates one consumer.

## T09 — Create the route registry and migrate SEO output

- [ ] Complete

**Blocked by:** none

**Why:** slug knowledge lives in five places (two route trees, `pagePaths` in `site.ts`, `localizedRouteEntries` in `seo.ts`, and nav `path` strings in content). They have already drifted — `pagePaths` has no design guide entry. A single keyed registry makes every other consumer derivable.

**Affected files:** new `src/lib/routes.ts`, `src/lib/seo.ts`

**Steps:**

1. Create `src/lib/routes.ts` exporting a `pages` object keyed by a stable identifier, with `sv` and `en` slugs for `home`, `packaging`, `consulting`, `contact`, `about`, `knowledge`, `designGuide`; export `type PageKey = keyof typeof pages`.
2. Add derived helpers: `hrefFor(page: PageKey, locale: Locale): string`, `pageKeyFromPathname(pathname: string): PageKey | null`, and `localeFromPathname(pathname: string): Locale`.
3. Rewrite `seo.ts` to derive `getAlternateLinks` and `getSitemapEntries` from the registry. Delete `localizedRouteEntries`.

**Verification:**

1. Before changing `seo.ts`, with `npm run dev` running:
   `Invoke-WebRequest http://localhost:5173/sitemap.xml -OutFile sitemap-before.xml`
2. Standard verification.
3. Capture again as `sitemap-after.xml` and confirm the files are identical. Delete both temp files.
4. View source on `/kontakt` — the three `hreflang` links are unchanged.

## T10 — Move language switching onto the registry

- [ ] Complete

**Blocked by:** T09

**Why:** `SiteHeader.getSwitchPath` looks slugs up in `pagePaths`, which has no `designguide`/`design-guide` entry, so the language toggle on the design guide drops the visitor at the site root. Already logged in `todo.md`.

**Affected files:** `src/lib/components/layout/SiteHeader.svelte`, `src/lib/content/site.ts` (delete `pagePaths`), `src/lib/content/types.ts` (delete `LocalizedSlugs` if unused)

**Steps:** replace `getSwitchPath` with `pageKeyFromPathname(page.url.pathname)` plus `hrefFor(key, otherLocale)`. When the key is `null`, fall back to the other locale's home.

**Verification:**

1. Standard verification.
2. Toggle language on all 7 canonical Swedish pages and all 7 English pages — each lands on the matching page in the other language, **including the design guide**.

## T11 — Type navigation links by page key

- [ ] Complete

**Blocked by:** T09, T10

**Why:** nav entries carry raw slug strings, so a typo produces a 404 rather than a compile error. Two known defects come from this: `salesIntro.resource.href` is a bare relative string that resolves to the Swedish design guide when clicked from `/en`, and it opens in a new tab despite being internal.

**Affected files:** `src/lib/content/types.ts`, `src/lib/content/site.ts`, `src/lib/components/layout/SiteHeader.svelte`, `src/lib/components/layout/SiteFooter.svelte`, `src/lib/components/sections/SalesIntroSection.svelte`, `src/routes/(site)/[[lang]]/kunskapsbank/+page.svelte`

**Steps:**

1. Change `NavLink` to `{ label: string; page: PageKey }`. Update `topLinks`, `primaryLinks`, `footer.nav`, and `salesIntro.actions` in both locales.
2. Change `glossaryPage.guide.path` and `salesIntro.resource.href` to `page: PageKey`.
3. Update all consumers to build hrefs with `hrefFor`. Remove `target="_blank"` and `rel="noreferrer"` from the design guide resource link — it is internal.
4. Simplify `localePath` in `src/lib/utils/routing.ts` to drop the redundant `defaultLocale` parameter, or delete it if `hrefFor` fully replaces it.

**Verification:**

1. Standard verification.
2. Click every link in the header, footer, homepage CTA block, and the knowledge bank callout, in both locales. All stay in-tab and keep the correct locale prefix.
3. `rg -n "href=\"?\{?'(paketering|kontakt|packaging|contact)" src` finds no remaining hardcoded slugs.

---

# Phase 3 — Routing shape

## T12 — Delete the redundant per-page loaders

- [ ] Complete

**Blocked by:** T11

**Why:** each page's `+page.ts` calls `loadLocalePage` and returns `{ locale, defaultLocale, content }`, which the root `+layout.ts` already provides — SvelteKit merges layout data into `PageData`. `experiment/+page.svelte` proves pages work without a loader. Doing this before T13 means twelve fewer files to move. `loadLocalePage` also contains a dead branch: its `locales.includes(locale)` check can never fail.

**Affected files:** delete the six `+page.ts` files under `(site)/[[lang]]/{paketering,konsulttjanster,kontakt,om-mandalon,kunskapsbank,designguide}/`, the six under `(site)/[[lang]]/(en)/*/`, and `src/lib/content/loadLocalePage.ts`. Keep `(site)/[[lang]]/+page.ts` — it still carries the 404 fallback.

**Verification:**

1. Standard verification (plus `npm run build`).
2. Every URL in the canonical list renders with correct content and correct `<title>`.
3. `rg -n "loadLocalePage" src` returns nothing.

## T13 — Replace `[[lang]]` with locale route groups

- [ ] Complete · **large**

**Blocked by:** T11, T12

**Why:** `[[lang]]` is optional and `(en)` is nested inside it, so English slugs match with the parameter absent. Every page has four live URLs, two serving the wrong language, with no canonical tags. Making locale a structural property of the route makes the bad URLs unrepresentable instead of merely discouraged, removes `getLocaleAndPathFromEvent`, removes the hand-rolled 404, and resolves the `/en` slug-collision ambiguity noted in `todo.md`.

Use a dedicated branch. This is the only task in the roadmap that moves many files at once.

**Target tree:**

```
src/routes/(site)/(sv)/+layout.ts          locale: 'sv'
src/routes/(site)/(sv)/+layout.svelte      renders SiteChrome
src/routes/(site)/(sv)/+page.svelte        /
src/routes/(site)/(sv)/paketering/+page.svelte
src/routes/(site)/(sv)/konsulttjanster/+page.svelte
src/routes/(site)/(sv)/kontakt/+page.svelte
src/routes/(site)/(sv)/om-mandalon/+page.svelte
src/routes/(site)/(sv)/kunskapsbank/+page.svelte
src/routes/(site)/(sv)/designguide/+page.svelte
src/routes/(site)/(sv)/experiment/+page.svelte
src/routes/(site)/(sv)/fonts/+page.svelte
src/routes/(site)/en/+layout.ts            locale: 'en'
src/routes/(site)/en/+layout.svelte        renders SiteChrome
src/routes/(site)/en/+page.svelte          /en
src/routes/(site)/en/packaging/+page.svelte    (thin re-export, unchanged pattern)
src/routes/(site)/en/consulting/+page.svelte
src/routes/(site)/en/contact/+page.svelte
src/routes/(site)/en/about/+page.svelte
src/routes/(site)/en/knowledge-bank/+page.svelte
src/routes/(site)/en/design-guide/+page.svelte
```

**Steps:**

1. Extract the header/`<main>`/footer markup from `src/routes/+layout.svelte` into a new `src/lib/components/layout/SiteChrome.svelte` taking `{ locale, content, children }`. The root `+layout.svelte` keeps only the `app.css` import and `{@render children()}`.
2. Add `(sv)/+layout.ts` and `en/+layout.ts`, each returning `{ locale, content: siteContent[locale] }` with no URL parsing. Each group's `+layout.svelte` wraps children in `SiteChrome`. Keep `export const prerender = true` in the root `+layout.ts`.
3. Move the page files per the tree above. Page component bodies do not change.
4. Update `SiteHeader` active-link detection to compare `pageKeyFromPathname(page.url.pathname)` against each link's `page` key, and drop the `currentPath` prop.
5. Delete `getLocaleAndPathFromEvent` from `src/lib/utils/routing.ts`, the locale/redirect logic from the root `+layout.ts`, and `(site)/[[lang]]/+page.ts`.

**Verification:**

1. Standard verification (plus `npm run build`).
2. All 14 canonical URLs render with correct language.
3. All 12 duplicate URLs from the URL matrix return the T08 error page.
4. `Get-ChildItem build/prerendered -Recurse -File` lists exactly the canonical pages plus `experiment`, `fonts`, `stats`, and `sitemap.xml`.
5. Language toggle still works on all pages.

---

# Phase 4 — Document head and SEO

## T14 — Centralize page metadata

- [ ] Complete

**Blocked by:** T13

**Why:** eight pages hand-roll near-identical `<svelte:head>` blocks. No page emits a canonical URL, so the duplicate-URL exposure closed structurally by T13 has no defense against externally linked variants. No Open Graph tags exist, so links shared into email or Teams render without a preview.

**Affected files:** new `src/lib/components/layout/PageMeta.svelte`, all 7 canonical page components, `src/routes/+layout.svelte` (move the `hreflang` block into `PageMeta`), `src/lib/seo.ts`

**Steps:**

1. Create `PageMeta` taking `{ meta: Meta; pageKey: PageKey; locale: Locale; image?: string }`, emitting title, description, `<link rel="canonical">`, `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, `og:image`, `twitter:card`, and the hreflang alternates.
2. Replace each page's `<svelte:head>` block with `<PageMeta ... />`.

**Verification:**

1. Standard verification (plus `npm run build`).
2. View source on `/kontakt` and `/en/contact` — exactly one `<title>`, one canonical pointing at the page's own absolute URL, and three hreflang links.
3. No page component contains `<svelte:head>` with a `<title>` any more, except `/stats`.

## T15 — Add organization structured data

- [ ] Complete

**Blocked by:** T14

**Why:** address, phone, email, and the ISO 9001:2015 certification already exist in `contactPage` and `aboutPage` but are invisible to search engines as structured facts. For a regional B2B supplier this is the cheapest visibility win available.

**Affected files:** `src/lib/components/layout/PageMeta.svelte` or a new sibling component, `src/lib/content/site.ts` (only if a field is missing)

**Steps:** emit a JSON-LD `Organization` block sitewide and a `LocalBusiness` block on the contact page, sourcing values from existing content rather than duplicating them.

**Verification:**

1. Standard verification.
2. Paste the rendered `/kontakt` source into Google's Rich Results Test — no errors.

---

# Phase 5 — Content architecture

## T16 — Split the content module by page

- [ ] Complete

**Blocked by:** T11

**Why:** `src/lib/content/site.ts` is 862 lines holding both locales for every page. Any content edit loads the whole file into context, which is expensive and error-prone for AI-assisted editing.

**Affected files:** new `src/lib/content/pages/*.ts`, `src/lib/content/site.ts`, `src/lib/content/types.ts`

**Steps:** create one module per page (`home.ts`, `packaging.ts`, `consulting.ts`, `contact.ts`, `about.ts`, `knowledge.ts`, `designGuide.ts`, `shared.ts` for nav and meta), each exporting `{ sv, en }`. Keep both locales **adjacent in the same file** — never split by locale, which would maximize drift. `site.ts` becomes an assembler that still ends with `satisfies Record<Locale, LocaleContent>`.

**Verification:**

1. Standard verification.
2. `git diff --stat` shows moves only; no rendered text changes.
3. Spot-check three pages in both locales against the previous build.

## T17 — Enforce locale parity in the type system · **needs-copy**

- [ ] Complete

**Blocked by:** T16

**Why:** parity has already drifted and `satisfies` cannot see it. Swedish `glossaryPage.sections` has 4 entries, English has 5 (English has a "Sensors" section Swedish lacks). Swedish `chipSensorsPage.areas[3].paragraphs` has 5, English has 4. Both satisfy their array types.

**Affected files:** `src/lib/content/types.ts`, `src/lib/content/pages/knowledge.ts`, `src/lib/content/pages/packaging.ts`, `src/routes/(site)/(sv)/kunskapsbank/+page.svelte`, `src/routes/(site)/(sv)/paketering/+page.svelte`

**Steps:**

1. Convert parity-sensitive collections from arrays to keyed records, e.g. `sections: Record<'asic' | 'mems' | 'wafer' | 'sensors' | 'microstructures', GlossarySection>`. Add an explicit order array where display order matters.
2. TypeScript will now report the missing Swedish `sensors` section. **The developer must supply the Swedish copy** — an agent must stop here and ask.
3. Decide whether the missing Swedish encapsulation paragraph should be added to English or removed from Swedish.

**Verification:**

1. Standard verification — `npm run check` fails until parity is complete, which is the point.
2. `/kunskapsbank` and `/en/knowledge-bank` show the same number of sections in the same order.

---

# Phase 6 — Media delivery

## T18 — Introduce an image component with required dimensions

- [ ] Complete

**Blocked by:** none

**Why:** outside the design guide, every `<img>` lacks `width`, `height`, `loading`, and `srcset`, so full-resolution JPEGs of 100–220 KB are downloaded at arbitrary display sizes and every content page shifts layout during load. The archived styling rule deferred an image component "until lazy loading / aspect ratio / captions are needed" — all three are now needed, and `MediaArticleSection` already styles `figure`/`figcaption` through `:global()`.

**Affected files:** new `src/lib/components/media/Image.svelte`, `src/lib/components/sections/MediaArticleSection.svelte`, `src/lib/components/sections/FeatureCarousel.svelte`, `src/routes/(site)/(sv)/{kontakt,kunskapsbank,paketering}/+page.svelte`, `src/lib/content/types.ts` and the image entries in `src/lib/content/pages/*.ts`

**Steps:**

1. Create `Image.svelte` with **required** `src`, `alt`, `width`, `height`, optional `caption` and `priority`. Default `loading="lazy"` and `decoding="async"`; `priority` switches to `loading="eager"` with `fetchpriority="high"`.
2. Extend the content image shape from a bare `string` to `{ src, alt, width, height }` and fill in intrinsic dimensions.
3. Replace every raw `<img>` on content pages. Leave the design guide for T25 and logos in the header and footer as-is.

**Verification:**

1. Standard verification.
2. Lighthouse on `/kunskapsbank`: Cumulative Layout Shift is 0.
3. DevTools Network: below-the-fold images are not requested until scrolled.

## T19 — Generate and serve responsive image variants

- [ ] Complete

**Blocked by:** T18

**Why:** T18 stops the layout shift but still ships one full-size file per image. A 987 KB PNG on the design guide and 200 KB JPEGs on content pages remain the largest transfers on the site.

**Affected files:** `static/mandalon/**`, `src/lib/components/media/Image.svelte`, possibly `package.json` and `vite.config.js`

**Steps:** either pre-generate WebP/AVIF variants at two or three widths and emit `srcset` from `Image.svelte`, or move assets to `src/lib/assets` and adopt `@sveltejs/enhanced-img` with `import.meta.glob(..., { query: { enhanced: true } })` so content can keep referencing string paths. Prefer the first; it adds no dependency and no build coupling.

**Verification:**

1. Standard verification (plus `npm run build`).
2. Total image transfer on `/kunskapsbank` drops by at least half at desktop width.
3. All images still render at correct dimensions on a 320 px viewport.

---

# Phase 7 — Accessibility and interaction

## T20 — Resolve the auto-advancing carousel · **needs-decision**

- [ ] Complete

**Blocked by:** none

**Why:** `FeatureCarousel` advances every 5 s with no pause control, no previous/next buttons, no slide indicators, and no `prefers-reduced-motion` check. That is a WCAG 2.2.2 failure, and keyboard users cannot reach slides two and three. It also costs roughly 15 KB of JavaScript on an otherwise nearly static site.

**Affected files:** `src/lib/components/sections/FeatureCarousel.svelte`, `src/routes/(site)/(sv)/+page.svelte`, `package.json` (only if the dependency is dropped)

**Decision required — ask the developer before implementing:**

- **A (recommended):** replace with a three-column responsive grid. All three cards visible at once, no controls needed, no accessibility obligation, and `embla-carousel*` can be removed from `dependencies`.
- **B:** keep the carousel and add previous/next buttons, slide indicators with `aria-label`, a pause/play control, keyboard support, and an autoplay opt-out under `prefers-reduced-motion`.

**Verification:**

1. Standard verification.
2. Option A: all three feature cards visible and readable at 320 px, 768 px, and 1280 px; `rg -n "embla" src` returns nothing.
3. Option B: every slide reachable by keyboard alone; autoplay does not start when reduced motion is requested.

## T21 — Add focus visibility and current-page indication

- [ ] Complete

**Blocked by:** T13

**Why:** no `:focus-visible` styling exists anywhere, so keyboard focus relies on UA outline defaults against a dark header background. Active navigation is conveyed by color and weight only, with no `aria-current`. `todo.md` independently notes the active state is hard to see.

**Affected files:** `src/lib/styles/style-resets.css` or `src/app.css`, `src/lib/components/layout/SiteHeader.svelte`, `src/lib/styles/button.css`, `src/lib/styles/typography.css`

**Steps:**

1. Add a global `:focus-visible` outline using existing tokens, with sufficient contrast on both the dark header and the light page body.
2. Add `aria-current="page"` to the active header link and strengthen its visual treatment beyond color alone.

**Verification:**

1. Standard verification.
2. Tab through the header, a page body, and the footer — focus is visible at every stop on both backgrounds.
3. Accessibility inspector shows `current page` on the active nav item.

## T22 — Give the capabilities table real semantics

- [ ] Complete

**Blocked by:** none

**Why:** `Table.svelte` renders a two-column name/description grid entirely as `<td>` with no `<th>`, `<caption>`, or scope, so the pairing is lost to screen readers. The bonding capabilities list on `/paketering` is its main use and is semantically a description list.

**Affected files:** `src/lib/components/data/Table.svelte`, `src/lib/styles/table.css`, `src/routes/(site)/(sv)/paketering/+page.svelte`, `src/routes/(site)/(sv)/experiment/+page.svelte`

**Steps:** either add an optional `caption` and a header row rendered as `<th scope="col">`, or replace the component with a `DescriptionList` rendering `<dl>`/`<dt>`/`<dd>`. Prefer the second for the capabilities content.

**Verification:**

1. Standard verification.
2. Screen reader or accessibility inspector announces each capability name paired with its description.
3. Visual output on `/paketering` is unchanged or improved.

## T23 — Keep development-only routes out of production

- [ ] Complete

**Blocked by:** T13

**Why:** `/experiment` and `/fonts` are enumerable routes under `prerender = true`, so they are built and publicly served. `todo.md` already asks for the experiment page to be dev-only.

**Affected files:** new `src/routes/(dev)/` group with `+layout.ts` and `+layout.svelte`, moved `experiment` and `fonts` routes

**Steps:** create a `(dev)` group whose `+layout.ts` exports `prerender = dev` and throws `error(404)` when `!dev` (`import { dev } from '$app/environment'`). Move `experiment` and `fonts` into it. Decide separately whether `/stats` belongs there — it is currently `noindex` but publicly reachable.

**Verification:**

1. Standard verification (plus `npm run build`).
2. `npm run dev`: `/experiment` and `/fonts` render.
3. `build/prerendered/` contains neither.

## T24 — Align the stats page with the design system

- [ ] Complete

**Blocked by:** T23

**Why:** `/stats` is 315 lines with its own table markup, hardcoded hex colors, Swedish-only strings outside the content system, and a `:global(body)` override that mutates the site background from inside a page. `todo.md` already prohibits page-level global styling in principle.

**Affected files:** `src/routes/(stats)/stats/+page.svelte`, possibly `src/lib/styles/surface.css`

**Steps:** replace hex literals with tokens, use `PageShell`/`PageHeader`/`Surface`/`Text`, reuse the table or description-list component from T22, and remove the `:global(body)` override — if a different background is genuinely needed, expose it as a token or a body class set by the layout.

**Verification:**

1. Standard verification.
2. `rg -n "#[0-9a-fA-F]{3,6}" "src/routes/(stats)"` returns nothing.
3. Navigating from `/stats` to `/` leaves the site background correct.

## T25 — Reduce background and font loading cost

- [ ] Complete

**Blocked by:** T01

**Why:** `background-attachment: fixed` on a 131 KB image forces repaint on every scroll and behaves poorly on iOS; the same image is painted again behind the sticky header. No font is preloaded, so the first paint waits on a swap.

**Affected files:** `src/app.css`, `src/routes/+layout.svelte`, `src/lib/components/layout/SiteHeader.svelte`

**Steps:** drop `fixed` attachment or gate it behind `@media (prefers-reduced-motion: no-preference) and (min-width: …)`, serve a WebP variant of `motherboard-bg.jpg`, and add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two font files used above the fold.

**Verification:**

1. Standard verification.
2. Lighthouse performance score on `/` does not regress and Largest Contentful Paint improves.
3. Background renders correctly on a mobile viewport.

---

# Phase 8 — Design guide

## T26 — Restructure and localize the design guide · **needs-copy**

- [ ] Complete · **large**

**Blocked by:** T16, T18

**Why:** the page is 682 lines of hardcoded English HTML. Only the title, intro, and download labels come from content, so a Swedish visitor reads a Swedish heading over an English document. Every one of its ~40 images carries `alt=""`, marking technical diagrams as decorative. `todo.md` also wants it restructured as a documentation-style page.

**Affected files:** `src/routes/(site)/(sv)/designguide/+page.svelte`, new `src/lib/content/pages/designGuide.ts` sections, new section components, `static/mandalon/designguide/**`

**Steps:**

1. Model the guide as structured content: an ordered list of sections with heading, level, paragraphs, and figures (`src`, `alt`, `width`, `height`, `caption`).
2. Render it with a small set of components plus the T18 `Image` component.
3. Write real `alt` text for every figure. **The developer must supply the Swedish translation and the alt text** — an agent must stop and ask.
4. Optionally add a table of contents and in-page anchors.

**Verification:**

1. Standard verification (plus `npm run build`).
2. `/designguide` is fully Swedish; `/en/design-guide` is fully English.
3. No `alt=""` remains on a content-bearing image.
4. Total page weight is reduced relative to the pre-task build.

---

# Phase 9 — Conventions

## T27 — Restore and update the Cursor rules

- [ ] Complete

**Blocked by:** T13, T16

**Why:** `.cursor/rules/` currently holds the slimmed review versions; the real conventions sit in `.cursor/rules-archive/`. Several statements in them are now outdated — the `(en)` wrapper pattern, the `[[lang]]` layout, "no `Image.svelte`", and the component folder map all change during this roadmap.

**Affected files:** `.cursor/rules/*.mdc`, `.cursor/rules-archive/` (delete after restore), `.cursor/rules/architecture-review.mdc` (delete)

**Steps:** follow the restore procedure in `.cursor/rules-archive/README.md`, then update the restored rules for the new routing shape, the route registry as the single slug source, the per-page content modules, the image component, and the CSS delivery rule (see the principle below). Add an explicit rule naming `src/lib/routes.ts` as the only place slugs may be defined.

**Verification:**

1. Rules describe the tree that actually exists — spot-check five claims against the repository.
2. No rule references `[[lang]]`, `pagePaths`, `loadLocalePage`, or `localizedRouteEntries`.

## T28 — Document the CSS delivery convention

- [ ] Complete

**Blocked by:** T27

**Why:** the design system is delivered three ways — components emitting global classes (`Surface`, `Text`), components applying global classes (`PageContent`), and pages applying global classes directly (`.content-list`, `.surface-grid`). None is wrong; the absence of a rule for choosing is.

**Affected files:** `.cursor/rules/styling.mdc`

**Steps:** state which mechanism applies to which situation, when a `:global()` pierce is acceptable versus when the component should expose a prop instead, and that pages may not set global styles (closing the `todo.md` item).

**Verification:** the rule correctly classifies all 11 existing `:global()` uses as either acceptable or flagged for follow-up.

---

## Deferred / not scheduled

- `@types/node` is a major version ahead of the Node 18 deploy runtime. Harmless today; revisit when the host offers a newer Node.
- `@sveltejs/adapter-static` remains in `devDependencies` and is unused. Remove opportunistically.
- Prettier `printWidth: 160` produces long content lines in `site.ts`. Cosmetic; changing it would churn the whole repo.
- Dark mode (`todo.md`). Blocked on tokens being fully semantic — worth revisiting after T28.
- Cookie-free analytics (`todo.md`). Independent of this roadmap.

## Progress log

Append one row per completed task. Newest last.

| Date | Task | Verified by | Notes |
| ---- | ---- | ----------- | ----- |
|      |      |             |       |
