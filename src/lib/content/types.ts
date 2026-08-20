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

export type ContactCtaContent = {
	title: string;
	text: string;
	label: string;
	page: PageKey;
};

/** Intrinsic image used in content; render with `Image.svelte`. */
export type ContentImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
	srcset?: string;
};

export type HeroContent = {
	title: string;
	copy: string;
};

export type SalesIntroContent = {
	title: string;
	paragraphs: string[];
	image: ContentImage;
	actions: NavLink[];
};

export type ProcessContent = {
	title: string;
	steps: {
		title: string;
		text: string;
	}[];
};

export const consultingServiceIds = ['engineering', 'chip-design', 'process-development', 'project-management'] as const;

export type ConsultingServiceId = (typeof consultingServiceIds)[number];

export type ConsultingHomeContent = {
	title: string;
	intro: string;
	labels: {
		previous: string;
		next: string;
		goToSlide: string;
	};
	features: {
		title: string;
		text: string;
		image: ContentImage;
		page: PageKey;
		section?: ConsultingServiceId;
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
	wireBonding: ChipSensorsAreaBase & { paragraphs: [string, string] };
	assembly: ChipSensorsAreaBase & { paragraphs: [string, string] };
	encapsulation: ChipSensorsAreaBase & { paragraphs: [string, string, string, string, string] };
};

export type ChipSensorsPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	methods: {
		dieBonding: {
			title: string;
			paragraphs: [string, string, string];
		};
		wireBonding: {
			title: string;
			paragraphs: [string, string, string];
		};
	};
	capabilitiesTitle: string;
	capabilitiesPresentation: string;
	capabilities: {
		name: string;
		description: string;
	}[];
	areas: ChipSensorsAreas;
	contactPrompt: {
		label: string;
		page: PageKey;
	};
	contactCta: ContactCtaContent;
};

export type ConsultingService = {
	title: string;
	subtitle: string;
	paragraphs: [string, string];
	points: [string, string, string];
	image: ContentImage;
	relatedLink?: {
		label: string;
		page: PageKey;
	};
};

export type ConsultingPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	services: Record<ConsultingServiceId, ConsultingService>;
	contactCta: ContactCtaContent;
};

export type AboutPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	introTitle: string;
	intro: string[];
	introImage: ContentImage;
	storyTitle: string;
	story: string;
	certificationTitle: string;
	certification: string;
	certificationNote: string;
	certificationPdf: {
		href: string;
		label: string;
	};
	referencesTitle: string;
	referencesLead: string;
	referencesHeading: string;
	researchProjectsHeading: string;
	references: string[];
	researchProjects: {
		title: string;
		href?: string;
	}[];
	researchProfile: {
		label: string;
		href: string;
	};
	contactCta: ContactCtaContent;
};

export type ContactPerson = {
	name: string;
	role?: string;
	image?: ContentImage;
	phone?: string;
	phoneHref?: string;
	reason: string;
	bio?: string;
};

export type ContactAddress = {
	company: string;
	street: string;
	postalCode: string;
	city: string;
	country?: string;
};

export type ContactFormContent = {
	title: string;
	intro: string;
	nameLabel: string;
	emailFieldLabel: string;
	messageLabel: string;
	submitLabel: string;
	sendingLabel: string;
	successTitle: string;
	success: string;
	successUrgent: string;
	sendFailed: string;
	rateLimited: string;
	leaveWarning: string;
	privacy: {
		before: string;
		link: string;
		after: string;
	};
	errors: {
		name: string;
		email: string;
		message: string;
	};
};

export type ContactPageContent = {
	meta: Meta;
	title: string;
	lead: string;
	emailTitle: string;
	emailIntro: string;
	emailLabel: string;
	email: string;
	emailHref: string;
	urgentNote: string;
	form: ContactFormContent;
	people: ContactPerson[];
	address: ContactAddress;
	orgNumberLabel: string;
	orgNumber: string;
	locationTitle: string;
	visitNote: string;
	shippingNote: string;
	mapTitle: string;
	mapEnableLabel: string;
};

export type ContactFormActionData = {
	success?: boolean;
	sendFailed?: boolean;
	rateLimited?: boolean;
	values?: {
		name: string;
		email: string;
		message: string;
	};
	errors?: {
		name?: string;
		email?: string;
		message?: string;
	};
} | null;

export type PrivacyPageContent = {
	meta: Meta;
	title: string;
	/** Shown above the Swedish policy body; empty when the locale needs no notice. */
	languageNote: string;
	documentMeta: string[];
	sections: {
		title: string;
		paragraphs: string[];
	}[];
	contact: {
		title: string;
		addressLabel: string;
		addressLines: string[];
		emailLabel: string;
		email: string;
	};
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

/** Figure in the shared English design-guide body. Images link to `src` as a full-page load. */
export type DesignGuideFigure = ContentImage & {
	caption?: string;
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
	navTitle: string;
	nav: NavLink[];
	certificationLabel: string;
};

export type ErrorPageContent = {
	title: string;
	notFound: string;
	generic: string;
	homeLabel: string;
};

export type SharedContent = {
	meta: Meta;
	languageSwitchLabel: string;
	themeToggleLabel: string;
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
		designGuidePage: DesignGuidePageContent;
		privacyPage: PrivacyPageContent;
	};
