// 82.0–86.196: a sculpture in Wuppertal remembers the jump — an elephant statue on a plinth by the river; a carriage glides by overhead
import { K, DEFS, tuffi, track, car, river, town, grain, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 82.0, 86.196);
  const carX = lerp(-400, 1500, p);
  const statue = `<g opacity="1">${tuffi(540, 1180, .85, { rot: -12, ear: .8, tr: .6, legs: [-20, -10, 20, 10], blanket: false })}</g>`;
  const bronze = `<rect x="-60" y="-60" width="1200" height="2040" fill="#6B5A3A" opacity="0"/>`;
  return `${DEFS}${cam(`<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>${town(1050)}${river(t, 1040, 1500)}
    <rect x="-60" y="1250" width="1200" height="800" fill="#A39A86"/>${track(240, 1100, 0)}${car(carX, 240, .8, { faces: true })}
    <rect x="360" y="1180" width="360" height="160" fill="#9C9284" stroke="${K.ink}" stroke-width="6"/><rect x="330" y="1330" width="420" height="40" fill="#8A806C" stroke="${K.ink}" stroke-width="6"/>
    <g style="filter:sepia(1) saturate(1.6) hue-rotate(-10deg) brightness(.75)">${statue}</g>${bronze}`, lerp(1.25, 1.0, eio(prog(t, 82.0, 84.4))), 540, 1100)}${grain(t)}`;
}
