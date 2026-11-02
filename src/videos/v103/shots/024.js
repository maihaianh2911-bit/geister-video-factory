// L15b 75.82–80.292: medium shot, du stands by the window next to a wall planner of this week (MO–SO); on "eine Sache" (76.7) he ticks
// today's box with a pen; on "diese Woche" (78.24) label DIESE WOCHE pops and the camera pushes in on du's calm smile.
import { K, frame, cam, prog, eio, pop, person, shadow, label, T, check, f1 } from './lib.js';
import { room } from './sets.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 50, sofa: true });
  // wall planner (sharp) right
  const px = 620, py = 520;
  s += `<rect x="${px}" y="${py}" width="360" height="460" rx="14" fill="#fbf8ef" stroke="${INK}" stroke-width="6"/><rect x="${px}" y="${py}" width="360" height="70" rx="14" fill="#c25b4e" stroke="${INK}" stroke-width="6"/>` + T(px + 180, py + 50, 'MEINE WOCHE', 34, { fill: '#fff' });
  ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'].forEach((d, i) => { const y = py + 110 + i * 50; s += T(px + 50, y + 12, d, 28, { fill: K.txt, w: 800 }) + `<rect x="${px + 100}" y="${y - 18}" width="220" height="38" rx="6" fill="${i === 0 ? '#fff3c4' : '#eef0f2'}" stroke="#b9b2a4" stroke-width="3"/>`; });
  const ck = eio(prog(t, 76.7, 77.2));
  s += check(px + 300, py + 110, 1, K.green, ck);
  const reach = eio(prog(t, 76.2, 76.7)) * (1 - eio(prog(t, 77.4, 77.9)));
  s += shadow(380, 1650);
  s += person('du', 380, 1650, 1.02, { t, seed: 1, look: [14 * (reach > .1 ? 1 : 0), -4], brows: 'calm', mouth: t > 77.4 ? 'smile' : 'small', armR: [140 + 370 * reach, -400 - 590 * reach], elbowR: [250 + 90 * reach, -420 - 260 * reach] });
  const z = 1.0 + .03 * eio(prog(t, 75.82, 78.2)) + .09 * eio(prog(t, 78.2, 80.29));
  s = cam(s, 480, 1000, z);
  s += label('DIESE WOCHE', 540, 250, 100, { p: pop(t, 78.24, .45) });
  return frame(s);
}
