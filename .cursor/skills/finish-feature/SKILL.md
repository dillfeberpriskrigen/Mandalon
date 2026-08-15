---
name: finish-feature
description: >-
  Rebases the current feature branch onto the recorded base, fast-forwards that
  base, and deletes the feature branch. Use only when the user invokes
  /finish-feature. Do not auto-merge or delete branches.
disable-model-invocation: true
---

# Finish a feature branch

Puts the current feature back onto the branch recorded by `/start-feature` (rebase, then fast-forward), deletes the feature branch, and leaves you on the base.

Start with `.cursor/skills/start-feature/SKILL.md`.

## Absolute rules

1. **Only run when the user invoked this skill.** Never merge or delete a feature branch unprompted.
2. **Do not commit.** Invoking finish is not a commit request. If the tree is dirty, stop and ask.
3. **Do not fetch, push, force-push, or delete remote branches.**
4. **No `--force`, `--no-verify`, `rebase --skip` of unresolved commits, or `branch -D`.**
5. **Do not create a merge commit.** Fast-forward only after the rebase.
6. If the rebase hits conflicts, abort and stop. Do not resolve unless the user asks.

## Workflow

Copy this checklist and keep it updated:

```
- [ ] 1. Confirm branch and base
- [ ] 2. Check the working tree
- [ ] 3. Refuse a published feature branch
- [ ] 4. Rebase onto the base
- [ ] 5. Fast-forward the base
- [ ] 6. Delete the feature branch
- [ ] 7. Report
```

### 1. Confirm branch and base

```bash
git branch --show-current
git config --get branch.<current>.feature-base
```

The current branch is the feature. The config value is the base (the branch `/start-feature` started from).

If `feature-base` is unset, ask which branch to merge into and stop. Do not guess from `main`, `develop`, or the reflog.

If the recorded base is not a local branch, stop and report.

### 2. Check the working tree

```bash
git status --porcelain
```

If this is not empty, stop and ask the user to commit or stash first. Do not stash, commit, or discard.

### 3. Refuse a published feature branch

If the feature branch has an upstream, rebase would rewrite published history. Stop and ask:

```bash
git rev-parse --abbrev-ref '@{upstream}'
```

No upstream (command fails) → continue. Has upstream → stop; do not rebase or force-push.

### 4. Rebase onto the base

Still on the feature branch:

```bash
git rebase <base>
```

On conflict:

```bash
git rebase --abort
```

Then report and stop. Leave the feature branch as it was.

### 5. Fast-forward the base

```bash
git switch <base>
git merge --ff-only <feature>
```

If `--ff-only` fails, stop. Do not fall back to a merge commit. Stay on the base; leave the feature branch in place.

### 6. Delete the feature branch

```bash
git branch -d <feature>
git config --remove-section branch.<feature>
```

Use `-d`, never `-D`. If `-d` refuses, stop and report (the merge did not fully contain the feature).

`--remove-section` may fail if git already dropped the section with the branch; that is fine.

Stay on the base branch.

### 7. Report

```
Feature branch: <feature> (deleted)
Merged into: <base>
HEAD: <short hash>
Push: none
```
