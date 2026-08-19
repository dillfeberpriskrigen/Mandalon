<script lang="ts">
	import type { Meta } from '$lib/content/types';
	import { siteContent, type Locale } from '$lib/content/site';
	import type { PageKey } from '$lib/routes';
	import { getAlternateLinks, getCanonicalUrl, ogLocale, organizationLogoPath, siteUrl, toAbsoluteUrl } from '$lib/seo';

	interface Props {
		meta: Meta;
		pageKey: PageKey;
		locale: Locale;
		image?: string;
	}

	let { meta, pageKey, locale, image }: Props = $props();

	const canonical = $derived(getCanonicalUrl(pageKey, locale));
	const alternateLinks = $derived(getAlternateLinks(pageKey));
	const imageUrl = $derived(image ? toAbsoluteUrl(image) : undefined);

	const organizationLd = $derived(buildOrganizationLd(locale));
	const localBusinessLd = $derived(pageKey === 'contact' ? buildLocalBusinessLd(locale) : null);
	const organizationScript = $derived(jsonLdScript(organizationLd));
	const localBusinessScript = $derived(localBusinessLd ? jsonLdScript(localBusinessLd) : null);

	function jsonLdScript(data: Record<string, unknown>) {
		return `<script type="application/ld+json">${JSON.stringify(data)}</` + 'script>';
	}

	function buildPostalAddress(locale: Locale) {
		const { street, postalCode, city } = siteContent[locale].contactPage.address;

		return {
			'@type': 'PostalAddress',
			streetAddress: street,
			postalCode,
			addressLocality: city,
			addressCountry: 'SE'
		};
	}

	function organizationBase(locale: Locale) {
		const { contactPage, aboutPage } = siteContent[locale];
		const email = contactPage.email;
		const telephone = contactPage.people.find((person) => person.phoneHref)?.phoneHref?.replace(/^tel:/, '');
		const logoUrl = toAbsoluteUrl(organizationLogoPath);

		return {
			name: contactPage.address.company,
			url: siteUrl,
			email,
			telephone,
			taxID: contactPage.orgNumber,
			logo: logoUrl,
			image: logoUrl,
			address: buildPostalAddress(locale),
			hasCertification: {
				'@type': 'Certification',
				name: aboutPage.certificationTitle,
				description: aboutPage.certification
			}
		};
	}

	function buildOrganizationLd(locale: Locale) {
		return {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			'@id': `${siteUrl}/#organization`,
			...organizationBase(locale)
		};
	}

	function buildLocalBusinessLd(locale: Locale) {
		return {
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			'@id': `${siteUrl}/#localbusiness`,
			...organizationBase(locale),
			parentOrganization: {
				'@id': `${siteUrl}/#organization`
			}
		};
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={ogLocale(locale)} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}

	<meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />

	{#each alternateLinks as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}

	<!-- JSON-LD is built from first-party content strings only. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html organizationScript}
	{#if localBusinessScript}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html localBusinessScript}
	{/if}
</svelte:head>
