<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteChrome from '$lib/components/layout/SiteChrome.svelte';
	import type { LayoutData } from './$types';
	import '../app.css';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<SiteChrome {data}>
	{@render children()}
</SiteChrome>
