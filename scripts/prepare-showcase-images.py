"""Regenerate committed screenshots: python scripts/prepare-showcase-images.py SOURCE.

Requires Pillow. Originals remain untouched in SOURCE; no crops or recoloring.
The JSON manifest is also the image inventory used by the showcase.
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
manifest_path = root / 'src/data/feature-images.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
source = Path(sys.argv[1]).resolve()
output = root / 'public/images/features'
output.mkdir(parents=True, exist_ok=True)
for entry in manifest:
    original = source / entry['original']
    with Image.open(original) as opened:
        image = ImageOps.exif_transpose(opened).convert('RGB')
        entry['width'], entry['height'] = image.size
        entry['originalBytes'] = original.stat().st_size
        entry['variants'] = []
        for width in sorted({min(image.width, size) for size in (480, 960, 1440, image.width)}):
            resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            name = f"{entry['id']}-{width}.webp"
            resized.save(output / name, 'WEBP', quality=85, method=6)
            entry['variants'].append({'src': f'images/features/{name}', 'width': width, 'bytes': (output / name).stat().st_size})
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'Prepared {len(manifest)} screenshots; originals preserved at {source}')
