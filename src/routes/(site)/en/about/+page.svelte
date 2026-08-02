<script lang="ts">
	import Page from '../../(sv)/om-mandalon/+page.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Page {data} />
