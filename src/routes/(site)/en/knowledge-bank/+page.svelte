<script lang="ts">
	import Page from '../../(sv)/kunskapsbank/+page.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Page {data} />
