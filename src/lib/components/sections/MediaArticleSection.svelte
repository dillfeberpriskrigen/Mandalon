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
	}
	let { title, subtitle, content, reverse = false, media }: Props = $props();
</script>

<article class:reverse class:twocolumn={(title || subtitle || content) && media}>
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

	article :global(p) {
		color: var(--muted);
		margin: 1ch 0;
	}

	.media {
		display: block;
		border-radius: 1.1rem;
	}

	.media :global(img) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: inherit;
	}

	.reverse .media {
		order: 1;
	}

	@media (max-width: 780px) {
		.twocolumn {
			grid-template-columns: 1fr;
		}

		.reverse .media {
			order: 0;
		}
	}
</style>
