#!/usr/bin/env python3
"""
Copy originals to a new folder with new 4‑word names.

• Reads a CSV mapping (columns: filename,new_name).
• Locates the matching file in --src even if:
    - extension differs (.webp, .png, .jpg …)
    - original still contains _small or -scaled_small
• Copies to --dst with the preserved extension.
• Originals remain untouched.
• Optional --report CSV lists every copy (src → dst).

USAGE
    python rename_images.py \
        --map    image_name_mapping.csv \
        --src    /absolute/path/to/originals \
        --dst    /absolute/path/to/renamed   \
        --report rename_report.csv
"""
from __future__ import annotations
import argparse, csv, pathlib, re, shutil, sys
from collections import OrderedDict

# -------------------------------------------------------------------------- helpers

def candidate_basenames(mapped: str) -> list[str]:
    """
    Return possible stem variants (without extension) that could exist in --src
    for a mapped filename like 'picture-scaled_small.jpg'.
    """
    stem = pathlib.Path(mapped).stem
    variants = {stem}

    if stem.endswith("_small"):
        variants.add(stem[:-6])            # strip _small

    if "-scaled_small" in stem:
        base = stem.replace("-scaled_small", "")
        variants.add(base)
        variants.add(stem.replace("-scaled_small", "-scaled"))  # picture-scaled

    return sorted(variants, key=len, reverse=True)  # longer first

def locate_original(mapped: str, src_dir: pathlib.Path) -> pathlib.Path | None:
    """Find any file in src_dir whose stem matches our candidate variants."""
    for base in candidate_basenames(mapped):
        hits = list(src_dir.glob(f"{base}.*"))
        if hits:
            # pick first alphabetical hit (deterministic)
            return sorted(hits)[0]
    return None

# -------------------------------------------------------------------------- main

def copy_with_mapping(map_csv: pathlib.Path,
                      src_dir: pathlib.Path,
                      dst_dir: pathlib.Path,
                      report_csv: pathlib.Path | None):
    dst_dir.mkdir(parents=True, exist_ok=True)
    report: "OrderedDict[str,str]" = OrderedDict()

    with map_csv.open(newline="") as fh:
        for row in csv.DictReader(fh):
            mapped_file = row["filename"]
            new_stem    = row["new_name"]

            orig = locate_original(mapped_file, src_dir)
            if orig is None:
                print(f"!! could not locate source for {mapped_file}", file=sys.stderr)
                continue

            dst_file = dst_dir / f"{new_stem}{orig.suffix.lower()}"
            shutil.copy2(orig, dst_file)          # COPY keeps originals safe
            report[str(orig)] = str(dst_file)
            print(f"{orig.name} → {dst_file.name}")

    if report_csv:
        with report_csv.open("w", newline="") as fh:
            w = csv.writer(fh)
            w.writerow(["original", "copy"])
            w.writerows(report.items())
        print(f"Report saved to {report_csv}")

# -------------------------------------------------------------------------- CLI

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--map",    required=True, type=pathlib.Path, help="mapping CSV")
    p.add_argument("--src",    required=True, type=pathlib.Path, help="folder with originals")
    p.add_argument("--dst",    required=True, type=pathlib.Path, help="output folder")
    p.add_argument("--report",                type=pathlib.Path, help="optional report CSV")
    args = p.parse_args()
    copy_with_mapping(args.map, args.src, args.dst, args.report)

if __name__ == "__main__":
    main()
