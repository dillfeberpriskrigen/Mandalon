import { siteUrl } from '$lib/seo';

function isBlockedHost(hostname) {
	return hostname === 'develop.mandalon.se' || hostname.endsWith('.develop.mandalon.se');
}

export function GET({ url }) {
	const robotsTxt = isBlockedHost(url.hostname) ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
