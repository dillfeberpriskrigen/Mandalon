<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import ContactCtaSection from '$lib/components/sections/ContactCtaSection.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { aboutIsoSectionId } from '$lib/content/pages/about';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const page = $derived(data.content.aboutPage);
	const locale = $derived(data.locale);
</script>

<PageMeta meta={page.meta} pageKey="about" {locale} />

<PageShell>
	<PageHeader title={page.title} lead={page.lead} />

	<MediaArticleSection title={page.introTitle} reverse={true} flushTop>
		{#snippet content()}
			<ParagraphArray paragraphs={page.intro} />
		{/snippet}
		{#snippet media()}
			<Image src={page.introImage.src} alt={page.introImage.alt} width={page.introImage.width} height={page.introImage.height} priority />
		{/snippet}
	</MediaArticleSection>

	<div class="surface-grid story-row">
		<Surface as="section" radius="large" padding="large" shadow="medium">
			<div class="section-heading">
				<Heading as="h2">{page.storyTitle}</Heading>
			</div>
			<Text as="p">{page.story}</Text>
		</Surface>

		<div class="certification" id={aboutIsoSectionId}>
			<Surface as="section" radius="large" padding="large" shadow="medium">
				<div class="section-heading">
					<Heading as="h2">{page.certificationTitle}</Heading>
				</div>
				<Text as="p">{page.certification}</Text>
				<div class="note">
					<Text as="p" variant="caption">{page.certificationNote}</Text>
				</div>
				<div class="certificate-link">
					<Link href={page.certificationPdf.href}>{page.certificationPdf.label}</Link>
				</div>
			</Surface>
		</div>
	</div>

	<div class="references">
		<Surface as="section" radius="large" padding="large" shadow="medium">
			<div class="section-heading">
				<Heading as="h2">{page.referencesTitle}</Heading>
			</div>
			<Text as="p">{page.referencesLead}</Text>

			<div class="lists">
				<div>
					<Heading as="h3">{page.referencesHeading}</Heading>
					<ul class="content-list">
						{#each page.references as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>

				<div>
					<Heading as="h3">{page.researchProjectsHeading}</Heading>
					<ul class="content-list">
						{#each page.researchProjects as item (item.title)}
							<li>
								{#if item.href}
									<Link href={item.href}>{item.title}</Link>
								{:else}
									{item.title}
								{/if}
							</li>
						{/each}
					</ul>
					<div class="research-profile">
						<Link href={page.researchProfile.href}>{page.researchProfile.label}</Link>
					</div>
				</div>
			</div>
		</Surface>
	</div>

	<ContactCtaSection cta={page.contactCta} {locale} />
</PageShell>

<style>
	.story-row {
		margin-top: 1.5rem;
		align-items: stretch;
	}

	.story-row :global(.surface) {
		height: 100%;
		min-width: 0;
	}

	.certification {
		height: 100%;
		min-width: 0;
		scroll-margin-top: 7rem;
	}

	.certificate-link {
		margin-top: var(--space-medium);
	}

	.references {
		margin-top: 1.5rem;
	}

	.section-heading {
		margin-bottom: var(--space-medium);
	}

	.note {
		margin-top: 0.85rem;
	}

	.lists {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-large);
		margin-top: 1rem;
	}

	.research-profile {
		margin-top: var(--space-medium);
	}

	@media (max-width: 780px) {
		.lists {
			grid-template-columns: 1fr;
		}
	}
</style>
