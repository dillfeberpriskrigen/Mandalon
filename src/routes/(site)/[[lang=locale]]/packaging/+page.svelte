<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import DescriptionList from '$lib/components/data/DescriptionList.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
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

	<div class="surface-grid methods">
		<Surface as="section" radius="large" padding="large">
			<div class="method-heading">
				<Heading as="h2">{page.methods.dieBonding.title}</Heading>
			</div>
			<ParagraphArray paragraphs={page.methods.dieBonding.paragraphs} />
		</Surface>

		<Surface as="section" radius="large" padding="large">
			<div class="method-heading">
				<Heading as="h2">{page.methods.wireBonding.title}</Heading>
			</div>
			<ParagraphArray paragraphs={page.methods.wireBonding.paragraphs} />
		</Surface>
	</div>

	<div class="contact-prompt">
		<Surface as="section" radius="large" padding="large">
			<Button href={hrefFor(page.contactPrompt.page, locale)}>{page.contactPrompt.label}</Button>
		</Surface>
	</div>

	<div class="capabilities">
		<Surface as="section" radius="large" padding="large">
			<div class="method-heading">
				<Heading as="h2">{page.capabilitiesTitle}</Heading>
			</div>
			<Text as="p">{page.capabilitiesPresentation}</Text>
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
				<Button href={hrefFor(page.contactCta.page, locale)}>{page.contactCta.label}</Button>
			</div>
		</Surface>
	</div>
</PageShell>

<style>
	.methods {
		margin-top: 2.2rem;
		align-items: stretch;
	}

	.methods :global(.surface) {
		height: 100%;
		min-width: 0;
	}

	.method-heading {
		margin-bottom: var(--space-medium);
	}

	.areas,
	.capabilities,
	.contact-prompt,
	.contact-cta {
		margin-top: 3rem;
	}

	.areas {
		display: grid;
		gap: 1.5rem;
	}

	.contact-prompt :global(.button) {
		width: 100%;
		white-space: normal;
		text-wrap: balance;
	}

	.contact-cta-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
	}
</style>
