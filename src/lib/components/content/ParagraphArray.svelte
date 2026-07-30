<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';

	interface Props {
		paragraphs: string[];
	}

	let { paragraphs }: Props = $props();
</script>

{#each paragraphs as paragraph (paragraph)}
	<Text as="p">{paragraph}</Text>
{/each}
