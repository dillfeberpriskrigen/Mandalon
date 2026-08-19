<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
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
				<MediaArticleSection title={service.title} subtitle={service.subtitle} reverse={i % 2 === 0}>
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

	<div class="contact-cta">
		<Surface as="section" radius="large" padding="large">
			<div class="contact-cta-inner">
				<div>
					<Heading as="h2">{page.contactCta.title}</Heading>
					<Text as="p">{page.contactCta.text}</Text>
				</div>
				<Button href={hrefFor(page.contactCta.page, locale)}>{page.contactCta.label}</Button>
			</div>
		</Surface>
	</div>
</PageShell>

<style>
	.services {
		margin-top: 2.2rem;
		display: grid;
		gap: 1.5rem;
	}

	.service {
		scroll-margin-top: 7rem;
	}

	.related-link {
		margin-top: var(--space-medium);
	}

	.contact-cta {
		margin-top: 3rem;
	}

	.contact-cta-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
	}
</style>
