<script lang="ts">
	import Image from '$lib/components/media/Image.svelte';
	import type { DesignGuideFigure } from '$lib/content/types';

	interface Props {
		figure: DesignGuideFigure;
		/** Extra class on figcaption (gallery captions). */
		captionClass?: string;
		priority?: boolean;
	}

	let { figure, captionClass, priority = false }: Props = $props();
</script>

<figure>
	<a href={figure.src} rel="external">
		<Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} {priority} />
	</a>
	{#if figure.caption}
		<figcaption class={captionClass}>{figure.caption}</figcaption>
	{/if}
</figure>
