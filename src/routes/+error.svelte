<script lang="ts">
	import { page } from '$app/state';
	import ErrorPage from '$lib/components/layout/ErrorPage.svelte';
	import SiteChrome from '$lib/components/layout/SiteChrome.svelte';
	import { defaultLocale, siteContent } from '$lib/content/site';
	import { localeFromPathname } from '$lib/routes';

	const locale = $derived(localeFromPathname(page.url.pathname));
	const data = $derived({
		locale,
		defaultLocale,
		content: siteContent[locale]
	});
</script>

<SiteChrome {data}>
	<ErrorPage {locale} />
</SiteChrome>
