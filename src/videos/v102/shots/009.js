// L5a 18.0–19.82: MITTWOCH. Grey-blue dawn in the bedroom, alarm clock 06:30 rings on the nightstand; du in bed opens only half his eyes; chip "WIEDER 6 STUNDEN" on "sechs Stunden" (18.7). World greyer (meter ~55 %).
import { frame, cam, prog, eio, pop, chip, dayCard, f1 } from './lib.js';
import { bedDu } from './sets.js';
import { nightRoom, digiClock, standTop, fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = nightRoom(t, { dark: .3, moon: false });
  const o = eio(prog(t, 18.9, 19.3));
  s += bedDu(t, { hx: 330, hy: 980, eyes: o > .5 ? 'tired' : 'closed', look: [16, 6], brows: 'sad', mouth: 'flat', blink: false });
  const ring = t < 19.6 ? 1 : 0;
  s += standTop(870, 1330, 360) + digiClock(870, 1320, '06:30', 1, ring, t);
  s += fadeWorld(t);
  s = cam(s, 540, 1050, 1.0 + .05 * eio(prog(t, 18.0, 19.82)));
  s += dayCard(t, 18.02, 'MITTWOCH', { y: 330 });
  const c = pop(t, 18.7, .4);
  if (c > 0) s += `<g transform="translate(540 520) scale(${f1(Math.max(.01, c) * 1000) / 1000}) translate(-540 -520)">${chip(540, 520, 'WIEDER 6 STUNDEN', { size: 46, bg: '#2b3566', fill: '#fff' })}</g>`;
  s += bar(t);
  return frame(s);
}
