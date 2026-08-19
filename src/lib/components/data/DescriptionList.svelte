<script lang="ts">
	type Item = {
		term: string;
		description: string;
	};

	type Props = {
		items: Item[];
	};

	let { items }: Props = $props();
</script>

<dl class="description-list">
	{#each items as item (item.term)}
		<dt>{item.term}</dt>
		<dd>{item.description}</dd>
	{/each}
</dl>
