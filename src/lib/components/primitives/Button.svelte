<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary';

	type Props = {
		children: Snippet;
		variant?: Variant;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		target?: string;
		rel?: string;
	};

	let { children, variant = 'primary', href, type = 'button', target, rel }: Props = $props();
</script>

{#if href}
	<a class={['button', `button-${variant}`]} {href} {target} {rel}>{@render children()}</a>
{:else}
	<button class={['button', `button-${variant}`]} {type}>{@render children()}</button>
{/if}
