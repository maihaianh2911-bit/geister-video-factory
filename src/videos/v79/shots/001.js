// 0–3.14 hook: he claims "Ich war im Büro.", she watches; on "verraten" his bubble cracks and his eyes slide away
import { K, TEXT, twoShot, cam, speech, prog, eio, eout, talk, blink, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const cr = eout(prog(t, 2.16, 2.45)), away = eio(prog(t, 2.1, 2.4));
  const W = { look: 1, lid: .25 + .1 * eio(prog(t, 1.2, 1.8)), brow: -.4, mouth: 'tight', blink: blink(t, 1) };
  const M = { look: lerp(-1, 1, away), turn: -.25 + .5 * away, talk: talk(t, .1, 1.9), hR: [lerp(120, 160, Math.sin(t * 3) * .5 + .5), -150], handR: 'palm', brow: away * .7, sweat: away, blink: blink(t, 2) };
  const b = pop(t, 0, .01);
  const crack = cr > 0 ? `<path d="M 760 370 L 735 410 L 770 440 L 742 480 L 760 505" stroke="${K.ol}" stroke-width="${6 * cr}" fill="none" stroke-linejoin="round"/><path d="M 735 410 L 700 420 M 770 440 L 805 452" stroke="${K.ol}" stroke-width="${4 * cr}"/>` : '';
  const bub = `<g transform="rotate(${-4 * cr} 760 440)">${speech(500, 360, 520, 150, 760, 600, `<text x="760" y="460" ${TEXT(58)}>Ich war im Büro.</text>${crack}`)}</g>`;
  const z = lerp(1, 1.08, eio(prog(t, 0, 3.1)));
  return cam(twoShot(t, W, M) + bub, z, 540, 900);
}
