<script lang="ts">
	interface Props {
		paragraphs: string[];
	}

	let { paragraphs }: Props = $props();
</script>

{#each paragraphs as paragraph (paragraph)}
	<p>{paragraph}</p>
{/each}
