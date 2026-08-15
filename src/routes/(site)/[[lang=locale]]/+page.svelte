<script lang="ts">
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import FeatureCarousel from '$lib/components/sections/FeatureCarousel.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import SalesIntroSection from '$lib/components/sections/SalesIntroSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const carouselLabels = $derived(
		data.locale === 'en'
			? {
					previous: 'Previous slide',
					next: 'Next slide',
					goToSlide: 'Go to slide {index}: {title}'
				}
			: {
					previous: 'Föregående bild',
					next: 'Nästa bild',
					goToSlide: 'Gå till bild {index}: {title}'
				}
	);
</script>

<PageMeta meta={data.content.meta} pageKey="home" locale={data.locale} />

<HeroSection title={data.content.hero.title} copy={data.content.hero.copy} />

<FeatureCarousel title={data.content.consulting.title} features={data.content.consulting.features} labels={carouselLabels} locale={data.locale} />

<SalesIntroSection salesIntro={data.content.salesIntro} process={data.content.process} locale={data.locale} defaultLocale={data.defaultLocale} />
