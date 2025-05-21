#!/usr/bin/env python3
# ---------------------------------------------------------------------
# File: generate_gallery.py
#
# Build a fail‑safe static gallery from a WordPress *uploads* tree.
# Shows lightweight progress as it scans (one line updated in‑place).
# ---------------------------------------------------------------------
import argparse
import os
import re
import shutil
import subprocess
import sys
from html import escape
from pathlib import Path
from typing import List, Tuple, Optional

# ───── configuration ────────────────────────────────────────────────
DEFAULT_UPLOADS_DIR = Path("public/images/uploads")
DEFAULT_OUTPUT_FILE = Path("public/images/gallery.html")
RASTER_FORMATS = {"jpeg", "jpg", "png", "gif", "bmp", "tiff", "webp"}
VECTOR_FORMATS = {"svg"}
GENERIC_STATIC = {
    "css", "js", "html", "htm", "php", "log", "txt", "md", "json",
    "pdf", "mp4", "mp3", "woff", "woff2", "ttf", "otf", "eot",
}
SIZE_RE = re.compile(r"-(\d+)x(\d+)(@2x)?$", re.IGNORECASE)
WEBP_QUALITY = "95"
PLACEHOLDER_ICON = (
    "data:image/svg+xml,"  # small grey square icon
    "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>"
    "<rect width='160' height='160' fill='%23eee'/><path d='M40 40h80v80H40z' fill='%23ccc'/></svg>"
)
PROGRESS_EVERY = 500  # files
# ────────────────────────────────────────────────────────────────────


def parse_args():
    p = argparse.ArgumentParser(description="Generate static gallery HTML")
    p.add_argument("--uploads-dir", type=Path, default=DEFAULT_UPLOADS_DIR,
                   help="Root uploads directory (default: %(default)s)")
    p.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_FILE,
                   help="Output HTML file (default: %(default)s)")
    return p.parse_args()


# ───── utility helpers ──────────────────────────────────────────────

def run_identify(cmd: List[str]) -> Optional[str]:
    try:
        return subprocess.check_output(
            cmd, stderr=subprocess.DEVNULL, text=True, timeout=5
        ).strip()
    except Exception:
        return None


def detect_format(path: Path) -> str:
    if shutil.which("identify"):
        fmt = run_identify(["identify", "-format", "%m", str(path)])
        if fmt:
            return fmt.lower()
    return path.suffix.lstrip(".").lower()


def raster_dims(path: Path) -> Tuple[int, int]:
    m = SIZE_RE.search(path.stem)
    if m:
        return int(m.group(1)), int(m.group(2))
    if shutil.which("identify"):
        out = run_identify(["identify", "-format", "%w %h", str(path)])
        if out:
            try:
                w, h = map(int, out.split())
                return w, h
            except ValueError:
                pass
    return 0, 0


def convert_webp(src: Path, dst: Path):
    if dst.exists():
        return
    try:
        subprocess.check_call([
            "convert", str(src), "-quality", WEBP_QUALITY, str(dst)
        ], stderr=subprocess.DEVNULL)
        print(f"Converted {src.name} → {dst.name}")
    except subprocess.CalledProcessError:
        print(f"⚠️  convert failed for {src}; keeping original", file=sys.stderr)


# ───── categorisation & grouping ────────────────────────────────────

def categorize(path: Path) -> str:
    ext = path.suffix.lstrip(".").lower()
    if ext in RASTER_FORMATS:
        return "image"
    if ext in VECTOR_FORMATS:
        return "vector"
    if ext in GENERIC_STATIC:
        return "static"
    fmt = detect_format(path)
    if fmt in RASTER_FORMATS:
        return "image"
    if fmt in VECTOR_FORMATS:
        return "vector"
    if fmt not in GENERIC_STATIC:
        GENERIC_STATIC.add(fmt)
        print(f"⚠️  Unknown format for {path.name} → treating as static file")
    return "static"


def slug_for(path: Path, cat: str) -> str:
    if cat == "image":
        return SIZE_RE.sub("", path.stem).lower()
    return path.name.lower()


def pick_best(files: List[Path]):
    scored = []
    for p in files:
        cat = categorize(p)
        pixels = raster_dims(p)[0] * raster_dims(p)[1] if cat == "image" else 0
        scored.append((pixels, p.stat().st_size, cat, p))
    scored.sort(key=lambda t: (t[0], t[1]), reverse=True)
    _, _, cat, best = scored[0]

    if cat == "image" and best.suffix.lower() != ".webp":
        webp = best.with_suffix(".webp")
        convert_webp(best, webp)
        if webp.exists():
            best = webp
    return best, cat


def collect_best(root: Path):
    groups = {}
    cats = {}
    count = 0
    for p in root.rglob("*"):
        if not p.is_file():
            continue
        count += 1
        if count % PROGRESS_EVERY == 0:
            print(f"Scanned {count} files…", end="\r", flush=True)
        cat = categorize(p)
        slug = slug_for(p, cat)
        groups.setdefault(slug, []).append(p)
        cats[slug] = cat
    print(f"Scanned {count} files. Building gallery…          ")
    chosen = []
    for slug, files in groups.items():
        best, cat = pick_best(files)
        chosen.append((best, cat))
    return sorted(chosen, key=lambda t: t[0])


# ───── HTML output ─────────────────────────────────────────────────

def build_html(items: List[Tuple[Path, str]], uploads_root: Path, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    rel = lambda p: str(p.relative_to(uploads_root.parent)).replace(os.sep, "/")

    with dest.open("w", encoding="utf-8") as f:
        f.write("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\" />")
        f.write("<title>Gallery</title><style>")
        f.write("body{margin:0;font-family:system-ui,sans-serif;background:#fafafa}")
        f.write(".grid{display:grid;gap:.5rem;padding:.5rem;grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}")
        f.write(".grid a{display:block;border:1px solid #ddd;background:#fff;padding:.25rem;border-radius:6px;transition:box-shadow .2s}")
        f.write(".grid a:hover{box-shadow:0 0 8px rgba(0,0,0,.2)}")
        f.write(".grid img{width:100%;height:160px;object-fit:cover;display:block}")
        f.write(".caption{font-size:.75rem;text-align:center;padding:.25rem 0;color:#333;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}")
        f.write("</style></head><body><div class=\"grid\">\n")

        for p, cat in items:
            name = escape(p.name)
            href = rel(p)
            src = href if cat != "static" else PLACEHOLDER_ICON
            f.write(
                f"<a href=\"{href}\" target=\"_blank\"><img src=\"{src}\" loading=\"lazy\" alt=\"{name}\" /><div class=\"caption\">{name}</div></a>\n"
            )

        f.write("</div></body></html>")
    print(f"Wrote {dest} with {len(items)} items.")


# ───── main ────────────────────────────────────────────────────────

def main():
    args = parse_args()
    uploads = args.uploads_dir.resolve()
    output = args.output.resolve()

    if not shutil.which("convert") or not shutil.which("identify"):
        sys.exit("ImageMagick 'convert' & 'identify' required in PATH.")

    items = collect_best(uploads)
    build_html(items, uploads, output)


if __name__ == "__main__":
    main()
