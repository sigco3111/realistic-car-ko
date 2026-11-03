# Follows an engine's pitch through a recording, and bends a stretch of it to one steady pitch, for tools/make-sounds.py.
import numpy as np


def track(x, sr, fmin=18.0, fmax=320.0, hop_s=0.02):
    """The strongest run of harmonics over time, by dynamic programming, as (times, Hz)."""
    N = 16384
    hop = int(hop_s * sr)
    win = np.hanning(N)
    grid = fmin * (fmax / fmin) ** (np.arange(320) / 319)
    bin_hz = sr / N
    frames = max(1, (len(x) - N) // hop)
    salience = np.zeros((frames, len(grid)))
    for i in range(frames):
        mag = np.abs(np.fft.rfft(x[i * hop: i * hop + N] * win))
        mag = np.log1p(mag / (np.median(mag) + 1e-9))
        for g, f in enumerate(grid):
            k = np.arange(1, 9)
            idx = (f * k / bin_hz + 0.5).astype(int)
            idx = idx[idx < len(mag)]
            between = ((f * (np.arange(1, 9) - 0.5)) / bin_hz + 0.5).astype(int)
            between = between[between < len(mag)]
            salience[i, g] = mag[idx].mean() - 0.6 * mag[between].mean()
    # Moving a long way between frames costs; so does nothing else.
    log_f = np.log(grid)
    jump = 14.0 * np.abs(log_f[:, None] - log_f[None, :])
    score = salience[0].copy()
    back = np.zeros((frames, len(grid)), dtype=int)
    for i in range(1, frames):
        options = score[None, :] - jump
        back[i] = options.argmax(axis=1)
        score = options.max(axis=1) + salience[i]
    path = np.zeros(frames, dtype=int)
    path[-1] = score.argmax()
    for i in range(frames - 1, 0, -1):
        path[i - 1] = back[i, path[i]]
    times = (np.arange(frames) * hop + N / 2) / sr
    return times, grid[path]


def flatten(x, sr, times, hz, centre, seconds, target):
    """`seconds` of sound around `centre` s, with its pitch bent to stay at `target` Hz the whole way."""
    out = np.zeros(int(seconds * sr))
    pos = centre * sr
    # Start far enough back that the middle of what comes out is at the centre.
    p = pos
    for _ in range(int(seconds * sr / 2)):
        f = np.interp(p / sr, times, hz)
        p -= target / f
    p = max(p, 0)
    for n in range(len(out)):
        f = np.interp(p / sr, times, hz) if n % 64 == 0 else f
        i = int(p)
        if i + 1 >= len(x):
            return out[:n]
        t = p - i
        out[n] = x[i] * (1 - t) + x[i + 1] * t
        p += target / f
    return out
