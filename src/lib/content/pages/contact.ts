import type { ContactPageContent } from '../types';

export const contactPage: Record<'sv' | 'en', ContactPageContent> = {
	sv: {
		meta: {
			title: 'Mandalon | Kontakt',
			description:
				'Kontaktuppgifter till Mandalon. Skicka ett meddelande, mejla eller ring oss om bonding, paketering eller prototyparbete. Vi återkommer oftast samma vardag.'
		},
		title: 'Kontakt',
		lead: 'Har ni frågor om bonding, paketering eller en ny prototyp? Skicka ett meddelande, mejla eller ring oss. Vi återkommer oftast samma vardag.',
		emailTitle: 'Skicka ett mail',
		emailLabel: 'E-post',
		urgentNote: 'Är det brådskande? Ring någon av oss.',
		form: {
			title: 'Skicka ett meddelande',
			intro: 'Berätta kort vad ni behöver hjälp med. Vi läser den här inkorgen separat från den publika e-postadressen.',
			nameLabel: 'Namn',
			emailFieldLabel: 'E-post',
			messageLabel: 'Meddelande',
			submitLabel: 'Skicka',
			sendingLabel: 'Skickar…',
			successTitle: 'Ditt meddelande har skickats!',
			success: 'Tack. Vi återkommer oftast samma vardag.',
			successUrgent: 'Behöver du komma i kontakt med oss snarast? Ring någon av våra medarbetare nedan.',
			sendFailed: 'Meddelandet kunde inte skickas. Försök igen eller mejla oss på adressen nedan.',
			rateLimited: 'För många meddelanden just nu. Vänta en stund och försök igen.',
			leaveWarning: 'Meddelandet är inte skickat. Vill ni lämna sidan och förlora det ni skrivit?',
			privacy: {
				before: 'Vi använder uppgifterna för att kunna svara. Läs mer i ',
				link: 'integritetspolicyn',
				after: '.'
			},
			errors: {
				name: 'Fyll i namn.',
				email: 'Fyll i en giltig e-postadress.',
				message: 'Fyll i ett meddelande.'
			}
		},
		people: [
			{
				name: 'Per-Erik Fägerman',
				role: 'VD',
				phone: '073 320 60 50',
				phoneHref: 'tel:+46733206050',
				reason: 'Ring mig om ni har frågor om Mandalon, paketering av chip eller labbet.',
				bio: 'Över 25 års erfarenhet av paketering, bondning och felsökning av chip.'
			},
			{
				name: 'Isabelle Fägerman',
				role: 'CFO',
				reason: 'Ring mig om ni har frågor om fakturor, offerter eller ledtider.',
				bio: 'Erfarenhet av organisation och ekonomi från flera bolag i elektronikbranschen.'
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Elektronikingenjör',
				phone: '073 58 48 690',
				phoneHref: 'tel:+46735848690',
				reason: 'Ring mig om ni har frågor om testsystem, elektronikdesign, kretskort eller paketering av chip.',
				bio: 'Elektronikingenjör sedan 2019, med erfarenhet av produktionstestsystem, elektronikdesign och kretskortsdesign från idé till färdigt kort.'
			}
		],
		address: {
			company: 'Mandalon Technologies AB',
			street: 'Bjärby Himmelslund 1',
			postalCode: '585 61',
			city: 'Linghem'
		},
		orgNumberLabel: 'Org.nr',
		orgNumber: '556616-3670',
		locationTitle: 'Besök oss',
		visitNote: 'Labbet ligger utanför Linköping, i Linghem. Besök sker efter överenskommelse.',
		shippingNote: 'Försändelser skickas bäst med PostNord. Andra transportföretag tar ofta flera dagar längre.',
		mapTitle: 'Karta till Mandalon',
		mapEnableLabel: 'Klicka för att använda kartan'
	},
	en: {
		meta: {
			title: 'Mandalon | Contact',
			description:
				'Contact details for Mandalon. Send a message, email or call us about bonding, packaging or prototype work. We usually reply the same weekday.'
		},
		title: 'Contact',
		lead: 'Questions about bonding, packaging or a new prototype? Send a message, email or call us. We usually reply the same weekday.',
		emailTitle: 'Send an email',
		emailLabel: 'Email',
		urgentNote: 'If it is urgent, call one of us.',
		form: {
			title: 'Send a message',
			intro: 'Tell us briefly what you need help with. We read this inbox separately from the public email address.',
			nameLabel: 'Name',
			emailFieldLabel: 'Email',
			messageLabel: 'Message',
			submitLabel: 'Send',
			sendingLabel: 'Sending…',
			successTitle: 'Your message has been sent!',
			success: 'Thank you. We usually reply the same weekday.',
			successUrgent: 'Need to reach us right away? Call one of our colleagues below.',
			sendFailed: 'The message could not be sent. Try again or email us at the address below.',
			rateLimited: 'Too many messages right now. Wait a moment and try again.',
			leaveWarning: 'Your message has not been sent. Do you want to leave this page and lose what you wrote?',
			privacy: {
				before: 'We use the details to reply. Read more in the ',
				link: 'privacy policy',
				after: '.'
			},
			errors: {
				name: 'Please enter your name.',
				email: 'Please enter a valid email address.',
				message: 'Please enter a message.'
			}
		},
		people: [
			{
				name: 'Per-Erik Fägerman',
				role: 'CEO',
				phone: '+46 733 20 60 50',
				phoneHref: 'tel:+46733206050',
				reason: 'Call me about Mandalon, chip packaging, or the lab.',
				bio: 'More than 25 years of experience with packaging, bonding and chip troubleshooting.'
			},
			{
				name: 'Isabelle Fägerman',
				role: 'CFO',
				reason: 'Call me about invoices, quotations, or lead times.',
				bio: 'Experience in organisation and finance from several companies in the electronics industry.'
			},
			{
				name: 'Jonatan Gezelius',
				role: 'Electronics engineer',
				phone: '+46 73 58 48 690',
				phoneHref: 'tel:+46735848690',
				reason: 'Call me about test systems, electronics design, circuit boards, or chip packaging.',
				bio: 'Electronics engineer since 2019, with experience in production test systems, electronics design and PCB design from idea to a finished board.'
			}
		],
		address: {
			company: 'Mandalon Technologies AB',
			street: 'Bjärby Himmelslund 1',
			postalCode: '585 61',
			city: 'Linghem',
			country: 'Sweden'
		},
		orgNumberLabel: 'Org. no.',
		orgNumber: '556616-3670',
		locationTitle: 'Visit us',
		visitNote: 'The lab is outside Linköping, in Linghem. Visits are by appointment.',
		shippingNote: 'Shipments are best sent with PostNord. Other carriers often take several days longer.',
		mapTitle: 'Map to Mandalon',
		mapEnableLabel: 'Click to use the map'
	}
};
