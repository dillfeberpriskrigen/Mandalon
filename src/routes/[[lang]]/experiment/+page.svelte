<script>
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import ParagraphArray from '$lib/components/ParagraphArray.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import { siteContent } from '$lib/content/site';

	const content = siteContent.sv;
</script>

<PageContent>
	{#each content.chipSensorsPage.areas as area, i (area.title)}
		<MediaArticleSection title={area.title} subtitle={area.subtitle} reverse={i % 2 === 1}>
			{#snippet content()}
				<ParagraphArray paragraphs={area.paragraphs} />
			{/snippet}
			{#snippet media()}
				<img src={area.image} alt={area.imageAlt} />
			{/snippet}
		</MediaArticleSection>
	{/each}
</PageContent>

<style>
	img {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 260px;
		object-fit: cover;
		border-radius: 1.1rem;
	}
</style>
