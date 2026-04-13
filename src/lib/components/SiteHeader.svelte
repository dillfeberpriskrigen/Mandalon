<script>
	import { localePath } from '$lib/utils/routing';

	const { data, currentPath = '' } = $props();

	const toPath = (path = '') => localePath(data.locale, data.defaultLocale, path);
	const getSwitchPath = () =>
		data.locale === 'sv'
			? localePath('en', data.defaultLocale, currentPath)
			: localePath('sv', data.defaultLocale, currentPath);

	/** @param {string} path */
	const isActive = (path) => {
		if (!path) return currentPath === '';
		return currentPath === path;
	};
</script>

<header class="site-header">
	<div class="container header-grid">
		<a class="brand" href={toPath()} aria-label="Mandalon home">
			<img src="/mandalon/logo-vertical.svg" alt="Mandalon" />
		</a>

		<div class="nav-stack">
			<nav class="top-nav" aria-label="Secondary navigation">
				{#each data.content.topLinks as link}
					<a class:active={isActive(link.path)} href={toPath(link.path)}>{link.label}</a>
				{/each}
				<a class="language-switch" href={getSwitchPath()}>{data.content.switchLabel}</a>
			</nav>

			<nav class="main-nav" aria-label="Primary navigation">
				{#each data.content.primaryLinks as link}
					<a class:active={isActive(link.path)} href={toPath(link.path)}>{link.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</header>

<style>
	.container {
		width: min(1140px, calc(100vw - 2rem));
		margin: 0 auto;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		padding: 1rem 0;
		background:
			linear-gradient(45deg, rgba(52, 57, 114, 0.94) 0%, rgba(79, 84, 137, 0.94) 100%),
			url('/mandalon/motherboard-bg.jpg') center top / cover no-repeat;
		border-bottom: 1px solid rgba(255, 255, 255, 0.14);
	}

	.header-grid {
		display: grid;
		grid-template-columns: 180px 1fr;
		align-items: center;
		gap: 1.5rem;
	}

	.brand img {
		width: 148px;
		filter: invert(1);
	}

	.nav-stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9rem;
	}

	.top-nav,
	.main-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.4rem;
	}

	.top-nav a {
		font-size: 0.84rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
	}

	.main-nav a {
		font-size: 0.98rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.92);
		text-decoration: none;
	}

	.language-switch,
	.top-nav a.active,
	.main-nav a.active {
		font-weight: 800;
		color: #fff;
	}

	.top-nav a:hover,
	.main-nav a:hover {
		color: #fff;
	}

	@media (max-width: 960px) {
		.header-grid {
			grid-template-columns: 1fr;
		}

		.nav-stack {
			align-items: flex-start;
		}
	}

	@media (max-width: 640px) {
		.site-header {
			position: static;
		}

		.brand img {
			width: 128px;
		}
	}
</style>
