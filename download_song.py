import yt_dlp
import os

url = "https://youtu.be/4WB5y4DAcKE"
out_dir = r"c:\Users\srija\Downloads\sanskriti-15th-birthday\assets\audio"

ydl_opts = {
    'format': 'm4a/bestaudio/best',
    'outtmpl': os.path.join(out_dir, 'main_rahoon_ya_na_rahoon.%(ext)s'),
    'quiet': False
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download([url])
    print("Downloaded audio track successfully!")
