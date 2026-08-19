import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import mysql from 'mysql2/promise';
import initSqlJs, { type Database as SqlJsDatabase, type SqlJsStatic } from 'sql.js';
import { analyticsMysqlUrl, analyticsSqlitePath } from './env';
import type { AnalyticsEventInput, AnalyticsSummary, CountRow, DayCountRow, RecentNotFound, RecentRedirect, RecentView, RedirectCountRow } from './types';

type SqlParams = Array<string | number | null>;

type Driver = {
	run: (sql: string, params?: SqlParams) => Promise<void>;
	all: <T>(sql: string, params?: SqlParams) => Promise<T[]>;
};

const SQLITE_SCHEMA = `
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT NOT NULL,
  redirect_to TEXT,
  locale TEXT NOT NULL,
  referrer_host TEXT,
  country TEXT
);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_occurred ON analytics_events(occurred_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON analytics_events(path);
`;

const MYSQL_SCHEMA = `
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  occurred_at VARCHAR(32) NOT NULL,
  event_type VARCHAR(16) NOT NULL,
  path VARCHAR(512) NOT NULL,
  redirect_to VARCHAR(512) NULL,
  locale CHAR(2) NOT NULL,
  referrer_host VARCHAR(255) NULL,
  country CHAR(2) NULL,
  PRIMARY KEY (id),
  KEY idx_analytics_events_type (event_type),
  KEY idx_analytics_events_occurred (occurred_at),
  KEY idx_analytics_events_path (path(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const INSERT_SQL = `INSERT INTO analytics_events (occurred_at, event_type, path, redirect_to, locale, referrer_host, country)
VALUES (?, ?, ?, ?, ?, ?, ?)`;

let driverPromise: Promise<Driver> | null = null;

function toCount(value: unknown): number {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
}

function emptySummary(): AnalyticsSummary {
	return {
		totalViews: 0,
		uniquePaths: 0,
		viewsByDay: [],
		topPages: [],
		topCountries: [],
		topReferrers: [],
		recentViews: [],
		topNotFound: [],
		recentNotFound: [],
		topRedirects: [],
		recentRedirects: []
	};
}

function sqliteFilePath(): string {
	return resolve(process.cwd(), analyticsSqlitePath());
}

function fileMtimeMs(filePath: string): number {
	try {
		return statSync(filePath).mtimeMs;
	} catch {
		return 0;
	}
}

function persistSqlJs(filePath: string, db: SqlJsDatabase): number {
	mkdirSync(dirname(filePath), { recursive: true });
	const tmpPath = `${filePath}.tmp`;
	writeFileSync(tmpPath, Buffer.from(db.export()));
	renameSync(tmpPath, filePath);
	return fileMtimeMs(filePath);
}

async function createSqliteDriver(): Promise<Driver> {
	const filePath = sqliteFilePath();
	mkdirSync(dirname(filePath), { recursive: true });

	const wasmDir = dirname(createRequire(import.meta.url).resolve('sql.js'));
	const SQL: SqlJsStatic = await initSqlJs({
		locateFile: (file) => join(wasmDir, file)
	});

	const existing = existsSync(filePath) ? readFileSync(filePath) : null;
	let db = existing && existing.byteLength > 0 ? new SQL.Database(existing) : new SQL.Database();
	db.exec(SQLITE_SCHEMA);

	let mtimeMs = fileMtimeMs(filePath);
	if (!existing || existing.byteLength === 0) {
		mtimeMs = persistSqlJs(filePath, db);
	}

	function refreshFromDisk() {
		const current = fileMtimeMs(filePath);
		if (current === 0 || current === mtimeMs) {
			return;
		}

		db.close();
		db = new SQL.Database(readFileSync(filePath));
		mtimeMs = current;
	}

	return {
		async run(sql: string, params: SqlParams = []) {
			refreshFromDisk();
			db.run(sql, params);
			mtimeMs = persistSqlJs(filePath, db);
		},
		async all<T>(sql: string, params: SqlParams = []) {
			refreshFromDisk();
			const statement = db.prepare(sql);
			try {
				if (params.length > 0) {
					statement.bind(params);
				}

				const rows: T[] = [];
				while (statement.step()) {
					rows.push(statement.getAsObject() as T);
				}

				return rows;
			} finally {
				statement.free();
			}
		}
	};
}

function parseMysqlConfig(urlString: string): mysql.PoolOptions {
	const parsed = new URL(urlString);
	const database = decodeURIComponent(parsed.pathname.replace(/^\//, '').split('/')[0] ?? '');

	return {
		host: parsed.hostname || '127.0.0.1',
		port: parsed.port ? Number(parsed.port) : 3306,
		user: decodeURIComponent(parsed.username),
		password: decodeURIComponent(parsed.password),
		database,
		waitForConnections: true,
		connectionLimit: 4,
		charset: 'utf8mb4',
		timezone: 'Z'
	};
}

async function createMysqlDriver(urlString: string): Promise<Driver> {
	const pool = mysql.createPool(parseMysqlConfig(urlString));
	await pool.query(MYSQL_SCHEMA);

	return {
		async run(sql: string, params: SqlParams = []) {
			await pool.execute(sql, params);
		},
		async all<T>(sql: string, params: SqlParams = []) {
			const [rows] = await pool.execute(sql, params);
			return rows as T[];
		}
	};
}

async function openDriver(): Promise<Driver> {
	const mysqlUrl = analyticsMysqlUrl();
	if (mysqlUrl) {
		return createMysqlDriver(mysqlUrl);
	}

	return createSqliteDriver();
}

function getDriver(): Promise<Driver> {
	if (!driverPromise) {
		driverPromise = openDriver().catch((error) => {
			driverPromise = null;
			throw error;
		});
	}

	return driverPromise;
}

export async function recordEvent(input: AnalyticsEventInput): Promise<void> {
	const driver = await getDriver();
	await driver.run(INSERT_SQL, [
		new Date().toISOString(),
		input.eventType,
		input.path,
		input.redirectTo ?? null,
		input.locale,
		input.referrerHost ?? null,
		input.country ?? null
	]);
}

export function recordEventLater(input: AnalyticsEventInput): void {
	void recordEvent(input).catch((error) => {
		const detail = error instanceof Error ? error.message : 'unknown error';
		console.error(`analytics: record failed (${detail})`);
	});
}

type RawCount = { label: string; views: number | string };
type RawDay = { day: string; views: number | string };
type RawRedirectCount = { path: string; redirect_to: string; views: number | string };
type RawRecentView = {
	id: number | string;
	occurred_at: string;
	path: string;
	country: string | null;
	referrer_host: string | null;
};
type RawRecentNotFound = {
	id: number | string;
	occurred_at: string;
	path: string;
	country: string | null;
};
type RawRecentRedirect = {
	id: number | string;
	occurred_at: string;
	path: string;
	redirect_to: string;
	country: string | null;
};
type RawTotal = { total: number | string; unique_paths: number | string };

function mapCounts(rows: RawCount[]): CountRow[] {
	return rows.map((row) => ({ label: row.label, views: toCount(row.views) }));
}

export async function getSummary(): Promise<AnalyticsSummary> {
	try {
		const driver = await getDriver();

		const [totals] = await driver.all<RawTotal>(
			`SELECT COUNT(*) AS total, COUNT(DISTINCT path) AS unique_paths
			 FROM analytics_events WHERE event_type = 'pageview'`
		);

		const viewsByDayRows = await driver.all<RawDay>(
			`SELECT substr(occurred_at, 1, 10) AS day, COUNT(*) AS views
			 FROM analytics_events WHERE event_type = 'pageview'
			 GROUP BY substr(occurred_at, 1, 10)
			 ORDER BY day DESC LIMIT 90`
		);

		const topPages = await driver.all<RawCount>(
			`SELECT path AS label, COUNT(*) AS views
			 FROM analytics_events WHERE event_type = 'pageview'
			 GROUP BY path ORDER BY views DESC, path ASC LIMIT 20`
		);

		const topCountries = await driver.all<RawCount>(
			`SELECT country AS label, COUNT(*) AS views
			 FROM analytics_events WHERE event_type = 'pageview' AND country IS NOT NULL
			 GROUP BY country ORDER BY views DESC, country ASC LIMIT 20`
		);

		const topReferrers = await driver.all<RawCount>(
			`SELECT referrer_host AS label, COUNT(*) AS views
			 FROM analytics_events WHERE event_type = 'pageview' AND referrer_host IS NOT NULL
			 GROUP BY referrer_host ORDER BY views DESC, referrer_host ASC LIMIT 20`
		);

		const recentViewsRows = await driver.all<RawRecentView>(
			`SELECT id, occurred_at, path, country, referrer_host
			 FROM analytics_events WHERE event_type = 'pageview'
			 ORDER BY occurred_at DESC, id DESC LIMIT 20`
		);

		const topNotFound = await driver.all<RawCount>(
			`SELECT path AS label, COUNT(*) AS views
			 FROM analytics_events WHERE event_type = 'not_found'
			 GROUP BY path ORDER BY views DESC, path ASC LIMIT 20`
		);

		const recentNotFoundRows = await driver.all<RawRecentNotFound>(
			`SELECT id, occurred_at, path, country
			 FROM analytics_events WHERE event_type = 'not_found'
			 ORDER BY occurred_at DESC, id DESC LIMIT 20`
		);

		const topRedirectsRows = await driver.all<RawRedirectCount>(
			`SELECT path, redirect_to, COUNT(*) AS views
			 FROM analytics_events WHERE event_type = 'redirect'
			 GROUP BY path, redirect_to ORDER BY views DESC, path ASC LIMIT 20`
		);

		const recentRedirectsRows = await driver.all<RawRecentRedirect>(
			`SELECT id, occurred_at, path, redirect_to, country
			 FROM analytics_events WHERE event_type = 'redirect'
			 ORDER BY occurred_at DESC, id DESC LIMIT 20`
		);

		return {
			totalViews: toCount(totals?.total),
			uniquePaths: toCount(totals?.unique_paths),
			viewsByDay: viewsByDayRows.map((row) => ({ day: row.day, views: toCount(row.views) }) satisfies DayCountRow),
			topPages: mapCounts(topPages),
			topCountries: mapCounts(topCountries),
			topReferrers: mapCounts(topReferrers),
			recentViews: recentViewsRows.map(
				(row) =>
					({
						id: toCount(row.id),
						occurredAt: row.occurred_at,
						path: row.path,
						country: row.country,
						referrerHost: row.referrer_host
					}) satisfies RecentView
			),
			topNotFound: mapCounts(topNotFound),
			recentNotFound: recentNotFoundRows.map(
				(row) =>
					({
						id: toCount(row.id),
						occurredAt: row.occurred_at,
						path: row.path,
						country: row.country
					}) satisfies RecentNotFound
			),
			topRedirects: topRedirectsRows.map(
				(row) =>
					({
						path: row.path,
						redirectTo: row.redirect_to,
						views: toCount(row.views)
					}) satisfies RedirectCountRow
			),
			recentRedirects: recentRedirectsRows.map(
				(row) =>
					({
						id: toCount(row.id),
						occurredAt: row.occurred_at,
						path: row.path,
						redirectTo: row.redirect_to,
						country: row.country
					}) satisfies RecentRedirect
			)
		};
	} catch (error) {
		const detail = error instanceof Error ? error.message : 'unknown error';
		console.error(`analytics: summary failed (${detail})`);
		return emptySummary();
	}
}
