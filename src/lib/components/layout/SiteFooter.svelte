<script>
	import { localePath } from '$lib/utils/routing';

	const { data } = $props();

	const toPath = (path = '') => localePath(data.locale, data.defaultLocale, path);
</script>

<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-brand">
			<img src="/mandalon/logo-vertical.svg" alt="Mandalon" />
		</div>

		<nav class="footer-nav" aria-label="Footer">
			{#each data.content.footer.nav as link (link.label)}
				<a href={toPath(link.path)}>{link.label}</a>
			{/each}
		</nav>

		<div class="footer-cert">
			<img src="/mandalon/cert.svg" alt="ISO 9001 certification" />
		</div>
	</div>
	<div class="footer-bottom">
		<p>&copy; {new Date().getFullYear()} Mandalon Technologies AB.</p>
	</div>
</footer>

<style>
	.site-footer {
		--container-width: var(--container-width-wide);
		padding: 4rem 0;
		background: transparent;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		gap: 2rem;
		align-items: start;
	}

	.footer-brand img {
		width: 11rem;
	}

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem 1.4rem;
	}

	.footer-nav a {
		font-size: 0.98rem;
		font-weight: 600;
		color: #10231c;
		text-decoration: none;
	}

	.footer-cert {
		display: flex;
		justify-content: flex-end;
	}

	.footer-cert img {
		width: 6.75rem;
		height: auto;
	}
	.footer-bottom {
		text-align: center;
	}

	@media (max-width: 960px) {
		.footer-grid {
			grid-template-columns: 1fr;
			justify-items: start;
		}

		.footer-nav,
		.footer-cert {
			justify-content: flex-start;
		}
	}
</style>
