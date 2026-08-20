import { localeFromPathname } from '$lib/routes';
import { isPageviewBot } from './bots';
import { recordEvent, recordEventLater, getSummary } from './db';
import { countryFromAddress } from './geo';
import { isPageviewRateLimited } from './rate-limit';
import { INTERNAL_REFERRER_HOST, type AnalyticsEventInput } from './types';

export type { AnalyticsSummary } from './types';
export { INTERNAL_REFERRER_HOST };
export { recordEvent, recordEventLater, getSummary };
export { countryFromAddress };
export { isPageviewBot };
export { isPageviewRateLimited };

const HOST_PATTERN = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

export function localeForAnalyticsPath(pathname: string): 'sv' | 'en' {
	return localeFromPathname(pathname);
}

export function parseReferrerHost(value: unknown, siteHostname: string): string | null {
	if (typeof value !== 'string') {
		return null;
	}

	const host = value.trim().toLowerCase();
	if (!host || host.length > 255 || !HOST_PATTERN.test(host)) {
		return null;
	}

	const site = siteHostname.replace(/^www\./i, '').toLowerCase();
	const candidate = host.replace(/^www\./, '');
	if (candidate === site) {
		return INTERNAL_REFERRER_HOST;
	}

	return host;
}

export function referrerHostFromPageviewPayload(body: unknown, siteHostname: string): string | null {
	if (!body || typeof body !== 'object') {
		return null;
	}

	const payload = body as { internal?: unknown; referrerHost?: unknown };
	if (payload.internal === true) {
		return INTERNAL_REFERRER_HOST;
	}

	if ('referrerHost' in payload) {
		return parseReferrerHost(payload.referrerHost, siteHostname);
	}

	return null;
}

export function referrerHostFromHeader(refererHeader: string | null, origin: string): string | null {
	if (!refererHeader) {
		return null;
	}

	try {
		const url = new URL(refererHeader);
		if (url.origin === origin) {
			return null;
		}

		return parseReferrerHost(url.hostname, new URL(origin).hostname);
	} catch {
		return null;
	}
}

export function pathFromSameOriginReferer(refererHeader: string | null, origin: string): string | null {
	if (!refererHeader) {
		return null;
	}

	try {
		const url = new URL(refererHeader);
		if (url.origin !== origin) {
			return null;
		}

		return url.pathname;
	} catch {
		return null;
	}
}

export function safeClientAddress(getClientAddress: () => string): string | undefined {
	try {
		const value = getClientAddress().trim();
		return value || undefined;
	} catch {
		return undefined;
	}
}

export function buildEvent(input: Omit<AnalyticsEventInput, 'locale'> & { path: string }): AnalyticsEventInput {
	return {
		...input,
		locale: localeForAnalyticsPath(input.path)
	};
}
