<script lang="ts">
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Surface from '$lib/components/primitives/Surface.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const summary = $derived(data.summary);

	function formatTimestamp(value: string) {
		return new Date(value).toLocaleString('sv-SE', {
			dateStyle: 'short',
			timeStyle: 'medium'
		});
	}
</script>

<svelte:head>
	<title>Mandalon | Stats</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<PageShell>
	<PageHeader title="Sidvisningar" lead="Översikt över sidvisningar, länder, referrers, 404:or och redirects. Inga cookies, ingen IP-adress sparas." />

	<section class="summary-grid" aria-label="Sammanfattning">
		<Surface as="article" radius="large" padding="medium">
			<Text as="p" variant="label">Totala sidvisningar</Text>
			<p class="summary-value">{summary.totalViews}</p>
		</Surface>
		<Surface as="article" radius="large" padding="medium">
			<Text as="p" variant="label">Unika sidor</Text>
			<p class="summary-value">{summary.uniquePaths}</p>
		</Surface>
		<Surface as="article" radius="large" padding="medium">
			<Text as="p" variant="label">Länder</Text>
			<p class="summary-value">{summary.topCountries.length}</p>
		</Surface>
	</section>

	<div class="stats-layout">
		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Mest besökta sidor</Heading>
			{#if summary.topPages.length > 0}
				<table>
					<thead>
						<tr>
							<th>Sida</th>
							<th>Visningar</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.topPages as page (page.label)}
							<tr>
								<td><code>{page.label}</code></td>
								<td>{page.views}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Ingen statistik ännu.</Text>
			{/if}
		</Surface>

		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Länder</Heading>
			{#if summary.topCountries.length > 0}
				<table>
					<thead>
						<tr>
							<th>Land</th>
							<th>Visningar</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.topCountries as country (country.label)}
							<tr>
								<td>{country.label}</td>
								<td>{country.views}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Ingen geodata ännu.</Text>
			{/if}
		</Surface>
	</div>

	<div class="stats-layout">
		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Visningar per dag</Heading>
			{#if summary.viewsByDay.length > 0}
				<table>
					<thead>
						<tr>
							<th>Dag</th>
							<th>Visningar</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.viewsByDay as row (row.day)}
							<tr>
								<td>{row.day}</td>
								<td>{row.views}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Ingen dagsstatistik ännu.</Text>
			{/if}
		</Surface>

		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Referrers</Heading>
			{#if summary.topReferrers.length > 0}
				<table>
					<thead>
						<tr>
							<th>Värd</th>
							<th>Visningar</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.topReferrers as referrer (referrer.label)}
							<tr>
								<td><code>{referrer.label}</code></td>
								<td>{referrer.views}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Inga externa referrers ännu.</Text>
			{/if}
		</Surface>
	</div>

	<div class="stats-layout">
		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">404:or</Heading>
			{#if summary.topNotFound.length > 0}
				<table>
					<thead>
						<tr>
							<th>Sida</th>
							<th>Träffar</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.topNotFound as row (row.label)}
							<tr>
								<td><code>{row.label}</code></td>
								<td>{row.views}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Inga 404:or ännu.</Text>
			{/if}
		</Surface>

		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Redirects</Heading>
			{#if summary.topRedirects.length > 0}
				<table>
					<thead>
						<tr>
							<th>Från</th>
							<th>Till</th>
							<th>Träffar</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.topRedirects as row (`${row.path}>${row.redirectTo}`)}
							<tr>
								<td><code>{row.path}</code></td>
								<td><code>{row.redirectTo}</code></td>
								<td>{row.views}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Inga redirects ännu.</Text>
			{/if}
		</Surface>
	</div>

	<Surface as="section" radius="large" padding="large">
		<Heading as="h2">Senaste sidvisningar</Heading>
		{#if summary.recentViews.length > 0}
			<table>
				<thead>
					<tr>
						<th>Tid</th>
						<th>Sida</th>
						<th>Land</th>
						<th>Referrer</th>
					</tr>
				</thead>
				<tbody>
					{#each summary.recentViews as view (view.id)}
						<tr>
							<td>{formatTimestamp(view.occurredAt)}</td>
							<td><code>{view.path}</code></td>
							<td>{view.country ?? 'Okänt'}</td>
							<td>{view.referrerHost ? view.referrerHost : 'Direkt'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<Text as="p" variant="caption">Inga sidvisningar har registrerats ännu.</Text>
		{/if}
	</Surface>

	<div class="stats-layout">
		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Senaste 404:or</Heading>
			{#if summary.recentNotFound.length > 0}
				<table>
					<thead>
						<tr>
							<th>Tid</th>
							<th>Sida</th>
							<th>Land</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.recentNotFound as row (row.id)}
							<tr>
								<td>{formatTimestamp(row.occurredAt)}</td>
								<td><code>{row.path}</code></td>
								<td>{row.country ?? 'Okänt'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Inga 404:or har registrerats ännu.</Text>
			{/if}
		</Surface>

		<Surface as="section" radius="large" padding="large">
			<Heading as="h2">Senaste redirects</Heading>
			{#if summary.recentRedirects.length > 0}
				<table>
					<thead>
						<tr>
							<th>Tid</th>
							<th>Från</th>
							<th>Till</th>
							<th>Land</th>
						</tr>
					</thead>
					<tbody>
						{#each summary.recentRedirects as row (row.id)}
							<tr>
								<td>{formatTimestamp(row.occurredAt)}</td>
								<td><code>{row.path}</code></td>
								<td><code>{row.redirectTo}</code></td>
								<td>{row.country ?? 'Okänt'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<Text as="p" variant="caption">Inga redirects har registrerats ännu.</Text>
			{/if}
		</Surface>
	</div>
</PageShell>

<style>
	.summary-grid,
	.stats-layout {
		display: grid;
		gap: var(--space-medium);
		margin-top: var(--space-large);
	}

	.summary-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.stats-layout {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	}

	.summary-value {
		margin: var(--space-small) 0 0;
		font-size: var(--page-header-size);
		line-height: var(--page-header-line);
		font-weight: var(--weight-bold);
		color: var(--ink);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: var(--space-medium);
	}

	th,
	td {
		padding: var(--space-small) 0;
		border-top: 1px solid var(--line);
		text-align: left;
		vertical-align: top;
		color: var(--ink);
	}

	th {
		font-size: var(--text-caption-size);
		font-weight: var(--weight-bold);
		color: var(--muted);
	}

	code {
		font-family: ui-monospace, 'SFMono-Regular', monospace;
		word-break: break-all;
	}

	@media (max-width: 820px) {
		.summary-grid,
		.stats-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
