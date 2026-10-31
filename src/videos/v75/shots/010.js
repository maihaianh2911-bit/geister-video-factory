// 23.42–27.42: with only your phone you need another way to pay ("Handy" 24.06, "andere Zahlungsmöglichkeit" 25.94–26.26) — you hold up the phone (still spinning), then shrug with an empty hand; the baker keeps the bread and waits: payment still open (cash only appears later, shot 23)
import { K, DEFS, bust, phone, spinner, crossOut, TX, cam, prog, eio, lerp, f1, cl } from './lib.js';
import { bakery } from './sets.js';
export const cash = (x, y, s = 1, rot = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-80" y="-40" width="160" height="80" rx="8" fill="#9FD8B0" stroke="#0B1026" stroke-width="4"/><circle r="22" fill="none" stroke="#2F7A4A" stroke-width="5"/></g><g transform="translate(${f1(x + 70 * s)} ${f1(y + 40 * s)}) scale(${f1(s)})"><circle r="26" fill="#E8C25A" stroke="#0B1026" stroke-width="4"/></g>`;
export default function renderShot(t) {
  // lift the phone on "Handy" (24.06), shrug with the empty right hand on "andere" (25.94), "?" bubble on "Zahlungsmöglichkeit" (26.26)
  const lift = eio(prog(t, 23.6, 24.3)), shrug = eio(prog(t, 25.7, 26.2)), q = eio(prog(t, 26.1, 26.6));
  const px = lerp(250, 330, lift), py = lerp(1290, 1080, lift);
  const scr = `${spinner(0, -30, 46, t)}<g transform="translate(0 110)">${crossOut(0, 0, 40, eio(prog(t, 24.4, 24.9)))}</g>`;
  const du = bust('du', 300, 1020, 1.2, { look: lift > .5 && shrug < .5 ? .3 : .9, lookY: lift > .5 && shrug < .5 ? .8 : 0, brow: shrug > .5 ? .9 : lift > .5 ? .7 : .2, mouth: shrug > .5 ? 'down' : 'flat',
    aL: [[lerp(200, 230, lift), lerp(1220, 1200, lift)], [px, py + 60]], heldL: phone(px, py, .45, scr),
    aR: [[lerp(420, 470, shrug), lerp(1200, 1160, shrug)], [lerp(400, 560, shrug), lerp(1300, 1080, shrug)]] });
  // baker: one hand on the bread bag on the counter, the other palm-up, waiting
  const bag = `<g transform="translate(700 1090)"><path d="M -60 0 L -50 -120 L 50 -120 L 60 0 Z" fill="#E9DCC0" stroke="${K.ink}" stroke-width="4"/><ellipse cx="0" cy="-128" rx="44" ry="22" fill="${K.bread}" stroke="${K.ink}" stroke-width="3"/></g>`;
  const baker = bust('baker', 860, 1000, 1.15, { look: -.8, brow: shrug > .5 ? .6 : 0, mouth: 'flat', aL: [[760, 1150], [720, 1080]], aR: [[960, 1180], [lerp(990, 930, shrug), lerp(1240, 1180, shrug)]] });
  const bub = q > .01 ? `<g opacity="${f1(cl(q))}" transform="translate(430 640) scale(${f1(.8 + .2 * q)})"><ellipse rx="110" ry="96" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><circle cx="-70" cy="110" r="18" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/>${TX('?', 0, 44, 140, K.ink)}</g>` : '';
  return `${DEFS}${cam(`${bakery()}${bag}${baker}${du}${bub}`, 1, 540, 1000)}`;
}
