<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface Props {
		title: string;
		copy: string;
	}

	let { title, copy }: Props = $props();
</script>

<section class="hero">
	<div class="container hero-content">
		<Heading as="h1">{title}</Heading>
		<div class="hero-copy">
			<Text as="p" variant="lead">{copy}</Text>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 21rem;
		display: grid;
		place-items: center;
		background: var(--hero-bg);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 5.5rem 0 4.5rem;
		text-align: center;
		color: white;
	}

	.hero-content :global(.page-title) {
		margin-inline: auto;
		text-wrap: balance;
		line-height: 1.12;
	}

	.hero-copy {
		margin: 1.4rem auto 0;
		max-width: var(--text-width);
	}

	.hero-copy :global(p) {
		color: rgba(255, 255, 255, 0.9);
	}

	@media (max-width: 640px) {
		.hero {
			min-height: 0;
		}

		.hero-content {
			padding-top: 4.5rem;
		}
	}
</style>
