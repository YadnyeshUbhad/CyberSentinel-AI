import re
from urllib.parse import urlparse

SUSPICIOUS_KEYWORDS = [
    "login", "verify", "secure", "bank", "update", "paypal", "signin",
    "free", "bonus", "gift", "apple", "chase", "netflix", "refund",
    "download", "installer", "patch", "crack", "hacked", "defaced",
    "anonymous", "coinbase", "support", "billing", "recovery"
]

SUSPICIOUS_TLDS = [
    "xyz", "top", "club", "info", "loan", "bid", "gq", "cf", "tk",
    "ml", "ga", "work", "click", "download", "online", "site"
]

IP_PATTERN = re.compile(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$")

def extract_url_features(url: str) -> dict:
    url = url.strip()
    try:
        parsed = urlparse(url)
        if not parsed.scheme:
            parsed = urlparse("http://" + url)
    except Exception:
        parsed = urlparse("")
        
    domain = parsed.netloc or ""
    
    url_length = len(url)
    domain_length = len(domain)
    qty_dots = url.count(".")
    qty_digits = sum(c.isdigit() for c in url)
    qty_hyphens = url.count("-")
    
    domain_parts = domain.split(".")
    qty_subdomains = max(0, len(domain_parts) - 2) if len(domain_parts) > 1 else 0
    has_https = 1 if url.lower().startswith("https://") else 0
    
    domain_only = domain.split(":")[0] if ":" in domain else domain
    has_ip = 1 if IP_PATTERN.match(domain_only) else 0
    qty_suspicious_keywords = sum(1 for kw in SUSPICIOUS_KEYWORDS if kw in url.lower())
    
    has_suspicious_tld = 0
    if len(domain_parts) > 1:
        tld = domain_parts[-1].lower()
        if tld in SUSPICIOUS_TLDS:
            has_suspicious_tld = 1
            
    return {
        "url_length": url_length,
        "domain_length": domain_length,
        "qty_dots": qty_dots,
        "qty_digits": qty_digits,
        "qty_hyphens": qty_hyphens,
        "qty_subdomains": qty_subdomains,
        "has_https": has_https,
        "has_ip": has_ip,
        "qty_suspicious_keywords": qty_suspicious_keywords,
        "has_suspicious_tld": has_suspicious_tld
    }

def get_feature_names():
    return [
        "url_length",
        "domain_length",
        "qty_dots",
        "qty_digits",
        "qty_hyphens",
        "qty_subdomains",
        "has_https",
        "has_ip",
        "qty_suspicious_keywords",
        "has_suspicious_tld"
    ]
