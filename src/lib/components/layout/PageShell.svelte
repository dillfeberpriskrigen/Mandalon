<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<section class="page-shell">
	<div class="container">
		{@render children()}
	</div>
</section>

<style>
	.page-shell {
		padding: 4rem 0 6rem;
	}
</style>
