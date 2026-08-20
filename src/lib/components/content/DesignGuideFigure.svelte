<script lang="ts">
	import Image from '$lib/components/media/Image.svelte';
	import type { DesignGuideFigure } from '$lib/content/types';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		figure: DesignGuideFigure;
		/** Extra class on figcaption (gallery captions). */
		captionClass?: ClassValue;
		priority?: boolean;
	}

	let { figure, captionClass, priority = false }: Props = $props();
</script>

<figure>
	<a href={figure.src} rel="external">
		<Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} {priority} />
	</a>
	{#if figure.caption}
		<figcaption class={['text', 'text-caption', captionClass]}>{figure.caption}</figcaption>
	{/if}
</figure>
