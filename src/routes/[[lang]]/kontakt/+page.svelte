<script>
	const { data } = $props();
	const latitude = 58.448268;
	const longitude = 15.826769;
	const delta = 0.012;
	const bbox = [(longitude - delta).toFixed(5), (latitude - delta).toFixed(5), (longitude + delta).toFixed(5), (latitude + delta).toFixed(5)].join('%2C');
	const marker = `${latitude}%2C${longitude}`;
	const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
</script>

<svelte:head>
	<title>{data.content.contactPage.meta.title}</title>
	<meta name="description" content={data.content.contactPage.meta.description} />
</svelte:head>

<section class="info-page">
	<div class="container">
		<h1 class="page-title">{data.content.contactPage.title}</h1>
		<p class="lead text-width">{data.content.contactPage.lead}</p>

		<div class="people-flow">
			{#each data.content.contactPage.people as person, index (person.name)}
				<article class:reverse={index % 2 === 1} class="person-row">
					<div class="person-image">
						<img src={person.image} alt={person.imageAlt} />
					</div>

					<div class="person-copy">
						<h2>{person.name}</h2>
						{#if person.role}
							<p class="role">{person.role}</p>
						{/if}

						<div class="person-details">
							{#if person.phone}
								<p><a href={person.phoneHref}>{person.phone}</a></p>
							{/if}
							{#if person.email}
								<p><a href={person.emailHref}>{person.email}</a></p>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<section class="location">
			<div class="location-copy">
				<h2>{data.locale === 'sv' ? 'Besök oss' : 'Visit us'}</h2>
				{#each data.content.contactPage.details as detail (detail.label)}
					<p>
						<strong>{detail.label}:</strong>
						{#if detail.href}
							<a href={detail.href}>{detail.value}</a>
						{:else}
							{detail.value}
						{/if}
					</p>
				{/each}
			</div>

			<div class="map-wrap">
				<iframe
					title={data.locale === 'sv' ? 'Karta till Mandalon' : 'Map to Mandalon'}
					src={mapEmbedUrl}
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</section>
	</div>
</section>

<style>
	.info-page {
		padding: 4rem 0 6rem;
	}

	.people-flow {
		display: grid;
		gap: 2.5rem;
		margin-top: 2.5rem;
	}

	.person-row {
		display: grid;
		grid-template-columns: minmax(180px, 0.55fr) minmax(0, 1.45fr);
		gap: 2rem;
		align-items: center;
	}

	.person-row.reverse {
		grid-template-columns: minmax(0, 1.45fr) minmax(180px, 0.55fr);
	}

	.person-row.reverse .person-image {
		order: 2;
	}

	.person-row.reverse .person-copy {
		order: 1;
	}

	.person-image img {
		display: block;
		width: 100%;
		max-width: 240px;
		height: auto;
		border-radius: 1rem;
		opacity: 0.92;
	}

	.person-copy {
		max-width: 32rem;
	}

	.person-copy h2,
	.location h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1;
	}

	.role {
		margin-top: 0.35rem;
		font-size: 1.05rem;
		font-weight: 700;
		color: #506458;
	}

	.person-details {
		display: grid;
		gap: 0.35rem;
		margin-top: 1rem;
	}

	.person-details p,
	.person-details a,
	.location p,
	.location a {
		line-height: 1.75;
		color: #506458;
	}

	.location {
		display: grid;
		gap: 1rem;
		margin-top: 3rem;
	}

	.location-copy {
		max-width: 40rem;
	}

	.location-copy h2 {
		margin-bottom: 0.8rem;
	}

	.map-wrap iframe {
		width: 100%;
		height: 26rem;
		border: 0;
		border-radius: 1rem;
	}

	@media (max-width: 900px) {
		.person-row,
		.person-row.reverse {
			grid-template-columns: 1fr;
		}

		.person-row.reverse .person-image,
		.person-row.reverse .person-copy {
			order: initial;
		}

		.map-wrap iframe {
			height: 20rem;
		}
	}
</style>
