// L2a 10.28–13.9: MONTAG — desk corner in the evening; the laptop shows a new e-mail "An: Vermieter"; "5 MIN" on "fünf Minuten".
import { K, frame, cam, study, person, shadow, laptop, mailScreen, deskLamp, mug, dayCard, chip, light, stopwatch, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'evening', dx: -16 * eio(prog(t, 10.28, 13.9)), clock: [20, 12] });
  s += light(900, 1050, 300, 260, '#ffd98a', .5);
  const X = 330, Y = 1600, S = 1.55;
  const look = eio(prog(t, 11.4, 11.8));
  s += person('du', X, Y, S, { t, seed: 1, load: .1, eyes: 'n', brows: 'calm', mouth: t < 13 ? 'flat' : 'smile', look: [lerp(0, 16, look), lerp(0, 10, look)], armR: [190, -236], rim: '#ffd98a' });
  // desk (sharp midground/foreground)
  let d = `<rect x="80" y="1250" width="1000" height="34" rx="8" fill="#a8774f" stroke="${K.ink}" stroke-width="5"/><rect x="100" y="1284" width="960" height="700" fill="#8a5d3c" stroke="${K.ink}" stroke-width="5"/><rect x="150" y="1330" width="380" height="140" rx="10" fill="#7a5034" stroke="${K.ink}" stroke-width="4"/><circle cx="340" cy="1400" r="10" fill="#d9b44a"/>`;
  d += laptop(700, 1252, 1.0, { screen: mailScreen({ typed: 0, cursor: Math.floor(t * 2) % 2 === 0 }) });
  d += deskLamp(990, 1252, 1.0) + mug(160, 1252, .9, '#e8b85c', { t });
  d += `<g transform="translate(470 1246) rotate(-4)"><rect x="-70" y="-22" width="140" height="22" fill="#5f8fb5" stroke="${K.ink}" stroke-width="4"/><rect x="-60" y="-44" width="124" height="22" fill="#c25b4e" stroke="${K.ink}" stroke-width="4"/></g>`;
  s += d;
  const push = eio(prog(t, 11.3, 13.4));
  s = cam(s, 700, 1100, 1 + .12 * push, -40 * push);
  s += dayCard(t, 10.28, 'MONTAG');
  const p5 = pop(t, 12.68, .45);
  if (p5 > 0) s += `<g transform="translate(760 560) scale(${f1(p5 * 1000) / 1000})">${stopwatch(-130, 0, .55, 5 / 60)}${chip(70, 0, '5 MIN', { size: 64 })}</g>`;
  return frame(s);
}
