<script lang="ts">
	import type { DesignGuideTocItem } from '$lib/content/types';

	interface Props {
		items: DesignGuideTocItem[];
	}

	let { items }: Props = $props();
</script>

<ol class="designguide-list">
	{#each items as item (item.label)}
		<li>
			<strong>{item.label}</strong>
			{#if item.children?.length}
				<ol>
					{#each item.children as child (child.label)}
						<li>{child.label}</li>
					{/each}
				</ol>
			{/if}
		</li>
	{/each}
</ol>
