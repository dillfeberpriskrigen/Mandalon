---
name: implement-review-phase
description: >-
  Executes every unfinished task in one phase of docs/review-roadmap.md in the
  Mandalon SvelteKit repository, verifying and committing after each task. Use
  when the user asks to finish a roadmap phase, run Phase N, continue the
  architecture review by phase, or work through a whole phase overnight.
disable-model-invocation: true
---

# Implement one review roadmap phase

Runs **all unfinished tasks in a single phase** of `docs/review-roadmap.md`, end to end. Each task is still executed with the same discipline as `implement-review-task`: one task at a time, verify fully, mark complete, **then commit**, then move to the next unfinished task in that phase.

For a single task only, use `.cursor/skills/implement-review-task/SKILL.md` instead.

## Absolute rules

1. **One phase per invocation.** Never start a second phase, even if the next phase looks small.
2. **One task at a time within the phase.** Finish, verify, tick, and commit task _N_ before editing anything for task _N+1_.
3. **One commit per task.** After a task is verified and the roadmap checkbox/progress log are updated, commit only that task’s changes (its `Affected files` plus `docs/review-roadmap.md`). Do not batch tasks into one commit.
4. **Never edit a file that is not in the current task's `Affected files` list.** The only exception is `docs/review-roadmap.md` itself, at mark-complete time.
5. **Never tick a checkbox unless every verification step for that task passed.**
6. **Never skip, reorder, or reinterpret verification steps.**
7. **Stop and ask** rather than guess. Guessing is more expensive than asking. Stopping mid-phase is success if a blocker needs the developer.
8. **Do not push, amend, force-push, or use `--no-verify`.** Commits are local only unless the user separately asks to push.
9. **Do not reformat, rename, or "improve" code the current task did not ask about.**

## Phase checklist

Copy this into your first message and keep it updated:

```
Phase: <N or title>
Tasks in scope: <e.g. T06, T07, T08>
- [ ] Phase prerequisites
- [ ] Task loop (per task: select → prereqs → read → implement → verify → mark → commit → report)
- [ ] Phase report
```

Keep a nested todo list for the tasks in the phase (pending → in_progress → completed/cancelled).

## Workflow

### 0. Select the phase

If the user named a phase (`Phase 1`, `Phase 2 — Route registry`), use that one.

Otherwise read `docs/review-roadmap.md` and pick the **first phase** (top to bottom) that still has at least one `- [ ] Complete` task.

List every task in that phase whose checkbox is still `- [ ] Complete`. That list is the scope. Do not pull in tasks from other phases, even as “quick fixes.”

If the phase has **no** unfinished tasks, report that and stop.

### 1. Phase prerequisites

Before the first task:

| Condition                                                          | Action                                                                |
| ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `.cursor/rules/svelte-components.mdc` does not exist               | Only T01 may run; if this phase is not the one containing T01, stop   |
| `git status` shows uncommitted changes unrelated to the first task | Ask whether to proceed                                                |
| Any task in scope is tagged `large`                                | Confirm with the user before starting **that** task; suggest a branch |
| Any task in scope is tagged `optional`                             | Confirm the user still wants it before starting **that** task         |

Do not pre-confirm every `needs-decision` / `needs-copy` task up front — handle those when you reach them (stop the phase there).

### 2. Task loop

For each unfinished task in the phase, **in roadmap order** (do not skip ahead):

#### 2a. Select and gate

- Confirm `Blocked by` IDs are already `- [x] Complete`. If not, stop and report (should not happen inside a well-ordered phase; if it does, the roadmap is wrong).
- If tagged `needs-decision` or `needs-copy`: stop the phase and ask. Leave earlier tasks’ commits intact.
- If tagged `large` or `optional` and not yet confirmed this invocation: confirm, then continue or skip per the user.
- If a step offers an unresolved choice ("either… or…"): stop — the roadmap is defective.

#### 2b. Read → implement → verify → mark

Follow the same steps as `implement-review-task`:

1. Read **every** file in `Affected files` before editing.
2. Implement the task’s `Steps` exactly.
3. Run verification (lint after code changes; skip lint/check for content-only copy; then build/`check:build` when required, then every numbered `Verification` step).
4. Only then tick `- [x] Complete` and append a progress-log row.

Reuse the project conventions and stop conditions from `implement-review-task` (Svelte 5 runes, content in `src/lib/content/`, tokens, LF, no drive-by cleanup, etc.).

**If verification fails twice:** stop the phase. Leave the failed task’s changes uncommitted (or partially committed only if a prior task in this phase already committed cleanly). Do not tick the failed task. Do not start the next task. Do not revert earlier successful commits from this phase.

**Circular verification (same phase):** If task _N_ cannot pass its own verification without task _N+1_’s changes, **stop and ask**. Do not merge two tasks into one commit, and do not edit files outside the current task’s `Affected files` to “make the check pass.”

#### 2c. Commit this task

After mark-complete succeeds:

1. Run `npm run format`.
2. Stage only this task’s `Affected files` and `docs/review-roadmap.md`.
3. Commit with a concise message that states the **why** and ends with the task id, matching recent roadmap commits, e.g.:

```
Introduce a page registry and derive SEO alternates from it (T09).
```

4. Run `git status` and confirm a clean tree (or only unrelated pre-existing files the user already knew about).
5. **Do not push.**

If the commit fails because of a hook, fix the issue and create a **new** commit — never amend unless the user explicitly asks.

#### 2d. Brief per-task report

After each commit, give a short report (can be compact while the phase is still running):

```
Task: T06 — Add a build-output smoke check
Commit: <hash>
Verified: lint, build+check:build, negative rename test
Next in phase: T07
```

Then immediately continue the loop with the next unfinished task in this phase.

### 3. Phase report

When every in-scope task is complete, or when you stop early on a blocker, finish with:

```
Phase: <N — title>
Completed: <T06, T07, …> (commits: <hashes>)
Stopped early: <none | task id + reason + what you need>
Next phase / next task: <…>
```

## Stop conditions (phase)

Stop the phase immediately — without starting the next task — if any of these occur:

- A prerequisite outside this phase is unticked.
- The current task needs a product, design, or copy decision.
- The current task is `large` / `optional` and the user has not confirmed it.
- A step presents an unresolved implementation choice.
- Implementing the current task would require editing outside its `Affected files`.
- Verification fails twice on the current task.
- The repository state contradicts the roadmap.
- Two tasks in the phase appear to require a single combined change set to verify.

Earlier successful task commits in this phase stay as-is.

## Repository quick reference

| Thing                            | Location                                                                   |
| -------------------------------- | -------------------------------------------------------------------------- |
| Roadmap                          | `docs/review-roadmap.md`                                                   |
| Single-task skill                | `.cursor/skills/implement-review-task/SKILL.md`                            |
| Architecture review              | `docs/architecture-review.md`                                              |
| Content (all copy, both locales) | `src/lib/content/`                                                         |
| Route registry (slugs)           | `src/lib/routes.ts` (from T09)                                             |
| Shared components                | `src/lib/components/{layout,typography,primitives,sections,content,data}/` |
| Design tokens                    | `:root` in `src/app.css`                                                   |
| Build smoke check                | `scripts/check-build.mjs` (from T06)                                       |
| Conventions                      | `.cursor/rules/`                                                           |

Swedish is the default locale (`/kontakt`). English is under `/en/` with translated slugs (`/en/contact`).

Until T14 lands, public pages live under `src/routes/(site)/[[lang]]/` with English slug routes in a nested `(en)` group. After T14 they live under `src/routes/(site)/(sv)/` and `src/routes/(site)/en/`.
