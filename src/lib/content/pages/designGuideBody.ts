import type { DesignGuideBlock, DesignGuideTocItem } from '../types';

/** PDF linked from the design-guide download CTA. */
export const designGuidePdfHref = '/mandalon/designguide/mt-2007-011-dg-issue1_070416.pdf';

/** In-page id derived from a heading; keep in sync with TOC hrefs. */
export function headingId(text: string): string {
	return text
		.toLowerCase()
		.replace(/[–—]/g, '-')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function tocFromHeadings(blocks: readonly DesignGuideBlock[]): DesignGuideTocItem[] {
	const items: DesignGuideTocItem[] = [];
	for (const block of blocks) {
		if (block.type !== 'heading') continue;
		const item: DesignGuideTocItem = {
			label: block.text,
			href: `#${headingId(block.text)}`
		};
		if (block.level === 2) {
			items.push(item);
			continue;
		}
		const parent = items.at(-1);
		if (!parent) {
			items.push(item);
			continue;
		}
		parent.children = [...(parent.children ?? []), item];
	}
	return items;
}

/** Shared English design-guide body (T28 option A — not localized). */
export const designGuideBody = [
	{
		type: 'heading',
		level: 2,
		text: '1. Background'
	},
	{
		type: 'paragraph',
		html: 'Mandalon Technologies AB is a company which provides chip packaging services for prototypes and small series with high demands. In cooperation with the Department of Electrical Engineering ISY at Linköping University a lot of different complex chip prototypes have been handled over the years. The idea of collecting the experience and to form some kind of design guide has been in the minds of some persons for some time.<br /><br />When minST came into the picture, this was made possible. With minST as one of the financing parts Mandalon and ISY have been able to establish a process and to produce this design guide.<br /><br />The chips designed at ISY are high performing. The packaging could have an undesired impact on the performance if not considered during the chip design. By using this design guide both increased system performance and reduced time for design, could be achieved.<br />'
	},
	{
		type: 'heading',
		level: 2,
		text: '2. Conclusions'
	},
	{
		type: 'paragraph',
		html: 'The most obvious conclusion found during the process to produce this design guide, was that there is a need for system thinking early in the design phase. The chip itself must be integrated successfully on the PCB to function effectively and this PCB-integration must be taken into consideration during the chip design.'
	},
	{
		type: 'heading',
		level: 2,
		text: '3. Introduction'
	},
	{
		type: 'paragraph',
		html: 'This design guide is based on the experience which Mandalon Technologies has from ball bonding. The equipment, a K&S 4124 is designed for gold bond wires with a diameter between 17-50 µm. The information herein is specific for these circumstances.<br /><br />The design guide uses three different levels of difficulties (time/cost consuming), with respect to the packaging work. The three different levels shall be considered as an indication.<br /><br />Time/Cost levels<br />Level 1: Easy = 1 time/cost unit<br />Level 2: Normal = 3 time/cost units<br />Level 3: Close to the Limit = 10 time/cost units<br />'
	},
	{
		type: 'heading',
		level: 3,
		text: '3.1 Document Overview'
	},
	{
		type: 'paragraph',
		html: 'In chapter 4 <em>“PCB-Layout – Good to know about PCB-layout before starting to design your chip”</em> different aspects of the PCB-layout are addressed to help you design a chip suitable for a complete system (including PCB and wire bonding). Topics such as how to position the pads on the PCB to meet signal requirements and necessary bonding conditions are presented in chapter 4.1-4.3. Further ways to minimize length of bond wire are presented in chapter 4.4 and 4.5.Some options on pad-patterns and chip positioning are shown in chapter 4.6 and 4.7.In chapter 4.8 bonding conditions on the PCB-pads are discussed.<br /><br />In chapter 5 “Chip Design – Pitch limitations for bonding” pitch limitations are addressed to help you design a chip with proper bonding conditions. The special circumstances required for RF signals and data signals are addressed in chapter 5.1 and 5.2 respectively.'
	},
	{
		type: 'heading',
		level: 3,
		text: '3.2 Definitions'
	},
	{
		type: 'paragraph',
		html: 'In this section you will find some useful definitions.'
	},
	{
		type: 'paragraph',
		html: '<u>Fan out</u> – Angle spread out of bond wires from the chip to the PCB.<br /><u>Pitch</u> – The distance in µm between the centres of two subsequent bond-pads on a chip. Also referred to as straight pitch in this document.<br /><u>Staggered pads</u> – Two rows of pads as in the picture 1 below.<br /><u>Effective pitch</u> – The distance A in the picture 1 below.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-1.webp',
		alt: '',
		width: 578,
		height: 337,
		caption: 'Picture 1. A=effective pitch.'
	},
	{
		type: 'heading',
		level: 3,
		text: '3.3 Ball Bonding'
	},
	{
		type: 'paragraph',
		html: 'Ball bonding is a bonding method using gold wire. The combination of heat, pressure and ultrasound (US) enables the wire to stick to the bond pads. First a ball is formed at the end of the wire and the ball is then placed on the chip pad and the first bond is performed. The tool is then moved to the PCB pad position, letting out the wire, and the second bond is performed whilst the wire is cut. This becomes a bond without any ball.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-2.webp',
		alt: '',
		width: 584,
		height: 326,
		caption: 'Picture 2. Ball bonding with 25 µm wire and pitch 90 µm. A bottleneck capillary is used.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-3.webp',
		alt: '',
		width: 590,
		height: 353,
		caption: 'Picture 3. Ball bonding. The difference between 1st bond with the ball and 2nd bond.'
	},
	{
		type: 'heading',
		level: 2,
		text: '4. PCB-Layout – good to know about PCB-layout before starting to design your chip'
	},
	{
		type: 'paragraph',
		html: 'In this chapter different aspects of the PCB-layout are addressed to help you design a chip suitable for a complete packaging system (including PCB and wire bonding).'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.1 PCB-Layout – pad positioning to reduce fan out'
	},
	{
		type: 'paragraph',
		html: 'Angle from chip-pad to PCB-pad above 45º should be avoided. Angles above 45º are likely to cause short circuits between the bond wires.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-4.webp',
		alt: '',
		width: 726,
		height: 197,
		caption: 'Picture 4. Fan out.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-5.webp',
		alt: '',
		width: 844,
		height: 476,
		caption: 'Picture 5. The risk for short circuits increases when angle of fan out is above 45º.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-6.webp',
		alt: '',
		width: 588,
		height: 481,
		caption: 'Picture 6. Bonding under normal fan out conditions.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-7.webp',
		alt: '',
		width: 585,
		height: 510,
		caption: 'Picture 7. Bonding under difficult fan out conditions. Some fan out >45º. (Cost level 3.)'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.2 PCB-Layout – pad positioning (RF signals)'
	},
	{
		type: 'paragraph',
		html: 'RF signals need shortest possible bond wires between chip and PCB. Start with the signals with the highest requirements. Make sure it is possible to place the pads on the PCB close and with minimum angle.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-8.webp',
		alt: '',
		width: 489,
		height: 459,
		caption: 'Picture 8.  Note the short bondings in the top middle and left middle.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-9.webp',
		alt: '',
		width: 681,
		height: 510,
		caption: 'Picture 9. Note the short bondings in the left top corner.'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.3 PCB-Layout – pad positioning (50Ω tracks)'
	},
	{
		type: 'paragraph',
		html: 'If possible use one side of the PCB for these signals, since there need to be broad tracks/lines on the PCB close to the chip. The bond wires must have minimum length.<br />The other signals will in this case be wire bonded to the remaining sides of the PCB. This can be good enough for data signals, where long wires are OK.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-10.webp',
		alt: '',
		width: 591,
		height: 530,
		caption: 'Picture 10. Example, not a real case.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-11.webp',
		alt: '',
		width: 746,
		height: 432,
		caption: 'Picture 11. The broad tracks on the PCB are 50Ω tracks.'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.4 PCB-Layout – how close to the chip'
	},
	{
		type: 'paragraph',
		html: 'How close to the chip can you bond a wire? It depends on the height on the chip and the angle on the capillary on the bonding equipment. The distances below can be used as an indication.'
	},
	{
		type: 'paragraph',
		html: 'At chip height ca 500 µm:<br />Level 1: Easy >700 µm<br />Level 2: Normal 500 µm<br />Level 3: Costly 200 µm'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-12.webp',
		alt: '',
		width: 733,
		height: 401,
		caption: 'Picture 12. Height of chip is 300 µm. Distance from chip to bond is 250 µm. (Cost level 2-3)'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.5 PCB-Layout – cavity to lower the chip into the PCB'
	},
	{
		type: 'paragraph',
		html: 'It is possible to prepare a cavity in the PCB where the chip can be placed. This lowers the chip into the PCB, which makes it possible to place the bond wire closer on the PCB.'
	},
	{
		type: 'paragraph',
		html: 'To be able to make a cavity for the chip, the PCB must be designed for it. There must be only ground layers or no layer at all in the cavity area. If necessary the ground plane may be continued with conducting glue under the chip. The exact size of the chip must also be known in advance.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-13.webp',
		alt: '',
		width: 794,
		height: 478,
		caption: 'Picture 13. Chip in cavity.'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.6 PCB-Layout – pad patterns'
	},
	{
		type: 'paragraph',
		html: 'If you have special requirements – don’t think symmetry. Here you have some options on PCB-layout for special signals.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-14.webp',
		alt: '',
		width: 780,
		height: 631,
		caption: 'Picture 14. PCB-layout options.Note that it is possible to bond more than one bond wire to a single pad.'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.7 PCB-Layout – where to place the chip'
	},
	{
		type: 'paragraph',
		html: 'Again if you have special requirements – don’t think symmetry. Here are some options, how to place the chip on the PCB.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-15.webp',
		alt: '',
		width: 845,
		height: 536,
		caption: 'Picture 15. In this case the chip consisted of two separate parts and it was possible to use two chips to avoid further fan out.'
	},
	{
		type: 'heading',
		level: 3,
		text: '4.8 PCB-Layout – PCB-pad size, open area (longer pads)'
	},
	{
		type: 'paragraph',
		html: 'Always consider somewhat longer PCB-pads. If the PCB pads are thin or if the plating for some reason is of poor quality for bonding, longer pads will improve bonding conditions. Also, the possibility of placing the bond a little distance from the very edge provides a more stable bonding surface.'
	},
	{
		type: 'gallery',
		figures: [
			{
				src: '/mandalon/designguide/picture-16.webp',
				alt: '',
				width: 369,
				height: 558,
				caption: 'Picture 16. Bond pads bumped in advance. Small open pad area.'
			},
			{
				src: '/mandalon/designguide/picture-17.webp',
				alt: '',
				width: 374,
				height: 562,
				caption: 'Picture 17. Open area do not match pads.'
			},
			{
				src: '/mandalon/designguide/picture-18.webp',
				alt: '',
				width: 679,
				height: 423,
				caption: 'Picture 18. Good bonding conditions with regard to open pad area.'
			}
		]
	},
	{
		type: 'heading',
		level: 2,
		text: '5. Chip Design, Pitch Limitations for Bonding'
	},
	{
		type: 'paragraph',
		html: 'In this chapter pitch limitations are addressed to help you design a chip with proper bonding conditions for RF signals and for data signals.'
	},
	{
		type: 'heading',
		level: 3,
		text: '5.1 RF Signals'
	},
	{
		type: 'paragraph',
		html: 'Requirements: short and thick bond wires are required. Start placing the pads on the chip for the signals with the highest requirements.'
	},
	{
		type: 'paragraph',
		html: 'There must be enough space for 33µm bond wires for the RF signals.<br />Example 1:<br />If you have ca 5 pads with Straight Pitch: Minimum pitch is 100µm.<br />Example 2:<br />If you have ca 5 pads with Staggered Pads: Minimum effective pitch is 50µm.'
	},
	{
		type: 'paragraph',
		html: 'For more examples, see table 1 and table 2 in table section.'
	},
	{
		type: 'paragraph',
		html: 'If possible use the outer row on the chip when staggered pads are used as this shortens the bond wire length.<br />It is of great importance to make sure that the bond wire will be short, by planning for the attachment to the PCB at minimum angle. Also make sure it will not interfere with other bond wires, but can be bonded in a straight line.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-19.webp',
		alt: '',
		width: 790,
		height: 637,
		caption:
			'Picture 19. Note the thicker 33µm wires and the increased pitch on top row for these specific pads. To the left one pad is left out to provide more space.'
	},
	{
		type: 'heading',
		level: 2,
		text: 'Tables'
	},
	{
		type: 'paragraph',
		html: 'To get an idea of what is possible with regard to pitch and when it starts to get costly, see tables below. One table is for straight pitch and one is for staggered pads.'
	},
	{
		type: 'paragraph',
		html: 'The tables include three different columns, easy to bond; normal; and close to the limit of what is possible under the stated circumstances. The column to the left shows the smallest pitch, close to the limit of what is possible to perform (with the specific equipment that this design guide is based on) and therefore the most time consuming and expensive.'
	},
	{
		type: 'paragraph',
		html: 'Time/Cost levels<br />Level 1: Easy = 1 time/cost unit<br />Level 2: Normal = 3 time/cost units<br />Level 3: Close to the Limit = 10 time/cost units'
	},
	{
		type: 'heading',
		level: 3,
		text: 'Table 1: Straight Pitch. Case: RF Signals, wire dia = 33µm.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/table-1.webp',
		alt: '',
		width: 573,
		height: 167
	},
	{
		type: 'heading',
		level: 3,
		text: 'Table 2: Staggered Pads. Case: RF Signals, wire dia = 33µm.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/table-2.webp',
		alt: '',
		width: 575,
		height: 166
	},
	{
		type: 'paragraph',
		html: '<strong>Special cases:</strong> Double wires on the same pad are an alternative to thicker wire.'
	},
	{
		type: 'heading',
		level: 3,
		text: '5.2 Data Signals'
	},
	{
		type: 'paragraph',
		html: 'Requirements: Small pitch is required to minimize chip area used for pads.'
	},
	{
		type: 'paragraph',
		html: 'The following apply for data signals that can have long bond wires and where there are no specific requirements on the wire diameter.'
	},
	{
		type: 'paragraph',
		html: 'Smallest possible pitch is decided by the wire diameter. A rule of thumb is that the pitch must be at least 2,5 * the wire diameter, as the ball formed will be of that size.'
	},
	{
		type: 'paragraph',
		html: 'Smaller pitch increase time and therefore the cost for bonding. An increased number of bonds add another practical limit, since one single not perfectly placed bond will interfere with all the following bonds in that row. This is why all bonds on the chip should be included, when reading column 1 “Number of bonds on the chip”, in table 3 and 4 below.'
	},
	{
		type: 'heading',
		level: 3,
		text: 'Table 3: Straight pitch. Case: Data signals'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/table-3.webp',
		alt: '',
		width: 562,
		height: 257
	},
	{
		type: 'paragraph',
		html: 'Choose the smallest pad size if there are more than 20 wires and if the pitch is 65µm or below. In these cases the conditions for bonding are tight and the risk of a bond ball causing short circuit between pads needs to be reduced.'
	},
	{
		type: 'paragraph',
		html: 'Note: The thinnest bond wire, 17µm, always makes the bonding procedure more sensitive. This increases time for bonding and therefore the cost. To be able to bond 70µm or smaller pitch, the 17µm bond wire is normally required.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-20.webp',
		alt: '',
		width: 745,
		height: 561,
		caption: 'Picture 20. Bonding with 17µm wire and 60 pitch. (Cost level 3.)'
	},
	{
		type: 'heading',
		level: 3,
		text: 'Staggered pads'
	},
	{
		type: 'paragraph',
		html: 'If the number of wires are high use staggered pads on the chip. Note that this requires special attention to the PCB-layout, to avoid fan out >45º.'
	},
	{
		type: 'paragraph',
		html: 'When smallest pitch is used and the number of bond wires is very high, if the library allows a bigger distance (30-40 µm instead of 10 µm) between the two rows of pads in staggered pads, use a bigger distance to improve bonding conditions.'
	},
	{
		type: 'heading',
		level: 3,
		text: 'Table 4: Staggered pads. Case: Data Signals.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/table-4.webp',
		alt: '',
		width: 559,
		height: 167
	},
	{
		type: 'paragraph',
		html: '<strong>Special cases:</strong> Reverse bonding (first bond with the ball on the PCB) could be used to reduce space needed on the chip, but it requires a robust surface around the chip-pad.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-21.webp',
		alt: '',
		width: 777,
		height: 519,
		caption: 'Picture 21. Reverse bonding with marks on the chip at the second bond.'
	},
	{
		type: 'figure',
		src: '/mandalon/designguide/picture-22.webp',
		alt: '',
		width: 777,
		height: 501,
		caption: 'Picture 22. Reverse bonding, no marks at the second bond.'
	},
	{
		type: 'heading',
		level: 2,
		text: '6. System thinking'
	},
	{
		type: 'paragraph',
		html: 'To be able to get the most out of a chip the total system must perform as well as the chip itself. The integration of chip and PCB is a critical part of the design.'
	},
	{
		type: 'paragraph',
		html: 'Consider the PCB-layout already during the chip design phase, (see chapter 4 of this design guide) and involve the packaging partner early.'
	},
	{
		type: 'paragraph',
		html: 'Another tool that could be of assistance is to produce a layout drawing. This helps all people involved to understand the special demands of the system. See picture 8 for example.'
	}
] as const satisfies readonly DesignGuideBlock[];

export const designGuideToc = tocFromHeadings(designGuideBody);
