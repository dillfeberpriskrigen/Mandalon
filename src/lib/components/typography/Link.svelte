<script lang="ts">
	import { opensAwayFromSite, relForAwayLink } from '$lib/links';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Weight = 'thin' | 'normal' | 'bold' | 'boldest';

	interface Props {
		href: string;
		target?: string;
		rel?: string;
		weight?: Weight;
		nowrap?: boolean;
		class?: ClassValue;
		children: Snippet;
	}

	let { href, target, rel, weight = 'normal', nowrap = false, class: className, children }: Props = $props();

	const away = $derived(opensAwayFromSite(href));
	const resolvedTarget = $derived(target ?? (away ? '_blank' : undefined));
	const resolvedRel = $derived(away ? relForAwayLink(rel) : rel);
</script>

<a class={['link', `text-weight-${weight}`, nowrap && 'link-nowrap', className]} {href} target={resolvedTarget} rel={resolvedRel}>{@render children()}</a>
