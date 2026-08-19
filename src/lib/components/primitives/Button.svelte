<script lang="ts">
	import { opensAwayFromSite, relForAwayLink } from '$lib/links';
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary';

	type Props = {
		children: Snippet;
		variant?: Variant;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		target?: string;
		rel?: string;
		disabled?: boolean;
	};

	let { children, variant = 'primary', href, type = 'button', target, rel, disabled = false }: Props = $props();

	const away = $derived(href != null && opensAwayFromSite(href));
	const resolvedTarget = $derived(target ?? (away ? '_blank' : undefined));
	const resolvedRel = $derived(away ? relForAwayLink(rel) : rel);
</script>

{#if href}
	<a class={['button', `button-${variant}`]} {href} target={resolvedTarget} rel={resolvedRel}>{@render children()}</a>
{:else}
	<button class={['button', `button-${variant}`]} {type} {disabled}>{@render children()}</button>
{/if}
