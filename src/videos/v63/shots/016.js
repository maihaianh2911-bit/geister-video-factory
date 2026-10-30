// 29.24–30.8: from fence to fence — the disc is handed from one silhouette to the next
import { K, DEFS, BG, fig, disc, grain, prog, eio, lerp } from './lib.js';
const REST = [6, 4], REACH = [40, 10], CHEST = [20, -110];
const mix = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
export default function renderShot(t) {
  const xs = [180, 540, 900];
  // giver 0 already holds the disc out; receiver 1 reaches, takes it on "Hehler" (29.86),
  // brings it to the chest, then holds it out to 2, who takes it on the second "Hehler" (30.3)
  const r1L = eio(prog(t, 29.3, 29.8)), back0 = eio(prog(t, 29.95, 30.3));
  const in1 = eio(prog(t, 29.92, 30.08)), out1 = eio(prog(t, 30.08, 30.28)), r2L = eio(prog(t, 29.95, 30.28));
  const in2 = eio(prog(t, 30.4, 30.7)), back1 = eio(prog(t, 30.42, 30.75));
  const f0 = fig(xs[0], 1400, .82, { col: '#2A221D', hat: true, coat: true, aR: mix(REACH, REST, back0), aL: REST });
  const a1L = t < 29.92 ? mix(REST, REACH, r1L) : mix(REACH, mix(CHEST, REST, out1), in1);
  const a1R = t < 30.4 ? mix(REST, mix(CHEST, REACH, out1), in1) : mix(REACH, REST, back1);
  const f1g = fig(xs[1], 1400, .82, { col: '#2A221D', coat: true, aL: a1L, aR: a1R });
  const f2 = fig(xs[2], 1400, .82, { col: '#2A221D', hat: true, coat: true, aR: REST, aL: t < 30.4 ? mix(REST, REACH, r2L) : mix(REACH, CHEST, in2) });
  // the disc always sits in the hand currently holding it
  const k = eio(prog(t, 29.8, 29.92)), k2 = eio(prog(t, 30.28, 30.4));
  let h;
  if (t < 29.8) h = f0.hR;
  else if (t < 29.92) h = mix(f0.hR, f1g.hL, k);
  else if (t < 30.08) h = f1g.hL;
  else if (t < 30.28) h = f1g.hR;
  else if (t < 30.4) h = mix(f1g.hR, f2.hL, k2);
  else h = f2.hL;
  return `${DEFS}${BG(K.paper)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.paperD}"/>${f0.svg}${f1g.svg}${f2.svg}${disc(h[0], h[1] - 30, 70, { id: 'p', damage: true })}${grain(t)}`;
}
