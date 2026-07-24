import os
from PIL import Image

images_dir = r"c:\Users\srija\Downloads\sanskriti-15th-birthday\assets\images"

# Define crop bounding boxes (left, upper, right, lower) as ratios of (width, height)
crops = {
    "sanskriti_white_top.jpg": (0.45, 0.05, 0.95, 0.50),
    "sanskriti_pink_dress.jpg": (0.25, 0.15, 0.80, 0.55),
    "sanskriti_yellow_event.jpg": (0.22, 0.02, 0.50, 0.45),
    "sanskriti_yellow_candid.jpg": (0.32, 0.05, 0.72, 0.65),
    "sanskriti_yellow_drapes.jpg": (0.38, 0.20, 0.72, 0.65),
    "sanskriti_school.jpg": (0.50, 0.28, 0.80, 0.55),
    "sanskriti_calf.jpg": (0.38, 0.35, 0.98, 0.75),
    "sanskriti_puppy.jpg": (0.42, 0.38, 0.98, 0.78),
    "sanskriti_portrait.jpg": (0.20, 0.15, 0.90, 0.75),
    "sanskriti_cultural.jpg": (0.30, 0.20, 0.65, 0.55),
    "sanskriti_childhood.jpg": (0.15, 0.10, 0.85, 0.90)
}

for filename, (r_left, r_top, r_right, r_bottom) in crops.items():
    filepath = os.path.join(images_dir, filename)
    if os.path.exists(filepath):
        try:
            with Image.open(filepath) as img:
                w, h = img.size
                left = int(r_left * w)
                top = int(r_top * h)
                right = int(r_right * w)
                bottom = int(r_bottom * h)
                
                cropped = img.crop((left, top, right, bottom))
                cropped.save(filepath, quality=95)
                print(f"Successfully cropped face for {filename}: ({left}, {top}, {right}, {bottom}) from original {w}x{h}")
        except Exception as e:
            print(f"Error cropping {filename}: {e}")
    else:
        print(f"File not found: {filepath}")
