import fs from 'node:fs';
import path from 'node:path';

/**
 * Expected prerendered pages (URL paths).
 * Update this list when a task adds, removes, or renames public URLs.
 * `/contact`, `/en/contact` and `/stats` are SSR and are not prerendered.
 */
const EXPECTED_PAGES = [
	// Canonical Swedish (English slugs, no prefix)
	'/',
	'/packaging',
	'/consulting',
	'/about',
	'/design-guide',
	'/privacy-policy',
	// Canonical English
	'/en',
	'/en/packaging',
	'/en/consulting',
	'/en/about',
	'/en/design-guide',
	'/en/privacy-policy',
	// Endpoints
	'/sitemap.xml'
];

const PRERENDERED_DIR = path.join(process.cwd(), 'build', 'prerendered');
const SITE_URL = 'https://mandalon.se';

/** @param {string} urlPath */
function urlPathToFile(urlPath) {
	if (urlPath === '/') return 'index.html';
	if (urlPath === '/sitemap.xml') return 'sitemap.xml';
	return `${urlPath.replace(/^\//, '')}.html`;
}

/** @param {string} urlPath */
function expectedLang(urlPath) {
	return urlPath === '/en' || urlPath.startsWith('/en/') ? 'en' : 'sv';
}

/** @param {string} urlPath */
function expectedCanonical(urlPath) {
	return urlPath === '/' ? SITE_URL : `${SITE_URL}${urlPath}`;
}

/**
 * @param {string} dir
 * @param {string} [relative='']
 * @returns {string[]}
 */
function listPageFiles(dir, relative = '') {
	/** @type {string[]} */
	const files = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.name.endsWith('.br') || entry.name.endsWith('.gz')) continue;
		const rel = relative ? `${relative}/${entry.name}` : entry.name;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...listPageFiles(full, rel));
			continue;
		}
		if (entry.name.endsWith('.html') || entry.name === 'sitemap.xml') {
			files.push(rel.replace(/\\/g, '/'));
		}
	}
	return files;
}

/** @param {string} message */
function fail(message) {
	console.error(`check-build: ${message}`);
	process.exitCode = 1;
}

function main() {
	if (!fs.existsSync(PRERENDERED_DIR)) {
		fail(`missing directory ${PRERENDERED_DIR} — run npm run build first`);
		return;
	}

	const expectedFiles = new Set(EXPECTED_PAGES.map(urlPathToFile));
	const actualFiles = new Set(listPageFiles(PRERENDERED_DIR));

	for (const file of expectedFiles) {
		if (!actualFiles.has(file)) {
			fail(`missing expected page file: ${file}`);
		}
	}

	for (const file of actualFiles) {
		if (!expectedFiles.has(file)) {
			fail(`unexpected page file: ${file}`);
		}
	}

	for (const urlPath of EXPECTED_PAGES) {
		const file = urlPathToFile(urlPath);
		const fullPath = path.join(PRERENDERED_DIR, file);
		if (!fs.existsSync(fullPath)) continue;

		const html = fs.readFileSync(fullPath, 'utf8');

		if (html.includes('%lang%')) {
			fail(`${file}: unreplaced %lang% placeholder`);
		}

		if (urlPath === '/sitemap.xml') {
			continue;
		}

		const titles = [...html.matchAll(/<title>([^<]*)<\/title>/gi)];
		if (titles.length !== 1) {
			fail(`${file}: expected exactly one <title>, found ${titles.length}`);
		} else if (!titles[0][1].trim()) {
			fail(`${file}: <title> is empty`);
		}

		const langMatch = html.match(/<html[^>]*\slang=["']([^"']+)["']/i);
		if (!langMatch) {
			fail(`${file}: missing <html lang="…">`);
		} else {
			const expected = expectedLang(urlPath);
			if (langMatch[1] !== expected) {
				fail(`${file}: expected lang="${expected}", found lang="${langMatch[1]}"`);
			}
		}

		const canonicals = [...html.matchAll(/<link[^>]*\srel=["']canonical["'][^>]*>/gi)];
		if (canonicals.length !== 1) {
			fail(`${file}: expected exactly one rel="canonical", found ${canonicals.length}`);
		} else {
			const hrefMatch = canonicals[0][0].match(/\shref=["']([^"']+)["']/i);
			const expected = expectedCanonical(urlPath);
			if (!hrefMatch) {
				fail(`${file}: canonical link missing href`);
			} else if (hrefMatch[1] !== expected) {
				fail(`${file}: expected canonical "${expected}", found "${hrefMatch[1]}"`);
			}
		}
	}

	if (process.exitCode) {
		console.error('check-build: failed');
		return;
	}

	console.log(`check-build: ok (${EXPECTED_PAGES.length} pages)`);
}

main();
