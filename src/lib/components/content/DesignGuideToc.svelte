<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import type { DesignGuideTocItem } from '$lib/content/types';

	interface Props {
		title: string;
		items: DesignGuideTocItem[];
	}

	let { title, items }: Props = $props();
	const headingDomId = $props.id();
</script>

<nav class="designguide-toc" aria-labelledby={headingDomId}>
	<Heading as="h2" id={headingDomId}>{title}</Heading>
	<ol class="content-list">
		{#each items as item (item.href)}
			<li>
				<Link href={item.href}>{item.label}</Link>
				{#if item.children?.length}
					<ol class="content-list">
						{#each item.children as child (child.href)}
							<li><Link href={child.href}>{child.label}</Link></li>
						{/each}
					</ol>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.designguide-toc :global(.page-header) {
		margin-bottom: var(--space-medium);
	}

	.designguide-toc :global(.link) {
		font-size: var(--text-caption-size);
		line-height: var(--text-caption-line);
	}

	.designguide-toc .content-list .content-list {
		margin-top: 0.35rem;
		margin-bottom: 0.35rem;
	}
</style>
