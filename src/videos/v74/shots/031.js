import { P, R, ST, fig, frame, tag, prog, eio, eout, back, lerp, hash } from './lib.js';
// 63.32–66.7 On stage: the theatre curtain opens on an actor in the captain's uniform ("Bühne").
export default function renderShot(t) {
  const spot = eout(prog(t, 63.97, 64.5));
  const open = eio(prog(t, 64.1, 66.22));
  const point = back(prog(t, 66.25, 66.5));
  let heads = '';
  for (let i = 0; i < 9; i++) heads += `<circle cx="${i * 130 + 20}" cy="${1560 + 20 * hash(i)}" r="${70 + 10 * hash(i + 2)}" fill="#2A1E1A"/><rect x="${i * 130 - 60}" y="${1600 + 20 * hash(i)}" width="160" height="400" rx="60" fill="#2A1E1A"/>`;
  const curtain = (side) => { const w = 560 * (1 - .78 * open); const x0 = side < 0 ? 0 : 1080 - w; let folds = ''; for (let i = 0; i < 6; i++) folds += `<path d="M ${x0 + (i + .5) * w / 6} 140 V 1480" stroke="#7A1E1E" stroke-width="${10 + 4 * hash(i)}"/>`; return `<rect x="${x0}" y="120" width="${w}" height="1380" fill="#A8302A" ${ST(6)}/>${folds}`; };
  return frame(t, `${R(0, 0, 1080, 1920, '#2E201C')}<rect x="0" y="1180" width="1080" height="80" fill="${P.woodSh}" ${ST(6)}/>
    <rect x="40" y="140" width="1000" height="1060" fill="#3B2C26"/>
    <polygon points="540,0 330,1230 750,1230" fill="url(#kbeam)" opacity="${.9 * spot}"/>
    ${fig(540, 1200, 1.15, { kind: 'voigt', aR: lerp(-8, -92, point), aL: 10, look: 10, brow: 'angry', mouth: point > .5 ? 'o' : 'flat' })}
    ${curtain(-1)}${curtain(1)}
    <path d="M 0 80 Q 270 220 540 120 Q 810 220 1080 80 V 0 H 0 Z" fill="#A8302A" ${ST(6)}/><path d="M 0 60 H 1080" stroke="${P.gold}" stroke-width="14"/>
    ${heads}
    ${tag(540, 330, 'BÜHNE', back(prog(t, 66.22, 66.45)), { sz: 60, rot: -3 })}`);
}
