---
name: plan-next-refactor
description: >-
  Plans the single next component/style consolidation refactor for the Mandalon
  site from todo.md and .cursor/rules/refactoring.mdc. Use when the user asks
  what to refactor next, for a consolidation plan, next migration step, or
  component extraction backlog priority — not when implementing unless they
  explicitly ask to execute the plan.
disable-model-invocation: true
---

# Plan next refactor

Produce a **plan only** for the next consolidation task. Do not edit code unless the user explicitly asks to execute the plan afterward.

## Sources of truth (read every time)

1. `todo.md` — section **Konsolidering av komponenter och formatmallar** (open `[ ]` items only)
2. `.cursor/rules/refactoring.mdc` — priorities, page order, workflow, DoD, out of scope
3. `.cursor/rules/svelte-components.mdc` — folder layout, Ready/WIP status, extraction rules
4. Spot-check the candidate page/component in `src/` so the plan matches current code (not stale todo notes)

Ignore other `todo.md` sections (Vital/Medium/Low/Fixed) unless they block the chosen task.

## Pick exactly one next task

Follow this priority order (from `refactoring.mdc`):

1. **Sections** — extend `MediaArticleSection` for kontakt / kunskapsbank; extract `FaqSection` / repeated grids/callouts when the pattern appears
2. **Page migration** — one canonical SV page at a time; `paketering` is the reference; finish typography/container cleanup on remaining pages; drop leftover `.container-narrow` / `.container-wide` on home / designguide when those pages are in scope
3. **Reduce scoped styles** — audit one `+page.svelte`; move shared styling to components or `src/lib/styles/`
4. **Experiment page** — only if the next step needs a new visual variant demoed before production use

Page migration order when choosing a page:

| Phase | Pages |
|-------|-------|
| 1 | `kontakt`, `om-mandalon`, `konsulttjanster`, `kunskapsbank` |
| 2 | home (`[[lang]]/+page.svelte`) |
| 3 | `designguide` (last) |

Within a phase, prefer the open backlog item that unlocks the most reuse (e.g. extend `MediaArticleSection` before page-only cleanups that depend on it).

### Selection rules

- **One page or one pattern** — never plan the whole site
- Prefer **reuse/extend** over new components (`svelte-components.mdc` extraction rule: 2+ pages)
- Skip WIP components (`Button`, `Table`) unless the chosen task is specifically to implement/migrate that item
- Skip EN locale wrappers — plan work on the canonical Swedish slug only
- Out of scope unless the user asked: `analytics_wsgi/`, analytics wiring, full TS migration, route/slug changes

If several open items tie, pick the highest priority that has clear evidence in current source, and note the runner-up in one line.

## Output format

Use this template (fill every section; keep it short):

```markdown
## Next refactor

**Task:** <one sentence — page or pattern>
**Why now:** <priority # + matching open todo item>
**Canonical target:** `src/routes/[[lang]]/<slug>/+page.svelte` (and/or `src/lib/components/...`)
**Out of scope:** <related files/pages not to touch>

### Steps
1. ...
2. ...
3. ...

### Reuse
- Existing: <components/classes to extend>
- New (only if needed): <name + folder under src/lib/components/>

### Verify
- [ ] `npm run check`
- [ ] `npm run lint`
- [ ] Visual check SV + EN URLs
- [ ] Update matching checkboxes in `todo.md` when done

### Definition of done
- Shared layout/typography/global classes used consistently on the target
- No hardcoded user-facing strings (copy from `data.content` / `siteContent`)
- Behavior preserved (i18n, SEO meta, hreflang, links)
```

## Constraints to bake into the plan

- Preserve behavior: i18n, SEO, hreflang, links, copy from `src/lib/content/site.js`
- No copy hardcoded in components — props/snippets only
- Unify visuals (one treatment per pattern) per `product-design.mdc`
- After success: update `todo.md` checkboxes (call this out in Verify; do not do it during planning)

## After delivering the plan

Stop. Ask whether to execute. Do not start implementation in the same turn unless the user already requested execution.
