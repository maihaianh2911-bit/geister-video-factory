// 83.26–90.11 the red tension line between them relaxes into a calm wave; then her notebook shows the contradictions are noted
import { K, TEXT, CH, chip, twoShot, cam, notebook, magnifier, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const rel = eio(prog(t, 84.6, 85.4)), push = eio(prog(t, 86.0, 86.7)), mk = prog(t, 87.6, 87.9) + prog(t, 88.1, 88.4);
  const W = { look: lerp(1, .6, push), lookY: push * .8 * (1 - prog(t, 88.9, 89.3)), brow: 0, mouth: 'smile', hR: [lerp(80, 120, push), lerp(-24, 10, push)], blink: blink(t, 1) };
  const M = { look: -1, lookY: push * .7, brow: lerp(.9, .1, rel), mouth: rel > .5 ? 'neutral' : 'tight', dy: lerp(-8, 6, rel), blink: blink(t, 2), sweat: (1 - rel) * .8 };
  let d = '';
  for (let i = 0; i <= 24; i++) { const x = 430 + i * 9.5, amp = lerp(36, 14, rel), y = 690 + (rel < 1 ? (i % 2 ? -amp : amp) * (1 - rel) : 0) + Math.sin(i * .6 + t * 3) * 14 * rel; d += `${i ? 'L' : 'M'} ${x} ${y} `; }
  const col = rel > .5 ? K.green : K.red;
  const line = `<path d="${d}" stroke="${col}" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  const nb = notebook(lerp(330, 400, push), 1350, 1.3, mk);
  const mg = mk > 0 ? magnifier(lerp(560, 470, eio(prog(t, 87.6, 88.3))), 1300, .6, 30) : '';
  const lab = mk > .5 ? `<g opacity="${fade(t, 87.8)}"><rect x="200" y="480" width="680" height="90" rx="45" fill="${K.ink}" opacity=".88"/><text x="540" y="542" ${TEXT(42, K.cream)}>WIDERSPRÜCHE NOTIERT</text></g>` : (rel > .5 ? `<g opacity="${fade(t, 85.1) * (1 - fade(t, 87.4))}"><rect x="200" y="480" width="680" height="90" rx="45" fill="${K.ink}" opacity=".88"/><text x="540" y="542" ${TEXT(42, K.cream)}>KEINE KONFRONTATION</text></g>` : '');
  return cam(twoShot(t, W, M) + line + nb + mg, lerp(1, 1.06, eio(prog(t, 83.3, 90))), 540, 1000) + lab + chip(CH[4]);
}
