# Analytics WSGI App

Liten Python 3.8-kompatibel WSGI-app for pageview-statistik till den statiska Svelte-sajten.

## Endpoints

- `POST /pageview`
- `GET /stats`
- `GET /health`

## Local development

Starta appen lokalt med:

```bash
python3 analytics_wsgi/run_dev.py
```

## Miljövariabler

- `ANALYTICS_STORAGE_PATH`
  Standard: `analytics_wsgi/var/analytics/pageviews.ndjson`
- `ANALYTICS_ALLOWED_ORIGIN`
  Standard: `*`

## MariaDB

Om ni vill lagra pageviews i MariaDB i stället för `ndjson` finns ett färdigt schema i:

- [mariadb_schema.sql](/home/zahpow/dillfeber/Mandalon/analytics_wsgi/mariadb_schema.sql)

Schemat matchar den data appen redan samlar in:

- tidpunkt
- sida/path
- query string
- full URL
- titel
- referrer
- locale
- ungefärlig geo: land, region, stad, källa

Föreslagna databasinställningar:

- database: `mandalon_analytics`
- charset: `utf8mb4`
- collation: `utf8mb4_unicode_ci`
- engine: `InnoDB`
- timezone: `UTC`

Exempel på databas-användare:

```sql
CREATE USER IF NOT EXISTS 'mandalon_analytics'@'localhost' IDENTIFIED BY 'choose-a-long-random-password';
GRANT SELECT, INSERT, UPDATE, DELETE ON mandalon_analytics.* TO 'mandalon_analytics'@'localhost';
FLUSH PRIVILEGES;
```

Exempel på anslutningsinställningar att ha redo när Python-appen senare ska läsa från databasen:

```bash
ANALYTICS_DB_HOST=127.0.0.1
ANALYTICS_DB_PORT=3306
ANALYTICS_DB_NAME=mandalon_analytics
ANALYTICS_DB_USER=mandalon_analytics
ANALYTICS_DB_PASSWORD=choose-a-long-random-password
ANALYTICS_DB_CHARSET=utf8mb4
```

Just nu använder appen fortfarande filbaserad lagring, så de här databasinställningarna är dokumenterade men ännu inte inkopplade i koden.

## Frontend-konfiguration

Svelte-sajten använder:

- `PUBLIC_ENABLE_ANALYTICS=true`
- `PUBLIC_ANALYTICS_BASE_URL=https://din-domän-eller-subdomän/analytics`

Om Python-appen ligger på samma origin bakom t.ex. `/analytics` räcker det att sätta:

```bash
PUBLIC_ENABLE_ANALYTICS=true
PUBLIC_ANALYTICS_BASE_URL=/analytics
```

## Passenger

Den här mappen innehåller `passenger_wsgi.py`, så den går att använda som separat Python-app i Passenger.
Se till att routa appens web root till den här mappen eller en subdomän som pekar hit.
