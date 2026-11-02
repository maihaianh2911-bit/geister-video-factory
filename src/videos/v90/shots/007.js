// L6 20.86–23.68 lunch in the canteen: a drop of sauce falls from du's fork onto the white shirt ("kleckerst"), du looks down.
import { K, frame, bg, shadow, person, stain, cafeTable, cam, prog, eio, ein, eout, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('cafe', { dx: 60 });
  s += shadow(540, 1330);
  const drop = prog(t, 21.34, 21.7);
  const st = eout(prog(t, 21.68, 21.95));
  const down = eio(prog(t, 22.0, 22.35));
  // fork in du's right hand, near the mouth until the drip, then lowered
  const hand = [70, lerp(-390, -300, down)];
  const fork = `<g transform="translate(${hand[0]} ${hand[1]}) rotate(-30)"><rect x="-4" y="-70" width="8" height="70" fill="#c9c9c9" stroke="${K.ink}" stroke-width="2"/><path d="M -10 -70 v -24 M 0 -70 v -24 M 10 -70 v -24" stroke="#c9c9c9" stroke-width="4"/><ellipse cx="0" cy="-86" rx="14" ry="8" fill="#c9302c"/></g>`;
  let dropSvg = '';
  if (drop > 0 && drop < 1) dropSvg = `<ellipse cx="${f1(lerp(110, 30, drop))}" cy="${f1(lerp(-450, -280, ein(drop)))}" rx="9" ry="12" fill="#c9302c"/>`;
  s += person('du', 540, 1330, 1, { t, seed: 1, hear: .6, top: '#f7f7f7', shirt: true, overBody: stain(st, 22, -272), armR: hand, front: fork + dropSvg,
    eyes: t > 21.7 ? 'wide' : 'n', mouth: t > 21.7 ? 'o' : 'smile', look: t > 21.9 ? [4, 16] : [6, -4], headDy: 6 * down, blush: eio(prog(t, 22.6, 23.1)) * .7 });
  s += cafeTable(540, 1150, 760);
  s += `<ellipse cx="420" cy="1146" rx="90" ry="18" fill="#fff" stroke="${K.ink}" stroke-width="4"/><ellipse cx="420" cy="1140" rx="50" ry="9" fill="#c9302c"/>`;
  return frame(cam(s, 540, 1000, 1.02 + .08 * eio(prog(t, 21.6, 23.0))));
}
