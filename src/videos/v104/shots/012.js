// L7b 37.68–41.4: two example habits in split panels: top, a person (bun, purple) at the breakfast table drinks a glass of water ("Glas Wasser", 38.16);
// bottom, a person (cap) does a few minutes of exercise, arms up and down ("Sport", 40.5).
import { K, frame, cam, prog, eio, pop, person, shadow, f1, mug } from './lib.js';
import { kitchen, room } from './sets.js';
const INK = K.ink;
export default function renderShot(t) {
  // top panel (y 0..960): kitchen breakfast
  const dr = eio(prog(t, 38.1, 38.6)) * (1 - eio(prog(t, 39.6, 40.0)));
  let top = kitchen(t, { strong: true });
  top += person('bun', 520, 1600, 1.0, { t, seed: 5, legs: false, look: [6, -6 * dr], eyes: dr > .6 ? 'closed' : 'n', brows: 'calm', mouth: dr > .6 ? 'small' : 'smile', armR: [60 + 10 * dr, -560 - 140 * dr], elbowR: [200, -420] });
  // glass in the hand
  const gx = 520 + 60 + 10 * dr, gy = 1600 - 560 - 140 * dr;
  top += `<g transform="translate(${f1(gx)} ${f1(gy)})"><path d="M -30 -70 L 30 -70 L 24 30 L -24 30 Z" fill="#cfe9f7" stroke="${INK}" stroke-width="5" opacity=".95"/><rect x="-26" y="${f1(-40 + 40 * dr)}" width="52" height="${f1(66 - 40 * dr)}" fill="#7fc0e8" opacity=".8"/></g>`;
  top += `<rect x="-200" y="1440" width="1480" height="600" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-200" y="1440" width="1480" height="24" fill="#c9a26b"/>` + mug(300, 1444, 1, '#f2efe8', t, true) + `<ellipse cx="760" cy="1446" rx="110" ry="22" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><circle cx="730" cy="1430" r="26" fill="#f2c14e" stroke="${INK}" stroke-width="4"/>`;
  // bottom panel: exercise in the living room
  const ex = t > 40.0 ? Math.abs(Math.sin((t - 40.0) * 4.2)) : 0;
  let bot = room(t, { mood: 'day', strong: true, hh: 7, mm: 30 });
  bot += shadow(540, 1640) + person('cap', 540, 1640, 1.0, { t, seed: 6, look: [0, -4], brows: 'strain', mouth: 'smile', armL: [-260 + 60 * ex, -560 - 340 * ex], elbowL: [-260, -560 - 140 * ex], armR: [260 - 60 * ex, -560 - 340 * ex], elbowR: [260, -560 - 140 * ex], drops: ex > .9 ? [t] : [] });
  bot += `<rect x="180" y="1640" width="720" height="30" rx="12" fill="#7a5ab5" stroke="${INK}" stroke-width="5"/>`;
  const a = pop(t, 39.84, .45);
  let s = `<defs><clipPath id="v104tp12"><rect x="0" y="0" width="1080" height="955"/></clipPath><clipPath id="v104bp12"><rect x="0" y="965" width="1080" height="955"/></clipPath></defs>`;
  s += `<g clip-path="url(#v104tp12)"><g transform="translate(0 -480) scale(1)">${cam(top, 540, 1100, 1.0 + .04 * eio(prog(t, 37.68, 41.4)))}</g></g>`;
  s += `<g clip-path="url(#v104bp12)" opacity="${(.45 + .55 * Math.min(1, a * 1.6)).toFixed(2)}"><g transform="translate(0 160)">${cam(bot, 540, 1100, 1.0 + .04 * eio(prog(t, 39.8, 41.4)))}</g></g>`;
  s += `<rect x="-10" y="952" width="1100" height="16" fill="${INK}"/>`;
  return frame(s);
}
