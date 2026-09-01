const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

const hits = new Map<string, number[]>();

function recentHits(ip: string, now = Date.now()): number[] {
	const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
	hits.set(ip, recent);
	return recent;
}

export function isContactRateLimited(ip: string): boolean {
	return recentHits(ip).length >= MAX_HITS;
}

export function recordContactHit(ip: string): void {
	const now = Date.now();
	const recent = recentHits(ip, now);
	if (recent.length >= MAX_HITS) {
		return;
	}

	recent.push(now);
	hits.set(ip, recent);
}

/** Fill the window so the next request from this IP is limited. */
export function tripContactRateLimit(ip: string): void {
	const now = Date.now();
	const recent = recentHits(ip, now);
	while (recent.length < MAX_HITS) {
		recent.push(now);
	}
	hits.set(ip, recent);
}
