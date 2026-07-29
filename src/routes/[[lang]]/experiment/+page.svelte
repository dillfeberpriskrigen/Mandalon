<script>
	import PageContent from '$lib/components/layout/PageContent.svelte';
	import ParagraphArray from '$lib/components/ParagraphArray.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import MediaArticleSection from '$lib/components/sections/MediaArticleSection.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { siteContent } from '$lib/content/site';

	const content = siteContent.sv;
</script>

<PageContent>
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

<Surface>
	<Text variant="lead" weight="thin">Thin weight.</Text>
	<Text variant="lead" weight="normal">Normal weight.</Text>
	<Text variant="lead" weight="bold">Bold weight.</Text>
	<Text variant="lead" weight="boldest">Boldest weight.</Text>
</Surface>
