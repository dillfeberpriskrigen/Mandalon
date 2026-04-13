<div class="app-shell">
	<div class="page-layer">
		<slot />
	</div>
</div>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Condensed:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	:global(html, body) {
		min-height: 100%;
	}

	:global(body) {
		margin: 0;
		font-family: 'Roboto', 'Segoe UI', system-ui, sans-serif;
		color: #10231c;
		background: url('/mandalon/motherboard-bg.jpg') center top / cover no-repeat fixed;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Roboto Condensed', 'Roboto', 'Segoe UI', system-ui, sans-serif;
	}

	:global(img) {
		max-width: 100%;
		display: block;
	}

	:global(a) {
		color: inherit;
	}

	.app-shell {
		min-height: 100vh;
	}

	.page-layer {
		min-height: 100vh;
	}
</style>
