// L13b 65.86–68.6: close-up of the phone (video call) in du's hands: Opa (white hair, white moustache, brown sweater) fills the screen;
// on "freut sich" (66.0) his eyes turn happy, a tear of joy runs down; on "kaum weiß, was er sagen soll" (67.2) his mouth opens in a speechless "o".
import { K, frame, cam, prog, eio, person, f1, op, head, T } from './lib.js';
import { kitchen } from './sets.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#000" opacity=".12"/>`;
  // phone (portrait) 560×1000 centred at 540,820
  let sc = `<defs><clipPath id="v103vc21"><rect x="-260" y="-470" width="520" height="940" rx="30"/></clipPath><linearGradient id="v103vb21" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c3a3"/><stop offset="1" stop-color="#b89a76"/></linearGradient></defs>`;
  let inner = `<rect x="-260" y="-470" width="520" height="940" fill="url(#v103vb21)"/><rect x="-200" y="-420" width="160" height="200" fill="#e8dcc8"/><rect x="-188" y="-408" width="136" height="176" fill="#9fb3a8"/><rect x="120" y="-380" width="100" height="220" fill="#8a6a4a"/>`;
  const happy = t > 66.0, o = t > 67.2;
  inner += person('opa', 0, 700, 1.25, { t, seed: 11, look: [0, 0], eyes: happy ? 'happy' : 'n', brows: 'up', mouth: o ? 'o' : (happy ? 'grin' : 'smile'), still: false });
  if (happy) { const p = prog(t, 66.3, 68.4); inner += `<path d="M -70 ${f1(-160 + 160 * p)} q 14 22 0 32 q -14 -10 0 -32 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="3" opacity="${op(1 - p * .7)}"/>`; }
  // small self-view
  inner += `<rect x="90" y="200" width="150" height="220" rx="16" fill="#cfe3ee" stroke="#fff" stroke-width="5"/>` + head('du', 165, 300, .3, { t, seed: 1, eyes: 'happy', mouth: 'grin', blink: false });
  inner += T(-230, -430, 'OPA · 0:12', 30, { anchor: 'start', fill: '#fff', w: 800, stroke: '#0006', sw: 6 });
  let g = `<rect x="-280" y="-500" width="560" height="1000" rx="56" fill="${INK}"/>` + sc + `<g clip-path="url(#v103vc21)">${inner}</g>`;
  s += `<g transform="translate(540 820) rotate(${f1(-3 + 1.5 * Math.sin(t * 1.2))})">${g}</g>`;
  // du's hands holding the phone at both sides
  for (const sd of [-1, 1]) s += `<path d="M ${540 + sd * 560} 1600 Q ${540 + sd * 420} 1300 ${540 + sd * 290} 1180" stroke="${INK}" stroke-width="100" fill="none" stroke-linecap="round"/><path d="M ${540 + sd * 560} 1600 Q ${540 + sd * 420} 1300 ${540 + sd * 296} 1190" stroke="${K.du}" stroke-width="84" fill="none" stroke-linecap="round"/><circle cx="${540 + sd * 286}" cy="1170" r="44" fill="${INK}"/>`;
  return frame(cam(s, 540, 860, 1.0 + .06 * eio(prog(t, 65.86, 68.6))));
}
