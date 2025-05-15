import csv, pathlib
from rename_images import copy_with_mapping

def make_dummy(file: pathlib.Path):
    file.write_bytes(b"x")

def test_mixed_extensions_and_scaled_variants(tmp_path):
    src  = tmp_path / "src";  src.mkdir()
    dst  = tmp_path / "dst"
    csv_ = tmp_path / "map.csv"

    # originals with various quirks
    make_dummy(src / "photo1.webp")                    # no suffix in mapped
    make_dummy(src / "picture-scaled_small.png")       # keeps -scaled_small
    make_dummy(src / "diagram_small.tiff")             # keeps _small

    # mapping references .jpg versions that came from the downsize step
    with csv_.open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["filename", "new_name"])
        w.writerow(["photo1_small.jpg",          "view-sea-dawn"])
        w.writerow(["picture-scaled_small.jpg",  "garden-stairs-evening"])
        w.writerow(["diagram_small.jpg",         "plan-electric-basic"])

    copy_with_mapping(csv_, src, dst, None)

    # originals untouched
    assert (src / "photo1.webp").exists()
    assert (src / "picture-scaled_small.png").exists()
    assert (src / "diagram_small.tiff").exists()

    # renamed copies exist with correct ext
    assert (dst / "view-sea-dawn.webp").exists()
    assert (dst / "garden-stairs-evening.png").exists()
    assert (dst / "plan-electric-basic.tiff").exists()
