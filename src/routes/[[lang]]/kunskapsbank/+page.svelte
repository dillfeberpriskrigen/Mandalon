<script>
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
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
					<p>{paragraph}</p>
				{/each}
			</PageContent>
		</div>

		<img class="intro-image" src={data.content.glossaryPage.introImage.src} alt={data.content.glossaryPage.introImage.alt} />
	</div>

	<section class="faq-section">
		<h2>{data.content.glossaryPage.faqTitle}</h2>

		<div class="faq-list">
			{#each data.content.glossaryPage.faqs as item (item.question)}
				<article class="faq-item">
					<h3>{item.question}</h3>
					<p>{item.answer}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="guide-callout">
		<div>
			<h2>{data.content.glossaryPage.guide.title}</h2>
			<p>{data.content.glossaryPage.guide.text}</p>
		</div>

		<a href={toPath(data.content.glossaryPage.guide.path)}>{data.content.glossaryPage.guide.label}</a>
	</section>

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

	.intro-copy p,
	.faq-item p,
	.guide-callout p {
		line-height: 1.8;
		color: #44574e;
	}

	.intro-image {
		display: block;
		width: 100%;
		border-radius: 1.5rem;
	}

	.faq-section,
	.guide-callout,
	.sections {
		margin-top: 3rem;
	}

	.faq-section h2,
	.guide-callout h2 {
		font-size: clamp(1.7rem, 3vw, 2.5rem);
		line-height: 1.05;
	}

	.faq-list,
	.sections {
		display: grid;
		gap: 1.5rem;
	}

	.faq-item {
		padding: 1.4rem 1.6rem;
		background: rgba(255, 255, 255, 0.88);
		border-radius: 1.35rem;
	}

	.faq-item h3 {
		margin-bottom: 0.6rem;
		font-size: 1.15rem;
		line-height: 1.4;
	}

	.guide-callout {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 1rem 2rem;
		padding: 1.6rem 1.8rem;
		background: rgba(255, 255, 255, 0.88);
		border-radius: 1.5rem;
	}

	.guide-callout a {
		color: #0f4d78;
		font-weight: 700;
		text-decoration: none;
	}

	@media (max-width: 820px) {
		.intro-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
