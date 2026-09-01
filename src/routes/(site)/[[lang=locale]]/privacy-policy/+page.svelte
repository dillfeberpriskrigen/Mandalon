<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const content = $derived(data.content.privacyPage);
	const mailtoHref = $derived(`mailto:${content.contact.email}`);
</script>

<PageMeta meta={content.meta} pageKey="privacy" locale={data.locale} />

<PageShell>
	<PageHeader title={content.title} />

	{#if content.languageNote}
		<div class="language-note">
			<Surface as="section" radius="large" padding="large">
				<PageContent>
					<Text as="p" variant="caption">{content.languageNote}</Text>
				</PageContent>
			</Surface>
		</div>
	{/if}

	<div class="policy">
		<Surface as="article" radius="large" padding="large">
			<PageContent>
				<div class="document-meta">
					{#each content.documentMeta as line (line)}
						<Text as="div" variant="caption">{line}</Text>
					{/each}
				</div>

				{#each content.sections as section (section.title)}
					<section class="section">
						<Heading as="h2">{section.title}</Heading>
						<ParagraphArray paragraphs={section.paragraphs} />
					</section>
				{/each}

				<section class="section">
					<Heading as="h2">{content.contact.title}</Heading>
					<Text as="p">
						<Text as="span" weight="bold">{content.contact.addressLabel}:</Text>
						{#each content.contact.addressLines as line (line)}
							<br />{line}
						{/each}
					</Text>
					<Text as="p">
						<Text as="span" weight="bold">{content.contact.emailLabel}:</Text>
						<Link href={mailtoHref}>{content.contact.email}</Link>
					</Text>
				</section>
			</PageContent>
		</Surface>
	</div>
</PageShell>

<style>
	.language-note + .policy {
		margin-top: var(--space-large);
	}

	.document-meta {
		display: grid;
		gap: var(--space-small);
	}

	.section {
		margin-top: var(--space-large);
	}
</style>
