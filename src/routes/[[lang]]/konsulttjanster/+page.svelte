<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.content.consultingPage.meta.title}</title>
	<meta name="description" content={data.content.consultingPage.meta.description} />
</svelte:head>

<PageShell>
	<PageHeader title={data.content.consultingPage.title} lead={data.content.consultingPage.lead} />

	<div class="intro">
		<Surface as="section" radius="large" padding="large">
			<div class="text-width">
				<Heading as="h2">{data.content.consultingPage.introTitle}</Heading>
				<Text as="p">{data.content.consultingPage.introText}</Text>
			</div>
		</Surface>
	</div>

	<div class="services-grid">
		{#each data.content.consultingPage.services as service (service.title)}
			<Surface as="article" radius="large" padding="large">
				<Heading as="h2">{service.title}</Heading>
				<Text as="p">{service.text}</Text>
				<ul>
					{#each service.points as point (point)}
						<li>{point}</li>
					{/each}
				</ul>
			</Surface>
		{/each}
	</div>
</PageShell>

<style>
	.intro {
		margin-top: 2.2rem;
	}

	.intro :global(p),
	.services-grid :global(p) {
		color: var(--muted);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.4rem;
	}

	ul {
		margin-top: 1rem;
		padding-left: 1.1rem;
		color: var(--ink);
	}

	li::marker {
		color: var(--accent-deep);
	}

	li + li {
		margin-top: 0.55rem;
	}

	@media (max-width: 780px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
