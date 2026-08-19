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
	await import('./build/index.js');
}

main();
