<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { trackPageView } from '$lib/client/analytics';
	import { getAlternateLinks } from '$lib/seo';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import '../app.css';

	const { data, children } = $props();

	let lastTrackedPath = '';

	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	function trackCurrentPage() {
		// TODO: Fix new tracking implementation
		if (!browser) {
			return;
		}

		const currentPath = `${window.location.pathname}${window.location.search}`;

		if (currentPath === lastTrackedPath) {
			return;
		}

		lastTrackedPath = currentPath;
		trackPageView();
	}

	if (browser) {
		afterNavigate(() => {
			//trackCurrentPage();
		});
	}

	onMount(() => {
		//trackCurrentPage();
	});

	const alternateLinks = $derived(getAlternateLinks(page.url.pathname));
</script>

<div class="app-shell">
	<SiteHeader {data} currentPath={data.path} />

	<div class="page-layer">
		{@render children()}
	</div>

	<SiteFooter {data} />
</div>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />
	{#each alternateLinks as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}
</svelte:head>

<style>
	.app-shell {
		min-height: 100vh;
	}

	.page-layer {
		min-height: 100vh;
	}
</style>
