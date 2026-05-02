import { defaultLocale, locales } from '$lib/content/site';
import { localePath } from '$lib/utils/routing';

export const siteUrl = 'https://mandalon.se';

const localizedRouteEntries = [
	{ sv: '', en: '' },
	{ sv: 'paketering', en: 'packaging' },
	{ sv: 'konsulttjanster', en: 'consulting' },
	{ sv: 'kontakt', en: 'contact' },
	{ sv: 'om-mandalon', en: 'about' },
	{ sv: 'kunskapsbank', en: 'knowledge-bank' },
	{ sv: 'designguide', en: 'design-guide' }
];

function normalizePathname(pathname) {
	if (!pathname || pathname === '/') {
		return '';
	}

	return pathname.replace(/^\/+|\/+$/g, '');
}

function getLocalizedEntry(pathname) {
	const normalizedPath = normalizePathname(pathname);
	const locale = normalizedPath === 'en' || normalizedPath.startsWith('en/') ? 'en' : defaultLocale;
	const localizedPath = locale === 'en' ? normalizedPath.replace(/^en\/?/, '') : normalizedPath;

	return localizedRouteEntries.find((entry) => entry[locale] === localizedPath) ?? null;
}

export function toAbsoluteUrl(path) {
	return path === '/' ? siteUrl : `${siteUrl}${path}`;
}

export function getAlternateLinks(pathname) {
	const entry = getLocalizedEntry(pathname);

	if (!entry) {
		return [];
	}

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
