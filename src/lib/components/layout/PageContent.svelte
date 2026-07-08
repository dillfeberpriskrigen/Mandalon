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
		/*background: linear-gradient(hsla(180, 80%, 50%, 10%), hsla(180, 80%, 50%, 100%));*/
		min-height: 100%;
	}

	.narrow {
		max-width: var(--container-width-narrow);
	}

	.wide {
		max-width: var(--container-width-wide);
	}
</style>
