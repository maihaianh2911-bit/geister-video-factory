// Lit by the lamp on the frozen ground: the green friend, standing beside the spot, lowers a backpack by its handle until it sits on the ground on "Rucksäcke" and lets go; a jacket is tossed in and lands flat on the ground in front on "Jacken".
import { K, DEFS60, P, fig, reach, backpack, FG, prog, eio, ein, lerp, shk } from './lib.js';

export default function renderShot(t) {
  const down = eio(prog(t, 57.72, 58.04)), up = eio(prog(t, 58.12, 58.4));
  const jk = ein(prog(t, 58.38, 58.68));
  const [sx, sy] = shk(t, 58.04, 8, 9), [jx, jy] = shk(t, 58.68, 5, 9);
  const j = P.blue, GY = 1250, S = 1.0, FX = 730, BX = 430;
  const by = lerp(900, GY - 165, down);
  const hy = by - 230; // top handle
  // the left hand carries the backpack by its top handle, then swings back to the side after the release
  const tL = [lerp(BX + 6, 600, up), lerp(hy, 940, up)];
  const [l1, l2] = reach(FX, GY - 40, S, -1, tL[0], tL[1]);
  // jacket tossed in from the left, lands flat on the ground left of the backpack
  const jxC = lerp(-260, 640, jk), jyC = lerp(820, GY + 40, jk) - 220 * Math.sin(jk * Math.PI) * (1 - jk), f = jk;
  const jacket = jk > 0 ? `<g transform="translate(${jxC + jx} ${jyC + jy}) rotate(${lerp(-40, 0, jk)})">
     <path d="M ${-170 - 30 * f} ${-60 + 46 * f} Q 0 ${-90 + 70 * f} ${170 + 30 * f} ${-60 + 46 * f} L ${160 + 30 * f} ${60 - 34 * f} Q 0 ${80 - 44 * f} ${-160 - 30 * f} ${60 - 34 * f} Z" fill="${j.j}" stroke="#0B0F12" stroke-width="8" stroke-linejoin="round"/>
     <path d="M -120 ${-40 + 34 * f} Q 0 ${-60 + 48 * f} 120 ${-40 + 34 * f}" stroke="${j.jHi}" stroke-width="12" fill="none" stroke-linecap="round"/>
     <path d="M 0 ${-70 + 54 * f} V ${60 - 38 * f}" stroke="${j.jSh}" stroke-width="8"/></g>` : '';
  const puff = (x, t0) => { const p = prog(t, t0, t0 + .45); return p > 0 && p < 1 ? [-1, 1].map(d => `<ellipse cx="${x + d * (110 + 110 * p)}" cy="${GY - 10 - 20 * p}" rx="${40 + 40 * p}" ry="${16 + 10 * p}" fill="#DCEBF4" opacity="${(.5 * (1 - p)).toFixed(2)}"/>`).join('') : ''; };
  return DEFS60 + `<g transform="translate(${sx} ${sy}) translate(540 1150) scale(1.2) translate(-540 -1150)"><rect x="0" y="0" width="1080" height="1920" fill="#121B20"/>
  <path d="M 0 ${GY - 30} Q 540 ${GY - 60} 1080 ${GY - 30} L 1080 1920 L 0 1920 Z" fill="#2E3E46"/>
  <path d="M 0 ${GY - 30} Q 540 ${GY - 60} 1080 ${GY - 30}" stroke="#DCEBF4" stroke-width="10" fill="none" opacity=".6"/>
  ${[0, 1, 2, 3, 4].map(i => `<path d="M ${80 + i * 230} ${GY + 40 + (i % 2) * 40} l 24 -26 l 24 26" stroke="#DCEBF4" stroke-width="6" fill="none" opacity=".5"/>`).join('')}
  <ellipse cx="540" cy="${GY - 260}" rx="620" ry="560" fill="url(#fAmb)" opacity=".7"/>
  ${fig('green', FX, GY - 40, S, { look: -12, lookY: 12, brow: 'focus', mouth: 'tight', aL: [l1, l2], aR: [10, 6], noShadow: true })}
  <ellipse cx="${BX}" cy="${GY - 6}" rx="${lerp(90, 170, down)}" ry="22" fill="#000" opacity="${(.2 + .3 * down).toFixed(2)}"/>
  ${puff(BX, 58.04)}
  ${backpack(BX, by, 1.5, 0, '#5A6B3A', '#44522A')}
  ${up < .05 ? `<circle cx="${BX + 6}" cy="${hy}" r="23" fill="${P.green.skin}" stroke="#0B0F12" stroke-width="5"/>` : ''}
  ${puff(640, 58.68)}${jacket}
  </g>
  ${FG(1440)}`;
}
