// 75.36–79.788: who came to the city for a festival and never returned home ("nicht nach Hause zurückkehrte"): the outline fades; the camera pulls back to the row of blossoming trees
import { K, DEFS, BG, magnolia, person, grain, cam, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const fade = eio(prog(t, 76.6, 78.0)), pull = eio(prog(t, 75.4, 79.6));
  let trees = '';
  for (let i = 0; i < 7; i++) trees += magnolia(110 + i * 143, 1300, i === 2 ? 1.6 : 1.3, 1, i * 3);
  const inner = `${BG('url(#lSky)')}${grain(18)}<rect x="-300" y="1300" width="1700" height="900" fill="${K.paperD}"/>${trees}
    <g opacity="${f1(.55 * (1 - fade))}">${person(440, 1300, .9, { col: K.paperL, hair: K.paperD })}</g>`;
  return `${DEFS}${cam(inner, lerp(1.5, 1, pull), 400, 1150)}`;
}
