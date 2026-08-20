<script lang="ts">
	import DesignGuideBody from '$lib/components/content/DesignGuideBody.svelte';
	import DesignGuideToc from '$lib/components/content/DesignGuideToc.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import ContactCtaSection from '$lib/components/sections/ContactCtaSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { designGuideBody, designGuidePdfHref, designGuideToc } from '$lib/content/pages/designGuideBody';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const content = $derived(data.content.designGuidePage);
	const locale = $derived(data.locale);
</script>

<PageMeta meta={content.meta} pageKey="designGuide" locale={data.locale} />

<div class="guide-layout">
	<PageShell>
		<PageHeader title={content.title} lead={content.intro} />

		{#if content.languageNote}
			<div class="guide-note">
				<Text as="p" variant="caption">{content.languageNote}</Text>
			</div>
		{/if}

		<div class="guide-intro">
			<Surface as="section" radius="large" padding="large">
				<PageContent>
					<Heading as="h2">{content.articleIntroTitle}</Heading>
					<Text as="p">{content.articleIntroBody}</Text>
					<div class="guide-download">
						<Button href={designGuidePdfHref}>{content.downloadLabel}</Button>
					</div>
				</PageContent>
			</Surface>
		</div>

		<div class="docs-row">
			<div class="docs-toc">
				<Surface radius="large" padding="large">
					<DesignGuideToc title={content.tocTitle} items={designGuideToc} />
				</Surface>
			</div>
			<div class="docs-article">
				<Surface as="article" radius="large" padding="large">
					<DesignGuideBody blocks={designGuideBody} />
				</Surface>
			</div>
		</div>

		<ContactCtaSection cta={content.contactCta} {locale} />
	</PageShell>
</div>

<style>
	.guide-layout {
		--container-width: var(--container-width-wide);
	}

	.guide-note {
		margin-top: var(--space-medium);
	}

	.guide-intro {
		margin-top: var(--space-large);
	}

	.guide-download {
		margin-top: var(--space-medium);
	}

	.docs-row {
		display: grid;
		grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
		gap: var(--space-large);
		align-items: start;
		margin-top: var(--space-large);
	}

	.docs-toc {
		position: sticky;
		top: 5.5rem;
		min-width: 0;
		max-height: calc(100dvh - 5.5rem - var(--space-large));
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	.docs-article {
		min-width: 0;
	}

	@media (max-width: 900px) {
		.docs-row {
			grid-template-columns: 1fr;
		}

		.docs-toc {
			position: static;
			max-height: none;
			overflow: visible;
		}
	}
</style>
