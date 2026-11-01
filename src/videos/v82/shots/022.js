// 74.54–78.36 the person you once loved stays a stranger: grown-up you and her pass each other on the street; the heart greys and breaks on "Fremder"
import { K, adult, heart, chip, fade, pop, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#2f3a66"/>`;
  // street: houses + lamp
  [[0, 520, '#3d4a7a'], [300, 600, '#44528a'], [620, 480, '#3d4a7a'], [880, 560, '#44528a']].forEach(([x, y, c]) => { s += `<rect x="${x}" y="${y}" width="${x === 880 ? 200 : 300}" height="${1330 - y}" fill="${c}" stroke="${K.ol}" stroke-width="5"/>`; for (let i = 0; i < 3; i++) s += `<rect x="${x + 50 + (i % 2) * 120}" y="${y + 60 + i * 180}" width="70" height="90" fill="${i === 1 ? '#ffe39a' : '#2a3358'}"/>`; });
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#59607e"/><rect x="0" y="1320" width="1080" height="20" fill="#8a8fa8"/>`;
  // they walk towards and past each other
  const w = prog(t, 74.6, 78.3);
  const xa = lerp(220, 760, w), xb = lerp(860, 300, w);
  const bob = k => Math.abs(Math.sin(t * 6 + k)) * 8;
  s += adult(xb, 1330 - bob(1), .78, { kind: 'woman', aL: [8, 4], aR: [8, 4], mouth: 'flat', look: [-10, 0] });
  s += adult(xa, 1330 - bob(0), .82, { kind: 'man', top: K.shirt, hairC: K.hair, aL: [8, 4], aR: [8, 4], mouth: 'flat', look: [10, 0] });
  // the heart between them: full at "Mensch", grey and broken at "Fremder"
  const h = fade(t, 75.38, .3), br = eio(prog(t, 77.66, 78.0));
  if (h > 0) {
    const col = br > .5 ? K.grey : K.red;
    s += `<g opacity="${f1(h * 100) / 100}" transform="translate(540 420)"><g transform="translate(${f1(-40 * br)} ${f1(30 * br)}) rotate(${f1(-14 * br)})"><clipPath id="v82c22a"><path d="M -200 -200 L 0 -200 L -10 -40 L 10 -10 L -6 40 L -200 200 Z"/></clipPath><g clip-path="url(#v82c22a)">${heart(0, 0, 3 * pop(t, 75.38), col)}</g></g>
      <g transform="translate(${f1(40 * br)} ${f1(30 * br)}) rotate(${f1(14 * br)})"><clipPath id="v82c22b"><path d="M 200 -200 L 0 -200 L -10 -40 L 10 -10 L -6 40 L 200 200 Z"/></clipPath><g clip-path="url(#v82c22b)">${heart(0, 0, 3 * pop(t, 75.38), col)}</g></g></g>`;
  }
  s += chip(540, 230, 'FÜR IMMER FREMD', { a: fade(t, 77.66), sc: pop(t, 77.66), bg: K.grey, size: 48 });
  return s;
}
