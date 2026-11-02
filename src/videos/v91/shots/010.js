// L9 32.92–36.68 du realises: the truth can be said hard (spiky red bubble, left, on "hart") or kind (round green bubble, right, on "freundlich").
import { K, frame, bg, shadow, person, chip, T, cam, prog, eio, eout, pop, f1 } from './lib.js';
function spiky(x, y, r, n, p, col) {
  if (p <= 0) return '';
  let d = '';
  for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n, rr = i % 2 ? r * .78 : r * 1.08; d += `${i ? 'L' : 'M'} ${f1(x + Math.cos(a) * rr * 1.25)} ${f1(y + Math.sin(a) * rr * .8)} `; }
  return `<g transform="translate(${x} ${y}) scale(${f1(p * 100) / 100}) translate(${-x} ${-y})"><path d="${d}Z" fill="#fff" stroke="${col}" stroke-width="9" stroke-linejoin="round"/></g>`;
}
export default function renderShot(t) {
  let s = bg('bar', { sc: 1.08 });
  s += shadow(540, 1380, 110);
  const look = t < 34.6 ? [0, -10] : t < 35.5 ? [-16, -6] : [16, -6];
  s += person('du', 540, 1380, 1, { t, seed: 1, look, eyes: 'n', mouth: 'flat', armR: t > 33.2 ? [70, -470] : null, headTilt: t > 35.5 ? 6 : (t > 34.6 ? -6 : 0) });
  const ph = eout(prog(t, 34.76, 35.2)), pf = eout(prog(t, 35.58, 36.0));
  s += spiky(270, 700, 180, 11, ph, K.red) + (ph > 0 ? T(270, 718, 'HART', 64, { fill: K.red, op: ph }) : '');
  if (pf > 0) s += `<g transform="translate(810 700) scale(${f1(pf * 100) / 100})"><ellipse rx="210" ry="130" fill="#fff" stroke="${K.green}" stroke-width="9"/><circle cx="-90" cy="150" r="22" fill="#fff" stroke="${K.green}" stroke-width="6"/></g>` + T(810, 718, 'FREUNDLICH', 54, { fill: K.green, op: pf });
  s += chip(540, 330, 'DIE WAHRHEIT', { p: pop(t, 34.04, .4), size: 60 });
  return frame(cam(s, 540, 960, 1 + .04 * eio(prog(t, 32.92, 36.68))));
}
