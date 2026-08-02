import { defaultLocale, locales, type Locale } from '$lib/content/site';
import { hrefFor, pageKeyFromPathname, pages, type PageKey } from '$lib/routes';

export const siteUrl = 'https://mandalon.se';

export function toAbsoluteUrl(path: string): string {
	return path === '/' ? siteUrl : `${siteUrl}${path}`;
}

export function getAlternateLinks(pathname: string): { hreflang: string; href: string }[] {
	const key = pageKeyFromPathname(pathname);

	if (!key) {
		return [];
	}

	const links: { hreflang: string; href: string }[] = locales.map((locale) => ({
		hreflang: locale,
		href: toAbsoluteUrl(hrefFor(key, locale))
	}));

	links.push({
		hreflang: 'x-default',
		href: toAbsoluteUrl(hrefFor(key, defaultLocale))
	});

	return links;
}

export function getSitemapEntries() {
	const keys = Object.keys(pages) as PageKey[];

	return keys.flatMap((key) =>
		locales.map((locale: Locale) => ({
			url: toAbsoluteUrl(hrefFor(key, locale)),
			alternates: locales.map((alternateLocale) => ({
				hreflang: alternateLocale,
				href: toAbsoluteUrl(hrefFor(key, alternateLocale))
			}))
		}))
	);
}
