// 10.84–13.22: date — summer day over the Wupper valley, a carriage glides along; the tag WUPPERTAL · 21.07.1950 types on
import { K, DEFS, bahnScene, grain, f1, cam, prog, eio, lerp, TX } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 10.84, 13.22);
  const world = bahnScene(t, { ox: lerp(0, 160, p), carX: lerp(140, 640, eio(p)), car: { faces: true } });
  // the date stamps in right away; WUPPERTAL slides in beside it on the spoken word
  const date = '21.07.1950', nDate = Math.round(10 * prog(t, 10.84, 11.25));
  const c = eio(prog(t, 12.2, 12.5));
  return `${DEFS}${cam(world, 1.12, 540, 760)}
    <rect x="100" y="140" width="880" height="100" fill="${K.ink}"/>
    ${TX(date.slice(0, Math.max(1, nDate)), lerp(380, 590, c), 212, 58, K.paperL, 'start')}
    ${c > 0 ? TX('WUPPERTAL ·', lerp(520, 570, c), 212, 58, K.paperL, 'end', `opacity="${f1(c)}"`) : ''}
    ${grain(t)}`;
}
