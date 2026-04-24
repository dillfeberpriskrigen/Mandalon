<svelte:head>
	<title>{data.content.chipSensorsPage.meta.title}</title>
	<meta name="description" content={data.content.chipSensorsPage.meta.description} />
</svelte:head>

<script>
	const { data } = $props();
</script>

<section class="chip-page">
	<div class="container">
		<h1 class="page-title">{data.content.chipSensorsPage.title}</h1>
		<p class="lead text-width">{data.content.chipSensorsPage.lead}</p>

		<div class="intro-stack text-width">
			{#each data.content.chipSensorsPage.intro as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<p class="intro-stack text-width">{data.content.chipSensorsPage.capabilitiesPresentation}</p>
		<table class="capabilities-table">
			<tbody>
				{#each data.content.chipSensorsPage.capabilities as capability}
					<tr>
						<td>{capability.name}</td>
						<td>{capability.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>

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

<style>
	.chip-page {
		padding: 4rem 0 6rem;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	.lead {
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
	}

	.intro-stack {
		display: grid;
		gap: 1rem;
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

	.capabilities-table {
		max-width: 48rem;
		margin-top: 5rem;
		margin-top: 5rem;
		border: 1px solid rgba(16, 35, 28, 0.18);
		border-radius: 1rem;
		border-collapse: separate;
		border-spacing: 0;
		margin-left:auto;
		margin-right: auto;
	}

	.capabilities-table td {
		padding: 1rem 1.25rem;
	}

	.capabilities-table tr:not(:last-child) td {
		border-bottom: 1px solid rgba(16, 35, 28, 0.12);
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
