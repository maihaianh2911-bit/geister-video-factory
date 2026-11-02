// L9c 41.14–43.48: du slumped on the sofa (right), a guitar and a book (du's own plans) on the left. A thought bubble of the plans (guitar + book) pops on "Pläne" (41.76) and greys out / shrinks on "nichts mehr übrig" (42.32).
import { frame, cam, pop, prog, eio, room, sitOnSofa, batOver, duBat, guitar, picThought, K, f1 } from './all.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 45, sofa: false, light: .3 });
  s += guitar(170, 1500, 1.1, -10, .35);
  s += `<g transform="translate(300 1520) rotate(-4)"><rect x="-90" y="-36" width="180" height="36" fill="#c25b4e" stroke="${K.ink}" stroke-width="5"/><rect x="-80" y="-70" width="160" height="34" fill="#e0b04a" stroke="${K.ink}" stroke-width="5"/></g>`;
  s += sitOnSofa('du', 680, 1300, .95, { t, seed: 1, eyes: 'tired', brows: 'sad', mouth: 'frown', hunch: 1, look: [-14, 6] }, { x: 680, w: 640 });
  s += batOver(680, 1300 + 150 * .95, .95, duBat(t).lvl, { t, hunch: 1, blink: true, bdy: 40 });
  const grey = eio(prog(t, 42.32, 42.9)), shrink = 1 - .35 * eio(prog(t, 42.6, 43.3));
  const inner = guitar(-80, 90, .3, -10) + `<g transform="translate(80 40)"><rect x="-70" y="-40" width="140" height="90" rx="6" fill="#5f8fb5" stroke="${K.ink}" stroke-width="5"/><path d="M 0 -40 V 50" stroke="${K.ink}" stroke-width="4"/></g><rect x="-200" y="-130" width="400" height="260" fill="#55606e" opacity="${f1(grey * .8 * 100) / 100}"/>`;
  s += picThought(400, 560, 400, 280, 620, 760, inner, pop(t, 41.76) * shrink);
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 41.14, 43.48)), -30 * prog(t, 41.14, 43.48)), { base: '#1c2230' });
}
