// 33.22–35.48: the hand lifts the egg out carefully ("heraus") and rinses it under the tap ("spüle")
import { K, OL, f1, stick, cam, prog, eio, lerp, hash } from './lib.js';
import { kitchen, glass, egg, C, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 33.3, 33.95)), mv = eio(prog(t, 34.0, 34.5));
  const ex = lerp(720, 380, mv), ey = lerp(TY - 60, 820, lift) + mv * 40;
  const tap = `<path d="M 300 560 H 380 V 640" fill="none" stroke="#9AA3AB" stroke-width="30" stroke-linejoin="round"/><path d="M 300 560 H 380 V 640" fill="none" ${OL(6)}/>`;
  let water = '';
  if (t > 34.55) for (let i = 0; i < 7; i++) { const ph = (t * 3 + i / 7) % 1; water += `<circle cx="${f1(380 + (hash(i) - .5) * 16)}" cy="${f1(650 + ph * 200)}" r="7" fill="${C.water}" ${OL(3)}/>`; }
  const stream = t > 34.55 ? `<path d="M 380 645 V ${f1(ey - 40)}" stroke="${C.water}" stroke-width="18" opacity=".8"/>` : '';
  const e = egg(ex, ey, .62, { id: 'e14', shell: 0 });
  const fig = stick(560, FY, FS, { hL: [ex + 6, ey + 40], hR: [700, 1150], look: -.8, lookY: .3, brow: 'calm', mouth: 'smile', over: e });
  return cam(`${kitchen()}${tap}${glass(720, TY, .9, { id: 'g14', level: .78 })}${stream}${water}${fig}`, 1.4, 540, 900, 0, 20);
}
