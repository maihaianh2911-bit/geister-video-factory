// 40.24–44.54: others were carried along and fell on top ("übereinander"): two more figures are swept over the fallen one; the scene is muted to grey silhouettes
import { cam, K, DEFS, BG, person, crowdRow, grain, f1, prog, eio, ein, lerp } from './lib.js';
export default function renderShot(t) {
  const a = ein(prog(t, 40.6, 41.4)), b = ein(prog(t, 41.6, 42.5)), mute = eio(prog(t, 42.6, 43.6));
  const first = `<g transform="rotate(80 560 1400)">${person(560, 1400, 1.05, { col: K.c2, aF: 80, aB: 60 })}</g>`;
  const p2 = `<g transform="translate(${f1(lerp(-150, 0, a))} 0) rotate(${f1(lerp(0, 74, a))} 420 1400)">${person(420, 1400, 1.05, { col: K.c4, lean: 10, aF: 70 })}</g>`;
  const p3 = `<g transform="translate(${f1(lerp(-250, -40, b))} 0) rotate(${f1(lerp(0, 68, b))} 300 1400)">${person(300, 1400, 1.05, { col: K.c1, lean: 10, aF: 70 })}</g>`;
  const sc = `${BG('url(#lSky)')}${grain(10)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.concreteD}"/>
    ${crowdRow(t, 1180, .75, 11, -40, 110, 13, { lean: () => 8 })}
    ${first}${p2}${p3}
    ${person(860, 1400, 1.05, { col: K.c5, dir: -1, lean: 6, aF: 30 })}`;
  return `${DEFS}<g style="filter:grayscale(${f1(.8 * mute)})"><rect x="-60" y="1100" width="1200" height="900" fill="${K.concreteD}"/>${cam(sc, 1.22, 540, 1400, 0, -290)}</g><rect x="-60" y="-60" width="1200" height="2040" fill="${K.paperD}" opacity="${f1(.35 * mute)}"/>`;
}
