import type { HomeContent } from '../types';

export const home = {
	sv: {
		hero: {
			title: 'Trådbondning och paketering för era halvledare',
			copy: 'Mandalon är med ert team från idé till produktion. Vi har mer än 25 års erfarenhet av avancerad paketering, bondning och testsystem.'
		},
		salesIntro: {
			title: 'Vi kapslar ert chip i Linköping',
			paragraphs: [
				'Trådbondning och paketering, på engelska Advanced Packaging, är oftast ett litet men avgörande steg för att kunna använda chipet. I vårt labb strax utanför Linköping har vi erfarenhet och maskiner för att få kontakt med det mesta.',
				'Vi är gärna med i ett tidigt skede, när det fortfarande går att påverka chipets bondbarhet i layouten. Vi kan naturligtvis också hjälpa till senare i processen.',
				'Svårbondade prototyper är inget främmande för oss på Mandalon, så var inte rädd att höra av er även om andra aktörer säger att det inte går. Om det verkligen inte går att bonda kan vi använda ledande lim och fästa bondtrådarna manuellt för att få er viktiga prototyp att fungera till mässan. Det går faktiskt!',
				'Ju tidigare i processen ni hör av er, desto bättre och billigare blir det.'
			],
			image: {
				src: '/mandalon/intro.webp',
				alt: 'Närbild av trådbondning på ett chip',
				width: 768,
				height: 1024
			},
			actions: [
				{ label: 'Kontakt', page: 'contact' },
				{ label: 'Paketering av chip', page: 'packaging' },
				{ label: 'Designguide', page: 'designGuide' }
			]
		},
		process: {
			title: 'Tre sätt Mandalon avlastar ert team under hela processen',
			steps: [
				{
					title: '1. Se riskerna i tid',
					text: 'Hitta problem i chipdesign, padplacering, substrat eller kapsling innan de hinner bli dyra.'
				},
				{
					title: '2. Montera prototypen',
					text: 'Bondning, montering och skydd av känsliga strukturer, med fokus på att få fram något som faktiskt går att verifiera.'
				},
				{
					title: '3. Ta steget till produktion',
					text: 'Vi har maskiner och kapacitet för att klara mindre serier och växer gärna med er.'
				}
			]
		},
		consulting: {
			title: 'Konsulttjänster som går att använda direkt i projektet',
			intro:
				'Förutom labbet erbjuder Mandalon konsulttjänster. De går att kombinera med bondning och paketering, och omfattar också testsystem, schema och kretskortsdesign.',
			labels: {
				previous: 'Föregående bild',
				next: 'Nästa bild',
				goToSlide: 'Gå till bild {index}: {title}'
			},
			features: [
				{
					title: 'Elektronik & testsystem',
					text: 'Testsystem, schema och kretskortsdesign, som projekt eller på löpande timmar.',
					image: {
						src: '/mandalon/pcblayout.webp',
						alt: 'Kretskortslayout från ECAD med Mandalon-logotyp och anslutningar längs kanterna',
						width: 976,
						height: 895
					},
					page: 'consulting',
					section: 'engineering'
				},
				{
					title: 'Design chip & sensorer',
					text: 'Vi hjälper till med hur ert kisel bör designas för att det ska gå bra att montera och bonda.',
					image: { src: '/mandalon/design-chip.webp', alt: 'Närbild av kretskort med monterad krets', width: 840, height: 440 },
					page: 'consulting',
					section: 'chip-design'
				},
				{
					title: 'Processutveckling',
					text: 'Mandalons erfarenhet finns där när ni behöver utveckla en egen process.',
					image: { src: '/mandalon/chip-prototypes.webp', alt: 'Tidig idéskiss', width: 1024, height: 680 },
					page: 'consulting',
					section: 'process-development'
				},
				{
					title: 'Projektledning',
					text: 'Vi på Mandalon erbjuder projektledning vid förfrågan.',
					image: { src: '/mandalon/project.webp', alt: 'Miniatyrfigurer som arbetar på ett kretskort', width: 840, height: 440 },
					page: 'consulting',
					section: 'project-management'
				}
			]
		}
	},
	en: {
		hero: {
			title: 'Wire bonding and advanced packaging for your semiconductors',
			copy: 'Mandalon is with your team from idea to production. We have more than 25 years of experience in advanced packaging, bonding and test systems.'
		},
		salesIntro: {
			title: 'We package your chip in Linköping, Sweden',
			paragraphs: [
				'Advanced packaging is often a small but vital step if you are going to use your chip. In our lab, just outside Linköping in Sweden, we have the experience and machines to make contact with most things.',
				'We are happy to join at an early stage, when there is still time to influence how bondable the chip will end up. Of course we can also help later in the process.',
				'Difficult-to-bond prototypes are nothing new to us at Mandalon, so do not hesitate to get in touch even if others say it cannot be done. If it really cannot be bonded, we can even use conductive adhesive to glue the bond wires by hand to get your important prototype working in time for the showcase. It actually works!',
				'The earlier in the process you get in touch, the better and cheaper it gets.'
			],
			image: {
				src: '/mandalon/intro.webp',
				alt: 'Close-up of wire bonding on a chip',
				width: 768,
				height: 1024
			},
			actions: [
				{ label: 'Contact', page: 'contact' },
				{ label: 'Chip packaging', page: 'packaging' },
				{ label: 'Design guide', page: 'designGuide' }
			]
		},
		process: {
			title: 'Three ways Mandalon helps your team throughout the process',
			steps: [
				{
					title: '1. Identify risks early',
					text: 'Find issues in chip design, pad placement, substrate choices or encapsulation before they become expensive.'
				},
				{
					title: '2. Assemble the prototype',
					text: 'Bonding, assembly and protection of delicate structures are handled with the goal of producing something that can actually be verified.'
				},
				{
					title: '3. Take the step into production',
					text: 'We have the machines and capacity for smaller series, and we are happy to grow with you.'
				}
			]
		},
		consulting: {
			title: 'Consulting services you can use directly in your project',
			intro:
				'In addition to the lab, Mandalon offers consulting services. They can be combined with bonding and packaging, and also cover test systems, schematics and PCB design.',
			labels: {
				previous: 'Previous slide',
				next: 'Next slide',
				goToSlide: 'Go to slide {index}: {title}'
			},
			features: [
				{
					title: 'Electronics & test systems',
					text: 'Test systems, schematics and PCB design, as a project or on an hourly basis.',
					image: {
						src: '/mandalon/pcblayout.webp',
						alt: 'PCB layout from ECAD with the Mandalon logo and connectors along the edges',
						width: 976,
						height: 895
					},
					page: 'consulting',
					section: 'engineering'
				},
				{
					title: 'Chip & sensor design',
					text: 'We can help shape your silicon design so it is easier to mount and bond successfully.',
					image: { src: '/mandalon/design-chip.webp', alt: 'Close-up of a circuit board with a mounted chip', width: 840, height: 440 },
					page: 'consulting',
					section: 'chip-design'
				},
				{
					title: 'Process development',
					text: "Mandalon's long experience is available when you need to develop your own process.",
					image: { src: '/mandalon/chip-prototypes.webp', alt: 'Early concept sketch', width: 1024, height: 680 },
					page: 'consulting',
					section: 'process-development'
				},
				{
					title: 'Project management',
					text: 'Mandalon can also provide project management support on request.',
					image: { src: '/mandalon/project.webp', alt: 'Miniature figures working on a circuit board', width: 840, height: 440 },
					page: 'consulting',
					section: 'project-management'
				}
			]
		}
	}
} satisfies Record<'sv' | 'en', HomeContent>;
