// 68.74–72.08: only now can researchers study the disc calmly — lab lamp; a white-gloved hand brings a magnifier by its handle over the sun
import { K, DEFS, grain, cam, prog, eio, lerp, f1 } from './lib.js';
import { disc } from './lib.js';
import { fist } from './hands.js';
export default function renderShot(t) {
  const m = eio(prog(t, 70.4, 71.4));
  const lx = lerp(900, 470, m), ly = lerp(1460, 990, m), a = 40 * Math.PI / 180;
  const hx = lx + Math.cos(a) * 260, hy = ly + Math.sin(a) * 260;
  const mag = `<path d="M ${f1(lx + Math.cos(a) * 120)} ${f1(ly + Math.sin(a) * 120)} L ${f1(lx + Math.cos(a) * 340)} ${f1(ly + Math.sin(a) * 340)}" stroke="${K.ink}" stroke-width="44" stroke-linecap="round"/><path d="M ${f1(lx + Math.cos(a) * 120)} ${f1(ly + Math.sin(a) * 120)} L ${f1(lx + Math.cos(a) * 340)} ${f1(ly + Math.sin(a) * 340)}" stroke="#2F3538" stroke-width="32" stroke-linecap="round"/>
    <circle cx="${f1(lx)}" cy="${f1(ly)}" r="120" fill="#E9F3F5" fill-opacity=".3" stroke="${K.ink}" stroke-width="22"/><circle cx="${f1(lx)}" cy="${f1(ly)}" r="120" fill="none" stroke="#7D8589" stroke-width="10"/>
    <path d="M ${f1(lx - 70)} ${f1(ly - 40)} Q ${f1(lx - 40)} ${f1(ly - 80)} ${f1(lx)} ${f1(ly - 86)}" fill="none" stroke="#fff" stroke-width="8" opacity=".7"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#4A4038"/>${cam(`<rect x="-60" y="700" width="1200" height="1300" fill="#D8D2C6"/><circle cx="540" cy="900" r="560" fill="url(#nLamp)" opacity=".7"/><path d="M 420 -60 L 420 220 L 300 380 L 780 380 L 660 220 L 660 -60 Z" fill="#3E4A3A" stroke="${K.ink}" stroke-width="6"/>`
    + disc(540, 1000, 300, { id: 'L', damage: true, sun: .5 * prog(t, 71.2, 71.6) }) + mag + fist(hx, hy, 40, 55, .95, '#F4F4F0', { skin: '#E8EEF0', len: 900 }), lerp(1, 1.08, eio(prog(t, 68.74, 72.08))), 540, 1000)}${grain(t)}`;
}
