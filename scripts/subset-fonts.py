"""Subset self-hosted Roboto files to Latin and common technical glyphs."""

from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = ROOT / "static" / "fonts"

# Latin, Latin Extended, punctuation, and letterlike symbols used in
# Swedish/English copy and the design guide (µm, Ω, en dash).
UNICODE_RANGES = [
    (0x0000, 0x00FF),
    (0x0100, 0x024F),
    (0x02BB, 0x02BC),
    (0x1E00, 0x1EFF),
    (0x2010, 0x2027),
    (0x20A0, 0x20CF),
    (0x2100, 0x214F),
]

EXTRA_CODEPOINTS = {
    0x0131,
    0x0152,
    0x0153,
    0x02C6,
    0x02DA,
    0x02DC,
    0x0304,
    0x0308,
    0x0329,
    0x03A9,
    0x03BC,
    0x2122,
    0x2126,
    0x2212,
    0x2215,
    0xFEFF,
    0xFFFD,
}

FILES = [
    "Roboto-VariableFont_wdth,wght.woff2",
    "Roboto-Italic-VariableFont_wdth,wght.woff2",
    "RobotoCondensed-VariableFont_wght.woff2",
    "RobotoCondensed-Italic-VariableFont_wght.woff2",
]


def unicodes() -> list[int]:
    values = set(EXTRA_CODEPOINTS)
    for start, end in UNICODE_RANGES:
        values.update(range(start, end + 1))
    return sorted(values)


def subset_font(path: Path) -> None:
    font = TTFont(path)
    for table in ("HVAR", "VVAR", "MVAR"):
        if table in font:
            del font[table]

    options = Options()
    options.layout_features = ["*"]
    options.flavor = "woff2"
    options.desubroutinize = True
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=unicodes())
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(path)


def main() -> None:
    for name in FILES:
        path = FONT_DIR / name
        before = path.stat().st_size
        subset_font(path)
        after = path.stat().st_size
        print(f"{name}: {before} -> {after} bytes")


if __name__ == "__main__":
    main()
