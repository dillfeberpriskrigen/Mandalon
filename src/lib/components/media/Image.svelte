<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		width: number;
		height: number;
		caption?: string;
		priority?: boolean;
	}

	let { src, alt, width, height, caption, priority = false }: Props = $props();

	const loading = $derived(priority ? 'eager' : 'lazy');
</script>

{#if caption}
	<figure>
		<img {src} {alt} {width} {height} {loading} decoding="async" fetchpriority={priority ? 'high' : undefined} />
		<figcaption>{caption}</figcaption>
	</figure>
{:else}
	<img {src} {alt} {width} {height} {loading} decoding="async" fetchpriority={priority ? 'high' : undefined} />
{/if}
