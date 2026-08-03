<script lang="ts">
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import DescriptionList from '$lib/components/data/DescriptionList.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { chipSensorsAreaOrder } from '$lib/content/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const capabilityItems = $derived(
		data.content.chipSensorsPage.capabilities.map((capability) => ({
			term: capability.name,
			description: capability.description
		}))
	);
</script>

<PageMeta meta={data.content.chipSensorsPage.meta} pageKey="packaging" locale={data.locale} />

<PageShell>
	<PageHeader title={data.content.chipSensorsPage.title} lead={data.content.chipSensorsPage.lead} />

	<PageContent>
		<div class="intro-stack">
			{#each data.content.chipSensorsPage.intro as paragraph, i (i)}
				<Text as="p">{paragraph}</Text>
			{/each}
		</div>
	</PageContent>

	<PageContent>
		<div class="intro-stack">
			<Text as="p">{data.content.chipSensorsPage.capabilitiesPresentation}</Text>
		</div>
	</PageContent>
	<DescriptionList items={capabilityItems} />

	{#each chipSensorsAreaOrder as key, i (key)}
		{@const area = data.content.chipSensorsPage.areas[key]}
		<MediaArticleSection title={area.title} subtitle={area.subtitle} reverse={i % 2 === 1}>
			{#snippet content()}
				<ParagraphArray paragraphs={area.paragraphs} />
			{/snippet}
			{#snippet media()}
				<Image src={area.image.src} alt={area.image.alt} width={area.image.width} height={area.image.height} />
			{/snippet}
		</MediaArticleSection>
	{/each}
</PageShell>

<style>
	.intro-stack {
		margin-top: 2rem;
	}
</style>
