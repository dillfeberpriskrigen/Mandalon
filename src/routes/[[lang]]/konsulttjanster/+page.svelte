<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.content.consultingPage.meta.title}</title>
	<meta name="description" content={data.content.consultingPage.meta.description} />
</svelte:head>

<PageShell>
	<PageHeader title={data.content.consultingPage.title} lead={data.content.consultingPage.lead} />

	<section class="intro-panel text-width">
		<h2>{data.content.consultingPage.introTitle}</h2>
		<p>{data.content.consultingPage.introText}</p>
	</section>

	<div class="services-grid">
		{#each data.content.consultingPage.services as service (service.title)}
			<article class="service-card">
				<h2>{service.title}</h2>
				<p>{service.text}</p>
				<ul>
					{#each service.points as point (point)}
						<li>{point}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</PageShell>

<style>
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
