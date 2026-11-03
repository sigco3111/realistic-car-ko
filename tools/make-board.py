# A page for judging the demo's sounds by ear: every sound in it by role, with other recordings to compare, each saying where it's from, and a
# name to quote when asking for a swap. Local only: it goes into the folder the preview's served from, never into the block.
#   python -I tools/make-board.py <folder>
import html
import json
import os
import re
import runpy
import subprocess
import sys

import numpy as np

here = os.path.dirname(os.path.abspath(sys.argv[0]))
folder = sys.argv[1]
sys.argv = [os.path.join(here, 'make-sounds.py')]
m = runpy.run_path(os.path.join(here, 'make-sounds.py'))
SR, read, make_loop, steadiest, onsets, finish_shot, high_pass = m['SR'], m['read'], m['make_loop'], m['steadiest'], m['onsets'], m['finish_shot'], m['high_pass']
records = m['records']
os.makedirs(f'{folder}/board', exist_ok=True)

# Other recordings worth comparing, each licence-checked by tools/fetch-sounds.py when it was downloaded.
LOOPS = {
    'Engine, idle': [('369797', 8, 3), ('273334', 3, 3), ('453741', 16, 3), ('181239', 10, 3)],
    'Gravel under the tyres': [('685233', None, 7), ('784177', None, 7), ('521272', None, 7), ('637162', None, 7), ('718299', None, 7), ('637192', None, 7)],
    'Road noise': [('521767', None, 7)],
    'Wind': [('492458', None, 8), ('174501', None, 8), ('611197', None, 8)],
    'Tyre squeal': [('71737', None, 4), ('76804', None, 4), ('850041', None, 4), ('71739', None, 4)],
    'Metal scraping': [('385939', None, 2), ('646698', None, 2), ('534851', None, 3)],
}
HITS = {
    'Crashes into metal': [('346300', 1), ('449062', 2), ('471190', 1), ('471192', 1), ('178202', 2), ('587443', 3), ('151624', 1)],
    'Gear change': [('385936', 1)],
    'Exhaust pops': [('351739', 2), ('105351', 1)],
    'Jump landings and thumps': [('837875', 2), ('508170', 1)],
}
ROLE = {
    'engine-rally': 'Engine, low revs to high',
    'loop-road': 'Road noise', 'loop-gravel': 'Gravel under the tyres', 'loop-squeal': 'Tyre squeal', 'loop-wind': 'Wind', 'loop-scrape': 'Metal scraping',
    'metal-heavy': 'Crashes into metal, hard', 'metal-light': 'Knocks against metal, light', 'rock-heavy': 'Rock, hard', 'rock-light': 'Rock, light', 'wood-heavy': 'Wood and trunks, hard', 'wood-light': 'Wood, light',
    'snap': 'Poles and boards snapping', 'figure': 'Hitting a mannequin', 'thump': 'Wheels over something sharp', 'land': 'Jump landings', 'gear': 'Gear change', 'pop': 'Exhaust pops',
}


def encode(x, path):
    x = high_pass(x)
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.7
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libvorbis', '-q:a', '4', path], input=x.astype(np.float32).tobytes(), check=True)


def credit(sid):
    r = records[sid]
    author = re.search(r'/people/([^/]+)/', r['source']).group(1)
    return f'<a href="{html.escape(r["source"])}">{html.escape(r["title"])}</a>, {html.escape(author)}, {r["licence"]}'


source_of = {}
for line in open('tools/out/sounds-report.txt', encoding='utf-8'):
    found = re.match(r'(\S+)\s.* from (\d+)\s*$', line)
    if found:
        source_of[found.group(1)] = found.group(2)

sections = {}
for name in sorted(source_of):
    key = re.sub(r'-\d+$', '', name)
    key = key.replace('-heavy', '-heavy') if key.split('-')[0] in ('metal', 'rock', 'wood') else key.split('-heavy')[0]
    sections.setdefault(ROLE.get(key, key), []).append(('in use', name, f'audio/{name}.ogg', source_of[name]))
alts = {}
for role, items in LOOPS.items():
    for sid, at, long in items:
        if sid not in records:
            continue
        x = read(sid)
        start = at if at is not None else steadiest(x, long)
        looped, _ = make_loop(x[int(start * SR): int((start + long) * SR)], int(min(0.5, long / 6) * SR))
        name = f'alt-{sid}'
        encode(looped, f'{folder}/board/{name}.ogg')
        alts.setdefault(role, []).append(('other', name, f'board/{name}.ogg', sid))
for role, items in HITS.items():
    for sid, take in items:
        if sid not in records:
            continue
        x = read(sid)
        for k, (a, b, _) in enumerate(onsets(x, take)):
            name = f'alt-{sid}-{k}'
            encode(finish_shot(x[a: min(b, a + int(2.2 * SR))]), f'{folder}/board/{name}.ogg')
            alts.setdefault(role, []).append(('other', name, f'board/{name}.ogg', sid))

rows = []
done = set()
for role, items in sections.items():
    rows.append(f'<h2>{html.escape(role)}</h2>')
    for kind, name, path, sid in items + alts.get(role, []):
        rows.append(f'<div class="row {kind}"><button data-src="{path}">Play</button><code>{name}</code><span>{credit(sid)}</span></div>')
    done.add(role)
for role, items in alts.items():
    if role in done:
        continue
    rows.append(f'<h2>{html.escape(role)}: others to compare</h2>')
    for kind, name, path, sid in items:
        rows.append(f'<div class="row {kind}"><button data-src="{path}">Play</button><code>{name}</code><span>{credit(sid)}</span></div>')
page = f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Car sounds</title>
<style>
:root {{ color-scheme: dark; }}
body {{ margin: 0 auto; max-width: 900px; padding: 24px 16px 80px; background: #14171a; color: #e7e9ea; font: 15px/1.5 system-ui, sans-serif; }}
h1 {{ font-size: 22px; margin: 0 0 6px; }} p {{ color: #a9b0b5; margin: 0 0 12px; }}
h2 {{ font-size: 15px; margin: 26px 0 6px; color: #f0b24a; }}
.row {{ display: flex; gap: 10px; align-items: center; padding: 3px 0; flex-wrap: wrap; }}
.other {{ opacity: 0.72; }}
button {{ background: #2a3036; color: inherit; border: 0; border-radius: 6px; padding: 4px 12px; cursor: pointer; font: inherit; }}
button:hover {{ background: #3a424a; }} button.on {{ background: #f0b24a; color: #14171a; }}
code {{ color: #9fd3a8; min-width: 150px; }} span {{ color: #a9b0b5; font-size: 13px; }} a {{ color: inherit; }}
</style></head><body>
<h1>Car sounds</h1>
<p>Everything the demo plays, by what it's for. Brighter rows are in use; dimmer rows are other real recordings to compare. To swap one, quote the two names: "use alt-71737 for tyre squeal".</p>
<p>These play at a fixed level, so judge what the sound is here, and how loud it is in the game. All are CC0, from the 128 kbps previews Freesound serves.</p>
{''.join(rows)}
<script>
let now = null, was = null;
document.addEventListener('click', (e) => {{
  const b = e.target.closest('button'); if (!b) return;
  if (now) {{ now.pause(); was.classList.remove('on'); }}
  if (was === b) {{ now = was = null; return; }}
  now = new Audio(b.dataset.src); was = b; b.classList.add('on');
  now.onended = () => {{ b.classList.remove('on'); now = was = null; }};
  now.play().catch(() => {{}});
}});
</script></body></html>'''
open(f'{folder}/sounds.html', 'w', encoding='utf-8').write(page)
print('board', len(rows), 'rows', sum(os.path.getsize(f'{folder}/board/{f}') for f in os.listdir(f'{folder}/board')) // 1024, 'KB of others')
