import { OL, P, ST, deskTop, frame, cashBox, prog, eio, eout, lerp } from './lib.js';
// 5.6–7.42 Close-up: the city strongbox opens; the captain's hand (blue sleeve, red cuff) lifts the banknotes out on "Geld".
export default function renderShot(t) {
  const open = eout(prog(t, 5.72, 6.0));
  const reach = eio(prog(t, 5.8, 6.2));     // hand travels to the box
  const lift = eio(prog(t, 6.3, 6.9));      // hand lifts the notes out
  const hx = lerp(1120, 600, reach) + lerp(0, 160, lift), hy = lerp(640, 880, reach) - lerp(0, 300, lift);
  const holding = t > 6.2;
  const notes = holding ? `<g transform="translate(${hx - 40} ${hy + 10}) rotate(-12)">${[0, 1, 2].map(i => `<rect x="${-80 + i * 8}" y="${-30 - i * 10}" width="150" height="70" fill="#C9D3B0" ${ST(4)}/><circle cx="${-5 + i * 8}" cy="${5 - i * 10}" r="14" fill="none" stroke="#7E8C64" stroke-width="4"/>`).join('')}</g>` : '';
  const sleeve = `<path d="M 1200 ${hy + 420} Q ${hx + 220} ${hy + 160} ${hx + 50} ${hy + 20}" stroke="${OL}" stroke-width="122" fill="none" stroke-linecap="round"/><path d="M 1200 ${hy + 420} Q ${hx + 220} ${hy + 160} ${hx + 50} ${hy + 20}" stroke="${P.blue}" stroke-width="108" fill="none" stroke-linecap="round"/>
    <rect x="${hx + 10}" y="${hy - 20}" width="90" height="56" fill="${P.red}" ${ST(5)} transform="rotate(-38 ${hx + 55} ${hy + 8})"/>`;
  const fingers = `<ellipse cx="${hx - 10}" cy="${hy}" rx="50" ry="38" fill="${P.skin}" ${ST(6)}/>${holding ? `<path d="M ${hx - 52} ${hy - 6} q -14 22 6 34 M ${hx - 38} ${hy + 12} q -10 22 10 30" fill="${P.skin}" ${ST(5)}/>` : ''}`;
  return frame(t, `${deskTop('#7E5A3C')}<circle cx="540" cy="1000" r="${480 * open}" fill="url(#kgold)" opacity=".7"/>
    ${cashBox(540, 1080, 1.9, open, 'STADTKASSE')}
    ${notes}${sleeve}${fingers}`);
}
