// shared split-frame for L8b/L9a: left "HANDY AUF DEM TISCH" (phone on the desk), right "HANDY IM NEBENRAUM" (phone on a shelf in the next room)
import { K, person, paper, check, label, pop, f1, T } from './lib.js';
import { examPanel } from './sets.js';
import { gphone } from './base.js';
const INK = K.ink;
// o: t, aL/aR label appear times, checksL / checksR: arrays of times, faceL/faceR overrides, glowL
export function split(o) {
  const t = o.t;
  let s = examPanel(t, 0, 'tisch') + examPanel(t, 540, 'neben');
  s += person('stu1', 250, 1560, .72, { t, seed: 2, look: o.lookL || [10, 16], mouth: o.mouthL || 'flat', brows: o.browsL || 'strain', legs: false, sweat: o.sweatL || 0 });
  s += person('stu3', 790, 1560, .72, { t, seed: 6, look: o.lookR || [-8, 16], mouth: o.mouthR || 'flat', brows: o.browsR || 'calm', legs: false });
  const y = 1260;
  s += `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="#8a6a4a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="24" fill="#a8845e"/>`;
  // papers with check slots
  const sheet = (x, ts) => { let inner = ''; for (let i = 0; i < 3; i++) { inner += `<rect x="-90" y="${-56 + i * 46}" width="110" height="14" rx="7" fill="#9aa6b4"/>`; const tt = ts[i]; if (tt !== undefined && t >= tt) inner += check(66, -50 + i * 46, .8, K.green, (t - tt) / .3); } return paper(x, 1350, 250, 180, -2, inner, { lines: false }); };
  s += sheet(220, o.checksL || []) + sheet(760, o.checksR || []);
  // phone on the left desk (silent, face up, dark with a faint glow)
  s += gphone(420, 1330, .55, 78, { lit: o.glowL === undefined ? .25 : o.glowL, id: 'psp' });
  s += `<rect x="534" y="0" width="12" height="1920" fill="${INK}"/>`;
  s += label('HANDY AUF', 270, 230, 58, { p: pop(t, o.aL, .4) }) + label('DEM TISCH', 270, 300, 58, { p: pop(t, o.aL + .1, .4) });
  s += label('HANDY IM', 810, 230, 58, { p: pop(t, o.aR, .4), fill: '#ffffff' }) + label('NEBENRAUM', 810, 300, 58, { p: pop(t, o.aR + .1, .4), fill: '#ffffff' });
  return s;
}
