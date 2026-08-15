import type { ContactPageContent } from '../types';

export const contactPage: Record<'sv' | 'en', ContactPageContent> = {
	sv: {
		meta: {
			title: 'Mandalon | Kontakt',
			description: 'Kontaktuppgifter och ett enkelt sätt att nå Mandalon om ni vill diskutera bonding, design, packaging eller prototyparbete.'
		},
		title: 'Kontakt',
		emailBefore: 'Ring direkt till någon av våra medarbetare, eller skicka ett mail till',
		email: 'info@mandalon.se',
		emailHref: 'mailto:info@mandalon.se',
		emailAfter: 'så återkommer vi så snart vi kan.',
		people: [
			{
				name: 'Per-Erik Fägerman',
				role: 'VD',
				image: { src: '/mandalon/PerErik.webp', alt: 'Per-Erik Fägerman', width: 198, height: 198 },
				phone: '073 320 60 50',
				phoneHref: 'tel:+46733206050',
				bio: [
					'Företagsledare och bondmästare.',
					'Med över 25 års erfarenhet av att hjälpa kunder med paketering, bondning och felsökning av chip så löser jag även de mest komplexa utmaningarna.'
				]
			},
			{
				name: 'Isabelle Fägerman',
				role: 'CFO',
				bio: [
					'Företagsledare och ekonom.',
					'Jag har arbetat med företagsledning och ekonomi på flera företag i elektronikbranschen och har en ekonomiutbildning i ryggen.',
					'Strategi och planering ser jag som nyckeln för att kunna arbeta effektivt med våra kunders utmaningar.'
				]
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Elektronikingenjör',
				image: { src: '/mandalon/Jonatan.webp', alt: 'Jonatan', width: 200, height: 200 },
				phone: '073 58 48 690',
				phoneHref: 'tel:+46735848690',
				bio: [
					'Elektronikingenjör sedan 2019.',
					'Jag vet hur man designar elektronik, från ide till färdigt kretskort. Jag har erfarenhet av produktionstestsystem, flera typer av inbygda system och till viss del även mjukvara.',
					'Kan även 3D-printa enklare delar efter behov och på så vis ta fram mindre testfixturer och prototyper.'
				]
			}
		],
		openPersonLabel: 'Mer om',
		closePersonLabel: 'Stäng',
		address: {
			company: 'Mandalon Technologies AB',
			street: 'Bjärby Himmelslund 1',
			postalCode: '585 61',
			city: 'Linghem'
		},
		locationTitle: 'Besök oss',
		visitNote: 'Nyfiken på Mandalons labb? Kontakta oss för besök.',
		mapTitle: 'Karta till Mandalon',
		mapEnableLabel: 'Klicka för att använda kartan'
	},
	en: {
		meta: {
			title: 'Mandalon | Contact',
			description: 'Contact details and a simple way to reach Mandalon if you want to discuss bonding, design, packaging or prototype work.'
		},
		title: 'Contact',
		emailBefore: 'Call one of our colleagues directly, or send an email to',
		email: 'info@mandalon.se',
		emailHref: 'mailto:info@mandalon.se',
		emailAfter: 'and we will get back to you as soon as we can.',
		people: [
			{
				name: 'Per-Erik Fägerman',
				role: 'CEO',
				image: { src: '/mandalon/PerErik.webp', alt: 'Per-Erik Fägerman', width: 198, height: 198 },
				phone: '+46 733 20 60 50',
				phoneHref: 'tel:+46733206050',
				bio: [
					'Business leader and bonding master.',
					'With over 25 years of experience helping customers with packaging, bonding and chip troubleshooting, I solve even the most complex challenges.'
				]
			},
			{
				name: 'Isabelle Fägerman',
				role: 'CFO',
				bio: [
					'Business leader and economist.',
					'I have worked with company management and finance at several companies in the electronics industry, and have a background in economics.',
					'I see strategy and planning as the key to working effectively with our customers’ challenges.'
				]
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Electronics engineer',
				image: { src: '/mandalon/Jonatan.webp', alt: 'Jonatan', width: 200, height: 200 },
				phone: '+46 73 58 48 690',
				phoneHref: 'tel:+46735848690',
				bio: [
					'Electronics engineer since 2019.',
					'I know how to design electronics, from idea to a finished circuit board. I have experience with production test systems, several types of embedded systems, and to some extent software as well.',
					'I can also 3D-print simpler parts as needed, and in that way produce smaller test fixtures and prototypes.'
				]
			}
		],
		openPersonLabel: 'More about',
		closePersonLabel: 'Close',
		address: {
			company: 'Mandalon Technologies AB',
			street: 'Bjärby Himmelslund 1',
			postalCode: '585 61',
			city: 'Linghem',
			country: 'Sweden'
		},
		locationTitle: 'Visit us',
		visitNote: 'Curious about Mandalon’s lab? Get in touch to arrange a visit.',
		mapTitle: 'Map to Mandalon',
		mapEnableLabel: 'Click to use the map'
	}
};
