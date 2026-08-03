<script lang="ts">
	import DesignGuideFigure from '$lib/components/content/DesignGuideFigure.svelte';
	import DesignGuideToc from '$lib/components/content/DesignGuideToc.svelte';
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

{#each blocks as block, i (i)}
	{#if block.type === 'heading'}
		{#if block.level === 2}
			<h2>{block.text}</h2>
		{:else if block.level === 3}
			<h3>{block.text}</h3>
		{:else}
			<h4>{block.text}</h4>
		{/if}
	{:else if block.type === 'paragraph'}
		<!-- Trusted author-owned guide copy; mirrors PageMeta JSON-LD pattern. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html block.html}</p>
	{:else if block.type === 'figure'}
		<DesignGuideFigure figure={block} priority={figurePriority(i)} />
	{:else if block.type === 'gallery'}
		<figure class="designguide-gallery">
			<ul class="designguide-gallery-grid">
				{#each block.figures as figure (figure.src)}
					<li class="designguide-gallery-item">
						<DesignGuideFigure {figure} captionClass="designguide-gallery-caption" />
					</li>
				{/each}
			</ul>
		</figure>
	{:else if block.type === 'toc'}
		<DesignGuideToc items={block.items} />
	{/if}
{/each}
