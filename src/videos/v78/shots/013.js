// 31.82–35.56: after the ride your skin feels sticky ("klebrig" 32.3) once the sweat dries ("trocknet" 34.64) — you pull the shirt off your chest, it clings back; sweat drops fade into sticky streaks
import { K, OL, f1, stick, card, calNote, cam, prog, eio, lerp } from './lib.js';
import { bathroom, sweat, FY, FS } from './sets.js';
export default function renderShot(t) {
  const pull = Math.max(0, Math.sin((t - 32.0) * 5)) * (t > 32.0 && t < 34.0 ? 1 : 0), dry = eio(prog(t, 33.9, 34.9));
  const fig = stick(540, FY, FS, { shirt: K.teal, look: -.3, lookY: .7, mouth: 'worried', brow: 'knit', hR: [lerp(600, 640, pull), lerp(950, 920, pull)], hL: [440, 1100],
    over: `${[[500, 940], [575, 1000], [520, 1060]].map(([x, y]) => sweat(x, y, 14, 1 - dry)).join('')}${dry > 0 ? `<path d="M 490 960 q 10 30 0 60 M 570 1010 q -8 30 0 50" stroke="${K.skinD}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${f1(dry)}"/>` : ''}` });
  return `${cam(`${bathroom({ sink: false })}${fig}`, 1.4, 540, 880)}${card(540, 330, 'KLEBRIG', 72, eio(prog(t, 32.2, 32.5)))}${calNote(900, 150, ['AM', 'WOCHENENDE'])}`;
}
