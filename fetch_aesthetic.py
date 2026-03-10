import urllib.request
import json
import os

target_dir = r"c:\Users\dhanu\.antigravity\artimus2k26.io\images"

def fetch_img(query, filename):
    url = f"https://www.reddit.com/r/arcane/search.json?q={query.replace(' ', '+')}&restrict_sr=on&sort=top&t=all"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 AestheticBot/1.0'})
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        urls = [c['data']['url'] for c in data['data']['children'] if c['data']['url'].endswith(('.jpg', '.png', '.jpeg'))]
        if not urls:
            # Fallback to general r/wallpapers search
            url = f"https://www.reddit.com/r/wallpapers/search.json?q={query.replace(' ', '+')}&restrict_sr=on&sort=top&t=all"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 AestheticBot/1.0'})
            data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
            urls = [c['data']['url'] for c in data['data']['children'] if c['data']['url'].endswith(('.jpg', '.png', '.jpeg'))]
            
        if not urls:
            print(f"Failed {filename}: No images found for {query}")
            return
            
        img_url = urls[0]
        urllib.request.urlretrieve(img_url, os.path.join(target_dir, f"{filename}.jpg"))
        print(f"Success {filename} from {img_url}")
    except Exception as e:
        print(f"Error {filename}: {e}")

fetch_img("arcane laboratory wallpaper", "event_Heimerdinger")
fetch_img("arcane arcade neon wallpaper", "event_Vi")
fetch_img("arcane piltover city wallpaper", "event_Mel")
