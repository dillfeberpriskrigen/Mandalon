export type AnalyticsEventType = 'pageview' | 'not_found' | 'redirect';

/** Stored in `referrer_host` when the previous page was on this site. */
export const INTERNAL_REFERRER_HOST = '(internal)';

export type AnalyticsEventInput = {
	eventType: AnalyticsEventType;
	path: string;
	redirectTo?: string | null;
	locale: 'sv' | 'en';
	referrerHost?: string | null;
	country?: string | null;
};

export type CountRow = {
	label: string;
	views: number;
};

export type RedirectCountRow = {
	path: string;
	redirectTo: string;
	views: number;
};

export type DayCountRow = {
	day: string;
	views: number;
	visits: number;
};

export type RecentView = {
	id: number;
	occurredAt: string;
	path: string;
	country: string | null;
	referrerHost: string | null;
	isInternal: boolean;
};

export type RecentNotFound = {
	id: number;
	occurredAt: string;
	path: string;
	country: string | null;
};

export type RecentRedirect = {
	id: number;
	occurredAt: string;
	path: string;
	redirectTo: string;
	country: string | null;
};

export type AnalyticsSummary = {
	totalViews: number;
	estimatedVisits: number;
	uniquePaths: number;
	viewsByDay: DayCountRow[];
	topPages: CountRow[];
	topCountries: CountRow[];
	topReferrers: CountRow[];
	recentViews: RecentView[];
	topNotFound: CountRow[];
	recentNotFound: RecentNotFound[];
	topRedirects: RedirectCountRow[];
	recentRedirects: RecentRedirect[];
};
