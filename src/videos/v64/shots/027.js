// 53.6–55.72: inside afterwards — glass on the floor, a gap where the wall was; a passenger with a bandaged head, another holds his arm ("leicht verletzt")
import { K, DEFS, interior, person, grain, cam, f1, prog, eout, lerp } from './lib.js';
import { crowd } from './cabin.js';
export default function renderShot(t) {
  const b = eout(prog(t, 54.6, 55.0));
  let glass = '';
  for (let i = 0; i < 14; i++) glass += `<path d="M 0 -10 L 12 6 L -10 8 Z" transform="translate(${f1(380 + hash2(i) * 320)} ${f1(1290 + hash2(i + 9) * 120)}) rotate(${f1(hash2(i + 3) * 360)})" fill="${K.glass}" stroke="${K.ink}" stroke-width="3"/>`;
  const p = person(560, 1400, .95, { hat: 'fedora', col: '#6A5A4A', brow: .5, mouth: 'flat', aR: [50, 110], aL: [8, 10], look: 0 });
  return `${DEFS}${cam(`${interior(t, { hole: true })}${crowd(t, 1260, .3, { band: b > .5 })}${glass}${p.svg}`, 1.05, 540, 950)}${grain(t)}`;
}
const hash2 = n => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };
