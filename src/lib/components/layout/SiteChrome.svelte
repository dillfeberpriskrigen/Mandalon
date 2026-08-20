<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type Locale, type LocaleContent } from '$lib/content/site';
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
</script>

<svelte:head>
	<link rel="preload" href="/fonts/RobotoCondensed-VariableFont_wght.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<div class="app-shell">
	<SiteHeader {data} />

	<main class="page-layer">
		{@render children()}
	</main>

	<SiteFooter {data} />
</div>

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
