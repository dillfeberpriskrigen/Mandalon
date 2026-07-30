<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		narrow?: boolean;
	}

	let { children, narrow = false }: Props = $props();
</script>

<section class="page-shell" class:narrow>
	<div class="container">
		{@render children()}
	</div>
</section>

<style>
	.page-shell {
		padding: 4rem 0 6rem;
	}

	.narrow {
		--container-width: var(--container-width-narrow);
	}
</style>
