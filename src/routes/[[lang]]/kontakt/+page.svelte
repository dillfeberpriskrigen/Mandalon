<script>
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	const { data } = $props();
	const latitude = 58.448268;
	const longitude = 15.826769;
	const delta = 0.012;
	const bbox = [(longitude - delta).toFixed(5), (latitude - delta).toFixed(5), (longitude + delta).toFixed(5), (latitude + delta).toFixed(5)].join('%2C');
	const marker = `${latitude}%2C${longitude}`;
	const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
</script>

<svelte:head>
	<title>{data.content.contactPage.meta.title}</title>
	<meta name="description" content={data.content.contactPage.meta.description} />
</svelte:head>

<PageShell>
	<PageHeader title={data.content.contactPage.title} lead={data.content.contactPage.lead} />

	<div class="people-flow">
		{#each data.content.contactPage.people as person, index (person.name)}
			<MediaArticleSection title={person.name} subtitle={person.role} reverse={index % 2 === 1}>
				{#snippet content()}
					<div class="person-details">
						{#if person.phone}
							<Text as="p">
								<Link href={person.phoneHref}>{person.phone}</Link>
							</Text>
						{/if}
						{#if person.email}
							<Text as="p">
								<Link href={person.emailHref}>{person.email}</Link>
							</Text>
						{/if}
					</div>
				{/snippet}
				{#snippet media()}
					<img src={person.image} alt={person.imageAlt} />
				{/snippet}
			</MediaArticleSection>
		{/each}
	</div>

	<section class="location">
		<PageContent>
			<div class="location-copy">
				<Heading as="h2">{data.content.contactPage.locationTitle}</Heading>
				{#each data.content.contactPage.details as detail (detail.label)}
					<Text as="p">
						<Text as="span" weight="bold">{detail.label}:</Text>
						{#if detail.href}
							<Link href={detail.href}>{detail.value}</Link>
						{:else}
							{detail.value}
						{/if}
					</Text>
				{/each}
			</div>
		</PageContent>

		<div class="map-wrap">
			<iframe title={data.content.contactPage.mapTitle} src={mapEmbedUrl} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</section>
</PageShell>

<style>
	.people-flow {
		margin-top: 2.5rem;
	}

	.people-flow :global(.media img) {
		max-width: 240px;
	}

	.person-details {
		display: grid;
		gap: 0.35rem;
		margin-top: 0.5rem;
	}

	.person-details :global(p + p) {
		margin-top: 0;
	}

	.location {
		display: grid;
		gap: 1rem;
		margin-top: 3rem;
	}

	.location-copy :global(.page-header) {
		margin-bottom: 0.8rem;
	}

	.map-wrap iframe {
		width: 100%;
		height: 26rem;
		border: 0;
		border-radius: var(--border-radius);
	}

	@media (max-width: 900px) {
		.map-wrap iframe {
			height: 20rem;
		}
	}
</style>
