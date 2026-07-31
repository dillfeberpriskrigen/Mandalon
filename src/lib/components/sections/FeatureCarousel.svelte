<script lang="ts">
	import useEmblaCarousel from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface Feature {
		title: string;
		text: string;
		image: string;
	}

	interface Props {
		title: string;
		features: Feature[];
	}

	let { title, features }: Props = $props();

	let emblaApi: import('embla-carousel').EmblaCarouselType | null = null;
	const emblaOptions = { loop: true };
	const emblaPlugins = [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })];

	const handleEmblaInit = (event: CustomEvent<import('embla-carousel').EmblaCarouselType>) => {
		emblaApi = event.detail;
		emblaApi.plugins().autoplay?.play();
	};
</script>

<section class="carousel">
	<div class="container">
		<PageContent>
			<div class="carousel-header">
				<Heading as="h2">{title}</Heading>
			</div>

			<div class="carousel-spotlight">
				<div class="embla">
					<div class="embla__viewport" use:useEmblaCarousel={{ options: emblaOptions, plugins: emblaPlugins }} onemblaInit={handleEmblaInit}>
						<div class="embla__container">
							{#each features as feature (feature.title)}
								<div class="embla__slide">
									<Surface as="article" radius="large" padding="none">
										<div class="carousel-media">
											<img src={feature.image} alt={feature.title} />
										</div>
										<div class="carousel-copy">
											<Heading as="h3">{feature.title}</Heading>
											<Text as="p">{feature.text}</Text>
										</div>
									</Surface>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</PageContent>
	</div>
</section>

<style>
	.carousel {
		padding: 5rem 0;
	}

	.carousel-header {
		margin-bottom: 2rem;
	}

	.carousel-spotlight {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	.embla {
		min-width: 0;
	}

	.embla__viewport {
		overflow: hidden;
		min-width: 0;
	}

	.embla__container {
		display: flex;
		min-width: 0;
	}

	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	.embla__slide :global(.surface) {
		display: grid;
		grid-template-columns: 1fr;
		overflow: hidden;
	}

	.carousel-media {
		aspect-ratio: 16 / 9;
	}

	.carousel-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-copy {
		padding: 1.5rem;
	}

	@media (max-width: 640px) {
		.carousel-spotlight,
		.embla,
		.embla__viewport,
		.embla__container,
		.embla__slide,
		.carousel-copy,
		.carousel-media {
			min-width: 0;
			max-width: 100%;
		}
	}
</style>
