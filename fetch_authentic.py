import urllib.request
import json
import os

target_dir = r"c:\Users\dhanu\.antigravity\artimus2k26.io\images"

def fetch_screencap(query, filename):
    url = f"https://www.reddit.com/r/arcane/search.json?q={query.replace(' ', '+')}&restrict_sr=on&sort=top&t=all"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 AestheticBot/2.0'})
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        urls = []
        for c in data['data']['children']:
            u = c['data']['url']
            if u.endswith(('.jpg', '.png', '.jpeg')) and 'gallery' not in u:
                urls.append(u)
        
        if urls:
            img_url = urls[0]
            urllib.request.urlretrieve(img_url, os.path.join(target_dir, f"{filename}.jpg"))
            print(f"Success {filename} from {img_url}")
        else:
            print(f"Failed {filename}: No explicit images.")
    except Exception as e:
        print(f"Error {filename}: {e}")

# Use words that imply real screenshots from the show
fetch_screencap("heimerdinger screenshot", "event_Heimerdinger")
fetch_screencap("vi screenshot season", "event_Vi")
fetch_screencap("mel screenshot", "event_Mel")
