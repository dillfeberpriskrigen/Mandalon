import type { Locale } from '$lib/content/types';
import { defaultLocale } from '$lib/content/site';

export const pages = {
	home: { sv: '', en: '' },
	packaging: { sv: 'paketering', en: 'packaging' },
	consulting: { sv: 'konsulttjanster', en: 'consulting' },
	contact: { sv: 'kontakt', en: 'contact' },
	about: { sv: 'om-mandalon', en: 'about' },
	knowledge: { sv: 'kunskapsbank', en: 'knowledge-bank' },
	designGuide: { sv: 'designguide', en: 'design-guide' }
} as const;

export type PageKey = keyof typeof pages;

export function hrefFor(page: PageKey, locale: Locale): string {
	const slug = pages[page][locale];
	if (locale === defaultLocale) {
		return slug ? `/${slug}` : '/';
	}
	return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function localeFromPathname(pathname: string): Locale {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sv';
}

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') {
		return '';
	}
	return pathname.replace(/^\/+|\/+$/g, '');
}

export function pageKeyFromPathname(pathname: string): PageKey | null {
	const normalizedPath = normalizePathname(pathname);
	const locale = localeFromPathname(pathname === '/' ? '/' : `/${normalizedPath}`);
	const localizedPath = locale === 'en' ? normalizedPath.replace(/^en\/?/, '') : normalizedPath;

	const keys = Object.keys(pages) as PageKey[];
	return keys.find((key) => pages[key][locale] === localizedPath) ?? null;
}
