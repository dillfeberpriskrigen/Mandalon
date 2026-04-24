import { locales, defaultLocale } from '$lib/content/site';

/**
 * @param {string} locale
 * @param {string} defaultLocale
 * @param {string} [path='']
 */
export function localePath(locale, defaultLocale, path = '') {
	const normalizedPath = path ? `/${path}` : '';
	return locale === defaultLocale ? `/${normalizedPath}`.replace(/\/+/g, '/') : `/${locale}${normalizedPath}`;
}

export function getLocaleAndPathFromEvent(event) {
	let locale = null;
	let path = '';

	const segments = event.url.pathname
		.split('/')
		.filter(Boolean); // remove empty parts

	if (segments.length === 0) {
		// Root page accesed, use default locale
		//console.log("Root page accesed, use default locale")
		locale = defaultLocale;
		path = '';
	}
	else if (locales.includes(segments[0])) {
		// The first part of the url is a known locale, use it
		//console.log("The first part of the url is a known locale, use it")
		locale = segments[0];
		path = segments[1] ?? ''; // The path is the next segment, assuming only one level pages
	}
	else if (segments.length === 1) {
		// Only one segment in url, and it was not recognized as a locale. Use default locale and treat it as path
		//console.log("Only one segment in url, and it was not recognized as a locale. Use default locale and treat it as path")
		locale = defaultLocale;
		path = segments[0];
	}
	else {
		// Unknown locale was given, but the path might be valid, pick the last segment of url
		//console.log("Unknown locale was given, but the path might be valid, pick the last segment of url")
		locale = null;
		path = segments[segments.length - 1];
	}

	return { locale, path };
}
