<script lang="ts">
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import FeatureCarousel from '$lib/components/sections/FeatureCarousel.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import SalesIntroSection from '$lib/components/sections/SalesIntroSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<PageMeta meta={data.content.meta} pageKey="home" locale={data.locale} />

<HeroSection title={data.content.hero.title} copy={data.content.hero.copy} />

<SalesIntroSection salesIntro={data.content.salesIntro} process={data.content.process} locale={data.locale} defaultLocale={data.defaultLocale}>
	<FeatureCarousel content={data.content.consulting} locale={data.locale} />
</SalesIntroSection>
