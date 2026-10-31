import { P, ST, cobbles, fig, postcard, rowHouses, sky, frame, prog, eout, ein, back, lerp } from './lib.js';
// 60.3–63.32 Money from his fame: a buyer drops a coin into the tin ("Geld"); Voigt signs a postcard of himself as the captain and holds it up ("Bekanntheit").
export default function renderShot(t) {
  const give = eout(prog(t, 60.45, 60.8));
  const coin = prog(t, 60.8, 60.95);
  const sign = prog(t, 61.1, 61.9);
  const show = back(prog(t, 61.95, 62.25));
  const clap = t > 62.3 ? Math.abs(Math.sin(t * 16)) : 0;
  const card = (hx, hy) => postcard(hx, hy - 70, -6, .75);
  return frame(t, `${sky()}${rowHouses(1150, P.paperDk, 3000)}${cobbles(1150, 1920)}
    ${fig(170, 1720, 1.2, { kind: 'buyerA', aR: t < 60.95 ? lerp(-10, -62, give) : lerp(-62, -20, prog(t, 60.95, 61.3)) - 25 * clap, bendR: -20, aL: 10 + 25 * clap, look: 12, mouth: show > .5 ? 'smile' : 'flat', brow: 'up', propR: t < 60.8 ? (hx, hy) => `<ellipse cx="${hx + 6}" cy="${hy + 14}" rx="16" ry="16" fill="${P.gold}" ${ST(3)}/>` : null })}
    ${fig(900, 1740, 1.2, { kind: 'buyerC', aL: 10 + 25 * clap, aR: -10 - 25 * clap, look: -12, mouth: show > .5 ? 'smile' : 'flat', brow: 'up' })}
    ${fig(540, 1560, 1.2, { kind: 'voigtLate', aL: show > 0 ? lerp(15, 150, show) : 15, bendL: show > 0 ? lerp(0, -20, show) : 0, propL: show > 0 ? card : null, aR: sign > 0 && sign < 1 ? -22 + 6 * Math.sin(sign * 40) : -22, bendR: 40, look: show > 0 ? -6 : -10, lookY: sign > 0 && sign < 1 ? 14 : 0, mouth: 'smile', brow: 'up' })}
    <rect x="200" y="1180" width="680" height="40" fill="${P.white}" ${ST(6)}/><rect x="230" y="1220" width="620" height="500" fill="${P.red}" ${ST(6)}/>
    ${postcard(700, 1250, 10, .6)}${postcard(770, 1255, -4, .6)}${show <= 0 ? postcard(560, 1245, 4, .6) : ''}
    <g><rect x="300" y="1110" width="110" height="80" rx="8" fill="${P.steel}" ${ST(5)}/><rect x="320" y="1100" width="70" height="14" rx="4" fill="${P.black}"/></g>
    ${coin > 0 && coin < 1 ? `<ellipse cx="355" cy="${lerp(1040, 1104, ein(coin))}" rx="16" ry="16" fill="${P.gold}" ${ST(3)}/>` : ''}
    ${sign > 0 && sign < 1 ? `<path d="M 600 1150 l ${40 * sign} ${-6 * Math.sin(sign * 20)}" stroke="#1E2A4A" stroke-width="6"/>` : ''}`);
}
