<script>
	import useEmblaCarousel from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';

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

<div class="container-wide">
	<section class="hero">
		<div class="container hero-content">
			<h1>{data.content.hero.title}</h1>
			<p class="hero-copy text-width">{data.content.hero.copy}</p>
		</div>
	</section>

	<section class="carousel">
		<div class="carousel-header container">
			<div class="section-heading section-heading--tight">
				<h2>{data.content.consulting.title}</h2>
			</div>
		</div>

		<div class="container">
			<div class="carousel-spotlight">
				<div class="embla">
					<div class="embla__viewport" use:useEmblaCarousel={{ options: emblaOptions, plugins: emblaPlugins }} onemblaInit={handleEmblaInit}>
						<div class="embla__container">
							{#each data.content.consulting.features as feature (feature.title)}
								<article class="embla__slide carousel-slide">
									<div class="carousel-media">
										<img src={feature.image} alt={feature.title} />
									</div>
									<div class="carousel-copy">
										<h3>{feature.title}</h3>
										<p>{feature.text}</p>
									</div>
								</article>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="intro">
		<div class="container intro-copy intro-copy--wide">
			<h2>{data.content.salesIntro.title}</h2>
			{#each data.content.salesIntro.paragraphs as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}

			<p class="intro-resource">
				<a href={data.content.salesIntro.resource.href} target="_blank" rel="noreferrer">
					{data.content.salesIntro.resource.label}
				</a>
				<span>{data.content.salesIntro.resource.text}</span>
			</p>

			<section class="divider-banner" aria-hidden="true">
				<div class="divider-banner__image"></div>
			</section>

			<div class="intro-process">
				<h3 class="intro-process-title">{data.content.process.title}</h3>

				<div class="process-grid">
					{#each data.content.process.steps as step (step.title)}
						<article class="process-card">
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div>

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

	h1 {
		max-width: 22ch;
		margin-inline: auto;
		font-size: clamp(1.7rem, 4vw, 3rem);
		line-height: 1.05;
		text-wrap: balance;
	}

	.hero-copy {
		margin: 1.4rem auto 0;
		font-size: 1.12rem;
		line-height: 1.7;
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

	h2 {
		font-size: clamp(2rem, 3.5vw, 3.6rem);
		line-height: 1;
		text-wrap: balance;
	}

	.intro-copy p,
	.process-card p,
	.carousel-copy p {
		line-height: 1.7;
		color: var(--muted);
	}

	.intro-resource {
		display: grid;
		gap: 0.3rem;
		padding-top: 0.15rem;
	}

	.intro-resource a {
		font-weight: 700;
		color: var(--ink);
		text-decoration: none;
	}

	.intro-resource a:hover {
		color: var(--accent-deep);
	}

	.intro-resource span {
		color: var(--muted);
	}

	.intro,
	.carousel,
	:global(footer.site-footer) {
		padding: 5rem 0;
	}

	.intro-copy {
		display: grid;
		gap: 1.2rem;
	}

	.intro-copy--wide {
		max-width: 48rem;
	}

	.intro-process {
		display: grid;
		gap: 1rem;
		padding-top: 0.5rem;
	}

	.intro-process-title {
		font-size: clamp(1.45rem, 2.6vw, 2rem);
		line-height: 1.15;
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

	.carousel-copy h3 {
		font-size: 1.4rem;
		margin-bottom: 0.7rem;
	}

	.carousel-header {
		margin-bottom: 2rem;
	}

	.carousel .container {
		max-width: 48rem;
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

	.carousel-slide {
		display: grid;
		grid-template-columns: 1fr;
		border-radius: 1.5rem;
		background: #fff;
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

		.carousel-slide {
			min-height: 0;
		}

		.carousel .container,
		.carousel-spotlight,
		.embla,
		.embla__viewport,
		.embla__container,
		.embla__slide,
		.carousel-slide,
		.carousel-copy,
		.carousel-media {
			min-width: 0;
			max-width: 100%;
		}
	}
</style>
