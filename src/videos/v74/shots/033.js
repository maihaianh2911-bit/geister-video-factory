import { P, R, ST, TX, helmetAt, jacketShape, pop, shk, frame, prog, eout } from './lib.js';
// 68.9–71.6 The name: HAUPTMANN / VON KÖPENICK is stamped on an old poster with the empty uniform ("Hauptmann von Köpenick" … "überlebte").
export default function renderShot(t) {
  const p1 = pop(t, 69.34, .2), p2 = pop(t, 70.02, .2);
  const sh = shk(t, 69.34, 8) + shk(t, 70.02, 8);
  const glow = eout(prog(t, 70.8, 71.3));
  return frame(t, `<g transform="translate(${sh} 0)">${R(0, 0, 1080, 1920, '#8A6E52')}
    <g transform="rotate(-2 540 820)" filter="url(#drop)"><rect x="110" y="170" width="860" height="1230" fill="#F2E3C2" ${ST(8)}/><rect x="140" y="200" width="800" height="1170" fill="none" stroke="${P.red}" stroke-width="6"/>
      <circle cx="540" cy="850" r="${300 + 60 * glow}" fill="url(#kgold)" opacity="${.5 + .5 * glow}"/>
      ${jacketShape(540, 760, .95, { epaul: 1 })}${helmetAt(540, 670, .72, 0)}
      ${p1 > 0 ? `<g transform="translate(540 400) scale(${p1})">${TX(0, 0, 118, 'HAUPTMANN', P.red, { ls: 4 })}</g>` : ''}
      ${p2 > 0 ? `<g transform="translate(540 530) scale(${p2})">${TX(0, 0, 84, 'VON KÖPENICK', P.ink, { ls: 4 })}</g>` : ''}</g></g>`);
}
