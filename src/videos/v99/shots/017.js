// L9a 40.2–44.6: three participants (round black heads) each hold a notebook and write; a flip calendar counts the days 1 → 10 ("zehn Tage" 42.88–44.4); label 10 TAGE.
import { K, frame, cam, prog, eio, pop, label, person, shadow, f1 } from './lib.js';
import { studyRoom } from './sets.js';
import { calendar } from './props.js';
const INK = K.ink;
const pad = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-70" y="-90" width="140" height="180" rx="10" fill="#2f6f8f" stroke="${INK}" stroke-width="5"/><rect x="-58" y="-78" width="116" height="156" rx="4" fill="#fbf8ef"/><path d="M -44 -50 H 44 M -44 -20 H 44 M -44 10 H 30 M -44 40 H 40" stroke="#9fb7d6" stroke-width="5"/></g>`;
export default function renderShot(t) {
  let s = studyRoom(t);
  const P = [['stu3', 200, 1660, 0], ['mate', 540, 1600, 1.3], ['stu4', 880, 1660, 2.1]];
  P.forEach(([w, x, y, ph], i) => {
    const wr = Math.sin(t * 9 + ph) * 14;
    s += shadow(x, y, 150);
    s += person(w, x, y, .78, { t, seed: 7 + i, look: [i === 0 ? 8 : i === 2 ? -8 : 0, 14], brows: 'calm', mouth: 'small', armL: [-60, -330], elbowL: [-170, -360], armR: [40 + wr, -340], elbowR: [160, -360], front: pad(-10, -350, i === 1 ? 0 : (i === 0 ? 6 : -6)) + `<path d="M ${f1(40 + wr)} -340 l 26 -60" stroke="#2f5fb5" stroke-width="10" stroke-linecap="round"/>` });
  });
  // calendar flips day 1..10 between 42.88 and 44.4
  const d = 1 + 9 * prog(t, 42.88, 44.4), day = Math.min(10, Math.floor(d)), fl = day < 10 && t > 42.88 ? d - day : 0;
  s += calendar(540, 560, 1.05, 'TAG', day, { flip: fl, prev: day });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 40.2, 44.6)));
  s += label('10 TAGE', 540, 260, 104, { p: pop(t, 42.9, .45) });
  return frame(s);
}
