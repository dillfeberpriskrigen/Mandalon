<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { Locale, LocaleContent } from '$lib/content/site';
	import { hrefFor } from '$lib/routes';

	type FooterData = {
		locale: Locale;
		defaultLocale: Locale;
		content: LocaleContent;
	};

	interface Props {
		data: FooterData;
	}

	let { data }: Props = $props();

	const contact = $derived(data.content.contactPage);
	const address = $derived(contact.address);
	const sitemapHeadingId = $props.id();
	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-start">
			<a class="footer-brand" href={hrefFor('home', data.locale)}>
				<img src="/mandalon/logo-vertical.svg" alt="Mandalon" />
			</a>

			<address class="footer-contact">
				<Text as="div" weight="bold">{address.company}</Text>
				<Text as="div" variant="caption">{address.street}</Text>
				<Text as="div" variant="caption">{address.postalCode} {address.city}</Text>
				{#if address.country}
					<Text as="div" variant="caption">{address.country}</Text>
				{/if}
				<div class="footer-contact-meta">
					<Text as="div" variant="caption">{contact.orgNumberLabel} {contact.orgNumber}</Text>
					<Link href={contact.emailHref}>{contact.email}</Link>
				</div>
			</address>
		</div>

		<nav class="footer-nav" aria-labelledby={sitemapHeadingId}>
			<Heading as="h3" id={sitemapHeadingId}>{data.content.footer.navTitle}</Heading>
			<ul>
				{#each data.content.footer.nav as link (link.page)}
					<li>
						<a href={hrefFor(link.page, data.locale)}>{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="footer-cert">
			<Text variant="caption">{data.content.footer.certificationLabel}</Text>
			<img src="/mandalon/cert.svg" alt="" aria-hidden="true" />
		</div>
	</div>
	<div class="container footer-bottom">
		<Text as="p" variant="caption">&copy; {year} Mandalon Technologies AB.</Text>
	</div>
</footer>

<style>
	.site-footer {
		--container-width: var(--container-width-wide);
		padding: var(--space-large) 0;
		background: var(--surface);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: var(--space-large);
		align-items: start;
	}

	.footer-start {
		display: flex;
		align-items: start;
		gap: var(--space-large);
		justify-self: start;
	}

	.footer-brand {
		display: inline-block;
		text-decoration: none;
	}

	.footer-brand img {
		display: block;
		width: 14rem;
	}

	.footer-contact {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex-shrink: 0;
		gap: 0.15rem;
		font-style: normal;
		white-space: nowrap;
	}

	.footer-contact-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.15rem;
		margin-top: var(--space-small);
	}

	.footer-nav {
		justify-self: end;
	}

	.footer-nav :global(.page-sub-section) {
		margin-bottom: var(--space-small);
	}

	.footer-nav ul {
		display: grid;
		grid-template-columns: auto auto;
		column-gap: var(--space-large);
		row-gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.footer-nav a {
		font-family: var(--font-body);
		font-size: var(--text-caption-size);
		font-weight: var(--weight-normal);
		line-height: var(--text-caption-line);
		color: var(--ink);
		text-decoration: none;
	}

	.footer-nav a:hover,
	.footer-nav a:focus-visible {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.footer-cert {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-small);
		text-align: right;
		justify-self: end;
	}

	.footer-cert img {
		width: 10rem;
		height: auto;
	}

	.footer-bottom {
		margin-top: var(--space-large);
		padding-top: var(--space-medium);
		border-top: 1px solid var(--line);
	}

	@media (max-width: 900px) {
		.footer-grid {
			grid-template-columns: 1fr;
			grid-template-areas:
				'nav'
				'contact'
				'cert'
				'brand';
		}

		.footer-start {
			display: contents;
		}

		.footer-nav {
			grid-area: nav;
			justify-self: start;
		}

		.footer-contact {
			grid-area: contact;
		}

		.footer-cert {
			grid-area: cert;
			justify-self: start;
			align-items: flex-start;
			text-align: left;
		}

		.footer-brand {
			grid-area: brand;
		}
	}
</style>
