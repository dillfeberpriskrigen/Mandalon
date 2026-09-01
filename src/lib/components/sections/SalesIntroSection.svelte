<script lang="ts">
	import type { Snippet } from 'svelte';
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
		children?: Snippet;
		after?: Snippet;
	}

	let { salesIntro, process, locale, defaultLocale, children, after }: Props = $props();

	const activeLocale = $derived(locale ?? defaultLocale);
</script>

<section class="intro">
	<div class="container">
		<PageContent>
			<Surface radius="large" padding="large">
				<div class="intro-copy">
					{#if salesIntro.title}
						<div class="intro-title">
							<Heading as="h2">{salesIntro.title}</Heading>
						</div>
					{/if}

					<div class="intro-text">
						<ParagraphArray paragraphs={salesIntro.paragraphs} />

						<ul class="content-list">
							{#each salesIntro.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>

						<div class="intro-actions">
							{#each salesIntro.actions as action (action.page)}
								<Button href={hrefFor(action.page, activeLocale)} variant="primary">
									{action.label}
								</Button>
							{/each}
						</div>
					</div>

					<div class="intro-media">
						<picture>
							<source media="(max-width: 780px)" srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
							<source media="(min-width: 781px)" srcset={salesIntro.image.src} />
							<Image src={salesIntro.image.src} alt={salesIntro.image.alt} width={salesIntro.image.width} height={salesIntro.image.height} sizes="16rem" />
						</picture>
					</div>
				</div>
			</Surface>

			{@render children?.()}

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

			{@render after?.()}
		</PageContent>
	</div>
</section>

<style>
	.divider-banner {
		padding: 2rem 0 1rem;
	}

	.divider-banner__image {
		height: 20rem;
		border-radius: 1.25rem;
		background:
			linear-gradient(90deg, var(--photo-scrim) 0%, var(--photo-scrim-soft) 100%),
			url('/mandalon/help-asic.webp') center 65% / cover no-repeat;
	}

	.intro-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-medium);
	}

	.intro {
		padding: 0 0 5rem;
	}

	.intro-copy {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
		gap: var(--space-large);
		align-items: stretch;
	}

	.intro-title {
		grid-column: 1 / -1;
	}

	.intro-text {
		display: grid;
		gap: var(--space-large);
		align-content: start;
	}

	.intro-copy :global(p) {
		margin: 0;
	}

	.intro-media {
		position: relative;
		border-radius: var(--border-radius);
		overflow: hidden;
		min-height: 0;
	}

	.intro-media picture {
		position: absolute;
		inset: 0;
		display: block;
	}

	.intro-media :global(img) {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
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
		border-left: 3px solid color-mix(in srgb, var(--ink) 20%, transparent);
	}

	@media (max-width: 960px) {
		.process-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 780px) {
		.intro-copy {
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
