<script>
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.content.chipSensorsPage.meta.title}</title>
	<meta name="description" content={data.content.chipSensorsPage.meta.description} />
</svelte:head>

<PageShell>
	<PageHeader title={data.content.chipSensorsPage.title} lead={data.content.chipSensorsPage.lead} />

	<div class="intro-stack text-width">
		{#each data.content.chipSensorsPage.intro as paragraph, i (i)}
			<p>{paragraph}</p>
		{/each}
	</div>

	<p class="intro-stack text-width">{data.content.chipSensorsPage.capabilitiesPresentation}</p>
	<table class="capabilities-table">
		<tbody>
			{#each data.content.chipSensorsPage.capabilities as capability (capability.name)}
				<tr>
					<td>{capability.name}</td>
					<td>{capability.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<PageContent>
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
	</PageContent>
</PageShell>

<style>
	.intro-stack {
		display: grid;
		gap: 1rem;
		margin-top: 2rem;
	}

	.intro-stack p {
		line-height: 1.75;
		color: #506458;
	}

	.capabilities-table {
		max-width: 48rem;
		margin-top: 5rem;
		margin-top: 5rem;
		border: 1px solid rgba(16, 35, 28, 0.18);
		border-radius: 1rem;
		border-collapse: separate;
		border-spacing: 0;
		margin-left: auto;
		margin-right: auto;
	}

	.capabilities-table td {
		padding: 1rem 1.25rem;
	}

	.capabilities-table tr:not(:last-child) td {
		border-bottom: 1px solid rgba(16, 35, 28, 0.12);
	}
</style>
