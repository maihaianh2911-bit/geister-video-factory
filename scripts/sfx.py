#!/usr/bin/env python3
"""Procedural sound design: synthesises every effect from code (no samples, no licensing),
places them on the events of a video, time-warps them onto the real voice timeline,
and writes a stereo WAV.

Usage:
  sfx.py --events events.json --timing timing.json --out sfx.wav

events.json : {"bed": true, "events": [{"t": 1.30, "type": "thud", ...params}, ...]}
              times are in the prototype (orig) timeline; timing.json's orig/new map them.
"""
import argparse, json, math
import numpy as np
from scipy.signal import butter, lfilter

SR = 48000
RNG = np.random.default_rng(7)


def env_exp(n, decay):
    t = np.arange(n) / SR
    return np.exp(-t / max(decay, 1e-4))


def attack(sig, ms=3):
    n = min(len(sig), int(SR * ms / 1000))
    if n > 1:
        sig[:n] *= np.linspace(0, 1, n)
    return sig


def lp(x, f, order=2):
    b, a = butter(order, min(f, SR / 2 - 100) / (SR / 2), 'low'); return lfilter(b, a, x)


def hp(x, f, order=2):
    b, a = butter(order, f / (SR / 2), 'high'); return lfilter(b, a, x)


def bp(x, f1, f2, order=2):
    b, a = butter(order, [f1 / (SR / 2), min(f2, SR / 2 - 100) / (SR / 2)], 'band'); return lfilter(b, a, x)


def sweep(f0, f1, dur, curve='exp'):
    n = int(SR * dur); t = np.arange(n) / SR
    if curve == 'exp' and f0 > 0 and f1 > 0:
        f = f0 * (f1 / f0) ** (t / dur)
    else:
        f = f0 + (f1 - f0) * t / dur
    return np.sin(2 * np.pi * np.cumsum(f) / SR)


def noise(dur):
    return RNG.standard_normal(int(SR * dur))


def tiny_room(x, mix=0.25):
    """cheap stereo-ish room: a few feedback-free taps."""
    out = x.copy()
    for d, g in ((0.031, .5), (0.047, .4), (0.071, .3), (0.113, .2)):
        k = int(SR * d)
        out[k:] += g * mix * x[:-k]
    return out


# ---------------- instruments ----------------
def s_hit(p):            # deep cinematic boom
    d = p.get('dur', 1.4)
    body = sweep(p.get('f0', 110), p.get('f1', 38), d) * env_exp(int(SR * d), .35)
    trans = lp(noise(d), 900) * env_exp(int(SR * d), .03) * .8
    return attack(tiny_room(body + trans, .35), 2) * p.get('gain', 1.0)


def s_thud(p):           # door knock / wooden thump
    d = .5
    body = sweep(95, 55, d) * env_exp(int(SR * d), .09)
    knock = bp(noise(d), 150, 900) * env_exp(int(SR * d), .025) * 1.4
    return attack(tiny_room(body + knock, .45), 1) * p.get('gain', 1.0)


def s_ting(p):           # plucked bell, pitch in Hz
    f = p.get('f', 660); d = p.get('dur', .9)
    n = int(SR * d); t = np.arange(n) / SR
    sig = (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2.01 * f * t) + .12 * np.sin(2 * np.pi * 3.98 * f * t))
    sig *= env_exp(n, p.get('decay', .28))
    return attack(tiny_room(sig, .5), 2) * p.get('gain', .55)


def s_pop(p):            # bubble pop / appear
    d = .12; f0 = p.get('f0', 260); f1 = p.get('f1', 900)
    sig = sweep(f0, f1, d) * env_exp(int(SR * d), .04)
    return attack(sig, 1) * p.get('gain', .6)


def s_plop(p):           # ghost landing: soft low pop with tiny wobble
    d = .25; f = p.get('f', 220)
    sig = sweep(f * 1.8, f, d) * env_exp(int(SR * d), .07)
    return attack(tiny_room(sig, .3), 1) * p.get('gain', .5)


def s_whoosh(p):         # filtered noise swell
    d = p.get('dur', .6)
    n = int(SR * d); x = noise(d)
    lo, hi = p.get('lo', 300), p.get('hi', 2500)
    blocks = 24; out = np.zeros(n); bl = n // blocks + 1
    for i in range(blocks):
        f = lo + (hi - lo) * math.sin(math.pi * (i + .5) / blocks)
        seg = slice(i * bl, min(n, (i + 1) * bl))
        out[seg] = bp(x[seg], max(60, f * .5), f * 1.5, 1)
    envl = np.sin(np.linspace(0, np.pi, n)) ** 1.5
    return out * envl * p.get('gain', .5)


def s_riser(p):
    d = p.get('dur', 1.0)
    n = int(SR * d); e = np.linspace(0, 1, n) ** 2
    tone = sweep(p.get('f0', 180), p.get('f1', 1200), d) * .4
    air = hp(noise(d), 1500) * .5
    return (tone + air) * e * p.get('gain', .4)


def s_slide(p):          # cartoon slide (falling or rising)
    d = p.get('dur', .7)
    sig = sweep(p.get('f0', 900), p.get('f1', 160), d) * np.hanning(int(SR * d)) ** .5
    return sig * p.get('gain', .35)


def s_click(p):
    d = .03; sig = hp(noise(d), 2500) * env_exp(int(SR * d), .004)
    return sig * p.get('gain', .5)


def s_tick(p):           # small mechanical / counter tick
    d = .06; f = p.get('f', 1400)
    n = int(SR * d); t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * f * t) * env_exp(n, .012) + hp(noise(d), 3000) * env_exp(n, .003) * .4
    return sig * p.get('gain', .35)


def s_switch(p):         # light switch: two clicks
    a = s_tick({'f': 2200, 'gain': .5}); b = s_tick({'f': 1600, 'gain': .35})
    out = np.zeros(len(a) + int(SR * .04)); out[:len(a)] += a; out[int(SR * .04):] += b
    return out * p.get('gain', 1)


def s_rustle(p):         # blanket / cloth
    d = p.get('dur', .5)
    x = bp(noise(d), 800, 6000)
    am = (1 + np.sin(2 * np.pi * 13 * np.arange(len(x)) / SR) * .6)
    return x * am * np.hanning(len(x)) * p.get('gain', .25)


def s_heart(p):          # heartbeat: lub-dub
    out = np.zeros(int(SR * .6))
    for off, g in ((0, 1), (.17, .7)):
        b = sweep(70, 45, .18) * env_exp(int(SR * .18), .05) * g
        k = int(SR * off); out[k:k + len(b)] += b
    return lp(out, 200) * p.get('gain', .9)


def s_drip(p):
    d = .14; sig = sweep(1500, 600, d) * env_exp(int(SR * d), .04)
    return tiny_room(sig, .4) * p.get('gain', .35)


def s_creak(p):          # door creak: modulated buzzy tone
    d = p.get('dur', .7); n = int(SR * d); t = np.arange(n) / SR
    f = 180 + 60 * np.sin(2 * np.pi * 1.3 * t) + 20 * RNG.standard_normal(n).cumsum() / np.sqrt(n)
    ph = np.cumsum(f) / SR
    saw = 2 * (ph % 1) - 1
    pulses = (np.sin(2 * np.pi * 38 * t) > .6).astype(float)
    return bp(saw * (.4 + .6 * pulses), 300, 2500) * np.hanning(n) * p.get('gain', .2)


def s_shimmer(p):        # magical phase / transparency
    d = p.get('dur', 1.0); n = int(SR * d); t = np.arange(n) / SR
    sig = sum(np.sin(2 * np.pi * f * t + i) for i, f in enumerate((1318, 1661, 1975, 2637)))
    sig *= (.5 + .5 * np.sin(2 * np.pi * 9 * t)) * np.hanning(n)
    return tiny_room(sig / 4, .5) * p.get('gain', .25)


def s_static(p):         # TV static
    d = p.get('dur', 1.5); x = bp(noise(d), 1500, 9000)
    gate = (RNG.random(int(d * 40)) > .3).repeat(int(SR / 40) + 1)[:len(x)]
    return x * (.6 + .4 * gate) * np.hanning(len(x)) ** .3 * p.get('gain', .12)


def s_bonk(p):
    d = .5; n = int(SR * d); t = np.arange(n) / SR
    sig = sum(a * np.sin(2 * np.pi * f * t) for f, a in ((420, 1), (1130, .5), (2310, .25))) * env_exp(n, .09)
    return tiny_room(sig, .4) * p.get('gain', .4)


def s_crash(p):          # ceramic / glass shatter
    d = p.get('dur', 1.1); n = int(SR * d)
    out = hp(noise(d), 2500) * env_exp(n, .18) * .6
    for _ in range(26):
        f = RNG.uniform(2200, 7500); k = int(RNG.uniform(0, .45) * SR); m = int(SR * .18)
        t = np.arange(m) / SR
        seg = np.sin(2 * np.pi * f * t) * np.exp(-t / .03) * RNG.uniform(.2, .5)
        out[k:k + m] += seg[:len(out[k:k + m])]
    th = s_thud({'gain': .5}); out[:min(n, len(th))] += th[:min(n, len(th))]
    return tiny_room(out, .5) * p.get('gain', .5)


def s_crack(p):          # single glass crack
    d = .35; n = int(SR * d)
    out = hp(noise(d), 3000) * env_exp(n, .02)
    t = np.arange(n) / SR
    for f in (3100, 4700, 6100):
        out += np.sin(2 * np.pi * f * t) * np.exp(-t / .05) * .3
    return tiny_room(out, .4) * p.get('gain', .5)


def s_clank(p):          # metal gear
    d = .6; n = int(SR * d); t = np.arange(n) / SR
    sig = sum(a * np.sin(2 * np.pi * f * t) for f, a in ((310, 1), (797, .7), (1503, .5), (2671, .3))) * env_exp(n, .12)
    return tiny_room(sig, .4) * p.get('gain', .4)


def s_air(p):            # whisper / air waves
    d = p.get('dur', 2.5); n = int(SR * d); t = np.arange(n) / SR
    x = bp(noise(d), 1800, 6000) * (.5 + .5 * np.sin(2 * np.pi * 3.2 * t))
    return x * np.hanning(n) * p.get('gain', .18)


def s_tweet(p):          # dizzy birds
    out = np.zeros(int(SR * 1.0))
    for k in range(4):
        c = sweep(2200, 3000, .08) * np.hanning(int(SR * .08))
        o = int(SR * (k * .22)); out[o:o + len(c)] += c
    return out * p.get('gain', .2)


def s_womp(p):           # fail: two descending tones
    a = sweep(392, 370, .25) * np.hanning(int(SR * .25)); b = sweep(330, 300, .45) * np.hanning(int(SR * .45))
    out = np.zeros(int(SR * .75)); out[:len(a)] += a; out[int(SR * .28):int(SR * .28) + len(b)] += b
    return lp(out, 2500) * p.get('gain', .3)


def s_stamp(p):
    a = s_thud({'gain': .6}); b = s_tick({'f': 900, 'gain': .3}); a[:len(b)] += b
    return a


def s_steps(p):          # soft footsteps
    out = np.zeros(int(SR * p.get('dur', 1.0)))
    k = 0
    while k * .32 < p.get('dur', 1.0) - .1:
        s = lp(noise(.08), 600) * env_exp(int(SR * .08), .02)
        o = int(SR * k * .32); out[o:o + len(s)] += s; k += 1
    return out * p.get('gain', .3)


INSTR = {k[2:]: v for k, v in globals().items() if k.startswith('s_')}


def bed(total):
    n = int(SR * total); t = np.arange(n) / SR
    drone = (np.sin(2 * np.pi * 55 * t) + .6 * np.sin(2 * np.pi * 82.4 * t) + .3 * np.sin(2 * np.pi * 110.3 * t))
    drone *= .55 + .45 * np.sin(2 * np.pi * .07 * t)
    wind = lp(RNG.standard_normal(n), 400) * (.5 + .5 * np.sin(2 * np.pi * .05 * t + 1)) * 1.5
    x = drone * .5 + wind
    fade = np.ones(n); fi, fo = int(SR * 1.5), int(SR * 2.5)
    fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
    return x * fade


def warp_fn(timing):
    orig, new = timing['orig'], timing['new']
    def f(t):
        for (a, b), (A, B) in zip(orig, new):
            if a <= t < b:
                return A + (t - a) * (B - A) / max(b - a, 1e-6)
        a, b = orig[-1]; A, B = new[-1]
        return A + (t - a) * (B - A) / max(b - a, 1e-6)
    return f


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--events', required=True); ap.add_argument('--timing', required=True); ap.add_argument('--out', required=True)
    a = ap.parse_args()
    ev = json.load(open(a.events, encoding='utf-8')); timing = json.load(open(a.timing, encoding='utf-8'))
    total = timing['duration']; warp = warp_fn(timing)
    n = int(SR * (total + 2)); L = np.zeros(n); R = np.zeros(n)
    if ev.get('bed', True):
        b = bed(total) * ev.get('bed_gain', .09); L[:len(b)] += b; R[:len(b)] += b * .97
    placed = 0
    for e in ev['events']:
        fn = INSTR.get(e['type'])
        if not fn:
            print(f'::warning::unknown sfx type {e["type"]}'); continue
        s = fn(e).astype(float)
        t = warp(e['t']); k = int(SR * t)
        if k >= n:
            continue
        pan = e.get('pan', 0.0)
        m = min(len(s), n - k)
        L[k:k + m] += s[:m] * math.sqrt(.5 * (1 - pan)); R[k:k + m] += s[:m] * math.sqrt(.5 * (1 + pan)); placed += 1
    st = np.stack([L, R], 1)[:int(SR * total)]
    peak = np.max(np.abs(st)) or 1
    st = st / peak * 0.7
    import wave
    with wave.open(a.out, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype('<i2').tobytes())
    print(f'placed {placed} sfx events over {total:.1f}s -> {a.out}')


if __name__ == '__main__':
    main()
