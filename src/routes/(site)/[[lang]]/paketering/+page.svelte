<script lang="ts">
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import Table from '$lib/components/data/Table.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const capabilityRows = $derived(
		data.content.chipSensorsPage.capabilities.map((capability) => ({
			cells: [capability.name, capability.description]
		}))
	);
</script>

<svelte:head>
	<title>{data.content.chipSensorsPage.meta.title}</title>
	<meta name="description" content={data.content.chipSensorsPage.meta.description} />
</svelte:head>

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
	<Table rows={capabilityRows} />

	{#each data.content.chipSensorsPage.areas as area, i (area.title)}
		<MediaArticleSection title={area.title} subtitle={area.subtitle} reverse={i % 2 === 1}>
			{#snippet content()}
				<ParagraphArray paragraphs={area.paragraphs} />
			{/snippet}
			{#snippet media()}
				<img src={area.image} alt={area.imageAlt} />
			{/snippet}
		</MediaArticleSection>
	{/each}
</PageShell>

<style>
	.intro-stack {
		margin-top: 2rem;
	}
</style>
