<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		narrow?: boolean;
		wide?: boolean;
	}

	let { children, narrow, wide }: Props = $props();
</script>

<div class:narrow class:wide>
	{@render children()}
</div>

<style>
	div {
		max-width: var(--container-width-default);
		margin: 0 auto;
	}

	.narrow {
		max-width: var(--container-width-narrow);
	}

	.wide {
		max-width: var(--container-width-wide);
	}
</style>
