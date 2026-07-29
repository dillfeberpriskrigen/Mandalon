<script lang="ts">
	import type { Snippet } from 'svelte';

	type TextProps = {
		children: Snippet;
		as?: 'span' | 'p' | 'div';
		variant?: 'body' | 'lead' | 'caption' | 'label';
		weight?: 'thin' | 'normal' | 'bold' | 'boldest';
	};

	let { as = 'span', variant = 'body', weight = 'normal', children }: TextProps = $props();
</script>

<svelte:element this={as} class={`text text-${variant} text-weight-${weight}`}>
	{@render children()}
</svelte:element>
