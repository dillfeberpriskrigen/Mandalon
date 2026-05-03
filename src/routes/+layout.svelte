<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { trackPageView } from '$lib/client/analytics';
	import { getAlternateLinks } from '$lib/seo';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

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
	:global(:root) {
		--container-width-default: 1080px;
		--container-width-wide: 1140px;
		--container-width-narrow: 980px;
		--container-gutter: 2rem;
		--text-width: 54rem;
		--page-title-width: 20ch;
		--page-title-size: clamp(3rem, 8vw, 5.6rem);
		--page-title-line-height: 0.95;
	}

	:global(html, body) {
		min-height: 100%;
	}

	:global(body) {
		margin: 0;
		font-family: 'Roboto', system-ui, sans-serif;
		color: #10231c;
		background: url('/mandalon/motherboard-bg.jpg') center top / cover no-repeat fixed;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Roboto Condensed', 'Roboto', system-ui, sans-serif;
	}

	:global(img) {
		max-width: 100%;
		display: block;
	}

	:global(a) {
		color: inherit;
	}

	:global(.container) {
		width: min(var(--container-width, var(--container-width-default)), calc(100vw - var(--container-gutter)));
		margin: 0 auto;
	}

	:global(.text-width) {
		max-width: var(--text-width);
	}

	:global(.page-title) {
		max-width: var(--page-title-width);
		font-size: var(--page-title-size);
		line-height: var(--page-title-line-height);
	}

	.app-shell {
		min-height: 100vh;
	}

	.page-layer {
		min-height: 100vh;
	}
</style>
