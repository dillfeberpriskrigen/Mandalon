const ANALYTICS_ENABLED = true;
const EXCLUDED_PATHS = new Set(['/stats']);

function getTrackingEndpoint() {
	return '/api/data/geo';
}

export function getAnalyticsStatsUrl() {
	return '/api/data/stats';
}

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
		headers: {
			'content-type': 'application/json'
		},
		body: payload,
		keepalive: true
	}).catch((error) => {
		console.warn('Analytics pageview failed', error);
	});
}