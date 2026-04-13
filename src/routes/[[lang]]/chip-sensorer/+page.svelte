<svelte:head>
	<title>{data.content.chipSensorsPage.meta.title}</title>
	<meta name="description" content={data.content.chipSensorsPage.meta.description} />
</svelte:head>

<script>
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	const { data } = $props();
</script>

<SiteHeader {data} currentPath={data.locale === 'sv' ? 'chip-sensorer' : 'chip-sensors'} />

<section class="chip-page">
	<div class="container">
		<h1>{data.content.chipSensorsPage.title}</h1>
		<p class="lead">{data.content.chipSensorsPage.lead}</p>

		<div class="intro-stack">
			{#each data.content.chipSensorsPage.intro as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<div class="areas-flow">
			{#each data.content.chipSensorsPage.areas as area, index}
				<article class:reverse={index % 2 === 1} class="area-section">
					<div class="area-media">
						<img src={area.image} alt={area.imageAlt} />
					</div>
					<div class="area-copy">
						<h2>{area.title}</h2>
						{#if area.subtitle}
							<p class="subtitle">{area.subtitle}</p>
						{/if}
						{#each area.paragraphs as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<SiteFooter {data} />

<style>
	.container {
		width: min(1080px, calc(100vw - 2rem));
		margin: 0 auto;
	}

	.chip-page {
		padding: 4rem 0 6rem;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		max-width: 10ch;
		font-size: clamp(3rem, 8vw, 5.6rem);
		line-height: 0.95;
	}

	.lead {
		max-width: 54rem;
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
	}

	.intro-stack {
		display: grid;
		gap: 1rem;
		max-width: 58rem;
		margin-top: 2rem;
	}

	.intro-stack p,
	.area-copy p {
		line-height: 1.75;
		color: #506458;
	}

	.areas-flow {
		display: grid;
		gap: 1.5rem;
		margin-top: 2.5rem;
	}

	.area-section {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
		align-items: center;
		gap: 1.5rem;
		padding: 1.35rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
	}

	.area-section.reverse {
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
	}

	.area-section.reverse .area-media {
		order: 2;
	}

	.area-section.reverse .area-copy {
		order: 1;
	}

	.area-media img {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 260px;
		object-fit: cover;
		border-radius: 1.1rem;
	}

	.area-copy {
		display: grid;
		gap: 0.9rem;
	}

	.area-copy h2 {
		font-size: 1.8rem;
		line-height: 1.05;
	}

	.subtitle {
		font-size: 1.05rem;
		font-weight: 700;
		color: #10231c;
	}

	@media (max-width: 780px) {
		.area-section,
		.area-section.reverse {
			grid-template-columns: 1fr;
		}

		.area-section.reverse .area-media,
		.area-section.reverse .area-copy {
			order: initial;
		}
	}
</style>
