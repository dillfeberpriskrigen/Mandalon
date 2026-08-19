---
name: start-feature
description: >-
  Creates a local feature branch from the current branch, records that branch as
  the merge-back base, then stops and suggests a next step. Does not start
  implementing. Use only when the user invokes /start-feature. Do not
  auto-create branches.
disable-model-invocation: true
---

# Start a feature branch

Creates a local feature branch from the current branch, records the starting branch as the base for `/finish-feature`, then stops. Does not implement anything.

Finish later with `.cursor/skills/finish-feature/SKILL.md`.

## Absolute rules

1. **Only run when the user invoked this skill.** Never create a feature branch unprompted.
2. **Do not implement.** After the branch exists, stop. Do not edit files, run format/check/lint, or start the described work.
3. **Do not commit** unless the user separately asks.
4. **Do not push.** Pushes to `develop` / `main` / `test*` deploy.
5. **Do not stash.** If the tree is dirty, stop and ask.
6. **No `--force`, `--no-verify`, or `branch -D`.**
7. Nested starts are allowed: if the current branch is already a feature, that branch becomes the new base.

## Workflow

Copy this checklist and keep it updated:

```
- [ ] 1. Read the description
- [ ] 2. Check the working tree
- [ ] 3. Name and create the branch
- [ ] 4. Record the base
- [ ] 5. Report and suggest a next step
```

### 1. Read the description

The text after `/start-feature` names the branch (e.g. `/start-feature add contact map`).

If there is no description, ask for a short name and stop. Do not invent a branch.

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

### 5. Report and suggest a next step

Stop here. Do not start the work.

```
Feature branch: <name>
Base (for /finish-feature): <starting-branch>
Commit/push: none
Next: <one concrete next step, then wait>
```

Suggest one next step from the description (what to implement first, or what to clarify). Wait for the user before doing it.
