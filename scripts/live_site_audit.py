#!/usr/bin/env python3
"""
Live-site security/health audit for 11:Eleven Lounge.

Checks the deployed site (not the repo) for the things that can silently
regress after deploy: pages actually up, CSP still present, security.txt
and robots.txt still served, HTTPS enforced, and the TLS cert isn't about
to expire. Exits non-zero if anything meaningful is wrong, so CI can flag it.
"""
import socket
import ssl
import sys
from datetime import datetime, timezone
from urllib.parse import urlparse

import requests

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "https://11elevendallas.com"

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
