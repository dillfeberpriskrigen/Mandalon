# Refactor chunk 1: component structure + PageHeader

Paste this whole file into a fresh chat as the task. It is self-contained.

## Context

This repo is **Mandalon**, a SvelteKit 2 / Svelte 5 (runes mode) B2B site, JS + JSDoc with `checkJs`, Prettier + ESLint, LF line endings only. An incremental refactor is in progress: break pages into reusable components and unify styling from `src/app.css`.

Read these first, they carry the standing conventions and take precedence over anything ambiguous below:

- `.cursor/rules/project-overview.mdc`
- `.cursor/rules/refactoring.mdc`
- `.cursor/rules/svelte-components.mdc`
- `.cursor/rules/styling.mdc`
- `todo.md`

This chunk covers priority 1 (component structure) and priority 3 (`PageHeader`) from the refactoring rule. **It is mechanical: no visual change is intended anywhere on the site.** If you find yourself changing how something looks, stop and reconsider.

## Part A: component structure moves

Use `git mv` so history is preserved.

| From                                       | To                                                 |
| ------------------------------------------ | -------------------------------------------------- |
| `src/lib/components/SiteHeader.svelte`     | `src/lib/components/layout/SiteHeader.svelte`      |
| `src/lib/components/SiteFooter.svelte`     | `src/lib/components/layout/SiteFooter.svelte`      |
| `src/lib/components/ParagraphArray.svelte` | `src/lib/components/content/ParagraphArray.svelte` |

`src/lib/components/content/` does not exist yet and needs creating. `layout/` already exists (it holds `PageContent.svelte`).

These are the only import sites, verified by grep across `src/`:

- `src/routes/+layout.svelte` lines 8-9 — `SiteHeader` and `SiteFooter`
- `src/routes/[[lang]]/paketering/+page.svelte` line 3 — `ParagraphArray`
- `src/routes/[[lang]]/experiment/+page.svelte` line 3 — `ParagraphArray`

Then delete these four components. All are **empty files (0 bytes) with no imports anywhere**, so deleting them cannot break anything:

- `src/lib/components/typography/Typography.svelte`
- `src/lib/components/typography/Heading.svelte`
- `src/lib/components/typography/Link.svelte`
- `src/lib/components/media/Image.svelte` — this leaves `media/` empty, remove the folder too

`Heading` and `Link` are still wanted eventually; they stay on the `todo.md` backlog as components to be built. Deleting the empty placeholders just removes dead files. Do not implement them in this chunk.

## Part B: PageHeader

Five canonical pages open with the same two lines, differing only in the content key:

```
<h1 class="page-title">{data.content.chipSensorsPage.title}</h1>
<p class="lead text-width">{data.content.chipSensorsPage.lead}</p>
```

| Page                                               | Lines | Content key       |
| -------------------------------------------------- | ----- | ----------------- |
| `src/routes/[[lang]]/paketering/+page.svelte`      | 16-17 | `chipSensorsPage` |
| `src/routes/[[lang]]/om-mandalon/+page.svelte`     | 12-13 | `aboutPage`       |
| `src/routes/[[lang]]/konsulttjanster/+page.svelte` | 12-13 | `consultingPage`  |
| `src/routes/[[lang]]/kunskapsbank/+page.svelte`    | 15-16 | `glossaryPage`    |
| `src/routes/[[lang]]/kontakt/+page.svelte`         | 18-19 | `contactPage`     |

Create `src/lib/components/layout/PageHeader.svelte` with exactly this minimal surface:

```svelte
<script lang="ts">
	interface Props {
		title: string;
		lead?: string;
	}

	let { title, lead }: Props = $props();
</script>

<h1 class="page-title">{title}</h1>
{#if lead}
	<p class="lead text-width">{lead}</p>
{/if}
```

Then replace the two lines on each of the five pages with, for example:

```svelte
<PageHeader title={data.content.chipSensorsPage.title} lead={data.content.chipSensorsPage.lead} />
```

Three constraints that keep this a visual no-op. Do not "improve" on them:

- **Reuse the global classes.** `.page-title`, `.lead` and `.text-width` live in `src/app.css` and must stay there — `designguide` and `/stats` still use them. Do not move that CSS and do not add scoped styles to `PageHeader`.
- **Do not use `Text variant="lead"` for the lead paragraph.** `Text` renders 1.25rem/1.6 in Roboto Condensed, while `.lead` is 1.12rem/1.8 in Roboto. Swapping would change the design.
- **Do not let `PageHeader` own the page wrapper.** The five pages sit in four different shells (`div.container.page-content`, `section.info-page`, `section.page-content`, `section.container-narrow`). Leave every wrapper exactly as it is. A shared `PageShell` is a separate, later task.

## Out of scope

- `src/routes/[[lang]]/designguide/+page.svelte` — its intro uses `.guide-intro`, which is `.lead` plus `color: #506458`. Adopting `PageHeader` would change its color, and the page is phase 3 anyway.
- `src/routes/stats/+page.svelte` and the home page — no matching header pattern.
- The English route wrappers (`about`, `consulting`, `contact`, `knowledge-bank`, `packaging`, `design-guide`). They are one-line re-exports of the Swedish page and must stay that way.
- The missing `.text-label` class that `Text`'s `variant="label"` references. A real gap, but a separate chunk.
- Everything else in `todo.md`: `Surface` adoption, `Table`, `FaqSection`, `MediaArticleSection` extensions, the experiment page.

## Verification

1. `npm run format`, then `npm run check` and `npm run lint` — all must pass.
2. `npm run dev`, then check both locales render correctly: `/paketering`, `/om-mandalon`, `/konsulttjanster`, `/kunskapsbank`, `/kontakt` and `/en/packaging`, `/en/about`, `/en/consulting`, `/en/knowledge-bank`, `/en/contact`.
3. `git diff` on the five pages should show only the two-line header swap plus one added import each. Anything more means scope crept.

## Bookkeeping

In `todo.md`, under "Komponentstruktur", check off the two move items (site chrome, content components) and the `Image` evaluation item. Under "Komponenter att bygga", mark `PageHeader` as done on the `PageHeader / PageShell` line and leave `PageShell` open.

Do not commit unless asked.
