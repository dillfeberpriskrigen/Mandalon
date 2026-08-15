<script lang="ts">
	import { page } from '$app/state';
	import ErrorPage from '$lib/components/layout/ErrorPage.svelte';
	import { localeFromPathname } from '$lib/routes';
	import type { Locale } from '$lib/content/site';

	const locale = $derived((page.data.locale as Locale | undefined) ?? localeFromPathname(page.url.pathname));
</script>

<ErrorPage {locale} />
