import os
import clip
import torch
from PIL import Image
import shutil

# Define your categories
categories = [
    "exterior", "interior", "bedroom", "bathroom", "kitchen", "garden", "view", "island", "living room", "dining area", "pool", "misc"
]

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

image_dir = "website-lovable-shift/public/images"
backup_dir = os.path.join(image_dir, "backup")
os.makedirs(backup_dir, exist_ok=True)

for filename in os.listdir(image_dir):
    if filename.lower().endswith(('.webp', '.jpg', '.jpeg', '.png')):
        image_path = os.path.join(image_dir, filename)
        backup_path = os.path.join(backup_dir, filename)
        shutil.copy2(image_path, backup_path)  # Copy with metadata
        image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
        text = clip.tokenize(categories).to(device)
        with torch.no_grad():
            logits_per_image, _ = model(image, text)
            probs = logits_per_image.softmax(dim=-1).cpu().numpy()[0]
        best_idx = probs.argmax()
        best_category = categories[best_idx]
        new_filename = f"{best_category}{os.path.splitext(filename)[1]}"
        new_path = os.path.join(image_dir, new_filename)
        os.rename(image_path, new_path)
        print(f"Renamed '{filename}' to '{new_filename}'")

print(f"\nOriginal images backed up to '{backup_dir}'")
