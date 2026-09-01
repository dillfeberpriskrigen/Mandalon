import type { PrivacyPageContent } from '../types';

/** Shared Swedish policy body — there is no English source copy. */
const privacyPolicyBody = {
	documentMeta: ['Senaste revision: 2026-08-20'],
	sections: [
		{
			title: 'Hur vi behandlar dina personuppgifter:',
			paragraphs: [
				'Mandalon Technologies AB är mån om att behandla sina kontakters personuppgifter så att alla ska kunna känna sej trygga i sina kontakter med bolaget. Vi följer GDPR vilket innebär att vi respekterar våra kontakters personliga integritet och envars rätt att ha kontroll över sina personuppgifter. Vi kommer att på begäran redovisa vilka data vi har lagrade och varför de är det. Efter bästa förmåga kommer vi också att skydda dessa.',
				'Policyn gäller givetvis överallt där vi hanterar personuppgifter såsom emailkorrespondens, post, telefonregister samt kontakter via web och sociala medier.'
			]
		},
		{
			title: 'Personuppgifter som vi hanterar:',
			paragraphs: [
				'De uppgifter vi hanterar får vi genom direkta kontakter med kunder, samarbetspartner, leverantörer, konsulter och övriga, inklusive meddelanden via kontaktformuläret på hemsidan. Vi hanterar i dagsläget inga konsumentkontakter.',
				'Vi uppdaterar inga uppgifter automatiskt mha personnummer eller dylikt utan all uppdatering sker via direktkontakt med berörd person och vid behov.',
				'För att kunna ha tillgång till historik vad gäller teknikval och liknande frågeställningar kommer emailkorrespondens att kunna sparas i upp till tio år. Denna emailkorrespondens kommer att se ut och vara strukturerad enligt den äldre personuppgiftslagen, PUL vad gäller ostrukturerad datalagring.'
			]
		},
		{
			title: 'Marknadsföring:',
			paragraphs: ['Viss marknadsföring/information kan i framtiden komma i fråga med de uppgifter vi har.']
		},
		{
			title: 'Informationsdelning:',
			paragraphs: ['I de fall anledning finns att dela exempelvis kontaktuppgifter med tredje part kommer detta att ske först efter överenskommelse.']
		},
		{
			title: 'Hemsida och cookies:',
			paragraphs: [
				'Mandalons hemsida sätter inga cookies.',
				'Vi sparar aggregerad besöksstatistik: sidvisningar, 404:or, redirects, landskod och ev. referrer-värd. IP-adressen används bara tillfälligt för att slå upp landet och sparas inte.',
				'Kontaktformuläret skickar namn, e-post och meddelande till oss som e-post. Vi lagrar inte inskicken i en separat databas på hemsidan.'
			]
		},
		{
			title: 'Rättigheter enligt GDPR:',
			paragraphs: [
				'Privatpersoners rättigheter när det gäller de uppgifter Mandalon hanterar ger möjlighet att dels påverka vilken information som sparas och dels att rätta eller begära radering av de egna uppgifterna. Begäran om detta görs enklast via kontaktformuläret eller e-post till adressen nedan.'
			]
		}
	],
	contact: {
		title: 'Kontakt:',
		addressLabel: 'Postadress',
		addressLines: ['Bjärby Himmelslund 1', '58561 Linghem'],
		emailLabel: 'Email'
	}
};

export const privacyPage = {
	sv: {
		meta: {
			title: 'Mandalon | Integritetspolicy',
			description: 'Hur Mandalon Technologies AB behandlar personuppgifter enligt GDPR, inklusive cookies, lagring och dina rättigheter.'
		},
		title: 'Integritetspolicy',
		languageNote: '',
		...privacyPolicyBody
	},
	en: {
		meta: {
			title: 'Mandalon | Privacy policy',
			description: 'How Mandalon Technologies AB handles personal data under GDPR. The policy text is currently available in Swedish only.'
		},
		title: 'Privacy policy',
		languageNote: 'This privacy policy is currently available in Swedish only.',
		...privacyPolicyBody
	}
} satisfies Record<'sv' | 'en', PrivacyPageContent>;
