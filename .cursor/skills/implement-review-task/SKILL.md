---
name: implement-review-task
description: Executes exactly one unfinished task from docs/review-roadmap.md in the Mandalon SvelteKit repository, verifies it, and marks it complete. Use when the user asks to work the roadmap, do the next roadmap task, continue the architecture review implementation, or names a task ID such as T07.
disable-model-invocation: true
---

# Implement one review roadmap task

Executes a single task from `docs/review-roadmap.md`, end to end, and stops.

## Absolute rules

1. **One task per invocation.** Never start a second task, even a trivial one, even if it is related.
2. **Never edit a file that is not in the task's `Affected files` list.** The only exception is `docs/review-roadmap.md` itself, at the end.
3. **Never tick a checkbox unless every verification step passed.**
4. **Never skip, reorder, or reinterpret verification steps.**
5. **Stop and ask** rather than guess. Guessing is more expensive than asking.
6. **Do not commit** unless the user explicitly asks.
7. **Do not reformat, rename, or "improve" code the task did not ask about.** Unrelated cleanup is a separate task.

## Workflow

Copy this checklist into your first message and keep it updated:

```
- [ ] 1. Select the task
- [ ] 2. Check prerequisites
- [ ] 3. Read the affected files
- [ ] 4. Implement
- [ ] 5. Verify
- [ ] 6. Mark complete
- [ ] 7. Report
```

### 1. Select the task

If the user named a task ID (`T07`), use that one.

Otherwise read `docs/review-roadmap.md` and pick the **first** task whose checkbox is `- [ ] Complete`, reading top to bottom. Tasks are ordered by dependency; do not skip ahead because a later task looks easier.

### 2. Check prerequisites

Stop and report instead of implementing if any of these are true:

| Condition                                                     | Action                                                                                           |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| The task lists `Blocked by` IDs that are not yet ticked       | Report which prerequisite is missing                                                             |
| The task is tagged `needs-decision`                           | Present the options from the task and ask the user to choose                                     |
| The task is tagged `needs-copy`                               | Do the mechanical part only if it compiles; otherwise ask for the Swedish text or alt text first |
| `git status` shows uncommitted changes unrelated to this task | Ask whether to proceed                                                                           |
| The task is tagged `large`                                    | Confirm with the user before starting, and suggest a dedicated branch                            |

### 3. Read the affected files

Read **every** file in `Affected files` before editing anything. If a file does not exist, or its contents contradict the task's description of it, stop — the roadmap is stale and the developer needs to know.

### 4. Implement

Follow the task's `Steps` exactly. If a step is impossible as written, stop and report; do not improvise an alternative.

Project conventions that apply to every task:

- **Svelte 5 runes only.** `$props()`, `$derived()`, `$state()`, `{@render children()}`. Never `export let`, `$$props`, or slots. Runes mode is forced in `svelte.config.js`.
- **TypeScript everywhere.** `lang="ts"` on every component and page. No new `.js` files under `src/`.
- **No user-facing text in components.** All copy lives in `src/lib/content/`. Components receive it through props.
- **No hardcoded design values.** Use the tokens in `src/app.css` (`--ink`, `--muted`, `--accent`, `--line`, `--border-radius`, `--space-*`, `--text-*`). No raw hex colors, no pixel literals for spacing.
- **Typography through components.** `Text`, `Heading`, `Link`. No ad-hoc `font-size` in page-scoped CSS.
- **LF line endings only.** Enforced by `.gitattributes`.
- **No new dependencies** unless the task says to add one.
- Both locales must stay in sync. A content change in `sv` needs the matching `en` change in the same task, and vice versa.

### 5. Verify

Run these three, in order. All must pass:

```bash
npm run format
npm run check
npm run lint
```

Then run `npm run build` if the task touches routing, loaders, `+layout` files, `hooks`, or prerendering.

Then perform every numbered step under the task's `Verification` heading. Manual browser checks run against `npm run dev` at http://localhost:5173. Start the dev server in the background, do the checks, then stop it.

**If verification fails:** fix the cause and re-run the full gate from `npm run format`. After two failed attempts, stop, leave the changes in place uncommitted, and report what failed with the exact error output. Do not tick the checkbox. Do not revert the developer's working tree.

### 6. Mark complete

Only after everything in step 5 passed:

1. Change the task's `- [ ] Complete` to `- [x] Complete`.
2. Append one row to the `Progress log` table at the bottom of `docs/review-roadmap.md`:

```
| 2026-08-01 | T03 | format/check/lint, /stats loads | Kept analytics.ts, still used by the stats page |
```

Use today's date, the task ID, a short note on what was verified, and anything the next person needs to know. Keep it to one line.

3. If you discovered something that affects a later task — a wrong file path, a missing step, an assumption that turned out false — add a short note under that later task rather than silently fixing it now.

### 7. Report

Use this format:

```
Task: T03 — Remove the disabled analytics code from the root layout

Changed:
- src/routes/+layout.svelte (removed trackCurrentPage, 4 unused imports)

Verified:
- npm run format / check / lint: pass
- /stats still loads and renders its error state

Roadmap updated: T03 ticked, progress log appended.
Next task: T04 — Delete unused icon components.
```

If you stopped early instead, say which step you stopped at, why, and exactly what you need from the developer.

## Stop conditions

Stop immediately and report, without editing further, if any of these occur:

- A prerequisite task is unticked.
- The task requires a product, design, or copy decision.
- Implementing it would require editing a file outside `Affected files`.
- Verification fails twice after fix attempts.
- The repository state does not match what the roadmap describes.
- The task appears already done — verify and report rather than redoing it.

## Repository quick reference

| Thing                            | Location                                                                   |
| -------------------------------- | -------------------------------------------------------------------------- |
| Roadmap                          | `docs/review-roadmap.md`                                                   |
| Content (all copy, both locales) | `src/lib/content/`                                                         |
| Shared components                | `src/lib/components/{layout,typography,primitives,sections,content,data}/` |
| Design tokens                    | `:root` in `src/app.css`                                                   |
| Shared CSS classes               | `src/lib/styles/*.css`, all imported by `src/app.css`                      |
| Routes                           | `src/routes/(site)/`, `src/routes/(stats)/`                                |
| SEO helpers                      | `src/lib/seo.ts`                                                           |
| Conventions                      | `.cursor/rules/` (archived originals in `.cursor/rules-archive/`)          |

Swedish is the default locale and is served without a prefix (`/kontakt`). English is served under `/en/` with translated slugs (`/en/contact`).
