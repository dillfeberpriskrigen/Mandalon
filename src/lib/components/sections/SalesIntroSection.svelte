<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	interface SalesIntro {
		title: string;
		paragraphs: string[];
		resource: {
			label: string;
			href: string;
			text: string;
		};
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
	}

	let { salesIntro, process }: Props = $props();
</script>

<section class="intro">
	<div class="container">
		<PageContent>
			<div class="intro-copy">
				<Heading as="h2">{salesIntro.title}</Heading>
				<ParagraphArray paragraphs={salesIntro.paragraphs} />

				<div class="intro-resource">
					<Link href={salesIntro.resource.href} target="_blank" rel="noreferrer">
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
			url('/mandalon/help-asic.jpg') center 65% / cover no-repeat;
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
