import fs from 'node:fs';
import path from 'node:path';

/**
 * Expected prerendered pages (URL paths).
 * Update this list when a task adds, removes, or renames public URLs:
 * T14 (route-group move / duplicate retirement), T24 (hide experiment/fonts/stats).
 */
const EXPECTED_PAGES = [
	// Canonical Swedish
	'/',
	'/paketering',
	'/konsulttjanster',
	'/kontakt',
	'/om-mandalon',
	'/kunskapsbank',
	'/designguide',
	// Canonical English
	'/en',
	'/en/packaging',
	'/en/consulting',
	'/en/contact',
	'/en/about',
	'/en/knowledge-bank',
	'/en/design-guide',
	// Internal / non-nav — addressed by T24
	'/experiment',
	'/fonts',
	'/stats',
	// Endpoints
	'/sitemap.xml'
];

const PRERENDERED_DIR = path.join(process.cwd(), 'build', 'prerendered');

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
		// experiment + fonts currently ship without <svelte:head> titles (see T24 note).
		const titleOptional = urlPath === '/experiment' || urlPath === '/fonts';
		if (titleOptional) {
			if (titles.length > 1) {
				fail(`${file}: expected at most one <title>, found ${titles.length}`);
			} else if (titles.length === 1 && !titles[0][1].trim()) {
				fail(`${file}: <title> is empty`);
			}
		} else if (titles.length !== 1) {
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
	}

	if (process.exitCode) {
		console.error('check-build: failed');
		return;
	}

	console.log(`check-build: ok (${EXPECTED_PAGES.length} pages)`);
}

main();
