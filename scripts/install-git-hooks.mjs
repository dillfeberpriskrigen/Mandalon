import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (process.env.CI || process.env.HUSKY === '0') {
	process.exit(0);
}

if (!existsSync('.git')) {
	process.exit(0);
}

execSync('git config core.hooksPath .githooks');
