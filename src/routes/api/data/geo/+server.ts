import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function inferLocale(pathname: string) {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sv';
}

function getCountry(request: Request) {
	return (
		request.headers.get('x-vercel-ip-country') ||
		request.headers.get('cf-ipcountry') ||
		request.headers.get('fly-country') ||
		request.headers.get('x-country') ||
		null
	);
}

export const POST: RequestHandler = async({ request }) => {
	const body = await request.json().catch(() => ({}));

	const page = typeof body.path === 'string' ? body.path : '/';
	const locale = inferLocale(page);
	const country = getCountry(request);

	console.log('Geo pageview:', {
		timestamp: new Date().toISOString(),
		page,
		locale,
		country
	});

	return json({ ok: true });
}