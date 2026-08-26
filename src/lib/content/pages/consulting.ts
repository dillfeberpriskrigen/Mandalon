import type { ConsultingPageContent } from '../types';

export const consultingPage = {
	sv: {
		meta: {
			title: 'Mandalon | Konsulttjänster',
			description:
				'Konsulttjänster i Linköping: chipdesign, processutveckling, projektledning, testsystem, schema och kretskortsdesign. Oftast hos er, på projekt eller löpande timmar.'
		},
		title: 'Konsulttjänster',
		lead: 'Behöver ni tillfällig stöttning eller ytterligare kompetens till ert projekt?',
		services: {
			'chip-design': {
				title: 'Design chip & sensorer',
				subtitle: 'Så att kislet går att montera och bonda',
				paragraphs: [
					'Vi hjälper till med hur ert kisel bör designas för att det ska gå bra att montera och bonda. Ofta finns målkonflikter mellan liten yta, tät padpitch och vad som faktiskt går att få att fungera robust i prototyp och montering.',
					'En genomgång av pad-layout, pitch och passivering innan konstruktionen låses är oftast billigare än att rädda ett redan tillverkat chip. Designguiden samlar vanliga fallgropar och är ett bra komplement till en genomgång av just er layout.'
				],
				points: ['Pad-layout, pitch och monterbarhet', 'Återkoppling innan konstruktionen låses', 'Designguide plus erfarenhet från verkliga fallgropar'],
				image: {
					src: '/mandalon/design-chip.webp',
					alt: 'Närbild av kretskort med monterad krets',
					width: 840,
					height: 440
				},
				relatedLink: {
					label: 'Läs designguiden',
					page: 'designGuide'
				}
			},
			'process-development': {
				title: 'Processutveckling',
				subtitle: 'När ni bygger eller förbättrar en egen metod',
				paragraphs: [
					'Mandalons mångåriga erfarenhet från vitt skilda projekt kan användas när ni behöver utveckla eller förbättra en egen process. Fokus ligger på att hitta arbetssätt som fungerar i praktiken.',
					'Det kan handla om bondparametrar, limval, fixturer eller hur ett flöde ska se ut från prototyp till mindre serie. Vi utgår från vad som fungerat i tidigare uppdrag.'
				],
				points: ['Parametrar, fixturer och flöden', 'Stöd när ni bygger egen kapacitet', 'Praktiska arbetssätt'],
				image: {
					src: '/mandalon/chip-prototypes.webp',
					alt: 'Tidig idéskiss',
					width: 1024,
					height: 680
				}
			},
			'project-management': {
				title: 'Projektledning',
				subtitle: 'Packaging-perspektiv i ett större utvecklingsprojekt',
				paragraphs: [
					'Vid behov kan Mandalon gå in med projektledning hos er. Oftast fungerar vi som packaging-partner i ett större projekt, men när det behövs kan vi också ta ett tydligare ledningsansvar.',
					'Det är relevant när bondning, kapsling, inköp och verifiering måste hänga ihop i rätt ordning, och någon behöver hålla i den delen av tidplanen.'
				],
				points: ['Projektledning på förfrågan', 'Packaging in i tidplan och beslut', 'Koordinering när många delar ska hänga ihop'],
				image: {
					src: '/mandalon/project.webp',
					alt: 'Miniatyrfigurer som arbetar på ett kretskort',
					width: 840,
					height: 440
				}
			},
			engineering: {
				title: 'Elektronik & testsystem',
				subtitle: 'Testsystem, schema och kretskortsdesign',
				paragraphs: [
					'Vi hjälper till att ta fram testsystem, schema och kretskortsdesign, från idé till något som går att bygga och verifiera.',
					'Det passar när ni behöver elektronikstöd i projektet, eller när test och kort ska hänga ihop med paketeringen i labbet.'
				],
				points: ['Testsystem för produktion och verifiering', 'Kretskortslayout från idé till färdigt kort', 'Konsult på timbasis eller projekt'],
				image: {
					src: '/mandalon/pcblayout.webp',
					alt: 'Kretskortslayout från ECAD med Mandalon-logotyp och anslutningar längs kanterna',
					width: 976,
					height: 895
				}
			}
		},
		contactCta: {
			title: 'Behöver ni avlastning i design, process eller elektronik?',
			text: 'Hör av er så går vi igenom var Mandalon gör mest nytta. Hos er, i labbet, eller båda.',
			label: 'Kontakta oss',
			page: 'contact'
		}
	},
	en: {
		meta: {
			title: 'Mandalon | Consulting Services',
			description:
				'Consulting in Linköping: chip design, process development, project management, test systems, schematics and PCB design. Usually on site, as a project or on an hourly basis.'
		},
		title: 'Consulting Services',
		lead: 'Need additional engineering or project capacity without hiring permanently?',
		services: {
			'chip-design': {
				title: 'Chip & sensor design',
				subtitle: 'So the silicon can actually be mounted and bonded',
				paragraphs: [
					'We help shape silicon, pad placement and related design choices so assembly and bonding are practical in the real world. Small chips and tight pad pitch may look attractive on paper but often create unnecessary difficulty later.',
					'A review of pad layout, pitch and passivation before the design is locked is usually cheaper than rescuing a chip that is already made. The design guide collects common pitfalls and is a useful complement to a review of your specific layout.'
				],
				points: ['Pad layout, pitch and mountability', 'Feedback before the design is locked', 'Design guide plus experience from real-world pitfalls'],
				image: {
					src: '/mandalon/design-chip.webp',
					alt: 'Close-up of a circuit board with a mounted chip',
					width: 840,
					height: 440
				},
				relatedLink: {
					label: 'Read the design guide',
					page: 'designGuide'
				}
			},
			'process-development': {
				title: 'Process development',
				subtitle: 'When you are building or improving your own method',
				paragraphs: [
					"Mandalon's long experience across very different projects is available when you need to build or improve your own process. The focus is on approaches that work in practice.",
					'That can mean bond parameters, adhesives, fixtures, or how a flow should look from prototype to small series. We start from what has worked in earlier assignments.'
				],
				points: ['Parameters, fixtures and flow', 'Support when building in-house capability', 'Practical methods'],
				image: {
					src: '/mandalon/chip-prototypes.webp',
					alt: 'Early concept sketch',
					width: 1024,
					height: 680
				}
			},
			'project-management': {
				title: 'Project management',
				subtitle: 'A packaging perspective inside a larger development project',
				paragraphs: [
					'When needed, Mandalon can provide project management on site. Most often we work as a packaging partner inside a broader project, but we can also take a clearer lead when that is useful.',
					'It is relevant when bonding, encapsulation, purchasing and verification have to line up in the right order, and someone needs to own that part of the schedule.'
				],
				points: ['Project management on request', 'Packaging in the schedule and the decisions', 'Coordination when many parts need to line up'],
				image: {
					src: '/mandalon/project.webp',
					alt: 'Miniature figures working on a circuit board',
					width: 840,
					height: 440
				}
			},
			engineering: {
				title: 'Electronics & test systems',
				subtitle: 'Test systems, schematics and PCB design',
				paragraphs: [
					'We help develop test systems, schematics and PCB design, from idea to something that can be built and verified.',
					'It fits when you need electronics support in the project, or when test and boards should line up with the packaging done in the lab.'
				],
				points: ['Test systems for production and verification', 'PCB layout from idea to a finished board', 'Consulting by the hour or as a project'],
				image: {
					src: '/mandalon/pcblayout.webp',
					alt: 'PCB layout from ECAD with the Mandalon logo and connectors along the edges',
					width: 976,
					height: 895
				}
			}
		},
		contactCta: {
			title: 'Need help with design, process or electronics?',
			text: 'Get in touch and we will go through where Mandalon is most useful. At your site, in the lab, or both.',
			label: 'Contact us',
			page: 'contact'
		}
	}
} satisfies Record<'sv' | 'en', ConsultingPageContent>;
