<script>
	import useEmblaCarousel from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	const { data } = $props();

	/** @type {import('embla-carousel').EmblaCarouselType | null} */
	let emblaApi = null;
	const emblaOptions = { loop: true };
	const emblaPlugins = [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })];

	/** @param {CustomEvent<import('embla-carousel').EmblaCarouselType>} event */
	const handleEmblaInit = (event) => {
		emblaApi = event.detail;
		emblaApi.plugins().autoplay?.play();
	};
</script>

<svelte:head>
	<title>{data.content.meta.title}</title>
	<meta name="description" content={data.content.meta.description} />
</svelte:head>

<section class="hero">
	<div class="container hero-content">
		<Heading as="h1">{data.content.hero.title}</Heading>
		<div class="hero-copy">
			<Text as="p" variant="lead">{data.content.hero.copy}</Text>
		</div>
	</div>
</section>

<section class="carousel">
	<div class="container">
		<PageContent>
			<div class="carousel-header">
				<Heading as="h2">{data.content.consulting.title}</Heading>
			</div>

			<div class="carousel-spotlight">
				<div class="embla">
					<div class="embla__viewport" use:useEmblaCarousel={{ options: emblaOptions, plugins: emblaPlugins }} onemblaInit={handleEmblaInit}>
						<div class="embla__container">
							{#each data.content.consulting.features as feature (feature.title)}
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

<section class="intro">
	<div class="container">
		<PageContent>
			<div class="intro-copy">
				<Heading as="h2">{data.content.salesIntro.title}</Heading>
				<ParagraphArray paragraphs={data.content.salesIntro.paragraphs} />

				<div class="intro-resource">
					<Link href={data.content.salesIntro.resource.href} target="_blank" rel="noreferrer">
						{data.content.salesIntro.resource.label}
					</Link>
					<Text as="span">{data.content.salesIntro.resource.text}</Text>
				</div>
			</div>

			<section class="divider-banner" aria-hidden="true">
				<div class="divider-banner__image"></div>
			</section>

			<div class="intro-process">
				<Heading as="h3">{data.content.process.title}</Heading>

				<div class="process-grid">
					{#each data.content.process.steps as step (step.title)}
						<article class="process-card">
							<Heading as="h3">{step.title}</Heading>
							<Text as="p">{step.text}</Text>
						</article>
					{/each}
				</div>
			</div>
		</PageContent>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 21rem;
		display: grid;
		place-items: center;
		background: linear-gradient(45deg, rgba(52, 57, 114, 0.94) 0%, rgba(52, 57, 114, 0.84) 100%);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 5.5rem 0 4.5rem;
		text-align: center;
		color: white;
	}

	.hero-content :global(.page-title) {
		margin-inline: auto;
		text-wrap: balance;
	}

	.hero-copy {
		margin: 1.4rem auto 0;
		max-width: var(--text-width);
	}

	.hero-copy :global(p) {
		color: rgba(255, 255, 255, 0.9);
	}

	.divider-banner {
		padding: 2rem 0 0;
	}

	.divider-banner__image {
		height: 20rem;
		border-radius: 1.25rem;
		background:
			linear-gradient(90deg, rgba(16, 35, 28, 0.24) 0%, rgba(16, 35, 28, 0.08) 100%),
			url('/mandalon/help-asic.jpg') center 65% / cover no-repeat;
	}

	.intro-resource {
		display: grid;
		gap: 0.3rem;
		padding-top: 0.15rem;
	}

	.intro-resource :global(.link) {
		font-weight: var(--weight-bold);
		text-decoration: none;
		color: var(--ink);
	}

	.intro-resource :global(.link:hover) {
		color: var(--accent-deep);
	}

	.intro,
	.carousel {
		padding: 5rem 0;
	}

	.intro-copy {
		display: grid;
		gap: 1.2rem;
	}

	.intro-process {
		display: grid;
		gap: 1rem;
		padding-top: 0.5rem;
	}

	.intro-process :global(.page-sub-section) {
		color: var(--ink);
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.process-card {
		padding: 0 0 0 1rem;
		border-left: 3px solid rgba(16, 35, 28, 0.2);
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

	@media (max-width: 960px) {
		.process-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.process-grid {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: 0;
		}

		.hero-content {
			padding-top: 4.5rem;
		}

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
