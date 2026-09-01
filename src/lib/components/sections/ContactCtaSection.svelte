<script lang="ts">
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { ContactCtaContent, Locale } from '$lib/content/types';
	import { hrefFor } from '$lib/routes';

	interface Props {
		cta: ContactCtaContent;
		locale: Locale;
	}

	let { cta, locale }: Props = $props();

	const href = $derived(hrefFor(cta.page, locale));
</script>

<div class="contact-cta">
	<Surface as="section" radius="large" padding="large">
		<div class="contact-cta-inner">
			<div>
				<Heading as="h2">{cta.title}</Heading>
				<Text as="p">{cta.text}</Text>
			</div>
			<Button {href}>{cta.label}</Button>
		</div>
	</Surface>
</div>

<style>
	.contact-cta {
		margin-top: var(--space-section);
	}

	.contact-cta-inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-medium);
	}
</style>
