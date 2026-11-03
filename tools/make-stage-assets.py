# Shrinks the rally stage's raw assets (tools/fetch-stage-assets.mjs) into public/stage/: ground textures at 1024, and the sky as a
# display-ready picture of its upper half, with where its sun is. Run with python -I, from the block's folder. Needs ffmpeg and numpy.
import json
import os
import subprocess
import sys

import numpy as np

RAW = 'tools/out/ph'
OUT = 'public/stage'
os.makedirs(OUT, exist_ok=True)
GROUND = {'gravel': 'forest_ground_04', 'asphalt': 'asphalt_02', 'forest': 'forest_leaves_02', 'grass': 'leafy_grass', 'rock': 'lichen_rock'}
SKY = 'kloofendal_38d_partly_cloudy_puresky'


def run(*args):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *args], check=True)


for name, source in GROUND.items():
    for kind, q in (('diff', 82), ('nor', 78)):
        src = next(f for f in os.listdir(f'{RAW}/{source}') if f.startswith(kind))
        run('-i', f'{RAW}/{source}/{src}', '-vf', 'scale=1024:1024:flags=lanczos', '-c:v', 'libwebp', '-quality', str(q), f'{OUT}/{name}-{kind}.webp')

# The sky: read the HDR, find the sun, tone it for the screen.
path = f'{RAW}/{SKY}/sky.hdr'
probe = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path], capture_output=True, text=True, check=True).stdout.strip()
w, h = [int(x) for x in probe.split(',')[:2]]
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-f', 'rawvideo', '-pix_fmt', 'gbrpf32le', '-'], capture_output=True, check=True).stdout
planes = np.frombuffer(raw, dtype=np.float32).reshape(3, h, w)
rgb = np.stack([planes[2], planes[0], planes[1]], axis=-1)
lum = rgb.mean(axis=-1)
smooth = lum[: h // 2]
y, x = np.unravel_index(np.argmax(smooth), smooth.shape)
az = (x + 0.5) / w * 2 * np.pi
el = np.pi / 2 - (y + 0.5) / h * np.pi
# three's equirect mapping: u = atan2(z, x) / 2pi + 0.5.
angle = (x + 0.5) / w * 2 * np.pi - np.pi
sun = [float(np.cos(el) * np.cos(angle)), float(np.sin(el)), float(np.cos(el) * np.sin(angle))]
exposure = 0.72
display = 1 - np.exp(-rgb * exposure)
display = np.where(display <= 0.0031308, display * 12.92, 1.055 * np.power(np.maximum(display, 1e-6), 1 / 2.4) - 0.055)
upper = np.clip(display[: int(h * 0.56)] * 255 + 0.5, 0, 255).astype(np.uint8)
horizon = display[int(h * 0.47): int(h * 0.5)].reshape(-1, 3).mean(axis=0)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{upper.shape[1]}x{upper.shape[0]}', '-i', '-', '-c:v', 'libwebp', '-quality', '88', f'{OUT}/sky.webp'], input=upper.tobytes(), check=True)
json.dump({'sun': sun, 'elevation': float(np.degrees(el)), 'horizon': [float(c) for c in horizon], 'share': upper.shape[0] / h}, open(f'{OUT}/sky.json', 'w'), indent=1)
print('sun', sun, 'elevation', float(np.degrees(el)), 'horizon', horizon, 'size', upper.shape)
for f in sorted(os.listdir(OUT)):
    print(f, os.path.getsize(f'{OUT}/{f}'))
