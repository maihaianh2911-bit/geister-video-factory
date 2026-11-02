// L12b 57.18–60.1: three participants each write in a notebook in the evening; a calendar flips 1 → 7; label 7 ABENDE.
import { K, frame, cam, prog, eio, pop, label, person, shadow, f1 } from './lib.js';
import { studyRoom } from './sets.js';
import { calendar } from './props.js';
const INK = K.ink;
const pad = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-70" y="-90" width="140" height="180" rx="10" fill="#2f6f8f" stroke="${INK}" stroke-width="5"/><rect x="-58" y="-78" width="116" height="156" rx="4" fill="#fbf8ef"/><path d="M -44 -50 H 44 M -44 -20 H 44 M -44 10 H 30" stroke="#9fb7d6" stroke-width="5"/></g>`;
export default function renderShot(t) {
  let s = studyRoom(t);
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#1a1a3a" opacity=".3"/>`;
  [['stu3', 200, 1660, 0], ['dat1', 540, 1600, 1.3], ['stu4', 880, 1660, 2.1]].forEach(([w, x, y, ph], i) => {
    const wr = Math.sin(t * 9 + ph) * 14;
    s += shadow(x, y, 150) + person(w, x, y, .78, { t, seed: 7 + i, look: [0, 14], brows: 'calm', mouth: 'small', armL: [-60, -330], elbowL: [-170, -360], armR: [40 + wr, -340], elbowR: [160, -360], front: pad(-10, -350, i === 1 ? 0 : (i ? -6 : 6)) + `<path d="M ${f1(40 + wr)} -340 l 26 -60" stroke="#2f5fb5" stroke-width="10" stroke-linecap="round"/>` });
  });
  const d = 1 + 6 * prog(t, 57.4, 59.8), day = Math.min(7, Math.floor(d)), fl = day < 7 && t > 57.4 ? d - day : 0;
  s += calendar(540, 600, 1.05, 'ABEND', day, { flip: fl, prev: day });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 57.18, 60.1)));
  s += label('7 ABENDE', 540, 250, 104, { p: pop(t, 57.3, .45) });
  return frame(s);
}
