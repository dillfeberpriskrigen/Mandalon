<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import DescriptionList from '$lib/components/data/DescriptionList.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { chipSensorsAreaOrder } from '$lib/content/types';
	import { hrefFor } from '$lib/routes';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const page = $derived(data.content.chipSensorsPage);
	const locale = $derived(data.locale);
	const capabilityItems = $derived(
		page.capabilities.map((capability) => ({
			term: capability.name,
			description: capability.description
		}))
	);
</script>

<PageMeta meta={page.meta} pageKey="packaging" {locale} />

<PageShell>
	<PageHeader title={page.title} lead={page.lead} />

	<div class="intro">
		<Surface as="section" radius="large" padding="large">
			<div class="split">
				<div class="split-copy">
					<div class="split-heading">
						<Heading as="h2">{page.introTitle}</Heading>
					</div>
					<ParagraphArray paragraphs={page.intro} />
				</div>
			</div>
		</Surface>
	</div>

	<div class="capabilities">
		<Surface as="section" radius="large" padding="large">
			<div class="split">
				<div class="split-copy">
					<div class="split-heading">
						<Heading as="h2">{page.capabilitiesTitle}</Heading>
					</div>
					<Text as="p">{page.capabilitiesPresentation}</Text>
				</div>
			</div>
			<DescriptionList items={capabilityItems} />
		</Surface>
	</div>

	<div class="areas">
		{#each chipSensorsAreaOrder as key, i (key)}
			{@const area = page.areas[key]}
			<MediaArticleSection title={area.title} subtitle={area.subtitle} reverse={i % 2 === 1}>
				{#snippet content()}
					<ParagraphArray paragraphs={area.paragraphs} />
				{/snippet}
				{#snippet media()}
					<Image src={area.image.src} alt={area.image.alt} width={area.image.width} height={area.image.height} priority={i === 0} />
				{/snippet}
			</MediaArticleSection>
		{/each}
	</div>

	<div class="contact-cta">
		<Surface as="section" radius="large" padding="large">
			<div class="contact-cta-inner">
				<div>
					<Heading as="h2">{page.contactCta.title}</Heading>
					<Text as="p">{page.contactCta.text}</Text>
				</div>
				<Link href={hrefFor(page.contactCta.page, locale)} weight="bold" nowrap>{page.contactCta.label}</Link>
			</div>
		</Surface>
	</div>
</PageShell>

<style>
	.intro {
		margin-top: 2.2rem;
	}

	.capabilities,
	.areas,
	.contact-cta {
		margin-top: 3rem;
	}

	.split {
		display: grid;
		grid-template-columns: minmax(14rem, 32rem) minmax(0, 1fr);
		gap: var(--space-large);
		align-items: start;
	}

	.split-heading {
		margin-bottom: var(--space-medium);
	}

	.areas {
		display: grid;
		gap: 1.5rem;
	}

	.contact-cta-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 1rem 2rem;
	}

	@media (max-width: 780px) {
		.split {
			grid-template-columns: 1fr;
		}
	}
</style>
