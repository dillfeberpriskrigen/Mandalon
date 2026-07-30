<script lang="ts">
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface Props {
		title: string;
		lead?: string;
	}

	let { title, lead }: Props = $props();
</script>

<Heading as="h1">{title}</Heading>
{#if lead}
	<div class="lead-wrap">
		<PageContent>
			<Text as="p" variant="lead">{lead}</Text>
		</PageContent>
	</div>
{/if}

<style>
	.lead-wrap {
		margin-top: 1.25rem;
	}
</style>
