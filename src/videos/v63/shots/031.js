// 57.64–60.38: he goes down to the men's toilet in the basement — foot by foot down the steps (each foot lifts, lands on a tread, weight drops after it), then to the door
import { K, DEFS, BG, wcDoor, grain, cam, prog, eio, ein, lerp, f1 } from './lib.js';
import { collar } from './hands.js';
const S = .75, TH = 150 * S, SH = 150 * S;
// tread i: centre x, top y (tread 8+ = basement floor)
const tread = i => i >= 7 ? [540 + (i - 7) * 80, 1390] : [-20 + 80 * i, 900 + 70 * i]; // tread 7 runs on as the basement floor
function leg(hx, hy, fx, fy, w) {
  let dx = fx - hx, dy = fy - hy, d = Math.hypot(dx, dy); const L = TH + SH;
  if (d > L - 1) { fx = hx + dx / d * (L - 1); fy = hy + dy / d * (L - 1); dx = fx - hx; dy = fy - hy; d = L - 1; }
  const a = Math.atan2(dy, dx), b = Math.acos((TH * TH + d * d - SH * SH) / (2 * TH * d));
  const kx = hx + Math.cos(a - b) * TH, ky = hy + Math.sin(a - b) * TH; // knee bends forward (+x, walking direction)
  return `<path d="M ${f1(hx)} ${f1(hy)} L ${f1(kx)} ${f1(ky)} L ${f1(fx)} ${f1(fy)}" fill="none" stroke="${K.suit}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${f1(fx - 10)} ${f1(fy - 8)} h 46" stroke="${K.ink}" stroke-width="18" stroke-linecap="round"/>`;
}
export default function renderShot(t) {
  const T = .25, s = Math.max(0, (t - 57.7) / T), k = Math.min(6, Math.floor(s)), f = s - Math.floor(s);
  // treads: planted foot on k+1, swing foot goes k → k+2 ; ends with both feet on the floor
  const done = s >= 7;
  const plant = tread(k + 1), from = tread(k), to = tread(k + 2);
  let sw;
  if (done) sw = tread(8);
  else { const g = eio(f); sw = [lerp(from[0], to[0], g), lerp(from[1], to[1], ein(Math.min(1, f * 1.25))) - 46 * Math.sin(Math.min(1, f * 1.1) * Math.PI)]; }
  const pl = done ? tread(7) : plant;
  // hip: over the planted foot, drops to the lower tread only after the swing foot has landed
  const base = done ? 1390 : lerp(plant[1], to[1], ein(prog(f, .55, 1)));
  const hx = done ? (pl[0] + sw[0]) / 2 + 10 : lerp((from[0] + plant[0]) / 2, (plant[0] + to[0]) / 2, eio(f)) + 10, hy = base - 290 * S + (done ? 0 : 10 * Math.sin(f * Math.PI));
  const legs = leg(hx - 10, hy, pl[0], pl[1], 40) + leg(hx + 10, hy, sw[0], sw[1], 40);
  // upper body (same coat silhouette as fig(), feet-origin coords → hip at -300)
  const ox = hx, oy = hy + 300 * S;
  const sway = done ? 0 : 6 * Math.sin(s * Math.PI);
  const body = `<g transform="translate(${f1(ox)} ${f1(oy)}) scale(${S})">
    <path d="M -62 -520 L ${f1(-80 + sway)} -400 L ${f1(-70 + sway)} -290" fill="none" stroke="${K.suit}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M -80 -540 Q -96 -300 -92 -240 L 92 -240 Q 96 -300 80 -540 Q 0 -566 -80 -540 Z" fill="${K.suit}"/>
    <ellipse cx="0" cy="-612" rx="54" ry="62" fill="${K.suit}"/><rect x="-22" y="-560" width="44" height="30" fill="${K.suit}"/>
    <path d="M 62 -520 L ${f1(80 - sway)} -400 L ${f1(76 - sway)} -290" fill="none" stroke="${K.suit}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  let steps = '';
  for (let i = 0; i < 8; i++) steps += `<rect x="${-60 + i * 80}" y="${900 + i * 70}" width="1200" height="70" fill="${i % 2 ? '#7A6A58' : '#8A7A66'}" stroke="${K.ink}" stroke-width="4"/>`;
  return `${DEFS}${BG('#4A4038')}${cam(`<rect x="-60" y="-60" width="1200" height="1520" fill="#5E544A"/>` + steps + wcDoor(880, 1123, .62, 0) + legs + body + collar(ox, oy, S), 1, 540, 1000, 0, -230)}${grain(t)}`;
}
