<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import ContactCtaSection from '$lib/components/sections/ContactCtaSection.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import { consultingServiceIds, type ConsultingService } from '$lib/content/types';
	import { hrefFor } from '$lib/routes';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const page = $derived(data.content.consultingPage);
	const locale = $derived(data.locale);
</script>

<PageMeta meta={page.meta} pageKey="consulting" {locale} />

<PageShell>
	<PageHeader title={page.title} lead={page.lead} />

	<div class="services">
		{#each consultingServiceIds as key, i (key)}
			{@const service: ConsultingService = page.services[key]}
			<div id={key} class="service">
				<MediaArticleSection title={service.title} subtitle={service.subtitle} reverse={i % 2 === 0} flushTop={i === 0}>
					{#snippet content()}
						<ParagraphArray paragraphs={service.paragraphs} />
						<ul class="content-list">
							{#each service.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
						{#if service.relatedLink}
							<div class="related-link">
								<Link href={hrefFor(service.relatedLink.page, locale)}>{service.relatedLink.label}</Link>
							</div>
						{/if}
					{/snippet}
					{#snippet media()}
						<Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} priority={i === 0} />
					{/snippet}
				</MediaArticleSection>
			</div>
		{/each}
	</div>

	<ContactCtaSection cta={page.contactCta} {locale} />
</PageShell>

<style>
	.services {
		display: grid;
		gap: 1.5rem;
	}

	.service {
		scroll-margin-top: 7rem;
	}

	.related-link {
		margin-top: var(--space-medium);
	}
</style>
