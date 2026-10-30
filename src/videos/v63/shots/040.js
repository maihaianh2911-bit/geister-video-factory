// 78.0–81.08: what the arc measures — one horizon; through the year the sun rises at different points, all of them between two end marks.
// Ticks collect along the horizon (no daily sky path); the range bracket links up to the gold arc on the disc. Text only IM JAHR (from the voice).
import { K, DEFS, disc, grain, prog, eio, eout, lerp, f1, TX, HL } from './lib.js';
export default function renderShot(t) {
  const hy = 1150, L = 230, R = 850;
  // sunrise points over the year: left end → right end → back (a sequence of separate sunrises, each one a small sun peeking over the horizon)
  const N = 11, p = prog(t, 78.3, 80.6) * (N - 1), idx = Math.min(N - 1, Math.floor(p)), f = p - idx;
  const pos = i => { const u = i / (N - 1) * 2; return lerp(L, R, .5 - .5 * Math.cos(Math.min(2, u) * Math.PI)); };
  let ticks = '';
  for (let i = 0; i <= idx; i++) ticks += `<path d="M ${f1(pos(i))} ${hy - 4} v -26" stroke="${K.goldL}" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;
  const rise = t < 78.3 ? 0 : Math.sin(Math.min(1, f) * Math.PI) * .9 + (idx === N - 1 && t > 80.6 ? .1 : 0);
  const sx = pos(idx), sy = hy - 50 * (idx === N - 1 && t > 80.6 ? 1 : rise);
  const sun = `<circle cx="${f1(sx)}" cy="${f1(sy)}" r="150" fill="url(#nGold)"/><circle cx="${f1(sx)}" cy="${f1(sy)}" r="62" fill="#FFD27A"/>`;
  const br = eout(prog(t, 80.0, 80.4));
  const bracket = `<g opacity="${f1(br)}"><path d="M ${L} ${hy + 60} v 30 H ${R} v -30" fill="none" stroke="${K.goldL}" stroke-width="8"/>${HL('IM JAHR', 540, hy + 190, 84, K.goldL, 12)}</g>`;
  // disc above with its right-hand gold arc; its two ends link down to the two horizon marks
  const lk = eio(prog(t, 79.2, 80.0));
  const ax = 540 + 184 * Math.cos(-.72), ay1 = 520 + 184 * Math.sin(-.72), ay2 = 520 + 184 * Math.sin(.72);
  const links = `<path d="M ${f1(ax)} ${f1(ay1)} L ${f1(lerp(ax, R, lk))} ${f1(lerp(ay1, hy - 40, lk))} M ${f1(ax)} ${f1(ay2)} L ${f1(lerp(ax, L, lk))} ${f1(lerp(ay2, hy - 40, lk))}" stroke="${K.goldL}" stroke-width="5" stroke-dasharray="12 10" opacity="${f1(lk ? .9 : 0)}"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nDawn)"/>
    ${disc(540, 520, 200, { id: 'Q', damage: true, arcs: eout(prog(t, 78.0, 78.4)) })}${links}
    ${sun}<rect x="-60" y="${hy}" width="1200" height="1000" fill="${K.oliveD}"/><path d="M -60 ${hy} H 1140" stroke="${K.ink}" stroke-width="6"/>
    <path d="M ${L} ${hy} V ${hy - 60} M ${R} ${hy} V ${hy - 60}" stroke="${K.ink}" stroke-width="10"/>${ticks}${bracket}${grain(t)}`;
}
