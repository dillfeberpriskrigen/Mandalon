<script lang="ts">
	import type { Snippet } from 'svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		content?: Snippet;
		media?: Snippet;
		reverse?: boolean;
		/** Caps media column width (e.g. portrait photos on contact). */
		mediaMaxWidth?: string;
		/** Drop the top margin when this block sits directly under PageHeader. */
		flushTop?: boolean;
	}
	let { title, subtitle, content, reverse = false, media, mediaMaxWidth, flushTop = false }: Props = $props();
</script>

<article class={{ reverse, twocolumn: (title || subtitle || content) && media, 'flush-top': flushTop }} style:--media-max-width={mediaMaxWidth}>
	<div class="media">
		{#if media}
			{@render media()}
		{/if}
	</div>

	<div class="topic">
		{#if title}
			<Heading as="h2">{title}</Heading>
		{/if}

		{#if subtitle}
			<div class="subtitle">
				<Text as="p" weight="bold">{subtitle}</Text>
			</div>
		{/if}

		{#if content}
			<div class="content">{@render content()}</div>
		{/if}
	</div>
</article>

<style>
	article {
		display: grid;
		align-items: center;
		gap: 1.5rem;
		padding: 1.35rem;
		margin: 1rem 0;
		border-radius: var(--border-radius);
		background: var(--content-background);
		box-shadow: var(--shadow-medium);
	}

	.flush-top {
		margin-top: 0;
	}

	/* Topic column slightly larger than media */
	.twocolumn {
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
	}

	.twocolumn.reverse {
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
	}

	.subtitle :global(p) {
		color: var(--ink);
	}

	.media {
		display: block;
		border-radius: 1.1rem;
		max-width: var(--media-max-width, none);
	}

	.media :global(figure) {
		margin: 0;
		border-radius: inherit;
	}

	.media :global(img) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: inherit;
	}

	.media :global(figcaption) {
		margin-top: 0.7rem;
		font-size: var(--text-caption-size);
		line-height: var(--text-caption-line);
		color: var(--muted);
	}

	.reverse .media {
		order: 1;
	}

	@media (max-width: 780px) {
		.twocolumn,
		.twocolumn.reverse {
			grid-template-columns: 1fr;
		}

		.reverse .media {
			order: 0;
		}
	}
</style>
