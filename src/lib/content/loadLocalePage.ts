import { error } from '@sveltejs/kit';
import { defaultLocale, locales, siteContent, type Locale } from '$lib/content/site';

export function loadLocalePage(params: { lang?: string }) {
	const locale: Locale = params.lang === 'en' ? 'en' : defaultLocale;

	if (!locales.includes(locale)) {
		throw error(404, 'Language not found');
	}

	return {
		locale,
		defaultLocale,
		content: siteContent[locale]
	};
}
