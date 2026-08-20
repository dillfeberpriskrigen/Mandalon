<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { shouldSkipPageviewPath } from '$lib/analytics-paths';
	import type { Snippet } from 'svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();

	if (browser) {
		afterNavigate(({ to, type }) => {
			if (!to || page.status === 404 || shouldSkipPageviewPath(to.url.pathname)) {
				return;
			}

			let referrerHost: string | undefined;
			let internal = type !== 'enter';
			if (type === 'enter' && document.referrer) {
				try {
					const referrer = new URL(document.referrer);
					if (referrer.origin === window.location.origin) {
						internal = true;
					} else {
						referrerHost = referrer.hostname;
					}
				} catch {
					// Ignore malformed referrers.
				}
			}

			void fetch('/api/pageview', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					path: to.url.pathname,
					...(referrerHost ? { referrerHost } : {}),
					...(internal ? { internal: true } : {})
				}),
				keepalive: true
			}).catch(() => {
				// Pageviews must not interrupt browsing.
			});
		});
	}
</script>

{@render children()}
