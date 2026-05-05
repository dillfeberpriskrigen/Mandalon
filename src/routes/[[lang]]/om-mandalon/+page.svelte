<script>
	const { data } = $props();
</script>

<svelte:head>
	<title>{data.content.aboutPage.meta.title}</title>
	<meta name="description" content={data.content.aboutPage.meta.description} />
</svelte:head>

<section class="info-page">
	<div class="container">
		<h1 class="page-title">{data.content.aboutPage.title}</h1>
		<p class="lead text-width">{data.content.aboutPage.lead}</p>

		<section class="narrative text-width">
			<h2 class="page-header">{data.content.aboutPage.introTitle}</h2>
			{#each data.content.aboutPage.intro as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
		</section>

		<section class="story text-width">
			<h2 class="page-header">{data.content.aboutPage.storyTitle}</h2>
			<p>{data.content.aboutPage.story}</p>
		</section>

		<div class="trust-grid">
			<section class="panel">
				<h2 class="page-header">{data.content.aboutPage.certificationTitle}</h2>
				<p>{data.content.aboutPage.certification}</p>
				<p class="note">{data.content.aboutPage.certificationNote}</p>
			</section>

			<section class="panel">
				<h2 class="page-header">{data.content.aboutPage.referencesTitle}</h2>
				<p>{data.content.aboutPage.referencesLead}</p>

				<div class="lists">
					<div>
						<h3>{data.locale === 'sv' ? 'Utvalda referenser' : 'Selected references'}</h3>
						<ul>
							{#each data.content.aboutPage.references as item, i (i)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>

					<div>
						<h3>{data.locale === 'sv' ? 'Forskningsprojekt' : 'Research projects'}</h3>
						<ul>
							{#each data.content.aboutPage.researchProjects as item (item.title)}
								<li><a href={item.href} target="_blank" rel="noreferrer">{item.title}</a></li>
							{/each}
						</ul>
					</div>
				</div>
			</section>
		</div>
	</div>
</section>

<style>
	.info-page {
		--container-width: var(--container-width-narrow);
		padding: 4rem 0 6rem;
	}

	.narrative,
	.story {
		display: grid;
		margin-top: 2rem;
		gap: 1rem;
	}

	.panel {
		padding: 1.6rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
	}

	.narrative p,
	.story p,
	.panel p,
	.panel li,
	.panel a {
		line-height: 1.75;
		color: #506458;
	}

	.panel a:hover {
		color: #10231c;
	}

	.trust-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 2rem;
	}

	.note {
		margin-top: 0.85rem;
		font-size: 0.95rem;
	}

	.lists {
		display: grid;
		gap: 1.2rem;
		margin-top: 1rem;
	}

	h3 {
		margin-bottom: 0.5rem;
		font-size: 1.05rem;
	}

	ul {
		padding-left: 1.1rem;
	}

	li + li {
		margin-top: 0.45rem;
	}

	@media (max-width: 780px) {
		.trust-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
