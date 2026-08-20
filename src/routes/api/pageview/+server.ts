import type { RequestHandler } from './$types';
import { normalizeAnalyticsPath, shouldSkipPageviewPath } from '$lib/analytics-paths';
import {
	buildEvent,
	countryFromAddress,
	isPageviewBot,
	isPageviewRateLimited,
	pathFromSameOriginReferer,
	recordEventLater,
	referrerHostFromPageviewPayload,
	safeClientAddress
} from '$lib/server/analytics';

export const prerender = false;

async function readReferrerHost(request: Request, hostname: string): Promise<string | null> {
	try {
		return referrerHostFromPageviewPayload(await request.json(), hostname);
	} catch {
		// Empty body or non-JSON is fine.
	}

	return null;
}

export const POST: RequestHandler = async ({ request, url, getClientAddress }) => {
	if (isPageviewBot(request.headers.get('user-agent'))) {
		return new Response(null, { status: 204 });
	}

	const address = safeClientAddress(getClientAddress);
	if (address && isPageviewRateLimited(address)) {
		return new Response(null, { status: 204 });
	}

	const referredPath = pathFromSameOriginReferer(request.headers.get('referer'), url.origin);
	if (!referredPath) {
		return new Response(null, { status: 204 });
	}

	const path = normalizeAnalyticsPath(referredPath);
	if (shouldSkipPageviewPath(path)) {
		return new Response(null, { status: 204 });
	}

	const referrerHost = await readReferrerHost(request, url.hostname);
	recordEventLater(
		buildEvent({
			eventType: 'pageview',
			path,
			country: countryFromAddress(address),
			referrerHost
		})
	);

	return new Response(null, { status: 204 });
};
