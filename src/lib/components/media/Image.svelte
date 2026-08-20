<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		width: number;
		height: number;
		caption?: string;
		priority?: boolean;
		sizes?: string;
	}

	let { src, alt, width, height, caption, priority = false, sizes }: Props = $props();

	const loading = $derived(priority ? 'eager' : 'lazy');
</script>

{#if caption}
	<figure>
		<img {src} {alt} {width} {height} {sizes} {loading} decoding="async" fetchpriority={priority ? 'high' : undefined} />
		<figcaption>{caption}</figcaption>
	</figure>
{:else}
	<img {src} {alt} {width} {height} {sizes} {loading} decoding="async" fetchpriority={priority ? 'high' : undefined} />
{/if}
