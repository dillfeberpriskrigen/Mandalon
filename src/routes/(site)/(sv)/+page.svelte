<script lang="ts">
	import FeatureCarousel from '$lib/components/sections/FeatureCarousel.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import SalesIntroSection from '$lib/components/sections/SalesIntroSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.content.meta.title}</title>
	<meta name="description" content={data.content.meta.description} />
</svelte:head>

<HeroSection title={data.content.hero.title} copy={data.content.hero.copy} />

<FeatureCarousel title={data.content.consulting.title} features={data.content.consulting.features} />

<SalesIntroSection salesIntro={data.content.salesIntro} process={data.content.process} locale={data.locale} defaultLocale={data.defaultLocale} />
