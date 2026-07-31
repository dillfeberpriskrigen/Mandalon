<script>
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.content.aboutPage.meta.title}</title>
	<meta name="description" content={data.content.aboutPage.meta.description} />
</svelte:head>

<PageShell>
	<PageHeader title={data.content.aboutPage.title} lead={data.content.aboutPage.lead} />

	<PageContent>
		<section class="narrative">
			<Heading as="h2">{data.content.aboutPage.introTitle}</Heading>
			{#each data.content.aboutPage.intro as paragraph, i (i)}
				<Text as="p">{paragraph}</Text>
			{/each}
		</section>
	</PageContent>

	<PageContent>
		<section class="story">
			<Heading as="h2">{data.content.aboutPage.storyTitle}</Heading>
			<Text as="p">{data.content.aboutPage.story}</Text>
		</section>
	</PageContent>

	<div class="surface-grid trust-panels">
		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">{data.content.aboutPage.certificationTitle}</Heading>
			<Text as="p">{data.content.aboutPage.certification}</Text>
			<div class="note">
				<Text as="p" variant="caption">{data.content.aboutPage.certificationNote}</Text>
			</div>
		</Surface>

		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">{data.content.aboutPage.referencesTitle}</Heading>
			<Text as="p">{data.content.aboutPage.referencesLead}</Text>

			<div class="lists">
				<div>
					<Heading as="h3">{data.content.aboutPage.referencesHeading}</Heading>
					<ul>
						{#each data.content.aboutPage.references as item, i (i)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>

				<div>
					<Heading as="h3">{data.content.aboutPage.researchProjectsHeading}</Heading>
					<ul>
						{#each data.content.aboutPage.researchProjects as item (item.title)}
							<li>
								<Link href={item.href} target="_blank" rel="noreferrer">{item.title}</Link>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</Surface>
	</div>
</PageShell>

<style>
	.narrative,
	.story {
		margin-top: 2rem;
	}

	.trust-panels {
		margin-top: var(--space-large);
	}

	.note {
		margin-top: 0.85rem;
	}

	.lists {
		display: grid;
		gap: 1.2rem;
		margin-top: 1rem;
	}

	ul {
		padding-left: 1.1rem;
	}

	li {
		color: var(--muted);
	}

	li + li {
		margin-top: 0.45rem;
	}
</style>
