import type { GlossaryPageContent } from '../types';

export const glossaryPage = {
	sv: {
		meta: {
			title: 'Mandalon | Kunskapsbank',
			description: 'En samlad guidesida med innehåll från Mandalons tidigare hjälpsidor: vanliga frågor, ASIC, MEMS, wafer, sensorer och mikrostrukturer.'
		},
		title: 'Kunskapsbank för packaging, bonding och mikrostrukturer.',
		lead: 'Det här är en samlad version av Mandalons tidigare hjälpsidor. Här finns både vanliga frågor och korta introduktioner till ASIC, MEMS, wafer, sensorer och mikrostrukturer.',
		intro: [
			'Här finns information samlad om vad vi gör och hur vi jobbar.',
			'Länkarna i den gamla hjälpsidan ledde vidare in i Mandalons micro-kosmos. Här har vi i stället samlat innehållet på ett ställe så att det blir lättare att läsa.'
		],
		introImage: {
			src: '/mandalon/help-capillary.jpg',
			alt: 'Närbild av bondningsverktyg'
		},
		faqTitle: 'Vanliga frågor',
		faqs: [
			{
				question: 'Hur gör Mandalon när problem uppkommer vid trådbondning och paketering?',
				answer:
					'Vid trådbondning och paketering uppkommer ofta vitt skilda problem, särskilt vid prototypframtagning då chipet ofta ska få kontakt med omvärlden för första gången. Tillsammans med kunden och efter kundens önskemål arbetas lösningen fram och avslutas först när kunden är nöjd med resultatet. De problem som uppdagas kommuniceras så transparent som möjligt för att gemensamt och snabbt hitta en bra lösning.'
			},
			{
				question: 'Hur kan Mandalon hjälpa oss?',
				answer:
					'Mångårig erfarenhet av diametralt olika strukturer hjälper Mandalon att finna paketeringslösningen även på ert problem. Exakt hur upplägget ser ut anpassas efter problemet och vilka andra randvillkor som gäller.'
			},
			{
				question: 'Kan Mandalon guida under designfasen?',
				answer:
					'Väldigt gärna. Ju tidigare vi kommer in desto fler misstag kan undvikas. Den bästa hjälpen ges ofta i direktkontakt, men designguiden är också ett bra första stöd för vad som är klokt att tänka på tidigt.'
			},
			{
				question: 'Transportlogistik?',
				answer:
					'För Mandalons del fungerar PostNord bäst både för in- och uttransporter. Andra transportföretag riskerar ibland att ta dagar längre, undantaget budfirmor där kostnadsbilden är en annan.'
			}
		],
		guide: {
			title: 'Designguide',
			text: 'Designguiden togs fram tillsammans med doktorander vid Linköpings universitet och ar ett bra komplement om ni vill förstå fler vanliga fallgropar tidigt i processen.',
			label: 'Till designguiden',
			page: 'designGuide'
		},
		sections: {
			asic: {
				title: 'ASIC',
				subtitle: 'AnvändarSpecifik Integrerad Krets, Application Specific IC',
				paragraphs: [
					'Vi finner i denna kategori de chip som designats för ett specifikt ändamål, ASIC, medan andra egna kategorier är till exempel MEMS och sensorer.',
					'Dessa chip har ofta många anslutningar och padutrymmet är snålt. ASICen har också ofta behov av många I/O:s och datamängderna gör att allt ska gå snabbt. Detta kräver korta trådar och gärna stor diameter på mätningsanslutningarna, vilket i sig ofta är en svår kombination.',
					'Mandalon hjälper er med layouten så att ASICen och systemet i stort bibehåller sin funktionalitet och inte försämras av paketeringen. Med ett utkast går vi sedan gärna vidare tillsammans med er för att ta fram en fungerande design.',
					'Mandalon föreslår hur monteringen kan göras på bästa sätt, samt lamplig bärare, PCB eller kapsel. Efter leverans ber vi om återkoppling för att säkerställa att resultatet blivit det önskade.'
				],
				image: '/mandalon/help-asic.jpg',
				imageAlt: 'Manuellt bondad ASIC',
				caption: 'Manuellt bondad ASIC med pitch 60 um'
			},
			mems: {
				title: 'MEMS',
				subtitle: 'Micro Electro Mechanical Systems',
				paragraphs: [
					'MEMS är när man använder kisel till annat än bara kretsmedium. MEMS  är ett växande och väldigt intressant område.',
					'Området överlappar delvis sensorer men är inte synonymt, då det exempelvis också innefattar mikrohögtalare. Man talar ibland om sensors and actuators.',
					'Under årens lopp har många strukturer passerat Mandalon då även dessa behöver sin kontakt med omvärlden. Ofta är anslutningarna färre men olika framställningssätt gör ibland bondningen svår. Ofta är även själva monteringen komplicerad då funktionaliteten kräver speciallösningar.'
				]
			},
			wafer: {
				title: 'WAFER',
				subtitle: 'Mandalon hanterar sagade wafer',
				paragraphs: ['Vi sågar inte wafers själva men hanterar plockning av chip manuellt upp till hanterbara och ekonomiskt försvarbara volymer.'],
				image: '/mandalon/help-wafer.jpg',
				imageAlt: 'Plockade chip i ask',
				caption: 'Plockade chip i ask'
			},
			sensors: {
				title: 'Sensorer',
				subtitle: 'Där Mandalon började',
				paragraphs: [
					'I början fanns näsan. Näsan var elektronisk.',
					'Det var mot slutet av förra millenniet när Mandalon först öppnade sina ögon. Värdet av att kunna lukta på omvärlden förstods snart, och Mandalon började montera kemiska gassensorer.',
					'Då hade företaget inte ens sitt namn ännu, men det ville ändå fortsätta med det här arbetet utanför universitetet också, eftersom det verkade finnas behov av näsor.',
					'Resan har fortsatt och idag monteras många olika strukturer. Mandalon paketerar, trådbondar och kapslar mikroelektronik, och arbetar förstås fortfarande med sensorer.'
				]
			},
			microstructures: {
				title: 'Mikrostrukturer',
				subtitle: 'Alla små strukturer nära chipet',
				paragraphs: [
					'Detta innefattar egentligen alla små strukturer nära chipet.',
					'Delvis överlappande MEMS, men innefattar för Mandalons del ofta också bygget av kringstrukturen. Det kan gälla en integrerad mikrovärmare eller en MCM, Multi-chip-modul. Integrerad gaskanal eller en spegel.',
					'På Mandalon har vi både tradition och erfarenhet av att välkomna utmaningar, sätt oss gärna på prov.'
				],
				image: '/mandalon/help-microstructures.jpg',
				imageAlt: 'Abstrakt mikrostruktur',
				caption: 'Mikrostrukturer och kringstruktur'
			}
		}
	},
	en: {
		meta: {
			title: 'Mandalon | Knowledge Bank',
			description: 'A collected help and glossary page based on Mandalon’s earlier help pages, including FAQ, ASIC, MEMS, wafer, sensors and microstructures.'
		},
		title: 'Knowledge bank for packaging, bonding and microstructures.',
		lead: 'This page brings together material from Mandalon’s earlier help pages. It includes both common questions and short introductions to ASIC, MEMS, wafer handling, sensors and microstructures.',
		intro: [
			'This is where information about what Mandalon does and how the team works was originally collected.',
			'Instead of splitting that material across many small help pages, it now lives here in one place.'
		],
		introImage: {
			src: '/mandalon/help-capillary.jpg',
			alt: 'Close-up of bonding equipment'
		},
		faqTitle: 'Common questions',
		faqs: [
			{
				question: 'How does Mandalon handle problems that appear during wire bonding or packaging?',
				answer:
					'Problems of many different kinds appear during wire bonding and packaging, especially in prototype work when the chip often needs to communicate with the outside world for the first time. Solutions are worked out together with the customer and the process is not finished until the result feels right. Issues that appear are communicated as transparently as possible so a good solution can be found quickly together.'
			},
			{
				question: 'How can Mandalon help us?',
				answer:
					'Long experience with very different kinds of structures helps Mandalon find a packaging solution for your problem as well. The exact setup is adapted to the challenge itself and to the practical conditions around it.'
			},
			{
				question: 'Can Mandalon help during the design phase?',
				answer:
					'Very gladly. The earlier Mandalon comes in, the more mistakes can be avoided. The design guide is a helpful first resource, but the best support usually comes through direct contact.'
			},
			{
				question: 'What about transport logistics?',
				answer:
					'For Mandalon, PostNord has worked best for both incoming and outgoing deliveries. Other transport companies may sometimes take longer, with couriers being the main exception when the cost picture is different.'
			}
		],
		guide: {
			title: 'Design guide',
			text: 'The design guide was developed together with doctoral researchers at Linköping University and is still a useful complement if you want to understand common packaging pitfalls early.',
			label: 'Open the design guide',
			page: 'designGuide'
		},
		sections: {
			asic: {
				title: 'ASIC',
				subtitle: 'Application Specific Integrated Circuit',
				paragraphs: [
					'This category includes chips designed for a specific purpose, while other Mandalon categories include MEMS and sensors.',
					'These chips often have many connections and limited pad area. They also tend to need many I/Os and high data rates, which calls for short wires and robust feed connections, a combination that is often difficult.',
					'Mandalon helps with the layout so the ASIC and the surrounding system keep their functionality and are not weakened by the packaging. From a first draft, the work can continue together toward a design that actually works.',
					'Mandalon can also suggest how assembly should be done, what carrier, PCB or package is suitable, and follow up after delivery to make sure the outcome matches expectations.'
				],
				image: '/mandalon/help-asic.jpg',
				imageAlt: 'Manually wire bonded ASIC',
				caption: 'Manually bonded ASIC with 60 um pitch'
			},
			mems: {
				title: 'MEMS',
				subtitle: 'Micro Electro Mechanical Systems',
				paragraphs: [
					'MEMS is what you get when silicon is used for more than circuitry alone. It is a growing and very interesting field.',
					'The area overlaps partly with sensors but is not the same thing, since it can also include structures such as microspeakers. People sometimes speak of sensors and actuators.',
					'Many such structures have passed through Mandalon over the years because they also need reliable contact with the outside world. Bonding can be difficult and assembly is often complicated because the functionality requires special solutions.'
				]
			},
			wafer: {
				title: 'Wafer',
				subtitle: 'Mandalon handles sawn wafers',
				paragraphs: [
					'Mandalon does not perform the sawing itself, but handles manual picking of chips up to volumes that remain practical and economically reasonable.'
				],
				image: '/mandalon/help-wafer.jpg',
				imageAlt: 'Picked chips in tray',
				caption: 'Picked chips in tray'
			},
			sensors: {
				title: 'Sensors',
				subtitle: 'Where Mandalon began',
				paragraphs: [
					'In the beginning there was the nose. The nose was electronic.',
					'This was near the end of the previous millennium when Mandalon first opened its eyes. The value of being able to smell the outside world was soon understood, and Mandalon started assembling chemical gas sensors.',
					'Back then the company did not even have its name yet, but it still wanted to keep doing this work outside the university as well because there seemed to be a need for noses.',
					'The journey has continued and today many different structures are assembled. Mandalon packages, wire bonds and encapsulates microelectronics, and of course still works with sensors.'
				]
			},
			microstructures: {
				title: 'Microstructures',
				subtitle: 'Small structures close to the chip',
				paragraphs: [
					'This really includes all small structures near the chip.',
					'It partly overlaps with MEMS, but for Mandalon it also often includes building the surrounding structure itself. That may mean an integrated micro-heater, an MCM multi-chip module, an integrated gas channel or a mirror.'
				],
				image: '/mandalon/help-microstructures.jpg',
				imageAlt: 'Abstract microstructure',
				caption: 'Microstructures and surrounding structure'
			}
		}
	}
} satisfies Record<'sv' | 'en', GlossaryPageContent>;
