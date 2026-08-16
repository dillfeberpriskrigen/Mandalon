import type { HomeContent } from '../types';

export const home = {
	sv: {
		hero: {
			title: 'När packaging måste fungera redan i första prototypen',
			copy: 'Mandalon hjälper team att gå från chip, sensor eller MEMS-idé till en monterbar och fungerande lösning. Vi har mer än 25 års erfarenhet från labb och produktion.'
		},
		salesIntro: {
			title: 'Packaging som gör prototypen byggbar',
			paragraphs: [
				'Packaging är ofta det lilla steget som avgör om resten går att bygga. När bonding, kapsling eller montering kommer in sent dyker problemen upp först när prototypen redan borde fungera, och små detaljer i konstruktionen blir då plötsligt dyra.',
				'Mandalon kombinerar praktiskt labbarbete med designnära rådgivning så att chip, pads, kapsling och kontaktytor hänger ihop från början. Det kortar startsträckan och minskar risken att en bra idé fastnar i ett packagingproblem.'
			],
			resource: {
				label: 'Läs Mandalons designguide',
				page: 'designGuide',
				text: 'Designguiden är ett bra exempel på hur Mandalon arbetar transparent och informativt redan tidigt i processen.'
			},
			actions: [
				{ label: 'Paketering av Chip', page: 'packaging' },
				{ label: 'Kontakt', page: 'contact' }
			]
		},
		process: {
			title: 'Tre sätt att avlasta ert team tidigare i processen',
			steps: [
				{
					title: '1. Fånga riskerna tidigt',
					text: 'Identifiera problem i chip-design, pad-placering, substrat eller kapsling innan de hinner bli dyra.'
				},
				{
					title: '2. Bygg en fungerande prototyp',
					text: 'Bonding, montering och skydd av känsliga strukturer utförs med fokus på att få fram något som faktiskt går att verifiera.'
				},
				{
					title: '3. Ta nästa steg med trygghet',
					text: 'Med praktiska erfarenheter från montering blir det lättare att fatta beslut om fortsatt utveckling, process eller produktionsväg.'
				}
			]
		},
		consulting: {
			title: 'Konsulttjänster som går att använda direkt i projektet',
			intro:
				'Förutom labbet erbjuder Mandalon konsulttjänster, oftast hos kund och i nära samarbete med utvecklingsteamet. De går att kombinera med bonding, montering och paketering.',
			labels: {
				previous: 'Föregående bild',
				next: 'Nästa bild',
				goToSlide: 'Gå till bild {index}: {title}'
			},
			features: [
				{
					title: 'Design chip & sensorer',
					text: 'Vi hjälper till med hur ert kisel bör designas för att det ska gå bra att montera och bonda.',
					image: { src: '/mandalon/design-chip.webp', alt: 'Design chip & sensorer', width: 840, height: 440 },
					page: 'consulting',
					section: 'chip-design'
				},
				{
					title: 'Processutveckling',
					text: 'Mandalons mångåriga erfarenhet ställs gärna till förfogande när ni behöver utveckla en egen process.',
					image: { src: '/mandalon/chip-prototypes.webp', alt: 'Processutveckling', width: 1024, height: 680 },
					page: 'consulting',
					section: 'process-development'
				},
				{
					title: 'Projektledning',
					text: 'Vi på Mandalon erbjuder projektledning vid förfrågan.',
					image: { src: '/mandalon/project.webp', alt: 'Projektledning', width: 840, height: 440 },
					page: 'consulting',
					section: 'project-management'
				}
			]
		}
	},
	en: {
		hero: {
			title: 'When packaging has to work in the very first prototype',
			copy: 'Mandalon helps teams move from chip, sensor or MEMS concept to a mountable and working solution. We have more than 25 years of lab and production experience.'
		},
		salesIntro: {
			title: 'Packaging that makes the prototype buildable',
			paragraphs: [
				'Packaging is often the small step that decides whether the rest can actually be built. When bonding, encapsulation or assembly comes in late, problems show up only when the prototype should already work, and small design details then become expensive.',
				'Mandalon combines practical lab work with design-oriented guidance so chips, pads, encapsulation and interconnects fit together from the beginning. That shortens the path and reduces the risk that a good idea gets stuck in a packaging issue.'
			],
			resource: {
				label: 'Read Mandalon’s design guide',
				page: 'designGuide',
				text: 'The design guide is a concrete example of how Mandalon works with transparency and practical guidance early in the process.'
			},
			actions: [
				{ label: 'Chip & Sensors', page: 'packaging' },
				{ label: 'Contact', page: 'contact' }
			]
		},
		process: {
			title: 'Three ways to lighten the load on your team earlier in the process',
			steps: [
				{
					title: '1. Identify risks early',
					text: 'Find issues in chip design, pad placement, substrate choices or encapsulation before they become expensive.'
				},
				{
					title: '2. Build a working prototype',
					text: 'Bonding, assembly and protection of delicate structures are handled with the goal of producing something that can actually be verified.'
				},
				{
					title: '3. Move forward with confidence',
					text: 'Practical assembly experience makes it easier to choose the next development, process or production step.'
				}
			]
		},
		consulting: {
			title: 'Consulting services you can use directly in your project',
			intro:
				'In addition to the lab, Mandalon offers consulting services, usually close to the customer team. They can also be combined with bonding, assembly and packaging.',
			labels: {
				previous: 'Previous slide',
				next: 'Next slide',
				goToSlide: 'Go to slide {index}: {title}'
			},
			features: [
				{
					title: 'Chip & sensor design',
					text: 'We can help shape your silicon design so it is easier to mount and bond successfully.',
					image: { src: '/mandalon/design-chip.webp', alt: 'Chip & sensor design', width: 840, height: 440 },
					page: 'consulting',
					section: 'chip-design'
				},
				{
					title: 'Process development',
					text: 'Mandalon’s long experience is available when you need to develop your own process.',
					image: { src: '/mandalon/chip-prototypes.webp', alt: 'Process development', width: 1024, height: 680 },
					page: 'consulting',
					section: 'process-development'
				},
				{
					title: 'Project management',
					text: 'Mandalon can also provide project management support on request.',
					image: { src: '/mandalon/project.webp', alt: 'Project management', width: 840, height: 440 },
					page: 'consulting',
					section: 'project-management'
				}
			]
		}
	}
} satisfies Record<'sv' | 'en', HomeContent>;
