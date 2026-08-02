import type { ConsultingPageContent } from '../types';

export const consultingPage = {
	sv: {
		meta: {
			title: 'Mandalon | Konsulttjänster',
			description:
				'Samlade konsulttjänster inom design, processutveckling, projektledning och ingenjörsstöd för team som behöver komma snabbare till en fungerande lösning.'
		},
		title: 'Konsulttjänster',
		lead: 'Förutom det som görs i det egna labbet erbjuder Mandalon konsulttjänster som oftast sker hos kund och i nära samarbete med utvecklingsteamet. Det går också fint att kombinera dem med bonding, montering och paketering i vårt labb.',
		introTitle: 'Stöd där praktisk packaging-erfarenhet gör störst skillnad',
		introText:
			'Behovet ser olika ut från projekt till projekt. Ibland handlar det om att vässa en befintlig process, ibland om att undvika designval som senare gör montering och bonding onödigt svår. Därför samlar vi konsultstödet på en sida, så det blir tydligare hur Mandalon kan gå in där ni behöver mest avlastning.',
		services: [
			{
				title: 'Design chip & sensorer',
				text: 'Vi hjälper till med hur ert kisel bör designas för att det ska gå bra att montera och bonda. Ofta finns målkonflikter mellan liten yta, tät padpitch och vad som faktiskt går att få att fungera robust i prototyp och montering.',
				points: [
					'Stöd kring chip-design, pads och monterbarhet',
					'Praktisk återkoppling innan konstruktionen låses',
					'Designguide och erfarenhet från verkliga fallgropar'
				]
			},
			{
				title: 'Processutveckling',
				text: 'Mandalons mångåriga erfarenhet från vitt skilda projekt kan användas när ni behöver utveckla eller vässa en egen process. Fokus ligger på att hitta arbetssätt som fungerar i praktiken.',
				points: [
					'Erfarenhetsbaserat stöd i processfrågor',
					'Hjälp att vässa parametrar, upplägg och flöden',
					'Relevant när ni bygger upp egen kapacitet eller metod'
				]
			},
			{
				title: 'Projektledning',
				text: 'Vid behov kan Mandalon också gå in med projektledning hos kund. Oftast fungerar vi sömlöst som packaging-partner i ett större projekt, men när det behövs kan vi också ta ett tydligare ledningsansvar.',
				points: ['Projektledning på förfrågan', 'Packaging-perspektiv in i större utvecklingsprojekt', 'Stöd när många delar behöver hänga ihop i rätt ordning']
			},
			{
				title: 'Ingenjörstjänster',
				text: 'Ingenjörsstöd ingår ofta naturligt i Mandalons vanliga uppdrag, men kan också erbjudas separat när ni behöver en erfaren partner i utvecklingsarbetet utan att bygga en egen full intern funktion.',
				points: [
					'Praktiskt ingenjörsstöd nära utvecklingsteamet',
					'Bra komplement när intern specialisttid är begränsad',
					'Kan kombineras med både labbarbete och designstöd'
				]
			}
		]
	},
	en: {
		meta: {
			title: 'Mandalon | Consulting Services',
			description:
				'Combined consulting services in design, process development, project management and engineering support for teams that need to reach a working solution faster.'
		},
		title: 'Consulting Services',
		lead: 'In addition to the work carried out in Mandalon’s own lab, we offer consulting services that are usually performed close to the customer team and can also be combined with bonding, assembly and packaging support.',
		introTitle: 'Support where practical packaging experience makes the biggest difference',
		introText:
			'The need varies from project to project. Sometimes it is about improving an existing process, sometimes about avoiding design decisions that later make assembly and bonding unnecessarily difficult. This page gathers those consulting services in one place so it is clearer where Mandalon can reduce risk and help your team move forward.',
		services: [
			{
				title: 'Chip & sensor design',
				text: 'We help shape silicon, pad placement and related design choices so assembly and bonding are practical in the real world. Small chips and tight pad pitch may look attractive on paper but often create unnecessary difficulty later.',
				points: [
					'Support around chip design, pads and mountability',
					'Practical feedback before the design is locked',
					'Guidance based on common real-world pitfalls'
				]
			},
			{
				title: 'Process development',
				text: 'Mandalon’s long experience across very different projects is available when you need to build or sharpen your own process. The focus is on approaches that work in practice.',
				points: ['Experience-based process support', 'Help improving parameters, setup and flow', 'Relevant when building in-house capability or method']
			},
			{
				title: 'Project management',
				text: 'When needed, Mandalon can also provide project management support. Most often we integrate naturally as a packaging partner inside a broader project, but we can also take a more explicit coordination role when that is useful.',
				points: [
					'Project management on request',
					'A packaging perspective inside larger development efforts',
					'Useful when many moving parts need to line up in the right order'
				]
			},
			{
				title: 'Engineering services',
				text: 'Engineering support is often part of Mandalon’s regular assignments, but it can also be offered separately when your team needs experienced hands in development work without building a full in-house specialty function.',
				points: [
					'Hands-on engineering support close to the team',
					'Useful when internal specialist time is limited',
					'Can be combined with both lab work and design support'
				]
			}
		]
	}
} satisfies Record<'sv' | 'en', ConsultingPageContent>;
