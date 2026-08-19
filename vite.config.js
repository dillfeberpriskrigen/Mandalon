import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'node18'
	},
	ssr: {
		external: ['better-sqlite3', 'geoip-country', 'mysql2']
	}
});
