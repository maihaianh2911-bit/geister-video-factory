// 10.14–16.46 he tells his story, then silence: camera pushes into her calm stare, a 4-second counter fills
import { K, TEXT, CH, chip, twoShot, cam, speech, office, road, house, prog, eio, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const z = eio(prog(t, 12.45, 13.15));
  const W = { look: lerp(1, .55, z), turn: .25 * z, brow: 0, mouth: t < 12.6 ? 'neutral' : 'tight', lid: .1, blink: t < 12.4 ? blink(t, 1) : 0, dy: t < 12 ? Math.sin(t * 5) * 3 : 0 };
  const M = { look: -1, talk: talk(t, 10.2, 11.9), hR: [140 + Math.sin(t * 4) * 20, -170], handR: 'palm', blink: blink(t, 4) };
  const bo = 1 - fade(t, 11.95, .4);
  const story = bo > 0 ? `<g opacity="${bo}">${speech(470, 300, 560, 220, 760, 600, `${office(580, 470, .8)}<path d="M 640 420 L 680 420" stroke="${K.ol}" stroke-width="7"/>${road(745, 470, .8)}<path d="M 800 420 L 840 420" stroke="${K.ol}" stroke-width="7"/>${house(920, 470, .75)}`)}</g>` : '';
  const scene = cam(twoShot(t, W, M) + story, lerp(1, 2.05, z), lerp(540, 300, z), lerp(960, 830, z));
  let cnt = '';
  if (t > 12.7) {
    const times = [12.95, 13.9, 14.78, 15.66];
    cnt += `<g opacity="${fade(t, 12.7)}"><rect x="250" y="250" width="580" height="170" rx="40" fill="${K.ink}" opacity=".85"/>`;
    times.forEach((tt, i) => { const on = pop(t, tt, .3); cnt += `<circle cx="${345 + i * 130}" cy="335" r="46" fill="none" stroke="${K.cream}" stroke-width="6" opacity=".6"/>${on > 0 ? `<g transform="translate(${345 + i * 130} 335) scale(${on})"><circle r="46" fill="${K.accent}"/><text y="22" ${TEXT(60, K.cream)}>${i + 1}</text></g>` : ''}`; });
    cnt += `</g>${t > 14.78 ? `<g opacity="${fade(t, 14.78)}"><text x="540" y="500" ${TEXT(52, K.cream)} stroke="${K.ink}" stroke-width="10" paint-order="stroke">3–4 SEKUNDEN</text></g>` : ''}`;
  }
  return scene + cnt + chip(CH[1]);
}
