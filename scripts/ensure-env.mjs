import fs from 'node:fs';
import path from 'node:path';

const ENV_PATH = path.resolve(process.cwd(), '.env');
const EXAMPLE_PATH = path.resolve(process.cwd(), '.env.example');
const REQUIRED_KEYS = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO'];

/**
 * @param {string} text
 * @returns {Map<string, { line: string, value: string }>}
 */
function parseAssignments(text) {
	/** @type {Map<string, { line: string, value: string }>} */
	const assignments = new Map();

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

		assignments.set(key, { line: trimmed, value });
	}

	return assignments;
}

function fail(message) {
	console.error(`ensure-env: ${message}`);
	process.exit(1);
}

function main() {
	if (!fs.existsSync(EXAMPLE_PATH)) {
		fail(`missing ${EXAMPLE_PATH}`);
	}

	const exampleText = fs.readFileSync(EXAMPLE_PATH, 'utf8');
	const example = parseAssignments(exampleText);
	let created = false;

	if (!fs.existsSync(ENV_PATH)) {
		fs.copyFileSync(EXAMPLE_PATH, ENV_PATH);
		created = true;
		console.log(`ensure-env: created ${ENV_PATH} from .env.example`);
	}

	const envText = fs.readFileSync(ENV_PATH, 'utf8');
	const env = parseAssignments(envText);
	/** @type {string[]} */
	const added = [];

	for (const [key, assignment] of example) {
		if (!env.has(key)) {
			added.push(key);
			env.set(key, assignment);
		}
	}

	if (added.length > 0) {
		const suffix = `${envText.endsWith('\n') || envText.length === 0 ? '' : '\n'}\n# Added from .env.example\n${added
			.map((key) => example.get(key)?.line ?? `${key}=`)
			.join('\n')}\n`;
		fs.appendFileSync(ENV_PATH, suffix);
		console.log(`ensure-env: added missing keys: ${added.join(', ')}`);
	}

	try {
		fs.chmodSync(ENV_PATH, 0o600);
	} catch {
		// chmod is best-effort (Windows local runs still work)
	}

	const missing = REQUIRED_KEYS.filter((key) => !(env.get(key)?.value.trim() ?? ''));
	if (created || missing.length > 0) {
		const hint = missing.length > 0 ? `fill in: ${missing.join(', ')}` : 'fill in the required values';
		fail(`${hint}. Edit ${ENV_PATH} and redeploy.`);
	}

	console.log('ensure-env: ok');
}

main();
