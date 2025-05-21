#!/usr/bin/env python3
"""
For each entry in ~/cursordemo/seaview-site/website-lovable-shift/utils/name-maping.txt
────────────────────────────────────────────────────────────────────────────────────────
1. Try to locate the *original* file (first column) in
   /Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift/public/images
   – match by stem, any extension.

2. If not found  ➜  append the stem to not_found.txt and continue.

3. If found, look for the *renamed* file (second column) in the **same** images dir.
   • If it exists **and** byte‑sizes match, do nothing.
   • If it is missing **or** sizes differ:
         – look for the renamed file in
           /Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift/public/images/renamed
         – if located there, copy it to the main images dir and log the action
           to found.txt   (src → dst).
         – if still not found, log the problem to not_found.txt.

All logs are created in the current working directory.
"""

import csv, pathlib, shutil, sys

# ------------------------------------------------------------------ fixed paths
MAPPING_FILE = pathlib.Path(
    "~/cursordemo/seaview-site/website-lovable-shift/utils/name-maping.txt"
).expanduser()

IMAGES_DIR   = pathlib.Path(
    "/Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift/public/images"
)

RENAMED_DIR  = IMAGES_DIR / "renamed"

NOT_FOUND_TXT = pathlib.Path("not_found.txt")
FOUND_TXT     = pathlib.Path("found.txt")

# ------------------------------------------------------------------ helpers
def find_by_stem(directory: pathlib.Path, stem: str) -> pathlib.Path | None:
    """Return first file in directory whose stem matches stem.*"""
    hits = sorted(directory.glob(f"{stem}.*"))
    return hits[0] if hits else None

def log(path: pathlib.Path, message: str):
    path.write_text((path.read_text() if path.exists() else "") + message + "\n")

# ------------------------------------------------------------------ main
def main():
    with MAPPING_FILE.open() as fh:
        reader = csv.reader(fh, delimiter="\t")
        for row in reader:
            if not row or len(row) < 2:
                continue
            orig_stem, new_stem = row[0].strip(), row[1].strip()

            orig_file = find_by_stem(IMAGES_DIR, orig_stem)
            if orig_file is None:
                log(NOT_FOUND_TXT, f"{orig_stem}: original not found")
                continue

            new_file = find_by_stem(IMAGES_DIR, new_stem)
            if new_file and new_file.stat().st_size == orig_file.stat().st_size:
                # already present & same size – nothing to do
                continue

            # need to refresh / bring in from renamed
            renamed_file = find_by_stem(RENAMED_DIR, new_stem)
            if renamed_file is None:
                log(NOT_FOUND_TXT, f"{new_stem}: renamed version missing in both locations")
                continue

            target_path = IMAGES_DIR / renamed_file.name
            shutil.copy2(renamed_file, target_path)
            log(FOUND_TXT, f"copied {renamed_file} → {target_path}")

if __name__ == "__main__":
    try:
        main()
        print("Completed; see found.txt and not_found.txt for results.")
    except Exception as e:
        log(NOT_FOUND_TXT, f"ERROR: {e}")
        sys.exit(1)

