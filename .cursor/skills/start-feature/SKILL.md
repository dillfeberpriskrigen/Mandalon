---
name: start-feature
description: >-
  Creates a local feature branch from the current branch, records that branch as
  the merge-back base, then starts implementing the described work. Use only when
  the user invokes /start-feature. Do not auto-create branches.
disable-model-invocation: true
---

# Start a feature branch

Creates a local feature branch from the current branch, records the starting branch as the base for `/finish-feature`, then implements the work described after the command.

Finish later with `.cursor/skills/finish-feature/SKILL.md`.

## Absolute rules

1. **Only run when the user invoked this skill.** Never create a feature branch unprompted.
2. **Do not commit** unless the user separately asks.
3. **Do not push.** Pushes to `develop` / `main` / `test*` deploy.
4. **Do not stash.** If the tree is dirty, stop and ask.
5. **No `--force`, `--no-verify`, or `branch -D`.**
6. Nested starts are allowed: if the current branch is already a feature, that branch becomes the new base.

## Workflow

Copy this checklist and keep it updated:

```
- [ ] 1. Read the work description
- [ ] 2. Check the working tree
- [ ] 3. Name and create the branch
- [ ] 4. Record the base
- [ ] 5. Implement
- [ ] 6. Report
```

### 1. Read the work description

The text after `/start-feature` is the work description (e.g. `/start-feature add contact map`).

If there is no description, ask what to work on and stop. Do not invent a branch or start coding.

### 2. Check the working tree

Run:

```bash
git status --porcelain
git branch --show-current
```

If `git status --porcelain` is not empty, stop and ask. Do not stash, commit, or discard.

### 3. Name and create the branch

Derive a short kebab-case branch name from the description, matching existing names like `fix-404-layout`. No `feature/` prefix. Lowercase, hyphens, keep it under ~40 characters.

If that name already exists, ask for a different name and stop:

```bash
git show-ref --verify --quiet refs/heads/<name>
```

Create and switch:

```bash
git switch -c <name>
```

### 4. Record the base

The base is the branch from step 2 (`git branch --show-current` **before** the switch). Store it on the new branch (local config only, not committed):

```bash
git config branch.<name>.feature-base <starting-branch>
```

### 5. Implement

Implement the described work using the project rules:

- Svelte 5 runes only (`$props()`, `$derived()`, `{@render children()}`)
- User-facing text in `src/lib/content/`; no hardcoded locale strings in pages
- Slugs only in `src/lib/routes.ts`; build hrefs with `hrefFor`
- Design tokens from `app.css`; reuse shared components
- LF line endings

Before treating the work as done:

```bash
npm run format
npm run check
npm run lint
```

If the change touches routing, loaders, layouts, hooks, prerendering, or the document head, also run `npm run build` and `npm run check:build`.

Do not commit. Do not push.

### 6. Report

```
Feature branch: <name>
Base (for /finish-feature): <starting-branch>
Work: <short summary of what was implemented>
Commit/push: none
```
