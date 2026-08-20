function loadEnv(fs, filePath) {
	if (!fs.existsSync(filePath)) {
		return;
	}

	const text = fs.readFileSync(filePath, 'utf8');
	for (const rawLine of text.split(/\r?\n/)) {
		const trimmed = rawLine.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}

		const eq = trimmed.indexOf('=');
		if (eq <= 0) {
			continue;
		}

		const key = trimmed.slice(0, eq).trim();
		let value = trimmed.slice(eq + 1).trim();
		if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1);
		}

		if (process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}

async function main() {
	const fs = await import('node:fs');
	const path = await import('node:path');
	loadEnv(fs, path.join(__dirname, '.env'));
	const { handler } = await import('./build/handler.js');
	const http = await import('node:http');

	// Static files are served by sirv before SvelteKit hooks, with Cache-Control: no-cache.
	// Set a long max-age first so sirv copies it onto the response (PageSpeed cache lifetimes).
	function cacheControlFor(pathname) {
		if (pathname.startsWith('/_app/immutable/')) {
			return 'public, max-age=31536000, immutable';
		}

		if (pathname.startsWith('/fonts/') || pathname.startsWith('/mandalon/') || pathname === '/favicon.png') {
			return 'public, max-age=31536000';
		}

		return null;
	}

	const server = http.createServer((req, res) => {
		try {
			const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
			const cacheControl = cacheControlFor(pathname);
			if (cacheControl) {
				res.setHeader('Cache-Control', cacheControl);
			}
		} catch {
			// Malformed URLs still go through the SvelteKit handler.
		}

		handler(req, res);
	});

	const port = process.env.PORT || '3000';
	const host = process.env.HOST || '0.0.0.0';
	server.listen({ host, port: Number(port) || port });
}

main();
