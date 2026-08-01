import type { RequestHandler } from './$types';
import { getSitemapEntries } from '$lib/seo';

export const prerender = true;

function escapeXml(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const GET: RequestHandler = () => {
	const urls = getSitemapEntries()
		.map(
			(entry) => `<url>
	<loc>${escapeXml(entry.url)}</loc>
${entry.alternates
	.map((alternate) => `	<xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`)
	.join('\n')}
</url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
