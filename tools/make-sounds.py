# Cuts the demo's sounds out of the recordings tools/fetch-sounds.py downloaded, into public/audio/, with audio/sounds.json saying what each is
# for and audio/CREDITS.txt who made it. Reads SPEC in tools/sound-spec.py: that's the file to change to swap a sound.
# Checks what ears can't be trusted to here: clipping, offset, loudness, and whether a loop's join is a click. Prints a report, and refuses to
# write anything that isn't CC0 or CC BY. Run from the block's folder: python -I tools/make-sounds.py. Needs ffmpeg and numpy.
import json
import os
import re
import runpy
import subprocess
import sys

import numpy as np

SR = 44100
RAW = 'tools/out/snd'
OUT = 'public/audio'
here = os.path.dirname(os.path.abspath(sys.argv[0]))
SPEC = runpy.run_path(os.path.join(here, 'sound-spec.py'))
sys.path.insert(0, here)
from sound_track import flatten, track  # noqa: E402

records = json.load(open(f'{RAW}/records.json', encoding='utf-8'))
cache = {}


def read(sid):
    if sid not in cache:
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{RAW}/{sid}.mp3', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
        cache[sid] = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    return cache[sid]


def high_pass(x, hz=25):
    # Takes out rumble and offset no speaker can play.
    spectrum = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    spectrum *= np.clip((f - hz * 0.5) / (hz * 0.5), 0, 1)
    return np.fft.irfft(spectrum, len(x))


def loudness(x):
    # Short-window loudness in dB relative to full scale, roughly weighted the way hearing is: enough to level things against each other.
    spectrum = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR) + 1e-3
    a = (12194**2 * f**4) / ((f**2 + 20.6**2) * np.sqrt((f**2 + 107.7**2) * (f**2 + 737.9**2)) * (f**2 + 12194**2))
    y = np.fft.irfft(spectrum * a, len(x))
    w = int(0.1 * SR)
    energy = np.convolve(y**2, np.ones(w) / w, mode='same') if len(y) > w else np.array([np.mean(y**2)])
    return 10 * np.log10(np.mean(energy) + 1e-12), 10 * np.log10(np.max(energy) + 1e-12)


def clipped(x):
    # Runs of three or more samples stuck at the top: what clipping leaves, whatever it's been scaled to since.
    top = np.max(np.abs(x))
    stuck = np.abs(x) > top * 0.998
    runs = 0
    n = 0
    for s in stuck:
        n = n + 1 if s else 0
        if n == 3:
            runs += 1
    return runs


def make_loop(x, fade):
    # Finds the length near the asked one where the end best matches the start, then fades the tail into the head.
    n = len(x)
    head = x[:fade]
    best = n - fade
    best_score = -2
    for end in range(int(n * 0.86), n - fade, 7):
        tail = x[end: end + fade]
        score = np.dot(head, tail) / (np.linalg.norm(head) * np.linalg.norm(tail) + 1e-9)
        if score > best_score:
            best_score = score
            best = end
    out = x[: best + fade].copy()
    t = np.linspace(0, 1, fade)
    # Equal power, leaning to equal gain the better the two match.
    power = np.sqrt(t)
    share = np.clip(best_score, 0, 1)
    rise = power * (1 - share) + t * share
    fall = np.sqrt(1 - t) * (1 - share) + (1 - t) * share
    out[:fade] = head * rise + out[best: best + fade] * fall
    # The last few samples decide the join itself: end where it lands nearest the start.
    ends = np.arange(best - 80, min(best + 80, len(out)))
    cut = ends[np.argmin(np.abs(out[ends] - out[0]))]
    return out[:cut], float(best_score)


def seam(x):
    # How big the step across the join is, against the steps everywhere else: 1 or less is no click.
    step = abs(x[0] - x[-1])
    typical = np.percentile(np.abs(np.diff(x)), 99)
    return step / (typical + 1e-9)


def onsets(x, limit, floor_db=-30):
    # Each separate hit in a recording of many: where it starts, how long it rings, how hard it is.
    w = int(0.005 * SR)
    env = np.sqrt(np.convolve(x**2, np.ones(w) / w, mode='same'))
    top = env.max() + 1e-9
    floor = top * 10 ** (floor_db / 20)
    gap = int(0.09 * SR)
    found = []
    i = gap
    while i < len(x) - gap:
        ahead = env[i: i + int(0.012 * SR)].max()
        before = env[max(0, i - int(0.03 * SR)): i].mean()
        if ahead > floor and ahead > before * 4:
            found.append(i)
            i += gap
        else:
            i += w // 2
    hits = []
    strength = [env[a: a + int(0.04 * SR)].max() for a in found]
    for k, start in enumerate(found):
        peak = strength[k]
        # It rings until something nearly as hard comes along: what's quieter is part of its own rattle.
        later = [found[j] for j in range(k + 1, len(found)) if strength[j] > peak * 0.35]
        end = later[0] - int(0.008 * SR) if later else len(x)
        below = np.where(env[start + int(0.02 * SR): end] < peak * 10 ** (-42 / 20))[0]
        stop = start + int(0.02 * SR) + (below[0] if len(below) else end - start - int(0.02 * SR))
        hits.append((start, stop, peak / top))
    hits.sort(key=lambda h: -h[2])
    return hits[:limit]


def finish_shot(x):
    # A clean start, and a tail that fades to nothing.
    fade_in = min(int(0.002 * SR), len(x) // 8)
    fade_out = min(int(0.12 * SR), len(x) // 2)
    y = x.copy()
    y[:fade_in] *= np.linspace(0, 1, fade_in)
    y[-fade_out:] *= np.linspace(1, 0, fade_out) ** 2
    return y


report = []
used = {}


def write(name, x, sid, kind, target, extra=''):
    global report
    x = high_pass(x)
    mean, top = loudness(x)
    # Loops by how loud they are throughout, one-offs by how loud they get.
    measured = mean if kind == 'loop' else top
    gain = 10 ** ((target - measured) / 20)
    peak = np.max(np.abs(x)) * gain
    if peak > 0.89:
        gain *= 0.89 / peak
    y = x * gain
    raw = np.clip(y, -1, 1).astype(np.float32).tobytes()
    path = f'{OUT}/{name}.ogg'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libvorbis', '-q:a', '4', path], input=raw, check=True)
    back = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-'], capture_output=True, check=True).stdout, dtype=np.float32).astype(np.float64)
    mean2, top2 = loudness(back)
    used.setdefault(sid, []).append(f'{name}.ogg')
    size = os.path.getsize(path)
    joined = f'join {seam(back):4.2f}' if kind == 'loop' else ''
    report.append(f'{name:24} {len(back) / SR:6.2f}s  peak {20 * np.log10(np.max(np.abs(back)) + 1e-9):6.1f}  loudness {mean2:6.1f}/{top2:6.1f}  clipped {clipped(x):3d}  offset {abs(back.mean()):.4f}  {size / 1024:5.0f} KB  {joined} {extra} from {sid}')
    return f'{name}.ogg'


tracks = {}


def steady(l):
    # A stretch of an engine recording, bent to stay at one pitch.
    x = read(l['id'])
    # Held steady already: the note it's written down at is the one it's played from.
    if 'sweep' not in l:
        return x[int(l['at'] * SR): int((l['at'] + l['long']) * SR)]
    if l['id'] not in tracks:
        low = x[:: 4]
        tracks[l['id']] = track(low, SR / 4, hop_s=0.05)
    times, hz = tracks[l['id']]
    a, b = l['sweep']
    inside = (times >= a) & (times <= b)
    centre = times[inside][np.argmin(np.abs(hz[inside] - l['hz']))]
    # Its own pitch there, not the one written down, is what it's bent to.
    near = np.abs(times - centre) < 0.3
    target = float(np.median(hz[near]))
    if abs(target / l['hz'] - 1) > 0.12:
        print(f'note: {l["id"]} at {centre:.1f}s follows {target:.1f} Hz, not {l["hz"]}')
        target = l['hz']
    y = flatten(x, SR, times, hz, centre, l['long'] * 1.15, target)
    l['rpm'] = round(l['rpm'] * target / l['hz'])
    return y


def steadiest(x, seconds):
    # The start of the stretch that's loud, and doesn't change much.
    w = SR // 4
    n = len(x) // w
    power = np.array([np.mean(x[i * w: i * w + w] ** 2) for i in range(n)]) + 1e-12
    db = 10 * np.log10(power)
    span = int(seconds * 4)
    if n <= span:
        return 0.0
    loud = np.percentile(db, 70)
    best = 0
    best_score = -1e9
    for i in range(0, n - span):
        part = db[i: i + span]
        score = min(part.mean(), loud) - part.std() * 2 - (part.max() - part.min()) * 0.3
        if score > best_score:
            best_score = score
            best = i
    return best * w / SR


def main():
    for f in os.listdir(OUT):
        if f.endswith('.ogg') or f.endswith('.json') or f == 'CREDITS.txt':
            os.remove(f'{OUT}/{f}')
    manifest = {'engines': {}, 'loops': {}, 'hits': {}}
    for name, spec in SPEC['ENGINES'].items():
        loops = []
        for i, l in enumerate(spec['loops']):
            x = steady(l)
            looped, score = make_loop(x, int(0.05 * SR))
            file = write(f'engine-{name}-{i}', looped, l['id'], 'loop', spec.get('level', -20), f'match {score:.2f} rpm {l["rpm"]}')
            loops.append({'file': file, 'rpm': l['rpm'], 'gain': l.get('gain', 1)})
        manifest['engines'][name] = {'loops': loops, **{k: spec[k] for k in ('gain', 'pops', 'offTone', 'offGain') if k in spec}}
    for name, l in SPEC['LOOPS'].items():
        at = l['at'] if l['at'] is not None else steadiest(read(l['id']), l['long'])
        x = read(l['id'])[int(at * SR): int((at + l['long']) * SR)]
        looped, score = make_loop(x, int(l.get('fade', 0.4) * SR))
        file = write(f'loop-{name}', looped, l['id'], 'loop', l.get('level', -24), f'match {score:.2f}')
        manifest['loops'][name] = {'file': file, 'gain': l.get('gain', 1)}
    for kind, tiers in SPEC['HITS'].items():
        manifest['hits'][kind] = {}
        for tier, items in tiers.items():
            out = []
            n = 0
            for item in items:
                x = read(item['id'])
                level = item.get('level', -14)
                if 'at' in item:
                    cuts = [(int(item['at'] * SR), int((item['at'] + item['long']) * SR))]
                else:
                    zone = (int(item.get('from', 0) * SR), int(item.get('to', len(x) / SR) * SR))
                    skip = item.get('skip', 0)
                    found = onsets(x[zone[0]: zone[1]], skip + item.get('take', 4), item.get('floor', -30))[skip:]
                    cuts = [(a + zone[0], b + zone[0]) for a, b, _ in found]
                for a, b in cuts:
                    a = max(0, a - int(0.002 * SR))
                    b = min(b, a + int(item.get('most', 2.2) * SR))
                    if b - a < int(0.04 * SR):
                        continue
                    file = write(f'{kind}-{tier}-{n}', finish_shot(x[a:b]), item['id'], 'shot', level)
                    out.append({'file': file, 'gain': item.get('gain', 1)})
                    n += 1
            manifest['hits'][kind][tier] = out
    json.dump(manifest, open(f'{OUT}/sounds.json', 'w'), indent=1)
    lines = ['The recordings behind the demo\'s sounds. Each is cut, levelled and looped by tools/make-sounds.py from the preview Freesound serves.', '']
    for sid, files in sorted(used.items(), key=lambda kv: kv[1][0]):
        r = records[sid]
        if r['licence'] not in ('CC0-1.0', 'CC-BY-3.0', 'CC-BY-4.0'):
            raise SystemExit(f'{sid}: {r["licence"]}')
        author = re.search(r'/people/([^/]+)/', r['source']).group(1)
        lines.append(f'{r["title"]} by {author}, {r["licence"]}, {r["source"]}')
        lines.append('  ' + ', '.join(files))
    open(f'{OUT}/CREDITS.txt', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    total = sum(os.path.getsize(f'{OUT}/{f}') for f in os.listdir(OUT))
    print('\n'.join(report))
    print(f'{len(report)} files, {total / 1048576:.1f} MB')
    print('loudness is mean/most, in dB; clipped counts stuck runs in the source; a join of about 1 or less is no click')


if __name__ == '__main__':
    main()
