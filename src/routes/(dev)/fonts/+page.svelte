<script lang="ts">
	import Link from '$lib/components/typography/Link.svelte';

	const fonts = [{ name: 'Roboto and Roboto Condensed', file: '/fonts/Roboto-OFL.txt' }];
</script>

<h1>Open source licenses</h1>

<ul>
	{#each fonts as license (license.file)}
		<li>
			<Link href={license.file}>{license.name}</Link>
		</li>
	{/each}
</ul>
