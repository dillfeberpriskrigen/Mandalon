import { redirect, type Handle } from '@sveltejs/kit';
import { legacyRedirectFor } from '$lib/legacy-redirects';
import { hrefFor, pages, type PageKey } from '$lib/routes';

/** Bare English-slug URLs that used to resolve under optional `[[lang]]` — send them to `/en/…`. */
const retiredEnglishSlugRedirects = new Map<string, string>(
	(Object.keys(pages) as PageKey[]).filter((key) => key !== 'home').map((key) => [`/${pages[key].en}`, hrefFor(key, 'en')])
);

function langFromEvent(routeId: string | null, pathname: string): 'en' | 'sv' {
	if (routeId != null) {
		return routeId === '/(site)/en' || routeId.startsWith('/(site)/en/') ? 'en' : 'sv';
	}
	// Unmatched routes have no route.id (error page); keep EN under /en/…
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sv';
}

export const handle: Handle = async ({ event, resolve }) => {
	const retiredTarget = retiredEnglishSlugRedirects.get(event.url.pathname);
	if (retiredTarget) {
		redirect(301, retiredTarget);
	}

	const legacyTarget = legacyRedirectFor(event.url.pathname);
	if (legacyTarget) {
		redirect(301, legacyTarget);
	}

	const lang = langFromEvent(event.route.id, event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
