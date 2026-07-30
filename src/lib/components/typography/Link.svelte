<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		target?: string;
		rel?: string;
		children: Snippet;
	}

	let { href, target, rel, children }: Props = $props();
</script>

<a class="link" {href} {target} {rel}>{@render children()}</a>
