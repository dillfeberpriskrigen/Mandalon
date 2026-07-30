<script lang="ts">
	interface Props {
		title: string;
		lead?: string;
	}

	let { title, lead }: Props = $props();
</script>

<h1 class="page-title">{title}</h1>
{#if lead}
	<p class="lead text-width">{lead}</p>
{/if}
