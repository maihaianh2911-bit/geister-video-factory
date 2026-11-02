// L6 27.72–31.4: DONNERSTAG — warm café. Two friends (yellow cap/orange, bun/purple) laugh; du sits between them with
// the heavy backpack, staring into nothing; on "nicht richtig da" a cold grey light isolates him.
import { K, frame, cam, cafe, person, speech, mug, dayCard, light, tableEdge, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = cafe({ dx: -20 * eio(prog(t, 27.72, 31.4)) });
  const away = eio(prog(t, 29.9, 30.5));
  const laugh = Math.floor(t * 4) % 2 === 0;
  s += person('cap', 185, 1440, 1.45, { t, seed: 4, eyes: 'happy', mouth: laugh ? 'laugh' : 'grin', look: [10, 0], armR: [120, -250], headTilt: Math.sin(t * 6) * 4 });
  s += person('bun', 850, 1440, 1.45, { t, seed: 7, eyes: t > 30.2 ? 'n' : 'happy', mouth: t > 30.2 ? 'smile' : (laugh ? 'grin' : 'laugh'), look: [-14, 0], armL: [-120, -260], headTilt: -Math.sin(t * 6 + 1) * 4 });
  s += person('du', 520, 1470, 1.62, { t, seed: 1, load: .85, nStones: 5, hunch: .45, eyes: 'tired', brows: 'worried', mouth: 'flat', look: [0, 12], noBlink: true });
  s += light(520, 820, 260, 360, '#7f9cc8', .55 * away);
  s += speech(230, 560, 'Haha!', 200, 690, { p: pop(t, 28.7, .4), size: 46 }) + speech(820, 540, 'Und dann …!', 850, 680, { p: pop(t, 29.2, .4), size: 42 });
  s += tableEdge(1380, '#a8774f', '#c08a5c') + mug(250, 1380, 1.15, '#f2efe8', { t }) + mug(820, 1380, 1.15, '#e8b85c', { t: t + .4 }) + mug(560, 1380, 1.15, '#9fd6c2') + `<ellipse cx="420" cy="1378" rx="80" ry="16" fill="#f2efe8" stroke="${K.ink}" stroke-width="4"/><path d="M 380 1368 q 40 -50 80 0 z" fill="#c98a4a" stroke="${K.ink}" stroke-width="4"/>`;
  s = cam(s, 530, 950, 1 + .1 * eio(prog(t, 28.6, 31.4)));
  s += dayCard(t, 27.72, 'DONNERSTAG', { size: 100, out: 29.6 });
  return frame(s, { vig: .5 + .15 * away });
}
