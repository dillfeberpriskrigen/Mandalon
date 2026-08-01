import { error } from '@sveltejs/kit';
import { defaultLocale, siteContent } from '$lib/content/site';
import { getLocaleAndPathFromEvent } from '$lib/utils/routing.js';

export function load(event) {
	const { locale, path } = getLocaleAndPathFromEvent(event);

	if (path != '') {
		// This means only a single parameter was given, but it didn't match with a locale and thus ends up in the path parameter
		throw error(404, 'Sidan kunde inte hittas');
	}

	return {
		locale,
		defaultLocale,
		content: siteContent[locale ?? defaultLocale]
	};
}
