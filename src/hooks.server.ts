import { redirect, type Handle } from '@sveltejs/kit';
import { legacyRedirectFor } from '$lib/legacy-redirects';
import { localeFromPathname } from '$lib/routes';

function langFromEvent(langParam: string | undefined, pathname: string): 'en' | 'sv' {
	if (langParam === 'en') {
		return 'en';
	}

	if (langParam != null) {
		return 'sv';
	}

	return localeFromPathname(pathname);
}

export const handle: Handle = async ({ event, resolve }) => {
	const legacyTarget = legacyRedirectFor(event.url.pathname);
	if (legacyTarget) {
		redirect(301, legacyTarget);
	}

	const lang = langFromEvent(event.params.lang, event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
