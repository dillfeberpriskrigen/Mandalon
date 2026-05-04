import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';

function normalizeText(value: unknown, maxLength: number) {
	if (typeof value !== 'string') return null;

	const trimmed = value.trim();
	if (!trimmed) return null;

	return trimmed.slice(0, maxLength);
}

function normalizePath(value: unknown) {
	const path = normalizeText(value, 512);

	if (!path || !path.startsWith('/')) {
		return '/';
	}

	return path;
}

function inferLocale(pathname: string) {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sv';
}

function getGeo(request: Request) {
	const country =
		request.headers.get('x-vercel-ip-country') ||
		request.headers.get('cf-ipcountry') ||
		request.headers.get('fly-country') ||
		request.headers.get('x-country') ||
		null;

	const region =
		request.headers.get('x-vercel-ip-country-region') ||
		request.headers.get('x-region') ||
		request.headers.get('fly-region') ||
		null;

	const city =
		request.headers.get('x-vercel-ip-city') ||
		request.headers.get('x-city') ||
		request.headers.get('fly-city') ||
		null;

	let source: string | null = null; // Behöver bara finnas tills vi vet vilken av dem det är som ger headers. Eller? Det kanske är bra medfallbacks
//Det kan väl ändå inte spela någon roll om det ligger kvar? Land + våran host ger väl ingen extra information över land? Iofs behöver inte source finnas alls utöver debugging för headers
	if (request.headers.get('x-vercel-ip-country') || request.headers.get('x-vercel-ip-city')) {
		source = 'vercel';
	} else if (request.headers.get('cf-ipcountry')) {
		source = 'cloudflare';
	} else if (request.headers.get('fly-country') || request.headers.get('fly-city')) {
		source = 'fly';
	} else if (country || region || city) {
		source = 'proxy-header';
	}

	return {
		country,
		region,
		city,
		source
	};
}

export async function POST({ request }) {
	const body = await request.json().catch(() => ({}));

	const path = normalizePath(body.path);
	const search = normalizeText(body.search, 512);
	const url = normalizeText(body.url, 2048) || path;
	const title = normalizeText(body.title, 300);
	const referrer = normalizeText(body.referrer, 2048);
	const locale = inferLocale(path);
	const geo = getGeo(request);

	await db.execute(
		`
		INSERT INTO pageviews (
			occurred_at,
			path,
			query_string,
			url,
			page_title,
			referrer,
			locale,
			geo_country,
			geo_region,
			geo_city,
			geo_source
		)
		VALUES (
			UTC_TIMESTAMP(6),
			?, ?, ?, ?, ?, ?, ?, ?, ?, ?
		)
		`,
		[
			path,
			search,
			url,
			title,
			referrer,
			locale,
			geo.country,
			geo.region,
			geo.city,
			geo.source
		]
	);

	return json({ ok: true });
}