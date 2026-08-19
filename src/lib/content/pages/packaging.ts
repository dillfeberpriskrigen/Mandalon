import type { ChipSensorsPageContent } from '../types';

export const chipSensorsPage = {
	sv: {
		meta: {
			title: 'Mandalon | Paketering av chip och trådbondning',
			description:
				'Advanced packaging i Linköping: trådbondning, die bonding, kapsling och prototyper. Guld- och aluminiumtråd, ball- och wedge-bonding för chip, sensorer och MEMS.'
		},
		title: 'Paketering av Chip',
		lead: 'I labbet utanför Linköping arbetar vi dagligen med chip, sensorer och MEMS, från första prototyp till kapsling och mindre serier. Vi tar oss an även det som andra bedömt som svårt att bonda.',
		methods: {
			dieBonding: {
				title: 'Mikromontering',
				paragraphs: [
					'Mikromontering (die bonding) är att sätta chipet på rätt plats med rätt lim innan det kan trådbondas. Vi die-bondar manuellt och är vana vid känsliga chip, MEMS och prototyper där passningen måste stämma från början.',
					'Vanligt är att man monterar chip i kapsel eller på kretskort. Vi har en del open cavity kapslar i lager och en del lead frames. Kontakta oss för att se vad vi har inne för tillfället.',
					'Vi har många limmer och kan blanda med precisionsvåg. Behöver ni ett specifikt lim tar vi hem det eller använder ert.'
				]
			},
			wireBonding: {
				title: 'Trådbondning',
				paragraphs: [
					'När chipet sitter ska det ha kontakt med omvärlden. Trådbondning är metoden vi arbetar med: ball och wedge, guld- och aluminiumtråd, manuellt och automatiskt.',
					'Vi har tillgång till bondmaskiner för ball- och wedgebondning, både manuella och helautomatiska. Vilken metod som passar beror på chip, pad-layout och hur kretsen ska skyddas efteråt.',
					'Har ni glömt att öppna passiveringslagret för en viktig pad? Vi har räddat många chip som haft problem. Även när fan-out ser ut som spaghetti kan vi oftast lösa det, det tar bara lite längre tid.'
				]
			}
		},
		capabilitiesTitle: 'Kapabilitet',
		capabilitiesPresentation: 'Listan visar det vi är mest vana att hantera. Den är inte heltäckande, så hör av er om ni behöver något som saknas.',
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
				image: { src: '/mandalon/chip-prototypes.webp', alt: 'Tidig idéskiss', width: 1024, height: 680 }
			},
			wireBonding: {
				title: 'Trådbondning & paketering',
				subtitle: 'Ett chip behöver kontakteras och skyddas',
				paragraphs: [
					'Trådbondning är en beprövad metod för kontaktering och är den metod som Mandalon använder. Vi har tillgång till bondmaskiner för ball- respektive wedgebondning, manuella maskiner samt helautomatiska.',
					'Vilken metod som passar beror på chip, pad-layout och hur kretsen ska skyddas efteråt. Vi hjälper till att välja upplägg så att kontakteringen håller både för verifiering och nästa steg.'
				],
				image: { src: '/mandalon/chip-wirebonding.webp', alt: 'Bondmaskin, mikroskop och work holder', width: 768, height: 1024 }
			},
			assembly: {
				title: 'Mikroelektronik-montering',
				subtitle: 'Chipet på rätt plats och rätt kontakterat',
				paragraphs: [
					'Området mikroelektronikmontering handlar enkelt uttryckt om hur man sätter ett chip på rätt plats och kontakterar detsamma.',
					'Den långa varianten berör prestanda på färdig krets, producerbarhet, materialval, metodval, ekonomi, arbetsmiljö, tidsplanering, geometriaspekter med mera och vi sitter sällan i någon box när vi löser kundens problem.'
				],
				image: { src: '/mandalon/chip-assembly.webp', alt: 'Bondningsparametrar', width: 1024, height: 768 }
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
				image: { src: '/mandalon/chip-encapsulation.webp', alt: 'Ett urval av normala TO metallkapslar', width: 768, height: 573 }
			}
		},
		contactPrompt: {
			label: 'Kontakta oss redan idag och diskutera ditt projekt!',
			page: 'contact'
		},
		contactCta: {
			title: 'Osäker på metod, kapsel eller bondbarhet?',
			text: 'Hör av er så går vi igenom trådbondning, die bonding, montering och skydd utifrån just ert chip.',
			label: 'Kontakta oss',
			page: 'contact'
		}
	},
	en: {
		meta: {
			title: 'Mandalon | Chip Packaging and Wire Bonding',
			description:
				'Advanced packaging in Linköping: wire bonding, die bonding, encapsulation and prototypes. Gold and aluminium wire, ball and wedge bonding for chips, sensors and MEMS.'
		},
		title: 'Chip Packaging',
		lead: 'In our lab outside Linköping we work daily with chips, sensors and MEMS, from first prototype to encapsulation and small series. We also take on work others have judged too difficult to bond.',
		methods: {
			dieBonding: {
				title: 'Die bonding',
				paragraphs: [
					'Die bonding is placing the chip in the right position with the right adhesive before it can be wire bonded. We die-bond by hand and are used to sensitive chips, MEMS and prototypes where the placement has to be right from the start.',
					'Chips are commonly mounted in a package or on a PCB. We keep some open-cavity packages and some lead frames in stock. Contact us to see what we currently have.',
					'We keep a wide range of adhesives and can mix with a precision scale. If you need a specific adhesive we can source it or use yours.'
				]
			},
			wireBonding: {
				title: 'Wire bonding',
				paragraphs: [
					'Once the chip is in place it needs to talk to the outside world. Wire bonding is the method we work with: ball and wedge, gold and aluminium wire, manual and automatic.',
					'We have machines for ball and wedge bonding, both manual and fully automatic. Which method fits depends on the chip, pad layout and how the circuit should be protected afterwards.',
					'Did you forget to open the passivation layer for an important pad? We have saved many chips with issues. Even when the fan-out looks like spaghetti we can usually solve it, it just takes a bit longer.'
				]
			}
		},
		capabilitiesTitle: 'Capabilities',
		capabilitiesPresentation:
			'The list shows what we are most experienced with. It is not exhaustive, so get in touch if you need something that is not listed.',
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
				image: { src: '/mandalon/chip-prototypes.webp', alt: 'Early concept sketch', width: 1024, height: 680 }
			},
			wireBonding: {
				title: 'Wire bonding & packaging',
				subtitle: 'A chip needs interconnects and protection',
				paragraphs: [
					'Interconnecting chips and other structures can be done in several ways. Wire bonding has been used for a long time and is the method Mandalon works with. We have access to machines for both ball and wedge bonding, manual systems and fully automatic ones.',
					'Which method fits depends on the chip, pad layout and how the circuit should be protected afterwards. We help choose an approach so the interconnects hold both for verification and for the next step.'
				],
				image: { src: '/mandalon/chip-wirebonding.webp', alt: 'Wire bonding machine, microscope and work holder', width: 768, height: 1024 }
			},
			assembly: {
				title: 'Microelectronics assembly',
				subtitle: 'Getting the chip in place and connected',
				paragraphs: [
					'Microelectronics assembly is, simply put, about how a chip is positioned correctly and connected in the right way.',
					'The longer version touches finished-circuit performance, manufacturability, materials, method choices, economics, work environment, timing and geometry. Mandalon rarely works inside a box when solving a customer problem.'
				],
				image: { src: '/mandalon/chip-assembly.webp', alt: 'Bonding parameters', width: 1024, height: 768 }
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
				image: { src: '/mandalon/chip-encapsulation.webp', alt: 'A selection of common TO metal packages', width: 768, height: 573 }
			}
		},
		contactPrompt: {
			label: 'Get in touch today and we can discuss your project!',
			page: 'contact'
		},
		contactCta: {
			title: 'Unsure about method, package or bondability?',
			text: 'Get in touch and we will go through wire bonding, die bonding, assembly and protection for your specific chip.',
			label: 'Contact us',
			page: 'contact'
		}
	}
} satisfies Record<'sv' | 'en', ChipSensorsPageContent>;
