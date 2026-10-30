// 5.88–8.34: and put on fresh clothes every day ("frische Kleidung" 6.54–6.92) — you pull a clean blue shirt from the wardrobe; the shirt colour changes to it
import { K, OL, f1, stick, calendar, cam, prog, eio, lerp } from './lib.js';
import { bedroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const take = eio(prog(t, 6.0, 6.6)), on = eio(prog(t, 6.7, 7.3)), worn = t > 7.0;
  const wardrobe = `<rect x="60" y="420" width="300" height="930" rx="12" fill="${K.wood}" ${OL()}/><path d="M 210 420 V 1350" ${OL(6)}/>${[0, 1, 2].map(i => `<rect x="${80 + i * 0}" y="${520 + i * 120}" width="110" height="80" rx="8" fill="${[K.shirt2, K.teal, K.orange][i]}" ${OL(5)}/>`).join('')}`;
  const hx = lerp(lerp(560, 200, take), 600, on), hy = lerp(lerp(1100, 560, take), 700, on);
  const shirt = !worn && take > .05 ? `<g transform="translate(${f1(hx)} ${f1(hy + 50)})"><path d="M -60 -50 L -20 -60 Q 0 -40 20 -60 L 60 -50 L 90 0 L 60 10 V 90 H -60 V 10 L -90 0 Z" fill="${K.shirt2}" ${OL(5)}/></g>` : '';
  const fig = stick(620, FY, FS, { shirt: worn ? K.shirt2 : K.orange, look: take > .2 && on < .5 ? -1 : 0, mouth: 'smile', hL: [hx, hy], hR: [760, 1110] });
  return cam(`${bedroom()}${wardrobe}${fig}${shirt}${calendar(930, 150, 1)}`, 1, 540, 960);
}
