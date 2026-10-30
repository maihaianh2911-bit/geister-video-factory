// 10.54–14.86: the bigger change is elsewhere — pull back to the globe; the warm belt where mosquitoes transmit disease glows on "übertragen"
import { K, DEFS, BG, vig, stars, f1, cam, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const z = eio(prog(t, 10.54, 12.0));
  const band = eout(prog(t, 13.3, 13.9));
  const rot = t * 18;
  const R = 330, cx = 540, cy = 820;
  // stylised landmasses drifting with rotation (no claim of exact shapes)
  const blobs = [[-.6, -.45, .22], [-.1, -.25, .3], [.35, -.05, .26], [-.35, .25, .2], [.25, .45, .18], [.7, .2, .15], [-.75, .05, .14]];
  let land = '';
  blobs.forEach(([u, v, r], i) => { let x = ((u + rot / 180 + 1.2) % 2.4) - 1.2; if (Math.abs(x) > 1) return; const k = Math.sqrt(1 - x * x); land += `<ellipse cx="${f1(cx + x * R)}" cy="${f1(cy + v * R)}" rx="${f1(r * R * k)}" ry="${f1(r * R * .8)}" fill="#3E7A5A" stroke="${K.ink}" stroke-width="3"/>`; });
  const lat = [-.6, -.3, 0, .3, .6].map(v => `<ellipse cx="${cx}" cy="${f1(cy + v * R)}" rx="${f1(R * Math.sqrt(1 - v * v))}" ry="${f1(R * .08)}" fill="none" stroke="${K.cyan}" stroke-width="2" opacity=".35"/>`).join('');
  const globe = `<clipPath id="g6c"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>
    <circle cx="${cx}" cy="${cy}" r="${R + 40}" fill="url(#mCyan)" opacity=".7"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="#1E4E86" stroke="${K.line}" stroke-width="4"/>
    <g clip-path="url(#g6c)">${land}${lat}
      <rect x="${cx - R}" y="${cy - R * .38}" width="${2 * R}" height="${R * .76}" fill="${K.sun}" opacity="${f1(.42 * band)}"/>
      <rect x="${cx - R}" y="${cy - R * .38}" width="${2 * R}" height="${R * .76}" fill="none" stroke="${K.sun}" stroke-width="6" opacity="${f1(band)}" stroke-dasharray="16 10"/>
      <circle cx="${cx - R * .35}" cy="${cy - R * .35}" r="${R * .9}" fill="#fff" opacity=".06"/></g>`;
  let dots = '';
  if (band > 0) for (let i = 0; i < 14; i++) { const x = cx - R * .85 + hash(i) * R * 1.7, y = cy - R * .3 + hash(i + 7) * R * .6, p = eout(prog(t, 13.4 + i * .05, 13.8 + i * .05)); dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9 * p)}" fill="${K.red}" opacity=".9"/>`; }
  // start: the house window light as a small point that the globe zooms out from
  const sc = `${BG('url(#mNight)')}${stars(80, 21, 1900)}${globe}${dots}`;
  return `${DEFS}${cam(sc, lerp(2.6, 1, z), 540, lerp(700, 820, z))}${vig()}`;
}
