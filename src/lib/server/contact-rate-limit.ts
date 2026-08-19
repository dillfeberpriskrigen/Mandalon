const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

const hits = new Map<string, number[]>();

export function isContactRateLimited(ip: string): boolean {
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
