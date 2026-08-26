#!/usr/bin/env python3
"""
Live-site security/health audit for 11:Eleven Lounge.

Checks the deployed site (not the repo) for the things that can silently
regress after deploy: pages actually up, CSP still present, security.txt
and robots.txt still served, HTTPS enforced, and the TLS cert isn't about
to expire. Also covers the backend's access-control boundary directly:
the staff API must reject anonymous requests, and the workers.dev preview
URL must stay disabled. Exits non-zero if anything meaningful is wrong, so
CI can flag it.
"""
import socket
import ssl
import sys
from datetime import datetime, timezone
from urllib.parse import urlparse

import requests

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "https://11elevendallas.com"
WORKERS_DEV_URL = sys.argv[2] if len(sys.argv) > 2 else ""

# Response headers that must be present with these exact (case-insensitive)
# values on every response, wherever the header is set (Cloudflare edge or
# the Worker itself) — a regression here weakens transport/content hardening
# without touching a single HTML file, so it can't be caught by the CSP
# meta-tag check alone.
REQUIRED_HEADERS = {
    "strict-transport-security": None,  # presence only; max-age value is Cloudflare-dashboard config
    "x-content-type-options": "nosniff",
}

# path -> whether it must contain a CSP meta tag
HTML_PAGES = {
    "/": True,
    "/support.html": True,
    "/privacy.html": True,
    "/terms.html": True,
}
TEXT_FILES = {
    "/robots.txt": "Sitemap:",
    "/.well-known/security.txt": "Contact:",
}
CERT_WARN_DAYS = 30

failures = []
warnings = []


def check_page(path, needs_csp):
    url = BASE_URL.rstrip("/") + path
    try:
        r = requests.get(url, timeout=15)
    except requests.RequestException as e:
        failures.append(f"{path}: request failed ({e})")
        return
    if r.status_code != 200:
        failures.append(f"{path}: expected 200, got {r.status_code}")
        return
    if needs_csp and 'http-equiv="Content-Security-Policy"' not in r.text:
        failures.append(f"{path}: missing Content-Security-Policy meta tag")
    print(f"  OK  {path}  (200{', CSP present' if needs_csp else ''})")


def check_text_file(path, expected_substring):
    url = BASE_URL.rstrip("/") + path
    try:
        r = requests.get(url, timeout=15)
    except requests.RequestException as e:
        failures.append(f"{path}: request failed ({e})")
        return
    if r.status_code != 200:
        failures.append(f"{path}: expected 200, got {r.status_code}")
        return
    if expected_substring not in r.text:
        failures.append(f"{path}: served, but missing expected content ({expected_substring!r})")
        return
    print(f"  OK  {path}  (200, content looks right)")


def check_https_enforced():
    parsed = urlparse(BASE_URL)
    http_url = f"http://{parsed.netloc}/"
    try:
        r = requests.get(http_url, timeout=15, allow_redirects=True)
    except requests.RequestException as e:
        warnings.append(f"HTTP->HTTPS check failed to run ({e})")
        return
    if not r.url.startswith("https://"):
        failures.append(f"http:// did not redirect to https:// (ended at {r.url})")
        return
    print(f"  OK  http:// redirects to https://")


def check_cert_expiry():
    parsed = urlparse(BASE_URL)
    host = parsed.netloc
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((host, 443), timeout=15) as sock:
            with ctx.wrap_socket(sock, server_hostname=host) as ssock:
                cert = ssock.getpeercert()
        not_after = datetime.strptime(cert["notAfter"], "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
        days_left = (not_after - datetime.now(timezone.utc)).days
        if days_left < 0:
            failures.append(f"TLS certificate EXPIRED {-days_left} days ago")
        elif days_left < CERT_WARN_DAYS:
            warnings.append(f"TLS certificate expires in {days_left} days ({not_after.date()})")
        else:
            print(f"  OK  TLS certificate valid for {days_left} more days ({not_after.date()})")
    except Exception as e:
        warnings.append(f"could not check TLS certificate ({e})")


def check_response_headers():
    url = BASE_URL.rstrip("/") + "/"
    try:
        r = requests.get(url, timeout=15)
    except requests.RequestException as e:
        warnings.append(f"header check failed to run ({e})")
        return
    headers_lower = {k.lower(): v for k, v in r.headers.items()}
    for name, expected in REQUIRED_HEADERS.items():
        actual = headers_lower.get(name)
        if actual is None:
            failures.append(f"missing response header: {name}")
        elif expected is not None and expected.lower() not in actual.lower():
            failures.append(f"{name}: expected to contain {expected!r}, got {actual!r}")
        else:
            print(f"  OK  {name}: {actual}")


def check_staff_api_requires_auth():
    """/api/me must never return a 200 with real staff data to an anonymous
    caller — this is the exact boundary Cloudflare Access enforces, and a
    regression here (e.g. a route added outside Access, or Access disabled
    on the app) would otherwise leak staff identity/roster data silently."""
    url = BASE_URL.rstrip("/") + "/api/me"
    try:
        r = requests.get(url, timeout=15, allow_redirects=False)
    except requests.RequestException as e:
        warnings.append(f"/api/me check failed to run ({e})")
        return
    if r.status_code == 200:
        failures.append(f"/api/me returned 200 to an anonymous request (expected a login challenge/redirect or 401/403) — Access may be misconfigured or disabled")
        return
    print(f"  OK  /api/me rejects anonymous requests ({r.status_code})")


def check_workers_dev_disabled():
    """The workers.dev preview URL runs identical Worker code but Access
    policies bind to the custom-domain routes, not workers.dev — if it's
    ever re-enabled (e.g. after a wrangler.toml change), the staff API
    becomes reachable with no login at all. Skipped if no URL is configured."""
    if not WORKERS_DEV_URL:
        warnings.append("workers.dev exposure check skipped (no URL configured — pass as 2nd script argument)")
        return
    try:
        r = requests.get(WORKERS_DEV_URL.rstrip("/") + "/me", timeout=15, allow_redirects=False)
    except requests.RequestException:
        print("  OK  workers.dev preview URL is unreachable")
        return
    failures.append(f"workers.dev preview URL is still reachable (got {r.status_code}) — disable it in Workers & Pages > Settings > Domains & Routes")


def main():
    print(f"Auditing {BASE_URL}\n")

    print("Pages:")
    for path, needs_csp in HTML_PAGES.items():
        check_page(path, needs_csp)

    print("\nText files:")
    for path, expected in TEXT_FILES.items():
        check_text_file(path, expected)

    print("\nTransport:")
    check_https_enforced()
    check_cert_expiry()

    print("\nResponse headers:")
    check_response_headers()

    print("\nBackend access control:")
    check_staff_api_requires_auth()
    check_workers_dev_disabled()

    print()
    if warnings:
        print("WARNINGS:")
        for w in warnings:
            print(f"  - {w}")
        print()

    if failures:
        print("FAILURES:")
        for f in failures:
            print(f"  - {f}")
        print(f"\n{len(failures)} failure(s), {len(warnings)} warning(s).")
        sys.exit(1)

    print(f"All checks passed ({len(warnings)} warning(s)).")
    sys.exit(0)


if __name__ == "__main__":
    main()
