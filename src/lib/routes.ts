import type { Locale } from '$lib/content/types';
import { defaultLocale } from '$lib/content/site';

export const pages = {
	home: '',
	packaging: 'packaging',
	consulting: 'consulting',
	contact: 'contact',
	about: 'about',
	knowledge: 'knowledge-bank',
	designGuide: 'design-guide',
	privacy: 'privacy-policy'
} as const;

export type PageKey = keyof typeof pages;

/** Swedish slugs used on this site before the English-slug migration. Pages that never had a Swedish slug are omitted. */
export const retiredSwedishSlugs = {
	packaging: 'paketering',
	consulting: 'konsulttjanster',
	contact: 'kontakt',
	about: 'om-mandalon',
	knowledge: 'kunskapsbank',
	designGuide: 'designguide'
} as const satisfies Partial<Record<Exclude<PageKey, 'home'>, string>>;

export function hrefFor(page: PageKey, locale: Locale, fragment?: string): string {
	const slug = pages[page];
	const path = locale === defaultLocale ? (slug ? `/${slug}` : '/') : slug ? `/${locale}/${slug}` : `/${locale}`;
	return fragment ? `${path}#${fragment}` : path;
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
