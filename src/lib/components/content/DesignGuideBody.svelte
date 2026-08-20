<script lang="ts">
	import DesignGuideFigure from '$lib/components/content/DesignGuideFigure.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import { headingId } from '$lib/content/pages/designGuideBody';
	import type { DesignGuideBlock } from '$lib/content/types';

	interface Props {
		blocks: readonly DesignGuideBlock[];
	}

	let { blocks }: Props = $props();

	function figurePriority(index: number): boolean {
		let count = 0;
		for (let i = 0; i < index; i++) {
			if (blocks[i]?.type === 'figure') count += 1;
		}
		return count < 2;
	}
</script>

<div class="designguide-body">
	{#each blocks as block, i (`${block.type}-${i}`)}
		{#if block.type === 'heading'}
			{#if block.level === 2}
				<Heading as="h2" id={headingId(block.text)}>{block.text}</Heading>
			{:else}
				<Heading as="h3" id={headingId(block.text)}>{block.text}</Heading>
			{/if}
		{:else if block.type === 'paragraph'}
			<!-- Trusted author-owned guide copy; mirrors PageMeta JSON-LD pattern. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p class="text text-body text-weight-normal">{@html block.html}</p>
		{:else if block.type === 'figure'}
			<DesignGuideFigure figure={block} priority={figurePriority(i)} />
		{:else if block.type === 'gallery'}
			<figure class="designguide-gallery">
				<ul class="designguide-gallery-grid">
					{#each block.figures as figure (figure.src)}
						<li class="designguide-gallery-item">
							<DesignGuideFigure {figure} />
						</li>
					{/each}
				</ul>
			</figure>
		{/if}
	{/each}
</div>

<style>
	.designguide-body :global(.page-header),
	.designguide-body :global(.page-sub-section) {
		scroll-margin-top: 5.5rem;
		margin-top: 1.6rem;
	}

	.designguide-body :global(.page-header:first-child) {
		margin-top: 0;
	}

	.designguide-body :global(figcaption) {
		margin: 0.8rem 0 0;
		color: var(--muted);
	}

	.designguide-body :global(figure) {
		margin: 1.2rem 0;
	}

	.designguide-body :global(img) {
		border-radius: var(--border-radius);
	}

	.designguide-gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-medium);
		padding: 0;
		list-style: none;
	}

	.designguide-gallery-item {
		margin: 0;
	}

	@media (max-width: 700px) {
		.designguide-gallery-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
