"""WCAG contrast check for the site's colour tokens.

Run: python scripts/contrast.py
Every pairing the site uses is listed in PAIRS with the minimum it needs:
4.5 for normal text, 3.0 for large text (24px+, or 18.5px+ bold) and UI parts.
"""
import sys

TOKENS = {
    "bg": "#FAFAF8",
    "tint": "#F4F4F2",
    "line": "#D0CFCD",
    "surface": "#FFFFFF",
    "ink": "#0C0E58",
    "ink-hover": "#090A42",
    "text": "#333333",
    "text-muted": "#555555",
    "text-subtle": "#6B6B6B",
    "accent": "#FB3D03",
    "accent-hover": "#D43302",
    "accent-text": "#CF3102",
    "accent-tint": "#FFF4F0",
    "success": "#0C7A3D",
    "on-dark": "#FAFAF8",
    # 75% warm white over navy, flattened, for secondary text in the footer
    "on-dark-muted": "#C2C3D3",
}

# (foreground, background, minimum ratio, where it is used)
PAIRS = [
    ("ink", "bg", 4.5, "headings, nav, labels on the page"),
    ("ink", "tint", 4.5, "headings on tinted sections"),
    ("ink", "surface", 4.5, "input text"),
    ("text", "bg", 4.5, "body copy"),
    ("text", "tint", 4.5, "body copy on tinted sections"),
    ("text-muted", "bg", 4.5, "secondary copy"),
    ("text-muted", "tint", 4.5, "secondary copy on tint"),
    ("text-muted", "surface", 4.5, "secondary copy in cards/inputs"),
    ("text-subtle", "bg", 4.5, "captions, hints"),
    ("text-subtle", "tint", 4.5, "captions on tint"),
    ("text-subtle", "surface", 4.5, "placeholders, hints in inputs"),
    ("accent-text", "bg", 4.5, "small accent text and links"),
    ("accent-text", "tint", 4.5, "small accent text on tint"),
    ("accent-text", "surface", 4.5, "small accent text on white"),
    ("accent-text", "accent-tint", 4.5, "notice text on accent tint"),
    # Accepted: the original brand orange is kept by choice. Text on it is
    # 15px semibold, which needs 4.5:1 to pass; this pairing is 3.48:1.
    ("on-dark", "accent", 4.5, "primary button label (ACCEPTED: brand orange)"),
    ("on-dark", "accent-hover", 4.5, "primary button label, hover"),
    ("on-dark", "ink", 4.5, "dark button label, footer headings"),
    ("on-dark", "ink-hover", 4.5, "dark button label, hover"),
    ("on-dark-muted", "ink", 4.5, "footer secondary text"),
    ("accent", "bg", 3.0, "large accent elements, focus outlines"),
    ("accent", "tint", 3.0, "large accent elements on tint"),
    ("success", "bg", 4.5, "'included' / success text"),
    ("success", "surface", 4.5, "success text on white"),
    ("ink", "line", 3.0, "selected-state borders vs normal border"),
]


def lum(hex_):
    h = hex_.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def ratio(a, b):
    hi, lo = sorted([lum(a), lum(b)], reverse=True)
    return (hi + 0.05) / (lo + 0.05)


failed = 0
print(f"{'foreground':15} {'background':13} {'ratio':>6}  {'need':>4}  result  used for")
for fg, bg, need, use in PAIRS:
    r = ratio(TOKENS[fg], TOKENS[bg])
    ok = r >= need
    accepted = "ACCEPTED" in use
    failed += not ok and not accepted
    status = "PASS" if ok else ("KNOWN" if accepted else "FAIL")
    print(f"{fg:15} {bg:13} {r:6.2f}  {need:4.1f}  {status:6}  {use}")
sys.exit(1 if failed else 0)
