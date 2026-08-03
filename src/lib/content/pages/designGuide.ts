import type { DesignGuidePageContent } from '../types';

export const designGuidePage = {
	sv: {
		meta: {
			title: 'Mandalon | Designguide',
			description: 'Mandalons designguide med originalcopy, bilder och PDF för chipdesign, PCB-layout och bonding.'
		},
		title: 'Designguide',
		intro:
			'Designguiden togs fram tillsammans med doktorander vid Linköpings universitet och samlar praktiska råd, bilder och vanliga fallgropar inom chipdesign, PCB-layout och bonding.',
		languageNote: 'Designguiden är ett engelskspråkigt tekniskt dokument och visas oförändrad på svenska sidor.',
		articleIntroTitle: 'En hjälp på vägen kan vara den designguide vi tagit fram för några tillämpningar',
		articleIntroBody:
			'2007 tog vi tillsammans med doktorander och personal vid Linköpings universitet och i samarbete med nano- och mikrosystemprogrammet minST fram en designguide. Ta del av den i sin helhet här, eller ladda ner den i PDF-format.',
		downloadLabel: 'Hämta designguide som pdf',
		embeddedDownloadLabel: 'Designguide'
	},
	en: {
		meta: {
			title: 'Mandalon | Design guide',
			description: 'Mandalon design guide with original copy, images and PDF for chip design, PCB layout and bonding.'
		},
		title: 'Design guide',
		intro:
			'The design guide was developed together with doctoral researchers at Linköping University and brings together practical advice, images, and common pitfalls in chip design, PCB layout, and bonding.',
		languageNote: '',
		articleIntroTitle: 'A useful starting point is the design guide we have developed for a number of applications',
		articleIntroBody:
			'In 2007, together with doctoral researchers and staff at Linköping University and in collaboration with the nano- and microsystems programme minST, we developed a design guide. Read it in full here, or download it as a PDF.',
		downloadLabel: 'Download design guide as PDF',
		embeddedDownloadLabel: 'Download design guide'
	}
} satisfies Record<'sv' | 'en', DesignGuidePageContent>;
