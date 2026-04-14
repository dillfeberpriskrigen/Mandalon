import { error } from '@sveltejs/kit';
import { defaultLocale, locales, siteContent } from '$lib/content/site';

export function load({ params }) {
	/** @type {'sv' | 'en'} */
	const locale = params.lang === 'en' ? 'en' : defaultLocale;

	if (!locales.includes(locale)) {
		throw error(404, 'Language not found');
	}

	return {
		locale,
		defaultLocale,
		content: siteContent[locale]
	};
}
