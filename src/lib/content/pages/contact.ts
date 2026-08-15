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
				phoneHref: 'tel:+46733206050'
			},
			{
				name: 'Isabelle Fägerman',
				role: 'CFO'
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Elektronikingenjör',
				image: { src: '/mandalon/Jonatan.webp', alt: 'Jonatan', width: 200, height: 200 },
				phone: '073 58 48 690',
				phoneHref: 'tel:+46735848690'
			}
		],
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
				phoneHref: 'tel:+46733206050'
			},
			{
				name: 'Isabelle Fägerman',
				role: 'CFO'
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Electronics engineer',
				image: { src: '/mandalon/Jonatan.webp', alt: 'Jonatan', width: 200, height: 200 },
				phone: '+46 73 58 48 690',
				phoneHref: 'tel:+46735848690'
			}
		],
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
