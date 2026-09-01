import type { HomeContent } from '../types';

function srcset(src: string, fullWidth: number): string {
	const w480 = src.replace(/\.webp$/, '-480.webp');
	const w800 = src.replace(/\.webp$/, '-800.webp');
	return `${w480} 480w, ${w800} 800w, ${src} ${fullWidth}w`;
}

export const home = {
	sv: {
		hero: {
			title: 'Trådbondning och paketering för era halvledare',
			copy: 'Vi kombinerar expertis inom halvledarpaketering, elektronikdesign, projekt- och affärsledning i ett effektivt team.'
		},
		salesIntro: {
			title: 'Mandalon står redo',
			paragraphs: [
				'Vi är ett flexibelt ingenjörsföretag i Linköping som kombinerar 25 års erfarenhet av avancerad halvledarpaketering och trådbondning med elektronikdesign, projekt- och affärsledning.',
				'Vi hjälper er med avancerad paketering av halvledare, utveckling av testsystem, projektledning och planering. Mandalon kan erbjuda en helhetslösning eller stötta inom enskilda områden.'
			],
			points: ['Flexibelt åtagande efter ert behov', 'Bondning, testsystem och projektledning', 'Korta beslutsvägar, snabba åtgärder'],
			image: {
				src: '/mandalon/intro.webp',
				alt: 'Närbild av trådbondning på ett chip',
				width: 768,
				height: 1024
			},
			actions: [{ label: 'Kontakta oss idag', page: 'contact' }]
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
			title: 'Konsulttjänster',
			labels: {
				previous: 'Föregående bild',
				next: 'Nästa bild',
				goToSlide: 'Gå till bild {index}: {title}'
			},
			features: [
				{
					title: 'Paketering & trådbondning',
					text: 'Vi tar oss an även det som andra sagt är omöjligt.',
					image: {
						src: '/mandalon/designguide/picture-6.webp',
						alt: 'Ett ballbondat chip on board',
						width: 976,
						height: 895,
						srcset: srcset('/mandalon/designguide/picture-6.webp', 976)
					},
					page: 'packaging'
				},
				{
					title: 'Elektronik & testsystem',
					text: 'Testsystem, schema och kretskortsdesign, som projekt eller på löpande timmar.',
					image: {
						src: '/mandalon/pcblayout.webp',
						alt: 'Kretskortslayout från ECAD med Mandalon-logotyp och anslutningar längs kanterna',
						width: 976,
						height: 895,
						srcset: srcset('/mandalon/pcblayout.webp', 976)
					},
					page: 'consulting',
					section: 'engineering'
				},
				{
					title: 'Projektledning',
					text: 'Vi stöttar er oavsett om ni behöver en drivande kraft genom hela projektet eller extra kompetens i ett specifikt skede.',
					image: {
						src: '/mandalon/project.webp',
						alt: 'Miniatyrfigurer som arbetar på ett kretskort',
						width: 840,
						height: 440,
						srcset: srcset('/mandalon/project.webp', 840)
					},
					page: 'consulting',
					section: 'project-management'
				},
				{
					title: 'Design chip & sensorer',
					text: 'Vi hjälper till med hur ert kisel bör designas för att det ska gå bra att montera och bonda.',
					image: {
						src: '/mandalon/design-chip.webp',
						alt: 'Närbild av kretskort med monterad krets',
						width: 840,
						height: 440,
						srcset: srcset('/mandalon/design-chip.webp', 840)
					},
					page: 'consulting',
					section: 'chip-design'
				},
				{
					title: 'Processutveckling',
					text: 'Mandalons erfarenhet finns där när ni behöver utveckla en egen tillverkningsprocess.',
					image: {
						src: '/mandalon/chip-prototypes.webp',
						alt: 'Tidig idéskiss',
						width: 1024,
						height: 680,
						srcset: srcset('/mandalon/chip-prototypes.webp', 1024)
					},
					page: 'consulting',
					section: 'process-development'
				}
			]
		},
		contactCta: {
			title: 'Behöver ni hjälp med paketering, bondning eller elektronik?',
			text: 'Hör av er så går vi igenom var Mandalon gör mest nytta. Hos er, i labbet, eller båda.',
			label: 'Kontakta oss',
			page: 'contact'
		}
	},
	en: {
		hero: {
			title: 'Wire bonding and advanced packaging for your semiconductors',
			copy: 'We combine deep semiconductor packaging expertise, practical electronics engineering and project and business management in one efficient team.'
		},
		salesIntro: {
			title: 'Mandalon is ready',
			paragraphs: [
				'We are a flexible engineering company in Linköping that combines 25 years of experience in advanced semiconductor packaging and wire bonding with electronics design, project and business management.',
				'We help you with advanced semiconductor packaging, test system development, project management and planning. Mandalon can offer a complete solution or support in individual areas.'
			],
			points: ['Flexible commitment based on your needs', 'Bonding, test systems and project management', 'Short decision paths, fast action'],
			image: {
				src: '/mandalon/intro.webp',
				alt: 'Close-up of wire bonding on a chip',
				width: 768,
				height: 1024
			},
			actions: [{ label: 'Contact us today', page: 'contact' }]
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
			title: 'Consulting services',
			labels: {
				previous: 'Previous slide',
				next: 'Next slide',
				goToSlide: 'Go to slide {index}: {title}'
			},
			features: [
				{
					title: 'Packaging & wire bonding',
					text: 'We also take on what others have said is impossible.',
					image: {
						src: '/mandalon/designguide/picture-6.webp',
						alt: 'A ball-bonded chip on board',
						width: 976,
						height: 895,
						srcset: srcset('/mandalon/designguide/picture-6.webp', 976)
					},
					page: 'packaging'
				},
				{
					title: 'Electronics & test systems',
					text: 'Test systems, schematics and PCB design, as a project or on an hourly basis.',
					image: {
						src: '/mandalon/pcblayout.webp',
						alt: 'PCB layout from ECAD with the Mandalon logo and connectors along the edges',
						width: 976,
						height: 895,
						srcset: srcset('/mandalon/pcblayout.webp', 976)
					},
					page: 'consulting',
					section: 'engineering'
				},
				{
					title: 'Project management',
					text: 'We support you whether you need a driving force through the whole project or extra competence at a specific stage.',
					image: {
						src: '/mandalon/project.webp',
						alt: 'Miniature figures working on a circuit board',
						width: 840,
						height: 440,
						srcset: srcset('/mandalon/project.webp', 840)
					},
					page: 'consulting',
					section: 'project-management'
				},
				{
					title: 'Chip & sensor design',
					text: 'We can help shape your silicon design so it is easier to mount and bond successfully.',
					image: {
						src: '/mandalon/design-chip.webp',
						alt: 'Close-up of a circuit board with a mounted chip',
						width: 840,
						height: 440,
						srcset: srcset('/mandalon/design-chip.webp', 840)
					},
					page: 'consulting',
					section: 'chip-design'
				},
				{
					title: 'Process development',
					text: "Mandalon's experience is there when you need to develop your own manufacturing process.",
					image: {
						src: '/mandalon/chip-prototypes.webp',
						alt: 'Early concept sketch',
						width: 1024,
						height: 680,
						srcset: srcset('/mandalon/chip-prototypes.webp', 1024)
					},
					page: 'consulting',
					section: 'process-development'
				}
			]
		},
		contactCta: {
			title: 'Need help with packaging, bonding or electronics?',
			text: 'Get in touch and we will go through where Mandalon is most useful. At your site, in the lab, or both.',
			label: 'Contact us',
			page: 'contact'
		}
	}
} satisfies Record<'sv' | 'en', HomeContent>;
