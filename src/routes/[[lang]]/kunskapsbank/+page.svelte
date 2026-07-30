<script>
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { localePath } from '$lib/utils/routing';

	const { data } = $props();
	const toPath = (path = '') => localePath(data.locale, data.defaultLocale, path);
</script>

<svelte:head>
	<title>{data.content.glossaryPage.meta.title}</title>
	<meta name="description" content={data.content.glossaryPage.meta.description} />
</svelte:head>

<PageShell>
	<PageHeader title={data.content.glossaryPage.title} lead={data.content.glossaryPage.lead} />

	<div class="intro-grid">
		<div class="intro-copy">
			<PageContent>
				{#each data.content.glossaryPage.intro as paragraph, i (i)}
					<Text as="p">{paragraph}</Text>
				{/each}
			</PageContent>
		</div>

		<img class="intro-image" src={data.content.glossaryPage.introImage.src} alt={data.content.glossaryPage.introImage.alt} />
	</div>

	<FaqSection title={data.content.glossaryPage.faqTitle} items={data.content.glossaryPage.faqs} />

	<div class="guide-callout">
		<Surface as="section" radius="large" padding="large">
			<div class="guide-callout-inner">
				<div>
					<Heading as="h2">{data.content.glossaryPage.guide.title}</Heading>
					<Text as="p">{data.content.glossaryPage.guide.text}</Text>
				</div>

				<Link href={toPath(data.content.glossaryPage.guide.path)}>{data.content.glossaryPage.guide.label}</Link>
			</div>
		</Surface>
	</div>

	<div class="sections">
		{#each data.content.glossaryPage.sections as item, index (item.title)}
			{#if item.image}
				<MediaArticleSection title={item.title} subtitle={item.subtitle} reverse={index % 2 === 1}>
					{#snippet content()}
						<ParagraphArray paragraphs={item.paragraphs} />
					{/snippet}
					{#snippet media()}
						{#if item.caption}
							<figure>
								<img src={item.image} alt={item.imageAlt} />
								<figcaption>{item.caption}</figcaption>
							</figure>
						{:else}
							<img src={item.image} alt={item.imageAlt} />
						{/if}
					{/snippet}
				</MediaArticleSection>
			{:else}
				<MediaArticleSection title={item.title} subtitle={item.subtitle} reverse={index % 2 === 1}>
					{#snippet content()}
						<ParagraphArray paragraphs={item.paragraphs} />
					{/snippet}
				</MediaArticleSection>
			{/if}
		{/each}
	</div>
</PageShell>

<style>
	.intro-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
		gap: 2rem;
		align-items: start;
		margin-top: 2rem;
	}

	.intro-copy :global(p) {
		color: var(--muted);
	}

	.intro-image {
		display: block;
		width: 100%;
		border-radius: var(--radius-large);
	}

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

	.guide-callout :global(p) {
		color: var(--muted);
	}

	.guide-callout :global(.link) {
		font-weight: var(--weight-bold);
		text-decoration: none;
		white-space: nowrap;
	}

	.sections {
		display: grid;
		gap: 1.5rem;
	}

	@media (max-width: 820px) {
		.intro-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
