<script>
	import DesignGuide from '$lib/content/DesignGuide.svelte';

	const { data } = $props();
	const content = data.content.designGuidePage;
</script>

<svelte:head>
	<title>{data.content.designGuidePage.meta.title}</title>
	<meta name="description" content={data.content.designGuidePage.meta.description} />
</svelte:head>

<section class="guide-page">
	<div class="container">
		<h1 class="page-title">{content.title}</h1>
		<p class="guide-intro text-width">{content.intro}</p>
		<div class="guide-content">
			<DesignGuide {content} />
		</div>
	</div>
</section>

<style>
	.guide-page {
		--container-width: var(--container-width-narrow);
		padding: 4rem 0 6rem;
	}

	h1 {
		margin: 0;
	}

	.guide-intro {
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
		color: #506458;
	}

	.guide-content {
		margin-top: 2rem;
		padding: 1.8rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
	}

	.guide-content :global(.designguide-article h2),
	.guide-content :global(.designguide-article h3),
	.guide-content :global(.designguide-article h4),
	.guide-content :global(.designguide-article h5) {
		margin: 1.6rem 0 0.75rem;
		line-height: 1.15;
		color: #10231c;
	}

	.guide-content :global(.designguide-article h2:first-child) {
		margin-top: 0;
		font-size: clamp(1.8rem, 3vw, 2.4rem);
	}

	.guide-content :global(.designguide-article h3) {
		font-size: clamp(1.4rem, 2.3vw, 1.8rem);
	}

	.guide-content :global(.designguide-article h4) {
		font-size: clamp(1.15rem, 2vw, 1.35rem);
	}

	.guide-content :global(.designguide-article p),
	.guide-content :global(.designguide-article li),
	.guide-content :global(.designguide-article figcaption) {
		margin: 0.8rem 0 0;
		line-height: 1.75;
		color: #506458;
	}

	.guide-content :global(.designguide-article a) {
		color: #ffffff;
	}

	.guide-content :global(.designguide-download) {
		display: inline-block;
		margin-top: 0.2rem;
		padding: 0.8rem 1.2rem;
		border-radius: 999px;
		background: #e97d2f;
		color: rgb(255, 255, 255);
		font-weight: 700;
		text-decoration: none;
	}

	.guide-content :global(.designguide-list),
	.guide-content :global(.designguide-article ol),
	.guide-content :global(.designguide-article ul) {
		padding-left: 1.35rem;
	}

	.guide-content :global(.designguide-article figure) {
		margin: 1.2rem 0;
	}

	.guide-content :global(.designguide-article img) {
		display: block;
		max-width: 100%;
		height: auto;
		border-radius: 0.6rem;
	}

	.guide-content :global(.designguide-gallery-grid) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding: 0;
		list-style: none;
	}

	.guide-content :global(.designguide-gallery-item) {
		margin: 0;
	}

	@media (max-width: 700px) {
		.guide-content {
			padding: 1.2rem;
		}

		.guide-content :global(.designguide-gallery-grid) {
			grid-template-columns: 1fr;
		}
	}
</style>
