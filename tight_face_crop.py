import os
from PIL import Image

brain_dir = r"C:\Users\srija\.gemini\antigravity\brain\aa2b5b4c-a0ce-4060-9cc4-b8e30acd5ba1"
output_dir = r"c:\Users\srija\Downloads\sanskriti-15th-birthday\assets\images"

# Bounding box ratios (left, top, right, bottom)
tight_crops = {
    # 5 New Uploaded Photos
    "media__1784640511095.jpg": ("sanskriti_white_top.jpg", (0.52, 0.10, 0.88, 0.42)),
    "media__1784640511098.jpg": ("sanskriti_pink_dress.jpg", (0.30, 0.15, 0.70, 0.45)),
    "media__1784640511108.jpg": ("sanskriti_yellow_event.jpg", (0.30, 0.02, 0.46, 0.25)),
    "media__1784640511114.jpg": ("sanskriti_yellow_candid.jpg", (0.38, 0.05, 0.58, 0.38)),
    "media__1784640511117.jpg": ("sanskriti_yellow_drapes.jpg", (0.50, 0.24, 0.68, 0.50)),

    # Previous Photos
    "media__1784547230752.jpg": ("sanskriti_cultural.jpg", (0.50, 0.28, 0.78, 0.48)),
    "media__1784547230764.jpg": ("sanskriti_calf.jpg", (0.38, 0.38, 0.98, 0.70)),
    "media__1784547230768.jpg": ("sanskriti_puppy.jpg", (0.42, 0.40, 0.98, 0.75)),
    "media__1784547230773.jpg": ("sanskriti_portrait.jpg", (0.22, 0.15, 0.90, 0.65)),
    "media__1784547230779.jpg": ("sanskriti_childhood.jpg", (0.20, 0.12, 0.85, 0.88)),
    "media__1784547230768.jpg": ("sanskriti_school.jpg", (0.42, 0.40, 0.98, 0.75))
}

for src_name, (out_name, (r_left, r_top, r_right, r_bottom)) in tight_crops.items():
    src_path = os.path.join(brain_dir, src_name)
    out_path = os.path.join(output_dir, out_name)
    
    if os.path.exists(src_path):
        try:
            with Image.open(src_path) as img:
                w, h = img.size
                left = int(r_left * w)
                top = int(r_top * h)
                right = int(r_right * w)
                bottom = int(r_bottom * h)
                
                cropped = img.crop((left, top, right, bottom))
                cropped.save(out_path, quality=95)
                print(f"Refined crop saved for {out_name}: ({left}, {top}, {right}, {bottom})")
        except Exception as e:
            print(f"Error cropping {src_name}: {e}")
