import type { ContactPageContent } from '../types';

export const contactPage = {
	sv: {
		meta: {
			title: 'Mandalon | Kontakt',
			description: 'Kontaktuppgifter och ett enkelt sätt att nå Mandalon om ni vill diskutera bonding, design, packaging eller prototyparbete.'
		},
		title: 'Låt oss prata om er konstruktion.',
		lead: 'Om ni vill diskutera chip packaging, bonding, kapsling eller designfrågor är det enklast att börja med ett kort mejl.',
		people: [
			{
				name: 'Per-Erik Fägerman',
				role: 'VD',
				image: { src: '/mandalon/PerErik.jpg', alt: 'Per-Erik Fägerman', width: 198, height: 198 },
				phone: '073 320 60 50',
				phoneHref: 'tel:+46733206050',
				email: 'info@mandalon.se',
				emailHref: 'mailto:info@mandalon.se'
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Teknisk Säljare',
				image: { src: '/mandalon/Jonatan.jpg', alt: 'Jonatan', width: 200, height: 200 },
				phone: '073 58 48 690',
				phoneHref: 'tel:+46735848690'
			}
		],
		details: [
			{ label: 'E-post', value: 'info@mandalon.se', href: 'mailto:info@mandalon.se' },
			{ label: 'Hjälp', value: 'help@mandalon.se', href: 'mailto:help@mandalon.se' },
			{ label: 'Adress', value: 'Bjärby Himmelslund 1, 585 61 Linghem' }
		],
		locationTitle: 'Besök oss',
		mapTitle: 'Karta till Mandalon'
	},
	en: {
		meta: {
			title: 'Mandalon | Contact',
			description: 'Contact details and a simple way to reach Mandalon if you want to discuss bonding, design, packaging or prototype work.'
		},
		title: 'Let’s talk about your design.',
		lead: 'If you want to discuss chip packaging, bonding, encapsulation or design-related questions, the easiest start is a short email.',
		people: [
			{
				name: 'Per-Erik Fägerman',
				role: 'CEO',
				image: { src: '/mandalon/PerErik.jpg', alt: 'Per-Erik Fägerman', width: 198, height: 198 },
				phone: '+46 733 20 60 50',
				phoneHref: 'tel:+46733206050',
				email: 'info@mandalon.se',
				emailHref: 'mailto:info@mandalon.se'
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Technical sales',
				image: { src: '/mandalon/Jonatan.jpg', alt: 'Jonatan', width: 200, height: 200 },
				phone: '+46 73 58 48 690',
				phoneHref: 'tel:+46735848690'
			}
		],
		details: [
			{ label: 'Email', value: 'info@mandalon.se', href: 'mailto:info@mandalon.se' },
			{ label: 'Support', value: 'help@mandalon.se', href: 'mailto:help@mandalon.se' },
			{ label: 'Address', value: 'Bjärby Himmelslund 1, 585 61 Linghem, Sweden' }
		],
		locationTitle: 'Visit us',
		mapTitle: 'Map to Mandalon'
	}
} satisfies Record<'sv' | 'en', ContactPageContent>;
