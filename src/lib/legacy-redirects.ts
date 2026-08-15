import { designGuidePdfHref } from '$lib/content/pages/designGuideBody';
import { defaultLocale, locales, type Locale } from '$lib/content/site';
import { hrefFor, retiredSwedishSlugs, type PageKey } from '$lib/routes';

type LegacyPageRedirect = { from: string; to: PageKey; locale: Locale };
type LegacyHrefRedirect = { from: string; href: string };
type LegacyRedirect = LegacyPageRedirect | LegacyHrefRedirect;

const retiredSlugRedirects: ReadonlyArray<LegacyPageRedirect> = (Object.keys(retiredSwedishSlugs) as Array<keyof typeof retiredSwedishSlugs>).flatMap((key) =>
	locales.map((locale) => ({
		from: locale === defaultLocale ? `/${retiredSwedishSlugs[key]}` : `/${locale}/${retiredSwedishSlugs[key]}`,
		to: key,
		locale
	}))
);

/** Old-site paths that no longer exist. Append a row when a new 404 shows up. `from` is the pathname only — no host, no trailing slash. Use `href` for a non-page target such as a PDF. */
const legacyRedirects: ReadonlyArray<LegacyRedirect> = [
	...retiredSlugRedirects,
	{ from: '/hjalp', to: 'knowledge', locale: 'sv' },
	{ from: '/hjalp/asic', to: 'knowledge', locale: 'sv' },
	{ from: '/hjalp/mems', to: 'knowledge', locale: 'sv' },
	{ from: '/hjalp/mikrostrukturer', to: 'knowledge', locale: 'sv' },
	{ from: '/hjalp/sensorer', to: 'knowledge', locale: 'sv' },
	{ from: '/hjalp/vanliga-fragor', to: 'knowledge', locale: 'sv' },
	{ from: '/hjalp/wafer', to: 'knowledge', locale: 'sv' },
	{ from: '/usen/help', to: 'knowledge', locale: 'en' },
	{ from: '/usen/help/asic', to: 'knowledge', locale: 'en' },
	{ from: '/usen/help/mems', to: 'knowledge', locale: 'en' },
	{ from: '/usen/help/mikrostrukturer', to: 'knowledge', locale: 'en' },
	{ from: '/usen/help/sensorer', to: 'knowledge', locale: 'en' },

	{ from: '/chip-sensorer', to: 'packaging', locale: 'sv' },
	{ from: '/chip-sensorer/kapsling-ingjutning', to: 'packaging', locale: 'sv' },
	{ from: '/chip-sensorer/mikroelektronik-montering', to: 'packaging', locale: 'sv' },
	{ from: '/chip-sensorer/tradbondning-paketering', to: 'packaging', locale: 'sv' },
	{ from: '/chip-sensorer/utveckling-prototyper', to: 'packaging', locale: 'sv' },
	{ from: '/usen/chip-sensors', to: 'packaging', locale: 'en' },
	{ from: '/usen/chip-sensors/development-prototypes', to: 'packaging', locale: 'en' },
	{ from: '/usen/chip-sensors/micro-electronics-packaging', to: 'packaging', locale: 'en' },
	{ from: '/usen/chip-sensors/packaging-molding', to: 'packaging', locale: 'en' },
	{ from: '/usen/chip-sensors/wirebonding-packaging', to: 'packaging', locale: 'en' },

	{ from: '/konsulttjanster/designchip-sensorer', to: 'consulting', locale: 'sv' },
	{ from: '/konsulttjanster/ingenjorstjanster', to: 'consulting', locale: 'sv' },
	{ from: '/konsulttjanster/processutveckling', to: 'consulting', locale: 'sv' },
	{ from: '/konsulttjanster/projektledning', to: 'consulting', locale: 'sv' },
	{ from: '/usen/consulting/designing-chip-sensors', to: 'consulting', locale: 'en' },
	{ from: '/usen/consulting/process-development', to: 'consulting', locale: 'en' },
	{ from: '/usen/consulting/project-management', to: 'consulting', locale: 'en' },

	{ from: '/om-mandalon/certifieringar', to: 'about', locale: 'sv' },
	{ from: '/om-mandalon/forskningsprojekt', to: 'about', locale: 'sv' },
	{ from: '/om-mandalon/referenser', to: 'about', locale: 'sv' },
	{ from: '/en/om-mandalon', to: 'about', locale: 'en' },
	{ from: '/usen/about/references', to: 'about', locale: 'en' },
	{ from: '/usen/about/research-projects', to: 'about', locale: 'en' },

	{ from: '/blog/author/per-erik', to: 'about', locale: 'sv' },
	{ from: '/blog/senaste-fran-mandalon/ny-bondmaskin', to: 'home', locale: 'sv' },
	{ from: '/blog/senaste-fran-mandalon/ny-site-lanserad', to: 'home', locale: 'sv' },
	{ from: '/blog/senaste-fran-mandalon/omcertifiering-klar-20-04-17', to: 'about', locale: 'sv' },
	{ from: '/usen/blog/2020/04/22/iso90012015-certificate-renewed', to: 'about', locale: 'en' },
	{ from: '/usen/blog/author/per-erik', to: 'about', locale: 'en' },
	{ from: '/usen/blog/category/latest-news-from-mandalon', to: 'home', locale: 'en' },

	{ from: '/usen', to: 'home', locale: 'en' },

	{ from: '/wp-content/uploads/2019/04/mt-2007-011-dg-issue1_070416.pdf', href: designGuidePdfHref }
];

function normalizeRedirectPath(pathname: string): string {
	if (!pathname || pathname === '/') {
		return '/';
	}
	return `/${pathname.replace(/^\/+|\/+$/g, '')}`;
}

function targetFor(entry: LegacyRedirect): string {
	return 'href' in entry ? entry.href : hrefFor(entry.to, entry.locale);
}

const legacyRedirectTargets = new Map(legacyRedirects.map((entry) => [normalizeRedirectPath(entry.from), targetFor(entry)]));

export function legacyRedirectFor(pathname: string): string | undefined {
	return legacyRedirectTargets.get(normalizeRedirectPath(pathname));
}
