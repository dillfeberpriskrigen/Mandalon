import type { PageKey } from '$lib/routes';

export type Locale = 'sv' | 'en';

export type Meta = {
	title: string;
	description: string;
};

export type NavLink = {
	label: string;
	page: PageKey;
};

/** Intrinsic image used in content; render with `Image.svelte`. */
export type ContentImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
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
		page: PageKey;
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
		image: ContentImage;
	}[];
};

export const chipSensorsAreaOrder = ['prototypes', 'wireBonding', 'assembly', 'encapsulation'] as const;

export type ChipSensorsAreaKey = (typeof chipSensorsAreaOrder)[number];

type ChipSensorsAreaBase = {
	title: string;
	subtitle: string;
	image: ContentImage;
};

export type ChipSensorsAreas = {
	prototypes: ChipSensorsAreaBase & { paragraphs: [string, string, string] };
	wireBonding: ChipSensorsAreaBase & { paragraphs: [string] };
	assembly: ChipSensorsAreaBase & { paragraphs: [string, string] };
	encapsulation: ChipSensorsAreaBase & { paragraphs: [string, string, string, string, string] };
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
	areas: ChipSensorsAreas;
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
	image: ContentImage;
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

export const glossarySectionOrder = ['asic', 'mems', 'wafer', 'sensors', 'microstructures'] as const;

export type GlossarySectionKey = (typeof glossarySectionOrder)[number];

export type GlossarySection = {
	title: string;
	subtitle: string;
	paragraphs: string[];
	image?: ContentImage;
	caption?: string;
};

export type GlossaryPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	intro: string[];
	introImage: ContentImage;
	faqTitle: string;
	faqs: {
		question: string;
		answer: string;
	}[];
	guide: {
		title: string;
		text: string;
		label: string;
		page: PageKey;
	};
	sections: Record<GlossarySectionKey, GlossarySection>;
};

export type DesignGuidePageContent = {
	meta: Meta;
	title: string;
	intro: string;
	/** Shown above the English article body; empty when the locale needs no notice. */
	languageNote: string;
	articleIntroTitle: string;
	articleIntroBody: string;
	downloadLabel: string;
	embeddedDownloadLabel: string;
};

/** Figure in the shared English design-guide body. */
export type DesignGuideFigure = ContentImage & {
	caption?: string;
	/** When true, wrap the image in a link to `src` (legacy lightbox-style behaviour). */
	linked?: boolean;
};

export type DesignGuideTocItem = {
	label: string;
	children?: DesignGuideTocItem[];
};

export type DesignGuideBlock =
	| { type: 'heading'; level: 2 | 3 | 4; text: string }
	| { type: 'paragraph'; html: string }
	| ({ type: 'figure' } & DesignGuideFigure)
	| { type: 'gallery'; figures: DesignGuideFigure[] }
	| { type: 'toc'; items: DesignGuideTocItem[] };

export type FooterContent = {
	nav: NavLink[];
};

export type ErrorPageContent = {
	title: string;
	notFound: string;
	generic: string;
	homeLabel: string;
};

export type SharedContent = {
	meta: Meta;
	switchLabel: string;
	topLinks: NavLink[];
	primaryLinks: NavLink[];
	footer: FooterContent;
	errorPage: ErrorPageContent;
};

export type HomeContent = {
	hero: HeroContent;
	salesIntro: SalesIntroContent;
	process: ProcessContent;
	consulting: ConsultingHomeContent;
};

export type LocaleContent = SharedContent &
	HomeContent & {
		chipSensorsPage: ChipSensorsPageContent;
		consultingPage: ConsultingPageContent;
		aboutPage: AboutPageContent;
		contactPage: ContactPageContent;
		glossaryPage: GlossaryPageContent;
		designGuidePage: DesignGuidePageContent;
	};
