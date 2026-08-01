<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import { siteContent } from '$lib/content/site';

	const locale = $derived(page.url.pathname === '/en' || page.url.pathname.startsWith('/en/') ? 'en' : 'sv');
	const errorPage = $derived(siteContent[locale].errorPage);
	const homeHref = $derived(locale === 'en' ? '/en' : '/');
	const lead = $derived(page.status === 404 ? errorPage.notFound : (page.error?.message ?? errorPage.generic));
</script>

<svelte:head>
	<title>{errorPage.title}</title>
</svelte:head>

<PageShell>
	<PageHeader title={errorPage.title} {lead} />
	<p class="error-home">
		<Link href={homeHref} weight="bold">{errorPage.homeLabel}</Link>
	</p>
</PageShell>

<style>
	.error-home {
		margin-top: var(--space-large);
	}
</style>
