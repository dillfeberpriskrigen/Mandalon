<script lang="ts">
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { on } from 'svelte/events';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let mapActive = $state(false);
	const latitude = 58.448268;
	const longitude = 15.826769;
	const delta = 0.012;
	const bbox = [(longitude - delta).toFixed(5), (latitude - delta).toFixed(5), (longitude + delta).toFixed(5), (latitude + delta).toFixed(5)].join('%2C');
	const marker = `${latitude}%2C${longitude}`;
	const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

	const disableMapOnLeave = (node: HTMLElement) => on(node, 'pointerleave', () => (mapActive = false));
</script>

<PageMeta meta={data.content.contactPage.meta} pageKey="contact" locale={data.locale} />

<PageShell>
	<PageHeader title={data.content.contactPage.title} lead={data.content.contactPage.lead} />

	<div class="inbox">
		<PageContent>
			<div class="inbox-copy">
				<div class="email-fact">
					<Text variant="label">{data.content.contactPage.emailLabel}</Text>
					<Link href={data.content.contactPage.emailHref}>{data.content.contactPage.email}</Link>
				</div>
				<Text as="p">{data.content.contactPage.urgentNote}</Text>
			</div>
		</PageContent>
	</div>

	<div class="people">
		{#each data.content.contactPage.people as person (person.name)}
			<Surface as="article" radius="large" padding="medium" shadow="medium">
				<div class="person">
					{#if person.image}
						<div class="person-photo">
							<Image src={person.image.src} alt={person.image.alt} width={person.image.width} height={person.image.height} />
						</div>
					{/if}
					<div class="person-copy">
						<Heading as="h2">{person.name}</Heading>
						{#if person.role}
							<Text as="p">{person.role}</Text>
						{/if}
						{#if person.phone && person.phoneHref}
							<Link href={person.phoneHref}>{person.phone}</Link>
						{/if}
						<Text as="p">{person.reason}</Text>
						{#if person.bio}
							<Text as="p">{person.bio}</Text>
						{/if}
					</div>
				</div>
			</Surface>
		{/each}
	</div>

	<section class="location">
		<PageContent>
			<div class="location-copy">
				<Heading as="h2">{data.content.contactPage.locationTitle}</Heading>
				<address class="postal-address">
					<Text as="div" weight="bold">{data.content.contactPage.address.company}</Text>
					<Text as="div">{data.content.contactPage.address.street}</Text>
					<Text as="div">{data.content.contactPage.address.postalCode} {data.content.contactPage.address.city}</Text>
					{#if data.content.contactPage.address.country}
						<Text as="div">{data.content.contactPage.address.country}</Text>
					{/if}
				</address>
				<div class="org-number">
					<Text variant="label">{data.content.contactPage.orgNumberLabel}</Text>
					<Text as="div">{data.content.contactPage.orgNumber}</Text>
				</div>
				<div class="visit-note">
					<Text as="p">{data.content.contactPage.visitNote}</Text>
				</div>
			</div>
		</PageContent>

		<div class={['map-wrap', mapActive && 'is-active']} {@attach disableMapOnLeave}>
			<iframe title={data.content.contactPage.mapTitle} src={mapEmbedUrl} loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1"></iframe>
			{#if !mapActive}
				<button type="button" class="map-enable" onclick={() => (mapActive = true)}>
					<span class="map-enable-label">{data.content.contactPage.mapEnableLabel}</span>
				</button>
			{/if}
		</div>
	</section>
</PageShell>

<style>
	.inbox {
		margin-top: var(--space-medium);
	}

	.inbox-copy {
		display: grid;
		gap: var(--space-medium);
	}

	.email-fact,
	.org-number {
		display: grid;
		gap: var(--space-small);
		justify-items: start;
	}

	.people {
		display: inline-grid;
		grid-template-columns: repeat(3, minmax(min-content, 1fr));
		align-items: stretch;
		max-width: 100%;
		gap: var(--space-medium);
		margin-top: var(--space-large);
	}

	.people :global(.surface) {
		background: var(--content-background);
		height: 100%;
		box-sizing: border-box;
	}

	.person {
		display: grid;
		gap: var(--space-small);
		height: 100%;
	}

	.person-photo {
		width: 100%;
		aspect-ratio: 1;
	}

	.person-photo :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--border-radius);
	}

	.person-copy {
		display: grid;
		gap: var(--space-small);
		justify-items: start;
		align-content: start;
	}

	.person-copy :global(.page-header) {
		white-space: nowrap;
	}

	@media (max-width: 960px) {
		.people {
			grid-template-columns: repeat(2, minmax(min-content, 1fr));
		}
	}

	@media (max-width: 780px) {
		.people {
			grid-template-columns: minmax(min-content, 1fr);
		}

		.person-copy :global(.page-header) {
			white-space: normal;
		}
	}

	.location {
		display: grid;
		gap: var(--space-medium);
		margin-top: var(--space-large);
	}

	.location-copy {
		display: grid;
		gap: var(--space-small);
	}

	.postal-address {
		display: grid;
		font-style: normal;
	}

	.visit-note {
		margin-top: var(--space-small);
	}

	.map-wrap {
		position: relative;
	}

	.map-wrap iframe {
		width: 100%;
		height: 26rem;
		border: 0;
		border-radius: var(--border-radius);
		pointer-events: none;
	}

	.map-wrap.is-active iframe {
		pointer-events: auto;
	}

	.map-enable {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: end center;
		padding: var(--space-medium);
		border: none;
		border-radius: var(--border-radius);
		background: transparent;
		color: var(--content-background);
		cursor: pointer;
		font-family: var(--font-body);
		font-weight: var(--weight-bold);
	}

	.map-enable-label {
		padding: var(--space-small) var(--space-medium);
		border-radius: var(--border-radius);
		background: color-mix(in srgb, var(--ink) 72%, transparent);
	}

	@media (max-width: 900px) {
		.map-wrap iframe {
			height: 20rem;
		}
	}
</style>
