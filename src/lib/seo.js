import { defaultLocale, locales } from '$lib/content/site';
import { localePath } from '$lib/utils/routing';

/** @typedef {{ sv: string, en: string }} LocalizedRouteEntry */

export const siteUrl = 'https://mandalon.se';

/** @type {LocalizedRouteEntry[]} */
const localizedRouteEntries = [
	{ sv: '', en: '' },
	{ sv: 'paketering', en: 'packaging' },
	{ sv: 'konsulttjanster', en: 'consulting' },
	{ sv: 'kontakt', en: 'contact' },
	{ sv: 'om-mandalon', en: 'about' },
	{ sv: 'kunskapsbank', en: 'knowledge-bank' },
	{ sv: 'designguide', en: 'design-guide' }
];

/**
 * @param {string} pathname
 */
function normalizePathname(pathname) {
	if (!pathname || pathname === '/') {
		return '';
	}

	return pathname.replace(/^\/+|\/+$/g, '');
}

/**
 * @param {string} pathname
 * @returns {LocalizedRouteEntry | null}
 */
function getLocalizedEntry(pathname) {
	const normalizedPath = normalizePathname(pathname);
	/** @type {import('$lib/content/site').Locale} */
	const locale = normalizedPath === 'en' || normalizedPath.startsWith('en/') ? 'en' : defaultLocale;
	const localizedPath = locale === 'en' ? normalizedPath.replace(/^en\/?/, '') : normalizedPath;

	return localizedRouteEntries.find((entry) => entry[locale] === localizedPath) ?? null;
}

/**
 * @param {string} path
 */
export function toAbsoluteUrl(path) {
	return path === '/' ? siteUrl : `${siteUrl}${path}`;
}

/**
 * @param {string} pathname
 */
export function getAlternateLinks(pathname) {
	const entry = getLocalizedEntry(pathname);

	if (!entry) {
		return [];
	}

	/** @type {{ hreflang: string, href: string }[]} */
	const links = locales.map((locale) => ({
		hreflang: locale,
		href: toAbsoluteUrl(localePath(locale, defaultLocale, entry[locale]))
	}));

	links.push({
		hreflang: 'x-default',
		href: toAbsoluteUrl(localePath(defaultLocale, defaultLocale, entry[defaultLocale]))
	});

	return links;
}

export function getSitemapEntries() {
	return localizedRouteEntries.flatMap((entry) =>
		locales.map((locale) => ({
			url: toAbsoluteUrl(localePath(locale, defaultLocale, entry[locale])),
			alternates: locales.map((alternateLocale) => ({
				hreflang: alternateLocale,
				href: toAbsoluteUrl(localePath(alternateLocale, defaultLocale, entry[alternateLocale]))
			}))
		}))
	);
}
