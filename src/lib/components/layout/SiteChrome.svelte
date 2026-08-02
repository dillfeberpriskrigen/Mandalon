<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { type Locale, type LocaleContent } from '$lib/content/site';
	import { getAlternateLinks } from '$lib/seo';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	type ChromeData = {
		locale: Locale;
		defaultLocale: Locale;
		content: LocaleContent;
	};

	interface Props {
		data: ChromeData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	const alternateLinks = $derived(getAlternateLinks(page.url.pathname));
</script>

<div class="app-shell">
	<SiteHeader {data} />

	<main class="page-layer">
		{@render children()}
	</main>

	<SiteFooter {data} />
</div>

<svelte:head>
	<!--
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />
	-->
	{#each alternateLinks as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}
</svelte:head>

<style>
	.app-shell {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.page-layer {
		flex: 1;
	}
</style>
