// 58.84–62.42 his smooth story flow (Büro → Straße → Zuhause) is hit by the unexpected mall card and tumbles out of order
import { K, TEXT, CH, chip, twoShot, cam, office, road, house, mall, prog, eio, eout, ein, blink, fade, pop, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const drop = eout(prog(t, 59.55, 59.85)), mess = eio(prog(t, 60.8, 61.5));
  const M = { look: -1 + 2 * mess * (Math.sin(t * 7) > 0 ? 1 : -.4), brow: .4 + .6 * mess, mouth: mess > .3 ? 'wavy' : 'tight', sweat: mess, lid: 0, blink: mess > 0 ? 0 : blink(t, 2) };
  const W = { look: 1, mouth: 'tight' };
  const base = cam(twoShot(t, W, M), 1.4, 700, 820);
  const flow = (t - 58.84) * 40 * (1 - mess);
  const tiles = [o => office(0, 60, .8), o => road(0, 60, .85), o => house(0, 60, .75)];
  let s = `<rect x="40" y="235" width="1000" height="370" rx="40" fill="${K.cream}" stroke="${K.ol}" stroke-width="6" opacity=".95"/><text x="540" y="320" ${TEXT(42)}>${mess > .5 ? 'DURCHEINANDER' : 'ERZÄHLFLUSS'}</text>`;
  if (mess < .99) s += `<path d="M 120 450 Q 330 400 540 450 T 960 450" stroke="${K.blue}" stroke-width="12" fill="none" opacity="${.5 * (1 - mess)}" stroke-dasharray="30 18" stroke-dashoffset="${-flow * 2}"/>`;
  tiles.forEach((fn, i) => {
    const x0 = 230 + i * 310, y0 = 440;
    const x = lerp(x0, [760, 210, 520][i] + (hash(i) - .5) * 60, mess), y = lerp(y0 + Math.sin(t * 3 + i) * 8, [400, 500, 520][i], mess), r = lerp(0, [-28, 22, -14][i], mess);
    s += `<g transform="translate(${x} ${y}) rotate(${r}) scale(.8)"><rect x="-100" y="-100" width="200" height="200" rx="26" fill="#fff" stroke="${K.ol}" stroke-width="6"/>${fn()}</g>`;
  });
  if (drop > 0) s += `<g transform="translate(${lerp(540, 480, mess)} ${lerp(-200, 440, drop) - mess * 20}) rotate(${lerp(0, 18, mess)}) scale(.8)"><rect x="-110" y="-100" width="220" height="200" rx="26" fill="#fff" stroke="${K.red}" stroke-width="10"/>${mall(0, 70, .6)}<text x="0" y="-60" ${TEXT(56, K.red)}>!</text></g>`;
  return base + s + chip(CH[3]);
}
