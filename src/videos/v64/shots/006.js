// 10.84–13.22: date — summer day over the Wupper valley, a carriage glides along; the tag WUPPERTAL · 21.07.1950 types on
import { K, DEFS, bahnScene, grain, f1, cam, prog, eio, lerp, TX } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 10.84, 13.22);
  const world = bahnScene(t, { ox: lerp(0, 160, p), carX: lerp(140, 640, eio(p)), car: { faces: true } });
  const txt = 'WUPPERTAL · 21.07.1950';
  const nDate = Math.round(10 * prog(t, 10.84, 11.6)), nCity = Math.round(12 * prog(t, 12.2, 12.6));
  const shown = txt.slice(0, nCity) + (nCity >= 12 ? '' : '') ;
  const w = 880;
  return `${DEFS}${cam(world, 1.12, 540, 760)}
    <rect x="100" y="140" width="${w}" height="100" fill="${K.ink}"/>
    ${TX(txt.slice(12, 12 + nDate), 540 + 150, 212, 58, K.paperL)}${TX(txt.slice(0, nCity), 300, 212, 58, K.paperL)}
    ${grain(t)}`;
}
