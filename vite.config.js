import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'node18'
	},
	ssr: {
		external: ['sql.js', 'geoip-country', 'mysql2']
	}
});
