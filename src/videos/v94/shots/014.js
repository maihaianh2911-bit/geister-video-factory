// L8a 35.56–38.60: "KEIN ZUFALL" (35.96); 1920s study: the psychologist writes in her notebook; name chip "Bljuma Zeigarnik" on her name (37.58).
import { K, frame, person, cam, shadow, chip, label, paper, pen, T, pop, prog, eio } from './lib.js';
import { study } from './sets.js';
export default function renderShot(t) {
  let s = study(t);
  const wr = Math.sin(t * 10) * 14;
  s += shadow(470, 1640) + person('zeig', 470, 1640, 1, { t, look: [10, 16], brows: 'calm', mouth: 'small', armR: [150 + wr, -330], elbowR: [230, -420], armL: [-60, -340], elbowL: [-200, -420] });
  // desk (sharp foreground) with notebook
  s += `<rect x="-60" y="1300" width="1200" height="700" fill="#5a3a26" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1300" width="1200" height="30" fill="#7a5038"/>`;
  s += paper(560, 1360, 360, 200, -4, T(-120, -40, 'unterbrochen', 26, { anchor: 'start', fill: '#22324d', w: 700 }) + T(-120, 10, 'erledigt', 26, { anchor: 'start', fill: '#22324d', w: 700 }), { lines: false });
  s += pen(640 + wr, 1330, .9, 35);
  s += `<path d="M 860 1300 l 0 -40 l 120 0 l 0 40" fill="#c9a86a" stroke="${K.ink}" stroke-width="4"/><path d="M 870 1260 l 0 -30 l 100 0 l 0 30" fill="#8a3a2a" stroke="${K.ink}" stroke-width="4"/>`;
  s = cam(s, 540, 1050, 1.0 + .07 * eio(prog(t, 35.56, 38.6)), 30 * prog(t, 35.56, 38.6), 0);
  s += label('KEIN ZUFALL', 540, 250, 104, { p: pop(t, 35.96, .45) });
  const p = pop(t, 37.58, .4);
  if (p > 0) s += `<g transform="translate(760 560) scale(${Math.max(.01, p)})">${chip(0, 0, 'Bljuma Zeigarnik', { size: 46 })}${chip(0, 86, 'Psychologin', { size: 34, bg: K.yellow })}</g>`;
  return frame(s);
}
