// L2b 7.14–11.54: du counts the clouds with his finger (numbers 1–7 pop on them from "nachzählen" 8.06); on "Regen" (9.74) only ONE cloud actually rains, the others stay dry.
import { K, frame, cam, shadow, label, pop, prog, eio, person, T, f1, lerp, chip } from './lib.js';
import { room } from './sets.js';
import { cloud, gloom } from './clouds.js';
const CL = [[260, 560, 330], [700, 520, 350], [480, 360, 360], [150, 330, 270], [880, 330, 290], [600, 720, 260], [870, 760, 240]];
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 5, light: .4, strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0b0e18" opacity=".38"/>` + gloom(540, 800, 700, 700, .45, 'd');
  // counting order and times
  const ord = [3, 0, 2, 1, 4, 5, 6], ct = [8.1, 8.4, 8.7, 9.0, 9.25, 9.5, 9.7];
  let cur = -1; ct.forEach((c, i) => { if (t >= c) cur = i; });
  const tgt = cur >= 0 ? CL[ord[cur]] : [540, 600];
  const nxt = CL[ord[Math.min(6, cur + 1)]];
  const k = cur >= 0 && cur < 6 ? eio(prog(t, ct[cur] + .05, ct[cur + 1])) : 0;
  const hx = lerp(tgt[0], nxt[0], k * .3), hy = lerp(tgt[1], nxt[1], k * .3) + 110;
  const pt = eio(prog(t, 7.4, 8.0));
  s += shadow(470, 1700);
  // du seen in a medium-close shot: arm pointing up at the current cloud
  // arm points from the shoulder toward the cloud, capped at a natural arm length
  const dx = (hx - 470) / 1.15 - 118, dy = (hy - 1700) / 1.15 + 520, dl = Math.max(1, Math.hypot(dx, dy)), L = 330;
  const px = 118 + dx / dl * L, py = -520 + dy / dl * L;
  const ax = lerp(150, px, pt), ay = lerp(-300, py, pt);
  s += person('du', 470, 1700, 1.15, { t, seed: 1, look: [cl0((hx - 470) / 25), -14], brows: 'worried', mouth: 'small', armR: [ax, ay], elbowR: [lerp(200, 118 + dx / dl * L * .5 + 30, pt), lerp(-420, -520 + dy / dl * L * .5 + 20, pt)] });
  CL.forEach(([x, y, w], i) => { if (i !== 2) s += cloud(x, y, w, { t, seed: i + 3, dark: .85 }); });
  // the one cloud that really rains: drawn on top, with clearly visible rain falling past the clouds below
  const r = eio(prog(t, 9.74, 10.1));
  s += cloud(CL[2][0], CL[2][1], CL[2][2], { t, seed: 5, dark: .95, rain: r, rainLen: 2.2 });
  ord.forEach((ci, i) => { const [x, y, w] = CL[ci]; const p = pop(t, ct[i], .35); if (p > 0) s += `<g transform="translate(${x} ${y + w * .03}) scale(${f1(p * 100) / 100})">${T(0, 26, String(i + 1), 76, { fill: '#fff', stroke: '#1d1d1d', sw: 12 })}</g>`; });
  // the one raining cloud gets a drop badge
  s += chip(480, 190, 'REGEN', { size: 40, bg: '#7fb0e8', a: eio(prog(t, 9.85, 10.2)) });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 7.14, 11.54))));
}
const cl0 = v => Math.max(-16, Math.min(16, v));
