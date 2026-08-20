import type { Locale, LocaleContent } from './types';
import { aboutPage } from './pages/about';
import { consultingPage } from './pages/consulting';
import { contactPage } from './pages/contact';
import { designGuidePage } from './pages/designGuide';
import { home } from './pages/home';
import { chipSensorsPage } from './pages/packaging';
import { privacyPage } from './pages/privacy';
import { shared } from './pages/shared';

export type { Locale, LocaleContent } from './types';

export const defaultLocale: Locale = 'sv';

export const locales: readonly Locale[] = ['sv', 'en'];

export const siteContent = {
	sv: {
		...shared.sv,
		...home.sv,
		chipSensorsPage: chipSensorsPage.sv,
		consultingPage: consultingPage.sv,
		aboutPage: aboutPage.sv,
		contactPage: contactPage.sv,
		designGuidePage: designGuidePage.sv,
		privacyPage: privacyPage.sv
	},
	en: {
		...shared.en,
		...home.en,
		chipSensorsPage: chipSensorsPage.en,
		consultingPage: consultingPage.en,
		aboutPage: aboutPage.en,
		contactPage: contactPage.en,
		designGuidePage: designGuidePage.en,
		privacyPage: privacyPage.en
	}
} satisfies Record<Locale, LocaleContent>;
