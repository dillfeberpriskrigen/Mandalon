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

	const languageOptions = [
		{ locale: 'en' as const, code: 'EN' },
		{ locale: 'sv' as const, code: 'SV' }
	];

	const currentPageKey = $derived(pageKeyFromPathname(page.url.pathname) ?? 'home');
	const otherLocale = $derived(data.locale === 'sv' ? 'en' : 'sv');
	const navLinks = $derived(data.content.primaryLinks.filter((link) => link.page !== 'contact'));
	const contactLink = $derived(data.content.primaryLinks.find((link) => link.page === 'contact'));

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

		<nav class="main-nav" aria-label="Primary navigation">
			{#each navLinks as link (link.label)}
				<a aria-current={isActive(link.page) ? 'page' : undefined} href={hrefFor(link.page, data.locale)}>
					{link.label}
				</a>
			{/each}

			{#if contactLink}
				<a class="contact-link" aria-current={isActive(contactLink.page) ? 'page' : undefined} href={hrefFor(contactLink.page, data.locale)}>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill="currentColor"
							d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.25 1.02l-2.2 2.19Z"
						/>
					</svg>
					{contactLink.label}
				</a>
			{/if}
		</nav>

		<a class="language-switch" href={hrefFor(currentPageKey, otherLocale)} hreflang={otherLocale} aria-label={data.content.languageSwitchLabel}>
			{#each languageOptions as option, i (option.locale)}
				{#if i > 0}
					<span class="language-sep" aria-hidden="true">/</span>
				{/if}
				<span class={['language-code', data.locale === option.locale && 'language-current']} lang={option.locale} aria-hidden="true">
					{option.code}
				</span>
			{/each}
		</a>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		padding: 1rem 0;
		background:
			linear-gradient(45deg, rgba(52, 57, 114, 0.94) 0%, rgba(79, 84, 137, 0.94) 100%),
			url('/mandalon/motherboard-bg.webp') center top / cover no-repeat;
		border-bottom: 1px solid rgba(255, 255, 255, 0.14);
	}

	.header-grid {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		column-gap: 1.2rem;
	}

	.brand {
		margin-inline-end: 1.2rem;
	}

	.brand img {
		width: 148px;
	}

	.main-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem 1.4rem;
	}

	.main-nav > a {
		display: inline-flex;
		align-items: center;
		font-size: 0.98rem;
		font-weight: 600;
		padding: 0.15rem 0;
		color: rgba(255, 255, 255, 0.92);
		text-decoration: none;
	}

	.contact-link {
		gap: 0.4rem;
	}

	.contact-link svg {
		width: 0.9em;
		height: 0.9em;
		flex-shrink: 0;
	}

	.language-switch {
		display: inline-flex;
		align-items: center;
		justify-self: end;
		gap: 0.35rem;
		padding: 0.15rem 0;
		font-size: 0.98rem;
		color: inherit;
		text-decoration: none;
	}

	.language-code {
		color: rgba(255, 255, 255, 0.7);
		font-weight: 600;
	}

	.language-current {
		font-weight: 800;
		color: #fff;
	}

	.language-sep {
		color: rgba(255, 255, 255, 0.45);
		font-weight: 600;
	}

	.main-nav > a[aria-current='page'] {
		font-weight: 800;
		color: var(--accent);
	}

	.main-nav > a:hover {
		color: #fff;
	}

	.language-switch:hover .language-code:not(.language-current) {
		color: #fff;
	}

	.main-nav > a[aria-current='page']:hover {
		color: var(--accent);
	}

	@media (max-width: 640px) {
		.site-header {
			position: static;
			padding: 0.85rem 0 1rem;
		}

		.header-grid {
			grid-template-columns: 1fr auto;
			align-items: center;
			gap: 0.7rem 1rem;
		}

		.brand {
			grid-column: 1;
			grid-row: 1;
			justify-self: start;
			margin-inline-end: 0;
		}

		.brand img {
			width: 128px;
		}

		.main-nav {
			display: grid;
			grid-column: 1 / -1;
			grid-row: 2;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.55rem;
			width: 100%;
		}

		.main-nav > a {
			justify-content: center;
			padding: 0.65rem 0.8rem;
			border-radius: 0.9rem;
			text-align: center;
			background: rgba(255, 255, 255, 0.08);
		}

		.language-switch {
			grid-column: 2;
			grid-row: 1;
			justify-self: end;
			align-self: center;
		}

		.main-nav > a[aria-current='page'] {
			background: color-mix(in srgb, var(--accent) 22%, transparent);
		}
	}

	@media (max-width: 420px) {
		.main-nav {
			grid-template-columns: 1fr;
		}
	}
</style>
