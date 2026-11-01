// 76.92–83.26 close on her, gently: "Vielleicht hast du deine Gründe … diese Ungereimtheiten müssen geklärt werden." — a door opens, two mismatched pieces appear
import { K, TEXT, CH, chip, twoShot, cam, speech, puzzle, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const W = { look: .7, turn: .3, brow: .35, mouth: 'smile', talk: talk(t, 76.95, 79.3, 7) + talk(t, 79.85, 83.1, 7), hR: [130, -260 + Math.sin(t * 2) * 10], handR: 'palm', blink: blink(t, 1) };
  const M = { look: -1 };
  const base = cam(twoShot(t, W, M), 1.9, 330, 860);
  const op = eio(prog(t, 77.3, 79.0));
  const door = `<g transform="translate(760 370)"><rect x="-80" y="-120" width="160" height="240" fill="#ffe2a6" stroke="${K.ol}" stroke-width="6"/><path d="M -80 -120 L ${-80 + 160 * (1 - op * .7)} ${-120 + 18 * op} L ${-80 + 160 * (1 - op * .7)} ${120 + 18 * op} L -80 120 Z" fill="${K.woodHi}" stroke="${K.ol}" stroke-width="6" stroke-linejoin="round"/><circle cx="${-80 + 140 * (1 - op * .7)}" cy="10" r="8" fill="${K.ol}"/></g>`;
  const pz = pop(t, 81.6);
  const pieces = pz > 0 ? `<g transform="translate(930 380) scale(${pz}) translate(-930 -380)">${puzzle(915, 315, .8, K.blue, 8)}${puzzle(950, 435, .8, K.red, -24)}<text x="1005" y="395" ${TEXT(56, K.red)}>?</text></g>` : '';
  const lab = t > 79.9 ? `<text x="815" y="590" ${TEXT(40)} opacity="${fade(t, 79.9)}">ICH HÖRE DIR ZU</text>` : '';
  const bub = `<g transform="translate(740 400) scale(${pop(t, 77.0)}) translate(-740 -400)">${speech(590, 200, 450, 420, 700, 640, door + pieces + lab)}</g>`;
  return base + bub + chip(CH[4]);
}
