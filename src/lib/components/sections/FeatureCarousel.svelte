<script lang="ts">
	import useEmblaCarousel from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { EmblaCarouselType } from 'embla-carousel';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { ConsultingHomeContent, Locale } from '$lib/content/types';
	import { hrefFor } from '$lib/routes';

	interface Props {
		content: ConsultingHomeContent;
		locale: Locale;
	}

	let { content, locale }: Props = $props();

	const title = $derived(content.title);
	const intro = $derived(content.intro);
	const features = $derived(content.features);
	const labels = $derived(content.labels);

	let emblaApi = $state<EmblaCarouselType | null>(null);
	let selectedIndex = $state(0);

	const emblaOptions = { loop: true };
	const emblaPlugins = [
		Autoplay({
			delay: 8000,
			playOnInit: false,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
			stopOnFocusIn: true
		})
	];

	const handleEmblaInit = (event: CustomEvent<EmblaCarouselType>) => {
		emblaApi = event.detail;
		selectedIndex = emblaApi.selectedScrollSnap();

		const onSelect = () => {
			selectedIndex = emblaApi!.selectedScrollSnap();
		};

		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);

		const autoplayAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (autoplayAllowed) {
			emblaApi.plugins().autoplay?.play();
		}
	};

	const scrollPrev = () => emblaApi?.scrollPrev();
	const scrollNext = () => emblaApi?.scrollNext();
	const scrollTo = (index: number) => emblaApi?.scrollTo(index);

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

{#snippet arrowIcon()}
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M15 5 8 12l7 7" />
	</svg>
{/snippet}

<section class="carousel" aria-roledescription="carousel" aria-label={title}>
	<div class="container">
		<PageContent>
			<div class="carousel-header">
				<Surface radius="large" padding="large">
					<Heading as="h2">{title}</Heading>
					<div class="carousel-intro">
						<Text as="p" variant="lead">{intro}</Text>
					</div>
				</Surface>
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
									inert={index !== selectedIndex}
								>
									<Surface as="article" radius="large" padding="none">
										<div class="carousel-media">
											<Image
												src={feature.image.src}
												alt={feature.image.alt}
												width={feature.image.width}
												height={feature.image.height}
												sizes="(max-width: 640px) calc(100vw - 2rem), min(54rem, calc(100vw - 2rem))"
											/>
										</div>
										<a class="carousel-copy" href={hrefFor(feature.page, locale, feature.section)}>
											<Heading as="h3">{feature.title}</Heading>
											<Text as="p">{feature.text}</Text>
										</a>
									</Surface>
								</div>
							{/each}
						</div>
					</div>

					<div class="carousel-nav" role="group">
						<button type="button" class="carousel-arrow carousel-arrow-prev" aria-label={labels.previous} onclick={scrollPrev} onkeydown={onControlKeydown}>
							{@render arrowIcon()}
						</button>
						<button type="button" class="carousel-arrow carousel-arrow-next" aria-label={labels.next} onclick={scrollNext} onkeydown={onControlKeydown}>
							{@render arrowIcon()}
						</button>
					</div>
				</div>

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
		</PageContent>
	</div>
</section>

<style>
	.carousel {
		padding: var(--space-large) 0 5rem;
	}

	.carousel-header {
		margin-bottom: 2rem;
	}

	.carousel-intro {
		margin-top: 1.25rem;
	}

	.carousel-spotlight {
		display: grid;
		gap: var(--space-medium);
		min-width: 0;
	}

	.embla {
		position: relative;
		min-width: 0;
	}

	.embla__viewport {
		overflow: hidden;
		min-width: 0;
	}

	.carousel-nav {
		position: absolute;
		inset: 0 auto auto 0;
		z-index: 1;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: var(--radius-large) var(--radius-large) 0 0;
		pointer-events: none;
	}

	.carousel-arrow {
		pointer-events: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.25rem;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--on-photo);
		cursor: pointer;
		opacity: 0.8;
		transition:
			opacity 0.2s ease,
			background 0.2s ease;
	}

	.carousel-arrow svg {
		width: 2rem;
		height: 2rem;
		filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.7));
	}

	.carousel-arrow-prev {
		left: 0;
	}

	.carousel-arrow-next {
		right: 0;
	}

	.carousel-arrow-next svg {
		transform: scaleX(-1);
	}

	.carousel-arrow:hover {
		opacity: 1;
		background: linear-gradient(to right, color-mix(in srgb, var(--ink) 32%, transparent), transparent);
	}

	.carousel-arrow-next:hover {
		background: linear-gradient(to left, color-mix(in srgb, var(--ink) 32%, transparent), transparent);
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

	.carousel-media :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-copy {
		display: block;
		padding: 1.5rem;
		color: inherit;
		text-decoration: none;
		background: transparent;
	}

	.carousel-copy:hover,
	.carousel-copy:focus-visible {
		background: var(--link-hover-bg);
	}

	.carousel-copy :global(.page-sub-section) {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.15em;
	}

	.carousel-copy:hover :global(.page-sub-section),
	.carousel-copy:focus-visible :global(.page-sub-section) {
		text-decoration-color: currentColor;
	}

	@media (prefers-reduced-motion: no-preference) {
		.carousel-copy {
			transition: background-color 0.18s ease;
		}

		.carousel-copy :global(.page-sub-section) {
			transition: text-decoration-color 0.18s ease;
		}
	}

	.carousel-dots {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--space-small);
	}

	.carousel-dot {
		position: relative;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		transition: width 0.25s ease;
	}

	.carousel-dot::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 999px;
		background: var(--muted);
		opacity: 0.35;
		transform: translate(-50%, -50%);
		transition:
			width 0.25s ease,
			opacity 0.25s ease,
			box-shadow 0.25s ease;
	}

	.carousel-dot.is-active {
		width: 2.5rem;
	}

	.carousel-dot.is-active::after {
		width: 2rem;
		opacity: 1;
		background: var(--accent);
		box-shadow: 0 0 0 2px var(--accent-deep);
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-arrow,
		.carousel-dot,
		.carousel-dot::after {
			transition: none;
		}
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
			width: 100%;
		}
	}
</style>
