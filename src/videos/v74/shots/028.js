import { P, R, ST, fig, pop, stamp, frame, prog, eio, eout, lerp, hash } from './lib.js';
// 56.1–58.6 Early release: the prison gate opens, he walks out into the daylight ("Freilassung"); stamp 1908.
export default function renderShot(t) {
  const open = eio(prog(t, 56.2, 56.9));
  const walk = eout(prog(t, 56.8, 58.0));
  const walking = t > 56.8 && t < 58.0;
  const st = pop(t, 58.14, .2);
  let stones = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 6; c++) stones += `<rect x="${c * 190 - (r % 2) * 95 - 20}" y="${r * 80}" width="186" height="76" rx="10" fill="${hash(r * 9 + c) > .5 ? '#8E8270' : '#837865'}" stroke="#655B4C" stroke-width="4"/>`;
  return frame(t, `${R(0, 0, 1080, 1920, '#7C7160')}${stones}
    <path d="M 240 1400 V 620 Q 240 440 540 440 Q 840 440 840 620 V 1400 Z" fill="#FFF4D6" ${ST(8)}/>
    <polygon points="240,1400 840,1400 1080,1920 0,1920" fill="url(#kbeam)" opacity="${.8 * open}"/>
    ${fig(lerp(540, 700, walk), lerp(1380, 1760, walk), lerp(.95, 1.35, walk), { kind: 'voigtLate', walk: walking ? t * 7 : undefined, walkA: 18, aR: -10, aL: 10, look: 4, lookY: -4, mouth: walk > .5 ? 'smile' : 'flat', brow: 'up' })}
    <g transform="translate(240 0) scale(${1 - .9 * open} 1)"><path d="M 0 1400 V 620 Q 0 450 300 440 V 1400 Z" fill="${P.woodSh}" ${ST(7)}/>${[0, 1, 2].map(i => `<rect x="20" y="${700 + i * 220}" width="260" height="22" fill="${P.steel}" ${ST(3)}/>`).join('')}</g>
    <g transform="translate(840 0) scale(${1 - .9 * open} 1)"><path d="M 0 1400 V 620 Q 0 450 -300 440 V 1400 Z" fill="${P.wood}" ${ST(7)}/>${[0, 1, 2].map(i => `<rect x="-280" y="${700 + i * 220}" width="260" height="22" fill="${P.steel}" ${ST(3)}/>`).join('')}</g>
    <path d="M 240 1400 V 620 Q 240 440 540 440 Q 840 440 840 620 V 1400" fill="none" stroke="${P.stoneSh}" stroke-width="30"/>
    ${stamp(540, 280, -6, '1908', st, { sz: 120, bg: P.paper })}`);
}
