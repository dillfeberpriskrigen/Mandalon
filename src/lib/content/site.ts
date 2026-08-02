import type { Locale, LocaleContent } from './types';

export type { Locale, LocaleContent } from './types';

export const defaultLocale: Locale = 'sv';

export const locales: readonly Locale[] = ['sv', 'en'];

export const siteContent = {
	sv: {
		meta: {
			title: 'Mandalon | Chip Packaging - Från koncept till verklighet',
			description:
				'Mandalons långa erfarenhet av vitt skilda strukturer gör dem väl lämpade att ta hand om chipmontering, sensorer, MEMS-strukturer och ASIC:s.'
		},
		switchLabel: 'English',
		topLinks: [
			{ label: 'Kunskapsbank', page: 'knowledge' },
			{ label: 'Kontakt', page: 'contact' },
			{ label: 'Om Mandalon', page: 'about' }
		],
		primaryLinks: [
			{ label: 'Paketering av Chip', page: 'packaging' },
			{ label: 'Konsulttjänster', page: 'consulting' },
			{ label: 'Kontakt', page: 'contact' }
		],
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
					image: '/mandalon/design-chip.jpg'
				},
				{
					title: 'Processutveckling',
					text: 'Mandalons mångåriga erfarenhet ställs gärna till förfogande när ni behöver utveckla en egen process.',
					image: '/mandalon/chip-prototypes.jpg'
				},
				{
					title: 'Projektledning',
					text: 'Vi på Mandalon erbjuder projektledning vid förfrågan.',
					image: '/mandalon/project.jpg'
				}
			]
		},
		chipSensorsPage: {
			meta: {
				title: 'Mandalon | Paketeringstjänster',
				description: 'En översikt av hur Mandalon arbetar med chip, sensorer, MEMS, montering, bonding, kapsling och prototyper.'
			},
			title: 'Paketering av Chip',
			lead: 'Chip och sensorer hanterar vi dagligen',
			intro: [
				'En stor del av det vi på Mandalon sysslar med är problemlösning. Rätt ofta dyker det upp flexkort, MEMS och udda limmer som vi genom åren lärt oss hur vi effektivt arbetar med.',
				'Vi är vana att hantera känsliga chip och prototyper som för andra kan upplevas omöjliga att arbeta med. Har ni glömt att öppna passiveringslagret för en viktig pad? Vi har räddat många chip som haft problem och gör vårt yttersta för att få till en fungerande lösning till din produkt.'
			],
			capabilitiesPresentation:
				'Listan nedan visar det som vi är mest vana att hantera gällande bondning. Kontakta oss ifall du har frågor eller behöver någonting som inte listas, listan är inte heltäckande.',
			capabilities: [
				{ name: 'Guldtråd', description: '25µm, 17µm' },
				{ name: 'Aluminiumtråd', description: '25µm, 17µm' },
				{ name: 'Ball-bonding', description: 'Guldtråd' },
				{ name: 'Wedge-bonding', description: 'Guldtråd, Aluminium' },
				{ name: 'Manuell bondning', description: 'Ball och wedge' },
				{ name: 'Automatisk bondning', description: 'Ball och wedge' },
				{ name: 'Die bondning', description: 'Vi die-bondar manuellt' },
				{
					name: 'Lim',
					description: 'Vi har många limmer och möjlighet att blanda med precisionsvåg. Om ni behöver ett specifikt lim så kan vi ta hem det eller använda ert.'
				},
				{ name: 'Standardkapslar', description: 'Vi har ett begränsat urval kapslar på lager men kan ta hem det som behövs eller om ni levererar egna.' },
				{ name: 'Glob top', description: 'Vi har silikon och epoxylim för globning av chip och trådar.' },
				{ name: 'Dragprovare', description: 'Vi har möjlighet att dragprova bondtrådar för att utvärdera kvalitet' },
				{
					name: 'Plasmatvätt',
					description:
						'Vår maskin använder atmosfärsplasma för att rengöra objekten som skall bondas. Det är extra viktigt för att automatbondning ska fungera bra.'
				}
			],
			areas: {
				prototypes: {
					title: 'Utveckling & prototyper',
					subtitle: 'Området som är Mandalons ursprung',
					paragraphs: [
						'Utmaningarna vid framtagning av första prototyp är många och samtidigt väldigt intressanta. Det gör att tidigare erfarenheter och kunnande från flera discipliner är viktiga då vitt skilda aspekter som t.ex. RF-kompatibilitet, termiska egenskaper, vidhäftningsförmåga, dimensioner och materialval ska fås att samverka.',
						'Under prototypfasen ligger fokus på att få chipet att prata med omvärlden för första gången. Aspekter som producerbarhet och tillförlitlighet väger lättare.',
						'Under resans gång blir dessa aspekter däremot allt viktigare och ju tidigare man lägger resurser på detta desto lättare är det att anpassa sin design inför kommande produktion.'
					],
					image: '/mandalon/chip-prototypes.jpg',
					imageAlt: 'Tidig idéskiss'
				},
				wireBonding: {
					title: 'Trådbondning & paketering',
					subtitle: 'Ett chip behöver kontakteras och skyddas',
					paragraphs: [
						'Trådbondning  är en beprövad metod för kontaktering och är den metod som Mandalon använder. Vi har tillgång till bondmaskiner för ball- respektive wedgebondning, manuella maskiner samt helautomatiska.'
					],
					image: '/mandalon/chip-wirebonding.jpeg',
					imageAlt: 'Bondmaskin, mikroskop och work holder'
				},
				assembly: {
					title: 'Mikroelektronik-montering',
					subtitle: '',
					paragraphs: [
						'Området mikroelektronikmontering handlar enkelt uttryckt om hur man sätter ett chip på rätt plats och kontakterar detsamma.',
						'Den långa varianten berör prestanda på färdig krets, producerbarhet, materialval, metodval, ekonomi, arbetsmiljö, tidsplanering, geometriaspekter med mera och vi sitter sällan i någon box när vi löser kundens problem.'
					],
					image: '/mandalon/chip-assembly.jpg',
					imageAlt: 'Bondningsparametrar'
				},
				encapsulation: {
					title: 'Kapsling & ingjutning',
					subtitle: 'Vad bör du tänka på?',
					paragraphs: [
						'Ett bondat chip behöver ofta bli skyddat mot mekanisk åverkan även på prototypstadiet. Ibland räcker det att ha ett enkelt plastlock tejpat över chip och trådar, ibland kräver det en tät keramikkapsel. Man väljer också ofta att globba, dvs gjuta in chip och trådar i lämpligt lim.',
						'Förberedelsen inför montering innefattar vanligtvis val av metall- eller keramkapsel/lock eller att välja montering/globning direkt på PCB. Den normala verksamheten inom detta område utgörs av att tillsammans med kund hitta rätt paketering i form av matchande kapsel eller att föreslå montering direkt på PCB. Båda angreppssätten har för och nackdelar.',
						'Väljer man en relativt sett dyrare kapsel får man ett gott mekaniskt skydd och kan med rätt sockel byta sin krets enkelt i en mer komplex uppställning.',
						'Väljer man istället montering direkt på PCB kan man uppnå en snabbare koppling med kortare anslutningar med rätt layout. Gäller ofta inom RF. Vill man ändå ha ett mer robust mekaniskt skydd för trådarna kan en globning hjälpa. Alternativet kan vara lock.',
						'Vet ni inte hur ni ska göra avvägningarna för erat projekt så står våran erfarenhet till erat förfogande.'
					],
					image: '/mandalon/chip-encapsulation.jpg',
					imageAlt: 'Ett urval av normala TO metallkapslar'
				}
			}
		},
		consultingPage: {
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
					points: [
						'Projektledning på förfrågan',
						'Packaging-perspektiv in i större utvecklingsprojekt',
						'Stöd när många delar behöver hänga ihop i rätt ordning'
					]
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
		aboutPage: {
			meta: {
				title: 'Mandalon | Om Mandalon',
				description: 'En kort presentation av Mandalon, bakgrunden i mikromontering och hur erfarenheten från forskning och labbarbete format erbjudandet.'
			},
			title: 'Erfarenhet från forskning, labb och praktisk montering.',
			lead: 'Mandalon växte fram ur arbetet med sensorer och mikrosystem i Linköping och har sedan slutet av 1990-talet byggt upp ett tydligt fokus på chip packaging, bonding och designnära stöd.',
			introTitle: 'En introduktion till Mandalon',
			intro: [
				'Kompetenscentret S-Sence på Linköpings universitet är starkt bidragande till att företaget alls existerar. Inom detta program utvecklades bland annat "den elektroniska näsan" under 90-talet. Monteringen av dessa är upprinnelsen till företaget.',
				'Dessa kemiska gassensorer sattes samman på universitetet, men monteringsbehoven växte och en företagsidé föddes.',
				'I början hade vi vakuumteknik och ytbeläggningar på programmet. Från 2005, då företaget delades, är Mandalon Technologies AB ett renodlat mikroelektronikbolag.'
			],
			storyTitle: 'Ett barn med bra idéer',
			story:
				'När företaget började materialiseras år 1999 var Per-Erik mitt uppe i familjelivet. En av hans döttrar introducerades för första gången till en grapefrukt och hade ingen aning om vad den kunde tänkas heta. Frukten såg ut som en mandarin, men var stor som en melon. Efter att ha övervägt sina fakta kom hon till insikt. Självklart var det en mandalon.',
			certificationTitle: 'ISO 9001:2015',
			certification:
				'Mandalon Technologies AB är ISO 9001:2015-certifierat. Det innebär i praktiken att arbetssätt, kvalitetssäkring och uppföljning sker inom ett etablerat kvalitetsledningssystem, vilket gör det lättare att arbeta strukturerat och repeterbart även i tekniskt krävande uppdrag.',
			certificationNote: 'Senaste Q-revision i referensmaterialet: 2024-03-20.',
			referencesTitle: 'Referenser och forskningsprojekt',
			referencesLead: 'Bakgrunden i forskning och längre industriprojekt är en viktig del av Mandalons trovärdighet. Här är några exempel som visar bredden.',
			referencesHeading: 'Utvalda referenser',
			researchProjectsHeading: 'Forskningsprojekt',
			references: [
				'Autoliv, industrialiseringsprocess 2012-14',
				'Neonode, industrialiseringsprocess 2015-16',
				'Veoneer, design verification run 2017',
				'Prismatic/GE HealthCare, mångårigt projekt, pågående enligt referensmaterialet'
			],
			researchProjects: [
				{
					title: 'Soot sensors for a healthy environment (SootSens)',
					href: 'http://www.diva-portal.org/smash/get/diva2:707196/FULLTEXT01.pdf'
				},
				{
					title: 'Piezoelectric micro-electromechanical systems for Nordic industry (NORD-pie)',
					href: 'http://www.diva-portal.org/smash/get/diva2:707173/FULLTEXT01.pdf'
				},
				{
					title: 'Soot sensors for efficient combustion and low emissions, SootSensII',
					href: 'http://www.diva-portal.org/smash/get/diva2:707206/FULLTEXT01.pdf'
				},
				{
					title: 'MEMS sensor packaging, IMAPS seminar contribution',
					href: 'http://www.twdns.se/clients/doc_mandalon_se/sidadmin/bildbanken/File/MEMSsensorpackaging.pdf?PHPSESSID=6a9a754b0d9a83b39ebb12df5fe955a2'
				}
			]
		},
		contactPage: {
			meta: {
				title: 'Mandalon | Kontakt',
				description: 'Kontaktuppgifter och ett enkelt sätt att nå Mandalon om ni vill diskutera bonding, design, packaging eller prototyparbete.'
			},
			title: 'Låt oss prata om er konstruktion.',
			lead: 'Om ni vill diskutera chip packaging, bonding, kapsling eller designfrågor är det enklast att börja med ett kort mejl.',
			people: [
				{
					name: 'Per-Erik Fägerman',
					role: 'VD',
					image: '/mandalon/PerErik.jpg',
					imageAlt: 'Per-Erik Fägerman',
					phone: '073 320 60 50',
					phoneHref: 'tel:+46733206050',
					email: 'info@mandalon.se',
					emailHref: 'mailto:info@mandalon.se'
				},
				{
					name: 'Jonatan Gezelius',
					role: 'Teknisk Säljare',
					image: '/mandalon/Jonatan.jpg',
					imageAlt: 'Jonatan',
					phone: '073 58 48 690',
					phoneHref: 'tel:+46735848690'
				}
			],
			details: [
				{ label: 'E-post', value: 'info@mandalon.se', href: 'mailto:info@mandalon.se' },
				{ label: 'Hjälp', value: 'help@mandalon.se', href: 'mailto:help@mandalon.se' },
				{ label: 'Adress', value: 'Bjärby Himmelslund 1, 585 61 Linghem' }
			],
			locationTitle: 'Besök oss',
			mapTitle: 'Karta till Mandalon'
		},
		glossaryPage: {
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
		designGuidePage: {
			meta: {
				title: 'Mandalon | Designguide',
				description: 'Mandalons designguide med originalcopy, bilder och PDF för chipdesign, PCB-layout och bonding.'
			},
			title: 'Designguide',
			intro:
				'Designguiden togs fram tillsammans med doktorander vid Linköpings universitet och samlar praktiska råd, bilder och vanliga fallgropar inom chipdesign, PCB-layout och bonding.',
			articleIntroTitle: 'En hjälp på vägen kan vara den designguide vi tagit fram för några tillämpningar',
			articleIntroBody:
				'2007 tog vi tillsammans med doktorander och personal vid Linköpings universitet och i samarbete med nano- och mikrosystemprogrammet minST fram en designguide. Ta del av den i sin helhet här, eller ladda ner den i PDF-format.',
			downloadLabel: 'Hämta designguide som pdf',
			embeddedDownloadLabel: 'Designguide'
		},
		footer: {
			nav: [
				{ label: 'Om Mandalon', page: 'about' },
				{ label: 'Kontakt', page: 'contact' },
				{ label: 'Kunskapsbank', page: 'knowledge' },
				{ label: 'Designguide', page: 'designGuide' }
			]
		},
		errorPage: {
			title: 'Sidan hittades inte',
			notFound: 'Sidan kunde inte hittas.',
			generic: 'Något gick fel.',
			homeLabel: 'Till startsidan'
		}
	},
	en: {
		meta: {
			title: 'Mandalon | Chip Packaging - From concept to reality',
			description:
				'Mandalon has long experience with a wide range of structures and is well equipped to handle chip packaging, sensors, MEMS structures and ASICs.'
		},
		switchLabel: 'Svenska',
		topLinks: [
			{ label: 'Knowledge bank', page: 'knowledge' },
			{ label: 'Contact', page: 'contact' },
			{ label: 'About Mandalon', page: 'about' }
		],
		primaryLinks: [
			{ label: 'Chip Packaging', page: 'packaging' },
			{ label: 'Consulting Services', page: 'consulting' },
			{ label: 'Contact', page: 'contact' }
		],
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
					image: '/mandalon/design-chip.jpg'
				},
				{
					title: 'Process development',
					text: 'Mandalon’s long experience is available when you need to develop your own process.',
					image: '/mandalon/chip-prototypes.jpg'
				},
				{
					title: 'Project management',
					text: 'Mandalon can also provide project management support on request.',
					image: '/mandalon/project.jpg'
				}
			]
		},
		chipSensorsPage: {
			meta: {
				title: 'Mandalon | Chip Packaging Services',
				description: 'An overview of how Mandalon works with chips, sensors, MEMS, assembly, bonding, packaging and prototypes.'
			},
			title: 'Chip Packaging Services',
			lead: 'We handle chips and sensors on a daily basis',
			intro: [
				'A large part of what we do at Mandalon is problem-solving. We often encounter flex PCBs, MEMS, and unusual adhesives that we have learned to work with efficiently over the years.',
				'We are used to handling sensitive chips and prototypes that others may find impossible to work with. Did you forget to open the passivation layer for an important pad? We have saved many chips with issues and do our utmost to achieve a working solution for your product.'
			],
			capabilitiesPresentation:
				'The list below shows what we are most experienced with regarding bonding. Contact us if you have questions or need something not listed, the list is not exhaustive.',
			capabilities: [
				{ name: 'Gold wire', description: '25µm, 17µm' },
				{ name: 'Aluminum wire', description: '25µm, 17µm' },
				{ name: 'Ball bonding', description: 'Gold wire' },
				{ name: 'Wedge bonding', description: 'Gold wire, Aluminum' },
				{ name: 'Manual bonding', description: 'Ball and wedge' },
				{ name: 'Automatic bonding', description: 'Ball and wedge' },
				{ name: 'Die bonding', description: 'We perform die bonding manually' },
				{
					name: 'Adhesives',
					description:
						'We have a wide range of adhesives and the ability to mix them using a precision scale. If you require a specific adhesive, we can source it or use yours.'
				},
				{
					name: 'Standard packages',
					description: 'We keep a limited selection of packages in stock but can source what is needed or use customer-supplied ones.'
				},
				{ name: 'Glob top', description: 'We use silicone and epoxy for glob topping of chips and wires.' },
				{ name: 'Pull tester', description: 'We have the capability to perform pull tests on bond wires to evaluate quality.' },
				{
					name: 'Plasma cleaning',
					description:
						'Our machine uses atmospheric plasma to clean the objects that are to be bonded. This is especially important for automatic bonding to work well.'
				}
			],
			areas: {
				prototypes: {
					title: 'Development & prototypes',
					subtitle: 'The area where Mandalon started',
					paragraphs: [
						'The challenges involved in developing a first prototype are many and highly interesting. Earlier experience from several disciplines becomes important when RF compatibility, thermal properties, adhesion, dimensions and material choices all need to work together.',
						'During the prototype phase, the focus is on getting the chip to communicate with the outside world for the first time. Manufacturability and long-term reliability weigh less at this stage.',
						'As the project moves forward, those aspects become increasingly important, and the earlier resources are invested in them, the easier it becomes to adapt the design for later production.'
					],
					image: '/mandalon/chip-prototypes.jpg',
					imageAlt: 'Early concept sketch'
				},
				wireBonding: {
					title: 'Wire bonding & packaging',
					subtitle: 'A chip needs interconnects and protection',
					paragraphs: [
						'Interconnecting chips and other structures can be done in several ways. Wire bonding has been used for a long time and is the method Mandalon works with. We have access to machines for both ball and wedge bonding, manual systems and fully automatic ones.'
					],
					image: '/mandalon/chip-wirebonding.jpeg',
					imageAlt: 'Wire bonding machine, microscope and work holder'
				},
				assembly: {
					title: 'Microelectronics assembly',
					subtitle: '',
					paragraphs: [
						'Microelectronics assembly is, simply put, about how a chip is positioned correctly and connected in the right way.',
						'The longer version touches finished-circuit performance, manufacturability, materials, method choices, economics, work environment, timing and geometry. Mandalon rarely works inside a box when solving a customer problem.'
					],
					image: '/mandalon/chip-assembly.jpg',
					imageAlt: 'Bonding parameters'
				},
				encapsulation: {
					title: 'Encapsulation & potting',
					subtitle: 'What should you think about?',
					paragraphs: [
						'A bonded chip often needs protection from mechanical stress already at the prototype stage. Sometimes a simple plastic lid taped over the chip and wires is enough, while in other cases a sealed ceramic package is required. Potting the chip and wires in a suitable adhesive is also common.',
						'Preparation for assembly usually involves choosing a metal or ceramic package and lid, or mounting and potting directly on a PCB. Much of the work in this area is about finding the right package together with the customer or proposing direct PCB assembly. Both approaches have advantages and drawbacks.',
						'A relatively more expensive package gives good mechanical protection and can make it easy to swap the circuit in a more complex setup when used with the right socket.',
						'If you instead mount directly on a PCB, a faster connection with shorter interconnects can be achieved with the right layout, which is often relevant in RF. If better mechanical protection for the wires is still needed, potting can help. Another option is a lid.',
						'If you are unsure how to weigh the options for your project, our experience is at your disposal.'
					],
					image: '/mandalon/chip-encapsulation.jpg',
					imageAlt: 'A selection of common TO metal packages'
				}
			}
		},
		consultingPage: {
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
		},
		aboutPage: {
			meta: {
				title: 'Mandalon | About Mandalon',
				description: 'A short introduction to Mandalon, its background in micro-assembly and how experience from research and lab work shaped the offer.'
			},
			title: 'Experience from research, lab work and hands-on assembly.',
			lead: 'Mandalon grew out of work with sensors and microsystems in Linköping and has, since the late 1990s, built a clear focus on chip packaging, bonding and design-oriented support.',
			introTitle: 'An introduction to Mandalon',
			intro: [
				'The S-Sence competence centre at Linköping University played a major role in Mandalon’s origin. Among other things, "the electronic nose" was developed within that programme during the 1990s, and assembling those sensors became the starting point for the company.',
				'These chemical gas sensors were assembled at the university, but the need for assembly work grew and a business idea took shape.',
				'In the beginning the company also worked with vacuum technology and surface coatings. Since 2005, when the company was divided, Mandalon Technologies AB has focused on microelectronics.'
			],
			storyTitle: 'A child with good ideas',
			story:
				'When the company started to take shape in 1999, Per-Erik was in the middle of family life. One of his daughters saw a grapefruit for the first time and had no idea what it could be called. It looked like a mandarin, but it was as large as a melon. After considering the facts, she reached the obvious conclusion: it had to be a mandalon.',
			certificationTitle: 'ISO 9001:2015',
			certification:
				'Mandalon Technologies AB is certified according to ISO 9001:2015. In practice, that means quality assurance, routines and follow-up are handled within an established quality management system, making it easier to work in a structured and repeatable way even in technically demanding assignments.',
			certificationNote: 'Latest quality audit mentioned in the reference material: March 20, 2024.',
			referencesTitle: 'References and research projects',
			referencesLead:
				'The combination of research background and longer industrial assignments is an important part of Mandalon’s credibility. These are a few examples.',
			referencesHeading: 'Selected references',
			researchProjectsHeading: 'Research projects',
			references: [
				'Autoliv, industrialisation process 2012-14',
				'Neonode, industrialisation process 2015-16',
				'Veoneer, design verification run 2017',
				'Prismatic/GE HealthCare, multi-year project, marked as ongoing in the reference material'
			],
			researchProjects: [
				{
					title: 'Soot sensors for a healthy environment (SootSens)',
					href: 'http://www.diva-portal.org/smash/get/diva2:707196/FULLTEXT01.pdf'
				},
				{
					title: 'Piezoelectric micro-electromechanical systems for Nordic industry (NORD-pie)',
					href: 'http://www.diva-portal.org/smash/get/diva2:707173/FULLTEXT01.pdf'
				},
				{
					title: 'Soot sensors for efficient combustion and low emissions, SootSensII',
					href: 'http://www.diva-portal.org/smash/get/diva2:707206/FULLTEXT01.pdf'
				},
				{
					title: 'MEMS sensor packaging, IMAPS seminar contribution',
					href: 'http://www.twdns.se/clients/doc_mandalon_se/sidadmin/bildbanken/File/MEMSsensorpackaging.pdf?PHPSESSID=6a9a754b0d9a83b39ebb12df5fe955a2'
				}
			]
		},
		contactPage: {
			meta: {
				title: 'Mandalon | Contact',
				description: 'Contact details and a simple way to reach Mandalon if you want to discuss bonding, design, packaging or prototype work.'
			},
			title: 'Let’s talk about your design.',
			lead: 'If you want to discuss chip packaging, bonding, encapsulation or design-related questions, the easiest start is a short email.',
			people: [
				{
					name: 'Per-Erik Fägerman',
					role: 'CEO',
					image: '/mandalon/PerErik.jpg',
					imageAlt: 'Per-Erik Fägerman',
					phone: '+46 733 20 60 50',
					phoneHref: 'tel:+46733206050',
					email: 'info@mandalon.se',
					emailHref: 'mailto:info@mandalon.se'
				},
				{
					name: 'Jonatan Gezelius',
					role: 'Technical sales',
					image: '/mandalon/Jonatan.jpg',
					imageAlt: 'Jonatan',
					phone: '+46 73 58 48 690',
					phoneHref: 'tel:+46735848690'
				}
			],
			details: [
				{ label: 'Email', value: 'info@mandalon.se', href: 'mailto:info@mandalon.se' },
				{ label: 'Support', value: 'help@mandalon.se', href: 'mailto:help@mandalon.se' },
				{ label: 'Address', value: 'Bjärby Himmelslund 1, 585 61 Linghem, Sweden' }
			],
			locationTitle: 'Visit us',
			mapTitle: 'Map to Mandalon'
		},
		glossaryPage: {
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
		},
		designGuidePage: {
			meta: {
				title: 'Mandalon | Design guide',
				description: 'Mandalon design guide with original copy, images and PDF for chip design, PCB layout and bonding.'
			},
			title: 'Design guide',
			intro:
				'The design guide was developed together with doctoral researchers at Linköping University and brings together practical advice, images, and common pitfalls in chip design, PCB layout, and bonding.',
			articleIntroTitle: 'A useful starting point is the design guide we have developed for a number of applications',
			articleIntroBody:
				'In 2007, together with doctoral researchers and staff at Linköping University and in collaboration with the nano- and microsystems programme minST, we developed a design guide. Read it in full here, or download it as a PDF.',
			downloadLabel: 'Download design guide as PDF',
			embeddedDownloadLabel: 'Download design guide'
		},
		footer: {
			nav: [
				{ label: 'About Mandalon', page: 'about' },
				{ label: 'Contact', page: 'contact' },
				{ label: 'Knowledge bank', page: 'knowledge' },
				{ label: 'Design guide', page: 'designGuide' }
			]
		},
		errorPage: {
			title: 'Page not found',
			notFound: 'The page could not be found.',
			generic: 'Something went wrong.',
			homeLabel: 'Back to home'
		}
	}
} satisfies Record<Locale, LocaleContent>;
