<svelte:head>
	<title>{data.content.glossaryPage.meta.title}</title>
	<meta name="description" content={data.content.glossaryPage.meta.description} />
</svelte:head>

<script>
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { localePath } from '$lib/utils/routing';

	const { data } = $props();
	const toPath = (path = '') => localePath(data.locale, data.defaultLocale, path);
</script>

<SiteHeader {data} currentPath={data.locale === 'sv' ? 'kunskapsbank' : 'knowledgebank'} />

<section class="info-page">
	<div class="container">
		<h1 class="page-title">{data.content.glossaryPage.title}</h1>
		<p class="lead text-width">{data.content.glossaryPage.lead}</p>

		<div class="intro-grid">
			<div class="intro-copy text-width">
				{#each data.content.glossaryPage.intro as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<img
				class="intro-image"
				src={data.content.glossaryPage.introImage.src}
				alt={data.content.glossaryPage.introImage.alt}
			/>
		</div>

		<section class="faq-section">
			<h2>{data.content.glossaryPage.faqTitle}</h2>

			<div class="faq-list">
				{#each data.content.glossaryPage.faqs as item}
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
			{#each data.content.glossaryPage.sections as item, index}
				<article class:reverse={index % 2 === 1} class="topic">
					<div class="topic-copy">
						<h2>{item.title}</h2>
						{#if item.subtitle}
							<p class="subtitle">{item.subtitle}</p>
						{/if}

						{#each item.paragraphs as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					{#if item.image}
						<figure class="topic-media">
							<img src={item.image} alt={item.imageAlt} />
							{#if item.caption}
								<figcaption>{item.caption}</figcaption>
							{/if}
						</figure>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<SiteFooter {data} />

<style>
	.info-page {
		--container-width: var(--container-width-narrow);
		padding: 4rem 0 6rem;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	.lead {
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
	}

	.intro-grid,
	.topic {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
		gap: 2rem;
		align-items: start;
	}

	.intro-grid {
		margin-top: 2rem;
	}

	.intro-copy,
	.topic-copy {
		display: grid;
		gap: 1rem;
	}

	.intro-copy p,
	.topic-copy p,
	.faq-item p,
	.guide-callout p,
	.subtitle {
		line-height: 1.8;
		color: #44574e;
	}

	.intro-image,
	.topic-media img {
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
	.topic h2,
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

	.topic {
		padding: 2rem 0;
		border-top: 1px solid rgba(40, 74, 117, 0.16);
	}

	.topic.reverse {
		grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
	}

	.topic.reverse .topic-copy {
		order: 2;
	}

	.topic.reverse .topic-media {
		order: 1;
	}

	.subtitle {
		font-weight: 700;
	}

	.topic-media {
		margin: 0;
	}

	figcaption {
		margin-top: 0.7rem;
		font-size: 0.95rem;
		color: #5a6e63;
	}

	@media (max-width: 820px) {
		.info-page {
			padding: 3rem 0 5rem;
		}

		.intro-grid,
		.topic,
		.topic.reverse {
			grid-template-columns: 1fr;
		}

		.topic.reverse .topic-copy,
		.topic.reverse .topic-media {
			order: initial;
		}
	}
</style>
