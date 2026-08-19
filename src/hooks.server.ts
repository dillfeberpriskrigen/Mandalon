import { building } from '$app/environment';
import { redirect, type Handle } from '@sveltejs/kit';
import { normalizeAnalyticsPath, shouldSkipNotFoundPath } from '$lib/analytics-paths';
import { legacyRedirectFor } from '$lib/legacy-redirects';
import { localeFromPathname } from '$lib/routes';
import { buildEvent, countryFromAddress, recordEventLater, referrerHostFromHeader, safeClientAddress } from '$lib/server/analytics';

function langFromEvent(langParam: string | undefined, pathname: string): 'en' | 'sv' {
	if (langParam === 'en') {
		return 'en';
	}

	if (langParam != null) {
		return 'sv';
	}

	return localeFromPathname(pathname);
}

function analyticsContext(event: Parameters<Handle>[0]['event']) {
	const path = normalizeAnalyticsPath(event.url.pathname);
	return {
		path,
		country: countryFromAddress(safeClientAddress(event.getClientAddress)),
		referrerHost: referrerHostFromHeader(event.request.headers.get('referer'), event.url.origin)
	};
}

export const handle: Handle = async ({ event, resolve }) => {
	const legacyTarget = legacyRedirectFor(event.url.pathname);
	if (legacyTarget) {
		if (!building) {
			const { path, country, referrerHost } = analyticsContext(event);
			recordEventLater(
				buildEvent({
					eventType: 'redirect',
					path,
					redirectTo: legacyTarget,
					country,
					referrerHost
				})
			);
		}

		redirect(301, legacyTarget);
	}

	const lang = langFromEvent(event.params.lang, event.url.pathname);

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});

	if (!building && response.status === 404 && !shouldSkipNotFoundPath(event.url.pathname)) {
		const { path, country, referrerHost } = analyticsContext(event);
		recordEventLater(
			buildEvent({
				eventType: 'not_found',
				path,
				country,
				referrerHost
			})
		);
	}

	return response;
};
