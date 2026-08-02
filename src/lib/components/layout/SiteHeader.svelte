<script lang="ts">
	import { page } from '$app/state';
	import { type Locale, type LocaleContent } from '$lib/content/site';
	import { hrefFor, pageKeyFromPathname } from '$lib/routes';

	type HeaderData = {
		locale: Locale;
		defaultLocale: Locale;
		content: LocaleContent;
	};

	interface Props {
		data: HeaderData;
	}

	let { data }: Props = $props();

	const getSwitchPath = () => {
		const otherLocale: Locale = data.locale === 'sv' ? 'en' : 'sv';
		const key = pageKeyFromPathname(page.url.pathname);
		return key ? hrefFor(key, otherLocale) : hrefFor('home', otherLocale);
	};

	const isActive = (pageKey: string) => {
		const current = pageKeyFromPathname(page.url.pathname);
		return current === pageKey;
	};
</script>

<header class="site-header">
	<div class="container header-grid">
		<a class="brand" href={hrefFor('home', data.locale)} aria-label="Mandalon home">
			<img src="/mandalon/mandalon-logo-white.svg" alt="Mandalon" />
		</a>

		<div class="nav-stack">
			<nav class="main-nav" aria-label="Primary navigation">
				{#each data.content.primaryLinks as link (link.label)}
					<a class:active={isActive(link.page)} class:contact-link={link.page === 'contact'} href={hrefFor(link.page, data.locale)}>
						{link.label}
					</a>
				{/each}
				<a class="language-switch" href={getSwitchPath()}>{data.content.switchLabel}</a>
			</nav>
		</div>
	</div>
</header>

<style>
	.site-header {
		--container-width: var(--container-width-wide);
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
		grid-template-columns: max-content max-content;
		justify-content: center;
		align-items: center;
		gap: 1rem 1.2rem;
	}

	.brand img {
		width: 148px;
	}

	.nav-stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9rem;
	}

	.main-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem 1.4rem;
	}

	.main-nav a {
		display: inline-flex;
		align-items: center;
		font-size: 0.98rem;
		font-weight: 600;
		padding: 0.15rem 0;
		color: rgba(255, 255, 255, 0.92);
		text-decoration: none;
	}

	.main-nav a.contact-link {
		padding: 0.55rem 0.95rem;
		border-radius: 999px;
		background: #e97d2f;
		color: #fff6ec;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
	}

	.language-switch,
	.main-nav a.active {
		font-weight: 800;
		color: #fff;
	}

	.main-nav a:hover {
		color: #fff;
	}

	.main-nav a.contact-link:hover,
	.main-nav a.contact-link.active {
		background: #ef8d44;
		color: #fff;
	}

	@media (max-width: 960px) {
		.header-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.nav-stack {
			align-items: stretch;
		}

		.main-nav {
			justify-content: flex-start;
		}
	}

	@media (max-width: 640px) {
		.site-header {
			position: static;
			padding: 0.85rem 0 1rem;
		}

		.brand {
			justify-self: center;
		}

		.brand img {
			width: 128px;
		}

		.nav-stack {
			width: 100%;
			gap: 0.7rem;
		}

		.main-nav {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.55rem;
			width: 100%;
		}

		.main-nav a {
			justify-content: center;
			padding: 0.65rem 0.8rem;
			border-radius: 0.9rem;
			text-align: center;
			background: rgba(255, 255, 255, 0.08);
		}

		.main-nav a.contact-link {
			padding: 0.65rem 0.8rem;
		}
	}

	@media (max-width: 420px) {
		.main-nav {
			grid-template-columns: 1fr;
		}
	}
</style>
