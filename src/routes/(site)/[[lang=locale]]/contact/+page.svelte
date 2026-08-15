<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { ContactPerson } from '$lib/content/types';
	import { on } from 'svelte/events';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let mapActive = $state(false);
	let selected = $state.raw<ContactPerson | null>(null);
	const latitude = 58.448268;
	const longitude = 15.826769;
	const delta = 0.012;
	const bbox = [(longitude - delta).toFixed(5), (latitude - delta).toFixed(5), (longitude + delta).toFixed(5), (latitude + delta).toFixed(5)].join('%2C');
	const marker = `${latitude}%2C${longitude}`;
	const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

	const disableMapOnLeave = (node: HTMLElement) => on(node, 'pointerleave', () => (mapActive = false));

	const openPersonDialog = (node: HTMLDialogElement) => {
		node.showModal();
		const offClose = on(node, 'close', () => (selected = null));
		const offClick = on(node, 'click', (event) => {
			if (event.target === node) node.close();
		});

		return () => {
			offClose();
			offClick();
			if (node.open) node.close();
		};
	};
</script>

<PageMeta meta={data.content.contactPage.meta} pageKey="contact" locale={data.locale} />

<PageShell>
	<PageHeader title={data.content.contactPage.title} />

	<div class="inbox">
		<PageContent>
			<Text as="p">
				{data.content.contactPage.emailBefore}
				<Link href={data.content.contactPage.emailHref}>{data.content.contactPage.email}</Link>
				{data.content.contactPage.emailAfter}
			</Text>
		</PageContent>
	</div>

	<div class="people">
		{#each data.content.contactPage.people as person (person.name)}
			<Surface as="article" radius="large" padding="none" shadow="medium">
				<div class="person">
					<button
						type="button"
						class="person-open"
						aria-haspopup="dialog"
						aria-expanded={selected?.name === person.name}
						aria-label="{data.content.contactPage.openPersonLabel} {person.name}"
						onclick={() => (selected = person)}
					></button>
					<div class="person-inner">
						<div class="person-photo" aria-hidden={!person.image}>
							{#if person.image}
								<Image src={person.image.src} alt={person.image.alt} width={person.image.width} height={person.image.height} />
							{/if}
						</div>
						<div class="person-copy">
							<Heading as="h2">{person.name}</Heading>
							{#if person.role}
								<Text as="p">{person.role}</Text>
							{/if}
							{#if person.phone && person.phoneHref}
								<Link class="person-phone" href={person.phoneHref}>{person.phone}</Link>
							{/if}
						</div>
					</div>
				</div>
			</Surface>
		{/each}
	</div>

	{#if selected}
		<dialog class="person-dialog" aria-labelledby="person-dialog-name" {@attach openPersonDialog}>
			<form method="dialog" class="person-dialog-close">
				<Button type="submit" variant="secondary">{data.content.contactPage.closePersonLabel}</Button>
			</form>
			<div class={['person-dialog-body', selected.image && 'has-photo']}>
				{#if selected.image}
					<div class="person-dialog-photo">
						<Image src={selected.image.src} alt={selected.image.alt} width={selected.image.width} height={selected.image.height} />
					</div>
				{/if}
				<div class="person-dialog-copy">
					<Heading as="h2" id="person-dialog-name">{selected.name}</Heading>
					{#if selected.role}
						<Text as="p">{selected.role}</Text>
					{/if}
					{#if selected.phone && selected.phoneHref}
						<Link href={selected.phoneHref}>{selected.phone}</Link>
					{/if}
					{#if selected.bio}
						<div class="person-dialog-bio">
							<ParagraphArray paragraphs={selected.bio} />
						</div>
					{/if}
				</div>
			</div>
		</dialog>
	{/if}

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

	@media (hover: hover) {
		.people :global(.surface:has(.person-open:hover)) {
			background: var(--bg-soft);
		}
	}

	.person {
		position: relative;
		height: 100%;
	}

	.person-open {
		position: absolute;
		inset: 0;
		z-index: 0;
		padding: 0;
		border: none;
		border-radius: var(--border-radius);
		background: transparent;
		cursor: pointer;
	}

	.person-inner {
		display: grid;
		gap: var(--space-small);
		justify-items: stretch;
		align-content: start;
		padding: var(--space-medium);
		pointer-events: none;
	}

	.person-photo {
		width: 100%;
		aspect-ratio: 1;
	}

	.person-photo :global(img),
	.person-dialog-photo :global(img) {
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
	}

	.person-copy :global(.page-header) {
		white-space: nowrap;
	}

	.person-copy :global(.person-phone) {
		position: relative;
		z-index: 1;
		pointer-events: auto;
	}

	.person-dialog {
		width: min(40rem, calc(100vw - var(--space-large)));
		max-height: calc(100vh - var(--space-large));
		overflow: auto;
		padding: var(--space-medium);
		border: none;
		border-radius: var(--border-radius);
		background: var(--content-background);
		color: var(--ink);
		box-shadow: var(--shadow-medium);
	}

	.person-dialog::backdrop {
		background: color-mix(in srgb, var(--ink) 50%, transparent);
	}

	.person-dialog-close {
		display: flex;
		justify-content: flex-end;
		margin-bottom: var(--space-small);
	}

	.person-dialog-body {
		display: grid;
		gap: var(--space-medium);
	}

	.person-dialog-body.has-photo {
		grid-template-columns: minmax(10rem, 16rem) minmax(0, 1fr);
		align-items: start;
	}

	.person-dialog-photo {
		width: 100%;
		aspect-ratio: 1;
	}

	.person-dialog-copy {
		display: grid;
		gap: var(--space-small);
		justify-items: start;
	}

	.person-dialog-bio {
		margin-top: var(--space-small);
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

	@media (max-width: 640px) {
		.person-dialog-body.has-photo {
			grid-template-columns: 1fr;
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
