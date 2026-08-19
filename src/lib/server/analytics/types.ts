export type AnalyticsEventType = 'pageview' | 'not_found' | 'redirect';

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
};

export type RecentView = {
	id: number;
	occurredAt: string;
	path: string;
	country: string | null;
	referrerHost: string | null;
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
