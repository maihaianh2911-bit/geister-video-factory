// 38.92–40.3: a window cracks and bursts on "zerspringt" — glass shards fly out of the bulging wall
import { K, DEFS, bahnScene, car, tuffi, shards, grain, cam, f1, prog, shk, TY } from './lib.js';
export default function renderShot(t) {
  const br = t < 39.2 ? 0 : t < 39.5 ? .5 : 1;
  const inner = tuffi(30, 352, .66, { ear: 1, eye: 'wide', tr: .5, rot: -10, legs: [-20, -10, 18, 10] });
  const [sx, sy] = shk(t, 39.5, 10, 6);
  const sc = `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>
    ${car(697, 163, 3.5, { inner, id: 'w20', bulge: 1, broken: br, tilt: 1.5 * Math.sin(t * 9) })}
    ${shards(540, 800, prog(t, 39.5, 40.3), 18, 1.2, 5)}`;
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${sc}</g>${grain(t)}`;
}
