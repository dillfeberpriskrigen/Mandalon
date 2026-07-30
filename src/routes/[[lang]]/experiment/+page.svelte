<script>
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
</script>

<PageContent>
	<Heading as="h1">Heading h1 (page-title)</Heading>
	<Heading as="h2">Heading h2 (page-header)</Heading>
	<Heading as="h3">Heading h3 (page-sub-section)</Heading>

	<p>
		In-page <Link href="#surface-demos">link to surfaces</Link>
		and external
		<Link href="https://mandalon.se" target="_blank" rel="noreferrer">mandalon.se</Link>.
	</p>

	<Text as="p"
		>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
		veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
		consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
		velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
		exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
		velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</Text
	>

	<Text as="p">Some other text</Text><Text as="p">And even more</Text>

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

<hr />

<section id="surface-demos">
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
</section>

<style>
	.surface-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-medium);
		margin-top: var(--space-medium);
	}

	@media (max-width: 780px) {
		.surface-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
