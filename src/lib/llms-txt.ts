import { siteContent, type Locale } from '$lib/content/site';
import { hrefFor, type PageKey } from '$lib/routes';
import { toAbsoluteUrl } from '$lib/seo';

const pageKeys: PageKey[] = ['home', 'packaging', 'consulting', 'about', 'contact', 'designGuide', 'privacy'];

function pageSummary(key: PageKey, locale: Locale): { title: string; description: string } {
	const content = siteContent[locale];

	switch (key) {
		case 'home':
			return { title: content.footer.nav.find((link) => link.page === 'home')?.label ?? 'Mandalon', description: content.meta.description };
		case 'packaging':
			return { title: content.chipSensorsPage.title, description: content.chipSensorsPage.meta.description };
		case 'consulting':
			return { title: content.consultingPage.title, description: content.consultingPage.meta.description };
		case 'about':
			return { title: content.aboutPage.title, description: content.aboutPage.meta.description };
		case 'contact':
			return { title: content.contactPage.title, description: content.contactPage.meta.description };
		case 'designGuide':
			return { title: content.designGuidePage.title, description: content.designGuidePage.meta.description };
		case 'privacy':
			return { title: content.privacyPage.title, description: content.privacyPage.meta.description };
	}
}

function pageList(locale: Locale): string {
	return pageKeys
		.map((key) => {
			const { title, description } = pageSummary(key, locale);
			return `- [${title}](${toAbsoluteUrl(hrefFor(key, locale))}): ${description}`;
		})
		.join('\n');
}

export function buildLlmsTxt(): string {
	const en = siteContent.en;
	const contact = en.contactPage;
	const { street, postalCode, city, company } = contact.address;
	const people = contact.people
		.filter((person) => person.phone)
		.map((person) => `- ${person.name} (${person.role}): ${person.phone}`)
		.join('\n');

	return `# Mandalon
> ${en.meta.description}

Mandalon Technologies AB is a B2B lab for chip packaging, wire bonding, die bonding, and consulting. The lab is in Linghem, just outside Linköping, Sweden. Swedish is the default language (no URL prefix). English pages live under /en/.

Contact inquiries by email, phone, or the form on the contact page. There is no e-commerce and no account login.

## Pages (English)
${pageList('en')}

## Pages (Swedish)
${pageList('sv')}

## Contact
- Company: ${company}
- Email: [${contact.email}](${contact.emailHref})
- Address: ${street}, ${postalCode} ${city}, Sweden
- Org.nr: ${contact.orgNumber}
${people}
`;
}
