<script lang="ts">
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface FaqItem {
		question: string;
		answer: string;
	}

	interface Props {
		title: string;
		items: FaqItem[];
	}

	let { title, items }: Props = $props();
</script>

<section class="faq-section">
	<Surface radius="large" padding="large">
		<Heading as="h2">{title}</Heading>
	</Surface>

	<div class="faq-list">
		{#each items as item (item.question)}
			<Surface as="article" radius="large" padding="medium">
				<Heading as="h3">{item.question}</Heading>
				<Text as="p">{item.answer}</Text>
			</Surface>
		{/each}
	</div>
</section>

<style>
	.faq-section {
		margin-top: 3rem;
	}

	.faq-list {
		display: grid;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}
</style>
