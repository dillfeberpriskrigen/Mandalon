<svelte:head>
	<title>{data.content.consultingPage.meta.title}</title>
	<meta name="description" content={data.content.consultingPage.meta.description} />
</svelte:head>

<script>
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	const { data } = $props();
</script>

<SiteHeader {data} currentPath={data.locale === 'sv' ? 'konsulttjanster' : 'consulting'} />

<section class="consulting-page">
	<div class="container">
		<h1 class="page-title">{data.content.consultingPage.title}</h1>
		<p class="lead text-width">{data.content.consultingPage.lead}</p>

		<section class="intro-panel text-width">
			<h2>{data.content.consultingPage.introTitle}</h2>
			<p>{data.content.consultingPage.introText}</p>
		</section>

		<div class="services-grid">
			{#each data.content.consultingPage.services as service}
				<article class="service-card">
					<h2>{service.title}</h2>
					<p>{service.text}</p>
					<ul>
						{#each service.points as point}
							<li>{point}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<SiteFooter {data} />

<style>
	.consulting-page {
		padding: 4rem 0 6rem;
	}

	h1,
	h2,
	p,
	ul {
		margin: 0;
	}

	.lead {
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
	}

	.intro-panel {
		margin-top: 2.2rem;
		padding: 1.7rem 1.8rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.92);
	}

	.intro-panel h2 {
		margin-bottom: 0.7rem;
		font-size: 1.55rem;
		line-height: 1.1;
	}

	.intro-panel p,
	.service-card p {
		line-height: 1.75;
		color: #506458;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.4rem;
	}

	.service-card {
		padding: 1.7rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
	}

	.service-card h2 {
		margin-bottom: 0.75rem;
		font-size: 1.8rem;
		line-height: 1.05;
	}

	.service-card ul {
		margin-top: 1rem;
		padding-left: 1.1rem;
		color: #10231c;
	}

	.service-card li::marker {
		color: #d09212;
	}

	.service-card li + li {
		margin-top: 0.55rem;
	}

	@media (max-width: 780px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
