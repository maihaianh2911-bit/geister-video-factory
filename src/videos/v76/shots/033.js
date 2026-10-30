// 61.80–65.26: more time — the watch's green segment sweeps far round ("mehr Zeit" 62.42) while the surgeon's hands carefully tie a stitch knot over a gauze pad, pulled tight on "Handgriffe" (64.32).
import { K, DEFS, BG, watch, arm, tag, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const sw = eio(prog(t, 62.2, 63.6)), pass = eio(prog(t, 61.8, 62.8)), loop = eio(prog(t, 62.8, 63.6)), pull = eio(prog(t, 63.7, 64.35));
  const kx = 540, ky = 1060;
  // right hand: holds a curved needle; left hand: holds the thread end
  const rx = lerp(lerp(700, 640, pass), 860, pull), ry = lerp(lerp(1000, 960, pass), 990, pull) - 40 * Math.sin(loop * Math.PI);
  const lx = lerp(lerp(380, 420, loop), 220, pull), ly = lerp(1000, 990, pull) - 30 * Math.sin(loop * Math.PI);
  const loopR = 46 * Math.sin(loop * Math.PI) * (1 - pull) + 6;
  const thread = `<path d="M ${f1(lx)} ${f1(ly)} Q ${f1(lerp(lx, kx, .5))} ${f1(ky - 30)} ${kx} ${ky} M ${kx} ${ky} Q ${f1(lerp(kx, rx, .5))} ${f1(ky - 40)} ${f1(rx - 40)} ${f1(ry + 10)}" fill="none" stroke="${K.ink}" stroke-width="5"/>${loop > 0 ? `<circle cx="${kx}" cy="${f1(ky - loopR)}" r="${f1(loopR)}" fill="none" stroke="${K.ink}" stroke-width="5"/>` : ''}<circle cx="${kx}" cy="${ky}" r="${f1(6 + 6 * pull)}" fill="${K.ink}"/>`;
  const needle = `<path d="M ${f1(rx - 30)} ${f1(ry + 10)} q -40 10 -50 50" fill="none" stroke="${K.steel}" stroke-width="7" stroke-linecap="round"/>`;
  const pad = `<path d="M -80 1100 Q 300 1040 540 1060 Q 800 1080 1160 1050 V 1420 H -80 Z" fill="${K.sheet}" stroke="${K.ink}" stroke-width="5"/><rect x="400" y="1020" width="280" height="90" rx="10" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><path d="M 470 1066 h 140" stroke="${K.sheetD}" stroke-width="4" stroke-dasharray="12 10"/>`;
  const R = arm([1200, 600], [1020, 820], [rx, ry], 1.3, K.coatB, { held: needle }), L = arm([-120, 600], [140, 820], [lx, ly], 1.3, K.coatB);
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="540" cy="900" rx="600" ry="500" fill="url(#nLamp)" opacity=".7"/>${pad}${thread}${R}${L}
    ${watch(250, 400, 140, 40 + sw * 300, (t - 61.8) * 120, { arc: 1 + sw * 300, arcCol: K.lime })}${tag(700, 410, 'MEHR ZEIT', eout(prog(t, 62.35, 62.6)), 70, K.lime)}`;
}
