// 14.72–16.2: it needs advertising — a paste brush slaps a ZIRKUS ALTHOFF poster onto a wall on "Werbung"
import { K, DEFS, BG, TX, HL, tuffi, grain, f1, prog, eout, eio, back, lerp, shk } from './lib.js';
export default function renderShot(t) {
  const un = eout(prog(t, 14.75, 15.14));
  const [sx, sy] = shk(t, 15.14, 6, 8);
  const bx = lerp(250, 830, eio(prog(t, 15.14, 15.9))), by = lerp(520, 1180, eio(prog(t, 15.14, 15.9)));
  const brushX = t < 15.14 ? lerp(300, 560, eio(prog(t, 14.72, 15.14))) : bx, brushY = t < 15.14 ? lerp(420, 380, prog(t, 14.72, 15.14)) : by;
  const posterH = 900 * un;
  const poster = `<clipPath id="w8p"><rect x="190" y="340" width="700" height="${f1(posterH)}"/></clipPath>
    <g clip-path="url(#w8p)"><rect x="190" y="340" width="700" height="900" fill="#F1E2B8" stroke="${K.ink}" stroke-width="6"/>
      <rect x="220" y="370" width="640" height="840" fill="none" stroke="${K.red}" stroke-width="8"/>
      ${HL('ZIRKUS', 540, 500, 110, K.red, 0)}${HL('ALTHOFF', 540, 610, 96, K.ink, 0)}
      <circle cx="540" cy="900" r="210" fill="${K.red}" opacity=".85"/>${tuffi(500, 1060, .62, { tr: .9, legs: [-24, 0, 0, 0] })}
      ${TX('★ ★ ★', 540, 1170, 54, K.red)}</g>`;
  const brush = `<g transform="translate(${f1(brushX)} ${f1(brushY)}) rotate(-25)"><rect x="-90" y="-20" width="180" height="46" rx="8" fill="${K.brown}" stroke="${K.ink}" stroke-width="5"/>
    <rect x="-80" y="24" width="160" height="40" fill="#D8CDB0" stroke="${K.ink}" stroke-width="5"/><rect x="-14" y="-200" width="28" height="182" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/></g>`;
  let bricks = '';
  for (let r = 0; r < 24; r++) for (let c = -1; c < 9; c++) bricks += `<rect x="${c * 140 + (r % 2) * 70}" y="${r * 80}" width="136" height="76" fill="${(r * 3 + c) % 5 ? '#B98F6E' : '#A97F5F'}"/>`;
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${BG('#8F6B50')}${bricks}${poster}
    ${t > 15.14 ? `<path d="M 190 ${f1(by - 40)} h 700" stroke="#fff" stroke-width="10" opacity="${f1(.25 * (1 - prog(t, 15.2, 16)))}"/>` : ''}${brush}</g>${grain(t)}`;
}
