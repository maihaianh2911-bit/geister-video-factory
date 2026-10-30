// 36.82–40.24: people lost their balance and fell ("stürzten"): in the packed row one figure tips forward and goes down; the people around stagger
import { cam, K, DEFS, BG, person, crowdRow, grain, f1, prog, eio, ein, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const tip = eio(prog(t, 37.4, 38.0)), fall = ein(prog(t, 38.0, 38.6));
  const ang = lerp(0, 14, tip) + lerp(0, 66, fall);
  const fallen = `<g transform="rotate(${f1(ang)} 560 1400)">${person(560, 1400, 1.05, { col: K.c2, aF: lerp(10, 80, tip), aB: lerp(-5, 60, tip) })}</g>`;
  const stag = 10 * eio(prog(t, 38.3, 39.2));
  const sc = `${BG('url(#lSky)')}${grain(9)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.concreteD}"/>
    ${crowdRow(t, 1180, .75, 11, -40, 110, 12, { lean: () => 6 })}
    ${person(330, 1400, 1.05, { col: K.c4, lean: 10 + stag, aF: 50 })}${fallen}
    ${person(820, 1400, 1.05, { col: K.c5, dir: -1, lean: 4 + stag * .6, aF: 30 })}
    ${person(120, 1400, 1.05, { col: K.c1, lean: 8 })}`;
  return `${DEFS}${cam(sc, 1.22, 540, 1400, 0, -290)}`;
}
