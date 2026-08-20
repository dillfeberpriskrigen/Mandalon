import type { RequestHandler } from './$types';
import { normalizeAnalyticsPath, shouldSkipPageviewPath } from '$lib/analytics-paths';
import {
	buildEvent,
	countryFromAddress,
	isPageviewBot,
	isPageviewRateLimited,
	pathFromPageviewPayload,
	pathFromSameOriginReferer,
	recordEventLater,
	referrerHostFromPageviewPayload,
	safeClientAddress
} from '$lib/server/analytics';

export const prerender = false;

type PageviewBody = {
	path: string | null;
	referrerHost: string | null;
};

async function readPageviewBody(request: Request, hostname: string): Promise<PageviewBody> {
	try {
		const body = await request.json();
		return {
			path: pathFromPageviewPayload(body),
			referrerHost: referrerHostFromPageviewPayload(body, hostname)
		};
	} catch {
		// Empty body or non-JSON is fine.
	}

	return { path: null, referrerHost: null };
}

export const POST: RequestHandler = async ({ request, url, getClientAddress }) => {
	if (isPageviewBot(request.headers.get('user-agent'))) {
		return new Response(null, { status: 204 });
	}

	const address = safeClientAddress(getClientAddress);
	if (address && isPageviewRateLimited(address)) {
		return new Response(null, { status: 204 });
	}

	const body = await readPageviewBody(request, url.hostname);
	const rawPath = body.path ?? pathFromSameOriginReferer(request.headers.get('referer'), url.origin);
	if (!rawPath) {
		return new Response(null, { status: 204 });
	}

	const path = normalizeAnalyticsPath(rawPath);
	if (shouldSkipPageviewPath(path)) {
		return new Response(null, { status: 204 });
	}

	recordEventLater(
		buildEvent({
			eventType: 'pageview',
			path,
			country: countryFromAddress(address),
			referrerHost: body.referrerHost
		})
	);

	return new Response(null, { status: 204 });
};
