<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { glossarySectionOrder, type GlossarySection } from '$lib/content/types';
	import { hrefFor } from '$lib/routes';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<PageMeta meta={data.content.glossaryPage.meta} pageKey="knowledge" locale={data.locale} />

<PageShell>
	<PageHeader title={data.content.glossaryPage.title} lead={data.content.glossaryPage.lead} />

	<MediaArticleSection>
		{#snippet content()}
			<ParagraphArray paragraphs={data.content.glossaryPage.intro} />
		{/snippet}
		{#snippet media()}
			<Image
				src={data.content.glossaryPage.introImage.src}
				alt={data.content.glossaryPage.introImage.alt}
				width={data.content.glossaryPage.introImage.width}
				height={data.content.glossaryPage.introImage.height}
				priority
			/>
		{/snippet}
	</MediaArticleSection>

	<FaqSection title={data.content.glossaryPage.faqTitle} items={data.content.glossaryPage.faqs} />

	<div class="guide-callout">
		<Surface as="section" radius="large" padding="large">
			<div class="guide-callout-inner">
				<div>
					<Heading as="h2">{data.content.glossaryPage.guide.title}</Heading>
					<Text as="p">{data.content.glossaryPage.guide.text}</Text>
				</div>

				<Link href={hrefFor(data.content.glossaryPage.guide.page, data.locale ?? data.defaultLocale)} weight="bold" underline={false} nowrap
					>{data.content.glossaryPage.guide.label}</Link
				>
			</div>
		</Surface>
	</div>

	<div class="sections">
		{#each glossarySectionOrder as key, index (key)}
			{@const item: GlossarySection = data.content.glossaryPage.sections[key]}
			{#snippet content()}
				<ParagraphArray paragraphs={item.paragraphs} />
			{/snippet}

			{#snippet media()}
				{#if item.image}
					<Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} caption={item.caption} />
				{/if}
			{/snippet}

			<MediaArticleSection title={item.title} subtitle={item.subtitle} reverse={index % 2 === 1} {content} media={item.image ? media : undefined} />
		{/each}
	</div>
</PageShell>

<style>
	.guide-callout,
	.sections {
		margin-top: 3rem;
	}

	.guide-callout-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 1rem 2rem;
	}

	.sections {
		display: grid;
		gap: 1.5rem;
	}
</style>
