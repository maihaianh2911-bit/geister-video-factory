// 21.36–28.06 he broods (hand to chin), then decorates his answer: detail icons keep popping into his bubble
import { K, TEXT, CH, chip, twoShot, cam, speech, thought, car, prog, eio, eout, talk, blink, pop, fade, lerp } from './lib.js';
function battery(x, y) { return `<g transform="translate(${x} ${y})"><rect x="-50" y="-26" width="96" height="52" rx="8" fill="#fff" stroke="${K.ol}" stroke-width="6"/><rect x="46" y="-10" width="10" height="20" fill="${K.ol}"/><rect x="-42" y="-18" width="16" height="36" fill="${K.red}"/></g>`; }
function rain(x, y, t) { return `<g transform="translate(${x} ${y})"><path d="M -50 0 Q -50 -36 -14 -34 Q 0 -60 30 -44 Q 60 -40 56 -10 Q 60 10 30 10 L -34 10 Q -50 10 -50 0 Z" fill="#c9d6e6" stroke="${K.ol}" stroke-width="6"/>${[-24, 0, 24].map((dx, i) => `<path d="M ${dx} ${22 + ((t * 80 + i * 13) % 26)} l -6 14" stroke="${K.blue}" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`; }
function cup(x, y) { return `<g transform="translate(${x} ${y})"><path d="M -34 -30 L 34 -30 L 28 30 L -28 30 Z" fill="${K.cream}" stroke="${K.ol}" stroke-width="6"/><path d="M 34 -18 q 26 0 22 20 q -4 14 -24 12" stroke="${K.ol}" stroke-width="6" fill="none"/><path d="M -10 -44 q -8 -14 0 -26 M 10 -44 q -8 -14 0 -26" stroke="#b7a28a" stroke-width="5" fill="none"/></g>`; }
export default function renderShot(t) {
  const think = 1 - eio(prog(t, 23.6, 24.0));
  const M = { look: -.5 * think - .4 * (1 - think), lookY: -1 * think, brow: .5, mouth: think > .5 ? 'wavy' : 'neutral', talk: talk(t, 23.85, 27.9),
    hR: think > .01 ? [lerp(80, 40, eio(prog(t, 21.6, 22.3)) * think), lerp(-24, -330, eio(prog(t, 21.6, 22.3)) * think)] : [150 + Math.sin(t * 4) * 25, -180], handR: think > .01 ? 'rest' : 'palm', blink: blink(t, 3), sweat: .6 };
  const W = { look: 1, mouth: 'tight' };
  const base = cam(twoShot(t, W, M), 1.45, 700, 900);
  const th = think > 0 && t > 22.9 ? `<g opacity="${think * fade(t, 22.95)}">${thought(390, 420, 160, 120, 600, 640, `<text x="390" y="455" ${TEXT(100)}>?</text>`)}</g>` : '';
  const grow = 1 + .12 * eio(prog(t, 26.5, 27.2));
  const items = [[23.95, 230, 'STAU', x => car(x, 400, .55)], [24.45, 430, 'AKKU LEER', x => battery(x, 380)], [24.98, 630, 'REGEN', x => rain(x, 385, t)], [25.56, 830, 'KAFFEE', x => cup(x, 385)]];
  let inner = '';
  for (const [tt, x, lb, fn] of items) { const a = pop(t, tt); if (a > 0) inner += `<g transform="translate(${x} 410) scale(${a}) translate(${-x} -410)">${fn(x + (lb === 'STAU' ? 10 : 0))}<text x="${x}" y="500" ${TEXT(36)}>${lb}</text></g>`; }
  const more = t > 26.6 ? `<text x="540" y="590" ${TEXT(56)} opacity="${fade(t, 26.6)}">… und noch mehr …</text>` : '';
  const bub = t > 23.8 ? `<g transform="translate(540 450) scale(${pop(t, 23.8) * grow}) translate(-540 -450)">${speech(100, 260, 880, t > 26.6 ? 380 : 290, 640, 700, inner + more)}</g>` : '';
  return base + th + bub + chip(CH[1]);
}
