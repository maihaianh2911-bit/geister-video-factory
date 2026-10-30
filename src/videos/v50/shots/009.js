// 13.74–15.20 · "Forscher vermuten" — a magnifier sweeps over the palate tissue and finds its blood vessels
import { P, pastel, lens, vesselTube, headline, prog, eio, back, lerp } from '../lib.js';

function tissue(t, z) {
  let wav = 'M -40 300';
  for (let x = -40; x <= 1120; x += 40) wav += ` L ${x} ${1020 + 24 * Math.sin(x / 70 + t)}`;
  wav += ' L 1120 300 Z';
  const v = (y, a) => `<path d="M -40 ${y} C 300 ${y - a} 700 ${y + a} 1120 ${y - 20}" stroke="${P.ink}" stroke-width="${26 * z}" fill="none"/><path d="M -40 ${y} C 300 ${y - a} 700 ${y + a} 1120 ${y - 20}" stroke="#E5484D" stroke-width="${16 * z}" fill="none"/>`;
  return `<path d="${wav}" fill="${P.pinkL}" stroke="${P.ink}" stroke-width="7"/>${v(560, 80)}${v(760, -60)}${v(900, 40)}`;
}
export default function renderShot(t) {
  const lx = lerp(260, 760, eio(prog(t, 13.8, 14.9))), ly = 740;
  const ice = `<g transform="translate(540 1260)"><rect x="-150" y="-60" width="300" height="120" rx="30" fill="${P.pink}" stroke="${P.ink}" stroke-width="7"/><path d="M -100 -30 h 80" stroke="#fff" stroke-width="10" stroke-linecap="round"/></g>`;
  let mist = '';
  for (let i = 0; i < 5; i++) { const p = (t * .8 + i * .2) % 1; mist += `<circle cx="${380 + i * 80}" cy="${1180 - 140 * p}" r="${20 + 20 * p}" fill="${P.coldL}" opacity="${.7 * (1 - p)}"/>`; }
  const inner = `<rect x="0" y="0" width="1080" height="1920" fill="${P.pinkL}"/>
    <g transform="translate(${lx} ${ly}) scale(2.2) translate(${-lx} ${-ly})">${tissue(t, .7)}</g>
    ${vesselTube(lx, ly - 30, 700, .9, '#E5484D', t, 1)}`;
  return `${pastel(t, { color: '#EEF6FA' })}${tissue(t, 1)}${mist}${ice}
    ${lens(lx, ly, 230, inner, 's9l', back(prog(t, 13.74, 14.0)))}
    ${headline('?', 900, 380, 200, { scale: back(prog(t, 14.3, 14.55)), color: P.tealD })}`;
}
