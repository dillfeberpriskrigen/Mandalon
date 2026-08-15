import type { Locale } from '$lib/content/types';
import { defaultLocale } from '$lib/content/site';

export const pages = {
	home: '',
	packaging: 'packaging',
	consulting: 'consulting',
	contact: 'contact',
	about: 'about',
	knowledge: 'knowledge-bank',
	designGuide: 'design-guide'
} as const;

export type PageKey = keyof typeof pages;

export const retiredSwedishSlugs = {
	packaging: 'paketering',
	consulting: 'konsulttjanster',
	contact: 'kontakt',
	about: 'om-mandalon',
	knowledge: 'kunskapsbank',
	designGuide: 'designguide'
} as const satisfies Record<Exclude<PageKey, 'home'>, string>;

export function hrefFor(page: PageKey, locale: Locale): string {
	const slug = pages[page];
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
	const localizedPath = normalizedPath.replace(/^en\/?/, '');

	const keys = Object.keys(pages) as PageKey[];
	return keys.find((key) => pages[key] === localizedPath) ?? null;
}
