import { locales, defaultLocale, type Locale } from '$lib/content/site';

function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

export function getLocaleAndPathFromEvent(event: { url: URL }): { locale: Locale | null; path: string } {
	let locale: Locale | null;
	let path: string;

	const segments = event.url.pathname.split('/').filter(Boolean); // remove empty parts

	if (segments.length === 0) {
		// Root page accesed, use default locale
		locale = defaultLocale;
		path = '';
	} else if (isLocale(segments[0])) {
		// The first part of the url is a known locale, use it
		locale = segments[0];
		path = segments[1] ?? ''; // The path is the next segment, assuming only one level pages
	} else if (segments.length === 1) {
		// Only one segment in url, and it was not recognized as a locale. Use default locale and treat it as path
		locale = defaultLocale;
		path = segments[0];
	} else {
		// Unknown locale was given, but the path might be valid, pick the last segment of url
		locale = null;
		path = segments[segments.length - 1];
	}

	return { locale, path };
}
