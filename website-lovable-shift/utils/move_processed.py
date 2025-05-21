#!/usr/bin/env python3
"""
Move every original image whose renamed counterpart already exists
into a `processed/` sub‑folder.

Mapping file:  ~/cursordemo/seaview-site/website-lovable-shift/utils/name-maping.txt
Images dir:    /Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift/public/images

Logic
─────
• For each line  <orig_stem><TAB><new_stem>
    1. Locate *any* file in images/ whose stem is <orig_stem>  (e.g. .webp, .jpg …)
    2. Locate *any* file in images/ whose stem is <new_stem>
    3. If both exist **and** their byte sizes match → move the original file to images/processed/
"""

import csv, pathlib, shutil, sys

# fixed paths
MAP_FILE   = pathlib.Path(
    "~/cursordemo/seaview-site/website-lovable-shift/utils/name-maping.txt"
).expanduser()

IMAGES_DIR = pathlib.Path(
    "/Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift/public/images"
)

PROCESSED_DIR = IMAGES_DIR / "processed"
PROCESSED_DIR.mkdir(exist_ok=True)

def first_by_stem(directory: pathlib.Path, stem: str) -> pathlib.Path | None:
    """Return first file in directory whose stem matches stem.*"""
    matches = sorted(directory.glob(f"{stem}.*"))
    return matches[0] if matches else None

def main() -> None:
    moved, skipped, missing = 0, 0, 0
    with MAP_FILE.open() as fh:
        reader = csv.reader(fh, delimiter="\t")
        for row in reader:
            if not row or len(row) < 2:
                continue
            orig_stem, new_stem = row[0].strip(), row[1].strip()

            orig_file = first_by_stem(IMAGES_DIR, orig_stem)
            new_file  = first_by_stem(IMAGES_DIR, new_stem)

            if orig_file is None or new_file is None:
                missing += 1
                print(f"[missing] {orig_stem} or {new_stem}", file=sys.stderr)
                continue

            if orig_file.stat().st_size != new_file.stat().st_size:
                skipped += 1
                print(f"[size‑mismatch] {orig_file.name} vs {new_file.name}", file=sys.stderr)
                continue

            target = PROCESSED_DIR / orig_file.name
            shutil.move(orig_file, target)
            moved += 1
            print(f"[moved] {orig_file.name} → processed/")

    print(f"\nSummary: moved {moved}, skipped {skipped}, missing {missing}")

if __name__ == "__main__":
    main()

