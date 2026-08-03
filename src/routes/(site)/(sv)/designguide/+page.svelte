<script lang="ts">
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const content = $derived(data.content.designGuidePage);
</script>

<PageMeta meta={content.meta} pageKey="designGuide" locale={data.locale} />

<section class="guide-page">
	<div class="container">
		<h1 class="page-title">{content.title}</h1>
		<p class="guide-intro text-width">{content.intro}</p>
		{#if content.languageNote}
			<p class="guide-language-note text-width">{content.languageNote}</p>
		{/if}
		<div class="guide-content">
			<article class="designguide-article">
				<h2>
					{content.articleIntroTitle}
				</h2>

				<p>
					{content.articleIntroBody}
				</p>

				<p><a class="designguide-download" href="/mandalon/designguide/mt-2007-011-dg-issue1_070416.pdf">{content.downloadLabel}</a></p>

				<h3>Contents</h3>

				<ol class="designguide-list">
					<li><strong>Background</strong></li>
					<li><strong>Conclusions</strong></li>
					<li>
						<strong>Introduction</strong>
						<ol>
							<li>Document Overview</li>
							<li>Definitions</li>
							<li>Ball Bonding</li>
						</ol>
					</li>
					<li>
						<strong>PCB-Layout &#8211; good to know about PCB-layout before starting to design your chip</strong>
						<ol>
							<li>PCB-Layout &#8211; pad positioning to reduce fan out</li>
							<li>PCB-Layout &#8211; pad positioning (RF signals)</li>
							<li>PCB-Layout &#8211; pad positioning (50Ω tracks)</li>
							<li>PCB-Layout &#8211; how close to the chip</li>
							<li>PCB-Layout &#8211; cavity to lower the chip into the PCB</li>
							<li>PCB-Layout &#8211; pad pattern</li>
							<li>PCB-Layout &#8211; where to place the chip</li>
							<li>PCB-Layout &#8211; PCB-pad size, open area (longer pads)</li>
						</ol>
					</li>
					<li>
						<strong>Chip Design, pitch limitations for bonding</strong>
						<ol>
							<li>RF Signals</li>
							<li>Data Signals</li>
						</ol>
					</li>
					<li><strong>System thinking</strong></li>
				</ol>

				<h3>1. Background</h3>

				<p>
					Mandalon Technologies AB is a company which provides chip packaging services for prototypes and small series with high demands. In cooperation with
					the Department of Electrical Engineering ISY at Linköping University a lot of different complex chip prototypes have been handled over the years. The
					idea of collecting the experience and to form some kind of design guide has been in the minds of some persons for some time. <br /><br />When minST
					came into the picture, this was made possible. With minST as one of the financing parts Mandalon and ISY have been able to establish a process and to
					produce this design guide. <br /><br />The chips designed at ISY are high performing. The packaging could have an undesired impact on the performance
					if not considered during the chip design. By using this design guide both increased system performance and reduced time for design, could be achieved.<br
					/>
				</p>

				<h3>2. Conclusions</h3>

				<p>
					The most obvious conclusion found during the process to produce this design guide, was that there is a need for system thinking early in the design
					phase. The chip itself must be integrated successfully on the PCB to function effectively and this PCB-integration must be taken into consideration
					during the chip design.
				</p>

				<h3>3. Introduction</h3>

				<p>
					This design guide is based on the experience which Mandalon Technologies has from ball bonding. The equipment, a K&amp;S 4124 is designed for gold
					bond wires with a diameter between 17-50 µm. The information herein is specific for these circumstances.<br /><br />The design guide uses three
					different levels of difficulties (time/cost consuming), with respect to the packaging work. The three different levels shall be considered as an
					indication.<br /><br />Time/Cost levels<br />Level 1: Easy = 1 time/cost unit<br />Level 2: Normal = 3 time/cost units<br />Level 3: Close to the
					Limit = 10 time/cost units<br />
				</p>

				<h4>3.1 Document Overview</h4>

				<p>
					In chapter 4 <em>“PCB-Layout &#8211; Good to know about PCB-layout before starting to design your chip”</em> different aspects of the PCB-layout are
					addressed to help you design a chip suitable for a complete system (including PCB and wire bonding). Topics such as how to position the pads on the
					PCB to meet signal requirements and necessary bonding conditions are presented in chapter 4.1-4.3. Further ways to minimize length of bond wire are
					presented in chapter 4.4 and 4.5.Some options on pad-patterns and chip positioning are shown in chapter 4.6 and 4.7.In chapter 4.8 bonding conditions
					on the PCB-pads are discussed.<br /><br />In chapter 5 “Chip Design &#8211; Pitch limitations for bonding” pitch limitations are addressed to help you
					design a chip with proper bonding conditions. The special circumstances required for RF signals and data signals are addressed in chapter 5.1 and 5.2
					respectively.
				</p>

				<h4>3.2 Definitions</h4>

				<p>In this section you will find some useful definitions.</p>
				<p>
					<u>Fan out</u> – Angle spread out of bond wires from the chip to the PCB.<br /><u>Pitch</u> – The distance in µm between the centres of two subsequent
					bond-pads on a chip. Also referred to as straight pitch in this document.<br /><u>Staggered pads</u> – Two rows of pads as in the picture 1 below.<br
					/><u>Effective pitch</u>
					– The distance A in the picture 1 below.
				</p>

				<figure>
					<a href="/mandalon/designguide/picture-1.webp"
						><img
							decoding="async"
							src="/mandalon/designguide/picture-1.webp"
							alt=""
							width="578"
							height="337"
							srcset="/mandalon/designguide/picture-1.webp 385w, /mandalon/designguide/picture-1-300x175.webp 300w"
							sizes="(max-width: 578px) 100vw, 578px"
						/></a
					>
					<figcaption>Picture 1. A=effective pitch.</figcaption>
				</figure>

				<h4>3.3 Ball Bonding</h4>

				<p>
					Ball bonding is a bonding method using gold wire. The combination of heat, pressure and ultrasound (US) enables the wire to stick to the bond pads.
					First a ball is formed at the end of the wire and the ball is then placed on the chip pad and the first bond is performed. The tool is then moved to
					the PCB pad position, letting out the wire, and the second bond is performed whilst the wire is cut. This becomes a bond without any ball.
				</p>

				<figure>
					<a href="/mandalon/designguide/picture-2.webp"
						><img
							decoding="async"
							src="/mandalon/designguide/picture-2.webp"
							alt=""
							width="584"
							height="326"
							srcset="/mandalon/designguide/picture-2.webp 360w, /mandalon/designguide/picture-2-300x168.webp 300w"
							sizes="(max-width: 584px) 100vw, 584px"
						/></a
					>
					<figcaption>Picture 2. Ball bonding with 25 µm wire and pitch 90 µm. A bottleneck capillary is used.</figcaption>
				</figure>

				<figure>
					<a href="/mandalon/designguide/picture-3.webp"
						><img
							loading="lazy"
							decoding="async"
							src="/mandalon/designguide/picture-3.webp"
							alt=""
							width="590"
							height="353"
							srcset="/mandalon/designguide/picture-3.webp 369w, /mandalon/designguide/picture-3-300x180.webp 300w"
							sizes="auto, (max-width: 590px) 100vw, 590px"
						/></a
					>
					<figcaption>Picture 3. Ball bonding. The difference between 1st bond with the ball and 2nd bond.</figcaption>
				</figure>

				<h3>4. PCB-Layout &#8211; good to know about PCB-layout before starting to design your chip</h3>

				<p>
					In this chapter different aspects of the PCB-layout are addressed to help you design a chip suitable for a complete packaging system (including PCB
					and wire bonding).
				</p>

				<h4>4.1 PCB-Layout – pad positioning to reduce fan out</h4>

				<p>Angle from chip-pad to PCB-pad above 45º should be avoided. Angles above 45º are likely to cause short circuits between the bond wires.</p>

				<figure>
					<a href="/mandalon/designguide/picture-4.webp"
						><img
							loading="lazy"
							decoding="async"
							width="726"
							height="197"
							src="/mandalon/designguide/picture-4.webp"
							alt=""
							srcset="/mandalon/designguide/picture-4.webp 726w, /mandalon/designguide/picture-4-300x81.webp 300w"
							sizes="auto, (max-width: 726px) 100vw, 726px"
						/></a
					>
					<figcaption>Picture 4. Fan out.</figcaption>
				</figure>

				<figure>
					<a href="/mandalon/designguide/picture-5.webp"
						><img
							loading="lazy"
							decoding="async"
							width="844"
							height="476"
							src="/mandalon/designguide/picture-5.webp"
							alt=""
							srcset="/mandalon/designguide/picture-5.webp 844w, /mandalon/designguide/picture-5-300x169.webp 300w, /mandalon/designguide/picture-5-768x433.webp 768w"
							sizes="auto, (max-width: 844px) 100vw, 844px"
						/></a
					>
					<figcaption>Picture 5. The risk for short circuits increases when angle of fan out is above 45º.</figcaption>
				</figure>

				<figure>
					<a href="/mandalon/designguide/picture-6.webp"
						><img
							loading="lazy"
							decoding="async"
							src="/mandalon/designguide/picture-6.webp"
							alt=""
							width="588"
							height="481"
							srcset="/mandalon/designguide/picture-6.webp 600w, /mandalon/designguide/picture-6-300x246.webp 300w"
							sizes="auto, (max-width: 588px) 100vw, 588px"
						/></a
					>
					<figcaption>Picture 6. Bonding under normal fan out conditions.</figcaption>
				</figure>

				<figure>
					<a href="/mandalon/designguide/picture-7.webp"
						><img
							loading="lazy"
							decoding="async"
							src="/mandalon/designguide/picture-7.webp"
							alt=""
							width="585"
							height="510"
							srcset="/mandalon/designguide/picture-7.webp 666w, /mandalon/designguide/picture-7-300x262.webp 300w"
							sizes="auto, (max-width: 585px) 100vw, 585px"
						/></a
					>
					<figcaption>Picture 7. Bonding under difficult fan out conditions. Some fan out &gt;45º. (Cost level 3.)</figcaption>
				</figure>

				<h4>4.2 PCB-Layout &#8211; pad positioning (RF signals)</h4>

				<p>
					RF signals need shortest possible bond wires between chip and PCB. Start with the signals with the highest requirements. Make sure it is possible to
					place the pads on the PCB close and with minimum angle.
				</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="489"
						height="459"
						src="/mandalon/designguide/picture-8.webp"
						alt=""
						srcset="/mandalon/designguide/picture-8.webp 489w, /mandalon/designguide/picture-8-300x282.webp 300w"
						sizes="auto, (max-width: 489px) 100vw, 489px"
					/>
					<figcaption>Picture 8.&nbsp;&nbsp;Note the short bondings in the top middle and left middle.</figcaption>
				</figure>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="681"
						height="510"
						src="/mandalon/designguide/picture-9.webp"
						alt=""
						srcset="/mandalon/designguide/picture-9.webp 681w, /mandalon/designguide/picture-9-300x225.webp 300w"
						sizes="auto, (max-width: 681px) 100vw, 681px"
					/>
					<figcaption>Picture 9. Note the short bondings in the left top corner.</figcaption>
				</figure>

				<h4>4.3 PCB-Layout &#8211; pad positioning (50Ω tracks)</h4>

				<p>
					If possible use one side of the PCB for these signals, since there need to be broad tracks/lines on the PCB close to the chip. The bond wires must
					have minimum length.<br />
					The other signals will in this case be wire bonded to the remaining sides of the PCB. This can be good enough for data signals, where long wires are OK.
				</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="591"
						height="530"
						src="/mandalon/designguide/picture-10.webp"
						alt=""
						srcset="/mandalon/designguide/picture-10.webp 591w, /mandalon/designguide/picture-10-300x269.webp 300w"
						sizes="auto, (max-width: 591px) 100vw, 591px"
					/>
					<figcaption>Picture 10. Example, not a real case.</figcaption>
				</figure>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="746"
						height="432"
						src="/mandalon/designguide/picture-11.webp"
						alt=""
						srcset="/mandalon/designguide/picture-11.webp 746w, /mandalon/designguide/picture-11-300x174.webp 300w"
						sizes="auto, (max-width: 746px) 100vw, 746px"
					/>
					<figcaption>Picture 11. The broad tracks on the PCB are 50Ω tracks.</figcaption>
				</figure>

				<h4>4.4 PCB-Layout &#8211; how close to the chip</h4>

				<p>
					How close to the chip can you bond a wire? It depends on the height on the chip and the angle on the capillary on the bonding equipment. The distances
					below can be used as an indication.
				</p>
				<p>At chip height ca 500 µm:<br />Level 1: Easy &gt;700 µm<br />Level 2: Normal 500 µm<br />Level 3: Costly 200 µm</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="733"
						height="401"
						src="/mandalon/designguide/picture-12.webp"
						alt=""
						srcset="/mandalon/designguide/picture-12.webp 733w, /mandalon/designguide/picture-12-300x164.webp 300w"
						sizes="auto, (max-width: 733px) 100vw, 733px"
					/>
					<figcaption>Picture 12. Height of chip is 300 µm. Distance from chip to bond is 250 µm. (Cost level 2-3)</figcaption>
				</figure>

				<h4>4.5 PCB-Layout – cavity to lower the chip into the PCB</h4>

				<p>
					It is possible to prepare a cavity in the PCB where the chip can be placed. This lowers the chip into the PCB, which makes it possible to place the
					bond wire closer on the PCB.
				</p>
				<p>
					To be able to make a cavity for the chip, the PCB must be designed for it. There must be only ground layers or no layer at all in the cavity area. If
					necessary the ground plane may be continued with conducting glue under the chip. The exact size of the chip must also be known in advance.
				</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="794"
						height="478"
						src="/mandalon/designguide/picture-13.webp"
						alt=""
						srcset="/mandalon/designguide/picture-13.webp 794w, /mandalon/designguide/picture-13-300x181.webp 300w, /mandalon/designguide/picture-13-768x462.webp 768w"
						sizes="auto, (max-width: 794px) 100vw, 794px"
					/>
					<figcaption>Picture 13. Chip in cavity.</figcaption>
				</figure>

				<h4>4.6 PCB-Layout – pad patterns</h4>

				<p>If you have special requirements &#8211; don’t think symmetry. Here you have some options on PCB-layout for special signals.</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="780"
						height="631"
						src="/mandalon/designguide/picture-14.webp"
						alt=""
						srcset="/mandalon/designguide/picture-14.webp 780w, /mandalon/designguide/picture-14-300x243.webp 300w, /mandalon/designguide/picture-14-768x621.webp 768w"
						sizes="auto, (max-width: 780px) 100vw, 780px"
					/>
					<figcaption>Picture 14. PCB-layout options.Note that it is possible to bond more than one bond wire to a single pad.</figcaption>
				</figure>

				<h4>4.7 PCB-Layout – where to place the chip</h4>

				<p>Again if you have special requirements &#8211; don’t think symmetry. Here are some options, how to place the chip on the PCB.</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="845"
						height="536"
						src="/mandalon/designguide/picture-15.webp"
						alt=""
						srcset="/mandalon/designguide/picture-15.webp 845w, /mandalon/designguide/picture-15-300x190.webp 300w, /mandalon/designguide/picture-15-768x487.webp 768w"
						sizes="auto, (max-width: 845px) 100vw, 845px"
					/>
					<figcaption>
						Picture 15. In this case the chip consisted of two separate parts and it was possible to use two chips to avoid further fan out.
					</figcaption>
				</figure>

				<h4>4.8 PCB-Layout &#8211; PCB-pad size, open area (longer pads)</h4>

				<p>
					Always consider somewhat longer PCB-pads. If the PCB pads are thin or if the plating for some reason is of poor quality for bonding, longer pads will
					improve bonding conditions. Also, the possibility of placing the bond a little distance from the very edge provides a more stable bonding surface.
				</p>

				<figure class="designguide-gallery">
					<ul class="designguide-gallery-grid">
						<li class="designguide-gallery-item">
							<figure>
								<a href="/mandalon/designguide/picture-16.webp"
									><img
										loading="lazy"
										decoding="async"
										width="369"
										height="558"
										src="/mandalon/designguide/picture-16.webp"
										alt=""
										srcset="/mandalon/designguide/picture-16.webp 369w, /mandalon/designguide/picture-16-198x300.webp 198w"
										sizes="auto, (max-width: 369px) 100vw, 369px"
									/></a
								>
								<figcaption class="designguide-gallery-caption">Picture 16. Bond pads bumped in advance. Small open pad area.</figcaption>
							</figure>
						</li>
						<li class="designguide-gallery-item">
							<figure>
								<a href="/mandalon/designguide/picture-17.webp"
									><img
										loading="lazy"
										decoding="async"
										width="374"
										height="562"
										src="/mandalon/designguide/picture-17.webp"
										alt=""
										srcset="/mandalon/designguide/picture-17.webp 374w, /mandalon/designguide/picture-17-200x300.webp 200w"
										sizes="auto, (max-width: 374px) 100vw, 374px"
									/></a
								>
								<figcaption class="designguide-gallery-caption">Picture 17. Open area do not match pads.</figcaption>
							</figure>
						</li>
						<li class="designguide-gallery-item">
							<figure>
								<a href="/mandalon/designguide/picture-18.webp"
									><img
										loading="lazy"
										decoding="async"
										width="679"
										height="423"
										src="/mandalon/designguide/picture-18.webp"
										alt=""
										srcset="/mandalon/designguide/picture-18.webp 679w, /mandalon/designguide/picture-18-300x187.webp 300w"
										sizes="auto, (max-width: 679px) 100vw, 679px"
									/></a
								>
								<figcaption class="designguide-gallery-caption">Picture 18. Good bonding conditions with regard to open pad area.</figcaption>
							</figure>
						</li>
					</ul>
				</figure>

				<h3>5. Chip Design, Pitch Limitations for Bonding</h3>

				<p>In this chapter pitch limitations are addressed to help you design a chip with proper bonding conditions for RF signals and for data signals.</p>

				<h4>5.1 RF Signals</h4>

				<p>Requirements: short and thick bond wires are required. Start placing the pads on the chip for the signals with the highest requirements.</p>
				<p>
					There must be enough space for 33µm bond wires for the RF signals.<br />Example 1:<br />If you have ca 5 pads with Straight Pitch: Minimum pitch is
					100µm.<br />Example 2:<br />If you have ca 5 pads with Staggered Pads: Minimum effective pitch is 50µm.
				</p>
				<p>For more examples, see table 1 and table 2 in table section.</p>
				<p>
					If possible use the outer row on the chip when staggered pads are used as this shortens the bond wire length.<br />It is of great importance to make
					sure that the bond wire will be short, by planning for the attachment to the PCB at minimum angle. Also make sure it will not interfere with other
					bond wires, but can be bonded in a straight line.
				</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="790"
						height="637"
						src="/mandalon/designguide/picture-19.webp"
						alt=""
						srcset="/mandalon/designguide/picture-19.webp 790w, /mandalon/designguide/picture-19-300x242.webp 300w, /mandalon/designguide/picture-19-768x619.webp 768w"
						sizes="auto, (max-width: 790px) 100vw, 790px"
					/>
					<figcaption>
						Picture 19. Note the thicker 33µm wires and the increased pitch on top row for these specific pads. To the left one pad is left out to provide more
						space.
					</figcaption>
				</figure>

				<h3>Tables</h3>

				<p>
					To get an idea of what is possible with regard to pitch and when it starts to get costly, see tables below. One table is for straight pitch and one is
					for staggered pads.
				</p>
				<p>
					The tables include three different columns, easy to bond; normal; and close to the limit of what is possible under the stated circumstances. The
					column to the left shows the smallest pitch, close to the limit of what is possible to perform (with the specific equipment that this design guide is
					based on) and therefore the most time consuming and expensive.
				</p>
				<p>
					Time/Cost levels<br />Level 1: Easy = 1 time/cost unit<br />Level 2: Normal = 3 time/cost units<br />Level 3: Close to the Limit = 10 time/cost units
				</p>

				<h4>Table 1: Straight Pitch. Case: RF Signals, wire dia = 33µm.</h4>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="573"
						height="167"
						src="/mandalon/designguide/table-1.webp"
						alt=""
						srcset="/mandalon/designguide/table-1.webp 573w, /mandalon/designguide/table-1-300x87.webp 300w"
						sizes="auto, (max-width: 573px) 100vw, 573px"
					/>
				</figure>

				<h4>Table 2: Staggered Pads. Case: RF Signals, wire dia = 33µm.</h4>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="575"
						height="166"
						src="/mandalon/designguide/table-2.webp"
						alt=""
						srcset="/mandalon/designguide/table-2.webp 575w, /mandalon/designguide/table-2-300x87.webp 300w"
						sizes="auto, (max-width: 575px) 100vw, 575px"
					/>
				</figure>

				<p><strong>Special cases:</strong> Double wires on the same pad are an alternative to thicker wire.</p>

				<h4>5.2 Data Signals</h4>

				<p>Requirements: Small pitch is required to minimize chip area used for pads.</p>
				<p>The following apply for data signals that can have long bond wires and where there are no specific requirements on the wire diameter.</p>
				<p>
					Smallest possible pitch is decided by the wire diameter. A rule of thumb is that the pitch must be at least 2,5 * the wire diameter, as the ball
					formed will be of that size.
				</p>
				<p>
					Smaller pitch increase time and therefore the cost for bonding. An increased number of bonds add another practical limit, since one single not
					perfectly placed bond will interfere with all the following bonds in that row. This is why all bonds on the chip should be included, when reading
					column 1 “Number of bonds on the chip”, in table 3 and 4 below.
				</p>

				<h4>Table 3: Straight pitch. Case: Data signals</h4>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="562"
						height="257"
						src="/mandalon/designguide/table-3.webp"
						alt=""
						srcset="/mandalon/designguide/table-3.webp 562w, /mandalon/designguide/table-3-300x137.webp 300w"
						sizes="auto, (max-width: 562px) 100vw, 562px"
					/>
				</figure>

				<p>
					Choose the smallest pad size if there are more than 20 wires and if the pitch is 65µm or below. In these cases the conditions for bonding are tight
					and the risk of a bond ball causing short circuit between pads needs to be reduced.
				</p>
				<p>
					Note: The thinnest bond wire, 17µm, always makes the bonding procedure more sensitive. This increases time for bonding and therefore the cost. To be
					able to bond 70µm or smaller pitch, the 17µm bond wire is normally required.
				</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="745"
						height="561"
						src="/mandalon/designguide/picture-20.webp"
						alt=""
						srcset="/mandalon/designguide/picture-20.webp 745w, /mandalon/designguide/picture-20-300x226.webp 300w"
						sizes="auto, (max-width: 745px) 100vw, 745px"
					/>
					<figcaption>Picture 20. Bonding with 17µm wire and 60 pitch. (Cost level 3.)</figcaption>
				</figure>

				<h4>Staggered pads</h4>

				<p>
					If the number of wires are high use staggered pads on the chip. Note that this requires special attention to the PCB-layout, to avoid fan out &gt;45º.
				</p>
				<p>
					When smallest pitch is used and the number of bond wires is very high, if the library allows a bigger distance (30-40 µm instead of 10 µm) between the
					two rows of pads in staggered pads, use a bigger distance to improve bonding conditions.
				</p>

				<h4>Table 4: Staggered pads. Case: Data Signals.</h4>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="559"
						height="167"
						src="/mandalon/designguide/table-4.webp"
						alt=""
						srcset="/mandalon/designguide/table-4.webp 559w, /mandalon/designguide/table-4-300x90.webp 300w"
						sizes="auto, (max-width: 559px) 100vw, 559px"
					/>
				</figure>

				<p>
					<strong>Special cases:</strong> Reverse bonding (first bond with the ball on the PCB) could be used to reduce space needed on the chip, but it requires
					a robust surface around the chip-pad.
				</p>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="777"
						height="519"
						src="/mandalon/designguide/picture-21.webp"
						alt=""
						srcset="/mandalon/designguide/picture-21.webp 777w, /mandalon/designguide/picture-21-300x200.webp 300w, /mandalon/designguide/picture-21-768x513.webp 768w"
						sizes="auto, (max-width: 777px) 100vw, 777px"
					/>
					<figcaption>Picture 21. Reverse bonding with marks on the chip at the second bond.</figcaption>
				</figure>

				<figure>
					<img
						loading="lazy"
						decoding="async"
						width="777"
						height="501"
						src="/mandalon/designguide/picture-22.webp"
						alt=""
						srcset="/mandalon/designguide/picture-22.webp 777w, /mandalon/designguide/picture-22-300x193.webp 300w, /mandalon/designguide/picture-22-768x495.webp 768w"
						sizes="auto, (max-width: 777px) 100vw, 777px"
					/>
					<figcaption>Picture 22. Reverse bonding, no marks at the second bond.</figcaption>
				</figure>

				<h3>6. System thinking</h3>

				<p>
					To be able to get the most out of a chip the total system must perform as well as the chip itself. The integration of chip and PCB is a critical part
					of the design.
				</p>
				<p>Consider the PCB-layout already during the chip design phase, (see chapter 4 of this design guide) and involve the packaging partner early.</p>
				<p>
					Another tool that could be of assistance is to produce a layout drawing. This helps all people involved to understand the special demands of the
					system. See picture 8 for example.
				</p>
			</article>
		</div>
	</div>
</section>

<style>
	.guide-page {
		/* Page-local width override — not a shared token */
		--container-width: 980px;
		padding: 4rem 0 6rem;
	}

	h1 {
		margin: 0;
	}

	.guide-intro {
		margin-top: 1.25rem;
		font-size: 1.12rem;
		line-height: 1.8;
		color: #506458;
	}

	.guide-language-note {
		margin-top: 1rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: #506458;
		font-style: italic;
	}

	.guide-content {
		margin-top: 2rem;
		padding: 1.8rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.95);
	}

	.designguide-article h2,
	.designguide-article h3,
	.designguide-article h4 {
		margin: 1.6rem 0 0.75rem;
		line-height: 1.15;
		color: #10231c;
	}

	.designguide-article h2:first-child {
		margin-top: 0;
		font-size: clamp(1.8rem, 3vw, 2.4rem);
	}

	.designguide-article h3 {
		font-size: clamp(1.4rem, 2.3vw, 1.8rem);
	}

	.designguide-article h4 {
		font-size: clamp(1.15rem, 2vw, 1.35rem);
	}

	.designguide-article p,
	.designguide-article li,
	.designguide-article figcaption {
		margin: 0.8rem 0 0;
		line-height: 1.75;
		color: #506458;
	}

	.designguide-article a {
		color: #ffffff;
	}

	.designguide-download {
		display: inline-block;
		margin-top: 0.2rem;
		padding: 0.8rem 1.2rem;
		border-radius: 999px;
		background: #e97d2f;
		color: rgb(255, 255, 255);
		font-weight: 700;
		text-decoration: none;
	}

	.designguide-list,
	.designguide-article ol,
	.designguide-article ul {
		padding-left: 1.35rem;
	}

	.designguide-article figure {
		margin: 1.2rem 0;
	}

	.designguide-article img {
		display: block;
		max-width: 100%;
		height: auto;
		border-radius: 0.6rem;
	}

	.designguide-gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding: 0;
		list-style: none;
	}

	.designguide-gallery-item {
		margin: 0;
	}

	@media (max-width: 700px) {
		.guide-content {
			padding: 1.2rem;
		}

		.designguide-gallery-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
