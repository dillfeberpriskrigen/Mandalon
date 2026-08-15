/** Same-origin files that should not be handled as in-app routes. */
const DOWNLOAD_EXT = /\.(?:pdf|zip|docx?|xlsx?|pptx?|csv|txt)(?:[?#]|$)/i;

const NEW_TAB_REL = ['external', 'noopener', 'noreferrer'] as const;

/**
 * True when following `href` leaves the site (absolute http(s), or a downloadable file).
 * Hash, query, mailto, and tel stay in place.
 */
export function opensAwayFromSite(href: string): boolean {
	const value = href.trim();
	if (value === '' || value.startsWith('#') || value.startsWith('?')) {
		return false;
	}

	const protocolMatch = /^([a-z][a-z0-9+.-]*):/i.exec(value);
	if (protocolMatch) {
		const protocol = protocolMatch[1].toLowerCase();
		return protocol === 'http' || protocol === 'https';
	}

	if (value.startsWith('//')) {
		return true;
	}

	const path = value.split(/[?#]/)[0] ?? value;
	return DOWNLOAD_EXT.test(path);
}

export function relForAwayLink(existing?: string): string {
	const tokens = new Set((existing ?? '').split(/\s+/).filter(Boolean));
	for (const token of NEW_TAB_REL) {
		tokens.add(token);
	}
	return [...tokens].join(' ');
}
