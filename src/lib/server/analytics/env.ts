import { env } from '$env/dynamic/private';

export function readAnalyticsEnv(name: string): string | undefined {
	const value = env[name] ?? process.env[name];
	return value?.trim() ? value.trim() : undefined;
}

export function analyticsSqlitePath(): string {
	return readAnalyticsEnv('ANALYTICS_SQLITE_PATH') ?? './data/analytics.sqlite';
}

export function analyticsMysqlUrl(): string | undefined {
	const url = readAnalyticsEnv('ANALYTICS_DATABASE_URL');
	if (!url) {
		return undefined;
	}

	if (url.startsWith('mysql://') || url.startsWith('mariadb://')) {
		return url;
	}

	return undefined;
}
