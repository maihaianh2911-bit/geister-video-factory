// L8 25.86–29.94 split screen: "Unter vier Augen" Lena is the nicest (top) / "Vor anderen" du is made small (bottom).
import { K, frame, bg, shadow, person, chip, heart, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#1d1d1d"/>`;
  // top panel (y 120–800): the two alone, Lena warm and friendly
  const top = `<clipPath id="v89c9a"><rect x="0" y="120" width="1080" height="680" rx="0"/></clipPath>`;
  let a = `<g transform="translate(0 -360)">${bg('living')}</g>`;
  a += shadow(400, 760, 90) + shadow(680, 760, 90);
  const hug = eio(prog(t, 26.6, 27.0));
  a += person('du', 400, 760, .78, { t, seed: 1, hear: .6, eyes: 'happy', mouth: 'smile', look: [8, 0] });
  a += person('lena', 680 - 110 * hug, 760, .78, { t, seed: 2, eyes: 'happy', mouth: 'grin', look: [-8, 0], armL: hug > .05 ? [-110 - 140 * hug, -280 + 10 * hug] : null, tilt: -5 * hug });
  for (let i = 0; i < 3; i++) { const ph = (t - 26.8 - i * .5); if (ph > 0) a += heart(560 + (i - 1) * 70, 380 - ph * 40, .9, K.red, Math.max(0, 1 - ph / 2.2)); }
  a += chip(540, 200, 'UNTER VIER AUGEN', { p: pop(t, 25.86, .4), size: 48, bg: '#fff' });
  // bottom panel (y 820–1400): in front of others Lena laughs, du shrinks on "klein"
  let b = `<g transform="translate(0 140)">${bg('cafe')}</g>`;
  const sm = lerp(.62, .36, eio(prog(t, 29.2, 29.6)));
  const on = fade(t, 28.12, .3);
  const lb = Math.abs(Math.sin(t * 9)) * 8;
  b += shadow(200, 1380, 70) + shadow(430, 1380, 80) + shadow(880, 1380, 70) + shadow(660, 1380, 50);
  b += person('gl', 200, 1380, .62, { t, seed: 5, eyes: 'happy', mouth: 'laugh', headDy: -lb });
  b += person('lena', 430, 1380, .66, { t, seed: 2, eyes: 'sly', mouth: 'smirk', look: [12, 2], armR: [150, -300] });
  b += person('cap', 880, 1380, .62, { t, seed: 4, eyes: 'happy', mouth: 'laugh', headDy: -lb });
  b += person('du', 660, 1380, sm, { t, seed: 1, hear: .6, eyes: 'sad', mouth: 'sad', look: [-8, -4] });
  b += chip(540, 900, 'VOR ANDEREN', { p: pop(t, 28.12, .4), size: 48, bg: '#fff' });
  const bot = `<clipPath id="v89c9b"><rect x="0" y="820" width="1080" height="600"/></clipPath>`;
  s += `<defs>${top}${bot}</defs><g clip-path="url(#v89c9a)">${a}</g>`;
  s += `<g clip-path="url(#v89c9b)" opacity="${f1((.25 + .75 * on) * 100) / 100}">${b}</g>`;
  return frame(s);
}
