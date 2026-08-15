<script lang="ts">
	import DescriptionList from '$lib/components/data/DescriptionList.svelte';
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import ParagraphArray from '$lib/components/content/ParagraphArray.svelte';

	const demoDescriptionItems = [
		{ term: 'Wire bonding', description: 'Gold and aluminium wire for chip interconnects' },
		{ term: 'Die attach', description: 'Adhesive and eutectic attach for prototypes' },
		{ term: 'Encapsulation', description: 'Glob-top and cavity sealing for protection' }
	];

	const demoFaqs = [
		{
			question: 'What is this page for?',
			answer: 'A lab to demo shared components in isolation before using them on production pages.'
		},
		{
			question: 'Where do home sections live?',
			answer: 'HeroSection, FeatureCarousel, and SalesIntroSection are demonstrated on the home page.'
		},
		{
			question: 'Can I hardcode copy here?',
			answer: 'Yes. Experiment page copy is demo-only and does not need to live in siteContent.'
		}
	];
</script>

<PageShell>
	<PageHeader title="Experiment" lead="Component lab for typography, surfaces, sections, buttons, and tables." />

	<section class="lab-block">
		<Surface radius="large" padding="large">
			<Heading as="h2">Buttons</Heading>
			<div class="button-row">
				<Button href="#surface-demos" variant="primary">Primary link</Button>
				<Button href="https://mandalon.se" variant="secondary">Secondary link</Button>
				<Button type="button" variant="primary">Primary button</Button>
				<Button type="button" variant="secondary">Secondary button</Button>
			</div>
		</Surface>
	</section>

	<section class="lab-block">
		<Surface radius="large" padding="large">
			<Heading as="h2">Typography</Heading>
			<PageContent>
				<Heading as="h1">Heading h1 (page-title)</Heading>
				<Heading as="h2">Heading h2 (page-header)</Heading>
				<Heading as="h3">Heading h3 (page-sub-section)</Heading>

				<p>
					In-page <Link href="#surface-demos">link to surfaces</Link>
					and external
					<Link href="https://mandalon.se">mandalon.se</Link>.
					<Link href="#faq-demo" weight="bold">bold link</Link>.
				</p>

				<Text as="p"
					>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
					inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
					sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
					consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
					veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
					reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</Text
				>

				<Text as="p">Some other text</Text>
				<Text as="p">And even more</Text>

				<Text as="p" weight="bold" variant="label">When I add some more here, it all comes together nicely.</Text>
			</PageContent>

			<Text weight="thin">Thin weight.</Text>
			<Text weight="normal">Normal weight.</Text>
			<Text weight="bold">Bold weight.</Text>
			<Text weight="boldest">Boldest weight.</Text>

			<hr />

			<Text variant="caption" weight="thin">Thin weight.</Text>
			<Text variant="caption" weight="normal">Normal weight.</Text>
			<Text variant="caption" weight="bold">Bold weight.</Text>
			<Text variant="caption" weight="boldest">Boldest weight.</Text>

			<hr />

			<Text variant="label" weight="thin">Thin weight.</Text>
			<Text variant="label" weight="normal">Normal weight.</Text>
			<Text variant="label" weight="bold">Bold weight.</Text>
			<Text variant="label" weight="boldest">Boldest weight.</Text>
		</Surface>
	</section>

	<section id="surface-demos" class="lab-block">
		<Surface radius="large" padding="large">
			<Heading as="h2">Surface variants</Heading>

			<div class="surface-grid">
				<Surface radius="large" padding="large">
					<Text variant="lead" weight="bold">default / large / large</Text>
					<Text as="p">Brand surface fill with panel-sized radius and padding.</Text>
				</Surface>

				<Surface variant="muted" radius="medium" padding="medium">
					<Text variant="lead" weight="bold">muted / medium / medium</Text>
					<Text as="p">Muted background using --bg-soft.</Text>
				</Surface>

				<Surface variant="accent" radius="small" padding="small" shadow="small">
					<Text variant="lead" weight="bold">accent / small / small + shadow</Text>
					<Text as="p">Accent fill with small radius and shadow.</Text>
				</Surface>

				<Surface variant="warning" radius="large" padding="medium" shadow="medium">
					<Text variant="lead" weight="bold">warning / large / medium + shadow</Text>
					<Text as="p">Warning fill with medium shadow.</Text>
				</Surface>
			</div>
		</Surface>
	</section>

	<section class="lab-block">
		<Surface radius="large" padding="large">
			<Heading as="h2">DescriptionList</Heading>
			<DescriptionList items={demoDescriptionItems} />
		</Surface>
	</section>

	<section class="lab-block">
		<Surface radius="large" padding="large">
			<Heading as="h2">MediaArticleSection</Heading>
		</Surface>

		<MediaArticleSection title="Forward layout" subtitle="Media on the left by default">
			{#snippet content()}
				<ParagraphArray
					paragraphs={[
						'Shared media + text grid used on packaging, knowledge bank, and contact.',
						'Optional mediaMaxWidth caps portrait photos without page-local :global pierces.'
					]}
				/>
			{/snippet}
			{#snippet media()}
				<img src="/mandalon/design-chip.webp" alt="Demo chip packaging" />
			{/snippet}
		</MediaArticleSection>

		<MediaArticleSection title="Reversed layout" subtitle="Media on the right" reverse mediaMaxWidth="240px">
			{#snippet content()}
				<ParagraphArray paragraphs={['Reverse flips column order on desktop. mediaMaxWidth is set here to 240px.']} />
			{/snippet}
			{#snippet media()}
				<img src="/mandalon/Jonatan.webp" alt="Demo portrait" />
			{/snippet}
		</MediaArticleSection>
	</section>

	<div id="faq-demo">
		<FaqSection title="FAQ demo" items={demoFaqs} />
	</div>
</PageShell>

<style>
	.lab-block {
		margin-top: 2.5rem;
	}

	.button-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1rem;
	}
</style>
