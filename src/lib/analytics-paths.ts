const MAX_PATH_LENGTH = 512;

export function normalizeAnalyticsPath(pathname: string): string {
	if (!pathname) {
		return '/';
	}

	const trimmed = pathname.split(/[?#]/)[0] ?? pathname;
	if (trimmed === '/') {
		return '/';
	}

	const collapsed = `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
	return collapsed.length > MAX_PATH_LENGTH ? collapsed.slice(0, MAX_PATH_LENGTH) : collapsed;
}

export function shouldSkipPageviewPath(pathname: string): boolean {
	const path = normalizeAnalyticsPath(pathname);
	if (path === '/stats' || path === '/sitemap.xml' || path === '/robots.txt') {
		return true;
	}

	if (path.startsWith('/api/')) {
		return true;
	}

	const last = path.split('/').pop() ?? '';
	return last.includes('.');
}

export function shouldSkipNotFoundPath(pathname: string): boolean {
	const path = normalizeAnalyticsPath(pathname);
	return path === '/api/pageview' || path.startsWith('/_app/');
}
