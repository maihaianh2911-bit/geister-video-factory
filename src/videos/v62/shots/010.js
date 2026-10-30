// Nerve pathway: a fingertip touches the foot on "Berührungen"; the signal runs up the nerve but fades at the pinched spot, only a faint dot reaches the brain.
import { K, BG, brain, footIcon, prog, eio, eout, lerp, cl } from './lib.js';
export function path(t, o = {}) {
  const PY = 860, sq = o.open ? 1 - o.open : 1;
  let s = BG + `<path d="M 540 500 V 1130" stroke="${K.ol}" stroke-width="48" stroke-linecap="round"/><path d="M 540 500 V 1130" stroke="${K.nerve}" stroke-width="34" stroke-linecap="round"/>`;
  s += `<rect x="${380 - 80 * (1 - sq)}" y="${PY - 90}" width="140" height="180" rx="30" fill="${K.pants}" stroke="${K.ol}" stroke-width="6"/><rect x="${560 + 80 * (1 - sq)}" y="${PY - 90}" width="140" height="180" rx="30" fill="${K.pants}" stroke="${K.ol}" stroke-width="6"/>`;
  return s;
}
export function pulse(y, a, r = 46) { return a > .02 ? `<circle cx="540" cy="${y.toFixed(1)}" r="${r}" fill="${K.white}" opacity="${(a * .9).toFixed(2)}"/><circle cx="540" cy="${y.toFixed(1)}" r="${(r * .5).toFixed(1)}" fill="${K.nerve}" stroke="${K.ol}" stroke-width="3" opacity="${a.toFixed(2)}"/>` : ''; }
export default function renderShot(t) {
  const touch = eout(prog(t, 17.2, 17.58));
  const up = prog(t, 17.6, 18.25), y = lerp(1130, 500, up);
  const a = up <= 0 || up >= 1 ? 0 : (y > 860 ? 1 : .18);
  const recv = prog(t, 18.2, 18.3) > 0 ? .3 : 0;
  return path(t) + brain(540, 340, 1.35, { mouth: 'flat', col: recv ? '#FFB3C1' : K.pink }) + footIcon(533, 1330, 2.2, 0)
    + `<g transform="translate(${lerp(1000, 800, touch)} ${lerp(1200, 1290, touch)}) rotate(-30)"><rect x="-30" y="-10" width="200" height="60" rx="30" fill="${K.skin}" stroke="${K.ol}" stroke-width="5"/></g>`
    + (touch >= 1 && t < 17.9 ? `<circle cx="790" cy="1300" r="${30 + 60 * prog(t, 17.58, 17.9)}" fill="none" stroke="${K.teal}" stroke-width="8" opacity="${1 - prog(t, 17.58, 17.9)}"/>` : '')
    + pulse(y, a);
}
