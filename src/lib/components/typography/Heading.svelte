<script lang="ts">
	import type { Snippet } from 'svelte';

	type HeadingLevel = 'h1' | 'h2' | 'h3';

	interface Props {
		as?: HeadingLevel;
		children: Snippet;
	}

	const classByLevel: Record<HeadingLevel, string> = {
		h1: 'page-title',
		h2: 'page-header',
		h3: 'page-sub-section'
	};

	let { as = 'h2', children }: Props = $props();
</script>

<svelte:element this={as} class={classByLevel[as]}>
	{@render children()}
</svelte:element>
