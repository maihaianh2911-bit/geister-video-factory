// 26.72–28.64: long operations were very hard (not impossible) — the watch's red time segment keeps sweeping round but
// slows and stutters while red pain sparks flare at its leading edge; tag LANGE EINGRIFFE ("Lange" 26.72).
import { K, DEFS, BG, watch, tag, pain, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 26.72, 28.6);
  const strain = eio(prog(t, 27.2, 28.0));
  // decelerating sweep with small hitches: it still advances, just ever more laboriously
  const arc = Math.max(1, 300 * (1 - Math.pow(1 - p, 2.4)) - 8 * strain * Math.abs(Math.sin(t * 13)));
  const dx = 7 * strain * Math.sin(t * 37), cx = 540 + dx, cy = 900;
  const a = arc * Math.PI / 180, tx = cx + Math.sin(a) * 330 * .9, ty = cy - Math.cos(a) * 330 * .9;
  const lbl = eout(prog(t, 26.75, 27.05));
  return `${DEFS}${BG()}<ellipse cx="540" cy="900" rx="520" ry="520" fill="url(#nLamp)" opacity=".5"/>${watch(cx, cy, 330, arc, (t - 26.72) * 360, { arc, arcCol: K.red })}${pain(tx, ty, 34, strain, t, 3)}${tag(540, 330, 'LANGE EINGRIFFE', lbl, 70, K.orange)}`;
}
