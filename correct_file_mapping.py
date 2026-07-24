import os
import shutil
from PIL import Image

brain_dir = r"C:\Users\srija\.gemini\antigravity\brain\aa2b5b4c-a0ce-4060-9cc4-b8e30acd5ba1"
output_dir = r"c:\Users\srija\Downloads\sanskriti-15th-birthday\assets\images"

# Exact verification mapping based on actual image inspection
file_mapping = {
    "media__1784640511095.jpg": "sanskriti_white_top.jpg",      # White shirt near trees at night
    "media__1784640511098.jpg": "sanskriti_pink_dress.jpg",      # Pink dress holding red roses
    "media__1784640511108.jpg": "sanskriti_yellow_event.jpg",    # Stealing groom's shoe at wedding
    "media__1784640511114.jpg": "sanskriti_yellow_candid.jpg",   # Yellow t-shirt candid party dance
    "media__1784640511117.jpg": "sanskriti_yellow_drapes.jpg",   # Yellow t-shirt near bright drapes
    "media__1784547230752.jpg": "sanskriti_childhood.jpg",       # Baby sleeping in white beanie
    "media__1784547230764.jpg": "sanskriti_portrait.jpg",        # Pink top laying down portrait
    "media__1784547230768.jpg": "sanskriti_school.jpg",          # School sweatshirt + medal near statue
    "media__1784547230773.jpg": "sanskriti_calf.jpg",            # Cheek-to-cheek with calf
    "media__1784547230779.jpg": "sanskriti_puppy.jpg"            # Holding fluffy puppy
}

for src_name, dst_name in file_mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(output_dir, dst_name)
    shutil.copyfile(src_path, dst_path)
    print(f"Correctly mapped {src_name} -> {dst_name}")

# Create circular avatar crop specifically focused on face from sanskriti_white_top.jpg
white_top_path = os.path.join(output_dir, "sanskriti_white_top.jpg")
avatar_path = os.path.join(output_dir, "sanskriti_avatar.jpg")

with Image.open(white_top_path) as img:
    w, h = img.size
    # Face bounding box ratios for white top image
    left = int(0.50 * w)
    top = int(0.10 * h)
    right = int(0.85 * w)
    bottom = int(0.42 * h)
    
    avatar_crop = img.crop((left, top, right, bottom))
    avatar_crop.save(avatar_path, quality=95)
    print(f"Created dedicated face avatar: {avatar_path}")
