// L8b 38.60–41.28: title card over the dimmed study: "ZEIGARNIK-EFFEKT" slams in (38.64), year chip "1920er" on "Zwanzigerjahren" (39.82); the notebook drifts closer.
import { K, frame, cam, label, chip, paper, T, pool, pop, prog, eio } from './lib.js';
import { study } from './sets.js';
export default function renderShot(t) {
  let s = study(t);
  s = cam(s, 540, 960, 1.15 + .08 * prog(t, 38.6, 41.28));
  s += `<rect width="1080" height="1920" fill="#1a1410" opacity=".55"/>` + pool(540, 700, 480, 300, '#ffd98a', .35);
  const z = 1 + .06 * eio(prog(t, 38.6, 41.28));
  let card = paper(540, 1060, 640, 420, -3 + 2 * Math.sin(t), T(0, -100, 'Beobachtung:', 40, { fill: '#22324d', w: 800 }) + T(0, -20, 'Unterbrochenes', 44, { fill: K.red, w: 900 }) + T(0, 40, 'bleibt im Kopf.', 44, { fill: K.red, w: 900 }) + T(0, 140, 'B. Zeigarnik, Berlin', 30, { fill: '#55606e', w: 700 }), { lines: false });
  s += `<g transform="translate(540 1060) scale(${z}) translate(-540 -1060)" opacity="${Math.min(1, prog(t, 38.9, 39.3))}">${card}</g>`;
  s += label('ZEIGARNIK-', 540, 400, 112, { p: pop(t, 38.64, .4) });
  s += label('EFFEKT', 540, 540, 128, { p: pop(t, 38.8, .4) });
  const p = pop(t, 39.82, .4);
  if (p > 0) s += `<g transform="translate(840 720) rotate(-6) scale(${Math.max(.01, p)})">${chip(0, 0, '1920er', { size: 60, bg: K.yellow })}</g>`;
  return frame(s);
}
