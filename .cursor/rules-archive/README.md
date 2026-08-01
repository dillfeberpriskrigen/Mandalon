# Archived Cursor rules (architecture review)

Full implementer rule copies archived while active `.cursor/rules/` are slimmed for an objective architectural review.

## Restore after review

This is task **T01** in `docs/review-roadmap.md`, and it runs **before** any implementation work, not after.

1. Copy archived `*.mdc` files back into `.cursor/rules/`, replacing the slimmed `project-overview.mdc` and `product-design.mdc`.
2. Leave `.cursor/rules/architecture-review.mdc` in place. It is now `alwaysApply: false`, so it is dormant and can be invoked deliberately to start another review; deleting it would throw that away.
3. Delete this directory.
4. Do not edit the restored rules' content yet — several of their claims go stale during the roadmap, and T30 updates them all at once.

Active during review: slim `project-overview.mdc`, slim `product-design.mdc`, and `architecture-review.mdc` only. `svelte-components.mdc` and `styling.mdc` are intentionally not loaded, which is exactly why the restore must happen first.
