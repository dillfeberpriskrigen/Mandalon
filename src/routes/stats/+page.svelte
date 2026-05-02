<script lang="ts">
	import { onMount } from 'svelte';
	import { getAnalyticsStatsUrl } from '$lib/client/analytics';

	type AnalyticsSummary = {
		totalViews: number;
		uniquePaths: number;
		topPages: { path: string; views: number }[];
		topCountries: { country: string; views: number }[];
		recentViews: {
			timestamp: string;
			path: string;
			geo: { country: string | null; city: string | null };
		}[];
	};

	let summary: AnalyticsSummary | null = null;
	let loading = true;
	let errorMessage = '';
	let statsUrl = '';

	function formatTimestamp(value: string) {
		return new Date(value).toLocaleString('sv-SE', {
			dateStyle: 'short',
			timeStyle: 'medium'
		});
	}

	async function loadStats() {
		loading = true;
		errorMessage = '';
		statsUrl = getAnalyticsStatsUrl();

		try {
			const response = await fetch(statsUrl, {
				headers: {
					accept: 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			summary = await response.json();
		} catch (error) {
			summary = null;
			errorMessage = error instanceof Error ? error.message : 'Okänt fel';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		void loadStats();
	});
</script>

<svelte:head>
	<title>Mandalon | Stats</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<section class="stats-page">
	<div class="container">
		<header class="hero">
			<p class="eyebrow">Publik statistik</p>
			<h1>Sidvisningar</h1>
			<p class="lead">En enkel översikt över vilka sidor som har laddats och var besöken ungefär kommer ifrån.</p>
		</header>

		{#if loading}
			<section class="panel">
				<p class="empty-state">Laddar statistik...</p>
			</section>
		{:else if errorMessage}
			<section class="panel">
				<p class="empty-state">Kunde inte hämta statistik från <code>{statsUrl}</code>: {errorMessage}</p>
				<button class="retry-button" type="button" on:click={() => void loadStats()}> Försök igen </button>
			</section>
		{:else if summary}
			<section class="summary-grid" aria-label="Sammanfattning">
				<article class="summary-card">
					<span class="summary-label">Totala sidvisningar</span>
					<strong>{summary.totalViews}</strong>
				</article>
				<article class="summary-card">
					<span class="summary-label">Unika sidor</span>
					<strong>{summary.uniquePaths}</strong>
				</article>
				<article class="summary-card">
					<span class="summary-label">Länder</span>
					<strong>{summary.topCountries.length}</strong>
				</article>
			</section>

			<div class="stats-layout">
				<section class="panel">
					<div class="panel-heading">
						<h2>Mest besökta sidor</h2>
					</div>

					{#if summary.topPages.length > 0}
						<table>
							<thead>
								<tr>
									<th>Sida</th>
									<th>Visningar</th>
								</tr>
							</thead>
							<tbody>
								{#each summary.topPages as page}
									<tr>
										<td><code>{page.path}</code></td>
										<td>{page.views}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{:else}
						<p class="empty-state">Ingen statistik ännu.</p>
					{/if}
				</section>

				<section class="panel">
					<div class="panel-heading">
						<h2>Länder</h2>
					</div>

					{#if summary.topCountries.length > 0}
						<table>
							<thead>
								<tr>
									<th>Land</th>
									<th>Visningar</th>
								</tr>
							</thead>
							<tbody>
								{#each summary.topCountries as country}
									<tr>
										<td>{country.country}</td>
										<td>{country.views}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{:else}
						<p class="empty-state">Ingen geodata ännu.</p>
					{/if}
				</section>
			</div>

			<section class="panel">
				<div class="panel-heading">
					<h2>Senaste sidvisningar</h2>
				</div>

				{#if summary.recentViews.length > 0}
					<table>
						<thead>
							<tr>
								<th>Tid</th>
								<th>Sida</th>
								<th>Land</th>
								<th>Stad</th>
							</tr>
						</thead>
						<tbody>
							{#each summary.recentViews as view}
								<tr>
									<td>{formatTimestamp(view.timestamp)}</td>
									<td><code>{view.path}</code></td>
									<td>{view.geo.country ?? 'Okänt'}</td>
									<td>{view.geo.city ?? 'Okänd'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p class="empty-state">Inga sidvisningar har registrerats ännu.</p>
				{/if}
			</section>
		{/if}
	</div>
</section>

<style>
	:global(body) {
		background-position: center top;
		background-attachment: scroll;
	}

	.stats-page {
		padding: 4rem 0 5rem;
	}

	.hero {
		max-width: 56rem;
		margin-bottom: 2rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #2e6f5b;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		line-height: 0.95;
	}

	.lead {
		max-width: 44rem;
		margin: 1rem 0 0;
		font-size: 1.05rem;
		line-height: 1.7;
		color: rgba(16, 35, 28, 0.8);
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.summary-card,
	.panel {
		border: 1px solid rgba(16, 35, 28, 0.1);
		border-radius: 1.25rem;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 8px 24px rgba(16, 35, 28, 0.06);
	}

	.summary-card {
		padding: 1.25rem 1.4rem;
	}

	.summary-label {
		display: block;
		font-size: 0.88rem;
		color: rgba(16, 35, 28, 0.68);
	}

	.summary-card strong {
		display: block;
		margin-top: 0.35rem;
		font-size: 2rem;
	}

	.stats-layout {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.panel {
		padding: 1rem 1rem 1.1rem;
	}

	.panel-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.8rem;
	}

	h2 {
		margin: 0;
		font-size: 1.2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.96rem;
	}

	th,
	td {
		padding: 0.8rem 0.75rem;
		border-top: 1px solid rgba(16, 35, 28, 0.08);
		text-align: left;
		vertical-align: top;
	}

	th {
		font-size: 0.82rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(16, 35, 28, 0.62);
	}

	code {
		font-family: 'Roboto Mono', 'SFMono-Regular', monospace;
		font-size: 0.92em;
		word-break: break-all;
	}

	.empty-state {
		margin: 0;
		padding: 1rem 0.25rem 0.5rem;
		color: rgba(16, 35, 28, 0.72);
	}

	.retry-button {
		border: 0;
		border-radius: 999px;
		padding: 0.8rem 1.15rem;
		background: #10231c;
		color: white;
		font: inherit;
		cursor: pointer;
	}

	@media (max-width: 820px) {
		.summary-grid,
		.stats-layout {
			grid-template-columns: 1fr;
		}

		.stats-page {
			padding-top: 2.5rem;
		}

		table,
		thead,
		tbody,
		tr,
		th,
		td {
			display: block;
		}

		thead {
			display: none;
		}

		tr {
			padding: 0.35rem 0;
		}

		td {
			padding: 0.5rem 0.25rem;
			border-top: 0;
		}

		td::before {
			content: '';
		}
	}
</style>
