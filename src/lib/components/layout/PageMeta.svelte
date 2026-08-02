<script lang="ts">
	import type { Meta } from '$lib/content/types';
	import type { Locale } from '$lib/content/site';
	import type { PageKey } from '$lib/routes';
	import { getAlternateLinks, getCanonicalUrl, ogLocale, toAbsoluteUrl } from '$lib/seo';

	interface Props {
		meta: Meta;
		pageKey: PageKey;
		locale: Locale;
		image?: string;
	}

	let { meta, pageKey, locale, image }: Props = $props();

	const canonical = $derived(getCanonicalUrl(pageKey, locale));
	const alternateLinks = $derived(getAlternateLinks(pageKey));
	const imageUrl = $derived(image ? toAbsoluteUrl(image) : undefined);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={ogLocale(locale)} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}

	<meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />

	{#each alternateLinks as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}
</svelte:head>
