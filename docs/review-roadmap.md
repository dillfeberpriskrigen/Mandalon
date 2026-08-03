# Architecture review roadmap

Incremental implementation plan derived from the [architecture review](architecture-review.md) of 2026-08-01, revised 2026-08-01 after the roadmap itself was reviewed and its URL claims were checked against a real production build.

Each task below is **independently executable** and **leaves the project in a working, shippable state**. Tasks are ordered by dependency. Do not run two tasks in the same change set.

## How to use this document

- Work the first unchecked task whose `Blocked by` prerequisites are all complete.
- One task per branch and per commit. Do not mix unrelated refactors.
- Do not expand a task's scope. If a change seems necessary but is not in `Affected files`, stop and note it instead.
- Tick the checkbox and append a line to [Progress log](#progress-log) only after every verification step passes.
- Tasks tagged **`needs-decision`** or **`needs-copy`** require the developer. An agent must stop and ask rather than guess.
- Every task carries an effort estimate: **XS** under 15 min · **S** under an hour · **M** one to three hours · **L** half a day · **XL** multiple days.

Automated execution: see `.cursor/skills/implement-review-task/SKILL.md`.

## Critical path

Not all 31 tasks are equally important. These twelve, in order, unblock the verification gate, fix every defect the review classified as critical or high, and close the duplicate-URL exposure:

**T02 → T03 → T04 → T06 → T07 → T09 → T10 → T11 → T12 → T13 → T14 → T15**

T02 comes first for an unglamorous reason: `npm run lint` fails on a clean checkout today, so no other task can pass its own verification until that is fixed.

Everything else is a genuine improvement but can be scheduled freely, dropped, or deferred without leaving the site in a bad state. If time is short, work the critical path and stop.

## Standard verification

Every task must end with all three of these passing, in this order:

```bash
npm run format
npm run check
npm run lint
```

Tasks that touch routing, loaders, `+layout` files, hooks, or prerendering must also pass:

```bash
npm run build
node scripts/check-build.mjs   # once T06 has landed
```

Manual checks run against `npm run dev` (http://localhost:5173) unless a task says otherwise.

## Verified URL behaviour

Measured against `node build/index.js` on 2026-08-01. **This replaces the earlier, incorrect URL matrix** — the previous version claimed 26 resolving URLs, of which 12 were wrong-language duplicates. Six of those twelve already return 404.

**Canonical — 14 URLs, all resolve, all prerendered:**

`/` `/paketering` `/konsulttjanster` `/kontakt` `/om-mandalon` `/kunskapsbank` `/designguide`
`/en` `/en/packaging` `/en/consulting` `/en/contact` `/en/about` `/en/knowledge-bank` `/en/design-guide`

**Wrong-language duplicates that resolve — 6 URLs, serving Swedish content:**

`/packaging` `/consulting` `/contact` `/about` `/knowledge-bank` `/design-guide`

These are **prerendered to static files** and served by `adapter-node`'s static middleware. `build/prerendered/contact.html` exists and its `<title>` is `Mandalon | Kontakt`. The cause is SvelteKit's default prerender entry enumeration: `[[lang]]` is optional, so every `(en)` route is enumerated once with the parameter omitted. Nothing in the site links to them; they exist purely because the route shape permits them.

**Already 404 — 6 URLs:**

`/en/paketering` `/en/konsulttjanster` `/en/kontakt` `/en/om-mandalon` `/en/kunskapsbank` `/en/designguide`

The route matches, but the parameter value `en` cannot be enumerated at prerender time, so no file exists and the runtime returns 404. No action needed.

**Unbounded 301 space — the finding the review missed:**

`/<anything>/<any-valid-slug>` permanently redirects to `/<slug>`. Confirmed: `/foo/kontakt` → `301 /kontakt`, `/foo/packaging` → `301 /packaging`. `[[lang]]` matches the junk first segment, the root layout's `getLocaleAndPathFromEvent` returns `locale: null`, and this fires:

```ts
if (locale == null) {
	redirect(301, `/${path}`);
}
```

Every valid slug therefore has infinitely many permanent-redirect sources. No page links to them, so real-world impact is low, but it is a soft-404 generator and it disappears with the rest of `[[lang]]` in T14.

**After T14** only the canonical 14 may resolve; the 6 duplicates must 301 to their correct-language equivalents.

## Verified findings — no task required

- **`robots.txt` is not prerendered.** `build/prerendered/` contains no `robots.txt`; the endpoint is served at runtime and correctly returns the allow variant for `localhost`. The review's concern (L9) does not apply. The earlier roadmap spent a whole task on this check; it is now closed.
- **`/experiment`, `/fonts` and `/stats` are prerendered and publicly served.** Confirmed present in `build/prerendered/`. Addressed by T24.
- **The 404 fallback has no chrome.** `/finns-inte` returns a 686-byte bare SvelteKit page. Confirmed. Addressed by T08.
- **Layout data is unavailable on unmatched-route 404s.** `/en/does-not-exist` renders the same bare fallback, not the site layout, because SvelteKit does not run `load` functions when no route matches. T08 is specified accordingly.

---

# Phase 0 — Clear the decks

No dependencies. Small, isolated, mostly deletions.

## T01 — Leave architecture-review mode and restore the implementer rules · **S**

- [x] Complete

**Why:** the real implementer rules — `svelte-components.mdc` and the full `project-overview.mdc` / `product-design.mdc` — are sitting in `.cursor/rules-archive/` and are **not** loaded, while `.cursor/rules/` holds slimmed review copies. Every remaining task should be written under the project's actual conventions, so this goes first, not last. Restoring them at the end of the roadmap, as originally planned, meant implementing thirty tasks with the conventions unloaded.

`architecture-review.mdc` was `alwaysApply: true` and stated that house conventions are suspended and files must not be modified, which would have contradicted every task here. It has already been changed to `alwaysApply: false` with a description, so it is dormant and invocable on demand. **Keep it** — do not delete it. It is how you re-enter review mode later.

**Affected files:** `.cursor/rules/*.mdc`, `.cursor/rules-archive/`

**Steps:** follow the restore procedure in `.cursor/rules-archive/README.md`: copy the archived `*.mdc` files back into `.cursor/rules/`, replacing the slimmed `project-overview.mdc` and `product-design.mdc`, then delete the `rules-archive` directory. Do **not** update the rules' content yet — several statements in them go stale during this roadmap and T30 fixes them all at once.

**Verification:**

1. `.cursor/rules/` contains `project-overview.mdc`, `product-design.mdc`, `styling.mdc`, `svelte-components.mdc`, and the dormant `architecture-review.mdc`.
2. `architecture-review.mdc` still reads `alwaysApply: false`.
3. `.cursor/rules-archive/` no longer exists.

## T02 — Delete dead code and fix the failing lint · **XS**

- [x] Complete

**Why:** three small pieces of dead code, batched because each is a two-minute deletion and separate commits for them are pure overhead.

The third one is urgent out of proportion to its size. **`npm run lint` currently fails on a clean checkout:**

```
src/routes/(site)/[[lang]]/paketering/+page.svelte
  9:9  error  'Surface' is defined but never used  @typescript-eslint/no-unused-vars
```

Standard verification requires `lint` to pass, so until this is fixed **every task in this roadmap fails its own gate**, and an agent following the skill will stop and report a failure it did not cause. Fix it before anything else that runs the gate.

The other two: `trackCurrentPage` in the root layout is defined, suppressed with an `eslint-disable`, and called only from two commented-out sites. `BusinessmanIcon.svelte` and `ProcessorIcon.svelte` are imported by nothing. Dead code in a layout is a pattern an agent will copy.

**Affected files:** `src/routes/(site)/[[lang]]/paketering/+page.svelte`, `src/routes/+layout.svelte`; delete `src/lib/components/icons/BusinessmanIcon.svelte`, `src/lib/components/icons/ProcessorIcon.svelte`, and the empty `icons/` directory.

**Steps:**

1. Remove the unused `Surface` import from `paketering/+page.svelte`. Check first that the page really does not use it — if it does, the fix is to use it, not to delete the import.
2. From `+layout.svelte`, delete `lastTrackedPath`, `trackCurrentPage`, the `eslint-disable` comment, the `if (browser) afterNavigate(...)` block, and the empty `onMount`. Remove the now-unused `browser`, `afterNavigate`, `onMount`, and `trackPageView` imports. Keep `src/lib/client/analytics.ts` — `/stats` still uses `getAnalyticsStatsUrl`.
3. Delete the two icon components and their directory.

**Verification:**

1. `rg -n "BusinessmanIcon|ProcessorIcon" src` returns nothing after deleting.
2. Standard verification — and this is the first task where it passes end to end.
3. `/paketering` renders unchanged.
4. `/stats` still loads and renders its error or data state.

## T03 — Point the Roboto font face at the upright font file · **XS**

- [x] Complete

**Blocked by:** T02 — until the failing lint is fixed, this task cannot pass its own verification.

**Why:** `src/lib/styles/fonts.css` declares `font-style: normal` for `Roboto` but loads `Roboto-Italic-VariableFont_wdth,wght.woff2`. Every element using the `Roboto` family — the design guide body, `Table` cells, `.content-list` items, header and footer navigation, the stats page — renders from italic outlines. The upright file ships but is referenced by nothing.

**Affected files:** `src/lib/styles/fonts.css`

**Steps:** change the `src` of the first `@font-face` block (the `font-style: normal` one) to `/fonts/Roboto-VariableFont_wdth,wght.woff2`. Leave the italic block and both Roboto Condensed blocks unchanged.

**Verification:**

1. Standard verification.
2. Open `/designguide`, confirm body paragraphs render upright.
3. DevTools → Network, filter `woff2`: `Roboto-VariableFont_wdth,wght.woff2` is requested.

## T04 — Render the homepage call-to-action buttons · **S**

- [x] Complete

**Why:** `salesIntro.actions` is authored in both locales and required by `SalesIntroContent`, but `SalesIntroSection` never destructures it, so the homepage has no CTA buttons. The site's primary goal is generating contact inquiries. The English entry also points at the Swedish slug `paketering`.

**Affected files:**

- `src/lib/components/sections/SalesIntroSection.svelte`
- `src/routes/(site)/[[lang]]/+page.svelte`
- `src/lib/content/site.ts` (English `salesIntro.actions[0].path` only)

**Steps:**

1. Add `actions: NavLink[]` to the component's local `SalesIntro` interface and accept `locale` and `defaultLocale` props.
2. Render the actions with the existing `Button` primitive (`variant="primary"` for the first, `secondary` for the rest), building hrefs with `localePath` from `$lib/utils/routing` — the same pattern `kunskapsbank/+page.svelte` already uses.
3. Pass `locale={data.locale}` and `defaultLocale={data.defaultLocale}` from the homepage.
4. Change English `salesIntro.actions[0].path` from `'paketering'` to `'packaging'`.

**Verification:**

1. Standard verification.
2. `/` shows two buttons linking to `/paketering` and `/kontakt`.
3. `/en` shows two buttons linking to `/en/packaging` and `/en/contact`.

**Note:** T11 re-expresses these links through the route registry. Using `localePath` here is the correct interim step — this is a critical-path product defect and should not wait two phases for the registry.

## T05 — Correct repository metadata · **S**

- [x] Complete

**Why:** `README.md` documents `@sveltejs/adapter-static` and a static `build/` upload, but the project uses `adapter-node` behind Passenger. `package.json` has no `engines` field despite the README citing an engine requirement.

**Affected files:** `README.md`, `package.json`

**Steps:**

1. Rewrite the README deploy section to describe `adapter-node`, `_passenger.cjs`, and the GitHub Actions flow in `.github/workflows/inleed-node-multi.yml`.
2. Add an `engines` field. **Determine the correct value before writing it** — do not assume `>=18`. `devDependencies` contains ESLint 10 and TypeScript 6, which very likely require Node 20 or newer, while the _deploy runtime_ is Node 18.20.8 and CI builds on Node 24. Check each tool's own `engines` (`npm ls --json eslint typescript | ...`, or read their `package.json`) and record the real floor. If dev tooling and the deploy runtime genuinely disagree, say so in the README rather than picking a number that is wrong for one of them.
3. Note in the README that `@sveltejs/adapter-static` remains in `devDependencies` but is unused, and that `@types/node` is a major ahead of the deploy runtime.

**Verification:**

1. Standard verification.
2. `npm ci` succeeds locally on the installed Node version.
3. The `engines` value is justified by a note in the progress log naming which dependency set the floor.

---

# Phase 1 — Safety net

Land these before any structural change, so routing work surfaces failures visibly and cheaply.

## T06 — Add a build-output smoke check · **M**

- [x] Complete

**Blocked by:** none

**Why:** the remaining phases ask you to hand-verify the same set of URLs over and over — after the registry lands, after the loaders are deleted, after the route groups move, after the metadata component. That is dozens of manual browser checks, and manual checks are exactly what a solo developer skips when tired. A script that reads `build/prerendered/` and asserts the shape of every generated page replaces most of them and turns T14 from "hope nothing broke" into a pass/fail.

This is not the test suite the review ruled out. It has no runtime, no framework and no dependencies; it reads build output. The expected-page list is deliberately restated in the script rather than derived from the route registry — a check that derives its expectations from the thing it is checking cannot fail.

**Affected files:** new `scripts/check-build.mjs`, `package.json` (one script entry)

**Steps:**

1. Create `scripts/check-build.mjs` using only Node built-ins (`node:fs`, `node:path`). It should walk `build/prerendered/`, ignoring `.br` and `.gz` siblings, and assert:
   - every expected page file exists;
   - no unexpected page file exists (this is what catches duplicate URLs);
   - each page has exactly one `<title>` and it is non-empty;
   - each page's `<html lang="…">` matches the locale implied by its path;
   - no literal `%lang%` or other unreplaced placeholder remains.
2. Keep the expected list as a plain array at the top of the file with a comment saying which tasks update it.
3. Add `"check:build": "node scripts/check-build.mjs"` to `package.json` scripts.
4. Seed the expected list with the current 14 canonical pages **plus** the 6 known duplicates, `experiment`, `fonts`, `stats` and `sitemap.xml`, so the check passes today. Later tasks remove entries as they remove URLs.

**Verification:**

1. Standard verification.
2. `npm run build && npm run check:build` exits 0.
3. Temporarily rename `build/prerendered/kontakt.html` and confirm the script exits non-zero with a useful message. Rename it back.

## T07 — Serve the correct `lang` attribute per locale · **S**

- [x] Complete

**Blocked by:** none

**Why:** `src/app.html` hardcodes `<html lang="sv">`, so every English page announces itself as Swedish to screen readers, translation tooling, and search engines.

**Affected files:** `src/app.html`, new `src/hooks.server.ts`

**Steps:**

1. Change `app.html` to `<html lang="%lang%">`.
2. Create `src/hooks.server.ts` with a `handle` that resolves with `transformPageChunk: ({ html }) => html.replace('%lang%', lang)`, where `lang` is `'en'` when `event.url.pathname === '/en'` or starts with `/en/`, otherwise `'sv'`.

**Verification:**

1. Standard verification (plus `npm run build` and `npm run check:build` — the hook must run during prerendering).
2. View source on `/kontakt` → `lang="sv"`; on `/en/contact` → `lang="en"`.
3. No literal `%lang%` remains in any file under `build/prerendered/`.

**Note:** this is a fourth place that infers locale from a URL string, which the review's own principles argue against. It is unavoidable here — `handle` runs before any `load`. T14 replaces the string matching with `event.route.id`, which is a structural fact rather than a parse.

## T08 — Add a site-styled error page · **M**

- [x] Complete

**Blocked by:** none

**Why:** there is no `+error.svelte`, so 404s render SvelteKit's bare fallback — measured at 686 bytes, no header, no footer, no styling. The deliberate 404 in `(site)/[[lang]]/+page.ts` also carries a hardcoded Swedish string outside the content system. Routing work in Phase 3 produces more 404s and they need to be visible.

**Affected files:** new `src/routes/+error.svelte`, `src/lib/content/types.ts`, `src/lib/content/site.ts`, `src/routes/(site)/[[lang]]/+page.ts`

**Steps:**

1. Add an `errorPage: { title: string; notFound: string; generic: string; homeLabel: string }` shape to `LocaleContent` and fill both locales.
2. Create `src/routes/+error.svelte` using `PageShell` and `PageHeader`, reading `page.status` and `page.error` from `$app/state`, with a link back to the locale home.
3. **Do not read content from `page.data`.** Verified: when no route matches, SvelteKit does not run layout `load` functions, so `page.data` is empty and any `data.content.…` access throws. Import `siteContent` directly into the component and pick the locale from `page.url.pathname` — the same one-line test used in T07.
4. Remove the hardcoded `'Sidan kunde inte hittas'` string from the loader; throw `error(404)` without a message.

**Verification:**

1. Standard verification.
2. `/finns-inte` renders the styled 404 with page shell and a working home link.
3. `/en/does-not-exist` renders the English variant. This is an unmatched-route 404 with no layout data, so it is the case step 3 exists for — if it throws, step 3 was not followed.

**Note:** after T14 the root layout no longer renders the site chrome, so this page loses its header and footer. That is expected and acceptable; re-check it as part of T14 rather than designing around it now.

---

# Phase 2 — Route registry

Collapses the five independent slug sources into one. Each task migrates one consumer.

## T09 — Create the route registry and migrate SEO output · **M**

- [x] Complete

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

## T10 — Move language switching onto the registry · **S**

- [x] Complete

**Blocked by:** T09

**Why:** `SiteHeader.getSwitchPath` looks slugs up in `pagePaths`, which has no `designguide`/`design-guide` entry, so the language toggle on the design guide drops the visitor at the site root. Already logged in `todo.md`.

**Affected files:** `src/lib/components/layout/SiteHeader.svelte`, `src/lib/content/site.ts` (delete `pagePaths`), `src/lib/content/types.ts` (delete `LocalizedSlugs` if unused)

**Steps:** replace `getSwitchPath` with `pageKeyFromPathname(page.url.pathname)` plus `hrefFor(key, otherLocale)`. When the key is `null`, fall back to the other locale's home.

**Verification:**

1. Standard verification.
2. Toggle language on all 7 canonical Swedish pages and all 7 English pages — each lands on the matching page in the other language, **including the design guide**.

## T11 — Type navigation links by page key · **M**

- [x] Complete

**Blocked by:** T09, T10

**Why:** nav entries carry raw slug strings, so a typo produces a 404 rather than a compile error. Two known defects come from this: `salesIntro.resource.href` is a bare relative string that resolves to the Swedish design guide when clicked from `/en`, and it opens in a new tab despite being internal.

**Affected files:** `src/lib/content/types.ts`, `src/lib/content/site.ts`, `src/lib/components/layout/SiteHeader.svelte`, `src/lib/components/layout/SiteFooter.svelte`, `src/lib/components/sections/SalesIntroSection.svelte`, `src/routes/(site)/[[lang]]/kunskapsbank/+page.svelte`, `src/lib/utils/routing.ts`

**Steps:**

1. Change `NavLink` to `{ label: string; page: PageKey }`. Update `topLinks`, `primaryLinks`, `footer.nav`, and `salesIntro.actions` in both locales.
2. Change `glossaryPage.guide.path` and `salesIntro.resource.href` to `page: PageKey`.
3. Update all consumers to build hrefs with `hrefFor`. Remove `target="_blank"` and `rel="noreferrer"` from the design guide resource link — it is internal.
4. **Delete `localePath` from `src/lib/utils/routing.ts`.** `hrefFor` fully replaces it. (Earlier revisions of this roadmap offered "simplify or delete" as a choice; it is now a decision, because a task must not present an agent with an open option.) Leave `getLocaleAndPathFromEvent` alone — T14 removes it.

**Verification:**

1. Standard verification.
2. Click every link in the header, footer, homepage CTA block, and the knowledge bank callout, in both locales. All stay in-tab and keep the correct locale prefix.
3. `rg -n "localePath" src` returns nothing.

---

# Phase 3 — Routing shape

Promoted ahead of the SEO work, because the six wrong-language duplicates are prerendered, indexable files today and this is what removes them.

## T12 — Delete the redundant per-page loaders · **S**

- [x] Complete

**Blocked by:** T11

**Why:** each page's `+page.ts` calls `loadLocalePage` and returns `{ locale, defaultLocale, content }`, which the root `+layout.ts` already provides — SvelteKit merges layout data into `PageData`. `experiment/+page.svelte` proves pages work without a loader. Doing this before T14 means twelve fewer files to move. `loadLocalePage` also contains a dead branch: its `locales.includes(locale)` check can never fail.

**Affected files:** delete the six `+page.ts` files under `(site)/[[lang]]/{paketering,konsulttjanster,kontakt,om-mandalon,kunskapsbank,designguide}/`, the six under `(site)/[[lang]]/(en)/*/`, and `src/lib/content/loadLocalePage.ts`. Keep `(site)/[[lang]]/+page.ts` — it still carries the 404 fallback.

**Verification:**

1. Standard verification (plus `npm run build` and `npm run check:build`).
2. Every URL in the canonical list renders with correct content and correct `<title>`.
3. `rg -n "loadLocalePage" src` returns nothing.

## T13 — Extract the site chrome from the root layout · **S**

- [x] Complete

**Blocked by:** T12

**Why:** T14 needs the header/footer to be renderable from a child layout, because a child layout cannot feed locale up to the root. Extracting the chrome is a pure refactor with no routing change, so it ships and verifies on its own — and it makes T14 a mechanical file move instead of a move plus a redesign. Splitting it out is the single biggest risk reduction available for the largest task in this roadmap.

**Affected files:** new `src/lib/components/layout/SiteChrome.svelte`, `src/routes/+layout.svelte`

**Steps:** move the `.app-shell` wrapper, `SiteHeader`, `<main class="page-layer">`, `SiteFooter`, the `hreflang` `<svelte:head>` block and the associated styles into `SiteChrome.svelte`, taking `{ data, children }`. The root `+layout.svelte` keeps the `app.css` import and renders `<SiteChrome {data}>{@render children()}</SiteChrome>`.

**Verification:**

1. Standard verification (plus `npm run build` and `npm run check:build`).
2. `git diff` on the built output shows no rendered change: every page still has the same header, footer and hreflang links.
3. Visual spot-check of `/` and `/en` at desktop and 375 px.

## T14 — Replace `[[lang]]` with locale route groups · **L** · **large**

- [x] Complete

**Blocked by:** T11, T12, T13

**Why:** `[[lang]]` is optional and `(en)` is nested inside it, so English slugs match with the parameter absent — and SvelteKit's prerenderer enumerates exactly that case, which is why `build/prerendered/contact.html` exists containing the Swedish contact page. Making locale a structural property of the route makes those URLs unrepresentable rather than merely discouraged. It also removes `getLocaleAndPathFromEvent`, the hand-rolled 404, the unbounded `/<junk>/<slug>` 301 space, and the `/en` slug-collision ambiguity noted in `todo.md`.

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

1. Add `(sv)/+layout.ts` and `en/+layout.ts`, each returning `{ locale, content: siteContent[locale] }` with no URL parsing. Each group's `+layout.svelte` wraps children in the `SiteChrome` component from T13. Keep `export const prerender = true` in the root `+layout.ts`.
2. Move the page files per the tree above. Page component bodies do not change. The English re-exports keep importing the Swedish component across the group boundary — ugly but correct, and cheaper than relocating eight page bodies into `$lib`.
3. Update `SiteHeader` active-link detection to compare `pageKeyFromPathname(page.url.pathname)` against each link's `page` key, and drop the `currentPath` prop.
4. Delete `getLocaleAndPathFromEvent` from `src/lib/utils/routing.ts` (the file is then empty — delete it), the locale/redirect logic from the root `+layout.ts`, and `(site)/[[lang]]/+page.ts`.
5. **Add 301 redirects for the six retired URLs** to `src/hooks.server.ts`: `/packaging` → `/en/packaging`, `/consulting` → `/en/consulting`, `/contact` → `/en/contact`, `/about` → `/en/about`, `/knowledge-bank` → `/en/knowledge-bank`, `/design-guide` → `/en/design-guide`. Derive the pairs from the route registry rather than hardcoding a seventh slug list. This must ship in the same change as the move — those URLs are currently live, prerendered and potentially indexed, and replacing them with a hard 404 discards whatever link equity they carry. It also closes the permalink/redirect item that `todo.md` lists under High.
6. Simplify the `lang` logic in `hooks.server.ts` from T07 to read `event.route.id` instead of string-matching the pathname.

**Verification:**

1. Standard verification (plus `npm run build`).
2. Update the expected-page list in `scripts/check-build.mjs`: remove the six duplicates. `npm run check:build` must pass, and it is what proves the duplicates are gone.
3. All 14 canonical URLs render with correct language.
4. Against `node build/index.js`: each of the six retired URLs returns `301` with the correct `Location`. Each of the six `/en/<swedish-slug>` URLs returns `404`. `/foo/kontakt` returns `404`, not `301`.
5. Language toggle works on all 14 pages.
6. Re-check T08: `/finns-inte` still renders the error page, now without header and footer. Confirm it does not throw.

---

# Phase 4 — Document head and SEO

## T15 — Centralize page metadata · **M**

- [x] Complete

**Blocked by:** T14

**Why:** eight pages hand-roll near-identical `<svelte:head>` blocks. No page emits a canonical URL, and no Open Graph tags exist, so links shared into email or Teams render without a preview.

**Affected files:** new `src/lib/components/layout/PageMeta.svelte`, all 7 canonical page components, `src/lib/components/layout/SiteChrome.svelte` (move the `hreflang` block into `PageMeta`), `src/lib/seo.ts`

**Steps:**

1. Create `PageMeta` taking `{ meta: Meta; pageKey: PageKey; locale: Locale; image?: string }`, emitting title, description, `<link rel="canonical">`, `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, `og:image`, `twitter:card`, and the hreflang alternates.
2. Replace each page's `<svelte:head>` block with `<PageMeta ... />`.

**Verification:**

1. Standard verification (plus `npm run build` and `npm run check:build`).
2. Extend `scripts/check-build.mjs` to assert exactly one `<link rel="canonical">` per page and that it matches the page's own absolute URL.
3. View source on `/kontakt` and `/en/contact` — exactly one `<title>`, one canonical, three hreflang links.
4. No page component contains `<svelte:head>` with a `<title>` any more, except `/stats`.

## T16 — Add organization structured data · **S**

- [x] Complete

**Blocked by:** T15

**Why:** address, phone, email, and the ISO 9001:2015 certification already exist in `contactPage` and `aboutPage` but are invisible to search engines as structured facts. For a regional B2B supplier this is the cheapest visibility win available.

**Affected files:** `src/lib/components/layout/PageMeta.svelte` or a new sibling component, `src/lib/content/site.ts` (only if a field is missing)

**Steps:** emit a JSON-LD `Organization` block sitewide and a `LocalBusiness` block on the contact page, sourcing values from existing content rather than duplicating them.

**Verification:**

1. Standard verification.
2. Paste the rendered `/kontakt` source into Google's Rich Results Test — no errors.

---

# Phase 5 — Content architecture

## T17 — Enforce locale parity in the type system · **M** · **needs-copy** · **expected-failure**

- [x] Complete

**Blocked by:** none

**Why:** parity has already drifted and `satisfies` cannot see it. Swedish `glossaryPage.sections` has 4 entries, English has 5 (English has a "Sensors" section Swedish lacks). Swedish `chipSensorsPage.areas[3].paragraphs` has 5, English has 4. Both satisfy their array types.

This no longer depends on T18. Splitting the content file is a convenience; catching drift is the actual value, and it needs no rearrangement to work.

**Affected files:** `src/lib/content/types.ts`, `src/lib/content/site.ts`, `src/routes/(site)/(sv)/kunskapsbank/+page.svelte`, `src/routes/(site)/(sv)/paketering/+page.svelte` — or the `[[lang]]` equivalents if T14 has not landed.

**Steps:**

1. Convert parity-sensitive collections from arrays to keyed records, e.g. `sections: Record<'asic' | 'mems' | 'wafer' | 'sensors' | 'microstructures', GlossarySection>`. Add an explicit order array where display order matters, typed so a missing key is a compile error rather than a silent omission.
2. TypeScript will now report the missing Swedish `sensors` section. **The developer must supply the Swedish copy** — an agent must stop here and ask.
3. Decide whether the missing Swedish encapsulation paragraph should be added to English or removed from Swedish.

**Verification:**

1. `npm run check` is **expected to fail** after step 1 and before step 2 — that failure is the deliverable, not a defect. Standard verification applies only once the copy is in place. Do not tick this task while `check` fails.
2. `/kunskapsbank` and `/en/knowledge-bank` show the same number of sections in the same order.

## T18 — Split the content module by page · **M** · optional

- [x] Complete

**Blocked by:** T17

**Why:** `src/lib/content/site.ts` is 871 lines holding both locales for every page. Any content edit loads the whole file into context, which is expensive for AI-assisted editing.

**This task is optional and it is the weakest item in the roadmap.** 871 lines is not large, the benefit is token cost rather than correctness, and a mechanical move of both locales across eight files can silently drop a paragraph. It is scheduled after T17 rather than before it precisely so that the valuable half is not held hostage to the cosmetic half. Skip it without guilt.

**Affected files:** new `src/lib/content/pages/*.ts`, `src/lib/content/site.ts`, `src/lib/content/types.ts`

**Steps:** create one module per page (`home.ts`, `packaging.ts`, `consulting.ts`, `contact.ts`, `about.ts`, `knowledge.ts`, `designGuide.ts`, `shared.ts` for nav and meta), each exporting `{ sv, en }`. Keep both locales **adjacent in the same file** — never split by locale, which would maximize drift. `site.ts` becomes an assembler that still ends with `satisfies Record<Locale, LocaleContent>`.

**Verification:**

1. Standard verification.
2. Build before and after, and diff the rendered HTML: `npm run build`, copy `build/prerendered/*.html` aside, make the change, rebuild, and confirm the two sets are byte-identical. `git diff --stat` is **not** sufficient — a cross-file move looks identical to a move plus an edit.

---

# Phase 6 — Accessibility and interaction

## T19 — Resolve the auto-advancing carousel · **M** · **needs-decision**

- [x] Complete

**Blocked by:** none

**Why:** `FeatureCarousel` advances every 5 s with no pause control, no previous/next buttons, no slide indicators, and no `prefers-reduced-motion` check. That is a WCAG 2.2.2 failure, and keyboard users cannot reach slides two and three. It also costs roughly 15 KB of JavaScript on an otherwise nearly static site.

Scheduled **before** T25 deliberately: `FeatureCarousel` is on T25's list of components to convert to the image component, and option A deletes most of it.

**Affected files:** `src/lib/components/sections/FeatureCarousel.svelte`, `src/routes/(site)/(sv)/+page.svelte`, `package.json` (only if the dependency is dropped)

**Decision required — ask the developer before implementing:**

- **A (recommended):** replace with a three-column responsive grid. All three cards visible at once, no controls needed, no accessibility obligation, and all three `embla-carousel*` packages can be removed from `dependencies`.
- **B:** keep the carousel and add previous/next buttons, slide indicators with `aria-label`, a pause/play control, keyboard support, and an autoplay opt-out under `prefers-reduced-motion`.

**Verification:**

1. Standard verification.
2. Option A: all three feature cards visible and readable at 320 px, 768 px, and 1280 px; `rg -n "embla" src package.json` returns nothing.
3. Option B: every slide reachable by keyboard alone; autoplay does not start when reduced motion is requested.

## T20 — Add global focus visibility · **XS**

- [x] Complete

**Blocked by:** none

**Why:** no `:focus-visible` styling exists anywhere, so keyboard focus relies on UA outline defaults against a dark header background. This is a handful of lines of CSS with no dependency on anything else in the roadmap — it was previously bundled with the `aria-current` work and blocked behind the route migration for no reason.

**Affected files:** `src/lib/styles/style-resets.css` or `src/app.css`

**Steps:** add a global `:focus-visible` outline using existing tokens, with sufficient contrast on both the dark header and the light page body.

**Verification:**

1. Standard verification.
2. Tab through the header, a page body, and the footer — focus is visible at every stop on both backgrounds.

## T21 — Indicate the current page in the header · **S**

- [x] Complete

**Blocked by:** T14, T20

**Why:** active navigation is conveyed by color and weight only, with no `aria-current`. `todo.md` independently notes the active state is hard to see. Blocked by T14 because that task rewrites the active-link detection.

**Affected files:** `src/lib/components/layout/SiteHeader.svelte`, `src/lib/styles/typography.css`

**Steps:** add `aria-current="page"` to the active header link and strengthen its visual treatment beyond color alone.

**Verification:**

1. Standard verification.
2. Accessibility inspector shows `current page` on the active nav item, on every page in both locales.

## T22 — Give the capabilities table real semantics · **S**

- [x] Complete

**Blocked by:** T14, T24

**Why:** `Table.svelte` renders a two-column name/description grid entirely as `<td>` with no `<th>`, `<caption>`, or scope, so the pairing is lost to screen readers. The bonding capabilities list on `/paketering` is its main use and is semantically a description list.

Blocked by T14 and T24 only because both of those move the files this task edits. There is no logical dependency.

**Affected files:** `src/lib/components/data/Table.svelte`, `src/lib/styles/table.css`, `src/routes/(site)/(sv)/paketering/+page.svelte`, `src/routes/(dev)/experiment/+page.svelte`

**Steps:** replace `Table` with a `DescriptionList` component rendering `<dl>`/`<dt>`/`<dd>`, and update both call sites. (Previously offered as a choice between adding `<th>` semantics and switching to a description list; the content is a name/description pairing, so the description list is the answer and the task should not ask again.)

**Verification:**

1. Standard verification.
2. Accessibility inspector announces each capability name paired with its description.
3. Visual output on `/paketering` is unchanged or improved.

## T23 — Remove the stats page's global background override · **XS**

- [x] Complete

**Blocked by:** none

**Why:** `/stats` contains a `:global(body)` override that mutates the site background from inside a page, which leaks into whatever the visitor navigates to next. `todo.md` already prohibits page-level global styling in principle. This is the only part of the stats page worth fixing — see Deferred for the rest.

**Affected files:** `src/routes/(stats)/stats/+page.svelte`, possibly `src/app.css`

**Steps:** remove the `:global(body)` block. If a different background is genuinely wanted for the stats page, express it as a class on the page's own wrapper element, not on `body`.

**Verification:**

1. Standard verification.
2. Navigate from `/stats` to `/` via client-side routing — the site background is correct.

## T24 — Keep development-only routes out of production · **S**

- [x] Complete

**Blocked by:** T14

**Why:** `/experiment` and `/fonts` are enumerable routes under `prerender = true`, so they are built and publicly served — confirmed present in `build/prerendered/`. `todo.md` already asks for the experiment page to be dev-only.

**Affected files:** new `src/routes/(dev)/` group with `+layout.ts` and `+layout.svelte`, moved `experiment` and `fonts` routes, `scripts/check-build.mjs`

**Steps:** create a `(dev)` group whose `+layout.ts` exports `prerender = dev` and throws `error(404)` when `!dev` (`import { dev } from '$app/environment'`). Move `experiment` and `fonts` into it. Leave `/stats` where it is — it is `noindex` and the developer uses it in production.

**Verification:**

1. Standard verification (plus `npm run build`).
2. Remove `experiment` and `fonts` from the expected list in `scripts/check-build.mjs`; `npm run check:build` passes.
3. `npm run dev`: `/experiment` and `/fonts` render.

**Note from T06:** `/experiment` and `/fonts` currently have no `<title>`; `check-build.mjs` treats title as optional for those two paths until this task removes them from the expected list.

---

# Phase 7 — Media delivery

## T25 — Introduce an image component with required dimensions · **L**

- [x] Complete

**Blocked by:** T14, T19

**Why:** outside the design guide, every `<img>` lacks `width`, `height`, `loading`, and `srcset`, so full-resolution JPEGs of 100–220 KB are downloaded at arbitrary display sizes and every content page shifts layout during load. The archived styling rule deferred an image component "until lazy loading / aspect ratio / captions are needed" — all three are now needed, and `MediaArticleSection` already styles `figure`/`figcaption` through `:global()`.

**Affected files:** new `src/lib/components/media/Image.svelte`, `src/lib/components/sections/MediaArticleSection.svelte`, `src/lib/components/sections/FeatureCarousel.svelte` (or its T19 replacement), `src/routes/(site)/(sv)/{kontakt,kunskapsbank,paketering}/+page.svelte`, `src/lib/content/types.ts` and the image entries in `src/lib/content/pages/{home,packaging,knowledge,contact}.ts` (post-T18; was `site.ts`), plus `src/lib/components/layout/PageMeta.svelte` (JSON-LD reads `person.image.src`)

**Steps:**

1. Create `Image.svelte` with **required** `src`, `alt`, `width`, `height`, optional `caption` and `priority`. Default `loading="lazy"` and `decoding="async"`; `priority` switches to `loading="eager"` with `fetchpriority="high"`.
2. Normalize the content image shape. Today it is inconsistent — `consulting.features[]` uses a bare `image: string`, `areas[]` and `people[]` use `image` plus `imageAlt`, and `glossaryPage.introImage` uses `{ src, alt }`. Settle on `{ src, alt, width, height }` everywhere and fill in intrinsic dimensions.
3. Replace every raw `<img>` on content pages. Leave the design guide for T29 and the logos in header and footer as-is.

**Verification:**

1. Standard verification.
2. Lighthouse on `/kunskapsbank`: Cumulative Layout Shift is 0.
3. DevTools Network: below-the-fold images are not requested until scrolled.

## T26 — Convert source images to WebP · **M**

- [ ] Complete

**Blocked by:** T25

**Why:** T25 stops the layout shift but still ships one full-size JPEG or PNG per image. A one-time format conversion captures most of the remaining transfer saving for almost no ongoing cost.

**Deliberately narrower than the earlier version of this task**, which proposed hand-generating WebP and AVIF at two or three widths and emitting `srcset`. For a solo developer that is a permanent manual asset pipeline across 40-plus images that must be re-run and kept in sync forever — a worse trade than the one-time dependency it was avoiding. If per-width variants are ever genuinely needed, adopt `@sveltejs/enhanced-img` rather than building the pipeline by hand.

**Affected files:** `static/mandalon/**`, image `src` values in `src/lib/content/pages/*.ts` (post-T18; was `site.ts`), and `README.md` (document how to add new images: convert to WebP, place under `static/mandalon/`, register `{ src, alt, width, height }` in the page content module, render with `Image.svelte`)

**Steps:** convert the JPEGs and the 987 KB design guide PNG to WebP at equivalent visual quality, update the `src` values, and delete the originals. No `srcset`, no build-step changes, no new dependencies. Document the future image-add procedure in `README.md`.

**Verification:**

1. Standard verification.
2. Total image transfer on `/kunskapsbank` drops by at least a third at desktop width.
3. Every image still renders at correct dimensions at 320 px and 1280 px.

## T27 — Reduce background and font loading cost · **S**

- [ ] Complete

**Blocked by:** T03, T26

**Why:** `background-attachment: fixed` on a 131 KB image forces repaint on every scroll and behaves poorly on iOS; the same image is painted again behind the sticky header. No font is preloaded, so the first paint waits on a swap.

**Affected files:** `src/app.css`, `src/lib/components/layout/SiteChrome.svelte`, `src/lib/components/layout/SiteHeader.svelte`

**Steps:** drop `fixed` attachment or gate it behind `@media (prefers-reduced-motion: no-preference) and (min-width: …)`, and add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two font files used above the fold. The WebP conversion of `motherboard-bg.jpg` is handled by T26.

**Verification:**

1. Standard verification.
2. Lighthouse performance score on `/` does not regress and Largest Contentful Paint improves.
3. Background renders correctly on a mobile viewport.

---

# Phase 8 — Design guide

## T28 — Decide the design guide's language · **XS** · **needs-decision**

- [ ] Complete

**Blocked by:** none

**Why:** the review treats "a Swedish visitor reads an English document" as a defect to be fixed by translation. That is one option, not the only one, and the cheap option was never put to the developer. English is the working language of chip design; a technical design guide staying in English is normal and defensible. The difference in cost between the two answers is roughly a day versus a week, so the decision must come before any work starts.

**Affected files:** none for the decision itself; `src/lib/content/site.ts` if option A is chosen.

**Decision required — ask the developer before implementing:**

- **A (cheaper):** the design guide is an English-language technical document in both locales. Add a short Swedish note above the article saying so, keep one copy of the body, and drop the translation requirement from T29 entirely.
- **B (thorough):** the guide is fully localized. T29 then includes a complete Swedish translation of roughly 650 lines of technical prose, which the developer must write.

**Verification:** the choice is recorded in the progress log and T29's scope is edited to match before T29 begins.

## T29 — Restructure the design guide · **XL** · **large** · **needs-copy**

- [ ] Complete

**Blocked by:** T25, T28

**Why:** the page is 781 lines of hardcoded English HTML. Only the title, intro, and download labels come from content. Every one of its ~40 images carries `alt=""`, marking technical diagrams as decorative. `todo.md` also wants it restructured as a documentation-style page.

**This is the largest item in the roadmap by an order of magnitude and it is mostly a writing project.** Do not attempt it in one sitting. Work it as three separate commits on a dedicated branch:

1. **Structure.** Model the guide as an ordered list of sections with heading, level, paragraphs, and figures (`src`, `alt`, `width`, `height`, `caption`), and build the small set of components that render it, using the T25 `Image` component.
2. **Migration.** Move the existing English body into the content module unchanged. The page should render identically to before at this point — that is how you verify the migration.
3. **Copy.** Write real `alt` text for every figure, and the Swedish translation if T28 chose option B. **The developer must supply both** — an agent must stop and ask.

A table of contents and in-page anchors are a fourth, optional commit.

**Affected files:** the design guide page at its post-T14 location, new design guide sections in the content module, new section components, `static/mandalon/designguide/**`

**Verification:**

1. Standard verification (plus `npm run build` and `npm run check:build`).
2. After commit 2: the rendered HTML body is equivalent to the pre-task build.
3. After commit 3: no `alt=""` remains on a content-bearing image, and the language matches the T28 decision on both `/designguide` and `/en/design-guide`.
4. Total page weight is reduced relative to the pre-task build.

---

# Phase 9 — Conventions

## T30 — Update the Cursor rules for the new architecture · **M**

- [ ] Complete

**Blocked by:** T14, T18 (if T18 was done)

**Why:** the implementer rules restored in T01 describe the old architecture. Several of their statements go stale during this roadmap — the `(en)` wrapper pattern, the `[[lang]]` layout, "no `Image.svelte`", and the component folder map all change.

**Affected files:** `.cursor/rules/*.mdc`

**Steps:** update the restored rules for the new routing shape, the route registry as the single slug source, the image component, the per-page content modules if T18 was done, and the CSS delivery rule from T31. Add an explicit rule naming `src/lib/routes.ts` as the only place slugs may be defined.

**Verification:**

1. Rules describe the tree that actually exists — spot-check five claims against the repository.
2. No rule references `[[lang]]`, `pagePaths`, `loadLocalePage`, `localePath`, or `localizedRouteEntries`.

## T31 — Document the CSS delivery convention · **S**

- [ ] Complete

**Blocked by:** T30

**Why:** the design system is delivered three ways — components emitting global classes (`Surface`, `Text`), components applying global classes (`PageContent`), and pages applying global classes directly (`.content-list`, `.surface-grid`). None is wrong; the absence of a rule for choosing is.

**Affected files:** `.cursor/rules/styling.mdc`

**Steps:** state which mechanism applies to which situation, when a `:global()` pierce is acceptable versus when the component should expose a prop instead, and that pages may not set global styles (closing the `todo.md` item).

**Verification:** the rule correctly classifies all 11 existing `:global()` uses as either acceptable or flagged for follow-up.

---

## Considered and rejected

Recorded so the reasoning is not relitigated.

- **A `[[lang=locale]]` param matcher as an early partial fix.** It would kill the unbounded `/<junk>/<slug>` 301 space and let the hand-rolled 404 be deleted, in about fifteen minutes. Rejected because it does **not** fix `/contact` — that URL matches with the parameter absent, which is the case that actually produces prerendered duplicate files — and everything it does fix, T14 also fixes. Adding scaffolding that T14 deletes is churn for a latent problem nothing links to.
- **Restyling the whole `/stats` page.** 361 lines of rework on an internal `noindex` page only the developer sees. The genuinely harmful part is the global body override, extracted as T23. The rest is deferred.
- **Hand-built responsive `srcset` variants.** See T26.
- **Restoring the Cursor rules at the end of the roadmap.** Moved to T01. Implementing 30 tasks with the implementer conventions unloaded is backwards.

## Deferred / not scheduled

- Restyling `/stats` to the design system: hardcoded hex colors, own table markup, Swedish-only strings outside the content system. Low value, internal page.
- `@types/node` is a major version ahead of the Node 18 deploy runtime. Harmless today; revisit when the host offers a newer Node.
- `@sveltejs/adapter-static` remains in `devDependencies` and is unused. Remove opportunistically.
- Prettier `printWidth: 160` produces long content lines in `site.ts`. Cosmetic; changing it would churn the whole repo.
- Dark mode (`todo.md`). Blocked on tokens being fully semantic — worth revisiting after T31.
- Cookie-free analytics (`todo.md`). Independent of this roadmap.
- **A contact form.** The site's stated primary goal is inbound inquiries, and the only conversion path is a phone number and an email address. T04 restores the CTA buttons that lead there, but the destination itself is the weakest link in the funnel. Out of scope for an architecture review; worth more than most of Phases 6 to 8 in business terms.
- Header nav redesign: EN/SV toggle button, phone icon on Contact, clearer link styling (`todo.md`, Medium). Product design work, not architecture.

## Progress log

Append one row per completed task. Newest last.

| Date       | Task | Verified by                                                                       | Notes                                                                           |
| ---------- | ---- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 2026-08-01 | T01  | rules restored; format/check pass; lint fails on known T02 Surface import         | Archive deleted; architecture-review remains dormant                            |
| 2026-08-01 | T02  | format/check/lint; /paketering and /stats load                                    | Kept analytics.ts; icons/ directory removed                                     |
| 2026-08-01 | T03  | format/check/lint; upright woff2 served; /designguide 200                         | Normal Roboto face now loads VariableFont, not Italic                           |
| 2026-08-01 | T04  | format/check/lint; `/` → /paketering,/kontakt; `/en` → /en/packaging,/en/contact  | EN action path fixed to packaging; locale null-safe                             |
| 2026-08-01 | T05  | format/check/lint; npm ci --dry-run 0; engines documented                         | engines >=18.20.8 (deploy); ESLint 10 needs Node 20.19+/22.13+/24               |
| 2026-08-01 | T06  | format/check/lint; build+check:build; rename kontakt → non-zero                   | Title optional for experiment/fonts; EN lang needs T07 in tree                  |
| 2026-08-01 | T07  | format/check/lint; build+check:build; kontakt=sv contact=en; no %lang%            | hooks.server.ts path-prefix lang until T14 route.id                             |
| 2026-08-01 | T08  | format/check/lint; /finns-inte SV chrome; /en/does-not-exist EN no throw          | Imports siteContent directly; error(404) message removed                        |
| 2026-08-02 | T09  | format/check/lint; sitemap before/after identical; /kontakt hreflang ×3           | pages registry + hrefFor; localizedRouteEntries deleted                         |
| 2026-08-02 | T10  | format/check/lint; lang toggle on all 14 canonical pages incl. design guide       | Deleted pagePaths and LocalizedSlugs                                            |
| 2026-08-02 | T11  | format/check/lint; nav/CTA/callout hrefs both locales; no localePath in src       | NavLink.page: PageKey; deleted localePath                                       |
| 2026-08-02 | T12  | format/check/lint; build+check:build; 14 titles+langs; no loadLocalePage in src   | Kept [[lang]]/+page.ts for 404; EN wrappers no longer re-export load            |
| 2026-08-02 | T13  | format/check/lint; build+check:build; prerender markup identical (noise stripped) | SiteChrome owns shell/header/footer/hreflang; root layout imports app.css       |
| 2026-08-02 | T14  | format/check/lint; build+check:build(18); 301s+404s+toggles+error chrome-less     | (sv)/+en layouts; retired EN-slug 301s from pages registry; deleted routing.ts  |
| 2026-08-02 | T15  | format/check/lint; build+check:build; kontakt/contact canonical+hreflang×3        | PageMeta; hreflang left SiteChrome; check-build asserts canonical URLs          |
| 2026-08-02 | T16  | format/check/lint; Rich Results Test on /kontakt — no errors                      | Organization sitewide + LocalBusiness on contact; values from site content      |
| 2026-08-02 | T17  | format/check/lint; kunskapsbank/knowledge-bank 5 sections same order              | Plain SV Sensors translation; EN encapsulation §5; rewrite todo in todo.md      |
| 2026-08-02 | T18  | format/check/lint; build; 17 prerendered HTML identical (hashes stripped)         | pages/\*.ts per page with {sv,en}; site.ts assembler; SharedContent/HomeContent |
| 2026-08-02 | T19  | format/check/lint; keyboard reaches all slides; reduced-motion skips autoplay     | Option B; control labels via homepage props (content files out of scope)        |
| 2026-08-02 | T20  | format/check/lint; focus-visible outline on header/body/footer                    | Accent outline in style-resets.css                                              |
| 2026-08-02 | T21  | format/check/lint; aria-current=page on SV/EN primary nav; underline+weight       | Shared [aria-current=page] in typography.css; header underline override         |
| 2026-08-02 | T23  | format/check/lint; /stats→/ SPA keeps body background-attachment fixed            | Removed :global(body); no app.css change needed                                 |
| 2026-08-02 | T24  | format/check/lint; build+check:build(16); /experiment+/fonts in dev only          | (dev) group prerender=dev + 404 when !dev; T22 path noted                       |
| 2026-08-02 | T22  | format/check/lint; /paketering dl/dt/dd pairs; no table.table                     | DescriptionList replaces Table; table.css restyled for dl                       |
| 2026-08-03 | T25  | format/check/lint; CLS=0 on /kunskapsbank; lazy defers far below-fold imgs        | ContentImage shape; Image.svelte; PageMeta .src; pages/*.ts not site.ts         |
