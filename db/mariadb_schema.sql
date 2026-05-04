CREATE DATABASE IF NOT EXISTS mandalon_analytics
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mandalon_analytics;

CREATE TABLE IF NOT EXISTS pageviews (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  occurred_at DATETIME(6) NOT NULL,
  path VARCHAR(512) NOT NULL,
  query_string VARCHAR(512) NULL,
  url VARCHAR(2048) NOT NULL,
  page_title VARCHAR(300) NULL,
  referrer VARCHAR(2048) NULL,
  locale CHAR(2) NOT NULL,
  geo_country VARCHAR(64) NULL,
  geo_region VARCHAR(128) NULL,
  geo_city VARCHAR(128) NULL,
  geo_source VARCHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_pageviews_occurred_at (occurred_at),
  KEY idx_pageviews_path (path(191)),
  KEY idx_pageviews_locale (locale),
  KEY idx_pageviews_geo_country (geo_country)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE OR REPLACE VIEW pageview_summary_by_path AS
SELECT
  path,
  locale,
  COUNT(*) AS total_views,
  MIN(occurred_at) AS first_seen_at,
  MAX(occurred_at) AS last_seen_at
FROM pageviews
GROUP BY path, locale;

CREATE OR REPLACE VIEW pageview_summary_by_country AS
SELECT
  COALESCE(geo_country, 'unknown') AS geo_country,
  COUNT(*) AS total_views,
  MIN(occurred_at) AS first_seen_at,
  MAX(occurred_at) AS last_seen_at
FROM pageviews
GROUP BY COALESCE(geo_country, 'unknown');
