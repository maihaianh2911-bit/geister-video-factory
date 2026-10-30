// 18.54–20.0: Althoff leads his young elephant Tuffi by the red rein; name card TUFFI on her name
import { K, DEFS, tuffi, ringPos, althoff, town, card, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 18.54, 20.0);
  const tx = lerp(150, 380, eio(p)), walk = t * 7;
  const o = { walk, ear: .3 + .2 * Math.sin(t * 3), tr: .15 + .1 * Math.sin(t * 2.5) };
  const tS = .95, [rx, ry] = ringPos(tx, 1380, tS, o);
  const a = althoff(tx + 470, 1400, 1.05, { walk: t * 7 + 1, aL: [30, 30], look: -1, dir: -1 });
  o.rein = [rx + 120, ry + 140 , a.hL[0], a.hL[1]];
  const ro = { ...o, rein: [(a.hL[0] - tx) / tS * .5 + 150, 0, (a.hL[0] - tx) / tS, (a.hL[1] - 1380) / tS] };
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>${town(1000)}
    <rect x="-60" y="990" width="1200" height="1000" fill="#B5A88E"/><path d="M -60 1400 H 1140" stroke="#9D9078" stroke-width="6"/>
    ${tuffi(tx, 1380, tS, ro)}${a.svg}
    ${card(380, 640, 'TUFFI', 90, prog(t, 19.5, 19.75), { rot: -4, col: K.red })}${grain(t)}`;
}
