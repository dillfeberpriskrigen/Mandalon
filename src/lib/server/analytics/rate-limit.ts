const WINDOW_MS = 60 * 1000;
const MAX_HITS = 60;

const hits = new Map<string, number[]>();

export function isPageviewRateLimited(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
	if (recent.length >= MAX_HITS) {
		hits.set(ip, recent);
		return true;
	}

	recent.push(now);
	hits.set(ip, recent);
	return false;
}
