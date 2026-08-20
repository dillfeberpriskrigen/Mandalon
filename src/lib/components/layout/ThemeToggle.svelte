<script lang="ts">
	import { toggleMode } from 'mode-watcher';

	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<button type="button" class="theme-toggle" onclick={toggleMode} aria-label={label}>
	<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
		<path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
	</svg>
	<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
		<path
			fill="currentColor"
			d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm1-4a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3Zm0 17a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1ZM4 11a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H4Zm15 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1ZM5.64 5.64a1 1 0 0 0 0 1.41l.7.71A1 1 0 1 0 7.76 6.34l-.71-.7a1 1 0 0 0-1.41 0Zm11.31 11.31a1 1 0 0 0 0 1.41l.71.71a1 1 0 0 0 1.41-1.41l-.7-.71a1 1 0 0 0-1.42 0ZM5.64 18.36a1 1 0 0 0 1.41 0l.71-.7A1 1 0 1 0 6.34 16.24l-.7.71a1 1 0 0 0 0 1.41Zm12.73-12.73a1 1 0 0 0 0-1.41 1 1 0 0 0-1.42 0l-.7.71a1 1 0 0 0 1.41 1.41l.71-.71Z"
		/>
	</svg>
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: none;
		background: transparent;
		color: inherit;
		cursor: pointer;
	}

	.theme-toggle:hover {
		color: var(--on-photo);
	}

	.theme-toggle svg {
		width: 1.2rem;
		height: 1.2rem;
	}

	.icon-sun {
		display: none;
	}

	:global(html.dark) .icon-sun {
		display: block;
	}

	:global(html.dark) .icon-moon {
		display: none;
	}
</style>
