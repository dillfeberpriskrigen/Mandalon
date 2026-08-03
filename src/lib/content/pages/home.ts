import type { HomeContent } from '../types';

export const home = {
	sv: {
		hero: {
			title: 'När packaging måste fungera redan i första prototypen',
			copy: 'Med över 25 års erfarenhet av projektledning, utveckling, bondning och design så hjälper Mandalon ditt team att gå från chip, sensor eller MEMS-idé till en monterbar, bondbar och fungerande lösning med praktisk erfarenhet från labb och produktion. '
		},
		salesIntro: {
			title: 'Packaging är ofta det lilla steget som avgör om resten faktiskt går att bygga.',
			paragraphs: [
				'När bonding, kapsling eller montering kommer in sent i processen dyker problemen ofta upp först när prototypen redan borde fungera. Då blir små detaljer i konstruktionen plötsligt dyra.',
				'Mandalon kombinerar praktiskt labbarbete med designnära rådgivning, så att chip, pads, kapsling och kontaktytor hänger ihop från början.',
				'Det gör startssträckan kortare och minskar risken för att en bra idé fastnar i ett packagingproblem.'
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
			title: 'Praktisk erfarenhet som går att använda direkt i projektet',
			features: [
				{
					title: 'Design chip & sensorer',
					text: 'Vi hjälper till med hur ert kisel bör designas för att det ska gå bra att montera och bonda.',
					image: { src: '/mandalon/design-chip.jpg', alt: 'Design chip & sensorer', width: 840, height: 440 }
				},
				{
					title: 'Processutveckling',
					text: 'Mandalons mångåriga erfarenhet ställs gärna till förfogande när ni behöver utveckla en egen process.',
					image: { src: '/mandalon/chip-prototypes.jpg', alt: 'Processutveckling', width: 1024, height: 680 }
				},
				{
					title: 'Projektledning',
					text: 'Vi på Mandalon erbjuder projektledning vid förfrågan.',
					image: { src: '/mandalon/project.jpg', alt: 'Projektledning', width: 840, height: 440 }
				}
			]
		}
	},
	en: {
		hero: {
			title: 'When packaging has to work in the very first prototype',
			copy: 'Mandalon helps teams move from chip, sensor or MEMS concept to a mountable, bondable and working solution, backed by practical lab and production experience.'
		},
		salesIntro: {
			title: 'Packaging is often the small step that determines whether the rest can actually be built.',
			paragraphs: [
				'When bonding, encapsulation or assembly is treated late in the process, problems often surface only when the prototype should already be working. Small design details suddenly become expensive.',
				'Mandalon combines practical lab work with design-oriented guidance so chips, pads, encapsulation and interconnect decisions fit together from the beginning.',
				'That shortens the path forward and reduces the risk that a good idea gets stuck in a packaging issue.'
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
			title: 'Three ways to reduce risk earlier in the process',
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
			title: 'Practical experience you can use directly in your project',
			features: [
				{
					title: 'Chip & sensor design',
					text: 'We can help shape your silicon design so it is easier to mount and bond successfully.',
					image: { src: '/mandalon/design-chip.jpg', alt: 'Chip & sensor design', width: 840, height: 440 }
				},
				{
					title: 'Process development',
					text: 'Mandalon’s long experience is available when you need to develop your own process.',
					image: { src: '/mandalon/chip-prototypes.jpg', alt: 'Process development', width: 1024, height: 680 }
				},
				{
					title: 'Project management',
					text: 'Mandalon can also provide project management support on request.',
					image: { src: '/mandalon/project.jpg', alt: 'Project management', width: 840, height: 440 }
				}
			]
		}
	}
} satisfies Record<'sv' | 'en', HomeContent>;
