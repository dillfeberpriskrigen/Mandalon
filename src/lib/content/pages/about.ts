import type { AboutPageContent } from '../types';

export const aboutIsoSectionId = 'iso-9001';
export const iso9001CertificateHref = '/mandalon/iso-9001-certificate.pdf';

export const aboutPage = {
	sv: {
		meta: {
			title: 'Mandalon | Om Mandalon',
			description: 'En kort presentation av Mandalon, bakgrunden i mikromontering och hur erfarenheten från forskning och labbarbete format erbjudandet.'
		},
		title: 'Om Mandalon',
		lead: 'Erfarenhet från forskning, labb och praktisk montering. Mandalon växte fram ur arbetet med sensorer och mikrosystem i Linköping och har sedan slutet av 1990-talet byggt upp ett tydligt fokus på chip packaging, bonding och designnära stöd.',
		introTitle: 'En introduktion till Mandalon',
		intro: [
			'Kompetenscentret S-Sence på Linköpings universitet är starkt bidragande till att företaget alls existerar. Inom detta program utvecklades bland annat "den elektroniska näsan" under 90-talet. De kemiska gassensorerna sattes samman på universitetet, men monteringsbehoven växte och en företagsidé föddes.',
			'I början hade vi vakuumteknik och ytbeläggningar på programmet. Från 2005, då företaget delades, är Mandalon Technologies AB ett renodlat mikroelektronikbolag.'
		],
		introImage: {
			src: '/mandalon/labhuset.webp',
			alt: 'Mandalons gula labbhus utanför Linköping',
			width: 1024,
			height: 730
		},
		storyTitle: 'Ett barn med bra idéer',
		story:
			'När företaget började materialiseras år 1999 var Per-Erik mitt uppe i familjelivet. En av hans döttrar introducerades för första gången till en grapefrukt och hade ingen aning om vad den kunde tänkas heta. Frukten såg ut som en mandarin, men var stor som en melon. Efter att ha övervägt sina fakta kom hon till insikt. Självklart var det en mandalon.',
		certificationTitle: 'ISO 9001:2015',
		certification:
			'Mandalon Technologies AB är ISO 9001:2015-certifierat. Det innebär i praktiken att arbetssätt, kvalitetssäkring och uppföljning sker inom ett etablerat kvalitetsledningssystem, vilket gör det lättare att arbeta strukturerat och repeterbart även i tekniskt krävande uppdrag.',
		certificationNote: 'Senaste omcertifiering: 2026-04-24.',
		certificationPdf: {
			href: iso9001CertificateHref,
			label: 'Ladda ner ISO 9001-certifikatet'
		},
		referencesTitle: 'Referenser och forskningsprojekt',
		referencesLead: 'Bakgrunden i forskning och längre industriprojekt är en viktig del av Mandalons trovärdighet. Här är några exempel som visar bredden.',
		referencesHeading: 'Utvalda referenser',
		researchProjectsHeading: 'Forskningsprojekt',
		references: [
			'Prismatic/GE HealthCare, mångårigt projekt, pågående',
			'Veoneer, design verification run 2017',
			'Neonode, industrialiseringsprocess 2015-16',
			'Autoliv, industrialiseringsprocess 2012-14'
		],
		researchProjects: [
			{
				title: 'Soot sensors for a healthy environment (SootSens)',
				href: 'https://www.diva-portal.org/smash/get/diva2:707196/FULLTEXT01.pdf'
			},
			{
				title: 'Piezoelectric micro-electromechanical systems for Nordic industry (NORD-pie)',
				href: 'https://www.diva-portal.org/smash/get/diva2:707173/FULLTEXT01.pdf'
			},
			{
				title: 'Soot sensors for efficient combustion and low emissions - SootSensII',
				href: 'https://www.diva-portal.org/smash/get/diva2:707206/FULLTEXT01.pdf'
			},
			{
				title: 'MEMS sensor packaging IMAPS seminar contribution'
			},
			{
				title: 'Characterization of a novel isotropic detector diode designed for phantom dosimetry in radiation therapy (Angelica Johansson)',
				href: 'https://www.diva-portal.org/smash/get/diva2:828482/FULLTEXT01.pdf'
			},
			{
				title: 'Detection of Soot Using a Resistivity Sensor Device Employing Thermophoretic Particle Deposition',
				href: 'https://liu.diva-portal.org/smash/get/diva2:374642/FULLTEXT01.pdf'
			},
			{
				title: 'Resistance Sensor Based on Thermophoresis for Soot in Diesel Exhaust',
				href: 'https://www.researchgate.net/publication/272335813_Resistance_Sensor_Based_on_Thermophoresis_for_Soot_in_Diesel_Exhaust'
			}
		],
		researchProfile: {
			label: 'Per-Erik Fägerman på ResearchGate',
			href: 'https://www.researchgate.net/profile/Per_Erik_Faegerman'
		},
		contactCta: {
			title: 'Behöver ni hjälp med chip, eller vill bara ha en rundtur av labbet?',
			text: 'Hör av er så går vi igenom hur Mandalons labb och erfarenhet passar ert projekt.',
			label: 'Kontakta oss',
			page: 'contact'
		}
	},
	en: {
		meta: {
			title: 'Mandalon | About Mandalon',
			description: 'A short introduction to Mandalon, its background in micro-assembly and how experience from research and lab work shaped the offer.'
		},
		title: 'About Mandalon',
		lead: 'Experience from research, lab work and hands-on assembly. Mandalon grew out of work with sensors and microsystems in Linköping and has, since the late 1990s, built a clear focus on chip packaging, bonding and design-oriented support.',
		introTitle: 'An introduction to Mandalon',
		intro: [
			'The S-Sence competence centre at Linköping University played a major role in Mandalon’s origin. Among other things, "the electronic nose" was developed within that programme during the 1990s. Those chemical gas sensors were assembled at the university, but the need for assembly work grew and a business idea took shape.',
			'In the beginning the company also worked with vacuum technology and surface coatings. Since 2005, when the company was divided, Mandalon Technologies AB has focused on microelectronics.'
		],
		introImage: {
			src: '/mandalon/labhuset.webp',
			alt: 'Mandalon’s yellow lab building outside Linköping',
			width: 1024,
			height: 730
		},
		storyTitle: 'A child with good ideas',
		story:
			'When the company started to take shape in 1999, Per-Erik was in the middle of family life. One of his daughters saw a grapefruit for the first time and had no idea what it could be called. It looked like a mandarin, but it was as large as a melon. After considering the facts, she reached the obvious conclusion: it had to be a mandalon.',
		certificationTitle: 'ISO 9001:2015',
		certification:
			'Mandalon Technologies AB is certified according to ISO 9001:2015. In practice, that means quality assurance, routines and follow-up are handled within an established quality management system, making it easier to work in a structured and repeatable way even in technically demanding assignments.',
		certificationNote: 'Latest recertification: 2026-04-24.',
		certificationPdf: {
			href: iso9001CertificateHref,
			label: 'Download the ISO 9001 certificate'
		},
		referencesTitle: 'References and research projects',
		referencesLead:
			'The combination of research background and longer industrial assignments is an important part of Mandalon’s credibility. These are a few examples.',
		referencesHeading: 'Selected references',
		researchProjectsHeading: 'Research projects',
		references: [
			'Prismatic/GE HealthCare, multi-year project, ongoing',
			'Veoneer, design verification run 2017',
			'Neonode, industrialisation process 2015-16',
			'Autoliv, industrialisation process 2012-14'
		],
		researchProjects: [
			{
				title: 'Soot sensors for a healthy environment (SootSens)',
				href: 'https://www.diva-portal.org/smash/get/diva2:707196/FULLTEXT01.pdf'
			},
			{
				title: 'Piezoelectric micro-electromechanical systems for Nordic industry (NORD-pie)',
				href: 'https://www.diva-portal.org/smash/get/diva2:707173/FULLTEXT01.pdf'
			},
			{
				title: 'Soot sensors for efficient combustion and low emissions - SootSensII',
				href: 'https://www.diva-portal.org/smash/get/diva2:707206/FULLTEXT01.pdf'
			},
			{
				title: 'MEMS sensor packaging IMAPS seminar contribution'
			},
			{
				title: 'Characterization of a novel isotropic detector diode designed for phantom dosimetry in radiation therapy (Angelica Johansson)',
				href: 'https://www.diva-portal.org/smash/get/diva2:828482/FULLTEXT01.pdf'
			},
			{
				title: 'Detection of Soot Using a Resistivity Sensor Device Employing Thermophoretic Particle Deposition',
				href: 'https://liu.diva-portal.org/smash/get/diva2:374642/FULLTEXT01.pdf'
			},
			{
				title: 'Resistance Sensor Based on Thermophoresis for Soot in Diesel Exhaust',
				href: 'https://www.researchgate.net/publication/272335813_Resistance_Sensor_Based_on_Thermophoresis_for_Soot_in_Diesel_Exhaust'
			}
		],
		researchProfile: {
			label: 'Per-Erik Fägerman on ResearchGate',
			href: 'https://www.researchgate.net/profile/Per_Erik_Faegerman'
		},
		contactCta: {
			title: 'Need help with a chip, or just want a tour of the lab?',
			text: 'Get in touch and we will go through how Mandalon’s lab and experience fit your project.',
			label: 'Contact us',
			page: 'contact'
		}
	}
} satisfies Record<'sv' | 'en', AboutPageContent>;
