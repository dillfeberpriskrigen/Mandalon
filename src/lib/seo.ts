import { defaultLocale, locales, type Locale } from '$lib/content/site';
import { hrefFor, pages, type PageKey } from '$lib/routes';

export const siteUrl = 'https://mandalon.se';

/** Same mark as the footer. Used as Organization `logo` / `image` in JSON-LD. */
export const organizationLogoPath = '/mandalon/logo-vertical.svg';

export function toAbsoluteUrl(path: string): string {
	return path === '/' ? siteUrl : `${siteUrl}${path}`;
}

export function getCanonicalUrl(pageKey: PageKey, locale: Locale): string {
	return toAbsoluteUrl(hrefFor(pageKey, locale));
}

export function ogLocale(locale: Locale): string {
	return locale === 'en' ? 'en_US' : 'sv_SE';
}

export function getAlternateLinks(pageKey: PageKey): { hreflang: string; href: string }[] {
	const links: { hreflang: string; href: string }[] = locales.map((locale) => ({
		hreflang: locale,
		href: toAbsoluteUrl(hrefFor(pageKey, locale))
	}));

	links.push({
		hreflang: 'x-default',
		href: toAbsoluteUrl(hrefFor(pageKey, defaultLocale))
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
