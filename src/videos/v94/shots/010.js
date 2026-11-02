// L5b 26.14–27.72: from behind — three stones STEUER, OMA, WÄSCHE drop into the backpack at once; du's knees buckle.
import { K, frame, cam, home, person, shadow, dropStone, impact, chip, prog, eio, eout, lerp, cl, pop, packTopBack } from './lib.js';
const ST = [{ label: 'STEUER', dx: -70, rot: -10, land: 26.36 }, { label: 'OMA', dx: 75, rot: 12, land: 26.6 }, { label: 'WÄSCHE', dx: 0, rot: -3, land: 26.88, dy: -26 }];
export default function renderShot(t) {
  let s = home({ mood: 'grey', dx: 16 * eio(prog(t, 26.14, 27.72)), clock: [19, 32], lampA: .22 });
  const X = 540, Y = 1760, S = 1.85;
  const n = ST.filter(q => t >= q.land).length;
  const load = .45 + n * .12, top = packTopBack(load);
  const hunch = .2 + n * .22 + (n ? Math.sin(cl((t - ST[n - 1].land) / .3) * Math.PI) * .12 : 0);
  s += shadow(X, Y + 4, 240);
  const inside = [{ label: 'VERMIETER', dx: -40, rot: -6, s: .6, dy: 10 }, { label: 'ZAHNARZT', dx: 50, rot: 8, s: .6, dy: 12 }, ...ST.filter(q => t >= q.land).map(q => ({ label: q.label, dx: q.dx, rot: q.rot, s: .62, dy: q.dy || -6 }))];
  s += person('du', X, Y, S, { t, seed: 1, back: true, load, stones: inside, hunch: Math.min(1, hunch) });
  const hy = Y + (top + 30 + hunch * 26) * S;
  ST.forEach(q => { if (t < q.land) s += dropStone(t, q.land, X + q.dx * S, -120, hy + (q.dy || -6) * S, .62 * S, q.label, { dur: .42, rot: q.rot }); s += impact(t, q.land, X + q.dx * S, hy, 200); });
  s += `<rect x="-60" y="1790" width="1200" height="200" fill="#6e5a4e" stroke="${K.ink}" stroke-width="5"/>`;
  s = cam(s, 540, 1000, 1.03 + .05 * eio(prog(t, 26.14, 27.72)) + .025 * n, 0, Math.sin(t * 60) * 4 * Math.max(0, 1 - (t - 26.88) / .25) * (t > 26.88 ? 1 : 0));
  s += chip(540, 300, 'DREI AUF EINMAL', { p: pop(t, 26.14, .4), size: 62, bg: K.yellow });
  return frame(s);
}
