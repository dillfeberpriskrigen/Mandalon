<script lang="ts">
	import DesignGuideBody from '$lib/components/content/DesignGuideBody.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import { designGuideBody, designGuidePdfHref } from '$lib/content/pages/designGuideBody';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const content = $derived(data.content.designGuidePage);
</script>

<PageMeta meta={content.meta} pageKey="designGuide" locale={data.locale} />

<section class="guide-page">
	<div class="container">
		<h1 class="page-title">{content.title}</h1>
		<p class="guide-intro text-width">{content.intro}</p>
		{#if content.languageNote}
			<p class="guide-language-note text-width">{content.languageNote}</p>
		{/if}
		<div class="guide-content">
			<article class="designguide-article">
				<h2>{content.articleIntroTitle}</h2>
				<p>{content.articleIntroBody}</p>
				<p>
					<Button href={designGuidePdfHref}>{content.downloadLabel}</Button>
				</p>
				<DesignGuideBody blocks={designGuideBody} />
			</article>
		</div>
	</div>
</section>

<style>
	.guide-page {
		/* Page-local width override — not a shared token */
		--container-width: 980px;
		padding: 4rem 0 6rem;
	}

	h1 {
		margin: 0;
	}

	.guide-intro {
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
		color: var(--ink);
	}

	.guide-language-note {
		margin-top: 1rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--muted);
		font-style: italic;
	}

	.guide-content {
		margin-top: 2rem;
		padding: 1.8rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
	}

	.designguide-article :global(h2),
	.designguide-article :global(h3),
	.designguide-article :global(h4) {
		margin: 1.6rem 0 0.75rem;
		line-height: 1.15;
		color: #10231c;
	}

	.designguide-article :global(h2:first-child) {
		margin-top: 0;
		font-size: clamp(1.8rem, 3vw, 2.4rem);
	}

	.designguide-article :global(h3) {
		font-size: clamp(1.4rem, 2.3vw, 1.8rem);
	}

	.designguide-article :global(h4) {
		font-size: clamp(1.15rem, 2vw, 1.35rem);
	}

	.designguide-article :global(p),
	.designguide-article :global(li) {
		margin: 0.8rem 0 0;
		line-height: 1.75;
		color: var(--ink);
	}

	.designguide-article :global(figcaption) {
		margin: 0.8rem 0 0;
		line-height: 1.75;
		color: var(--muted);
	}

	.designguide-article :global(.designguide-list),
	.designguide-article :global(ol),
	.designguide-article :global(ul) {
		padding-left: 1.35rem;
	}

	.designguide-article :global(figure) {
		margin: 1.2rem 0;
	}

	.designguide-article :global(img) {
		display: block;
		max-width: 100%;
		height: auto;
		border-radius: 0.6rem;
	}

	.designguide-article :global(.designguide-gallery-grid) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding: 0;
		list-style: none;
	}

	.designguide-article :global(.designguide-gallery-item) {
		margin: 0;
	}

	@media (max-width: 700px) {
		.guide-content {
			padding: 1.2rem;
		}

		.designguide-article :global(.designguide-gallery-grid) {
			grid-template-columns: 1fr;
		}
	}
</style>
