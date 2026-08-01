export type Locale = 'sv' | 'en';

export type Meta = {
	title: string;
	description: string;
};

export type NavLink = {
	label: string;
	path: string;
};

export type LocalizedSlugs = {
	sv: string;
	en: string;
};

export type HeroContent = {
	title: string;
	copy: string;
};

export type SalesIntroContent = {
	title: string;
	paragraphs: string[];
	resource: {
		label: string;
		href: string;
		text: string;
	};
	actions: NavLink[];
};

export type ProcessContent = {
	title: string;
	steps: {
		title: string;
		text: string;
	}[];
};

export type ConsultingHomeContent = {
	title: string;
	features: {
		title: string;
		text: string;
		image: string;
	}[];
};

export type ChipSensorsPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	intro: string[];
	capabilitiesPresentation: string;
	capabilities: {
		name: string;
		description: string;
	}[];
	areas: {
		title: string;
		subtitle: string;
		paragraphs: string[];
		image: string;
		imageAlt: string;
	}[];
};

export type ConsultingPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	introTitle: string;
	introText: string;
	services: {
		title: string;
		text: string;
		points: string[];
	}[];
};

export type AboutPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	introTitle: string;
	intro: string[];
	storyTitle: string;
	story: string;
	certificationTitle: string;
	certification: string;
	certificationNote: string;
	referencesTitle: string;
	referencesLead: string;
	referencesHeading: string;
	researchProjectsHeading: string;
	references: string[];
	researchProjects: {
		title: string;
		href: string;
	}[];
};

export type ContactPerson = {
	name: string;
	role: string;
	image: string;
	imageAlt: string;
	phone: string;
	phoneHref: string;
	email?: string;
	emailHref?: string;
};

export type ContactDetail = {
	label: string;
	value: string;
	href?: string;
};

export type ContactPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	people: ContactPerson[];
	details: ContactDetail[];
	locationTitle: string;
	mapTitle: string;
};

export type GlossarySection = {
	title: string;
	subtitle: string;
	paragraphs: string[];
	image?: string;
	imageAlt?: string;
	caption?: string;
};

export type GlossaryPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	intro: string[];
	introImage: {
		src: string;
		alt: string;
	};
	faqTitle: string;
	faqs: {
		question: string;
		answer: string;
	}[];
	guide: {
		title: string;
		text: string;
		label: string;
		path: string;
	};
	sections: GlossarySection[];
};

export type DesignGuidePageContent = {
	meta: Meta;
	title: string;
	intro: string;
	articleIntroTitle: string;
	articleIntroBody: string;
	downloadLabel: string;
	embeddedDownloadLabel: string;
};

export type FooterContent = {
	nav: NavLink[];
};

export type ErrorPageContent = {
	title: string;
	notFound: string;
	generic: string;
	homeLabel: string;
};

export type LocaleContent = {
	meta: Meta;
	switchLabel: string;
	topLinks: NavLink[];
	primaryLinks: NavLink[];
	hero: HeroContent;
	salesIntro: SalesIntroContent;
	process: ProcessContent;
	consulting: ConsultingHomeContent;
	chipSensorsPage: ChipSensorsPageContent;
	consultingPage: ConsultingPageContent;
	aboutPage: AboutPageContent;
	contactPage: ContactPageContent;
	glossaryPage: GlossaryPageContent;
	designGuidePage: DesignGuidePageContent;
	footer: FooterContent;
	errorPage: ErrorPageContent;
};
