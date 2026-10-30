// Heat view of the shivering friend: his body glows warm amber, then cools to blue from the edges inwards on "kühlt aus".
import { K, DEFS60, P, BEANIE, FG, prog, eio, lerp, shiver } from './lib.js';

function mix(a, b, p) { const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)); const A = h(a), B = h(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], p)).toString(16).padStart(2, '0')).join(''); }
export default function renderShot(t) {
  const c = eio(prog(t, 52.6, 53.7));
  const sx = shiver(t, 1.6);
  const core = mix('#FFB547', '#5A8BD0', c * .7), edge = mix('#E5484D', '#2B4FA0', c), mid = mix('#FF8A3A', '#3C6DB0', c);
  const body = `M -230 1300 Q -250 900 -150 860 L 150 860 Q 250 900 230 1300 Z`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0A0E1A"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<path d="M 0 ${200 + i * 110} H 1080" stroke="#141A2E" stroke-width="3"/>`).join('')}
  <g transform="translate(${540 + sx} 0)">
    <path d="${body}" fill="${edge}"/>
    <path d="M -170 1300 Q -180 940 -110 900 L 110 900 Q 180 940 170 1300 Z" fill="${mid}"/>
    <ellipse cx="0" cy="1080" rx="90" ry="160" fill="${core}"/>
    <rect x="-50" y="760" width="100" height="120" fill="${mid}"/>
    <ellipse cx="0" cy="620" rx="170" ry="190" fill="${edge}"/>
    <ellipse cx="0" cy="640" rx="120" ry="140" fill="${mid}"/>
    <ellipse cx="0" cy="660" rx="60" ry="70" fill="${core}"/>
    <path d="M -175 560 Q -170 410 0 404 Q 170 410 175 560 Z" fill="${mix('#3A2E60', '#1A2A6A', c)}"/>
  </g>
  <rect x="80" y="1240" width="30" height="${-700}" fill="none"/>
  <g transform="translate(940 380)"><rect x="-26" y="0" width="52" height="700" rx="26" fill="none" stroke="#E6EEF2" stroke-width="6"/>
    <rect x="-18" y="${lerp(40, 520, c)}" width="36" height="${lerp(652, 172, c)}" rx="18" fill="${mix('#E5484D', '#5A8BD0', c)}"/></g>
  ${FG(1440)}`;
}
