import { execFileSync, execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const staged = execSync('git diff --cached --name-only --diff-filter=ACMR', {
	encoding: 'utf8'
})
	.split('\n')
	.map((line) => line.trim())
	.filter((file) => file && existsSync(file));

execSync('npm run format', { stdio: 'inherit' });

if (staged.length > 0) {
	execFileSync('git', ['add', '--', ...staged], { stdio: 'inherit' });
}

execSync('npm run check', { stdio: 'inherit' });
execSync('npm run lint', { stdio: 'inherit' });
