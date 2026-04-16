const ANALYTICS_ENABLED = true;
const EXCLUDED_PATHS = new Set(['/stats']);

function getAnalyticsBaseUrl() {
	const configuredBaseUrl = import.meta.env.PUBLIC_ANALYTICS_BASE_URL;

	if (configuredBaseUrl) {
		return configuredBaseUrl;
	}

	if (typeof window !== 'undefined') {
		const { hostname } = window.location;
		if (hostname === 'localhost' || hostname === '127.0.0.1') {
			return 'http://127.0.0.1:8001';
		}
	}

	return '/analytics';
}

function getTrackingEndpoint() {
	return `${getAnalyticsBaseUrl()}/pageview`;
}

function getStatsEndpoint() {
	return `${getAnalyticsBaseUrl()}/stats`;
}

/**
 * Sends a lightweight pageview event without blocking navigation.
 * The server enriches it with timestamp and best-effort geolocation.
 */
export function trackPageView() {
	if (typeof window === 'undefined' || !ANALYTICS_ENABLED) {
		return;
	}

	if (EXCLUDED_PATHS.has(window.location.pathname)) {
		return;
	}

	const payload = JSON.stringify({
		path: window.location.pathname,
		search: window.location.search || null,
		url: window.location.href,
		title: document.title || null,
		referrer: document.referrer || null
	});

	void fetch(getTrackingEndpoint(), {
		method: 'POST',
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		},
		body: payload,
		keepalive: true
	}).catch((error) => {
		console.warn('Analytics pageview failed', error);
	});
}

export function getAnalyticsStatsUrl() {
	return getStatsEndpoint();
}
