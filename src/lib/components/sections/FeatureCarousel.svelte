<script lang="ts">
	import useEmblaCarousel from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { EmblaCarouselType } from 'embla-carousel';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface Feature {
		title: string;
		text: string;
		image: string;
	}

	interface CarouselLabels {
		previous: string;
		next: string;
		pause: string;
		play: string;
		goToSlide: string;
	}

	interface Props {
		title: string;
		features: Feature[];
		labels: CarouselLabels;
	}

	let { title, features, labels }: Props = $props();

	let emblaApi = $state<EmblaCarouselType | null>(null);
	let selectedIndex = $state(0);
	let isPlaying = $state(false);
	let autoplayAllowed = $state(false);

	const emblaOptions = { loop: true };
	const emblaPlugins = [
		Autoplay({
			delay: 5000,
			playOnInit: false,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
			stopOnFocusIn: true
		})
	];

	const syncPlaying = () => {
		isPlaying = emblaApi?.plugins()?.autoplay?.isPlaying() ?? false;
	};

	const handleEmblaInit = (event: CustomEvent<EmblaCarouselType>) => {
		emblaApi = event.detail;
		selectedIndex = emblaApi.selectedScrollSnap();

		const onSelect = () => {
			selectedIndex = emblaApi!.selectedScrollSnap();
		};

		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
		emblaApi.on('autoplay:play', syncPlaying);
		emblaApi.on('autoplay:stop', syncPlaying);

		autoplayAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (autoplayAllowed) {
			emblaApi.plugins().autoplay?.play();
		}
		syncPlaying();
	};

	const scrollPrev = () => emblaApi?.scrollPrev();
	const scrollNext = () => emblaApi?.scrollNext();
	const scrollTo = (index: number) => emblaApi?.scrollTo(index);

	const toggleAutoplay = () => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay || !autoplayAllowed) return;
		if (autoplay.isPlaying()) {
			autoplay.stop();
		} else {
			autoplay.play();
		}
		syncPlaying();
	};

	const slideLabel = (index: number, featureTitle: string) => labels.goToSlide.replace('{index}', String(index + 1)).replace('{title}', featureTitle);

	const onControlKeydown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			scrollPrev();
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			scrollNext();
		}
	};
</script>

<section class="carousel" aria-roledescription="carousel" aria-label={title}>
	<div class="container">
		<PageContent>
			<div class="carousel-header">
				<Heading as="h2">{title}</Heading>
			</div>

			<div class="carousel-spotlight">
				<div class="embla">
					<div class="embla__viewport" use:useEmblaCarousel={{ options: emblaOptions, plugins: emblaPlugins }} onemblaInit={handleEmblaInit}>
						<div class="embla__container">
							{#each features as feature, index (feature.title)}
								<div
									class="embla__slide"
									role="group"
									aria-roledescription="slide"
									aria-label={`${index + 1} / ${features.length}`}
									aria-hidden={index === selectedIndex ? undefined : 'true'}
								>
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

				<div class="carousel-controls" role="group">
					<button type="button" class="carousel-btn" aria-label={labels.previous} onclick={scrollPrev} onkeydown={onControlKeydown}>
						<span aria-hidden="true">‹</span>
					</button>

					{#if autoplayAllowed}
						<button
							type="button"
							class="carousel-btn"
							aria-label={isPlaying ? labels.pause : labels.play}
							aria-pressed={isPlaying}
							onclick={toggleAutoplay}
							onkeydown={onControlKeydown}
						>
							<span aria-hidden="true">{isPlaying ? '❚❚' : '▶'}</span>
						</button>
					{/if}

					<button type="button" class="carousel-btn" aria-label={labels.next} onclick={scrollNext} onkeydown={onControlKeydown}>
						<span aria-hidden="true">›</span>
					</button>

					<div class="carousel-dots">
						{#each features as feature, index (feature.title)}
							<button
								type="button"
								class={['carousel-dot', index === selectedIndex && 'is-active']}
								aria-label={slideLabel(index, feature.title)}
								aria-current={index === selectedIndex ? 'true' : undefined}
								onclick={() => scrollTo(index)}
								onkeydown={onControlKeydown}
							></button>
						{/each}
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
		gap: var(--space-medium);
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

	.carousel-controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-small);
	}

	.carousel-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
		min-height: 2.5rem;
		padding: var(--space-small);
		border: 1px solid var(--line);
		border-radius: var(--border-radius);
		background: var(--content-background);
		color: var(--ink);
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
	}

	.carousel-btn:hover {
		background: var(--bg-soft);
	}

	.carousel-dots {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-small);
		margin-left: auto;
	}

	.carousel-dot {
		width: 0.75rem;
		height: 0.75rem;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: var(--content-background);
		cursor: pointer;
	}

	.carousel-dot.is-active {
		background: var(--accent);
		border-color: var(--accent-deep);
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

		.carousel-dots {
			margin-left: 0;
			width: 100%;
		}
	}
</style>
