<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import { siteContent, type Locale } from '$lib/content/site';
	import { hrefFor } from '$lib/routes';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();

	const errorPage = $derived(siteContent[locale].errorPage);
	const homeHref = $derived(hrefFor('home', locale));
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
