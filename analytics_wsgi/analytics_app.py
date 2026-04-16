import json
import os
from datetime import datetime


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_STORAGE_PATH = os.path.join(BASE_DIR, "var", "analytics", "pageviews.ndjson")
STORAGE_PATH = os.environ.get("ANALYTICS_STORAGE_PATH", DEFAULT_STORAGE_PATH)
ALLOWED_ORIGIN = os.environ.get("ANALYTICS_ALLOWED_ORIGIN", "*")


def json_response(start_response, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    headers = [
        ("Content-Type", "application/json; charset=utf-8"),
        ("Content-Length", str(len(body))),
        ("Cache-Control", "no-store"),
        ("Access-Control-Allow-Origin", ALLOWED_ORIGIN),
        ("Access-Control-Allow-Headers", "Content-Type"),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
    ]
    start_response(status, headers)
    return [body]


def read_body(environ):
    try:
        length = int(environ.get("CONTENT_LENGTH") or "0")
    except (TypeError, ValueError):
        length = 0
    return environ["wsgi.input"].read(length)


def normalize_text(value, max_length):
    if not isinstance(value, str):
        return None
    value = value.strip()
    if not value:
        return None
    return value[:max_length]


def normalize_path(value):
    value = normalize_text(value, 512)
    if not value or not value.startswith("/"):
        return "/"
    return value


def infer_locale(pathname):
    if pathname == "/en" or pathname.startswith("/en/"):
        return "en"
    return "sv"


def extract_geo(environ):
    country = (
        environ.get("HTTP_X_VERCEL_IP_COUNTRY")
        or environ.get("HTTP_CF_IPCOUNTRY")
        or environ.get("HTTP_FLY_COUNTRY")
        or environ.get("HTTP_X_COUNTRY")
    )
    region = (
        environ.get("HTTP_X_VERCEL_IP_COUNTRY_REGION")
        or environ.get("HTTP_X_REGION")
        or environ.get("HTTP_FLY_REGION")
    )
    city = (
        environ.get("HTTP_X_VERCEL_IP_CITY")
        or environ.get("HTTP_X_CITY")
        or environ.get("HTTP_FLY_CITY")
    )

    source = None
    if environ.get("HTTP_X_VERCEL_IP_COUNTRY") or environ.get("HTTP_X_VERCEL_IP_CITY"):
        source = "vercel"
    elif environ.get("HTTP_CF_IPCOUNTRY"):
        source = "cloudflare"
    elif environ.get("HTTP_FLY_COUNTRY") or environ.get("HTTP_FLY_CITY"):
        source = "fly"
    elif country or region or city:
        source = "proxy-header"

    return {
        "country": country,
        "region": region,
        "city": city,
        "source": source,
    }


def ensure_storage_dir():
    directory = os.path.dirname(STORAGE_PATH)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)


def append_pageview(pageview):
    ensure_storage_dir()
    with open(STORAGE_PATH, "a", encoding="utf-8") as handle:
        handle.write(json.dumps(pageview, ensure_ascii=False) + "\n")


def read_pageviews():
    if not os.path.exists(STORAGE_PATH):
        return []

    rows = []
    with open(STORAGE_PATH, "r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def build_summary():
    views = read_pageviews()
    by_path = {}
    by_country = {}

    for view in views:
        path = view.get("path") or "/"
        by_path[path] = by_path.get(path, 0) + 1

        country = ((view.get("geo") or {}).get("country"))
        if country:
            by_country[country] = by_country.get(country, 0) + 1

    top_pages = [
        {"path": path, "views": count}
        for path, count in sorted(by_path.items(), key=lambda item: (-item[1], item[0]))[:20]
    ]
    top_countries = [
        {"country": country, "views": count}
        for country, count in sorted(by_country.items(), key=lambda item: (-item[1], item[0]))[:20]
    ]

    return {
        "totalViews": len(views),
        "uniquePaths": len(by_path),
        "topPages": top_pages,
        "topCountries": top_countries,
        "recentViews": list(reversed(views[-20:])),
    }


def create_pageview(payload, environ):
    path = normalize_path(payload.get("path"))
    return {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "path": path,
        "search": normalize_text(payload.get("search"), 512),
        "url": normalize_text(payload.get("url"), 2048) or path,
        "title": normalize_text(payload.get("title"), 300),
        "referrer": normalize_text(payload.get("referrer"), 2048),
        "locale": infer_locale(path),
        "geo": extract_geo(environ),
    }


def handle_pageview(environ, start_response):
    try:
        payload = json.loads(read_body(environ).decode("utf-8") or "{}")
    except (ValueError, UnicodeDecodeError):
        return json_response(start_response, "400 Bad Request", {"ok": False, "error": "Invalid JSON body"})

    pageview = create_pageview(payload, environ)
    append_pageview(pageview)
    return json_response(start_response, "200 OK", {"ok": True})


def handle_stats(start_response):
    return json_response(start_response, "200 OK", build_summary())


def application(environ, start_response):
    method = environ.get("REQUEST_METHOD", "GET").upper()
    path = environ.get("PATH_INFO", "") or "/"

    if method == "OPTIONS":
        return json_response(start_response, "200 OK", {"ok": True})

    if path == "/health":
        return json_response(start_response, "200 OK", {"ok": True})

    if path == "/pageview" and method == "POST":
        return handle_pageview(environ, start_response)

    if path == "/stats" and method == "GET":
        return handle_stats(start_response)

    if path == "/" and method == "GET":
        return json_response(
            start_response,
            "200 OK",
            {
                "service": "analytics",
                "endpoints": ["/health", "/pageview", "/stats"],
                "python": environ.get("SERVER_SOFTWARE"),
            },
        )

    return json_response(start_response, "404 Not Found", {"ok": False, "error": "Not found"})
