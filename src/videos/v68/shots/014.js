// 33.22–35.48: the hand lifts the egg out carefully ("heraus") and rinses it under the tap ("spüle")
import { K, OL, f1, stick, cam, prog, eio, lerp, hash } from './lib.js';
import { kitchen, glass, egg, C, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 33.3, 33.95)), mv = eio(prog(t, 34.0, 34.5));
  const ex = lerp(720, 880, mv), ey = lerp(TY - 60, 840, lift) + mv * 10;
  const tap = `<rect x="1050" y="660" width="90" height="70" fill="#9AA3AB" ${OL(6)}/><path d="M 1050 695 H 880 V 735" fill="none" stroke="#9AA3AB" stroke-width="30" stroke-linejoin="round"/><path d="M 1050 695 H 880 V 735" fill="none" ${OL(6)}/>`;
  let water = '';
  if (t > 34.55) for (let i = 0; i < 7; i++) { const ph = (t * 3 + i / 7) % 1; water += `<circle cx="${f1(880 + (hash(i) - .5) * 16)}" cy="${f1(745 + ph * (ey - 785))}" r="7" fill="${C.water}" ${OL(3)}/>`; }
  const stream = t > 34.55 ? `<path d="M 880 740 V ${f1(ey - 36)}" stroke="${C.water}" stroke-width="18" opacity=".8"/>` : '';
  const e = egg(ex, ey, .62, { id: 'e14', shell: 0 });
  const fig = stick(540, FY, FS, { hR: [ex - 6, ey + 40], hL: [440, 1180], look: .8, lookY: .3, brow: 'calm', mouth: 'smile', over: e });
  return cam(`${kitchen()}${tap}${glass(720, TY, .9, { id: 'g14', level: .78 })}${stream}${water}${fig}`, 1.4, 540, 900, 0, 20);
}
