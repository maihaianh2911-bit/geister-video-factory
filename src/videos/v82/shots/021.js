// 71.82–74.54 maybe you never meet your best friend: a photo of the two kids, the friend fades to an empty outline on "nie"
import { K, kid, chip, T, fade, pop, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="${K.night2}"/><rect x="0" y="1330" width="1080" height="590" fill="#232a4d"/>`;
  const gone = eio(prog(t, 73.54, 74.1));
  // polaroid photo
  s += `<g transform="rotate(-3 540 760)"><rect x="170" y="300" width="740" height="900" rx="12" fill="#fffaf0" stroke="${K.ol}" stroke-width="8"/><rect x="210" y="340" width="660" height="660" fill="#cfe6f3"/><rect x="210" y="820" width="660" height="180" fill="#9fcf86"/><circle cx="760" cy="440" r="50" fill="${K.goldL}"/>`;
  s += `<clipPath id="v82c21"><rect x="210" y="340" width="660" height="660"/></clipPath><g clip-path="url(#v82c21)">`;
  s += kid(400, 960, .95, { aL: [12, 6], aR: [70, 60], mouth: 'grin', brows: 'up' });
  // the friend: red hair, green shirt; fades to a dashed outline
  s += `<g opacity="${f1((1 - gone) * 100) / 100}">${kid(680, 960, .95, { shirt: '#5fae7a', stripe: '#3c8a5a', hairC: '#c4642f', hairHi: '#de8a52', aL: [70, 60], aR: [12, 6], mouth: 'grin', brows: 'up', look: [-10, 0] })}</g>`;
  s += `<g opacity="${f1(gone * 100) / 100}"><ellipse cx="680" cy="580" rx="100" ry="96" fill="none" stroke="#6d7aa8" stroke-width="7" stroke-dasharray="20 14"/><path d="M 610 660 L 610 960 M 750 660 L 750 960 M 610 660 Q 680 640 750 660" fill="none" stroke="#6d7aa8" stroke-width="7" stroke-dasharray="20 14"/></g>`;
  s += `</g>` + T(540, 1110, 'Beste Freunde', 64, { fill: K.ol, op: 1 - gone }) + T(540, 1110, '???', 72, { fill: K.grey, op: gone }) + `</g>`;
  s += chip(540, 200, 'NIE GETROFFEN?', { a: fade(t, 73.54), sc: pop(t, 73.54), bg: K.red, size: 48 });
  return s;
}
