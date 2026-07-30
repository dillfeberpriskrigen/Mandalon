# Refactor chunk 2: PageShell

Paste this whole file into a fresh chat as the task. It is self-contained.

## Context

This repo is **Mandalon**, a SvelteKit 2 / Svelte 5 (runes mode) B2B site, JS + JSDoc with `checkJs`, Prettier + ESLint, LF line endings only. An incremental refactor is in progress: break pages into reusable components and unify styling from `src/app.css`.

Chunk 1 already moved site chrome / `ParagraphArray`, deleted empty stubs, and introduced `PageHeader` on the five phase-1 pages. Wrappers were left alone on purpose.

Read these first, they carry the standing conventions and take precedence over anything ambiguous below:

- `.cursor/rules/project-overview.mdc`
- `.cursor/rules/refactoring.mdc`
- `.cursor/rules/svelte-components.mdc`
- `.cursor/rules/styling.mdc`
- `todo.md`

This chunk covers the remaining half of priority 3 (`PageShell`) from the refactoring rule. **It is mechanical: no visual change is intended anywhere on the site.** If you find yourself changing how something looks, stop and reconsider.

## PageShell

Five canonical pages share the same outer chrome — vertical padding `4rem 0 6rem` plus a `.container` column — but express it four different ways:

| Page                                               | Outer shell today                            | Width   |
| -------------------------------------------------- | -------------------------------------------- | ------- |
| `src/routes/[[lang]]/paketering/+page.svelte`      | `div.container.page-content` > `section`     | default |
| `src/routes/[[lang]]/konsulttjanster/+page.svelte` | `section.page-content` > `div.container`     | default |
| `src/routes/[[lang]]/kontakt/+page.svelte`         | `section.info-page` > `div.container`        | default |
| `src/routes/[[lang]]/om-mandalon/+page.svelte`     | `section.info-page` > `div.container`        | narrow  |
| `src/routes/[[lang]]/kunskapsbank/+page.svelte`    | `section.container-narrow` > `div.container` | narrow  |

Create `src/lib/components/layout/PageShell.svelte` with exactly this surface:

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		narrow?: boolean;
	}

	let { children, narrow = false }: Props = $props();
</script>

<section class="page-shell" class:narrow>
	<div class="container">
		{@render children()}
	</div>
</section>

<style>
	.page-shell {
		padding: 4rem 0 6rem;
	}

	.narrow {
		--container-width: var(--container-width-narrow);
	}
</style>
```

Then replace each page's outer shell with `PageShell` (import from `$lib/components/layout/PageShell.svelte`):

- **default** (`paketering`, `konsulttjanster`, `kontakt`): `<PageShell>…</PageShell>`
- **narrow** (`om-mandalon`, `kunskapsbank`): `<PageShell narrow>…</PageShell>`

On `paketering`, drop the extra inner `<section>` that only exists for nesting (it has no own styles). Keep the inner `PageContent` usage — that is a different concern (content column vs page chrome).

## Constraints that keep this a visual no-op

- **Reuse global `.container`.** Width math lives in `src/app.css`. Do not reimplement it inside `PageShell`.
- **Do not fold `PageHeader` into `PageShell`.** Compose them: shell wraps header + body.
- **Leave global `.page-content` and `.container-narrow` in `app.css`.** Other pages may still use them. The five pages in this chunk just stop using those wrappers locally.
- **Drop redundant page-scoped shell CSS** after adoption:
  - `om-mandalon`: remove the `.info-page { --container-width…; padding… }` block
  - `kontakt`: remove the `.info-page { padding… }` block
  - `kunskapsbank`: remove the dead `@media` rule for `.info-page` (the page never used that class; shell padding is owned by `PageShell` now)
- Do not touch body content, panels, FAQ, tables, or any non-shell styles.

## Out of scope

- `Heading` / `Link` implementation
- `Surface` token/class fix and panel migration on om-mandalon / konsulttjanster
- Extending `MediaArticleSection`, `FaqSection`, `Table`
- Home, `designguide`, `stats`, experiment page
- English route wrappers (they re-export the SV page and must stay one-liners)
- Removing WIP red outlines on `MediaArticleSection`
- Fixing the missing `.text-label` class for `Text variant="label"`

## Verification

1. `npm run format`, then `npm run check` and `npm run lint` — all must pass.
2. `npm run dev`, then check both locales: `/paketering`, `/om-mandalon`, `/konsulttjanster`, `/kunskapsbank`, `/kontakt` and `/en/packaging`, `/en/about`, `/en/consulting`, `/en/knowledge-bank`, `/en/contact`.
3. Confirm padding and content width are unchanged — especially narrow width on om-mandalon and kunskapsbank.
4. `git diff` on the five pages should show wrapper swap + import + removal of redundant shell CSS only. Anything more means scope crept.

## Bookkeeping

In `todo.md`, under "Komponenter att bygga", mark `PageShell` done on the `PageHeader` / `PageShell` line.

Update stale notes left from chunk 1:

- `.cursor/rules/svelte-components.mdc` — `layout/` already holds `PageContent`, `PageHeader`, `PageShell`, `SiteHeader`, `SiteFooter`; `content/` holds `ParagraphArray`; no `Image` / `media/`; ready list includes `PageHeader` and `PageShell`; WIP is `Heading`, `Link`, `Button`, `Table` (empty stubs to build later).
- `.cursor/rules/refactoring.mdc` — reflect that structure moves and `PageHeader` / `PageShell` are done; next priorities are typography (`Heading`/`Link`), then sections / Surface / page body migration.

Do not commit unless asked.
