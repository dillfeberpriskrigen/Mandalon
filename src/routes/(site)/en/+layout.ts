import type { LayoutLoad } from './$types';
import { defaultLocale, siteContent, type Locale } from '$lib/content/site';

export const load: LayoutLoad = () => ({
	locale: 'en' as Locale,
	defaultLocale,
	content: siteContent.en
});
