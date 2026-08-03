<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { Locale, NavLink } from '$lib/content/types';
	import type { PageKey } from '$lib/routes';
	import { hrefFor } from '$lib/routes';

	interface SalesIntro {
		title: string;
		paragraphs: string[];
		resource: {
			label: string;
			page: PageKey;
			text: string;
		};
		actions: NavLink[];
	}

	interface ProcessStep {
		title: string;
		text: string;
	}

	interface Process {
		title: string;
		steps: ProcessStep[];
	}

	interface Props {
		salesIntro: SalesIntro;
		process: Process;
		locale: Locale | null;
		defaultLocale: Locale;
	}

	let { salesIntro, process, locale, defaultLocale }: Props = $props();

	const activeLocale = $derived(locale ?? defaultLocale);
</script>

<section class="intro">
	<div class="container">
		<PageContent>
			<div class="intro-copy">
				<Heading as="h2">{salesIntro.title}</Heading>
				<ParagraphArray paragraphs={salesIntro.paragraphs} />

				<div class="intro-actions">
					{#each salesIntro.actions as action, index (action.page)}
						<Button href={hrefFor(action.page, activeLocale)} variant={index === 0 ? 'primary' : 'secondary'}>
							{action.label}
						</Button>
					{/each}
				</div>

				<div class="intro-resource">
					<Link href={hrefFor(salesIntro.resource.page, activeLocale)}>
						{salesIntro.resource.label}
					</Link>
					<Text as="span">{salesIntro.resource.text}</Text>
				</div>
			</div>

			<section class="divider-banner" aria-hidden="true">
				<div class="divider-banner__image"></div>
			</section>

			<div class="intro-process">
				<Heading as="h3">{process.title}</Heading>

				<div class="process-grid">
					{#each process.steps as step (step.title)}
						<article class="process-card">
							<Heading as="h3">{step.title}</Heading>
							<Text as="p">{step.text}</Text>
						</article>
					{/each}
				</div>
			</div>
		</PageContent>
	</div>
</section>

<style>
	.divider-banner {
		padding: 2rem 0 0;
	}

	.divider-banner__image {
		height: 20rem;
		border-radius: 1.25rem;
		background:
			linear-gradient(90deg, rgba(16, 35, 28, 0.24) 0%, rgba(16, 35, 28, 0.08) 100%),
			url('/mandalon/help-asic.webp') center 65% / cover no-repeat;
	}

	.intro-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-medium);
	}

	.intro-resource {
		display: grid;
		gap: 0.3rem;
		padding-top: 0.15rem;
	}

	.intro-resource :global(.link) {
		font-weight: var(--weight-bold);
		text-decoration: none;
		color: var(--ink);
	}

	.intro-resource :global(.link:hover) {
		color: var(--accent-deep);
	}

	.intro {
		padding: 5rem 0;
	}

	.intro-copy {
		display: grid;
		gap: 1.2rem;
	}

	.intro-process {
		display: grid;
		gap: 1rem;
		padding-top: 0.5rem;
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.process-card {
		padding: 0 0 0 1rem;
		border-left: 3px solid rgba(16, 35, 28, 0.2);
	}

	@media (max-width: 960px) {
		.process-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.process-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
