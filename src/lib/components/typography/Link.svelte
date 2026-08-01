<script lang="ts">
	import type { Snippet } from 'svelte';

	type Weight = 'thin' | 'normal' | 'bold' | 'boldest';

	interface Props {
		href: string;
		target?: string;
		rel?: string;
		weight?: Weight;
		/** When false, removes underline (e.g. callout CTAs). */
		underline?: boolean;
		nowrap?: boolean;
		children: Snippet;
	}

	let { href, target, rel, weight = 'normal', underline = true, nowrap = false, children }: Props = $props();
</script>

<a class={['link', `text-weight-${weight}`, !underline && 'link-plain', nowrap && 'link-nowrap']} {href} {target} {rel}>{@render children()}</a>
