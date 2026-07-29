<script lang="ts">
	const fonts = [
		{ name: 'Roboto and Roboto Condensed', file: '/fonts/Roboto-OFL.txt' }
	];
</script>

<h1>Open source licenses</h1>

<ul>
	{#each fonts as license (license.file)}
		<li>
			<a href={license.file}>{license.name}</a>
		</li>
	{/each}
</ul>
