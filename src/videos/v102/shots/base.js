// v102 shared scene pieces (sets in this video's moods, du's poses, foreground props)
import { K, f1, op, T, pool, cam, frame, prog, eio, cl, lerp, person, head, shadow, label, pop, chip, mug, phone, laptop, plant, clock } from './lib.js';
import { bedroom2, bedDu, nightstand, room, office2, kitchen } from './sets.js';
import { street } from './sets2.js';
import { G, grey, bar } from './kit.js';
const INK = K.ink;
// night bedroom: dark blue wash over the blurred bedroom, moon in the window
export function nightRoom(t, o = {}) {
  let s = bedroom2(t, { strong: o.strong });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0a1226" opacity="${op(o.dark === undefined ? .55 : o.dark)}"/>`;
  if (o.warm) s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#ff9a3c" opacity="${op(.14 * o.warm)}"/>`;
  if (o.moon !== false) s += `<circle cx="${o.mx || 900}" cy="${o.my || 360}" r="36" fill="#f4eccd" opacity=".9"/>` + pool(o.mx || 900, o.my || 360, 160, 160, '#f4eccd', .3);
  return s;
}
// digital alarm clock (sharp prop), centre-bottom at (x,y)
export function digiClock(x, y, txt, s = 1, ring = 0, t = 0) {
  const sh = ring ? Math.sin(t * 70) * 6 * ring : 0;
  let g = `<g transform="translate(${f1(x + sh)} ${y}) rotate(${f1(sh * .8)}) scale(${s})"><rect x="-120" y="-130" width="240" height="130" rx="22" fill="#2a2a30" stroke="${INK}" stroke-width="6"/><rect x="-100" y="-110" width="200" height="80" rx="10" fill="#160f12"/>${T(0, -48, txt, 60, { fill: '#ff5a4a' })}</g>`;
  if (ring > 0) g = pool(x, y - 70, 200, 140, '#ff5a4a', .35 * ring) + g + `<g stroke="#ffd23f" stroke-width="8" fill="none" stroke-linecap="round" opacity="${op(ring)}"><path d="M ${x - 150} ${y - 150} q -24 -30 -10 -60"/><path d="M ${x + 150} ${y - 150} q 24 -30 10 -60"/></g>`;
  return g;
}
// small table/nightstand top in the sharp foreground (y = top)
export function standTop(x, y, w = 360) {
  return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="600" rx="10" fill="#6b5446" stroke="${INK}" stroke-width="6"/><rect x="${x - w / 2 - 10}" y="${y - 10}" width="${w + 20}" height="34" rx="8" fill="#7e6352" stroke="${INK}" stroke-width="6"/>`;
}
// world colour loss + bar (call after the world, before people that should stay coloured)
export const fadeWorld = (t, k = 1) => grey(G(t) * k);
export { G, grey, bar };
// sharp foreground table edge with a cup and keys (bottom of frame)
export function fgTable(t, y = 1700, o = {}) {
  return `<rect x="-60" y="${y}" width="1200" height="400" fill="${o.col || '#8a6a4f'}" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="24" fill="${o.hi || '#a5826a'}"/>` + mug(o.mx || 150, y + 10, .9, o.mc || '#f2efe8', t, o.steam !== false) + `<g transform="translate(${o.kx || 860} ${y + 30})"><circle cx="0" cy="0" r="22" fill="none" stroke="#c9a86a" stroke-width="7"/><rect x="14" y="-6" width="70" height="14" rx="5" fill="#b8bcc4" stroke="${INK}" stroke-width="3"/></g>`;
}
