// 0–3.58: cover — a German kitchen; on "nie" the fridge fades to a dashed empty outline; headline OHNE KÜHLSCHRANK
import { K, DEFS, kitchen, kcard, milk, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const gone = eio(prog(t, 1.9, 2.6));
  const sc = `${kitchen(t, { fridge: 1 - gone, ghost: gone })}${milk(300, 940, 1.2)}
    <rect x="420" y="900" width="160" height="100" rx="10" fill="#D9A15A" stroke="${K.ink}" stroke-width="4"/>`;
  return `${DEFS}${cam(sc, lerp(1.05, 1.12, eio(prog(t, 0, 3.58))), 700, 800)}${kcard(540, 1300, 'OHNE KÜHLSCHRANK', 1, { sz: 78, col: K.sun })}`;
}
