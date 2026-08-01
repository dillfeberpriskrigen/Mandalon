# Archived Cursor rules (architecture review)

Full implementer rule copies archived while active `.cursor/rules/` are slimmed for an objective architectural review.

## Restore after review

1. Copy archived `*.mdc` files back into `.cursor/rules/`.
2. Remove `.cursor/rules/architecture-review.mdc`.
3. Replace slimmed `project-overview.mdc` and `product-design.mdc` with the archived versions.

Active during review: slim `project-overview.mdc`, slim `product-design.mdc`, and `architecture-review.mdc` only. `svelte-components.mdc` and `styling.mdc` are intentionally not loaded.
