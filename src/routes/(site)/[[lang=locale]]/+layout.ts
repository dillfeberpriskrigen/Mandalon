import type { LayoutLoad } from './$types';
import { defaultLocale, siteContent, type Locale } from '$lib/content/site';

export const load: LayoutLoad = ({ params }) => {
	const locale: Locale = params.lang === 'en' ? 'en' : 'sv';
	return {
		locale,
		defaultLocale,
		content: siteContent[locale]
	};
};
