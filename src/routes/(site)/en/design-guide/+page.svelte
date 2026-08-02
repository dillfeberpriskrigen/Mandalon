<script lang="ts">
	import Page from '../../(sv)/designguide/+page.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Page {data} />
