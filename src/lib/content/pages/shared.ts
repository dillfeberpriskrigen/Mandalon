import type { SharedContent } from '../types';

export const shared = {
	sv: {
		meta: {
			title: 'Mandalon | Trådbondning och paketering av chip',
			description: 'Trådbondning, die bonding och advanced packaging i Linköping. Vi kapslar chip, sensorer, MEMS och ASIC:s från prototyp till mindre serier.'
		},
		languageSwitchLabel: 'Byt till engelska',
		primaryLinks: [
			{ label: 'Paketering av Chip', page: 'packaging' },
			{ label: 'Konsulttjänster', page: 'consulting' },
			{ label: 'Om Mandalon', page: 'about' },
			{ label: 'Kontakt', page: 'contact' }
		],
		footer: {
			navTitle: 'Sidkarta',
			nav: [
				{ label: 'Startsida', page: 'home' },
				{ label: 'Paketering av Chip', page: 'packaging' },
				{ label: 'Konsulttjänster', page: 'consulting' },
				{ label: 'Om Mandalon', page: 'about' },
				{ label: 'Kontakt', page: 'contact' },
				{ label: 'Kunskapsbank', page: 'knowledge' },
				{ label: 'Designguide', page: 'designGuide' },
				{ label: 'Integritetspolicy', page: 'privacy' }
			],
			certificationLabel: 'Vi är ISO 9001-certifierade'
		},
		errorPage: {
			title: 'Sidan hittades inte',
			notFound: 'Sidan kunde inte hittas.',
			generic: 'Något gick fel.',
			homeLabel: 'Till startsidan'
		}
	},
	en: {
		meta: {
			title: 'Mandalon | Wire bonding and chip packaging',
			description:
				'Wire bonding, die bonding and advanced packaging in Linköping, Sweden. We package chips, sensors, MEMS and ASICs from prototype to small series.'
		},
		languageSwitchLabel: 'Switch to Swedish',
		primaryLinks: [
			{ label: 'Chip Packaging', page: 'packaging' },
			{ label: 'Consulting Services', page: 'consulting' },
			{ label: 'About Mandalon', page: 'about' },
			{ label: 'Contact', page: 'contact' }
		],
		footer: {
			navTitle: 'Sitemap',
			nav: [
				{ label: 'Home', page: 'home' },
				{ label: 'Chip Packaging', page: 'packaging' },
				{ label: 'Consulting Services', page: 'consulting' },
				{ label: 'About Mandalon', page: 'about' },
				{ label: 'Contact', page: 'contact' },
				{ label: 'Knowledge bank', page: 'knowledge' },
				{ label: 'Design guide', page: 'designGuide' },
				{ label: 'Privacy policy', page: 'privacy' }
			],
			certificationLabel: 'We are ISO 9001 certified'
		},
		errorPage: {
			title: 'Page not found',
			notFound: 'The page could not be found.',
			generic: 'Something went wrong.',
			homeLabel: 'Back to home'
		}
	}
} satisfies Record<'sv' | 'en', SharedContent>;
