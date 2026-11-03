# Which recording each of the demo's sounds comes from. To swap one, change its id and run tools/fetch-sounds.py and tools/make-sounds.py.
# Engines: each loop is a stretch at one pitch, `hz` being what tools/sound_track.py follows there and `rpm` what that stands for in this
# recording: which line is the strongest differs between recordings, so those are worked out from what each engine's revs must be.
ENGINES = {
    # A flat-four: its idle from a Subaru, the rest a pull up the revs on a dyno.
    'rally': {
        'level': -24,
        'pops': 'pop',
        'offTone': 1500,
        'offGain': 0.5,
        'loops': [
            {'id': '397351', 'at': 9, 'long': 3, 'hz': 25, 'rpm': 750, 'gain': 0.7},
            {'id': '183654', 'at': 5, 'long': 3, 'hz': 28, 'rpm': 3360},
            {'id': '183654', 'sweep': (10, 25), 'long': 2.2, 'hz': 34, 'rpm': 4080},
            {'id': '183654', 'sweep': (10, 25), 'long': 2.2, 'hz': 41, 'rpm': 4920},
            {'id': '183654', 'sweep': (10, 25), 'long': 2.2, 'hz': 48, 'rpm': 5760},
            {'id': '183654', 'sweep': (10, 25), 'long': 2.2, 'hz': 56, 'rpm': 6720},
        ],
    },
}

# Loops. `at` None takes the steadiest loud stretch.
LOOPS = {
    'road': {'id': '817389', 'at': None, 'long': 7, 'level': -31, 'fade': 0.8},
    'gravel': {'id': '577504', 'at': None, 'long': 7, 'level': -28, 'fade': 0.8},
    'squeal': {'id': '614627', 'at': None, 'long': 4, 'level': -28, 'fade': 0.5},
    'wind': {'id': '439242', 'at': None, 'long': 8, 'level': -30, 'fade': 1.0},
    'scrape': {'id': '383794', 'at': None, 'long': 3, 'level': -28, 'fade': 0.4},
}

# One-offs, by what was hit. Without `at`, it takes the hardest separate hits of a recording of many: `take` of them, up to `most` seconds each.
HITS = {
    'metal': {
        'heavy': [
            {'id': '346299', 'take': 1, 'most': 2.4, 'level': -9},
            {'id': '237375', 'take': 1, 'most': 2.2, 'level': -9},
            {'id': '329516', 'take': 2, 'most': 1.5, 'level': -10},
            {'id': '798843', 'take': 3, 'most': 1.4, 'level': -10},
        ],
        'light': [
            {'id': '798843', 'skip': 3, 'take': 6, 'floor': -26, 'most': 0.9, 'level': -16},
            {'id': '386798', 'take': 1, 'most': 1.2, 'level': -16},
            {'id': '342976', 'take': 4, 'most': 0.9, 'level': -16},
        ],
    },
    'rock': {
        'heavy': [
            {'id': '513694', 'take': 1, 'level': -10},
            {'id': '567701', 'take': 4, 'most': 1.2, 'level': -10},
            {'id': '711657', 'take': 1, 'level': -10},
        ],
        'light': [
            {'id': '179365', 'take': 5, 'most': 0.6, 'level': -17},
            {'id': '328926', 'take': 4, 'most': 0.8, 'level': -17},
        ],
    },
    'wood': {
        'heavy': [
            {'id': '550918', 'take': 3, 'most': 1.5, 'level': -10},
            {'id': '667653', 'take': 1, 'level': -11},
            {'id': '667652', 'take': 1, 'level': -11},
        ],
        'light': [
            {'id': '667655', 'take': 1, 'level': -16},
            {'id': '667654', 'take': 1, 'level': -16},
            {'id': '569723', 'take': 1, 'level': -16},
        ],
    },
    'snap': {
        'heavy': [
            {'id': '183450', 'take': 1, 'most': 1.2, 'level': -14},
            {'id': '183453', 'take': 1, 'most': 1.2, 'level': -14},
            {'id': '452109', 'take': 1, 'most': 1.2, 'level': -14},
        ],
    },
    'figure': {
        'heavy': [
            {'id': '257928', 'take': 1, 'level': -13},
            {'id': '276600', 'take': 1, 'level': -13},
            {'id': '344402', 'take': 1, 'level': -13},
        ],
    },
    'thump': {
        'heavy': [
            {'id': '342535', 'take': 1, 'level': -17},
            {'id': '385933', 'take': 1, 'level': -17},
            {'id': '397601', 'take': 4, 'most': 0.7, 'level': -17},
        ],
    },
    'land': {
        'heavy': [
            {'id': '397596', 'take': 3, 'most': 1.3, 'level': -11},
            {'id': '150490', 'take': 3, 'most': 1.0, 'level': -11},
        ],
    },
    'gear': {
        'heavy': [
            {'id': '630543', 'take': 5, 'floor': -24, 'most': 0.35, 'level': -22},
            {'id': '489435', 'take': 2, 'floor': -18, 'most': 0.35, 'level': -22},
        ],
    },
    'pop': {
        'heavy': [
            {'id': '797835', 'take': 5, 'floor': -18, 'most': 0.3, 'level': -18},
            {'id': '351738', 'take': 2, 'most': 0.4, 'level': -18},
        ],
    },
}
