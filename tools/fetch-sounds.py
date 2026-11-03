# Downloads recordings from Freesound with their licence as their own page states it, into tools/out/snd/<id>.mp3 and records.json.
# Only CC0 and CC BY pass. The higher-quality previews are used: the originals need a signed-in key.
#   python -I tools/fetch-sounds.py <id> <id> ...
import html
import json
import os
import re
import sys
import time
import urllib.request

OUT = 'tools/out/snd'
os.makedirs(OUT, exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (patch-car-block-build)'}
path = f'{OUT}/records.json'
records = json.load(open(path, encoding='utf-8')) if os.path.exists(path) else {}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60)


for sid in sys.argv[1:]:
    if sid in records and os.path.exists(f'{OUT}/{sid}.mp3'):
        continue
    try:
        response = get(f'https://freesound.org/s/{sid}/')
        page = response.read().decode('utf-8', 'replace')
        url = response.geturl()
    except Exception as e:
        print('fail', sid, e)
        continue
    licences = set(re.findall(r'creativecommons\.org/(publicdomain/zero/1\.0|licenses/[a-z-]+/[\d.]+)', page))
    wanted = {'publicdomain/zero/1.0': 'CC0-1.0', 'licenses/by/4.0': 'CC-BY-4.0', 'licenses/by/3.0': 'CC-BY-3.0'}
    usable = [wanted[x] for x in licences if x in wanted]
    bad = [x for x in licences if x not in wanted]
    if len(usable) != 1 or bad:
        print('LICENCE?', sid, licences)
        continue
    mp3 = re.search(r'data-mp3="([^"]+)"', page).group(1).replace('-lq.', '-hq.')
    title = html.unescape(re.search(r'data-title="([^"]*)"', page).group(1))
    author = html.unescape(re.search(r'data-username="([^"]*)"', page).group(1))
    duration = float(re.search(r'data-duration="([\d.]+)"', page).group(1))
    description = re.search(r'<meta (?:name|property)="(?:og:)?description" content="([^"]*)"', page)
    tags = sorted(set(re.findall(r'/browse/tags/([^/"]+)/', page)))[:14]
    with open(f'{OUT}/{sid}.mp3', 'wb') as f:
        f.write(get(mp3).read())
    records[sid] = {'id': sid, 'title': title, 'author': author, 'licence': usable[0], 'source': url, 'duration': duration, 'description': html.unescape(description.group(1)) if description else '', 'tags': tags}
    print(sid, usable[0], author, title[:60], flush=True)
    json.dump(records, open(path, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    time.sleep(0.5)
