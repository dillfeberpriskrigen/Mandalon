<script lang="ts">
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<PageMeta meta={data.content.consultingPage.meta} pageKey="consulting" locale={data.locale} />

<PageShell>
	<PageHeader title={data.content.consultingPage.title} lead={data.content.consultingPage.lead} />

	<div class="intro">
		<Surface as="section" radius="large" padding="large">
			<PageContent>
				<Heading as="h2">{data.content.consultingPage.introTitle}</Heading>
				<Text as="p">{data.content.consultingPage.introText}</Text>
			</PageContent>
		</Surface>
	</div>

	<div class="surface-grid services">
		{#each data.content.consultingPage.services as service (service.title)}
			<Surface as="article" radius="large" padding="large">
				<Heading as="h2">{service.title}</Heading>
				<Text as="p">{service.text}</Text>
				<ul class="content-list">
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
</style>
