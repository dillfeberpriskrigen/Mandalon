import type { ChipSensorsPageContent } from '../types';

export const chipSensorsPage = {
	sv: {
		meta: {
			title: 'Mandalon | Paketering av chip och trådbondning',
			description:
				'Advanced packaging i Linköping: trådbondning, die bonding, kapsling och prototyper. Guld- och aluminiumtråd, ball- och wedge-bonding för chip, sensorer och MEMS.'
		},
		title: 'Paketering av chip och trådbondning',
		lead: 'I labbet utanför Linköping arbetar vi dagligen med advanced packaging: trådbondning, die bonding, kapsling och prototyper för chip, sensorer och MEMS. Vi tar oss an även det som andra bedömt som svårt att bonda.',
		capabilitiesTitle: 'Kapabilitet',
		capabilitiesPresentation: 'Listan visar det vi är mest vana att hantera. Den är inte heltäckande, så hör av er om ni behöver något som saknas.',
		capabilities: [
			{ name: 'Guldtråd', description: '25µm, 17µm' },
			{ name: 'Aluminiumtråd', description: '25µm, 17µm' },
			{ name: 'Ball-bonding', description: 'Guldtråd' },
			{ name: 'Wedge-bonding', description: 'Guldtråd, Aluminium' },
			{ name: 'Manuell bondning', description: 'Ball och wedge' },
			{ name: 'Automatisk bondning', description: 'Ball och wedge' },
			{ name: 'Die bonding', description: 'Vi die-bondar manuellt' },
			{
				name: 'Lim',
				description: 'Vi har många limmer och möjlighet att blanda med precisionsvåg. Om ni behöver ett specifikt lim så kan vi ta hem det eller använda ert.'
			},
			{ name: 'Standardkapslar', description: 'Vi har ett begränsat urval kapslar på lager men kan ta hem det som behövs eller om ni levererar egna.' },
			{ name: 'Glob top', description: 'Vi har silikon och epoxylim för globning av chip och trådar.' },
			{ name: 'Dragprovare', description: 'Vi har möjlighet att dragprova bondtrådar för att utvärdera kvalitet.' },
			{
				name: 'Plasmatvätt',
				description:
					'Vår maskin använder atmosfärsplasma för att rengöra objekten som ska bondas. Det är extra viktigt för att automatbondning ska fungera bra.'
			}
		],
		areas: {
			assembly: {
				title: 'Mikroelektronikmontering',
				subtitle: 'Chipet säkert på plats',
				paragraphs: [
					'Mikromontering, die bonding, är att sätta chipet på rätt plats med rätt lim innan det kan trådbondas. Vi die-bondar manuellt och är vana vid känsliga chip, MEMS och prototyper där varje enhet är dyrbar.',
					'Vanligt är att man monterar chip i kapsel eller på kretskort. Vi har en del open cavity kapslar i lager och en del lead frames. Kontakta oss för att se vad vi har inne för tillfället.',
					'Vi har många limmer och kan blanda med precisionsvåg. Behöver ni ett specifikt lim tar vi hem det eller använder ert.'
				],
				image: { src: '/mandalon/designguide/picture-12.webp', alt: 'Chip bondat på PCB', width: 733, height: 401 },
				contactLabel: 'Kontakta oss för mer information'
			},
			wireBonding: {
				title: 'Trådbondning',
				subtitle: 'Ett chip behöver kontakteras och skyddas',
				paragraphs: [
					'När chipet sitter ska det ha kontakt med omvärlden. Trådbondning är en beprövad metod för kontaktering och är den metod som vi använder.',
					'Vi har tillgång till bondmaskiner för ball- och wedgebondning, både manuella och helautomatiska. Vi kan arbeta med både guld- och aluminiumtråd, och väljer metod och material utifrån chip, pad-layout och hur kretsen ska skyddas efteråt.',
					'Har ni glömt att öppna passiveringslagret för en viktig pad? Vi har räddat många chip som haft problem. Även när fan-out ser ut som spaghetti kan vi oftast lösa det, det tar bara lite längre tid.'
				],
				image: { src: '/mandalon/designguide/picture-5.webp', alt: 'Två chip trådbondade på kretskort', width: 844, height: 476 },
				contactLabel: 'Hör av er om trådbondning'
			},
			prototypes: {
				title: 'Utveckling & prototyper',
				subtitle: 'Området som är Mandalons ursprung',
				paragraphs: [
					'Utmaningarna vid framtagning av första prototyp är många och samtidigt väldigt intressanta. Det gör att tidigare erfarenheter och kunnande från flera discipliner är viktiga då vitt skilda aspekter som t.ex. RF-kompatibilitet, termiska egenskaper, vidhäftningsförmåga, dimensioner och materialval ska fås att samverka.',
					'Under prototypfasen ligger fokus på att få chipet att prata med omvärlden för första gången. Aspekter som producerbarhet och tillförlitlighet väger lättare.',
					'Under resans gång blir dessa aspekter däremot allt viktigare och ju tidigare man lägger resurser på detta desto lättare är det att anpassa sin design inför kommande produktion.'
				],
				image: { src: '/mandalon/chip-prototypes.webp', alt: 'Tidig idéskiss', width: 1024, height: 680 },
				contactLabel: 'Berätta om er prototyp så hjälper vi till'
			},
			encapsulation: {
				title: 'Kapsling & ingjutning',
				subtitle: 'Vad bör ni tänka på?',
				paragraphs: [
					'Ett bondat chip behöver ofta bli skyddat mot mekanisk åverkan även på prototypstadiet. Ibland räcker det att ha ett enkelt plastlock tejpat över chip och trådar, ibland kräver det en tät keramikkapsel. Man väljer också ofta att globba, alltså gjuta in chip och trådar i lämpligt lim.',
					'Förberedelsen inför montering innefattar vanligtvis val av metall- eller keramkapsel och lock, eller montering och globning direkt på PCB. Tillsammans med er hittar vi rätt paketering: en matchande kapsel, eller montering direkt på kortet. Båda sätten har för- och nackdelar.',
					'Väljer man en relativt sett dyrare kapsel får man ett gott mekaniskt skydd och kan med rätt sockel byta sin krets enkelt i en mer komplex uppställning.',
					'Väljer man i stället montering direkt på PCB kan man uppnå en snabbare koppling med kortare anslutningar med rätt layout. Gäller ofta inom RF. Vill man ändå ha ett mer robust mekaniskt skydd för trådarna kan en globning hjälpa. Alternativet kan vara lock.',
					'Osäkra på avvägningen för ert projekt? Då finns vår erfarenhet att tillgå.'
				],
				image: { src: '/mandalon/kapslar.webp', alt: 'Ett urval av normala metallkapslar', width: 1876, height: 2557 },
				contactLabel: 'Kontakta oss så reder vi ut detaljerna'
			}
		},
		contactCta: {
			title: 'Osäkra på metod, kapsel eller bondbarhet?',
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
		title: 'Chip packaging and wire bonding',
		lead: 'In our lab outside Linköping we work daily with advanced packaging: wire bonding, die bonding, encapsulation and prototypes for chips, sensors and MEMS. We also take on work others have judged too difficult to bond.',
		capabilitiesTitle: 'Capabilities',
		capabilitiesPresentation:
			'The list shows what we are most experienced with. It is not exhaustive, so get in touch if you need something that is not listed.',
		capabilities: [
			{ name: 'Gold wire', description: '25µm, 17µm' },
			{ name: 'Aluminium wire', description: '25µm, 17µm' },
			{ name: 'Ball bonding', description: 'Gold wire' },
			{ name: 'Wedge bonding', description: 'Gold wire, Aluminium' },
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
			assembly: {
				title: 'Microelectronics assembly',
				subtitle: 'The chip securely in place',
				paragraphs: [
					'Microassembly, die bonding, is placing the chip in the right position with the right adhesive before it can be wire bonded. We die-bond by hand and are used to sensitive chips, MEMS and prototypes where each unit is precious.',
					'Chips are commonly mounted in a package or on a PCB. We keep some open-cavity packages and some lead frames in stock. Contact us to see what we currently have.',
					'We keep a wide range of adhesives and can mix with a precision scale. If you need a specific adhesive we can source it or use yours.'
				],
				image: { src: '/mandalon/designguide/picture-12.webp', alt: 'Chip bonded on a PCB', width: 733, height: 401 },
				contactLabel: 'Contact us for more information'
			},
			wireBonding: {
				title: 'Wire bonding',
				subtitle: 'A chip needs interconnects and protection',
				paragraphs: [
					'Once the chip is in place it needs contact with the outside world. Wire bonding is a proven interconnect method, and it is the method we use.',
					'We have access to machines for ball and wedge bonding, both manual and fully automatic. We work with both gold and aluminium wire, and choose method and material based on the chip, pad layout and how the circuit should be protected afterwards.',
					'Did you forget to open the passivation layer for an important pad? We have saved many chips with issues. Even when the fan-out looks like spaghetti we can usually solve it, it just takes a bit longer.'
				],
				image: { src: '/mandalon/designguide/picture-5.webp', alt: 'Two chips wire bonded on a circuit board', width: 844, height: 476 },
				contactLabel: 'Get in touch about wire bonding'
			},
			prototypes: {
				title: 'Development & prototypes',
				subtitle: 'The area where Mandalon started',
				paragraphs: [
					'The challenges involved in developing a first prototype are many and highly interesting. Earlier experience from several disciplines becomes important when RF compatibility, thermal properties, adhesion, dimensions and material choices all need to work together.',
					'During the prototype phase, the focus is on getting the chip to communicate with the outside world for the first time. Manufacturability and long-term reliability weigh less at this stage.',
					'As the project moves forward, those aspects become increasingly important, and the earlier resources are invested in them, the easier it becomes to adapt the design for later production.'
				],
				image: { src: '/mandalon/chip-prototypes.webp', alt: 'Early concept sketch', width: 1024, height: 680 },
				contactLabel: 'Tell us about your prototype and we will help'
			},
			encapsulation: {
				title: 'Encapsulation & potting',
				subtitle: 'What should you think about?',
				paragraphs: [
					'A bonded chip often needs protection from mechanical stress already at the prototype stage. Sometimes a simple plastic lid taped over the chip and wires is enough, while in other cases a sealed ceramic package is required. Potting the chip and wires in a suitable adhesive is also common.',
					'Preparation for assembly usually involves choosing a metal or ceramic package and lid, or mounting and potting directly on a PCB. Together with you we find the right packaging: a matching package, or mounting directly on the board. Both approaches have advantages and drawbacks.',
					'A relatively more expensive package gives good mechanical protection and can make it easy to swap the circuit in a more complex setup when used with the right socket.',
					'If you instead mount directly on a PCB, a faster connection with shorter interconnects can be achieved with the right layout, which is often relevant in RF. If better mechanical protection for the wires is still needed, potting can help. Another option is a lid.',
					'If you are unsure how to weigh the options for your project, our experience is at your disposal.'
				],
				image: { src: '/mandalon/kapslar.webp', alt: 'A selection of common metal packages', width: 1876, height: 2557 },
				contactLabel: 'Contact us and we will sort out the details'
			}
		},
		contactCta: {
			title: 'Unsure about method, package or bondability?',
			text: 'Get in touch and we will go through wire bonding, die bonding, assembly and protection for your specific chip.',
			label: 'Contact us',
			page: 'contact'
		}
	}
} satisfies Record<'sv' | 'en', ChipSensorsPageContent>;
