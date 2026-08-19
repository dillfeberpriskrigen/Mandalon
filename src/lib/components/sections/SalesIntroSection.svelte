<script lang="ts">
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { Locale, ProcessContent, SalesIntroContent } from '$lib/content/types';
	import { hrefFor } from '$lib/routes';

	interface Props {
		salesIntro: SalesIntroContent;
		process: ProcessContent;
		locale: Locale | null;
		defaultLocale: Locale;
	}

	let { salesIntro, process, locale, defaultLocale }: Props = $props();

	const activeLocale = $derived(locale ?? defaultLocale);
</script>

<section class="intro">
	<div class="container">
		<PageContent>
			<Surface radius="large" padding="large">
				<div class="intro-copy">
					<Heading as="h2">{salesIntro.title}</Heading>

					<div class="intro-body">
						<div class="intro-text">
							<ParagraphArray paragraphs={salesIntro.paragraphs} />

							<div class="intro-actions">
								{#each salesIntro.actions as action, index (action.page)}
									<Button href={hrefFor(action.page, activeLocale)} variant={index === 0 ? 'primary' : 'secondary'}>
										{action.label}
									</Button>
								{/each}
							</div>
						</div>

						<div class="intro-media">
							<Image src={salesIntro.image.src} alt={salesIntro.image.alt} width={salesIntro.image.width} height={salesIntro.image.height} />
						</div>
					</div>
				</div>
			</Surface>

			<section class="divider-banner" aria-hidden="true">
				<div class="divider-banner__image"></div>
			</section>

			<Surface radius="large" padding="large">
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
			</Surface>
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

	.intro {
		padding: 0 0 var(--space-large);
	}

	.intro-copy {
		display: grid;
		gap: 0.7rem;
	}

	.intro-body {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
		gap: var(--space-large);
		align-items: start;
	}

	.intro-text {
		display: grid;
		gap: 0.7rem;
	}

	.intro-copy :global(p) {
		margin: 0;
	}

	.intro-media {
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.intro-media :global(img) {
		display: block;
		width: 100%;
		height: auto;
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

	@media (max-width: 780px) {
		.intro-body {
			grid-template-columns: 1fr;
		}

		.intro-media {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.process-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
