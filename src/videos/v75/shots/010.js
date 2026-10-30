// 23.42–27.42: with only your phone you need another way to pay ("Handy" 24.06, "andere Zahlungsmöglichkeit" 25.94–26.26) — you look at the phone, then hand cash to the baker
import { K, DEFS, bust, phone, TX, cam, prog, eio, lerp, f1 } from './lib.js';
import { bakery } from './sets.js';
export const cash = (x, y, s = 1, rot = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-80" y="-40" width="160" height="80" rx="8" fill="#9FD8B0" stroke="#0B1026" stroke-width="4"/><circle r="22" fill="none" stroke="#2F7A4A" stroke-width="5"/></g><g transform="translate(${f1(x + 70 * s)} ${f1(y + 40 * s)}) scale(${f1(s)})"><circle r="26" fill="#E8C25A" stroke="#0B1026" stroke-width="4"/></g>`;
export default function renderShot(t) {
  const look = eio(prog(t, 23.5, 24.2)) * (1 - eio(prog(t, 25.3, 25.8))), give = eio(prog(t, 25.6, 26.4));
  const du = bust('du', 300, 1020, 1.2, { look: look > .5 ? .3 : 1, lookY: look > .5 ? .8 : 0, brow: look > .5 ? .8 : .2, mouth: look > .5 ? 'down' : 'flat',
    aL: [[200, 1200], [lerp(240, 300, look), lerp(1300, 1120, look)]], heldL: look > .05 ? phone(lerp(240, 300, look), lerp(1300, 1080, look), .45, `<g transform="rotate(${f1(t * 300 % 360)})"><circle r="30" fill="none" stroke="#B6BED8" stroke-width="10" stroke-dasharray="60 130"/></g>`) : '',
    aR: [[lerp(420, 520, give), lerp(1200, 1120, give)], [lerp(400, 640, give), lerp(1300, 1060, give)]], heldR: give > .05 ? cash(lerp(400, 660, give), lerp(1290, 1030, give), .9) : '' });
  const baker = bust('baker', 860, 1000, 1.15, { look: -.8, brow: 0, mouth: give > .8 ? 'smile' : 'flat', aL: [[760, 1150], [lerp(760, 700, give), lerp(1260, 1060, give)]] });
  return `${DEFS}${cam(`${bakery()}${baker}${du}`, 1, 540, 1000)}`;
}
